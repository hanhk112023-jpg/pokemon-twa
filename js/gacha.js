/**
 * Booster Pack Gacha Logic & 3D Opening Ceremony
 */

class GachaSystem {
  constructor(app) {
    this.app = app;
    this.isOpening = false;
    this.openedCards = [];
    this.revealedIndex = 0;
  }

  // Roll a card based on pack probability
  rollCard(pack) {
    const rand = Math.random();
    let accumulated = 0;
    let selectedRarity = "common";

    for (const [rarity, rate] of Object.entries(pack.rates)) {
      accumulated += rate;
      if (rand <= accumulated) {
        selectedRarity = rarity;
        break;
      }
    }

    // Filter pokemon by rarity
    const pool = POKEMON_DATA.filter((p) => p.rarity === selectedRarity);
    const chosen = pool.length > 0 
      ? pool[Math.floor(Math.random() * pool.length)]
      : POKEMON_DATA[Math.floor(Math.random() * POKEMON_DATA.length)];

    // Deep clone card for player's instance
    return {
      ...chosen,
      instanceId: "card_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
      level: 1,
      exp: 0,
      pulledAt: new Date().toISOString()
    };
  }

  // Start opening pack ceremony
  openPack(packId) {
    const pack = BOOSTER_PACKS.find((p) => p.id === packId);
    if (!pack) return;

    // Check balance
    if (this.app.state.coins < pack.cost) {
      this.app.showToast("Không đủ Xu! Hãy chiến đấu ở Đấu trường để kiếm thêm Xu 🪙", "error");
      soundEngine.playTone(220, "square", 0.15, 0.2);
      return;
    }

    // Deduct coins & record quest progress
    this.app.state.coins -= pack.cost;
    this.app.recordQuestProgress("open_pack");
    this.app.saveState();
    this.app.renderHeaderStats();

    // Generate pulled cards
    this.openedCards = [];
    for (let i = 0; i < pack.cardCount; i++) {
      this.openedCards.push(this.rollCard(pack));
    }

    // Trigger haptic & sound
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }
    soundEngine.playPackRip();

