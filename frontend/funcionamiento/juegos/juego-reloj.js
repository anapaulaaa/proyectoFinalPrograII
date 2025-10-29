// ===== ELEMENTOS DOM =====
const btnMenu = document.getElementById('btnMenu');
const canvasReloj = document.getElementById('relojJuego');
const ctx = canvasReloj.getContext('2d');
const opcionesDiv = document.getElementById('opciones');
const feedbackDiv = document.getElementById('feedback');
const feedbackIcono = document.getElementById('feedbackIcono');
const feedbackTitulo = document.getElementById('feedbackTitulo');
const feedbackMensaje = document.getElementById('feedbackMensaje');
const modalVictoria = document.getElementById('modalVictoria');
const preguntaH2 = document.getElementById('pregunta');

// Stats
const puntosSpan = document.getElementById('puntos');
const nivelSpan = document.getElementById('nivel');
const rachaSpan = document.getElementById('racha');

// Stats finales
const puntosFinales = document.getElementById('puntosFinales');
const nivelAlcanzado = document.getElementById('nivelAlcanzado');
const rachaMaxima = document.getElementById('rachaMaxima');
const mensajeVictoria = document.getElementById('mensajeVictoria');

// ===== ESTADO DEL JUEGO =====
let puntos = 0;
let nivel = 1;
let racha = 0;
let rachaMax = 0;
let horaCorrecta = { horas: 0, minutos: 0 };
let respondiendo = false;

const PUNTOS_POR_RESPUESTA = 10;
const PUNTOS_BONUS_RACHA = 5;
const PREGUNTAS_POR_NIVEL = 5;
let preguntasRespondidas = 0;

// ===== CONFIGURACIÓN DE NIVELES =====
const NIVELES_CONFIG = {
  1: { nombre: 'Horas en Punto', tipo: 'enpunto' },
  2: { nombre: 'Media Hora', tipo: 'media' },
  3: { nombre: 'Cuartos de Hora', tipo: 'cuartos' },
  4: { nombre: 'Todas las Horas', tipo: 'mixto' }
};

// ===== EVENTOS =====
if (btnMenu) {
  btnMenu.addEventListener('click', () => {
    const confirmar = confirm('¿Quieres salir? Perderás tu progreso actual.');
    if (confirmar) window.location.href = 'menu.html';
  });
}

// ===== INICIALIZACIÓN =====
function iniciarJuego() {
  actualizarStats();
  generarPregunta();
}

// ===== GENERAR PREGUNTA =====
function generarPregunta() {
  respondiendo = false;
  
  // Generar hora según el nivel
  const config = NIVELES_CONFIG[nivel];
  horaCorrecta = generarHoraPorNivel(config.tipo);
  
  // Actualizar pregunta
  preguntaH2.textContent = `¿Qué hora es?`;
  
  // Dibujar reloj
  dibujarReloj(horaCorrecta.horas, horaCorrecta.minutos);
  
  // Generar opciones
  generarOpciones();
}

function generarHoraPorNivel(tipo) {
  let horas = Math.floor(Math.random() * 12) + 1;
  let minutos = 0;
  
  switch(tipo) {
    case 'enpunto':
      minutos = 0;
      break;
    case 'media':
      minutos = Math.random() < 0.5 ? 0 : 30;
      break;
    case 'cuartos':
      const opciones = [0, 15, 30, 45];
      minutos = opciones[Math.floor(Math.random() * opciones.length)];
      break;
    case 'mixto':
      minutos = Math.floor(Math.random() * 12) * 5; // Intervalos de 5 minutos
      break;
  }
  
  return { horas, minutos };
}

