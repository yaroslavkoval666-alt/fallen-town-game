const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  pClass: { type: String, default: "Assault" },
  role: { type: String, default: "player" },
  lvl: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  maxExp: { type: Number, default: 100 },
  gold: { type: Number, default: 1000 },
  bank: { type: Number, default: 500 },
  pvpRating: { type: Number, default: 1000 },
  hp: { type: Number, default: 200 },
  maxHp: { type: Number, default: 200 },
  energy: { type: Number, default: 100 },
  maxEnergy: { type: Number, default: 100 },
  str: { type: Number, default: 15 },
  agi: { type: Number, default: 8 },
  vit: { type: Number, default: 14 },
  freeStats: { type: Number, default: 0 },
  metal: { type: Number, default: 100 },
  chips: { type: Number, default: 80 },
  gear: { type: String, default: null },
  gearBonus: { type: Number, default: 0 },
  inventory: { type: Array, default: [] },
  mutations: {
    alphaPredator: { type: Number, default: 0 },
    nanoArmor: { type: Number, default: 0 }
  },
  clan: { type: String, default: null },
  battlesCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', PlayerSchema);
