const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Player = require('./src/models/Player');
const BattleEngine = require('./src/engine/BattleEngine');
const EconomyEngine = require('./src/engine/EconomyEngine');
const SyndicateEngine = require('./src/engine/SyndicateEngine');
const LabEngine = require('./src/engine/LabEngine');
const PvpEngine = require('./src/engine/PvpEngine');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fallen_town_mmorpg';
mongoose.connect(MONGO_URI).then(() => console.log('📦 MongoDB подключена')).catch(console.error);

app.post('/api/player/init', async (req, res) => {
  try {
    const { username } = req.body;
    let identifier = username || "@mn666rs";
    let player = await Player.findOne({ username: identifier });
    if (!player) {
      player = new Player({ username: identifier, role: identifier === "@mn666rs" ? "owner" : "player" });
      await player.save();
    }
    res.json({ success: true, player });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/battle/sector', async (req, res) => {
  try {
    let player = await Player.findOne({ username: req.body.username });
    const result = BattleEngine.processSectorBattle(player, req.body.sectorId);
    await player.save();
    res.json(result);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post('/api/lab/buy-mutation', async (req, res) => {
  try {
    let player = await Player.findOne({ username: req.body.username });
    const result = LabEngine.buyMutation(player, Number(req.body.mutationType));
    await player.save();
    res.json(result);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post('/api/syndicate/create', async (req, res) => {
  try {
    let player = await Player.findOne({ username: req.body.username });
    const result = await SyndicateEngine.createSyndicate(player, req.body.clanName);
    await player.save();
    res.json(result);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.post('/api/pvp/duel', async (req, res) => {
  try {
    let attacker = await Player.findOne({ username: req.body.username });
    const result = PvpEngine.processDuel(attacker, { username: "Вражеский Боец", str: 20 });
    await attacker.save();
    res.json(result);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
