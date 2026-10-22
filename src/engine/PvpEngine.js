class PvpEngine {
  static processDuel(attacker, defender) {
    if (attacker.energy < 20) throw new Error("Мало энергии!");
    attacker.energy -= 20;

    const atkPower = (attacker.str + (attacker.gearBonus || 0)) * 2;
    const defPower = (defender.str || 20) * 1.5;

    const isVictory = atkPower >= defPower;
    const log = [`PvP Дуэль против ${defender.username}`];

    if (isVictory) {
      attacker.pvpRating += 35;
      attacker.gold += 150;
      log.push("Победа! Рейтинг +35, Золото +150");
    } else {
      attacker.pvpRating = Math.max(0, attacker.pvpRating - 15);
      log.push("Поражение! Рейтинг -15");
    }

    return { success: true, isVictory, log, attacker };
  }
}

module.exports = PvpEngine;
