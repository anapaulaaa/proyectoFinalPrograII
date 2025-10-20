const botonesGenero = document.querySelectorAll('.generoBtn');
const botonComenzar = document.getElementById('startBtn');
let generoSeleccionado = null;

// Elegir género
botonesGenero.forEach(btn => {
  btn.addEventListener('click', () => {
    generoSeleccionado = btn.dataset.genero;

    // Resaltar el botón seleccionado
    botonesGenero.forEach(b => b.style.opacity = '0.5');
    btn.style.opacity = '1';
  });
});

// Botón comenzar
botonComenzar.addEventListener('click', () => {
  const nombreNiño = document.getElementById('username').value.trim();

  if (nombreNiño === "") {
    alert("Por favor ingresa tu nombre 👀");
    return;
  }

  if (!generoSeleccionado) {
    alert("Por favor selecciona un género 👀");
    return;
  }

  // Guardar nombre, género y nivel
  localStorage.setItem('nombreJugador', nombreNiño);
  localStorage.setItem('generoJugador', generoSeleccionado);
  localStorage.setItem('nivelActual', 1);
  localStorage.setItem('nivelesCompletados', JSON.stringify([false, false, false]));

  // Redirigir al juego
  window.location.href = "juego.html";
});
