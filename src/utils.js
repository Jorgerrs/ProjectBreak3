const choices = ['piedra', 'papel', 'tijera'];

const rarities = {
  common: 1,
  "poco comun": 2,
  epico: 3,
  legendario: 4
};

function getWinner(playerMove, playerMonster, enemyMove, enemyMonster) {
  if (playerMove === enemyMove) {
    if (rarities[playerMonster.rarity] < rarities[enemyMonster.rarity]) {
      return 'enemy';
    }
    return 'tie';
  }
  if (
    (playerMove === 'piedra' && enemyMove === 'tijera') ||
    (playerMove === 'papel' && enemyMove === 'piedra') ||
    (playerMove === 'tijera' && enemyMove === 'papel')
  ) {
    return 'player';
  }
  return 'enemy';
}