// ===== GENERAR OPCIONES =====
function generarOpciones() {
  const opciones = [];
  
  // Agregar respuesta correcta
  opciones.push({
    texto: formatearHora(horaCorrecta.horas, horaCorrecta.minutos),
    correcta: true
  });
  
  // Generar 3 respuestas incorrectas
  while (opciones.length < 4) {
    const horaIncorrecta = generarHoraIncorrecta();
    const textoHora = formatearHora(horaIncorrecta.horas, horaIncorrecta.minutos);
    
    // Verificar que no se repita
    if (!opciones.some(o => o.texto === textoHora)) {
      opciones.push({
        texto: textoHora,
        correcta: false
      });
    }
  }
  
  // Mezclar opciones
  opciones.sort(() => Math.random() - 0.5);
  
  // Crear botones
  opcionesDiv.innerHTML = '';
  opciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.className = 'opcion-btn';
    btn.textContent = opcion.texto;
    btn.addEventListener('click', () => verificarRespuesta(opcion.correcta, btn));
    opcionesDiv.appendChild(btn);
  });
}

function generarHoraIncorrecta() {
  let horas = Math.floor(Math.random() * 12) + 1;
  let minutos = Math.floor(Math.random() * 12) * 5;
  
  // Asegurar que sea diferente a la correcta
  while (horas === horaCorrecta.horas && minutos === horaCorrecta.minutos) {
    horas = Math.floor(Math.random() * 12) + 1;
    minutos = Math.floor(Math.random() * 12) * 5;
  }
  
  return { horas, minutos };
}

function formatearHora(horas, minutos) {
  return `${horas}:${minutos.toString().padStart(2, '0')}`;
}

// ===== VERIFICAR RESPUESTA =====
function verificarRespuesta(esCorrecta, botonClickeado) {
  if (respondiendo) return;
  respondiendo = true;
  
  // Deshabilitar todos los botones
  const botones = opcionesDiv.querySelectorAll('.opcion-btn');
  botones.forEach(btn => btn.disabled = true);
  
  if (esCorrecta) {
    // Respuesta correcta
    botonClickeado.classList.add('correcta');
    racha++;
    if (racha > rachaMax) rachaMax = racha;
    
    const puntosGanados = PUNTOS_POR_RESPUESTA + (racha > 2 ? PUNTOS_BONUS_RACHA * (racha - 2) : 0);
    puntos += puntosGanados;
    
    mostrarFeedback(true, puntosGanados);
    
    preguntasRespondidas++;
    
    // Verificar si sube de nivel
    if (preguntasRespondidas >= PREGUNTAS_POR_NIVEL) {
      setTimeout(() => {
        subirNivel();
      }, 2000);
    } else {
      setTimeout(() => {
        generarPregunta();
      }, 2000);
    }
  } else {
    // Respuesta incorrecta
    botonClickeado.classList.add('incorrecta');
    racha = 0;
    
    // Mostrar la respuesta correcta
    botones.forEach(btn => {
      if (btn.textContent === formatearHora(horaCorrecta.horas, horaCorrecta.minutos)) {
        btn.classList.add('correcta');
      }
    });
    
    mostrarFeedback(false);
    
    setTimeout(() => {
      generarPregunta();
    }, 3000);
  }
  
  actualizarStats();
}

// ===== MOSTRAR FEEDBACK =====
function mostrarFeedback(esCorrecta, puntosGanados = 0) {
  feedbackDiv.style.display = 'block';
  feedbackDiv.className = 'feedback ' + (esCorrecta ? 'correcto' : 'incorrecto');
  
  if (esCorrecta) {
    feedbackIcono.textContent = '🎉';
    feedbackTitulo.textContent = '¡Correcto!';
    
    if (racha > 2) {
      feedbackMensaje.textContent = `+${puntosGanados} puntos (¡Racha x${racha}!)`;
    } else {
      feedbackMensaje.textContent = `+${puntosGanados} puntos`;
    }
  } else {
    feedbackIcono.textContent = '😅';
    feedbackTitulo.textContent = 'Casi...';
    feedbackMensaje.textContent = `La respuesta era ${formatearHora(horaCorrecta.horas, horaCorrecta.minutos)}`;
  }
  
  setTimeout(() => {
    feedbackDiv.style.display = 'none';
  }, 1500);
}

