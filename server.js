const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta 'frontend'
app.use(express.static(path.join(__dirname, 'frontend')));

// Ruta principal - redirige a index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎮 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📂 Sirviendo archivos desde: ${path.join(__dirname, 'frontend')}`);
});