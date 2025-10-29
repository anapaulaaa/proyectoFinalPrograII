// ===== CONFIGURACIÓN DEL NIVEL 3: SITUACIONES =====
const NIVEL3_CONFIG = {
  nombre: 'Situaciones Especiales',
  situaciones: [
    {
      id: 'escuela',
      nombre: '🏫 Para la Escuela',
      descripcion: 'Viste apropiadamente para un día de clases',
      prendas_correctas: ['camisa', 'pantalon', 'zapatos', 'mochila'],
      prendas_incorrectas: ['pijama', 'chancletas', 'pantuflas']
    },
    {
      id: 'fiesta',
      nombre: '🎉 Para una Fiesta',
      descripcion: 'Luce elegante para una celebración especial',
      prendas_correctas: ['camisa', 'pantalon', 'zapatos'],
      prendas_incorrectas: ['shorts', 'gorra', 'pijama']
    },
    {
      id: 'dormir',
      nombre: '🌙 Para Dormir',
      descripcion: 'Viste cómodo para una buena noche de sueño',
      prendas_correctas: ['pijama', 'pantuflas'],
      prendas_incorrectas: ['jeans', 'zapatos', 'mochila']
    },
    {
      id: 'playa',
      nombre: '⛱️ Para la Playa',
      descripcion: 'Prepárate para disfrutar del sol y el agua',
      prendas_correctas: ['shorts', 'chancletas', 'gorra', 'lentes'],
      prendas_incorrectas: ['abrigo', 'botas', 'pantalon']
    },
    {
      id: 'deporte',
      nombre: '⚽ Para Hacer Deporte',
      descripcion: 'Viste apropiado para ejercitarte',
      prendas_correctas: ['shorts', 'tenis', 'gorra'],
      prendas_incorrectas: ['camisa', 'pantalon', 'zapatos']
    }
  ]
};

let situacionActual = 0;
let intentos = 3;
let aciertos = 0;
let prendasSeleccionadas = [];

// ===== INICIALIZAR NIVEL 3 =====
function inicializarNivel3() {
  console.log('🎯 Iniciando Nivel 3: Situaciones');
  situacionActual = 0;
  intentos = 3;
  aciertos = 0;
  
  // Ocultar sección de prendas normal
  const prendasSection = document.querySelector('.prendas-section');
  if (prendasSection) prendasSection.style.display = 'none';
  
  // Crear interfaz completa del nivel 3
  crearInterfazNivel3();
  mostrarSituacion();
}

// ===== CREAR INTERFAZ COMPLETA =====
function crearInterfazNivel3() {
  const gameArea = document.querySelector('.game-area');
  if (!gameArea) return;
  
  gameArea.innerHTML = `
    <div class="nivel3-container">
      <div class="situacion-card">
        <div class="situacion-header">
          <div id="situacionIcono" class="situacion-icono">🏫</div>
          <h2 id="situacionTitulo">Cargando...</h2>
          <p id="situacionDescripcion">Preparando situación...</p>
        </div>
        
        <div class="intentos-display">
          <span class="intentos-label">❤️ Intentos:</span>
          <span id="intentosCount" class="intentos-count">❤️❤️❤️</span>
        </div>
      </div>
      
      <div class="instruccion-box">
        <p>👆 Selecciona todas las prendas correctas para esta situación</p>
      </div>
      
      <div id="opcionesNivel3" class="opciones-nivel3-grid">
        <!-- Las opciones se generan aquí -->
      </div>
      
      <div class="nivel3-controles">
        <button id="btnVerificarNivel3" class="btn-verificar" disabled>
          ✓ Verificar Selección
        </button>
        <button id="btnSaltarSituacion" class="btn-saltar">
          ⏭️ Saltar (usar intento)
        </button>
      </div>
    </div>
  `;
  
  // Configurar eventos
  const btnVerificar = document.getElementById('btnVerificarNivel3');
  const btnSaltar = document.getElementById('btnSaltarSituacion');
  
  if (btnVerificar) {
    btnVerificar.addEventListener('click', verificarSeleccion);
  }
  
  if (btnSaltar) {
    btnSaltar.addEventListener('click', saltarSituacion);
  }
}

