// Obtener datos del jugador desde localStorage
const nombreJugador = localStorage.getItem('nombreJugador') || "Jugador";
const nivelesCompletados = JSON.parse(localStorage.getItem('nivelesCompletados')) || [false, false, false];

// Mostrar bienvenida
const bienvenida = document.getElementById('bienvenida');
bienvenida.textContent = `¡Hola, ${nombreJugador}! 🌟`;

// Mostrar niveles completados
const nivelesSpan = document.getElementById('nivelesCompletados');
nivelesSpan.textContent = nivelesCompletados.map((c, i) => `Nivel ${i+1}: ${c ? '✅' : '❌'}`).join(' | ');

// Botones
document.getElementById('btnAprender').addEventListener('click', () => {
  window.location.href = "aprender.html";
});

document.getElementById('btnJuego').addEventListener('click', () => {
  window.location.href = "juego.html";
});
