// ===== ELEMENTOS DOM =====
const bienvenida = document.getElementById('bienvenida');
const nivelesCompletadosDiv = document.getElementById('nivelesCompletados');
const btnAprender = document.getElementById('btnAprender');
const btnJuego = document.getElementById('btnJuego');
const btnSalir = document.getElementById('btnSalir');

// ===== OBTENER DATOS =====
const nombreJugador = localStorage.getItem('nombreJugador') || "Jugador";
const generoJugador = localStorage.getItem('generoJugador') || "nino";
const nivelesCompletados = JSON.parse(localStorage.getItem('nivelesCompletados')) || [false, false, false];

// ===== CONFIGURACIÓN DE NIVELES =====
const nivelesInfo = [
  { nombre: 'Ropa Básica', icon: '👕' },
  { nombre: 'Accesorios', icon: '👓' },
  { nombre: 'Situaciones', icon: '🌤️' }
];

// ===== INICIALIZAR =====
function inicializar() {
  // Verificar si hay usuario
  if (!nombreJugador || nombreJugador === "Jugador") {
    window.location.href = "index.html";
    return;
  }

  // Mostrar bienvenida
  bienvenida.textContent = `¡Hola, ${nombreJugador}! 🌟`;

  // Mostrar progreso
  mostrarProgreso();
}

// ===== MOSTRAR PROGRESO =====
function mostrarProgreso() {
  nivelesCompletadosDiv.innerHTML = '';
  
  nivelesInfo.forEach((nivel, index) => {
    const nivelItem = document.createElement('div');
    nivelItem.className = 'nivel-item';
    
    if (nivelesCompletados[index]) {
      nivelItem.classList.add('completado');
    }
    
    nivelItem.innerHTML = `
      <div style="font-size: 2rem;">${nivel.icon}</div>
      <div style="font-size: 0.8rem; margin-top: 5px;">
        ${nivel.nombre}
      </div>
      <div style="font-size: 1.5rem; margin-top: 5px;">
        ${nivelesCompletados[index] ? '✅' : '⭕'}
      </div>
    `;
    
    nivelesCompletadosDiv.appendChild(nivelItem);
  });
}

// ===== EVENTOS =====
btnAprender.addEventListener('click', () => {
  window.location.href = "aprender.html";
});

btnJuego.addEventListener('click', () => {
  window.location.href = "juego.html";
});

btnSalir.addEventListener('click', () => {
  const confirmar = confirm('¿Estás seguro de que quieres cambiar de usuario?');
  if (confirmar) {
    localStorage.clear();
    window.location.href = "index.html";
  }
});

// ===== INICIAR =====
inicializar();