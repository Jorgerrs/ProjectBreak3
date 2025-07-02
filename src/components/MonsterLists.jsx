function MonsterLists({ monsters }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Monstruos desbloqueados</h2>
      <ul className="monster-list">
        {monsters.filter(m => m.unlocked).map(m => (
          <li key={m.id}>
            <img
              src={m.image}
              alt={m.name}
              width="30"
              style={{ verticalAlign: 'middle', marginRight: '4px' }}
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
              style={{ verticalAlign: 'middle', marginRight: '4px' }}
            />
            {m.name} ({m.rarity})
          </li>
        ))}
      </ul>
    </div>
  );
}
