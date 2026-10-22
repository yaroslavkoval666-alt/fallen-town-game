const config = require('../config/gameConfig');

class BattleEngine {
  static processSectorBattle(player, sectorId) {
    const sector = config.SECTORS.find(s => s.id === sectorId);
    if (!sector) throw new Error("Сектор не найден");
    if (player.lvl < sector.reqLvl) throw new Error("Недостаточно уровня");
    if (player.energy < sector.energyCost) throw new Error("Недостаточно энергии");

    player.energy -= sector.energyCost;
    const classInfo = config.CLASSES[player.pClass] || config.CLASSES.Assault;
    const strTotal = player.str + (player.gearBonus || 0) + ((player.mutations?.alphaPredator || 0) * 15);
    const attackPower = strTotal * classInfo.dmgMultiplier;
    const isCrit = Math.random() < (0.05 + player.agi * 0.01);
    const finalDamage = Math.floor(attackPower * (isCrit ? 1.8 : 1.0));

    const enemyHp = sector.dangerLevel * 120;
    const isVictory = finalDamage >= (enemyHp * 0.5);

    const log = [`Штурм сектора: ${sector.name}`, `Нанесен урон: ${finalDamage} ${isCrit ? '(КРИТ!)' : ''}`];

    if (isVictory) {
      const gold = sector.baseGold + Math.floor(Math.random() * 20);
      const exp = sector.baseExp + Math.floor(Math.random() * 30);
      player.gold += gold;
      player.exp += exp;
      player.metal += sector.dangerLevel * 2;
      player.chips += sector.dangerLevel;
      player.battlesCount = (player.battlesCount || 0) + 1;
      log.push(`Победа! Получено +${gold} 💰, +${exp} EXP`);
      this.checkLevelUp(player, log);
      return { success: true, log, player };
    } else {
      const dmgTaken = sector.dangerLevel * 15;
      player.hp = Math.max(0, player.hp - dmgTaken);
      log.push(`Поражение! Получено урона -${dmgTaken} HP`);
      return { success: false, log, player };
    }
  }

  static checkLevelUp(player, log) {
    let reqExp = config.CALCULATE_EXP_REQ(player.lvl);
    while (player.exp >= reqExp) {
      player.lvl += 1;
      player.exp -= reqExp;
      player.freeStats += 4;
      player.maxEnergy = config.CALCULATE_MAX_ENERGY(player.lvl);
      player.energy = player.maxEnergy;
      player.maxHp = 150 + (player.lvl - 1) * 20 + (player.vit * 15);
      player.hp = player.maxHp;
      log.push(`🎉 НОВЫЙ УРОВЕНЬ: ${player.lvl}!`);
      reqExp = config.CALCULATE_EXP_REQ(player.lvl);
    }
  }
}

module.exports = BattleEngine;
