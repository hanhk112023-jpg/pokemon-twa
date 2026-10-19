/**
 * Turn-Based Combat Engine & Damage Calculator
 */

class BattleEngine {
  constructor(app) {
    this.app = app;
    this.inBattle = false;
    this.playerPokemon = null;
    this.enemyPokemon = null;
    this.currentLeader = null;
    this.turn = "player"; // "player" | "enemy"
    this.isActionPending = false;
    this.playerShield = false;
    this.enemyShield = false;
    this.playerHealCharges = 2;
    this.playerEnergy = 1; // max 3
  }

  // Calculate Elemental Multiplier
  getTypeMultiplier(attackType, targetType) {
    if (!attackType || !targetType) return 1.0;
    const mapping = TYPE_CHART[attackType.toLowerCase()];
    if (!mapping) return 1.0;
    return mapping[targetType.toLowerCase()] !== undefined ? mapping[targetType.toLowerCase()] : 1.0;
  }

  // Calculate Final Damage
  calculateDamage(attacker, defender, move, isShielded) {
    const basePower = move.power;
    const atkStat = attacker.atk;
    const defStat = defender.def;

    // Type effectiveness
    const typeMult = this.getTypeMultiplier(move.type, defender.type);

    // Critical hit chance (10% normal, 35% if move has crit_chance effect)
    const critRate = move.effect === "crit_chance" ? 0.35 : 0.10;
    const isCrit = Math.random() < critRate;
    const critMult = isCrit ? 1.5 : 1.0;

    // Defense mitigation formula
    let rawDamage = ((2 * 50 / 5 + 2) * basePower * (atkStat / Math.max(20, defStat)) / 50 + 2);
    rawDamage *= typeMult * critMult;

    // Variance (+/- 10%)
    const variance = (Math.random() * 0.2) + 0.9;
    let finalDamage = Math.floor(rawDamage * variance);

    // Shield reduction
    if (isShielded) {
      finalDamage = Math.max(10, Math.floor(finalDamage * 0.5));
    }

    return {
      damage: Math.max(15, finalDamage),
      isCrit,
      typeMult
    };
  }

  // Start a new Battle against a Gym Leader / Wild Opponent
  startBattle(leaderId) {
    const leader = GYM_LEADERS.find((l) => l.id === leaderId) || GYM_LEADERS[0];
    this.currentLeader = leader;

    // Get active player Pokemon
    const activeId = this.app.state.activePokemonInstanceId;
    let p = this.app.state.collection.find((c) => c.instanceId === activeId);
    if (!p) {
      p = this.app.state.collection[0];
    }

    if (!p) {
      this.app.showToast("Bạn chưa có thẻ Pokémon nào! Hãy mở thẻ trước.", "error");
      return;
    }

    // Clone player state for battle
    this.playerPokemon = {
      ...p,
      currentHp: p.hp,
      maxHp: p.hp
    };

    // Instantiate enemy
    let enemyBase = POKEMON_DATA.find((item) => item.id === leader.pokemon);
    if (!enemyBase) {
      enemyBase = POKEMON_DATA[Math.floor(Math.random() * POKEMON_DATA.length)];
    }

    // Scale enemy stats with leader difficulty
    let hpScale = 1.0;
    let atkScale = 1.0;
    if (leader.difficulty === "Trung Bình") { hpScale = 1.1; atkScale = 1.1; }
    if (leader.difficulty === "Khó") { hpScale = 1.25; atkScale = 1.2; }
    if (leader.difficulty === "Cực Khó") { hpScale = 1.45; atkScale = 1.35; }
    if (leader.difficulty === "Huyền Thoại") { hpScale = 1.8; atkScale = 1.5; }

    this.enemyPokemon = {
      ...enemyBase,
      hp: Math.floor(enemyBase.hp * hpScale),
      maxHp: Math.floor(enemyBase.hp * hpScale),
      currentHp: Math.floor(enemyBase.hp * hpScale),
      atk: Math.floor(enemyBase.atk * atkScale)
    };

    // Reset battle state
    this.inBattle = true;
    this.turn = this.playerPokemon.spd >= this.enemyPokemon.spd ? "player" : "enemy";
    this.isActionPending = false;
    this.playerShield = false;
    this.enemyShield = false;
    this.playerHealCharges = 2;
    this.playerEnergy = 1;

    // Switch to Battle Arena View
    this.app.switchTab("battle");
    this.renderBattleArena();

    this.logAction(`⚔️ Trận đấu bắt đầu! ${leader.name} thách đấu với ${this.enemyPokemon.name}!`);

    // If enemy is faster, enemy attacks first
    if (this.turn === "enemy") {
      this.logAction(`⚡ Đối thủ có tốc độ (${this.enemyPokemon.spd}) nhanh hơn và ra đòn trước!`);
      setTimeout(() => this.executeEnemyTurn(), 1200);
    } else {
      this.logAction(`🌟 Pokémon của bạn (${this.playerPokemon.name}) chiếm thế thượng phong ra đòn trước!`);
    }
  }

