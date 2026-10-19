/**
 * Web Audio API 8-bit Retro Synthesizer
 * Zero external audio dependencies - 100% offline, zero lag
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "square", duration = 0.1, volume = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // UI Tap sound
  playTap() {
    this.playTone(600, "sine", 0.04, 0.08);
  }

  // Pack rip tear sound
  playPackRip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      // White noise buffer for paper ripping sound
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(3, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    } catch (e) {}
  }

  // Card Flip Chime
  playCardFlip(rarity = "common") {
    if (!this.enabled) return;
    this.init();

    if (rarity === "mythic" || rarity === "legendary") {
      // Golden fanfare chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, "triangle", 0.35, 0.18), idx * 70);
      });
    } else if (rarity === "epic") {
      [440, 554.37, 659.25].forEach((freq, idx) => {
        setTimeout(() => this.playTone(freq, "triangle", 0.25, 0.15), idx * 60);
      });
    } else if (rarity === "rare") {
      this.playTone(587.33, "triangle", 0.15, 0.12);
      setTimeout(() => this.playTone(880, "triangle", 0.2, 0.12), 70);
    } else {
      this.playTone(400, "sine", 0.08, 0.1);
    }
  }

  // Physical attack hit
  playAttack() {
    this.playTone(180, "sawtooth", 0.12, 0.2);
    setTimeout(() => this.playTone(90, "triangle", 0.15, 0.25), 40);
  }

  // Critical hit impact
  playCrit() {
    this.playTone(280, "square", 0.08, 0.25);
    setTimeout(() => this.playTone(140, "sawtooth", 0.18, 0.3), 50);
    setTimeout(() => this.playTone(80, "triangle", 0.25, 0.35), 90);
  }

  // Super effective fanfare
  playSuperEffective() {
    this.playTone(440, "sine", 0.1, 0.2);
    setTimeout(() => this.playTone(880, "triangle", 0.2, 0.25), 80);
  }

  // Shield / Guard sound
  playShield() {
    this.playTone(320, "sine", 0.2, 0.15);
    setTimeout(() => this.playTone(480, "sine", 0.25, 0.15), 60);
  }

  // Heal potion sound
  playHeal() {
    [392.0, 523.25, 659.25, 783.99].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, "sine", 0.18, 0.15), i * 60);
    });
  }

  // Victory Fanfare
  playVictory() {
    const melody = [
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.15 },
      { f: 523.25, d: 0.4 },
      { f: 415.3,  d: 0.4 },
      { f: 466.16, d: 0.4 },
      { f: 523.25, d: 0.2 },
      { f: 466.16, d: 0.1 },
      { f: 523.25, d: 0.6 }
    ];
    let time = 0;
    melody.forEach((note) => {
      setTimeout(() => {
        this.playTone(note.f, "triangle", note.d, 0.22);
      }, time * 1000);
      time += note.d * 0.9;
    });
  }

  // Defeat sorrow
  playDefeat() {
    [400, 360, 320, 260].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, "sawtooth", 0.25, 0.18), i * 140);
    });
  }
}

const soundEngine = new SoundEngine();
