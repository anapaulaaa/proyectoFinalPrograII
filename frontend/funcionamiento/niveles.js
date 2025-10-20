// Archivo: funcionamiento/niveles.js
// Control de niveles completados

let nivelesCompletados = JSON.parse(localStorage.getItem('nivelesCompletados')) || [false, false, false];

function marcarNivelCompletado(nivelIndex) {
  nivelesCompletados[nivelIndex] = true;
  localStorage.setItem('nivelesCompletados', JSON.stringify(nivelesCompletados));
}

function puedeAvanzar(nivelIndex) {
  return nivelesCompletados[nivelIndex];
}

// Exponer las funciones en el scope global para que main.js (script clásico)
// pueda usarlas cuando la página se abra via file://
window.marcarNivelCompletado = marcarNivelCompletado;
window.puedeAvanzar = puedeAvanzar;
