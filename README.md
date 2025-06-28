# ProjectBreak3

Este repositorio contiene un ejemplo muy sencillo del juego propuesto en el README inicial.

El juego consiste en combatir con monstruos usando un sistema de piedra, papel o tijera.
Hay 10 monstruos de distintas rarezas y se van desbloqueando cada cinco combates.

## Ejecutar

Sirve los archivos con un servidor web local. Por ejemplo, puedes ejecutar:

```bash
python3 -m http.server 8000
```

Luego visita `http://localhost:8000/public/` en tu navegador. **No** abras el
archivo directamente con `file://`, ya que Babel intenta cargar `src/app.jsx`
a trav\u00e9s de HTTP y el navegador bloquear\u00e1 la solicitud.