// ===== SUBIR DE NIVEL =====
function subirNivel() {
  if (nivel >= Object.keys(NIVELES_CONFIG).length) {
    // Juego completado
    mostrarVictoria();
  } else {
    nivel++;
    preguntasRespondidas = 0;
    
    // Mostrar mensaje de nivel
    feedbackDiv.style.display = 'block';
    feedbackDiv.className = 'feedback correcto';
    feedbackIcono.textContent = '🎖️';
    feedbackTitulo.textContent = `¡Nivel ${nivel}!`;
    feedbackMensaje.textContent = NIVELES_CONFIG[nivel].nombre;
    
    setTimeout(() => {
      feedbackDiv.style.display = 'none';
      generarPregunta();
    }, 2500);
  }
}

// ===== MOSTRAR VICTORIA =====
function mostrarVictoria() {
  puntosFinales.textContent = puntos;
  nivelAlcanzado.textContent = nivel;
  rachaMaxima.textContent = rachaMax;
  
  const nombreJugador = localStorage.getItem('nombreJugador') || 'Campeón';
  mensajeVictoria.textContent = `¡${nombreJugador}, has completado todos los niveles del juego del reloj!`;
  
  modalVictoria.style.display = 'flex';
}

// ===== ACTUALIZAR STATS =====
function actualizarStats() {
  puntosSpan.textContent = puntos;
  nivelSpan.textContent = nivel;
  rachaSpan.textContent = racha;
}

// ===== DIBUJAR RELOJ =====
function dibujarReloj(horas, minutos) {
  const centerX = canvasReloj.width / 2;
  const centerY = canvasReloj.height / 2;
  const radius = Math.min(centerX, centerY) - 25;
  
  // Limpiar canvas
  ctx.clearRect(0, 0, canvasReloj.width, canvasReloj.height);
  
  // Fondo del reloj
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  
  // Borde exterior
  ctx.strokeStyle = '#1d3557';
  ctx.lineWidth = 6;
  ctx.stroke();
  
  // Borde interior decorativo
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 10, 0, 2 * Math.PI);
  ctx.strokeStyle = '#2a9d8f';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Dibujar números
  ctx.fillStyle = '#1d3557';
  ctx.font = 'bold 28px Poppins';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  for (let i = 1; i <= 12; i++) {
    const angle = (i - 3) * (Math.PI / 6);
    const x = centerX + Math.cos(angle) * (radius - 40);
    const y = centerY + Math.sin(angle) * (radius - 40);
    ctx.fillText(i.toString(), x, y);
  }
  
  // Dibujar marcas de minutos
  for (let i = 0; i < 60; i++) {
    const angle = i * (Math.PI / 30);
    const isHourMark = i % 5 === 0;
    
    ctx.beginPath();
    const startRadius = radius - (isHourMark ? 20 : 12);
    const endRadius = radius - 8;
    
    const x1 = centerX + Math.cos(angle) * startRadius;
    const y1 = centerY + Math.sin(angle) * startRadius;
    const x2 = centerX + Math.cos(angle) * endRadius;
    const y2 = centerY + Math.sin(angle) * endRadius;
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = isHourMark ? '#2a9d8f' : '#a8dadc';
    ctx.lineWidth = isHourMark ? 3 : 2;
    ctx.stroke();
  }
  
  // Manecilla de horas
  const horasAngle = ((horas % 12) + minutos / 60) * (Math.PI / 6) - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(horasAngle) * (radius * 0.5),
    centerY + Math.sin(horasAngle) * (radius * 0.5)
  );
  ctx.strokeStyle = '#1d3557';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Manecilla de minutos
  const minutosAngle = minutos * (Math.PI / 30) - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(minutosAngle) * (radius * 0.75),
    centerY + Math.sin(minutosAngle) * (radius * 0.75)
  );
  ctx.strokeStyle = '#2a9d8f';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Centro del reloj
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fillStyle = '#e63946';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// ===== INICIAR JUEGO =====
iniciarJuego();
console.log('Juego del Reloj iniciado ⏰');