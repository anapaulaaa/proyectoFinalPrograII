// ===== ELEMENTOS DOM =====
const usernameInput = document.getElementById('username');
const botonesGenero = document.querySelectorAll('.generoBtn');
const botonComenzar = document.getElementById('startBtn');

// ===== ESTADO =====
let generoSeleccionado = null;

// ===== VALIDACIÓN =====
function validarFormulario() {
  const nombreValido = usernameInput.value.trim().length > 0;
  const generoValido = generoSeleccionado !== null;
  
  botonComenzar.disabled = !(nombreValido && generoValido);
}

// ===== SELECCIÓN DE GÉNERO =====
botonesGenero.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remover selección previa
    botonesGenero.forEach(b => b.classList.remove('selected'));
    
    // Seleccionar actual
    btn.classList.add('selected');
    generoSeleccionado = btn.dataset.genero;
    
    validarFormulario();
  });
});

// ===== INPUT DE NOMBRE =====
usernameInput.addEventListener('input', validarFormulario);

// ===== COMENZAR JUEGO =====
botonComenzar.addEventListener('click', () => {
  const nombreNino = usernameInput.value.trim();

  if (nombreNino === "") {
    alert("Por favor ingresa tu nombre 👀");
    return;
  }

  if (!generoSeleccionado) {
    alert("Por favor selecciona un género 👀");
    return;
  }

  // Normalizar género
  const generoNormalizado = generoSeleccionado
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  // Guardar datos
  localStorage.setItem('nombreJugador', nombreNino);
  localStorage.setItem('generoJugador', generoNormalizado);
  localStorage.setItem('nivelActual', '1');
  localStorage.setItem('nivelesCompletados', JSON.stringify([false, false, false]));

  // Redirigir al menú
  window.location.href = "menu.html";
});

// ===== AUTO-CARGAR SI YA EXISTE USUARIO =====
window.addEventListener('DOMContentLoaded', () => {
  const nombreGuardado = localStorage.getItem('nombreJugador');
  if (nombreGuardado) {
    // Mostrar opción de continuar
    const continuar = confirm(`¿Quieres continuar como ${nombreGuardado}?`);
    if (continuar) {
      window.location.href = "menu.html";
    }
  }
});