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
        { id: "open_pack", title: "Mở 1 Gói Thẻ Bất Kỳ", target: 1, current: 0, rewardCoins: 80, completed: false },
        { id: "win_battle", title: "Thắng 2 Trận Đấu Trường", target: 2, current: 0, rewardCoins: 150, completed: false }
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

    // Init Systems
    window.gachaSystem = gachaSystem = new GachaSystem(this);
    window.battleEngine = battleEngine = new BattleEngine(this);

    this.renderHeaderStats();
    this.renderGachaShop();
    this.renderArenaList();
    this.renderCollection();
    this.renderProfile();
    this.renderQuests();

    // Sound init on user gesture
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

  // Grant 3 Starter TCG Cards (Pikachu, Charmander, Squirtle)
  initDefaultStarter() {
    if (this.state.collection.length === 0) {
      const starterIds = ['sv3pt5-25', 'sv3pt5-4', 'sv3pt5-7'];
      starterIds.forEach((id) => {
        const base = POKEMON_TCG_CARDS.find((p) => p.id === id);
        if (base) {
          this.addCardToCollection({
            ...base,
            instanceId: "tcg_starter_" + id + "_" + Date.now(),
            pulledAt: new Date().toISOString()
          });
        }
      });

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
      const saved = localStorage.getItem("pokemon_tcg_save_v2");
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
      localStorage.setItem("pokemon_tcg_save_v2", JSON.stringify(this.state));
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

    document.querySelectorAll(".tab-view").forEach((el) => el.classList.add("hidden"));

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("text-amber-400", "scale-105");
      btn.classList.add("text-slate-400");
    });

    const target = document.getElementById(`view-${tab}`);
    if (target) target.classList.remove("hidden");

    const activeNav = document.getElementById(`nav-${tab === 'battle' ? 'arena-list' : tab}`);
    if (activeNav) {
      activeNav.classList.remove("text-slate-400");
      activeNav.classList.add("text-amber-400", "scale-105");
    }

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
      <div class="relative rounded-3xl bg-gradient-to-r ${pack.color} p-4 border ${pack.border} shadow-2xl flex items-center justify-between overflow-hidden group hover:scale-[1.02] active:scale-[0.98] transition-all">
        <div class="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

        <!-- Left: Pack Info -->
        <div class="z-10 flex-1 pr-3">
          <div class="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/50 text-amber-300 border border-amber-400/30 mb-1">
            ${pack.tag}
          </div>
          <h3 class="text-white font-black text-base tracking-wide drop-shadow">${pack.name}</h3>
          <p class="text-xs text-amber-100/90 font-medium mt-0.5">${pack.subtitle}</p>

          <div class="flex items-center gap-2 mt-3">
            <button onclick="gachaSystem.openPack('${pack.id}')"
                    class="px-4 py-2.5 rounded-2xl bg-black/80 hover:bg-black text-amber-300 border border-amber-400/50 font-black text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all">
              <span>🪙 ${pack.cost} Xu</span>
              <span class="text-white font-semibold">• Mở 5 Thẻ</span>
            </button>
          </div>
        </div>

        <!-- Right: Pack Artwork (High Res Card Cover) -->
        <div class="z-10 w-24 h-32 rounded-xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:rotate-2 group-hover:scale-105 transition-all">
          <img src="${pack.coverCardImage}" class="w-full h-full object-cover" />
        </div>
      </div>
    `).join("");
  }

  // Render Gym Leaders & Battle Arena List
  renderArenaList() {
    const list = document.getElementById("gym-leaders-list");
    if (!list) return;

    const active = this.state.collection.find((c) => c.instanceId === this.state.activePokemonInstanceId) || this.state.collection[0];
    const previewContainer = document.getElementById("active-pokemon-preview");
    if (previewContainer && active) {
      previewContainer.innerHTML = `
        <div class="flex items-center gap-3.5 p-3.5 rounded-3xl bg-slate-900/90 border border-amber-400/30 shadow-xl">
          <div class="w-16 h-22 rounded-xl overflow-hidden border border-white/20 shadow-md">
            <img src="${active.imageSmall}" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="text-white font-black text-sm truncate">${active.name}</h4>
              <span class="text-[9px] px-2 py-0.5 rounded font-black uppercase bg-amber-400 text-slate-950">
                ${active.isEx ? 'THẺ EX' : active.stage}
              </span>
            </div>
            <div class="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
              <span>HP: <b class="text-emerald-400">${active.hp}</b></span>
              <span>Hệ: <b class="text-amber-300 uppercase">${active.type}</b></span>
              <span>Chiêu: <b class="text-slate-200">${active.attacks[0]?.name || 'Tấn Công'}</b></span>
            </div>
          </div>
          <button onclick="app.switchTab('collection')" class="px-3 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 border border-slate-700 hover:bg-slate-700 active:scale-95">
            Đổi Thẻ
          </button>
        </div>
      `;
    }

    list.innerHTML = GYM_LEADERS.map((leader) => `
      <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-all shadow-md">
        <div class="flex items-center gap-3">
          <img src="${leader.avatar}" class="w-12 h-12 rounded-full bg-black/40 border border-white/10 p-0.5" />
          <div>
            <h4 class="text-white font-bold text-sm flex items-center gap-1.5">
              <span>${leader.name}</span>
              <span class="text-[9px] px-1.5 py-0.2 rounded font-black ${
                leader.difficulty === 'Tập Sự' ? 'bg-emerald-500/20 text-emerald-300' :
                leader.difficulty === 'Trung Bình' ? 'bg-blue-500/20 text-blue-300' : 'bg-rose-500/20 text-rose-300'
              }">
                ${leader.difficulty}
              </span>
            </h4>
            <p class="text-[11px] text-slate-400">${leader.gym} • Thưởng: <b class="text-amber-400">+${leader.rewardCoins}🪙</b></p>
          </div>
        </div>

        <button onclick="battleEngine.startBattle('${leader.id}')"
                class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all">
          Vào Đấu ⚔️
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

      return `
        <div onclick="app.openCardDetailModal('${card.instanceId}')"
             class="tcg-card-frame group relative cursor-pointer hover:scale-[1.04] active:scale-95 transition-all ${
               card.rarity === 'mythic' ? 'ring-2 ring-amber-400/80 shadow-amber-500/30' : 
               card.rarity === 'legendary' ? 'ring-1 ring-purple-400/60' : ''
             }">
          
          <img src="${card.imageSmall}" loading="lazy" class="w-full h-full object-cover rounded-xl" />

          <!-- Holo Shimmer Layer -->
          <div class="holo-card-overlay ${card.rarity === 'mythic' ? 'holo-mythic' : card.rarity === 'legendary' ? 'holo-legendary' : ''}"></div>

          ${isSelected ? `
            <div class="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] shadow-lg uppercase tracking-wider z-20">
              Đang Đấu ✓
            </div>
          ` : ''}

          <!-- Rarity Tag Bottom -->
          <div class="absolute bottom-1 inset-x-1 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm text-center">
            <span class="text-[8px] font-black uppercase text-amber-300 truncate block">
              ${card.name}
            </span>
          </div>
        </div>
      `;
    }).join("");
  }

  // Open Full 3D Card Inspector Modal
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

    content.innerHTML = `
      <div class="p-5 flex flex-col items-center text-center">
        <!-- Close Button -->
        <button onclick="app.closeCardDetailModal()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold z-30">
          ✕
        </button>

        <!-- Big 3D Card Display -->
        <div class="tcg-card-frame w-48 h-68 my-2 relative shadow-2xl rounded-2xl overflow-hidden">
          <img src="${card.imageLarge}" class="w-full h-full object-cover rounded-2xl" />
          <div class="holo-card-overlay ${card.rarity === 'mythic' ? 'holo-mythic' : card.rarity === 'legendary' ? 'holo-legendary' : ''}"></div>
        </div>

        <h3 class="text-base font-black text-white mt-2">${card.name}</h3>
        <span class="text-xs text-amber-400 font-bold uppercase tracking-wider">${card.rarityLabel || card.rarity} • ${card.stage}</span>

        <!-- Card Attacks Summary -->
        <div class="w-full my-3 space-y-1.5 text-left">
          ${card.attacks.map((a) => `
            <div class="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span class="text-white font-bold block">${a.name}</span>
                <span class="text-[10px] text-slate-400 font-mono">Chi phí: ${"⚡".repeat(a.cost.length)}</span>
              </div>
              <span class="text-rose-400 font-black text-sm">${a.damage} DMG</span>
            </div>
          `).join("")}
        </div>

        <!-- Action Button: Set Active -->
        <div class="w-full">
          <button onclick="app.setActiveBattlePokemon('${card.instanceId}')"
                  class="w-full py-3 rounded-2xl font-black text-xs uppercase tracking-wider ${
                    isSelected 
                      ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/25 active:scale-95'
                  }"
                  ${isSelected ? 'disabled' : ''}>
            ${isSelected ? 'Đang Là Đội Trưởng Xuất Trận' : 'Chọn Vào Vị Trí Chiến Đấu Chính ⚔️'}
          </button>
        </div>
      </div>
    `;
  }

  closeCardDetailModal() {
    const modal = document.getElementById("card-detail-modal");
    if (modal) modal.classList.add("hidden");
  }

  // Set as Active Battle Card
  setActiveBattlePokemon(instanceId) {
    this.state.activePokemonInstanceId = instanceId;
    this.saveState();
    this.closeCardDetailModal();
    this.renderCollection();
    this.renderArenaList();
    this.showToast("Đã chọn Pokémon làm Đội Trưởng xuất trận!", "success");
    soundEngine.playTap();
  }

  // Render Trainer Profile
  renderProfile() {
    const nameEl = document.getElementById("profile-name");
    const userEl = document.getElementById("profile-username");
    const avatarEl = document.getElementById("profile-avatar");

    if (nameEl) nameEl.innerText = this.tgUser.firstName;
    if (userEl) userEl.innerText = `@${this.tgUser.username} • ID: ${this.tgUser.id}`;
    if (avatarEl && this.tgUser.photoUrl) avatarEl.src = this.tgUser.photoUrl;

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

  // Daily Free Gift (12 hours)
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

  shareToTelegram() {
    soundEngine.playTap();
    const text = encodeURIComponent(`🎮 Tôi vừa rút được thẻ bài Pokémon TCG Siêu Hiếm trên Pokémon Card Battle! Hãy cùng vào so tài nào! ⚡`);
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`;
    
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, "_blank");
    }
  }

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