// ===== MOSTRAR SITUACIÓN =====
function mostrarSituacion() {
  if (situacionActual >= NIVEL3_CONFIG.situaciones.length) {
    completarNivel3();
    return;
  }
  
  const situacion = NIVEL3_CONFIG.situaciones[situacionActual];
  prendasSeleccionadas = [];
  
  // Actualizar header
  const icono = document.getElementById('situacionIcono');
  const titulo = document.getElementById('situacionTitulo');
  const descripcion = document.getElementById('situacionDescripcion');
  const intentosCount = document.getElementById('intentosCount');
  
  if (icono) icono.textContent = situacion.nombre.split(' ')[0];
  if (titulo) titulo.textContent = situacion.nombre.substring(3);
  if (descripcion) descripcion.textContent = situacion.descripcion;
  if (intentosCount) intentosCount.textContent = '❤️'.repeat(intentos);
  
  // Generar opciones
  generarOpcionesSituacion(situacion);
  
  // Actualizar botón verificar
  const btnVerificar = document.getElementById('btnVerificarNivel3');
  if (btnVerificar) btnVerificar.disabled = true;
}

// ===== GENERAR OPCIONES =====
function generarOpcionesSituacion(situacion) {
  const opcionesDiv = document.getElementById('opcionesNivel3');
  if (!opcionesDiv) return;
  
  // Combinar todas las opciones
  const todasOpciones = [
    ...situacion.prendas_correctas.map(p => ({ prenda: p, correcta: true })),
    ...situacion.prendas_incorrectas.map(p => ({ prenda: p, correcta: false }))
  ];
  
  // Mezclar
  todasOpciones.sort(() => Math.random() - 0.5);
  
  // Crear botones
  opcionesDiv.innerHTML = '';
  todasOpciones.forEach((opcion, index) => {
    const btn = document.createElement('button');
    btn.className = 'opcion-nivel3-btn';
    btn.dataset.prenda = opcion.prenda;
    btn.dataset.correcta = opcion.correcta;
    btn.dataset.index = index;
    
    btn.innerHTML = `
      <div class="opcion-icono">${getIconoPrenda(opcion.prenda)}</div>
      <span class="opcion-nombre">${formatearNombrePrenda(opcion.prenda)}</span>
      <div class="check-indicator">✓</div>
    `;
    
    btn.addEventListener('click', () => toggleSeleccion(btn));
    
    opcionesDiv.appendChild(btn);
  });
}

// ===== TOGGLE SELECCIÓN =====
function toggleSeleccion(boton) {
  const prenda = boton.dataset.prenda;
  const index = prendasSeleccionadas.indexOf(prenda);
  
  if (index > -1) {
    // Deseleccionar
    prendasSeleccionadas.splice(index, 1);
    boton.classList.remove('seleccionada');
  } else {
    // Seleccionar
    prendasSeleccionadas.push(prenda);
    boton.classList.add('seleccionada');
  }
  
  // Actualizar botón verificar
  const btnVerificar = document.getElementById('btnVerificarNivel3');
  if (btnVerificar) {
    btnVerificar.disabled = prendasSeleccionadas.length === 0;
  }
}