  // Render the Battle Arena UI
  renderBattleArena() {
    const container = document.getElementById("battle-screen-container");
    if (!container) return;

    container.innerHTML = `
      <div id="battle-arena" class="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 p-4 shadow-2xl overflow-hidden flex flex-col justify-between min-h-[490px]">
        
        <!-- Arena Backdrop Glow -->
        <div class="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <!-- TOP: Enemy Zone -->
        <div class="relative z-10 flex items-start justify-between">
          <!-- Enemy Health & Info Bar -->
          <div class="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-3 shadow-lg w-52">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-white font-extrabold text-xs drop-shadow truncate max-w-[110px]">
                ${this.enemyPokemon.name}
              </span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-rose-500/30 text-rose-300 border border-rose-500/40">
                ${this.enemyPokemon.type}
              </span>
            </div>
            <!-- HP Bar -->
            <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-white/10">
              <div id="enemy-hp-bar" class="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500 rounded-full" 
                   style="width: 100%;"></div>
            </div>
            <div class="flex items-center justify-between mt-1 text-[10px] font-bold text-slate-400">
              <span>HP</span>
              <span id="enemy-hp-text" class="text-white font-mono">${this.enemyPokemon.currentHp}/${this.enemyPokemon.maxHp}</span>
            </div>
          </div>

          <!-- Enemy Avatar / Sprite -->
          <div id="enemy-sprite-box" class="relative w-32 h-32 flex items-center justify-center">
            <img id="enemy-sprite" 
                 src="${getPokemonImage(this.enemyPokemon.id)}" 
                 class="w-full h-full object-contain filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.8)] transition-transform duration-300" />
            <div id="enemy-damage-float" class="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none"></div>
          </div>
        </div>

        <!-- Turn & Status Notice Bar -->
        <div class="relative z-10 text-center my-auto">
          <div id="turn-badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-inner">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span id="turn-badge-text">Lượt của bạn</span>
          </div>
          <!-- Log ticker -->
          <div id="battle-log" class="text-[11px] text-slate-300 font-medium h-5 mt-2 transition-all truncate px-4">
            Đang chờ lệnh tấn công...
          </div>
        </div>

        <!-- BOTTOM: Player Zone -->
        <div class="relative z-10 flex items-end justify-between">
          <!-- Player Avatar / Sprite -->
          <div id="player-sprite-box" class="relative w-32 h-32 flex items-center justify-center">
            <img id="player-sprite" 
                 src="${getPokemonImage(this.playerPokemon.id)}" 
                 class="w-full h-full object-contain filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.8)] transition-transform duration-300" />
            <div id="player-damage-float" class="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none"></div>
          </div>

          <!-- Player Health & Info Bar -->
          <div class="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-3 shadow-lg w-52">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-white font-extrabold text-xs drop-shadow truncate max-w-[110px]">
                ${this.playerPokemon.name}
              </span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                ${this.playerPokemon.type}
              </span>
            </div>
            <!-- HP Bar -->
            <div class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-white/10">
              <div id="player-hp-bar" class="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500 rounded-full" 
                   style="width: 100%;"></div>
            </div>
            <div class="flex items-center justify-between mt-1 text-[10px] font-bold text-slate-400">
              <div class="flex items-center gap-1">
                <span>Năng lượng:</span>
                <span id="player-energy-dots" class="flex gap-1 text-amber-400 text-xs">⚡</span>
              </div>
              <span id="player-hp-text" class="text-white font-mono">${this.playerPokemon.currentHp}/${this.playerPokemon.maxHp}</span>
            </div>
          </div>
        </div>

        <!-- COMBAT ACTION CONTROLS -->
        <div class="relative z-10 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
          <!-- 1. Basic Attack -->
          <button id="btn-move-1" onclick="battleEngine.playerAction('move_1')"
                  class="p-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-left active:scale-95 transition-all shadow-md flex flex-col justify-between">
            <div class="flex items-center justify-between w-full">
              <span class="text-white font-bold text-xs truncate">${this.playerPokemon.moves[0].name}</span>
              <span class="text-amber-400 text-[10px] font-black">${this.playerPokemon.moves[0].power}</span>
            </div>
            <span class="text-[9px] text-slate-400 mt-1 uppercase font-semibold">Tấn công thường</span>
          </button>

          <!-- 2. Special Elemental Move (Requires Energy) -->
          <button id="btn-move-2" onclick="battleEngine.playerAction('move_2')"
                  class="p-2.5 rounded-xl bg-gradient-to-r from-indigo-900/80 to-purple-900/80 hover:from-indigo-800/80 hover:to-purple-800/80 border border-indigo-500/40 text-left active:scale-95 transition-all shadow-md flex flex-col justify-between">
            <div class="flex items-center justify-between w-full">
              <span class="text-amber-300 font-extrabold text-xs truncate">${this.playerPokemon.moves[1].name}</span>
              <span class="text-rose-400 text-[10px] font-black">${this.playerPokemon.moves[1].power}</span>
            </div>
            <span class="text-[9px] text-indigo-300 mt-1 uppercase font-bold flex items-center gap-1">
              <span>Tuyệt Kỹ Hệ</span>
              <span class="text-amber-400">⚡${this.playerPokemon.moves[1].energy} EP</span>
            </span>
          </button>

          <!-- 3. Shield / Guard -->
          <button id="btn-shield" onclick="battleEngine.playerAction('shield')"
                  class="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-left active:scale-95 transition-all flex items-center justify-between">
            <span class="text-slate-200 font-bold text-xs flex items-center gap-1">
              <span>🛡️ Phòng Thủ</span>
            </span>
            <span class="text-[9px] text-slate-400">Giảm 50%</span>
          </button>

          <!-- 4. Potion Heal -->
          <button id="btn-potion" onclick="battleEngine.playerAction('potion')"
                  class="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 text-left active:scale-95 transition-all flex items-center justify-between">
            <span class="text-emerald-400 font-bold text-xs flex items-center gap-1">
              <span>🧪 Dược Phẩm</span>
            </span>
            <span id="potion-count-badge" class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              ${this.playerHealCharges} còn lại
            </span>
          </button>
        </div>

      </div>
    `;

    this.updateEnergyDisplay();
  }

