/**
 * Pokémon TCG Pocket 3D Gacha System
 * Real Card Scans & Holographic Foil Tilt Physics
 */

class GachaSystem {
  constructor(app) {
    this.app = app;
    this.isOpening = false;
    this.openedCards = [];
    this.revealedIndex = 0;
  }

  // Roll a card based on booster pack drop rates
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

    const pool = POKEMON_TCG_CARDS.filter((p) => p.rarity === selectedRarity);
    const chosen = pool.length > 0 
      ? pool[Math.floor(Math.random() * pool.length)]
      : POKEMON_TCG_CARDS[Math.floor(Math.random() * POKEMON_TCG_CARDS.length)];

    return {
      ...chosen,
      instanceId: "tcg_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
      currentHp: chosen.hp,
      maxHp: chosen.hp,
      attachedEnergy: 0,
      pulledAt: new Date().toISOString()
    };
  }

  // Open Booster Pack
  openPack(packId) {
    const pack = BOOSTER_PACKS.find((p) => p.id === packId);
    if (!pack) return;

    if (this.app.state.coins < pack.cost) {
      this.app.showToast("Không đủ Xu! Hãy chiến đấu ở Đấu trường để kiếm thêm Xu 🪙", "error");
      soundEngine.playTone(220, "square", 0.15, 0.2);
      return;
    }

    this.app.state.coins -= pack.cost;
    this.app.recordQuestProgress("open_pack");
    this.app.saveState();
    this.app.renderHeaderStats();

    this.openedCards = [];
    for (let i = 0; i < pack.cardCount; i++) {
      this.openedCards.push(this.rollCard(pack));
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("heavy");
    }
    soundEngine.playPackRip();

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
      <div id="pack-foil-wrapper" class="booster-pack-3d bg-gradient-to-b ${pack.color} border-2 ${pack.border} flex flex-col justify-between p-4 shadow-2xl" onclick="gachaSystem.ripFoil()">
        <!-- Top crimp -->
        <div id="pack-crimp-top" class="booster-pack-top-crimp"></div>

        <!-- Pack Art & Logo -->
        <div class="text-center pt-5 z-10">
          <span class="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-400/40 shadow">
            ${pack.tag}
          </span>
          <h3 class="text-white font-black text-lg drop-shadow-md mt-1 tracking-wide">${pack.name}</h3>
          <p class="text-[11px] text-amber-200/90 font-medium">${pack.subtitle}</p>
        </div>

        <!-- Center Foil Art -->
        <div class="my-auto relative flex items-center justify-center p-2 z-10">
          <div class="w-36 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <img src="${pack.coverCardImage}" class="w-full h-full object-cover filter drop-shadow" />
          </div>
        </div>

        <!-- Bottom Action CTA -->
        <div class="text-center pb-5 z-10">
          <div class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/70 border border-amber-400/60 text-amber-300 font-extrabold text-xs shadow-lg animate-bounce">
            <span>✂️ Chạm Hoặc Quẹt Để Xé Bao</span>
          </div>
          <p class="text-[10px] text-slate-300 mt-1.5 font-medium">5 Thẻ Pokémon TCG Chính Hãng</p>
        </div>

        <!-- Bottom crimp -->
        <div id="pack-crimp-bottom" class="booster-pack-bottom-crimp"></div>
      </div>
    `;
  }

  // Rip open the pack
  ripFoil() {
    const wrapper = document.getElementById("pack-foil-wrapper");
    if (!wrapper) return;

    wrapper.classList.add("ripping-top");
    soundEngine.playPackRip();

    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    }

    setTimeout(() => {
      this.displayCardsReveal();
    }, 450);
  }

  // Show the 5 cards fan-out for flipping
  displayCardsReveal() {
    const container = document.getElementById("pack-stage-container");
    container.innerHTML = `
      <div class="w-full max-w-sm flex flex-col items-center">
        <!-- Title & Counter -->
        <div class="text-center mb-3">
          <h4 class="text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2">
            <span>✨ Chạm Vào Thẻ Để Lật Mở</span>
            <span id="reveal-counter" class="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
              0/${this.openedCards.length}
            </span>
          </h4>
        </div>

        <!-- Stack of 5 Cards -->
        <div id="cards-stack-area" class="relative w-64 h-96 flex items-center justify-center perspective-1000">
          ${this.openedCards.map((card, idx) => this.renderFlippableTcgCard(card, idx)).join("")}
        </div>

        <!-- Action Controls -->
        <div class="flex items-center gap-3 mt-6 w-full px-4">
          <button onclick="gachaSystem.flipAll()" 
                  class="flex-1 py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-1.5">
            <span>⚡ Lật Tất Cả</span>
          </button>
          <button id="btn-collect-all" onclick="gachaSystem.finishOpening()" 
                  class="hidden flex-1 py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 active:scale-95 transition-all shadow-xl shadow-amber-500/30 flex items-center justify-center gap-1.5 animate-pulse">
            <span>Thu Thập Hết 🌟</span>
          </button>
        </div>
      </div>
    `;

    // Attach 3D Gyro tilt listener to cards
    this.openedCards.forEach((_, idx) => {
      this.attachTiltPhysics(idx);
    });
  }

  // Render individual 3D Card
  renderFlippableTcgCard(card, idx) {
    const zIndex = this.openedCards.length - idx;
    const offset = idx * 4;
    const scale = 1 - idx * 0.03;

    return `
      <div id="tcg-reveal-card-${idx}" 
           class="absolute inset-0 select-none cursor-pointer transition-transform duration-300"
           style="z-index: ${zIndex}; transform: translateY(${offset}px) scale(${scale});"
           onclick="gachaSystem.flipCard(${idx})">
        
        <div id="tcg-card-inner-${idx}" class="relative w-full h-full transform-style-preserve-3d transition-transform duration-500 rounded-2xl shadow-2xl tcg-card-frame">
          
          <!-- Card Back Face: Official Classic TCG Back -->
          <div class="absolute inset-0 backface-hidden rounded-2xl border-2 border-amber-400/40 p-2 flex flex-col items-center justify-center shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950">
            <div class="w-full h-full rounded-xl border border-white/20 flex flex-col items-center justify-center relative overflow-hidden bg-[#182346]">
              <div class="w-28 h-28 rounded-full border-4 border-amber-400/80 bg-red-600/95 flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
                <div class="w-full h-1/2 bg-red-600"></div>
                <div class="w-full h-1/2 bg-white"></div>
                <div class="absolute inset-x-0 h-2.5 bg-slate-900 top-1/2 -translate-y-1/2"></div>
                <div class="absolute w-9 h-9 rounded-full bg-white border-4 border-slate-900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-md">
                  <div class="w-3 h-3 rounded-full bg-slate-900"></div>
                </div>
              </div>
              <span class="mt-4 text-[11px] font-black tracking-widest text-amber-300 uppercase">POKÉMON TCG</span>
            </div>
          </div>

          <!-- Card Front Face: Real Official TCG Card Art Scan -->
          <div class="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-2xl">
            <img src="${card.imageLarge}" 
                 loading="lazy" 
                 class="w-full h-full object-cover rounded-2xl filter drop-shadow-md" />

            <!-- Holographic Foil Overlay -->
            <div class="holo-card-overlay ${card.rarity === 'mythic' ? 'holo-mythic' : card.rarity === 'legendary' ? 'holo-legendary' : ''}"></div>
            
            <!-- Mouse/Touch Glare Light -->
            <div class="card-glare" id="glare-${idx}"></div>

            <!-- Rarity Badge Top Right -->
            <div class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/75 text-amber-300 border border-amber-400/50 shadow">
              ${card.rarityLabel || card.rarity}
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // Interactive 3D Card Hover / Touch Tilt
  attachTiltPhysics(idx) {
    const cardEl = document.getElementById(`tcg-reveal-card-${idx}`);
    const innerEl = document.getElementById(`tcg-card-inner-${idx}`);
    const glareEl = document.getElementById(`glare-${idx}`);
    if (!cardEl || !innerEl) return;

    const handleMove = (clientX, clientY) => {
      if (innerEl.dataset.flipped !== "true") return;
      const rect = cardEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -16;
      const rotateY = ((x - centerX) / centerX) * 16 + 180; // +180 because it's flipped

      innerEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;

      if (glareEl) {
        glareEl.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
        glareEl.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
      }
    };

    const handleReset = () => {
      if (innerEl.dataset.flipped === "true") {
        innerEl.style.transform = "rotateY(180deg) scale(1)";
      }
    };

    cardEl.addEventListener("mousemove", (e) => handleMove(e.clientX, e.clientY));
    cardEl.addEventListener("mouseleave", handleReset);
    cardEl.addEventListener("touchmove", (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    });
    cardEl.addEventListener("touchend", handleReset);
  }

  // Flip Single Card
  flipCard(idx) {
    const inner = document.getElementById(`tcg-card-inner-${idx}`);
    if (!inner || inner.dataset.flipped === "true") return;

    inner.style.transform = "rotateY(180deg)";
    inner.dataset.flipped = "true";

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
      }, idx * 140);
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

  // Collect All cards to player collection
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
    this.app.showToast(`Thu thập thành công ${this.openedCards.length} thẻ Pokémon TCG mới! 🎉`, "success");
    soundEngine.playTap();
  }
}
