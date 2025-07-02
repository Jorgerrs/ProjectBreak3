function BattleResult({ lastBattle }) {
  if (!lastBattle) return null;
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>
        Tu monstruo: {lastBattle.playerMonster.name} ({lastBattle.playerMonster.rarity})
      </h3>
      <img
        src={lastBattle.playerMonster.image}
        alt={lastBattle.playerMonster.name}
        width="60"
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <p>
        Tu movimiento: {lastBattle.playerMonster.abilities[lastBattle.playerMove]} ({lastBattle.playerMove})
      </p>
      <h3>
        Enemigo: {lastBattle.enemyMonster.name} ({lastBattle.enemyMonster.rarity})
      </h3>
      <img
        src={lastBattle.enemyMonster.image}
        alt={lastBattle.enemyMonster.name}
        width="60"
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <p>
        Movimiento del enemigo: {lastBattle.enemyMonster.abilities[lastBattle.enemyMove]} ({lastBattle.enemyMove})
      </p>
    </div>
  );
}
