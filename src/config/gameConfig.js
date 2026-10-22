module.exports = {
  CLASSES: {
    Assault: { name: "Штурмовик", baseHp: 200, baseStr: 15, baseAgi: 8, baseVit: 14, hpPerVit: 18, dmgMultiplier: 1.2 },
    Sniper: { name: "Снайпер", baseHp: 140, baseStr: 10, baseAgi: 18, baseVit: 9, hpPerVit: 12, critChanceBase: 0.15, dmgMultiplier: 1.4 },
    Medic: { name: "Кибер-Медик", baseHp: 170, baseStr: 9, baseAgi: 10, baseVit: 16, hpPerVit: 15, regenMultiplier: 2.0 }
  },
  WEAPONS_BY_CLASS: {
    Assault: [{ name: "Тяжелый Пулемет", reqLvl: 1, bonus: 25, costMetal: 25, costChips: 15 }],
    Sniper: [{ name: "Винтовка Фантом", reqLvl: 1, bonus: 28, costMetal: 25, costChips: 15 }],
    Medic: [{ name: "Нейро-Клинок", reqLvl: 1, bonus: 22, costMetal: 20, costChips: 15 }]
  },
  SECTORS: [
    { id: 1, name: "Окраины Пустоши", reqLvl: 1, energyCost: 10, baseGold: 40, baseExp: 50, dangerLevel: 1 },
    { id: 2, name: "Заброшенный Завод Х-18", reqLvl: 5, energyCost: 18, baseGold: 110, baseExp: 140, dangerLevel: 2 },
    { id: 3, name: "Подземный Бункер Омега", reqLvl: 15, energyCost: 28, baseGold: 280, baseExp: 380, dangerLevel: 3 }
  ],
  CALCULATE_EXP_REQ: (lvl) => Math.floor(100 * Math.pow(1.55, lvl - 1)),
  CALCULATE_MAX_ENERGY: (lvl) => 100 + (lvl - 1) * 10
};