  updateEnergyDisplay() {
    const dotsContainer = document.getElementById("player-energy-dots");
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "⚡".repeat(Math.min(3, this.playerEnergy));
  }

  logAction(msg) {
    const log = document.getElementById("battle-log");
    if (log) {
      log.innerText = msg;
    }
  }

  showFloatingText(isPlayer, text, type = "normal") {
    const container = document.getElementById(isPlayer ? "player-damage-float" : "enemy-damage-float");
    if (!container) return;

    const el = document.createElement("div");
    let color = "text-rose-400";
    if (type === "crit") color = "text-amber-300 font-black text-sm drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]";
    if (type === "heal") color = "text-emerald-400 font-black text-sm";
    if (type === "shield") color = "text-blue-400 font-bold text-xs";

    el.className = `floating-damage font-black ${color} tracking-wider pointer-events-none`;
    el.innerText = text;
    container.appendChild(el);

    setTimeout(() => el.remove(), 1200);
  }

  // Player clicks action
  playerAction(action) {
    if (!this.inBattle || this.turn !== "player" || this.isActionPending) return;

    soundEngine.playTap();
    this.isActionPending = true;

    if (action === "move_1") {
      this.executePlayerAttack(this.playerPokemon.moves[0]);
    } else if (action === "move_2") {
      const move = this.playerPokemon.moves[1];
      if (this.playerEnergy < move.energy) {
        this.app.showToast(`Cần ${move.energy} năng lượng ⚡ để tung Tuyệt Kỹ! Hãy tấn công thường để tích lũy.`, "error");
        this.isActionPending = false;
        return;
      }
      this.playerEnergy -= move.energy;
      this.updateEnergyDisplay();
      this.executePlayerAttack(move);
    } else if (action === "shield") {
      this.playerShield = true;
      this.playerEnergy = Math.min(3, this.playerEnergy + 1);
      this.updateEnergyDisplay();
      soundEngine.playShield();
      this.showFloatingText(true, "🛡️ Phòng Thủ!", "shield");
      this.logAction(`🛡️ ${this.playerPokemon.name} vào thế phòng thủ và tích thêm 1 năng lượng!`);
      this.endTurn("player");
    } else if (action === "potion") {
      if (this.playerHealCharges <= 0) {
        this.app.showToast("Đã hết dược phẩm hồi phục trong trận đấu này!", "error");
        this.isActionPending = false;
        return;
      }
      this.playerHealCharges--;
      const healAmount = Math.floor(this.playerPokemon.maxHp * 0.35);
      this.playerPokemon.currentHp = Math.min(this.playerPokemon.maxHp, this.playerPokemon.currentHp + healAmount);
      
      const badge = document.getElementById("potion-count-badge");
      if (badge) badge.innerText = `${this.playerHealCharges} còn lại`;

      soundEngine.playHeal();
      this.showFloatingText(true, `+${healAmount} HP`, "heal");
      this.updateHpBars();
      this.logAction(`🧪 ${this.playerPokemon.name} dùng dược phẩm hồi phục ${healAmount} HP!`);
      this.endTurn("player");
    }
  }

