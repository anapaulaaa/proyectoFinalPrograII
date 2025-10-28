// ===== GESTIÓN DE NIVELES =====

// Obtener niveles completados
function getNivelesCompletados() {
  const stored = localStorage.getItem('nivelesCompletados');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [false, false, false];
    }
  }
  return [false, false, false];
}

// Guardar niveles completados
function setNivelesCompletados(niveles) {
  localStorage.setItem('nivelesCompletados', JSON.stringify(niveles));
}

// Marcar nivel como completado
function marcarNivelCompletado(nivelIndex) {
  const niveles = getNivelesCompletados();
  if (nivelIndex >= 0 && nivelIndex < niveles.length) {
    niveles[nivelIndex] = true;
    setNivelesCompletados(niveles);
    return true;
  }
  return false;
}

// Verificar si un nivel está completado
function esNivelCompletado(nivelIndex) {
  const niveles = getNivelesCompletados();
  return niveles[nivelIndex] || false;
}

// Verificar si puede avanzar al siguiente nivel
function puedeAvanzar(nivelIndex) {
  return esNivelCompletado(nivelIndex);
}

// Obtener nivel actual
function getNivelActual() {
  return parseInt(localStorage.getItem('nivelActual')) || 1;
}

// Establecer nivel actual
function setNivelActual(nivel) {
  localStorage.setItem('nivelActual', nivel.toString());
}

// Exponer funciones globalmente
window.marcarNivelCompletado = marcarNivelCompletado;
window.puedeAvanzar = puedeAvanzar;
window.esNivelCompletado = esNivelCompletado;
window.getNivelesCompletados = getNivelesCompletados;
window.getNivelActual = getNivelActual;
window.setNivelActual = setNivelActual;