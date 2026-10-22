const config = require('../config/gameConfig');

class EconomyEngine {
  static buyWeapon(player, weaponIndex) {
    const classWeapons = config.WEAPONS_BY_CLASS[player.pClass] || [];
    const item = classWeapons[weaponIndex];
    if (!item) throw new Error("Оружие не найдено");
    if (player.metal < item.costMetal || player.chips < item.costChips) throw new Error("Недостаточно ресурсов");

    player.metal -= item.costMetal;
    player.chips -= item.costChips;
    player.inventory.push({ ...item, id: Date.now() });
    return { success: true, message: `Куплено ${item.name}!`, player };
  }
}

module.exports = EconomyEngine;
