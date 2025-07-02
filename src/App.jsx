const { useState, useEffect } = React;

function App() {
  const [monsters, setMonsters] = useState([]);
  const [playerMonsterId, setPlayerMonsterId] = useState(null);
  const [battleCount, setBattleCount] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [result, setResult] = useState('');
  const [lastBattle, setLastBattle] = useState(null);

  useEffect(() => {
    fetch('/api/monsters')
      .then(r => r.json())
      .then(data => {
        setMonsters(data);
        const first = data.find(m => m.unlocked);
        if (first) setPlayerMonsterId(first.id);
      })
      .catch(() => {});
  }, []);

  function handleMove(move) {
    const playerMonster = monsters.find(m => m.id === playerMonsterId);
    const enemyMonster = monsters[Math.floor(Math.random() * monsters.length)];
    const enemyMove = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(move, playerMonster, enemyMove, enemyMonster);

    let message;
    if (winner === 'player') {
      message = '¡Ganaste!';
      setWins(wins + 1);
    } else if (winner === 'enemy') {
      message = 'Perdiste';
      setLosses(losses + 1);
    } else {
      message = 'Empate';
    }
    setResult(message);
    setLastBattle({
      playerMonster,
      playerMove: move,
      enemyMonster,
      enemyMove
    });

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

  if (monsters.length === 0 || !playerMonsterId) {
    return <div>Cargando...</div>;
  }

  const playerMonster = monsters.find(m => m.id === playerMonsterId);

  return (
    <div>
      <h1>Combate de Monstruos</h1>
      <p>
        Combates: {battleCount} | Victorias: {wins} | Derrotas: {losses}
      </p>

      <MonsterSelector
        monsters={monsters}
        playerMonsterId={playerMonsterId}
        onChange={setPlayerMonsterId}
      />

      <MoveButtons abilities={playerMonster.abilities} onMove={handleMove} />

      <BattleResult lastBattle={lastBattle} />

      {result && <h2 style={{ marginTop: '10px' }}>{result}</h2>}

      <MonsterLists monsters={monsters} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
