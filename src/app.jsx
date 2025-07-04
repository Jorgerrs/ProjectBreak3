const { useState } = React;

const rarities = {
  common: 1,
  "poco comun": 2,
  epico: 3,
  legendario: 4
};

const initialMonsters = [
  {
    id: 1,
    name: "Bicho",
    rarity: "common",
    unlocked: true,
    image: "images/bicho.svg",
    abilities: {
      piedra: "Caparaz\u00f3n duro",
      papel: "Envoltura pegajosa",
      tijera: "Pinzas agudas"
    }
  },
  {
    id: 2,
    name: "Topo",
    rarity: "common",
    unlocked: true,
    image: "images/topo.svg",
    abilities: {
      piedra: "Golpe subterr\u00e1neo",
      papel: "Mont\u00f3n de tierra",
      tijera: "Ara\u00f1azo"
    }
  },
  {
    id: 3,
    name: "Rata",
    rarity: "common",
    unlocked: true,
    image: "images/rata.svg",
    abilities: {
      piedra: "Mordisco roedor",
      papel: "Cola flexible",
      tijera: "Ara\u00f1azo r\u00e1pido"
    }
  },
  {
    id: 4,
    name: "Lobo",
    rarity: "common",
    unlocked: false,
    image: "images/lobo.svg",
    abilities: {
      piedra: "Embestida",
      papel: "Aullido aturdidor",
      tijera: "Mordida salvaje"
    }
  },
  {
    id: 5,
    name: "Orco",
    rarity: "poco comun",
    unlocked: false,
    image: "images/orco.svg",
    abilities: {
      piedra: "Mazo pesado",
      papel: "Escudo improvisado",
      tijera: "Hachazo"
    }
  },
  {
    id: 6,
    name: "Golem",
    rarity: "poco comun",
    unlocked: false,
    image: "images/golem.svg",
    abilities: {
      piedra: "Pu\u00f1o de roca",
      papel: "Torbellino de polvo",
      tijera: "Aplastamiento"
    }
  },
  {
    id: 7,
    name: "Harpia",
    rarity: "poco comun",
    unlocked: false,
    image: "images/harpia.svg",
    abilities: {
      piedra: "Picotazo",
      papel: "Plumas cortantes",
      tijera: "Garras r\u00e1pidas"
    }
  },
  {
    id: 8,
    name: "Dragon",
    rarity: "epico",
    unlocked: false,
    image: "images/dragon.svg",
    abilities: {
      piedra: "Golpe de cola",
      papel: "Ala protectora",
      tijera: "Aliento de fuego"
    }
  },
  {
    id: 9,
    name: "Kraken",
    rarity: "epico",
    unlocked: false,
    image: "images/kraken.svg",
    abilities: {
      piedra: "Tent\u00e1culo poderoso",
      papel: "Tinta envolvente",
      tijera: "Agarre cortante"
    }
  },
  {
    id: 10,
    name: "Fenix",
    rarity: "legendario",
    unlocked: false,
    image: "images/fenix.svg",
    abilities: {
      piedra: "Llama eterna",
      papel: "Canto revitalizador",
      tijera: "Vuelo abrasador"
    }
  }
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
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [result, setResult] = useState(null);
  const [lastBattle, setLastBattle] = useState(null);

  const unlockedMonsters = monsters.filter(m => m.unlocked);
  const playerMonster = monsters.find(m => m.id === playerMonsterId);

  function handleMove(move) {
    const playerMonster = monsters.find(m => m.id === playerMonsterId);
    const enemyMonster = monsters[Math.floor(Math.random() * monsters.length)];
    const enemyMove = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(move, playerMonster, enemyMove, enemyMonster);

    let message;
    if (winner === "player") {
      message = "\u00A1Ganaste!";
      setWins(wins + 1);
    } else if (winner === "enemy") {
      message = "Perdiste";
      setLosses(losses + 1);
    } else {
      message = "Empate";
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

  return (
    <div>
      <h1>Combate de Monstruos</h1>
      <p>
        Combates: {battleCount} | Victorias: {wins} | Derrotas: {losses}
      </p>

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
            <img
              src={m.image}
              alt={m.name}
              width="40"
              style={{ verticalAlign: "middle", marginRight: "4px" }}
            />
            {m.name} ({m.rarity})
          </label>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Elige tu movimiento</h2>
        {choices.map(choice => (
          <button
            key={choice}
            onClick={() => handleMove(choice)}
            className={`move-${choice}`}
          >
            {playerMonster.abilities[choice]}
          </button>
        ))}
        <div style={{ marginTop: "10px" }}>
          <strong>Leyenda:</strong>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li>
              <span className="legend-box move-piedra"></span>Piedra
            </li>
            <li>
              <span className="legend-box move-papel"></span>Papel
            </li>
            <li>
              <span className="legend-box move-tijera"></span>Tijera
            </li>
          </ul>
        </div>
      </div>

      {lastBattle && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Tu monstruo: {lastBattle.playerMonster.name} ({lastBattle.playerMonster.rarity})
          </h3>
          <img
            src={lastBattle.playerMonster.image}
            alt={lastBattle.playerMonster.name}
            width="60"
            style={{ display: "block", marginBottom: "10px" }}
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
            style={{ display: "block", marginBottom: "10px" }}
          />
          <p>
            Movimiento del enemigo: {lastBattle.enemyMonster.abilities[lastBattle.enemyMove]} ({lastBattle.enemyMove})
          </p>
        </div>
      )}

      {result && <h2 style={{ marginTop: "10px" }}>{result}</h2>}

      <div style={{ marginTop: "20px" }}>
        <h2>Monstruos desbloqueados</h2>
        <ul className="monster-list">
          {monsters.filter(m => m.unlocked).map(m => (
            <li key={m.id}>
              <img
                src={m.image}
                alt={m.name}
                width="30"
                style={{ verticalAlign: "middle", marginRight: "4px" }}
              />
              {m.name} ({m.rarity})
            </li>
          ))}
        </ul>
        <h2>Bloqueados</h2>
        <ul className="monster-list">
          {monsters.filter(m => !m.unlocked).map(m => (
            <li key={m.id}>
              <img
                src={m.image}
                alt={m.name}
                width="30"
                style={{ verticalAlign: "middle", marginRight: "4px" }}
              />
              {m.name} ({m.rarity})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
