class LabEngine {
  static buyMutation(player, type) {
    if (type === 1) {
      if (player.chips < 30 || player.gold < 200) throw new Error("Мало ресурсов!");
      player.chips -= 30; player.gold -= 200;
      player.mutations.alphaPredator = (player.mutations.alphaPredator || 0) + 1;
      return { success: true, message: "Мутация «Альфа-Хищник» улучшена!", player };
    } else if (type === 2) {
      if (player.chips < 40 || player.gold < 300) throw new Error("Мало ресурсов!");
      player.chips -= 40; player.gold -= 300;
      player.mutations.nanoArmor = (player.mutations.nanoArmor || 0) + 1;
      player.maxHp += 50; player.hp = player.maxHp;
      return { success: true, message: "Мутация «Нано-Броня» улучшена!", player };
    } else {
      throw new Error("Неизвестный тип мутации");
    }
  }
}

module.exports = LabEngine;
