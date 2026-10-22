const Syndicate = require('../models/Syndicate');

class SyndicateEngine {
  static async createSyndicate(player, name) {
    if (player.clan) throw new Error("Вы уже состоите в клане!");
    if (player.gold < 300) throw new Error("Нужно 300 золота!");

    const syndicate = new Syndicate({ name, leader: player.username });
    player.gold -= 300;
    player.clan = name;
    await syndicate.save();
    return { success: true, message: `Синдикат "${name}" создан!`, syndicate };
  }

  static async captureNode(player) {
    if (!player.clan) throw new Error("Вступите в синдикат!");
    if (player.energy < 20) throw new Error("Мало энергии!");

    const syndicate = await Syndicate.findOne({ name: player.clan });
    if (!syndicate) throw new Error("Синдикат не найден!");

    player.energy -= 20;
    syndicate.bank += 200;
    player.gold += 50;
    await syndicate.save();
    return { success: true, message: "Узел захвачен! +200 в казну синдиката.", syndicate };
  }
}

module.exports = SyndicateEngine;
