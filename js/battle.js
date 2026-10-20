/**
 * Pokémon TCG Pocket Battle Engine
 * Playmat Rules: Active Spot, Bench Slots, Energy Attachment, Prize Points (3 to Win)
 * Dramatic Features: 3D Coin Flip, EX Ultimate Burst, Low HP Heartbeat Tension & Dynamic Multipliers
 */

class BattleEngine {
  constructor(app) {
    this.app = app;
    this.inBattle = false;
    this.turn = "player"; // "player" | "enemy"
    this.turnCount = 1;
    this.isActionPending = false;

    // Player Board State
    this.playerActive = null;
    this.playerBench = [];
    this.playerPrizePoints = 0; // 3 to win
    this.playerUnattachedEnergy = 0;
    this.playerPotionCount = 2;
    this.playerXSpeedCount = 1;
    this.playerExBurst = 0; // 0 to 100%

    // Enemy Board State
    this.enemyActive = null;
    this.enemyBench = [];
    this.enemyPrizePoints = 0; // 3 to win
    this.enemyUnattachedEnergy = 0;
    this.currentLeader = null;
  }

  // Type Chart Multiplier
  getTypeMultiplier(atkType, defType) {
    if (!atkType || !defType) return 1.0;
    const mapping = TYPE_CHART[atkType.toLowerCase()];
    if (!mapping) return 1.0;
    return mapping[defType.toLowerCase()] !== undefined ? mapping[defType.toLowerCase()] : 1.0;
  }

  cloneCardForBattle(card) {
    return {
      ...card,
      currentHp: card.hp,
      maxHp: card.hp,
      attachedEnergy: 0
    };
  }

  // Start Battle vs Gym Leader or Ranked Opponent
  startBattle(leaderId) {
    const leader = GYM_LEADERS.find((l) => l.id === leaderId) || GYM_LEADERS[0];
    this.currentLeader = leader;

    if (this.app.state.collection.length === 0) {
      this.app.showToast("Bạn chưa có thẻ bài nào! Hãy mở gói thẻ trước.", "error");
      return;
    }

    let activeCard = this.app.state.collection.find((c) => c.instanceId === this.app.state.activePokemonInstanceId);
    if (!activeCard) activeCard = this.app.state.collection[0];
    this.playerActive = this.cloneCardForBattle(activeCard);

    // Bench cards (take up to 2 other cards from collection)
    this.playerBench = [];
    for (const c of this.app.state.collection) {
      if (c.instanceId !== activeCard.instanceId && this.playerBench.length < 2) {
        this.playerBench.push(this.cloneCardForBattle(c));
      }
    }

    // Setup Enemy Deck
    let enemyBase = POKEMON_TCG_CARDS.find((c) => c.id === leader.deckCardId);
    if (!enemyBase) enemyBase = POKEMON_TCG_CARDS[0];

    let hpScale = 1.0;
    if (leader.difficulty === "Trung Bình") hpScale = 1.15;
    if (leader.difficulty === "Khó") hpScale = 1.30;
    if (leader.difficulty === "Cực Khó") hpScale = 1.50;
    if (leader.difficulty === "Huyền Thoại") hpScale = 1.85;

    this.enemyActive = {
      ...enemyBase,
      currentHp: Math.floor(enemyBase.hp * hpScale),
      maxHp: Math.floor(enemyBase.hp * hpScale),
      attachedEnergy: 0
    };

    // Enemy Bench
    this.enemyBench = [];
    const pool = POKEMON_TCG_CARDS.filter((c) => c.id !== enemyBase.id);
    if (pool.length > 0) {
      this.enemyBench.push(this.cloneCardForBattle(pool[Math.floor(Math.random() * pool.length)]));
      this.enemyBench.push(this.cloneCardForBattle(pool[Math.floor(Math.random() * pool.length)]));
    }

    // Reset Match Variables
    this.inBattle = true;
    this.turn = "player";
    this.turnCount = 1;
    this.isActionPending = false;
    this.playerPrizePoints = 0;
    this.enemyPrizePoints = 0;
    this.playerUnattachedEnergy = 1;
    this.enemyUnattachedEnergy = 0;
    this.playerPotionCount = 2;
    this.playerXSpeedCount = 1;
    this.playerExBurst = 0;

    this.app.switchTab("battle");
    this.renderPlaymatArena();

    this.logAction(`⚔️ Trận đấu kịch tính bắt đầu! Đối đầu với ${leader.name} (${leader.gym})!`);
  }