  // Execute Player Attack
  executePlayerAttack(move) {
    // Attack Lunge Animation
    const playerSprite = document.getElementById("player-sprite");
    if (playerSprite) playerSprite.classList.add("attack-lunge-player");
    setTimeout(() => playerSprite?.classList.remove("attack-lunge-player"), 350);

    const calc = this.calculateDamage(this.playerPokemon, this.enemyPokemon, move, this.enemyShield);
    this.enemyShield = false;

    // Apply Damage
    this.enemyPokemon.currentHp = Math.max(0, this.enemyPokemon.currentHp - calc.damage);

    // Audio & Haptic
    if (calc.isCrit) {
      soundEngine.playCrit();
      document.getElementById("battle-arena")?.classList.add("shake");
      setTimeout(() => document.getElementById("battle-arena")?.classList.remove("shake"), 350);
      this.showFloatingText(false, `💥 BẠO KÍCH! -${calc.damage}`, "crit");
    } else if (calc.typeMult > 1) {
      soundEngine.playSuperEffective();
      this.showFloatingText(false, `⚡ SIÊU HIỆU QUẢ! -${calc.damage}`, "crit");
    } else {
      soundEngine.playAttack();
      this.showFloatingText(false, `-${calc.damage}`);
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(calc.isCrit ? "heavy" : "medium");
    }

    this.updateHpBars();
    this.logAction(`💥 ${this.playerPokemon.name} dùng [${move.name}] gây ${calc.damage} sát thương!`);

    // Gain 1 energy per basic attack
    if (move.energy === 0) {
      this.playerEnergy = Math.min(3, this.playerEnergy + 1);
      this.updateEnergyDisplay();
    }

    // Check Victory
    if (this.enemyPokemon.currentHp <= 0) {
      setTimeout(() => this.handleVictory(), 800);
    } else {
      this.endTurn("player");
    }
  }

