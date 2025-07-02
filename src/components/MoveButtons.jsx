function MoveButtons({ abilities, onMove }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Elige tu movimiento</h2>
      {choices.map(choice => (
        <button
          key={choice}
          onClick={() => onMove(choice)}
          className={`move-${choice}`}
        >
          {abilities[choice]}
        </button>
      ))}
      <div style={{ marginTop: '10px' }}>
        <strong>Leyenda:</strong>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
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
  );
}