  // Render Full TCG Pocket Playmat
  renderPlaymatArena() {
    const container = document.getElementById("battle-screen-container");
    if (!container) return;

    const isLowHp = this.playerActive && (this.playerActive.currentHp / this.playerActive.maxHp) <= 0.35;

    container.innerHTML = `
      <div id="playmat-arena" class="playmat-container rounded-3xl p-3 flex flex-col justify-between min-h-[580px] select-none text-slate-100 ${isLowHp ? 'danger-heartbeat' : ''}">
        
        <!-- ================= OPPONENT ZONE (TOP) ================= -->
        <div class="space-y-2">
          <!-- Opponent Bar: Name, Avatar, Prize Points -->
          <div class="flex items-center justify-between px-2">
            <div class="flex items-center gap-2">
              <img src="${this.currentLeader.avatarImg || this.currentLeader.badgeImg}" 
                   onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png'"
                   class="w-8 h-8 rounded-full bg-black/40 border border-white/20 p-0.5" />
              <div>
                <span class="text-xs font-black text-white block leading-tight">${this.currentLeader.name}</span>
                <span class="text-[10px] text-slate-400">${this.currentLeader.gym}</span>
              </div>
            </div>

            <!-- Enemy Prize Points Badges (Need 3 to win) -->
            <div class="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-xl border border-white/10">
              <span class="text-[10px] text-slate-400 uppercase font-black">Điểm Thắng:</span>
              <span id="enemy-prize-points" class="text-xs font-black text-rose-400 font-mono tracking-wider">
                ${"⭐".repeat(this.enemyPrizePoints)}${"⚪".repeat(3 - this.enemyPrizePoints)}
              </span>
            </div>
          </div>

          <!-- Opponent Bench & Active Spot -->
          <div class="flex items-center justify-around gap-2 pt-1">
            <!-- Opponent Bench -->
            <div class="flex gap-1.5" id="enemy-bench-cards">
              ${this.enemyBench.map((c) => `
                <div class="bench-slot w-14 h-20 rounded-xl overflow-hidden shadow border border-white/10 opacity-80">
                  <img src="${c.imageSmall}" 
                       onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'"
                       class="w-full h-full object-cover" />
                </div>
              `).join("")}
            </div>

            <!-- Opponent Active Card -->
            <div class="flex flex-col items-center">
              <div id="enemy-active-wrapper" class="tcg-card-frame w-28 h-40 active-slot has-card relative shadow-2xl">
                <img id="enemy-active-img" 
                     src="${this.enemyActive.imageLarge}" 
                     onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'"
                     class="w-full h-full object-cover rounded-xl" />
                <div id="enemy-damage-float" class="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none"></div>

                <!-- Attached Energy Counter -->
                <div class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/85 border border-amber-400/50 text-[10px] font-black text-amber-300 flex items-center gap-0.5 shadow">
                  <span>⚡</span>
                  <span id="enemy-attached-energy">${this.enemyActive.attachedEnergy}</span>
                </div>
              </div>

              <!-- Enemy Active HP Bar -->
              <div class="w-28 mt-1 text-center">
                <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/10">
                  <div id="enemy-hp-bar" class="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-300" style="width: 100%;"></div>
                </div>
                <span id="enemy-hp-text" class="text-[10px] font-mono text-slate-300 font-bold block mt-0.5">
                  ${this.enemyActive.currentHp}/${this.enemyActive.maxHp} HP
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= BATTLE TICKER & TURN BADGE (CENTER) ================= -->
        <div class="my-auto text-center py-2 relative z-20">
          <div id="turn-badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-inner">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span id="turn-badge-text">Lượt Của Bạn — Hãy Gắn Năng Lượng</span>
          </div>
          <div id="battle-log" class="text-[11px] text-slate-300 font-medium h-5 mt-1.5 truncate px-4">
            Đang chờ bạn ra quyết định chiến thuật...
          </div>

          <!-- Dynamic Coin Flip Overlay Container -->
          <div id="coin-flip-container" class="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center pointer-events-none">
            <div id="coin-element" class="w-16 h-16 rounded-full border-4 border-amber-400 bg-red-600 flex items-center justify-center text-white text-xl font-black shadow-2xl">
              ⚡
            </div>
            <span id="coin-result-text" class="mt-2 text-xs font-black text-amber-300 uppercase px-3 py-1 rounded-full bg-black/80 border border-amber-400">
              Đang Tung...
            </span>
          </div>
        </div>

        <!-- ================= PLAYER ZONE (BOTTOM) ================= -->
        <div class="space-y-2">
          <!-- Player Active Spot & Bench -->
          <div class="flex items-center justify-around gap-2">
            <!-- Player Active Card -->
            <div class="flex flex-col items-center">
              <div id="player-active-wrapper" class="tcg-card-frame w-28 h-40 active-slot has-card relative shadow-2xl">
                <img id="player-active-img" 
                     src="${this.playerActive.imageLarge}" 
                     onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'"
                     class="w-full h-full object-cover rounded-xl" />
                <div id="player-damage-float" class="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none"></div>

                <!-- Attached Energy Counter -->
                <div class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/85 border border-amber-400/50 text-[10px] font-black text-amber-300 flex items-center gap-0.5 shadow">
                  <span>⚡</span>
                  <span id="player-attached-energy">${this.playerActive.attachedEnergy}</span>
                </div>
              </div>

              <!-- Player Active HP Bar -->
              <div class="w-28 mt-1 text-center">
                <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/10">
                  <div id="player-hp-bar" class="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-300" style="width: 100%;"></div>
                </div>
                <span id="player-hp-text" class="text-[10px] font-mono text-slate-300 font-bold block mt-0.5">
                  ${this.playerActive.currentHp}/${this.playerActive.maxHp} HP
                </span>
              </div>
            </div>

            <!-- Player Bench Slots & EX Gauge -->
            <div class="flex flex-col gap-1.5">
              <!-- EX Ultimate Burst Gauge -->
              <div class="p-2 rounded-xl bg-black/60 border border-purple-500/30 w-36">
                <div class="flex items-center justify-between text-[9px] font-black uppercase text-purple-300 mb-1">
                  <span>Nộ Khí EX:</span>
                  <span id="ex-gauge-text" class="font-mono text-amber-400">${this.playerExBurst}%</span>
                </div>
                <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                  <div id="ex-gauge-bar" class="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-300" style="width: ${this.playerExBurst}%;"></div>
                </div>
              </div>

              <!-- Bench Slots -->
              <div class="flex gap-1.5" id="player-bench-cards">
                ${this.playerBench.map((c, i) => `
                  <div onclick="battleEngine.switchBenchWithActive(${i})" 
                       class="bench-slot w-14 h-20 rounded-xl overflow-hidden shadow border border-indigo-400/40 relative cursor-pointer hover:scale-105 active:scale-95 transition-all group">
                    <img src="${c.imageSmall}" 
                         onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'"
                         class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-all"></div>
                    <span class="absolute bottom-0.5 inset-x-0 text-center text-[8px] font-black bg-black/75 text-indigo-300 uppercase">
                      Đổi ⇄
                    </span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- Player Controls Bar -->
          <div class="bg-black/65 backdrop-blur-md rounded-2xl border border-white/10 p-2.5 space-y-2">
            
            <!-- Energy Bar & Item Buttons -->
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-black uppercase text-amber-400">Năng Lượng:</span>
                <span id="unattached-energy-badge" class="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-black">
                  ⚡ ${this.playerUnattachedEnergy}
                </span>
                <button onclick="battleEngine.attachEnergyToActive()" 
                        class="px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[10px] uppercase shadow active:scale-95 transition-all">
                  + Gắn
                </button>
              </div>

              <!-- Items & EX Button -->
              <div class="flex items-center gap-1.5">
                <button onclick="battleEngine.useItemPotion()" 
                        class="px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-[10px] font-bold text-emerald-300 hover:bg-slate-700 active:scale-95">
                  🧪 Potion (${this.playerPotionCount})
                </button>
                <button onclick="battleEngine.useItemXSpeed()" 
                        class="px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-[10px] font-bold text-cyan-300 hover:bg-slate-700 active:scale-95">
                  ⚡ Nạp Tốc (${this.playerXSpeedCount})
                </button>
              </div>
            </div>

            <!-- EX Ultimate Burst Button (Highlights when gauge >= 100%) -->
            <button id="btn-ex-burst" onclick="battleEngine.triggerExBurst()" 
                    ${this.playerExBurst < 100 ? 'disabled' : ''}
                    class="w-full py-2 rounded-xl text-center font-black text-xs uppercase tracking-wider transition-all shadow-lg ${
                      this.playerExBurst >= 100 
                        ? 'ex-burst-ready text-white cursor-pointer active:scale-95' 
                        : 'bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed opacity-50'
                    }">
              💥 Tuyệt Kỹ Bộc Phá EX Tối Thượng (200 DMG) 💥
            </button>