// ===== VERIFICAR SELECCIÓN =====
function verificarSeleccion() {
  const situacion = NIVEL3_CONFIG.situaciones[situacionActual];
  const correctas = situacion.prendas_correctas;
  
  // Verificar si seleccionó todas las correctas y ninguna incorrecta
  const todosCorrecto = correctas.every(p => prendasSeleccionadas.includes(p));
  const ningunaIncorrecta = prendasSeleccionadas.every(p => correctas.includes(p));
  
  // Deshabilitar botones
  const botones = document.querySelectorAll('.opcion-nivel3-btn');
  botones.forEach(btn => btn.disabled = true);
  
  if (todosCorrecto && ningunaIncorrecta) {
    // ¡CORRECTO!
    aciertos++;
    mostrarResultado(true);
    
    // Resaltar correctas en verde
    botones.forEach(btn => {
      if (btn.classList.contains('seleccionada')) {
        btn.classList.add('correcta');
      }
    });
    
    setTimeout(() => {
      situacionActual++;
      mostrarSituacion();
    }, 2000);
  } else {
    // INCORRECTO
    intentos--;
    mostrarResultado(false);
    
    // Mostrar feedback visual
    botones.forEach(btn => {
      const esCorrecta = btn.dataset.correcta === 'true';
      const estaSeleccionada = btn.classList.contains('seleccionada');
      
      if (esCorrecta && !estaSeleccionada) {
        // Faltó seleccionar esta (mostrar en verde)
        btn.classList.add('faltante');
      } else if (!esCorrecta && estaSeleccionada) {
        // Seleccionó incorrecta (mostrar en rojo)
        btn.classList.add('incorrecta');
      }
    });
    
    // Actualizar intentos
    const intentosCount = document.getElementById('intentosCount');
    if (intentosCount) {
      intentosCount.textContent = '❤️'.repeat(intentos);
    }
    
    if (intentos <= 0) {
      setTimeout(() => {
        mostrarGameOver();
      }, 2500);
    } else {
      setTimeout(() => {
        mostrarSituacion();
      }, 2500);
    }
  }
}

// ===== SALTAR SITUACIÓN =====
function saltarSituacion() {
  const confirmar = confirm('¿Seguro que quieres saltar esta situación? Perderás un intento.');
  if (confirmar) {
    intentos--;
    const intentosCount = document.getElementById('intentosCount');
    if (intentosCount) {
      intentosCount.textContent = '❤️'.repeat(intentos);
    }
    
    if (intentos <= 0) {
      mostrarGameOver();
    } else {
      situacionActual++;
      mostrarSituacion();
    }
  }
}

// ===== MOSTRAR RESULTADO =====
function mostrarResultado(esCorrecto) {
  const feedback = document.createElement('div');
  feedback.className = `feedback-nivel3 ${esCorrecto ? 'correcto' : 'incorrecto'}`;
  feedback.innerHTML = `
    <div class="feedback-icono">${esCorrecto ? '🎉' : '😅'}</div>
    <h3>${esCorrecto ? '¡Perfecto!' : '¡Casi!'}</h3>
    <p>${esCorrecto ? '¡Seleccionaste todas las prendas correctas!' : 'Revisa tu selección'}</p>
  `;
  
  document.body.appendChild(feedback);
  
  setTimeout(() => {
    feedback.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    feedback.classList.remove('show');
    setTimeout(() => feedback.remove(), 300);
  }, 1800);
}

