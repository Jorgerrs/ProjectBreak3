# ProjectBreak3

Este repositorio contiene un peque\u00f1o juego de monstruos basado en piedra, papel o tijera.

Los monstruos se almacenan ahora en una base de datos MongoDB y la aplicaci\u00f3n los obtiene a trav\u00e9s de una API creada con Node.js y Express.

## Ejecutar

1. Aseg\u00farate de tener una instancia de MongoDB en funcionamiento. La aplicaci\u00f3n usa la variable `MONGODB_URI` (por defecto `mongodb://localhost:27017/monsters`).
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. (Opcional) Rellena la base de datos con los monstruos iniciales:
   ```bash
   npm run seed
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
5. Abre `http://localhost:3000/` en tu navegador. **No** abras el archivo HTML con `file://` porque Babel intenta cargar `src/app.jsx` mediante HTTP y el navegador bloquear\u00e1 la petici\u00f3n.
