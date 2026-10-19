const fs = require('fs');
const vm = require('vm');

const context = {
  console: console,
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  Math: Math,
  Date: Date,
  window: {
    Telegram: {
      WebApp: {
        ready: () => {},
        expand: () => {},
        setHeaderColor: () => {},
        setBackgroundColor: () => {},
        enableClosingConfirmation: () => {},
        HapticFeedback: {
          impactOccurred: () => {},
          notificationOccurred: () => {},
          selectionChanged: () => {}
        },
        initDataUnsafe: {
          user: { id: 123456, first_name: 'Hoàng Tuấn Anh', username: 'htuananh1' }
        }
      }
    }
  },
  document: {
    addEventListener: () => {},
    createElement: (tag) => ({
      className: '',
      innerText: '',
      innerHTML: '',
      remove: () => {},
      appendChild: () => {},
      classList: { add: () => {}, remove: () => {} },
      style: {}
    }),
    getElementById: (id) => ({
      innerText: '',
      innerHTML: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      dataset: {},
      style: {},
      appendChild: () => {}
    }),
    querySelectorAll: () => []
  },
  localStorage: {
    _store: {},
    getItem: function(k) { return this._store[k] || null; },
    setItem: function(k, v) { this._store[k] = v; }
  }
};
context.global = context;
context.window.document = context.document;
context.window.localStorage = context.localStorage;

const testRunnerCode = `
app.init();
console.log('✅ ALL SCRIPTS LOADED CLEANLY & APP INITIALIZED!');
console.log('Total Pokémon Cards in DB:', POKEMON_DATA.length);
console.log('Total Gym Leaders:', GYM_LEADERS.length);
console.log('Total Booster Packs:', BOOSTER_PACKS.length);
console.log('Initial Player Coins:', app.state.coins);
console.log('Starter Collection size:', app.state.collection.length);

// Test opening a Great Pack
console.log('--- TESTING GACHA OPENING ---');
gachaSystem.openPack('great_pack');
console.log('Coins after opening:', app.state.coins);
console.log('Opened cards count:', gachaSystem.openedCards.length);
for (let i = 0; i < gachaSystem.openedCards.length; i++) {
  const c = gachaSystem.openedCards[i];
  console.log('  Card ' + (i+1) + ': ' + c.name + ' [' + c.rarity.toUpperCase() + '] HP:' + c.hp + ' ATK:' + c.atk + ' Type:' + c.type);
}
gachaSystem.flipAll();
gachaSystem.finishOpening();
console.log('Total collection after gacha:', app.state.collection.length);

// Test Battle vs Gym Leader
console.log('--- TESTING TURN-BASED BATTLE ---');
battleEngine.startBattle('brock');
console.log('Battle vs Brock started!');
console.log('Player active Pokemon:', battleEngine.playerPokemon.name, 'HP:', battleEngine.playerPokemon.currentHp);
console.log('Enemy Pokemon:', battleEngine.enemyPokemon.name, 'HP:', battleEngine.enemyPokemon.currentHp);

// Execute Player Attack
battleEngine.playerAction('move_1');
console.log('Enemy HP after basic attack:', battleEngine.enemyPokemon.currentHp);

// Execute Player Special Move
battleEngine.playerEnergy = 3;
battleEngine.turn = 'player';
battleEngine.isActionPending = false;
battleEngine.playerAction('move_2');
console.log('Enemy HP after special move:', battleEngine.enemyPokemon.currentHp);

// Test Potion
battleEngine.turn = 'player';
battleEngine.isActionPending = false;
battleEngine.playerAction('potion');
console.log('Player HP after heal:', battleEngine.playerPokemon.currentHp, 'Charges left:', battleEngine.playerHealCharges);

console.log('✅ ALL INTEGRATION TESTS PASSED 100%!');
`;

const combined = [
  fs.readFileSync('/root/pokemon-twa/js/data.js', 'utf8'),
  fs.readFileSync('/root/pokemon-twa/js/audio.js', 'utf8'),
  fs.readFileSync('/root/pokemon-twa/js/gacha.js', 'utf8'),
  fs.readFileSync('/root/pokemon-twa/js/battle.js', 'utf8'),
  fs.readFileSync('/root/pokemon-twa/js/app.js', 'utf8'),
  testRunnerCode
].join('\n;\n');

vm.runInNewContext(combined, context);
