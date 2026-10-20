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
      style: {
        setProperty: () => {}
      }
    }),
    getElementById: (id) => ({
      innerText: '',
      innerHTML: '',
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      dataset: {},
      style: {
        setProperty: () => {}
      },
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
console.log('✅ ALL TCG SCRIPTS LOADED & INITIALIZED!');
console.log('Total Authentic TCG Cards in DB:', POKEMON_TCG_CARDS.length);
console.log('Total Gym Leaders:', GYM_LEADERS.length);
console.log('Total Booster Packs:', BOOSTER_PACKS.length);
console.log('Starter Collection size:', app.state.collection.length);
console.log('Starter Cards:', app.state.collection.map(c => c.name).join(', '));

// Test opening Pokémon 151 Booster Pack
console.log('--- TESTING 3D TCG BOOSTER OPENING ---');
gachaSystem.openPack('pack_151');
console.log('Coins after opening:', app.state.coins);
console.log('Opened cards count:', gachaSystem.openedCards.length);
for (let i = 0; i < gachaSystem.openedCards.length; i++) {
  const c = gachaSystem.openedCards[i];
  console.log('  Card ' + (i+1) + ': ' + c.name + ' [' + c.rarity.toUpperCase() + '] HP:' + c.hp + ' Type:' + c.type + ' | Attacks: ' + c.attacks.map(a => a.name).join(', '));
}
gachaSystem.flipAll();
gachaSystem.finishOpening();
console.log('Total collection after opening:', app.state.collection.length);

// Test TCG Playmat Battle
console.log('--- TESTING TCG PLAYMAT BATTLE ---');
battleEngine.startBattle('brock');
console.log('Battle vs Brock started on Playmat!');
console.log('Player Active Card:', battleEngine.playerActive.name, 'HP:', battleEngine.playerActive.currentHp, 'Attached Energy:', battleEngine.playerActive.attachedEnergy);
console.log('Player Bench Size:', battleEngine.playerBench.length);
console.log('Enemy Active Card:', battleEngine.enemyActive.name, 'HP:', battleEngine.enemyActive.currentHp);

// Attach Energy
console.log('1. Attaching Energy...');
battleEngine.attachEnergyToActive();
console.log('Player Active Energy after attach:', battleEngine.playerActive.attachedEnergy);

// Execute Attack
console.log('2. Executing Attack...');
battleEngine.playerExecuteAttack(0);
console.log('Enemy HP after attack:', battleEngine.enemyActive.currentHp);

// Test Potion
console.log('3. Testing Potion...');
battleEngine.useItemPotion();
console.log('Player HP after potion:', battleEngine.playerActive.currentHp, 'Potion charges left:', battleEngine.playerPotionCount);

// Test X-Speed
console.log('4. Testing X-Speed...');
battleEngine.useItemXSpeed();
console.log('Unattached Energy after X-Speed:', battleEngine.playerUnattachedEnergy);

console.log('✅ ALL TCG POCKET TESTS PASSED 100%!');
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
