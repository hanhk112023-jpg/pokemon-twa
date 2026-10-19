/**
 * Main App Controller & State Manager
 * Telegram WebApp SDK Lifecycle Integration
 */

// Global Instances
let gachaSystem = null;
let battleEngine = null;

class PokemonApp {
  constructor() {
    this.state = {
      coins: 300,
      activePokemonInstanceId: null,
      collection: [],
      stats: {
        battlesWon: 0,
        battlesLost: 0,
        packsOpened: 0
      },
      quests: [
        { id: "open_pack", title: "Mở 1 Gói Thẻ Bất Kỳ", target: 1, current: 0, rewardCoins: 60, completed: false },
        { id: "win_battle", title: "Thắng 2 Trận Đấu Trường", target: 2, current: 0, rewardCoins: 120, completed: false },
        { id: "upgrade_card", title: "Nâng Cấp 1 Thẻ Pokémon", target: 1, current: 0, rewardCoins: 80, completed: false }
      ],
      lastDailyClaim: null
    };

    this.currentTab = "gacha"; // "gacha" | "arena-list" | "battle" | "collection" | "profile"
    this.currentFilterType = "all";
    this.currentFilterRarity = "all";
    this.selectedCardForDetail = null;

    // Telegram User context
    this.tgUser = {
      firstName: "Huấn Luyện Viên",
      username: "PokemonTrainer",
      id: "998877",
      photoUrl: null
    };
  }

  init() {
    this.loadState();
    this.initTelegramSDK();
    this.initDefaultStarter();
    // Init Global Systems
    window.gachaSystem = gachaSystem = new GachaSystem(this);
    window.battleEngine = battleEngine = new BattleEngine(this);

    this.renderHeaderStats();
    this.renderGachaShop();
    this.renderArenaList();
    this.renderCollection();
    this.renderProfile();
    this.renderQuests();

    // Initial audio init on first user touch
    document.addEventListener("touchstart", () => soundEngine.init(), { once: true });
    document.addEventListener("click", () => soundEngine.init(), { once: true });
  }