  // End of Turn and switch
  endTurn(currentTurn) {
    if (currentTurn === "player") {
      this.turn = "enemy";
      this.updateTurnBadge("Lượt của đối thủ...", "bg-rose-500/20 text-rose-300 border-rose-500/30");
      setTimeout(() => this.executeEnemyTurn(), 1100);
    } else {
      this.turn = "player";
      this.isActionPending = false;
      this.updateTurnBadge("Lượt của bạn", "bg-indigo-500/20 text-indigo-300 border-indigo-500/30");
    }
  }

  updateTurnBadge(text, colorClasses) {
    const badge = document.getElementById("turn-badge");
    const badgeText = document.getElementById("turn-badge-text");
    if (badge && badgeText) {
      badge.className = `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${colorClasses} shadow-inner transition-all`;
      badgeText.innerText = text;
    }
  }

  // AI Enemy Turn Execution
  executeEnemyTurn() {
    if (!this.inBattle || this.enemyPokemon.currentHp <= 0) return;

    // AI Decision: 70% basic attack, 20% special move, 10% shield
    const rand = Math.random();
    const enemySprite = document.getElementById("enemy-sprite");
    if (enemySprite) enemySprite.classList.add("attack-lunge-enemy");
    setTimeout(() => enemySprite?.classList.remove("attack-lunge-enemy"), 350);

    let move = this.enemyPokemon.moves[0];
    if (rand > 0.8 && this.enemyPokemon.moves[1]) {
      move = this.enemyPokemon.moves[1];
    }

    const calc = this.calculateDamage(this.enemyPokemon, this.playerPokemon, move, this.playerShield);
    this.playerShield = false;

    this.playerPokemon.currentHp = Math.max(0, this.playerPokemon.currentHp - calc.damage);

    if (calc.isCrit) {
      soundEngine.playCrit();
      this.showFloatingText(true, `💥 ĐỐI THỦ BẠO KÍCH! -${calc.damage}`, "crit");
    } else {
      soundEngine.playAttack();
      this.showFloatingText(true, `-${calc.damage}`);
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
    }

    this.updateHpBars();
    this.logAction(`⚠️ ${this.enemyPokemon.name} phản kích bằng [${move.name}] gây ${calc.damage} sát thương!`);

    // Check Defeat
    if (this.playerPokemon.currentHp <= 0) {
      setTimeout(() => this.handleDefeat(), 800);
    } else {
      this.endTurn("enemy");
    }
  }

  // Smoothly update HP bars
  updateHpBars() {
    const enemyHpBar = document.getElementById("enemy-hp-bar");
    const enemyHpText = document.getElementById("enemy-hp-text");
    const playerHpBar = document.getElementById("player-hp-bar");
    const playerHpText = document.getElementById("player-hp-text");

    if (enemyHpBar && enemyHpText) {
      const pct = Math.max(0, Math.min(100, (this.enemyPokemon.currentHp / this.enemyPokemon.maxHp) * 100));
      enemyHpBar.style.width = `${pct}%`;
      enemyHpText.innerText = `${this.enemyPokemon.currentHp}/${this.enemyPokemon.maxHp}`;
      enemyHpBar.className = `h-full transition-all duration-500 rounded-full ${
        pct > 50 ? "bg-gradient-to-r from-emerald-500 to-green-400" : pct > 20 ? "bg-gradient-to-r from-amber-500 to-yellow-400" : "bg-gradient-to-r from-rose-600 to-red-500"
      }`;
    }

    if (playerHpBar && playerHpText) {
      const pct = Math.max(0, Math.min(100, (this.playerPokemon.currentHp / this.playerPokemon.maxHp) * 100));
      playerHpBar.style.width = `${pct}%`;
      playerHpText.innerText = `${this.playerPokemon.currentHp}/${this.playerPokemon.maxHp}`;
      playerHpBar.className = `h-full transition-all duration-500 rounded-full ${
        pct > 50 ? "bg-gradient-to-r from-emerald-500 to-green-400" : pct > 20 ? "bg-gradient-to-r from-amber-500 to-yellow-400" : "bg-gradient-to-r from-rose-600 to-red-500"
      }`;
    }
  }

