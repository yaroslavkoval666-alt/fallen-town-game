const mongoose = require('mongoose');

const SyndicateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  leader: { type: String, required: true },
  bank: { type: Number, default: 100 },
  membersCount: { type: Number, default: 1 },
  controlledNodes: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Syndicate', SyndicateSchema);