  // Telegram WebApp SDK Initialization
  initTelegramSDK() {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      try {
        tg.ready();
        tg.expand();
        tg.setHeaderColor("#090d16");
        tg.setBackgroundColor("#090d16");
        tg.enableClosingConfirmation();

        // Extract user from initData
        if (tg.initDataUnsafe?.user) {
          const u = tg.initDataUnsafe.user;
          this.tgUser = {
            firstName: u.first_name || "Huấn Luyện Viên",
            username: u.username || `trainer_${u.id}`,
            id: u.id,
            photoUrl: u.photo_url || null
          };
        }
      } catch (e) {
        console.warn("Telegram WebApp initialization error:", e);
      }
    }
  }

  // Grant 3 starter Pokémon if new player
  initDefaultStarter() {
    if (this.state.collection.length === 0) {
      // Free starters: Pikachu, Charmander, Squirtle
      const starters = [25, 4, 7];
      starters.forEach((id) => {
        const base = POKEMON_DATA.find((p) => p.id === id);
        if (base) {
          this.addCardToCollection({
            ...base,
            instanceId: "starter_" + id + "_" + Date.now(),
            level: 1,
            exp: 0,
            pulledAt: new Date().toISOString()
          });
        }
      });

      // Set Pikachu as default active battle Pokémon
      this.state.activePokemonInstanceId = this.state.collection[0].instanceId;
      this.saveState();
    } else if (!this.state.activePokemonInstanceId && this.state.collection.length > 0) {
      this.state.activePokemonInstanceId = this.state.collection[0].instanceId;
    }
  }

  addCardToCollection(card) {
    this.state.collection.unshift(card);
    this.state.stats.packsOpened++;
  }

  // LocalStorage Persistence
  loadState() {
    try {
      const saved = localStorage.getItem("pokemon_twa_save_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.error("Failed to load state:", e);
    }
  }

  saveState() {
    try {
      localStorage.setItem("pokemon_twa_save_v1", JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state:", e);
    }
  }

  // Switch Active Bottom Tab
  switchTab(tab) {
    soundEngine.playTap();
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    }

    this.currentTab = tab;

    // Hide all views
    document.querySelectorAll(".tab-view").forEach((el) => el.classList.add("hidden"));

    // Deactivate bottom nav buttons
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("text-amber-400", "scale-105");
      btn.classList.add("text-slate-400");
    });

    // Show target view
    const target = document.getElementById(`view-${tab}`);
    if (target) target.classList.remove("hidden");

    // Highlight target button
    const activeNav = document.getElementById(`nav-${tab === 'battle' ? 'arena-list' : tab}`);
    if (activeNav) {
      activeNav.classList.remove("text-slate-400");
      activeNav.classList.add("text-amber-400", "scale-105");
    }

    // Refresh tab contents
    if (tab === "collection") this.renderCollection();
    if (tab === "profile") this.renderProfile();
    if (tab === "gacha") this.renderGachaShop();
    if (tab === "arena-list") this.renderArenaList();
  }

  // Render Top Header Balance & Stats
  renderHeaderStats() {
    const coinsEl = document.getElementById("header-coins");
    if (coinsEl) coinsEl.innerText = this.state.coins.toLocaleString();

    const cardsEl = document.getElementById("header-cards-count");
    if (cardsEl) cardsEl.innerText = this.state.collection.length;
  }

  // Render Booster Packs Shop
  renderGachaShop() {
    const list = document.getElementById("packs-list");
    if (!list) return;

    list.innerHTML = BOOSTER_PACKS.map((pack) => `
      <div class="relative rounded-2xl bg-gradient-to-r ${pack.color} p-4 border ${pack.border} shadow-xl flex items-center justify-between overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all">
        <div class="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

        <!-- Left: Pack Info -->
        <div class="z-10 flex-1 pr-2">
          <div class="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/40 text-amber-300 border border-amber-400/30 mb-1">
            ${pack.tag}
          </div>
          <h3 class="text-white font-extrabold text-base tracking-wide drop-shadow">${pack.name}</h3>
          <p class="text-xs text-slate-200/80 font-medium mt-0.5">Bao gồm ${pack.cardCount} thẻ bài ngẫu nhiên</p>

          <div class="flex items-center gap-2 mt-3">
            <button onclick="gachaSystem.openPack('${pack.id}')"
                    class="px-4 py-2 rounded-xl bg-slate-950/80 hover:bg-black text-amber-400 border border-amber-400/50 font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all">
              <span>🪙 ${pack.cost} Xu</span>
              <span class="text-white font-medium">• Mở Ngay</span>
            </button>
          </div>
        </div>

        <!-- Right: Pack Artwork -->
        <div class="z-10 w-24 h-24 flex items-center justify-center filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]">
          <img src="${getPokemonImage(pack.id === 'master_pack' ? 384 : pack.id === 'great_pack' ? 6 : 25)}" 
               class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
    `).join("");
  }

  // Render Gym Leaders & Battle Arena List
  renderArenaList() {
    const list = document.getElementById("gym-leaders-list");
    if (!list) return;

    // Get active pokemon preview
    const active = this.state.collection.find((c) => c.instanceId === this.state.activePokemonInstanceId) || this.state.collection[0];
    const previewContainer = document.getElementById("active-pokemon-preview");
    if (previewContainer && active) {
      previewContainer.innerHTML = `
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-lg">
          <div class="w-14 h-14 rounded-xl bg-black/40 border border-white/10 p-1 flex items-center justify-center">
            <img src="${getPokemonImage(active.id)}" class="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="text-white font-black text-sm truncate">${active.name}</h4>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Lv.${active.level || 1}
              </span>
            </div>
            <div class="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span>HP: <b class="text-emerald-400">${active.hp}</b></span>
              <span>ATK: <b class="text-amber-400">${active.atk}</b></span>
              <span>Hệ: <b class="text-slate-200 uppercase">${active.type}</b></span>
            </div>
          </div>
          <button onclick="app.switchTab('collection')" class="px-2.5 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700 hover:bg-slate-700">
            Đổi
          </button>
        </div>
      `;
    }

    list.innerHTML = GYM_LEADERS.map((leader) => `
      <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all shadow-md">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-black/40 border border-white/10 p-1 flex items-center justify-center">
            <img src="${leader.avatar}" class="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div>
            <h4 class="text-white font-bold text-sm flex items-center gap-1.5">
              <span>${leader.name}</span>
              <span class="text-[9px] px-1.5 py-0.2 rounded font-black ${leader.difficulty === 'Dễ' ? 'bg-emerald-500/20 text-emerald-300' : leader.difficulty === 'Trung Bình' ? 'bg-blue-500/20 text-blue-300' : 'bg-rose-500/20 text-rose-300'}">
                ${leader.difficulty}
              </span>
            </h4>
            <p class="text-[11px] text-slate-400">${leader.trainerTitle} • Thưởng: <b class="text-amber-400">+${leader.rewardCoins}🪙</b></p>
          </div>
        </div>

        <button onclick="battleEngine.startBattle('${leader.id}')"
                class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all">
          Chiến ⚔️
        </button>
      </div>
    `).join("");
  }

  // Render Collection Binder Grid
  renderCollection() {
    const grid = document.getElementById("collection-grid");
    if (!grid) return;

    let filtered = this.state.collection;
    if (this.currentFilterType !== "all") {
      filtered = filtered.filter((c) => c.type === this.currentFilterType);
    }
    if (this.currentFilterRarity !== "all") {
      filtered = filtered.filter((c) => c.rarity === this.currentFilterRarity);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500">
          <span class="text-3xl block mb-2">🔍</span>
          <p class="text-xs font-semibold">Chưa có thẻ Pokémon nào phù hợp với bộ lọc!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map((card) => {
      const isSelected = card.instanceId === this.state.activePokemonInstanceId;
      const rarityStyles = gachaSystem.getRarityStyles(card.rarity);

      return `
        <div onclick="app.openCardDetailModal('${card.instanceId}')"
             class="relative cursor-pointer rounded-2xl ${rarityStyles.bg} border ${isSelected ? 'border-amber-400 ring-2 ring-amber-400/50' : rarityStyles.border} p-2.5 flex flex-col justify-between shadow-lg hover:scale-[1.03] active:scale-95 transition-all ${card.rarity === 'mythic' ? 'holo-shimmer' : ''}">
          
          ${isSelected ? `
            <div class="absolute -top-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow uppercase tracking-wider z-20">
              Đang Đấu ✓
            </div>
          ` : ''}

          <!-- Header -->
          <div class="flex items-center justify-between">
            <span class="text-[9px] font-black uppercase tracking-wider px-1 py-0.2 rounded ${rarityStyles.tagBg} ${rarityStyles.tagText}">
              Lv.${card.level || 1}
            </span>
            <span class="text-[10px] font-black text-amber-300">${card.hp} HP</span>
          </div>

          <!-- Artwork -->
          <div class="w-full h-24 my-1 flex items-center justify-center">
            <img src="${getPokemonImage(card.id)}" class="w-full h-full object-contain filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]" />
          </div>

          <!-- Name & Type -->
          <div class="text-center pt-1 border-t border-white/10">
            <h5 class="text-white font-extrabold text-xs truncate drop-shadow">${card.name}</h5>
            <span class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">${card.type}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  // Open Detailed Card Modal
  openCardDetailModal(instanceId) {
    const card = this.state.collection.find((c) => c.instanceId === instanceId);
    if (!card) return;

    this.selectedCardForDetail = card;
    soundEngine.playTap();

    const modal = document.getElementById("card-detail-modal");
    if (!modal) return;

    modal.classList.remove("hidden");
    const content = document.getElementById("card-detail-content");
    const isSelected = card.instanceId === this.state.activePokemonInstanceId;
    const upgradeCost = (card.level || 1) * 80;

    content.innerHTML = `
      <div class="p-5 flex flex-col items-center text-center">
        <!-- Close Button -->
        <button onclick="app.closeCardDetailModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold">
          ✕
        </button>

        <!-- Big Card Artwork -->
        <div class="w-40 h-40 my-2 relative flex items-center justify-center">
          <img src="${getPokemonImage(card.id)}" class="w-full h-full object-contain filter drop-shadow-[0_12px_12px_rgba(0,0,0,0.8)]" />
        </div>

        <h3 class="text-lg font-black text-white drop-shadow">${card.name}</h3>
        <span class="text-xs text-amber-400 font-bold">${card.title || 'Pokémon Chiến Binh'}</span>

        <!-- Stats Grid -->
        <div class="grid grid-cols-4 gap-2 w-full my-4 text-center">
          <div class="p-2 rounded-xl bg-slate-900 border border-white/5">
            <span class="text-[9px] text-slate-400 uppercase font-bold block">Cấp Độ</span>
            <span class="text-white font-black text-sm">Lv.${card.level || 1}</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-900 border border-white/5">
            <span class="text-[9px] text-slate-400 uppercase font-bold block">Máu (HP)</span>
            <span class="text-emerald-400 font-black text-sm">${card.hp}</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-900 border border-white/5">
            <span class="text-[9px] text-slate-400 uppercase font-bold block">Tấn Công</span>
            <span class="text-amber-400 font-black text-sm">${card.atk}</span>
          </div>
          <div class="p-2 rounded-xl bg-slate-900 border border-white/5">
            <span class="text-[9px] text-slate-400 uppercase font-bold block">Tốc Độ</span>
            <span class="text-indigo-400 font-black text-sm">${card.spd}</span>
          </div>
        </div>

        <!-- Flavor Text -->
        <p class="text-xs text-slate-300/90 italic bg-black/30 p-2.5 rounded-xl border border-white/5 w-full text-left mb-4">
          "${card.flavor}"
        </p>

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-2 w-full">
          <button onclick="app.setActiveBattlePokemon('${card.instanceId}')"
                  class="py-2.5 rounded-xl font-black text-xs uppercase tracking-wider ${isSelected ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 active:scale-95'}"
                  ${isSelected ? 'disabled' : ''}>
            ${isSelected ? 'Đang Trong Đội' : 'Chọn Chiến Đấu ⚔️'}
          </button>
          <button onclick="app.upgradeCard('${card.instanceId}')"
                  class="py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 active:scale-95">
            Nâng Cấp (${upgradeCost}🪙)
          </button>
        </div>
      </div>
    `;
  }

  closeCardDetailModal() {
    const modal = document.getElementById("card-detail-modal");
    if (modal) modal.classList.add("hidden");
  }

  // Set as Active Battle Pokémon
  setActiveBattlePokemon(instanceId) {
    this.state.activePokemonInstanceId = instanceId;
    this.saveState();
    this.closeCardDetailModal();
    this.renderCollection();
    this.renderArenaList();
    this.showToast("Đã chọn Pokémon vào đội hình chiến đấu chính!", "success");
    soundEngine.playTap();
  }

  // Upgrade Card Stats
  upgradeCard(instanceId) {
    const card = this.state.collection.find((c) => c.instanceId === instanceId);
    if (!card) return;

    const cost = (card.level || 1) * 80;
    if (this.state.coins < cost) {
      this.showToast(`Không đủ Xu! Cần ${cost} Xu để nâng cấp thẻ bài.`, "error");
      soundEngine.playTone(220, "square", 0.15, 0.2);
      return;
    }

    this.state.coins -= cost;
    card.level = (card.level || 1) + 1;
    card.hp = Math.floor(card.hp * 1.08);
    card.atk = Math.floor(card.atk * 1.08);
    card.def = Math.floor(card.def * 1.05);

    this.recordQuestProgress("upgrade_card");
    this.saveState();
    this.renderHeaderStats();
    this.openCardDetailModal(instanceId);

    soundEngine.playTone(659.25, "triangle", 0.25, 0.2);
    this.showToast(`Thăng cấp thành công! ${card.name} đạt Cấp ${card.level}! 🌟`, "success");
  }

  // Render Trainer Profile
  renderProfile() {
    const nameEl = document.getElementById("profile-name");
    const userEl = document.getElementById("profile-username");
    const avatarEl = document.getElementById("profile-avatar");

    if (nameEl) nameEl.innerText = this.tgUser.firstName;
    if (userEl) userEl.innerText = `@${this.tgUser.username} • ID: ${this.tgUser.id}`;
    if (avatarEl && this.tgUser.photoUrl) {
      avatarEl.src = this.tgUser.photoUrl;
    }

    const wonEl = document.getElementById("profile-won");
    const lostEl = document.getElementById("profile-lost");
    const rateEl = document.getElementById("profile-winrate");
    const packsEl = document.getElementById("profile-packs");

    const total = this.state.stats.battlesWon + this.state.stats.battlesLost;
    const winRate = total > 0 ? Math.round((this.state.stats.battlesWon / total) * 100) : 0;

    if (wonEl) wonEl.innerText = this.state.stats.battlesWon;
    if (lostEl) lostEl.innerText = this.state.stats.battlesLost;
    if (rateEl) rateEl.innerText = `${winRate}%`;
    if (packsEl) packsEl.innerText = this.state.stats.packsOpened;
  }

  // Daily Quests Management
  renderQuests() {
    const list = document.getElementById("quests-list");
    if (!list) return;

    list.innerHTML = this.state.quests.map((q) => `
      <div class="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div class="flex-1 pr-3">
          <h5 class="text-white font-bold text-xs">${q.title}</h5>
          <div class="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div class="bg-indigo-500 h-full rounded-full transition-all" style="width: ${Math.min(100, (q.current / q.target) * 100)}%;"></div>
          </div>
          <span class="text-[10px] text-slate-400 mt-1 block">Tiến độ: ${q.current}/${q.target}</span>
        </div>
        <div>
          ${q.completed ? `
            <span class="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
              Đã Nhận ✓
            </span>
          ` : q.current >= q.target ? `
            <button onclick="app.claimQuestReward('${q.id}')"
                    class="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md animate-bounce">
              Nhận ${q.rewardCoins}🪙
            </button>
          ` : `
            <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 font-bold text-xs">
              +${q.rewardCoins}🪙
            </span>
          `}
        </div>
      </div>
    `).join("");
  }

  recordQuestProgress(type) {
    const q = this.state.quests.find((item) => item.id === type);
    if (q && !q.completed) {
      q.current = Math.min(q.target, q.current + 1);
      this.saveState();
      this.renderQuests();
    }
  }

  claimQuestReward(questId) {
    const q = this.state.quests.find((item) => item.id === questId);
    if (!q || q.completed || q.current < q.target) return;

    q.completed = true;
    this.state.coins += q.rewardCoins;
    this.saveState();
    this.renderHeaderStats();
    this.renderQuests();

    soundEngine.playTone(783.99, "sine", 0.3, 0.2);
    this.showToast(`Đã nhận ${q.rewardCoins} Xu từ nhiệm vụ! 🪙`, "success");
  }

  // Daily Free Pack claim (12 hours)
  claimDailyFreeGift() {
    const now = Date.now();
    const cooldown = 12 * 60 * 60 * 1000;
    if (this.state.lastDailyClaim && (now - this.state.lastDailyClaim < cooldown)) {
      const remainingHours = Math.ceil((cooldown - (now - this.state.lastDailyClaim)) / (60 * 60 * 1000));
      this.showToast(`Bạn đã nhận quà hôm nay rồi! Vui lòng quay lại sau ${remainingHours} giờ.`, "error");
      return;
    }

    this.state.lastDailyClaim = now;
    this.state.coins += 150;
    this.saveState();
    this.renderHeaderStats();

    soundEngine.playTone(523.25, "triangle", 0.4, 0.25);
    this.showToast("Chúc mừng! Bạn vừa nhận được 150 Xu miễn phí mỗi ngày! 🎁", "success");
  }

  // Share Card pull or win to Telegram
  shareToTelegram() {
    soundEngine.playTap();
    const text = encodeURIComponent(`🎮 Tôi vừa thu thập được thẻ bài Pokémon huyền thoại trên Pokémon Card Battle TWA! Hãy cùng vào so tài nào! ⚡`);
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`;
    
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, "_blank");
    }
  }

  // Notification Toast Helper
  showToast(message, type = "normal") {
    const toast = document.getElementById("app-toast");
    const toastText = document.getElementById("toast-text");
    if (!toast || !toastText) return;

    toastText.innerText = message;
    toast.className = `fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md border text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
      type === 'error' ? 'bg-rose-950/90 text-rose-200 border-rose-500/50' : 'bg-slate-900/95 text-white border-indigo-500/50 shadow-indigo-500/20'
    }`;
    toast.classList.remove("opacity-0", "pointer-events-none", "-translate-y-4");

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.add("opacity-0", "pointer-events-none", "-translate-y-4");
    }, 2800);
  }
}

// Global App Instance
const app = new PokemonApp();
document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