  // Handle Battle Victory
  handleVictory() {
    this.inBattle = false;
    soundEngine.playVictory();

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }

    const coinsReward = this.currentLeader.rewardCoins;
    const expReward = this.currentLeader.rewardExp;

    this.app.state.coins += coinsReward;
    this.app.state.stats.battlesWon++;
    this.app.recordQuestProgress("win_battle");

    // Award card level up exp
    const card = this.app.state.collection.find((c) => c.instanceId === this.playerPokemon.instanceId);
    if (card) {
      card.exp = (card.exp || 0) + expReward;
      if (card.exp >= card.level * 100) {
        card.level++;
        card.hp = Math.floor(card.hp * 1.08);
        card.atk = Math.floor(card.atk * 1.08);
        this.app.showToast(`🎉 Thẻ ${card.name} vừa thăng lên Cấp ${card.level}! (+8% HP & ATK)`, "success");
      }
    }

    this.app.saveState();
    this.app.renderHeaderStats();

    this.showEndBattleModal(true, coinsReward, expReward);
  }

  // Handle Battle Defeat
  handleDefeat() {
    this.inBattle = false;
    soundEngine.playDefeat();

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    }

    this.app.state.stats.battlesLost++;
    this.app.saveState();

    this.showEndBattleModal(false, 0, 10);
  }

  showEndBattleModal(isVictory, coins, exp) {
    const modal = document.getElementById("battle-result-modal");
    if (!modal) return;

    modal.classList.remove("hidden");
    const content = document.getElementById("battle-result-content");

    content.innerHTML = `
      <div class="text-center p-6">
        <div class="w-20 h-20 mx-auto rounded-full ${isVictory ? 'bg-amber-400/20 border-2 border-amber-400' : 'bg-rose-500/20 border-2 border-rose-500'} flex items-center justify-center text-4xl mb-4 shadow-xl">
          ${isVictory ? '🏆' : '💀'}
        </div>

        <h3 class="text-xl font-black text-white uppercase tracking-wide">
          ${isVictory ? 'Chiến Thắng Vang Dội!' : 'Thất Bại Tiếc Nuối!'}
        </h3>
        <p class="text-xs text-slate-300 mt-1">
          ${isVictory 
            ? `Bạn đã đánh bại ${this.currentLeader.name} thành công!` 
            : `Pokémon của bạn đã kiệt sức. Hãy nâng cấp thẻ bài và thử lại!`}
        </p>

        <!-- Rewards Box -->
        <div class="my-5 p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-around">
          <div class="flex items-center gap-2">
            <span class="text-xl">🪙</span>
            <div class="text-left">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Phần Thưởng</span>
              <span class="text-amber-400 font-black text-sm">+${coins} Xu</span>
            </div>
          </div>
          <div class="h-8 w-px bg-white/10"></div>
          <div class="flex items-center gap-2">
            <span class="text-xl">⭐</span>
            <div class="text-left">
              <span class="text-[10px] text-slate-400 uppercase font-bold block">Kinh Nghiệm</span>
              <span class="text-indigo-400 font-black text-sm">+${exp} EXP</span>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="space-y-2">
          <button onclick="battleEngine.closeResultModal(); battleEngine.startBattle('${this.currentLeader.id}')" 
                  class="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all">
            Đấu Lại Trận Này ⚔️
          </button>
          <button onclick="battleEngine.closeResultModal(); app.switchTab('arena-list')" 
                  class="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition-all">
            Quay Về Danh Sách Nhà Thi Đấu
          </button>
        </div>
      </div>
    `;
  }

  closeResultModal() {
    const modal = document.getElementById("battle-result-modal");
    if (modal) modal.classList.add("hidden");
  }
}