    // Show Pack Opening Modal Ceremony
    this.showOpeningModal(pack);
  }

  showOpeningModal(pack) {
    const modal = document.getElementById("pack-open-modal");
    if (!modal) return;

    modal.classList.remove("hidden");
    this.isOpening = true;
    this.revealedIndex = 0;

    const container = document.getElementById("pack-stage-container");
    container.innerHTML = `
      <div id="pack-foil-wrapper" class="relative cursor-pointer transition-transform duration-300 transform hover:scale-105 active:scale-95" onclick="gachaSystem.ripFoil()">
        <!-- Pack Foil Top -->
        <div id="pack-foil-top" class="w-64 h-24 rounded-t-2xl bg-gradient-to-r ${pack.color} border-t-2 border-x-2 ${pack.border} shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-4">
          <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
          <div class="z-10 text-center">
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/40 text-amber-300 border border-amber-400/40 mb-1">
              ${pack.tag}
            </span>
            <h3 class="text-white font-extrabold text-sm drop-shadow-md tracking-wide">${pack.name}</h3>
          </div>
          <!-- Tear Line Indicator -->
          <div class="absolute bottom-0 left-0 right-0 h-1 border-b-2 border-dashed border-white/50"></div>
        </div>

        <!-- Pack Foil Bottom -->
        <div id="pack-foil-bottom" class="w-64 h-72 rounded-b-2xl bg-gradient-to-br ${pack.color} border-b-2 border-x-2 ${pack.border} shadow-2xl relative overflow-hidden flex flex-col items-center justify-between p-6">
          <div class="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          
          <div class="w-28 h-28 rounded-full bg-black/30 border border-white/20 p-2 flex items-center justify-center shadow-inner my-auto">
            <img src="${getPokemonImage(pack.id === 'master_pack' ? 384 : pack.id === 'great_pack' ? 6 : 25)}" 
                 class="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)] animate-pulse" />
          </div>

          <div class="text-center z-10">
            <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-amber-400/40 text-amber-300 font-bold text-xs tracking-wider animate-bounce">
              <span>✂️ Chạm để xé gói thẻ</span>
            </div>
            <p class="text-[11px] text-slate-300/80 mt-2 font-medium">Bên trong gồm ${pack.cardCount} thẻ bài ngẫu nhiên</p>
          </div>
        </div>
      </div>
    `;
  }

  // Rip open the booster foil
  ripFoil() {
    const top = document.getElementById("pack-foil-top");
    const bottom = document.getElementById("pack-foil-bottom");
    if (!top || !bottom) return;

    top.classList.add("tearing-left");
    bottom.classList.add("tearing-right");

    soundEngine.playPackRip();
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }

    setTimeout(() => {
      this.displayCardsReveal();
    }, 500);
  }

  // Display Cards inside for reveal
  displayCardsReveal() {
    const container = document.getElementById("pack-stage-container");
    container.innerHTML = `
      <div class="w-full max-w-sm flex flex-col items-center">
        <div class="text-center mb-3">
          <h4 class="text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2">
            <span>✨ Chạm vào thẻ để lật</span>
            <span id="reveal-counter" class="text-xs px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
              0/${this.openedCards.length}
            </span>
          </h4>
        </div>

        <!-- Cards Deck Container -->
        <div id="cards-deck" class="relative w-64 h-96 flex items-center justify-center">
          ${this.openedCards.map((card, idx) => this.renderFlippableCard(card, idx)).join("")}
        </div>

        <!-- Action Controls -->
        <div class="flex items-center gap-3 mt-6 w-full px-4">
          <button onclick="gachaSystem.flipAll()" 
                  class="flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5">
            <span>⚡ Lật tất cả</span>
          </button>
          <button id="btn-collect-all" onclick="gachaSystem.finishOpening()" 
                  class="hidden flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 active:scale-95 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5">
            <span>Thu Thập Hết ✨</span>
          </button>
        </div>
      </div>
    `;
  }

  renderFlippableCard(card, idx) {
    const rarityClass = this.getRarityStyles(card.rarity);
    const zIndex = this.openedCards.length - idx;
    const offset = idx * 3;

    return `
      <div id="reveal-card-${idx}" 
           class="absolute inset-0 perspective-1000 cursor-pointer select-none transition-transform duration-300"
           style="z-index: ${zIndex}; transform: translateY(${offset}px) scale(${1 - idx * 0.03});"
           onclick="gachaSystem.flipCard(${idx})">
        <div id="card-inner-${idx}" class="relative w-full h-full transform-style-preserve-3d transition-transform duration-500 rounded-2xl shadow-2xl">
          
          <!-- Card Back Face -->
          <div class="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border-2 border-indigo-500/40 p-4 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
            <div class="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"></div>
            <div class="w-24 h-24 rounded-full border-4 border-amber-400/80 bg-red-600/90 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
              <div class="w-full h-1/2 bg-red-600"></div>
              <div class="w-full h-1/2 bg-white"></div>
              <div class="absolute inset-x-0 h-2 bg-slate-900 top-1/2 -translate-y-1/2"></div>
              <div class="absolute w-8 h-8 rounded-full bg-white border-4 border-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-md">
                <div class="w-2 h-2 rounded-full bg-slate-900"></div>
              </div>
            </div>
            <span class="mt-4 text-xs font-black tracking-widest text-indigo-300/80 uppercase">POKÉMON TCG</span>
          </div>

          <!-- Card Front Face -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl ${rarityClass.bg} border-2 ${rarityClass.border} p-3.5 flex flex-col justify-between overflow-hidden ${rarityClass.glow}">
            <!-- Header: Name & HP -->
            <div class="flex items-center justify-between z-10">
              <div>
                <span class="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${rarityClass.tagBg} ${rarityClass.tagText}">
                  ${rarityClass.label}
                </span>
                <h4 class="text-white font-extrabold text-sm drop-shadow mt-0.5">${card.name}</h4>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-[10px] font-bold text-slate-300">HP</span>
                <span class="text-amber-300 font-black text-sm">${card.hp}</span>
              </div>
            </div>

            <!-- Artwork -->
            <div class="relative w-full h-44 rounded-xl bg-black/30 border border-white/10 flex items-center justify-center p-2 my-1 overflow-hidden shadow-inner ${card.rarity === 'mythic' ? 'holo-shimmer' : ''}">
              <img src="${getPokemonImage(card.id)}" class="w-full h-full object-contain filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.7)]" />
              <span class="absolute bottom-1 right-2 text-[10px] font-bold text-white/50 uppercase tracking-wider">#${card.id}</span>
            </div>

            <!-- Moves & Stats -->
            <div class="space-y-1.5 z-10">
              <div class="p-1.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                <span class="text-slate-300 font-bold text-[11px]">${card.moves[0].name}</span>
                <span class="text-amber-400 font-black">${card.moves[0].power}</span>
              </div>
              <div class="p-1.5 rounded-lg bg-black/50 border border-amber-500/20 flex items-center justify-between text-xs">
                <span class="text-amber-300 font-black text-[11px]">${card.moves[1].name}</span>
                <span class="text-rose-400 font-black">${card.moves[1].power}</span>
              </div>
            </div>

            <!-- Footer: Stats bar -->
            <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1 border-t border-white/10 z-10">
              <span>ATK: <b class="text-white">${card.atk}</b></span>
              <span>DEF: <b class="text-white">${card.def}</b></span>
              <span>SPD: <b class="text-white">${card.spd}</b></span>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // Flip single card
  flipCard(idx) {
    const cardInner = document.getElementById(`card-inner-${idx}`);
    if (!cardInner || cardInner.dataset.flipped === "true") return;

    cardInner.style.transform = "rotateY(180deg)";
    cardInner.dataset.flipped = "true";

    const card = this.openedCards[idx];
    soundEngine.playCardFlip(card.rarity);

    if (window.Telegram?.WebApp?.HapticFeedback) {
      if (card.rarity === "mythic" || card.rarity === "legendary") {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
      } else {
        window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
      }
    }

    this.revealedIndex++;
    this.updateRevealProgress();
  }

  // Flip All remaining cards
  flipAll() {
    this.openedCards.forEach((_, idx) => {
      setTimeout(() => {
        this.flipCard(idx);
      }, idx * 120);
    });
  }

  updateRevealProgress() {
    const counter = document.getElementById("reveal-counter");
    if (counter) {
      counter.innerText = `${this.revealedIndex}/${this.openedCards.length}`;
    }

    if (this.revealedIndex >= this.openedCards.length) {
      const btn = document.getElementById("btn-collect-all");
      if (btn) btn.classList.remove("hidden");
    }
  }

  // Finish opening, save cards to binder, close modal
  finishOpening() {
    this.openedCards.forEach((c) => {
      this.app.addCardToCollection(c);
    });

    this.app.saveState();
    this.app.renderCollection();
    this.app.renderHeaderStats();

    const modal = document.getElementById("pack-open-modal");
    if (modal) modal.classList.add("hidden");

    this.isOpening = false;
    this.app.showToast(`Thu thập thành công ${this.openedCards.length} thẻ Pokémon mới! 🎉`, "success");
    soundEngine.playTap();
  }

  getRarityStyles(rarity) {
    switch (rarity) {
      case "mythic":
        return {
          label: "✨ Thần Thoại (Mythic)",
          bg: "bg-gradient-to-b from-amber-900/90 via-slate-900 to-purple-950",
          border: "border-amber-400",
          glow: "glow-mythic",
          tagBg: "bg-amber-400 text-slate-950",
          tagText: "text-slate-950"
        };
      case "legendary":
        return {
          label: "👑 Huyền Thoại",
          bg: "bg-gradient-to-b from-purple-900/90 via-slate-900 to-indigo-950",
          border: "border-purple-400",
          glow: "glow-legendary",
          tagBg: "bg-purple-500 text-white",
          tagText: "text-white"
        };
      case "epic":
        return {
          label: "🔥 Sử Thi (Epic)",
          bg: "bg-gradient-to-b from-indigo-900/90 via-slate-900 to-slate-950",
          border: "border-indigo-400/80",
          glow: "",
          tagBg: "bg-indigo-600 text-white",
          tagText: "text-white"
        };
      case "rare":
        return {
          label: "💎 Quý Hiếm (Rare)",
          bg: "bg-gradient-to-b from-blue-900/80 via-slate-900 to-slate-950",
          border: "border-blue-400/60",
          glow: "",
          tagBg: "bg-blue-600 text-white",
          tagText: "text-white"
        };
      default:
        return {
          label: "⚪ Thường (Common)",
          bg: "bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950",
          border: "border-slate-700",
          glow: "",
          tagBg: "bg-slate-700 text-slate-300",
          tagText: "text-slate-300"
        };
    }
  }
}
