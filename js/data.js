/**
 * Official Pokémon TCG Card Database & Leaderboard Data
 */

const POKEMON_TCG_CARDS = [
  {
    "id": "sv3pt5-1",
    "name": "Bulbasaur",
    "hp": 70,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "common",
    "rarityLabel": "Common",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "Heal 20 damage from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/1.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/1_hires.png"
  },
  {
    "id": "sv3pt5-2",
    "name": "Ivysaur",
    "hp": 100,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "rare",
    "rarityLabel": "Uncommon",
    "isEx": false,
    "stage": "Stage 1",
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Heal 20 damage from this Pokémon.",
        "hasCoinFlip": false
      },
      {
        "name": "Vine Whip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/2.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/2_hires.png"
  },
  {
    "id": "sv3pt5-3",
    "name": "Venusaur ex",
    "hp": 340,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Dangerous Toxwhip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 150,
        "damageText": "150",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/3.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/3_hires.png"
  },
  {
    "id": "sv3pt5-4",
    "name": "Charmander",
    "hp": 70,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "common",
    "rarityLabel": "Common",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Blazing Destruction",
        "cost": [
          "Fire"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Discard a Stadium in play.",
        "hasCoinFlip": false
      },
      {
        "name": "Steady Firebreathing",
        "cost": [
          "Fire",
          "Fire"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/4.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/4_hires.png"
  },
  {
    "id": "sv3pt5-5",
    "name": "Charmeleon",
    "hp": 100,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "rare",
    "rarityLabel": "Uncommon",
    "isEx": false,
    "stage": "Stage 1",
    "attacks": [
      {
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "",
        "hasCoinFlip": false
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 90,
        "damageText": "90",
        "text": "Discard an Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/5.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/5_hires.png"
  },
  {
    "id": "sv3pt5-6",
    "name": "Charizard ex",
    "hp": 330,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Brave Wing",
        "cost": [
          "Fire"
        ],
        "damage": 60,
        "damageText": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage.",
        "hasCoinFlip": true
      },
      {
        "name": "Explosive Vortex",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 330,
        "damageText": "330",
        "text": "Discard 3 Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/6.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/6_hires.png"
  },
  {
    "id": "sv3pt5-7",
    "name": "Squirtle",
    "hp": 60,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "common",
    "rarityLabel": "Common",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Withdraw",
        "cost": [
          "Water"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks.",
        "hasCoinFlip": true
      },
      {
        "name": "Skull Bash",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/7.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/7_hires.png"
  },
  {
    "id": "sv3pt5-8",
    "name": "Wartortle",
    "hp": 100,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "rare",
    "rarityLabel": "Uncommon",
    "isEx": false,
    "stage": "Stage 1",
    "attacks": [
      {
        "name": "Free Diving",
        "cost": [
          "Water"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Put up to 3 Basic Water Energy cards from your discard pile into your hand.",
        "hasCoinFlip": false
      },
      {
        "name": "Spinning Attack",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 50,
        "damageText": "50",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/8.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/8_hires.png"
  },
  {
    "id": "sv3pt5-9",
    "name": "Blastoise ex",
    "hp": 330,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Twin Cannons",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 140,
        "damageText": "140×",
        "text": "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/9.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/9_hires.png"
  },
  {
    "id": "sv3pt5-16",
    "name": "Pidgey",
    "hp": 50,
    "type": "colorless",
    "types": [
      "Colorless"
    ],
    "rarity": "common",
    "rarityLabel": "Common",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck.",
        "hasCoinFlip": false
      },
      {
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/16.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/16_hires.png"
  },
  {
    "id": "sv3pt5-25",
    "name": "Pikachu",
    "hp": 60,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "common",
    "rarityLabel": "Common",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Lightning"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Search your deck for a Basic Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck.",
        "hasCoinFlip": false
      },
      {
        "name": "Pika Punch",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 50,
        "damageText": "50",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/25.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/25_hires.png"
  },
  {
    "id": "sv3pt5-65",
    "name": "Alakazam ex",
    "hp": 310,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Mind Jack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 90,
        "damageText": "90+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon.",
        "hasCoinFlip": true
      },
      {
        "name": "Dimensional Hand",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "This attack can be used even if this Pokémon is on the Bench.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/65.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/65_hires.png"
  },
  {
    "id": "sv3pt5-68",
    "name": "Machamp",
    "hp": 180,
    "type": "fighting",
    "types": [
      "Fighting"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Mountain Chopping",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "damage": 100,
        "damageText": "100",
        "text": "Discard the top 2 cards of your opponent's deck.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/68.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/68_hires.png"
  },
  {
    "id": "sv3pt5-74",
    "name": "Geodude",
    "hp": 80,
    "type": "fighting",
    "types": [
      "Fighting"
    ],
    "rarity": "common",
    "rarityLabel": "Common",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Stiffen",
        "cost": [
          "Fighting"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "hasCoinFlip": false
      },
      {
        "name": "Knuckle Punch",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/74.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/74_hires.png"
  },
  {
    "id": "sv3pt5-76",
    "name": "Golem ex",
    "hp": 330,
    "type": "fighting",
    "types": [
      "Fighting"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Dynamic Roll",
        "cost": [
          "Fighting"
        ],
        "damage": 50,
        "damageText": "50",
        "text": "During your next turn, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "hasCoinFlip": false
      },
      {
        "name": "Rock Blaster",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 180,
        "damageText": "180",
        "text": "This attack's damage isn't affected by Resistance.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/76.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/76_hires.png"
  },
  {
    "id": "sv3pt5-94",
    "name": "Gengar",
    "hp": 130,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Poltergeist",
        "cost": [
          "Psychic"
        ],
        "damage": 50,
        "damageText": "50×",
        "text": "Your opponent reveals their hand. This attack does 50 damage for each Trainer card you find there.",
        "hasCoinFlip": false
      },
      {
        "name": "Hollow Dive",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 110,
        "damageText": "110",
        "text": "Put 3 damage counters on your opponent's Benched Pokémon in any way you like.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/94.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/94_hires.png"
  },
  {
    "id": "sv3pt5-95",
    "name": "Onix",
    "hp": 120,
    "type": "fighting",
    "types": [
      "Fighting"
    ],
    "rarity": "rare",
    "rarityLabel": "Uncommon",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Thumpalanche",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80×",
        "text": "Discard the top 5 cards of your deck. This attack does 80 damage for each Pokémon with a Retreat Cost of exactly 4 that you discarded in this way.",
        "hasCoinFlip": false
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 100,
        "damageText": "100",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/95.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/95_hires.png"
  },
  {
    "id": "sv3pt5-143",
    "name": "Snorlax",
    "hp": 150,
    "type": "colorless",
    "types": [
      "Colorless"
    ],
    "rarity": "rare",
    "rarityLabel": "Uncommon",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Thudding Press",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 130,
        "damageText": "130",
        "text": "This Pokémon also does 30 damage to itself.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/143.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/143_hires.png"
  },
  {
    "id": "sv3pt5-144",
    "name": "Articuno",
    "hp": 120,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 110,
        "damageText": "110",
        "text": "This attack also does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/144.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/144_hires.png"
  },
  {
    "id": "sv3pt5-145",
    "name": "Zapdos ex",
    "hp": 200,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Multishot Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "This attack also does 90 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/145.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/145_hires.png"
  },
  {
    "id": "sv3pt5-146",
    "name": "Moltres",
    "hp": 120,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Blazing Flight",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Discard 2 Fire Energy from this Pokémon. This attack does 120 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/146.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/146_hires.png"
  },
  {
    "id": "sv3pt5-149",
    "name": "Dragonite",
    "hp": 180,
    "type": "dragon",
    "types": [
      "Dragon"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Dragon Pulse",
        "cost": [
          "Water",
          "Lightning"
        ],
        "damage": 180,
        "damageText": "180",
        "text": "Discard the top 2 cards of your deck.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/149.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/149_hires.png"
  },
  {
    "id": "sv3pt5-150",
    "name": "Mewtwo",
    "hp": 130,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Reflective Barrier",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if it is Knocked Out), put damage counters on the Attacking Pokémon equal to the damage done to this Pokémon.",
        "hasCoinFlip": false
      },
      {
        "name": "Psyslash",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "damage": 130,
        "damageText": "130",
        "text": "Discard 2 Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/150.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/150_hires.png"
  },
  {
    "id": "sv3pt5-151",
    "name": "Mew ex",
    "hp": 180,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "legendary",
    "rarityLabel": "Double Rare",
    "isEx": true,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Genome Hacking",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/151.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/151_hires.png"
  },
  {
    "id": "sv3pt5-166",
    "name": "Bulbasaur",
    "hp": 70,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "Heal 20 damage from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/166.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/166_hires.png"
  },
  {
    "id": "sv3pt5-167",
    "name": "Ivysaur",
    "hp": 100,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Stage 1",
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Heal 20 damage from this Pokémon.",
        "hasCoinFlip": false
      },
      {
        "name": "Vine Whip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/167.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/167_hires.png"
  },
  {
    "id": "sv3pt5-168",
    "name": "Charmander",
    "hp": 70,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Blazing Destruction",
        "cost": [
          "Fire"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Discard a Stadium in play.",
        "hasCoinFlip": false
      },
      {
        "name": "Steady Firebreathing",
        "cost": [
          "Fire",
          "Fire"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/168.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/168_hires.png"
  },
  {
    "id": "sv3pt5-169",
    "name": "Charmeleon",
    "hp": 100,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Stage 1",
    "attacks": [
      {
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "",
        "hasCoinFlip": false
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 90,
        "damageText": "90",
        "text": "Discard an Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/169.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/169_hires.png"
  },
  {
    "id": "sv3pt5-170",
    "name": "Squirtle",
    "hp": 60,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Withdraw",
        "cost": [
          "Water"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks.",
        "hasCoinFlip": true
      },
      {
        "name": "Skull Bash",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/170.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/170_hires.png"
  },
  {
    "id": "sv3pt5-171",
    "name": "Wartortle",
    "hp": 100,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Stage 1",
    "attacks": [
      {
        "name": "Free Diving",
        "cost": [
          "Water"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Put up to 3 Basic Water Energy cards from your discard pile into your hand.",
        "hasCoinFlip": false
      },
      {
        "name": "Spinning Attack",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 50,
        "damageText": "50",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/171.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/171_hires.png"
  },
  {
    "id": "sv3pt5-173",
    "name": "Pikachu",
    "hp": 60,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "mythic",
    "rarityLabel": "Illustration Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Lightning"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Search your deck for a Basic Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck.",
        "hasCoinFlip": false
      },
      {
        "name": "Pika Punch",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 50,
        "damageText": "50",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/173.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/173_hires.png"
  },
  {
    "id": "sv3pt5-182",
    "name": "Venusaur ex",
    "hp": 340,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Dangerous Toxwhip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 150,
        "damageText": "150",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/182.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/182_hires.png"
  },
  {
    "id": "sv3pt5-183",
    "name": "Charizard ex",
    "hp": 330,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Brave Wing",
        "cost": [
          "Fire"
        ],
        "damage": 60,
        "damageText": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage.",
        "hasCoinFlip": true
      },
      {
        "name": "Explosive Vortex",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 330,
        "damageText": "330",
        "text": "Discard 3 Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/183.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/183_hires.png"
  },
  {
    "id": "sv3pt5-184",
    "name": "Blastoise ex",
    "hp": 330,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Twin Cannons",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 140,
        "damageText": "140×",
        "text": "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/184.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/184_hires.png"
  },
  {
    "id": "sv3pt5-188",
    "name": "Alakazam ex",
    "hp": 310,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Mind Jack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 90,
        "damageText": "90+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon.",
        "hasCoinFlip": true
      },
      {
        "name": "Dimensional Hand",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "This attack can be used even if this Pokémon is on the Bench.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/188.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/188_hires.png"
  },
  {
    "id": "sv3pt5-189",
    "name": "Golem ex",
    "hp": 330,
    "type": "fighting",
    "types": [
      "Fighting"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Dynamic Roll",
        "cost": [
          "Fighting"
        ],
        "damage": 50,
        "damageText": "50",
        "text": "During your next turn, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "hasCoinFlip": false
      },
      {
        "name": "Rock Blaster",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 180,
        "damageText": "180",
        "text": "This attack's damage isn't affected by Resistance.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/189.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/189_hires.png"
  },
  {
    "id": "sv3pt5-192",
    "name": "Zapdos ex",
    "hp": 200,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Multishot Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "This attack also does 90 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/192.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/192_hires.png"
  },
  {
    "id": "sv3pt5-193",
    "name": "Mew ex",
    "hp": 180,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "legendary",
    "rarityLabel": "Ultra Rare",
    "isEx": true,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Genome Hacking",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/193.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/193_hires.png"
  },
  {
    "id": "sv3pt5-198",
    "name": "Venusaur ex",
    "hp": 340,
    "type": "grass",
    "types": [
      "Grass"
    ],
    "rarity": "mythic",
    "rarityLabel": "Special Illustration Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Dangerous Toxwhip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "damage": 150,
        "damageText": "150",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 4,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/198.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/198_hires.png"
  },
  {
    "id": "sv3pt5-199",
    "name": "Charizard ex",
    "hp": 330,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "mythic",
    "rarityLabel": "Special Illustration Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Brave Wing",
        "cost": [
          "Fire"
        ],
        "damage": 60,
        "damageText": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage.",
        "hasCoinFlip": true
      },
      {
        "name": "Explosive Vortex",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "damage": 330,
        "damageText": "330",
        "text": "Discard 3 Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/199.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/199_hires.png"
  },
  {
    "id": "sv3pt5-200",
    "name": "Blastoise ex",
    "hp": 330,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "mythic",
    "rarityLabel": "Special Illustration Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Twin Cannons",
        "cost": [
          "Water",
          "Water"
        ],
        "damage": 140,
        "damageText": "140×",
        "text": "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/200.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/200_hires.png"
  },
  {
    "id": "sv3pt5-201",
    "name": "Alakazam ex",
    "hp": 310,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "mythic",
    "rarityLabel": "Special Illustration Rare",
    "isEx": true,
    "stage": "Stage 2",
    "attacks": [
      {
        "name": "Mind Jack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 90,
        "damageText": "90+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon.",
        "hasCoinFlip": true
      },
      {
        "name": "Dimensional Hand",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "This attack can be used even if this Pokémon is on the Bench.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/201.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/201_hires.png"
  },
  {
    "id": "sv3pt5-202",
    "name": "Zapdos ex",
    "hp": 200,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "mythic",
    "rarityLabel": "Special Illustration Rare",
    "isEx": true,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Multishot Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "This attack also does 90 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/202.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/202_hires.png"
  },
  {
    "id": "sv3pt5-205",
    "name": "Mew ex",
    "hp": 180,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "mythic",
    "rarityLabel": "Hyper Rare",
    "isEx": true,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Genome Hacking",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/sv3pt5/205.png",
    "imageLarge": "https://images.pokemontcg.io/sv3pt5/205_hires.png"
  },
  {
    "id": "cel25-1",
    "name": "Ho-Oh",
    "hp": 130,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Sacred Fire",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "Discard an Energy from this Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/cel25/1.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/1_hires.png"
  },
  {
    "id": "cel25-2",
    "name": "Reshiram",
    "hp": 130,
    "type": "fire",
    "types": [
      "Fire"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Scorching Wind",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "This attack does 20 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      },
      {
        "name": "Black Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80+",
        "text": "If Zekrom is on your Bench, this attack does 80 more damage.",
        "hasCoinFlip": true
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/cel25/2.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/2_hires.png"
  },
  {
    "id": "cel25-3",
    "name": "Kyogre",
    "hp": 130,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Aqua Storm",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Discard the top 5 cards of your deck, and then choose 2 of your opponent's Benched Pokémon. This attack does 50 damage for each Energy card you discarded in this way to each of those Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/cel25/3.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/3_hires.png"
  },
  {
    "id": "cel25-4",
    "name": "Palkia",
    "hp": 130,
    "type": "water",
    "types": [
      "Water"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Overdrive Smash",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80+",
        "text": "During your next turn, this Pokémon's Overdrive Smash attack does 80 more damage (before applying Weakness and Resistance).",
        "hasCoinFlip": true
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/cel25/4.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/4_hires.png"
  },
  {
    "id": "cel25-5",
    "name": "Pikachu",
    "hp": 60,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Gnaw",
        "cost": [
          "Colorless"
        ],
        "damage": 10,
        "damageText": "10",
        "text": "",
        "hasCoinFlip": false
      },
      {
        "name": "Thunder Jolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Flip a coin. If tails, this Pokémon also does 10 damage to itself.",
        "hasCoinFlip": true
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/5.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/5_hires.png"
  },
  {
    "id": "cel25-6",
    "name": "Flying Pikachu V",
    "hp": 190,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo V",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Thunder Shock",
        "cost": [
          "Lightning"
        ],
        "damage": 20,
        "damageText": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed.",
        "hasCoinFlip": true
      },
      {
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon.",
        "hasCoinFlip": true
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/6.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/6_hires.png"
  },
  {
    "id": "cel25-7",
    "name": "Flying Pikachu VMAX",
    "hp": 310,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo VMAX",
    "isEx": false,
    "stage": "VMAX",
    "attacks": [
      {
        "name": "Max Balloon",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "damage": 160,
        "damageText": "160",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/7.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/7_hires.png"
  },
  {
    "id": "cel25-8",
    "name": "Surfing Pikachu V",
    "hp": 200,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo V",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 150,
        "damageText": "150",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/8.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/8_hires.png"
  },
  {
    "id": "cel25-9",
    "name": "Surfing Pikachu VMAX",
    "hp": 310,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo VMAX",
    "isEx": false,
    "stage": "VMAX",
    "attacks": [
      {
        "name": "Max Surfer",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "damage": 160,
        "damageText": "160",
        "text": "This attack also does 30 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/9.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/9_hires.png"
  },
  {
    "id": "cel25-10",
    "name": "Zekrom",
    "hp": 130,
    "type": "lightning",
    "types": [
      "Lightning"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Field Crush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "If your opponent has a Stadium in play, discard it.",
        "hasCoinFlip": false
      },
      {
        "name": "White Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80+",
        "text": "If Reshiram is on your Bench, this attack does 80 more damage.",
        "hasCoinFlip": true
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/cel25/10.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/10_hires.png"
  },
  {
    "id": "cel25-11",
    "name": "Mew",
    "hp": 60,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Psyshot",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/11.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/11_hires.png"
  },
  {
    "id": "cel25-17",
    "name": "Groudon",
    "hp": 130,
    "type": "fighting",
    "types": [
      "Fighting"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Magma Volcano",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "damage": 80,
        "damageText": "80×",
        "text": "Discard the top 5 cards of your deck. This attack does 80 damage for each Energy card you discarded in this way.",
        "hasCoinFlip": false
      },
      {
        "name": "Massive Rend",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "damage": 120,
        "damageText": "120",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 3,
    "imageSmall": "https://images.pokemontcg.io/cel25/17.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/17_hires.png"
  },
  {
    "id": "cel25-20",
    "name": "Dialga",
    "hp": 130,
    "type": "metal",
    "types": [
      "Metal"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Temporal Backflow",
        "cost": [
          "Metal"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "Put a card from your discard pile into your hand.",
        "hasCoinFlip": false
      },
      {
        "name": "Metal Blast",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 60,
        "damageText": "60+",
        "text": "This attack does 20 more damage for each Metal Energy attached to this Pokémon.",
        "hasCoinFlip": true
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/cel25/20.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/20_hires.png"
  },
  {
    "id": "cel25-22",
    "name": "Lugia",
    "hp": 130,
    "type": "colorless",
    "types": [
      "Colorless"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Aero Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "damage": 20,
        "damageText": "20×",
        "text": "This attack does 20 damage for each Energy attached to both Active Pokémon.",
        "hasCoinFlip": false
      },
      {
        "name": "Deep Crush",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "damage": 160,
        "damageText": "160",
        "text": "During your next turn, this Pokémon can't attack.",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 2,
    "imageSmall": "https://images.pokemontcg.io/cel25/22.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/22_hires.png"
  },
  {
    "id": "cel25-25",
    "name": "Mew",
    "hp": 60,
    "type": "psychic",
    "types": [
      "Psychic"
    ],
    "rarity": "epic",
    "rarityLabel": "Rare Holo",
    "isEx": false,
    "stage": "Basic",
    "attacks": [
      {
        "name": "Psyshot",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "damage": 30,
        "damageText": "30",
        "text": "",
        "hasCoinFlip": false
      }
    ],
    "retreatCost": 1,
    "imageSmall": "https://images.pokemontcg.io/cel25/25.png",
    "imageLarge": "https://images.pokemontcg.io/cel25/25_hires.png"
  }
];

// 3 Booster Packs
const BOOSTER_PACKS = [
  {
    id: 'pack_151',
    name: 'Gói Thẻ Pokémon 151',
    subtitle: 'Kanto Heritage Edition',
    tag: '🔥 Phổ Biến Nhất',
    cost: 100,
    cardCount: 5,
    coverCardImage: 'https://images.pokemontcg.io/sv3pt5/6.png',
    color: 'from-amber-600 via-rose-600 to-indigo-900',
    border: 'border-amber-400/50',
    rates: { common: 0.50, rare: 0.30, epic: 0.14, legendary: 0.05, mythic: 0.01 }
  },
  {
    id: 'pack_celebrations',
    name: 'Gói Kỷ Niệm Celebrations',
    subtitle: 'Golden 25th Anniversary',
    tag: '👑 Đảm Bảo Thẻ EX/Hiếm',
    cost: 250,
    cardCount: 5,
    coverCardImage: 'https://images.pokemontcg.io/cel25/25.png',
    color: 'from-purple-900 via-indigo-900 to-amber-900',
    border: 'border-purple-400/50',
    rates: { common: 0.20, rare: 0.35, epic: 0.28, legendary: 0.14, mythic: 0.03 }
  },
  {
    id: 'pack_mythic_god',
    name: 'Gói Siêu Thần Thoại God Pack',
    subtitle: 'Special Illustration & Gold Cards',
    tag: '✨ Tỷ Lệ Thần Thoại Cực Cao',
    cost: 500,
    cardCount: 5,
    coverCardImage: 'https://images.pokemontcg.io/sv3pt5/205.png',
    color: 'from-amber-500 via-yellow-600 to-rose-900',
    border: 'border-amber-300',
    rates: { rare: 0.30, epic: 0.35, legendary: 0.25, mythic: 0.10 }
  }
];

// Gym Leaders with Verified Image Badges & Signature Pokemon
const GYM_LEADERS = [
  {
    id: 'brock',
    name: 'Brock',
    gym: 'Pewter Gym (Đá Cứng)',
    badgeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/1.png',
    avatarImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png',
    deckCardId: 'sv3pt5-95',
    difficulty: 'Tập Sự',
    rewardCoins: 120,
    rewardExp: 60
  },
  {
    id: 'misty',
    name: 'Misty',
    gym: 'Cerulean Gym (Nàng Tiên Nước)',
    badgeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/2.png',
    avatarImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png',
    deckCardId: 'sv3pt5-9',
    difficulty: 'Trung Bình',
    rewardCoins: 200,
    rewardExp: 100
  },
  {
    id: 'surge',
    name: 'Lt. Surge',
    gym: 'Vermilion Gym (Tia Chớp)',
    badgeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/3.png',
    avatarImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
    deckCardId: 'sv3pt5-25',
    difficulty: 'Khó',
    rewardCoins: 280,
    rewardExp: 150
  },
  {
    id: 'sabrina',
    name: 'Sabrina',
    gym: 'Saffron Gym (Bậc Thầy Siêu Năng)',
    badgeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/6.png',
    avatarImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png',
    deckCardId: 'sv3pt5-65',
    difficulty: 'Cực Khó',
    rewardCoins: 400,
    rewardExp: 220
  },
  {
    id: 'red',
    name: 'Quán Quân Red',
    gym: 'Đỉnh Núi Bạc (Champion Red)',
    badgeImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/badges/8.png',
    avatarImg: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    deckCardId: 'sv3pt5-199',
    difficulty: 'Huyền Thoại',
    rewardCoins: 800,
    rewardExp: 500
  }
];

// Top Global Leaderboard Rankings
const TOP_LEADERBOARD = [
  {
    rank: 1,
    name: 'Quán Quân Red',
    title: 'Huyền Thoại Núi Bạc',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
    elo: 2850,
    tier: 'Bậc Thầy Tối Cao',
    tierColor: 'text-amber-400 bg-amber-500/20 border-amber-400/50',
    winRate: '92%',
    signatureCard: 'Charizard ex'
  },
  {
    rank: 2,
    name: 'Cynthia',
    title: 'Nữ Quán Quân Sinnoh',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png',
    elo: 2790,
    tier: 'Đại Cao Thủ',
    tierColor: 'text-purple-300 bg-purple-500/20 border-purple-400/50',
    winRate: '88%',
    signatureCard: 'Garchomp & Lucario'
  },
  {
    rank: 3,
    name: 'Leon',
    title: 'Bất Bại Galar Champion',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png',
    elo: 2720,
    tier: 'Đại Cao Thủ',
    tierColor: 'text-purple-300 bg-purple-500/20 border-purple-400/50',
    winRate: '85%',
    signatureCard: 'Ho-Oh & Charizard'
  },
  {
    rank: 4,
    name: 'Steven Stone',
    title: 'Quán Quân Đá Quý Hoenn',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',
    elo: 2650,
    tier: 'Kim Cương I',
    tierColor: 'text-cyan-300 bg-cyan-500/20 border-cyan-400/50',
    winRate: '81%',
    signatureCard: 'Rayquaza'
  },
  {
    rank: 5,
    name: 'Blue',
    title: 'Kỳ Phùng Địch Thủ Kanto',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
    elo: 2580,
    tier: 'Kim Cương II',
    tierColor: 'text-cyan-300 bg-cyan-500/20 border-cyan-400/50',
    winRate: '79%',
    signatureCard: 'Blastoise ex'
  },
  {
    rank: 6,
    name: 'Lance',
    title: 'Long Vương Tứ Đại Thiên Vương',
    avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    elo: 2510,
    tier: 'Bạch Kim I',
    tierColor: 'text-indigo-300 bg-indigo-500/20 border-indigo-400/50',
    winRate: '76%',
    signatureCard: 'Dragonite'
  }
];

// Elemental weakness chart
const TYPE_CHART = {
  fire: { grass: 2.0, steel: 2.0, water: 0.5 },
  water: { fire: 2.0, rock: 2.0, grass: 0.5 },
  grass: { water: 2.0, rock: 2.0, fire: 0.5 },
  lightning: { water: 2.0, grass: 0.5 },
  electric: { water: 2.0, grass: 0.5 },
  psychic: { fighting: 2.0 },
  fighting: { colorless: 2.0, rock: 2.0 },
  dragon: { dragon: 2.0 }
};
