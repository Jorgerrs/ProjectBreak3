const { useState } = React;

const rarities = {
  common: 1,
  "poco comun": 2,
  epico: 3,
  legendario: 4
};

const initialMonsters = [
  { id: 1, name: "Bicho", rarity: "common", unlocked: true },
  { id: 2, name: "Topo", rarity: "common", unlocked: true },
  { id: 3, name: "Rata", rarity: "common", unlocked: true },
  { id: 4, name: "Lobo", rarity: "common", unlocked: false },
  { id: 5, name: "Orco", rarity: "poco comun", unlocked: false },
  { id: 6, name: "Golem", rarity: "poco comun", unlocked: false },
  { id: 7, name: "Harpia", rarity: "poco comun", unlocked: false },
  { id: 8, name: "Dragon", rarity: "epico", unlocked: false },
  { id: 9, name: "Kraken", rarity: "epico", unlocked: false },
  { id: 10, name: "Fenix", rarity: "legendario", unlocked: false }
];

const choices = ["piedra", "papel", "tijera"];

function getWinner(playerMove, playerMonster, enemyMove, enemyMonster) {
  if (playerMove === enemyMove) {
    if (rarities[playerMonster.rarity] < rarities[enemyMonster.rarity]) {
      return "enemy";
    }
    return "tie";
  }
  if (
    (playerMove === "piedra" && enemyMove === "tijera") ||
    (playerMove === "papel" && enemyMove === "piedra") ||
    (playerMove === "tijera" && enemyMove === "papel")
  ) {
    return "player";
  }
  return "enemy";
}

function App() {
  const [monsters, setMonsters] = useState(initialMonsters);
  const [playerMonsterId, setPlayerMonsterId] = useState(1);
  const [battleCount, setBattleCount] = useState(0);
  const [result, setResult] = useState(null);
  const [enemyInfo, setEnemyInfo] = useState(null);

  const unlockedMonsters = monsters.filter(m => m.unlocked);

  function handleMove(move) {
    const playerMonster = monsters.find(m => m.id === playerMonsterId);
    const enemyMonster = monsters[Math.floor(Math.random() * monsters.length)];
    const enemyMove = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(move, playerMonster, enemyMove, enemyMonster);

    let message;
    if (winner === "player") message = "\u00A1Ganaste!";
    else if (winner === "enemy") message = "Perdiste";
    else message = "Empate";
    setResult(message);
    setEnemyInfo({ monster: enemyMonster, move: enemyMove });

    const newCount = battleCount + 1;
    setBattleCount(newCount);

    if (newCount % 5 === 0) {
      const index = monsters.findIndex(m => !m.unlocked);
      if (index !== -1) {
        const updated = monsters.slice();
        updated[index].unlocked = true;
        setMonsters(updated);
      }
    }
  }

  return (
    <div>
      <h1>Combate de Monstruos</h1>
      <p>Combates: {battleCount}</p>

      <div>
        <h2>Selecciona tu monstruo</h2>
        {unlockedMonsters.map(m => (
          <label key={m.id} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              value={m.id}
              checked={playerMonsterId === m.id}
              onChange={() => setPlayerMonsterId(m.id)}
            />
            {m.name} ({m.rarity})
          </label>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Elige tu movimiento</h2>
        {choices.map(choice => (
          <button key={choice} onClick={() => handleMove(choice)}>
            {choice}
          </button>
        ))}
      </div>

      {enemyInfo && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Enemigo: {enemyInfo.monster.name} ({enemyInfo.monster.rarity})
          </h3>
          <p>Movimiento del enemigo: {enemyInfo.move}</p>
        </div>
      )}

      {result && <h2 style={{ marginTop: "10px" }}>{result}</h2>}

      <div style={{ marginTop: "20px" }}>
        <h2>Monstruos desbloqueados</h2>
        <ul className="monster-list">
          {monsters.filter(m => m.unlocked).map(m => (
            <li key={m.id}>{m.name} ({m.rarity})</li>
          ))}
        </ul>
        <h2>Bloqueados</h2>
        <ul className="monster-list">
          {monsters.filter(m => !m.unlocked).map(m => (
            <li key={m.id}>{m.name} ({m.rarity})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