            <!-- Regular Attacks Container -->
            <div class="grid grid-cols-2 gap-2" id="player-attacks-container">
              ${this.renderAttackButtons()}
            </div>

          </div>

        </div>

      </div>
    `;

    this.updateHpBars();
  }

  // Render Attack buttons from Active Card
  renderAttackButtons() {
    if (!this.playerActive || !this.playerActive.attacks) return "";

    return this.playerActive.attacks.slice(0, 2).map((atk, idx) => {
      const requiredCost = atk.cost.length;
      const canCast = this.playerActive.attachedEnergy >= requiredCost;

      return `
        <button onclick="battleEngine.playerExecuteAttack(${idx})"
                ${!canCast ? 'disabled' : ''}
                class="p-2 rounded-xl text-left transition-all shadow-md flex flex-col justify-between ${
                  canCast 
                    ? 'bg-gradient-to-r from-indigo-900/90 to-purple-900/90 border border-indigo-400/50 hover:from-indigo-800 hover:to-purple-800 active:scale-95 cursor-pointer' 
                    : 'bg-slate-900/80 border border-slate-800 opacity-60 cursor-not-allowed'
                }">
          <div class="flex items-center justify-between w-full">
            <span class="text-white font-extrabold text-xs truncate max-w-[110px]">${atk.name}</span>
            <span class="text-rose-400 font-black text-xs">${atk.damage} DMG</span>
          </div>
          <div class="flex items-center justify-between text-[9px] text-slate-400 mt-1 font-bold">
            <span class="flex items-center gap-0.5 text-amber-300">
              ${atk.hasCoinFlip ? '🪙 Tung Xu' : '⚡ Yêu cầu: ' + '⚡'.repeat(requiredCost)}
            </span>
            <span class="${canCast ? 'text-emerald-400' : 'text-slate-500'} font-black">
              ${canCast ? 'SẴN SÀNG ✓' : `Cần ${requiredCost - this.playerActive.attachedEnergy}⚡`}
            </span>
          </div>
        </button>
      `;
    }).join("");
  }

  // Attach Energy to Active Pokemon
  attachEnergyToActive() {
    if (this.playerUnattachedEnergy <= 0) {
      this.app.showToast("Đã hết năng lượng lượt này! Mỗi lượt bạn được nhận thêm 1 Năng lượng.", "error");
      return;
    }

    this.playerUnattachedEnergy--;
    this.playerActive.attachedEnergy++;
    soundEngine.playTone(523.25, "triangle", 0.2, 0.2);

    const badge = document.getElementById("unattached-energy-badge");
    if (badge) badge.innerText = `⚡ ${this.playerUnattachedEnergy}`;

    const attached = document.getElementById("player-attached-energy");
    if (attached) attached.innerText = this.playerActive.attachedEnergy;

    const atkContainer = document.getElementById("player-attacks-container");
    if (atkContainer) atkContainer.innerHTML = this.renderAttackButtons();

    this.logAction(`⚡ Đã gắn 1 Năng lượng vào ${this.playerActive.name}! (Hiện có ${this.playerActive.attachedEnergy}⚡)`);
  }

  // Switch Bench Pokemon with Active (Retreat)
  switchBenchWithActive(benchIndex) {
    if (!this.inBattle || this.turn !== "player" || this.isActionPending) return;
    if (benchIndex < 0 || benchIndex >= this.playerBench.length) return;

    soundEngine.playTap();
    const temp = this.playerActive;
    this.playerActive = this.playerBench[benchIndex];
    this.playerBench[benchIndex] = temp;

    this.renderPlaymatArena();
    this.logAction(`⇄ Đã đổi ${this.playerActive.name} lên vị trí Chiến Đấu Chính!`);
  }

  // 3D Coin Flip Routine
  triggerCoinFlip(callback) {
    const coinContainer = document.getElementById("coin-flip-container");
    const coinEl = document.getElementById("coin-element");
    const resultText = document.getElementById("coin-result-text");
    if (!coinContainer || !coinEl) {
      callback(Math.random() > 0.5);
      return;
    }

    coinContainer.classList.remove("hidden");
    coinEl.className = "w-16 h-16 rounded-full border-4 border-amber-400 bg-red-600 flex items-center justify-center text-white text-xl font-black shadow-2xl coin-spin";
    resultText.innerText = "Đang Tung Đồng Xu...";
    soundEngine.playTone(880, "square", 0.1, 0.3);

    const isHeads = Math.random() > 0.5;

    setTimeout(() => {
      coinEl.className = `w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center text-2xl font-black shadow-2xl ${
        isHeads ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'
      }`;
      coinEl.innerText = isHeads ? '👑' : '⚪';
      resultText.innerText = isHeads ? '✨ MẶT NGỬA (HEADS)!' : 'MẶT SẤP (TAILS)';
      soundEngine.playTone(isHeads ? 987.77 : 330, "triangle", 0.25, 0.2);

      setTimeout(() => {
        coinContainer.classList.add("hidden");
        callback(isHeads);
      }, 700);
    }, 750);
  }

  // Player Execute Attack with Coin Flip & Drama
  playerExecuteAttack(attackIndex) {
    if (!this.inBattle || this.turn !== "player" || this.isActionPending) return;

    const atk = this.playerActive.attacks[attackIndex];
    if (!atk) return;

    if (this.playerActive.attachedEnergy < atk.cost.length) {
      this.app.showToast(`Cần ${atk.cost.length}⚡ Năng lượng để dùng [${atk.name}]!`, "error");
      return;
    }

    this.isActionPending = true;

    // Check if attack involves Coin Flip
    if (atk.hasCoinFlip) {
      this.triggerCoinFlip((isHeads) => {
        this.resolvePlayerDamage(atk, isHeads);
      });
    } else {
      this.resolvePlayerDamage(atk, false);
    }
  }

  resolvePlayerDamage(atk, isCoinHeads) {
    soundEngine.playAttack();

    const activeEl = document.getElementById("player-active-wrapper");
    if (activeEl) activeEl.classList.add("strike-lunge");
    setTimeout(() => activeEl?.classList.remove("strike-lunge"), 350);

    const mult = this.getTypeMultiplier(this.playerActive.type, this.enemyActive.type);
    let finalDamage = Math.floor(atk.damage * mult);

    if (isCoinHeads) {
      finalDamage = Math.floor(finalDamage * 1.5) + 30; // Coin heads bonus!
    }

    this.enemyActive.currentHp = Math.max(0, this.enemyActive.currentHp - finalDamage);

    // Charge EX Burst gauge when dealing damage
    this.playerExBurst = Math.min(100, this.playerExBurst + 25);
    this.updateExBurstGauge();

    if (isCoinHeads || mult > 1) {
      soundEngine.playSuperEffective();
      this.showFloatingText(false, `${isCoinHeads ? '💥 TUNG XU BẠO KÍCH!' : '⚡ KHẮC HỆ x2!'} -${finalDamage}`, "crit");
    } else {
      soundEngine.playCrit();
      this.showFloatingText(false, `-${finalDamage}`);
    }

    document.getElementById("playmat-arena")?.classList.add("shake");
    setTimeout(() => document.getElementById("playmat-arena")?.classList.remove("shake"), 350);

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }

    this.updateHpBars();
    this.logAction(`💥 ${this.playerActive.name} dùng [${atk.name}] gây ${finalDamage} sát thương!`);

    if (this.enemyActive.currentHp <= 0) {
      setTimeout(() => this.handleEnemyKnockOut(), 700);
    } else {
      this.endTurn("player");
    }
  }

  // EX Ultimate Burst
  triggerExBurst() {
    if (this.playerExBurst < 100 || !this.inBattle || this.turn !== "player" || this.isActionPending) return;

    this.isActionPending = true;
    this.playerExBurst = 0;
    this.updateExBurstGauge();

    soundEngine.playTone(1046.5, "sawtooth", 0.6, 0.4);
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }

    // Dramatic Screen Flash
    const arena = document.getElementById("playmat-arena");
    if (arena) arena.classList.add("brightness-150");
    setTimeout(() => arena?.classList.remove("brightness-150"), 400);

    const burstDamage = 200;
    this.enemyActive.currentHp = Math.max(0, this.enemyActive.currentHp - burstDamage);

    this.showFloatingText(false, `🔥 EX ULTIMATE BURST! -${burstDamage}`, "crit");
    document.getElementById("playmat-arena")?.classList.add("shake");
    setTimeout(() => document.getElementById("playmat-arena")?.classList.remove("shake"), 400);

    this.updateHpBars();
    this.logAction(`🔥 BỘC PHÁ EX TỐI THƯỢNG GÂY ${burstDamage} SÁT THƯƠNG HỦY DIỆT!`);

    if (this.enemyActive.currentHp <= 0) {
      setTimeout(() => this.handleEnemyKnockOut(), 700);
    } else {
      this.endTurn("player");
    }
  }

  updateExBurstGauge() {
    const text = document.getElementById("ex-gauge-text");
    const bar = document.getElementById("ex-gauge-bar");
    const btn = document.getElementById("btn-ex-burst");

    if (text) text.innerText = `${this.playerExBurst}%`;
    if (bar) bar.style.width = `${this.playerExBurst}%`;

    if (btn) {
      if (this.playerExBurst >= 100) {
        btn.disabled = false;
        btn.className = "w-full py-2 rounded-xl text-center font-black text-xs uppercase tracking-wider transition-all shadow-lg ex-burst-ready text-white cursor-pointer active:scale-95";
      } else {
        btn.disabled = true;
        btn.className = "w-full py-2 rounded-xl text-center font-black text-xs uppercase tracking-wider transition-all shadow-lg bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed opacity-50";
      }
    }
  }

  // Handle Knock Out on Enemy
  handleEnemyKnockOut() {
    const pointsAwarded = this.enemyActive.isEx ? 2 : 1;
    this.playerPrizePoints += pointsAwarded;
    soundEngine.playVictory();

    this.logAction(`💀 ${this.enemyActive.name} ĐÃ BỊ HẠ GỤC! Bạn nhận +${pointsAwarded} Điểm Thắng!`);

    if (this.playerPrizePoints >= 3) {
      setTimeout(() => this.handleMatchVictory(), 800);
      return;
    }

    if (this.enemyBench.length > 0) {
      this.enemyActive = this.enemyBench.shift();
      this.renderPlaymatArena();
      this.logAction(`⚠️ ${this.currentLeader.name} đưa ${this.enemyActive.name} từ ghế dự bị lên sàn đấu!`);
      this.endTurn("player");
    } else {
      this.handleMatchVictory();
    }
  }

  // Opponent AI Turn
  executeEnemyTurn() {
    if (!this.inBattle || this.enemyActive.currentHp <= 0) return;

    this.enemyActive.attachedEnergy++;
    const attachedBadge = document.getElementById("enemy-attached-energy");
    if (attachedBadge) attachedBadge.innerText = this.enemyActive.attachedEnergy;

    setTimeout(() => {
      let chosenAtk = this.enemyActive.attacks[0];
      if (this.enemyActive.attacks[1] && this.enemyActive.attachedEnergy >= this.enemyActive.attacks[1].cost.length) {
        chosenAtk = this.enemyActive.attacks[1];
      }

      const activeEl = document.getElementById("enemy-active-wrapper");
      if (activeEl) activeEl.classList.add("strike-lunge");
      setTimeout(() => activeEl?.classList.remove("strike-lunge"), 350);

      const mult = this.getTypeMultiplier(this.enemyActive.type, this.playerActive.type);
      let damage = Math.floor(chosenAtk.damage * mult);

      this.playerActive.currentHp = Math.max(0, this.playerActive.currentHp - damage);

      // Charge player EX Burst when taking damage
      this.playerExBurst = Math.min(100, this.playerExBurst + 30);
      this.updateExBurstGauge();

      soundEngine.playAttack();
      this.showFloatingText(true, `-${damage}`);

      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
      }

      this.updateHpBars();
      this.logAction(`⚠️ ${this.enemyActive.name} dùng [${chosenAtk.name}] gây ${damage} sát thương!`);

      if (this.playerActive.currentHp <= 0) {
        setTimeout(() => this.handlePlayerKnockOut(), 700);
      } else {
        this.endTurn("enemy");
      }
    }, 1100);
  }

  handlePlayerKnockOut() {
    const points = this.playerActive.isEx ? 2 : 1;
    this.enemyPrizePoints += points;
    soundEngine.playDefeat();

    this.logAction(`💀 Pokémon của bạn đã bị hạ gục! Đối thủ nhận +${points} Điểm Thắng.`);

    if (this.enemyPrizePoints >= 3) {
      setTimeout(() => this.handleMatchDefeat(), 800);
      return;
    }

    if (this.playerBench.length > 0) {
      this.playerActive = this.playerBench.shift();
      this.renderPlaymatArena();
      this.logAction(`Đã đưa ${this.playerActive.name} từ ghế dự bị lên thay thế!`);
      this.endTurn("enemy");
    } else {
      this.handleMatchDefeat();
    }
  }

  endTurn(currentTurn) {
    if (currentTurn === "player") {
      this.turn = "enemy";
      this.updateTurnBadge("Lượt Của Đối Thủ...", "bg-rose-500/20 text-rose-300 border-rose-500/30");
      setTimeout(() => this.executeEnemyTurn(), 1000);
    } else {
      this.turn = "player";
      this.turnCount++;
      this.isActionPending = false;
      this.playerUnattachedEnergy++;
      this.renderPlaymatArena();
      this.updateTurnBadge("Lượt Của Bạn — Hãy Gắn Năng Lượng & Tấn Công", "bg-amber-500/20 text-amber-300 border-amber-500/40");
    }
  }

  useItemPotion() {
    if (this.playerPotionCount <= 0) {
      this.app.showToast("Đã hết Dược Phẩm Potion trong trận đấu này!", "error");
      return;
    }

    this.playerPotionCount--;
    const healAmount = 50;
    this.playerActive.currentHp = Math.min(this.playerActive.maxHp, this.playerActive.currentHp + healAmount);

    soundEngine.playHeal();
    this.showFloatingText(true, `+${healAmount} HP`, "heal");
    this.updateHpBars();
    this.logAction(`🧪 Dùng Potion hồi phục +${healAmount} HP cho ${this.playerActive.name}!`);
  }

  useItemXSpeed() {
    if (this.playerXSpeedCount <= 0) {
      this.app.showToast("Đã dùng hết Nạp Tốc X-Speed!", "error");
      return;
    }

    this.playerXSpeedCount--;
    this.playerUnattachedEnergy += 2;
    soundEngine.playTone(784, "sine", 0.3, 0.2);

    const badge = document.getElementById("unattached-energy-badge");
    if (badge) badge.innerText = `⚡ ${this.playerUnattachedEnergy}`;

    this.app.showToast("⚡ Nhận thêm +2 Năng Lượng bổ sung từ X-Speed!", "success");
    this.logAction("⚡ Dùng X-Speed nạp tức thì +2 Năng lượng!");
  }

  updateHpBars() {
    const enemyHpBar = document.getElementById("enemy-hp-bar");
    const enemyHpText = document.getElementById("enemy-hp-text");
    const playerHpBar = document.getElementById("player-hp-bar");
    const playerHpText = document.getElementById("player-hp-text");

    if (enemyHpBar && enemyHpText && this.enemyActive) {
      const pct = Math.max(0, Math.min(100, (this.enemyActive.currentHp / this.enemyActive.maxHp) * 100));
      enemyHpBar.style.width = `${pct}%`;
      enemyHpText.innerText = `${this.enemyActive.currentHp}/${this.enemyActive.maxHp} HP`;
    }

    if (playerHpBar && playerHpText && this.playerActive) {
      const pct = Math.max(0, Math.min(100, (this.playerActive.currentHp / this.playerActive.maxHp) * 100));
      playerHpBar.style.width = `${pct}%`;
      playerHpText.innerText = `${this.playerActive.currentHp}/${this.playerActive.maxHp} HP`;

      const arena = document.getElementById("playmat-arena");
      if (arena) {
        if (pct <= 35) {
          arena.classList.add("danger-heartbeat");
        } else {
          arena.classList.remove("danger-heartbeat");
        }
      }
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

  logAction(msg) {
    const log = document.getElementById("battle-log");
    if (log) log.innerText = msg;
  }

  showFloatingText(isPlayer, text, type = "normal") {
    const container = document.getElementById(isPlayer ? "player-damage-float" : "enemy-damage-float");
    if (!container || typeof container.appendChild !== "function") return;

    const el = document.createElement("div");
    let color = "text-rose-400 font-extrabold text-sm";
    if (type === "crit") color = "text-amber-300 font-black text-base drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]";
    if (type === "heal") color = "text-emerald-400 font-black text-sm";

    el.className = `floating-damage font-black ${color} tracking-wider pointer-events-none`;
    el.innerText = text;
    container.appendChild(el);

    setTimeout(() => el.remove(), 1200);
  }

  handleMatchVictory() {
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

    this.app.saveState();
    this.app.renderHeaderStats();

    this.showEndBattleModal(true, coinsReward, expReward);
  }

  handleMatchDefeat() {
    this.inBattle = false;
    soundEngine.playDefeat();

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("error");
    }

    this.app.state.stats.battlesLost++;
    this.app.saveState();

    this.showEndBattleModal(false, 0, 15);
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
          ${isVictory ? 'Chiến Thắng Tuyệt Đối!' : 'Thất Bại Tiếc Nuối!'}
        </h3>
        <p class="text-xs text-slate-300 mt-1">
          ${isVictory 
            ? `Bạn đã xuất sắc đánh bại ${this.currentLeader.name} và giành trọn 3 Điểm Thắng!` 
            : `Toàn bộ đội hình của bạn đã kiệt sức trước ${this.currentLeader.name}. Hãy thử lại!`
          }
        </p>

        <!-- Rewards Box -->
        <div class="my-5 p-3.5 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-around shadow-inner">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🪙</span>
            <div class="text-left">
              <span class="text-[10px] text-slate-400 uppercase font-black block">Phần Thưởng</span>
              <span class="text-amber-400 font-black text-base">+${coins} Xu</span>
            </div>
          </div>
          <div class="h-8 w-px bg-white/10"></div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">⭐</span>
            <div class="text-left">
              <span class="text-[10px] text-slate-400 uppercase font-black block">Kinh Nghiệm</span>
              <span class="text-indigo-400 font-black text-base">+${exp} EXP</span>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="space-y-2">
          <button onclick="battleEngine.closeResultModal(); battleEngine.startBattle('${this.currentLeader.id}')" 
                  class="w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95 transition-all">
            Đấu Lại Trận Này ⚔️
          </button>
          <button onclick="battleEngine.closeResultModal(); app.switchTab('leaderboard')" 
                  class="w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow active:scale-95 transition-all">
            Xem Bảng Xếp Hạng 🏆
          </button>
          <button onclick="battleEngine.closeResultModal(); app.switchTab('arena-list')" 
                  class="w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition-all">
            Quay Về Danh Sách Đấu Trường
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
