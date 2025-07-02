function MonsterSelector({ monsters, playerMonsterId, onChange }) {
  const unlocked = monsters.filter(m => m.unlocked);
  return (
    <div>
      <h2>Selecciona tu monstruo</h2>
      {unlocked.map(m => (
        <label key={m.id} style={{ marginRight: '10px' }}>
          <input
            type="radio"
            value={m.id}
            checked={playerMonsterId === m.id}
            onChange={() => onChange(m.id)}
          />
          <img
            src={m.image}
            alt={m.name}
            width="40"
            style={{ verticalAlign: 'middle', marginRight: '4px' }}
          />
          {m.name} ({m.rarity})
        </label>
      ))}
    </div>
  );
}