// ===== GAME OVER =====
function mostrarGameOver() {
  const modal = document.getElementById('modalFelicitaciones');
  const mensaje = document.getElementById('mensajeFelicitacion');
  
  if (modal && mensaje) {
    mensaje.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 20px;">😢</div>
      <h3>¡Se acabaron los intentos!</h3>
      <p style="margin: 20px 0;">Completaste ${aciertos} de ${NIVEL3_CONFIG.situaciones.length} situaciones</p>
      <p>¡No te rindas, puedes intentarlo de nuevo!</p>
    `;
    modal.style.display = 'flex';
    
    const btnContinuar = document.getElementById('btnContinuar');
    if (btnContinuar) {
      btnContinuar.textContent = '🔄 Intentar de Nuevo';
      btnContinuar.onclick = () => {
        modal.style.display = 'none';
        reiniciarNivel3();
      };
    }
  }
}

// ===== COMPLETAR NIVEL 3 =====
function completarNivel3() {
  marcarNivelCompletado(2); // Índice 2 para nivel 3
  
  const modal = document.getElementById('modalFelicitaciones');
  const mensaje = document.getElementById('mensajeFelicitacion');
  
  if (modal && mensaje) {
    const nombreJugador = localStorage.getItem('nombreJugador') || 'Campeón';
    mensaje.innerHTML = `
      <div style="font-size: 5rem; margin-bottom: 20px;">🏆</div>
      <h3>¡Felicidades ${nombreJugador}!</h3>
      <p style="margin: 20px 0; font-size: 1.2rem;">
        ¡Has completado todas las situaciones!
      </p>
      <div style="background: rgba(42, 157, 143, 0.2); padding: 20px; border-radius: 15px; margin: 20px 0;">
        <p style="font-size: 2rem; margin: 0;">
          ✓ ${aciertos} / ${NIVEL3_CONFIG.situaciones.length} situaciones correctas
        </p>
      </div>
    `;
    modal.style.display = 'flex';
    
    const btnContinuar = document.getElementById('btnContinuar');
    if (btnContinuar) {
      btnContinuar.textContent = '🏠 Volver al Menú';
      btnContinuar.onclick = () => {
        window.location.href = 'menu.html';
      };
    }
    
    const btnSiguiente = document.getElementById('btnSiguienteNivel');
    if (btnSiguiente) {
      btnSiguiente.style.display = 'none';
    }
  }
}

// ===== REINICIAR NIVEL 3 =====
function reiniciarNivel3() {
  situacionActual = 0;
  intentos = 3;
  aciertos = 0;
  prendasSeleccionadas = [];
  mostrarSituacion();
}

// ===== UTILIDADES =====
function getIconoPrenda(prenda) {
  const iconos = {
    camisa: '👔',
    pantalon: '👖',
    zapatos: '👞',
    mochila: '🎒',
    pijama: '🛌',
    pantuflas: '🥿',
    chancletas: '🩴',
    shorts: '🩳',
    gorra: '🧢',
    lentes: '🕶️',
    tenis: '👟',
    abrigo: '🧥',
    botas: '🥾',
    bufanda: '🧣',
    jeans: '👖'
  };
  return iconos[prenda] || '👕';
}

function formatearNombrePrenda(prenda) {
  const nombres = {
    camisa: 'Camisa',
    pantalon: 'Pantalón',
    zapatos: 'Zapatos',
    mochila: 'Mochila',
    pijama: 'Pijama',
    pantuflas: 'Pantuflas',
    chancletas: 'Chancletas',
    shorts: 'Shorts',
    gorra: 'Gorra',
    lentes: 'Lentes',
    tenis: 'Tenis',
    abrigo: 'Abrigo',
    botas: 'Botas',
    bufanda: 'Bufanda',
    jeans: 'Jeans'
  };
  return nombres[prenda] || prenda;
}

// ===== ESTILOS CSS PARA NIVEL 3 =====
const estilosNivel3 = document.createElement('style');
estilosNivel3.id = 'estilos-nivel3';
estilosNivel3.textContent = `
  .nivel3-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .situacion-card {
    background: linear-gradient(135deg, rgba(42, 157, 143, 0.2), rgba(42, 157, 143, 0.1));
    border: 3px solid rgba(42, 157, 143, 0.4);
    border-radius: 25px;
    padding: 40px;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .situacion-header {
    margin-bottom: 20px;
  }
  
  .situacion-icono {
    font-size: 5rem;
    margin-bottom: 20px;
    animation: flotar 3s ease-in-out infinite;
    display: inline-block;
  }
  
  @keyframes flotar {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  .situacion-card h2 {
    font-size: 2.2rem;
    margin-bottom: 15px;
    color: var(--color-light);
  }
  
  .situacion-card p {
    font-size: 1.2rem;
    color: var(--color-text-muted);
  }
  
  .intentos-display {
    margin-top: 20px;
    padding: 15px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    display: inline-block;
  }
  
  .intentos-label {
    font-size: 1.2rem;
    margin-right: 10px;
  }
  
  .intentos-count {
    font-size: 1.8rem;
  }
  
  .instruccion-box {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 30px;
    text-align: center;
  }
  
  .instruccion-box p {
    margin: 0;
    font-size: 1.1rem;
    color: var(--color-text);
  }
  
  .opciones-nivel3-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .opcion-nivel3-btn {
    background: linear-gradient(135deg, rgba(29, 53, 87, 0.9), rgba(38, 77, 100, 0.9));
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 25px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    color: var(--color-text);
    position: relative;
    overflow: hidden;
  }
  
  .opcion-nivel3-btn:hover:not(:disabled) {
    transform: translateY(-8px);
    border-color: var(--color-secondary);
    box-shadow: 0 10px 30px rgba(42, 157, 143, 0.4);
  }
  
  .opcion-icono {
    font-size: 3.5rem;
  }
  
  .opcion-nombre {
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
  }
  
  .check-indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: var(--color-secondary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
  }
  
  .opcion-nivel3-btn.seleccionada {
    border-color: var(--color-secondary);
    background: linear-gradient(135deg, rgba(42, 157, 143, 0.4), rgba(42, 157, 143, 0.2));
    transform: translateY(-5px);
  }
  
  .opcion-nivel3-btn.seleccionada .check-indicator {
    opacity: 1;
    transform: scale(1);
  }
  
  .opcion-nivel3-btn.correcta {
    background: linear-gradient(135deg, #2ecc71, #27ae60) !important;
    border-color: #2ecc71 !important;
    animation: pulsoVerde 0.5s ease;
  }
  
  .opcion-nivel3-btn.incorrecta {
    background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
    border-color: #e74c3c !important;
    animation: shake 0.5s ease;
  }
  
  .opcion-nivel3-btn.faltante {
    border-color: #f39c12 !important;
    animation: parpadeo 1s ease-in-out 3;
  }
  
  @keyframes pulsoVerde {
    0%, 100% { transform: translateY(-5px) scale(1); }
    50% { transform: translateY(-5px) scale(1.05); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  
  @keyframes parpadeo {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .nivel3-controles {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .btn-verificar,
  .btn-saltar {
    padding: 18px 40px;
    font-size: 1.2rem;
    font-weight: 700;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    font-family: inherit;
  }
  
  .btn-verificar {
    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
    color: white;
    flex: 1;
    max-width: 350px;
  }
  
  .btn-verificar:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(42, 157, 143, 0.4);
  }
  
  .btn-verificar:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .btn-saltar {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
  }
  
  .btn-saltar:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
  
  .feedback-nivel3 {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(20px);
    color: white;
    padding: 40px 60px;
    border-radius: 25px;
    font-size: 1.3rem;
    font-weight: bold;
    z-index: 10000;
    transition: all 0.3s ease;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
    text-align: center;
    min-width: 350px;
  }
  
  .feedback-nivel3.show {
    transform: translate(-50%, -50%) scale(1);
  }
  
  .feedback-nivel3.correcto {
    border: 5px solid #2ecc71;
  }
  
  .feedback-nivel3.incorrecto {
    border: 5px solid #e74c3c;
  }
  
  .feedback-nivel3 .feedback-icono {
    font-size: 4rem;
    margin-bottom: 15px;
  }
  
  .feedback-nivel3 h3 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .feedback-nivel3 p {
    font-size: 1.1rem;
    margin: 0;
    color: var(--color-text-muted);
  }
  
  @media (max-width: 768px) {
    .opciones-nivel3-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 15px;
    }
    
    .situacion-card {
      padding: 25px 15px;
    }
    
    .situacion-icono {
      font-size: 4rem;
    }
    
    .nivel3-controles {
      flex-direction: column;
    }
    
    .btn-verificar,
    .btn-saltar {
      width: 100%;
      max-width: 100%;
    }
    
    .feedback-nivel3 {
      min-width: 90%;
      padding: 30px 20px;
    }
  }
`;

// Agregar estilos solo si no existen
if (!document.getElementById('estilos-nivel3')) {
  document.head.appendChild(estilosNivel3);
}

// Exportar funciones
if (typeof window !== 'undefined') {
  window.inicializarNivel3 = inicializarNivel3;
  window.reiniciarNivel3 = reiniciarNivel3;
}

console.log('✅ Nivel 3: Situaciones cargado correctamente');