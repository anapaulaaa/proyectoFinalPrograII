// ===== CONFIGURACIÓN DEL NIVEL 3: SITUACIONES =====
const NIVEL3_CONFIG = {
  nombre: 'Situaciones Especiales',
  situaciones: [
    {
      id: 'escuela',
      nombre: '🏫 Para la Escuela',
      descripcion: 'Viste apropiadamente para un día de clases',
      prendas_correctas: ['camisa', 'pantalon', 'zapatos', 'mochila'],
      prendas_incorrectas: ['pijama', 'chancletas', 'traje_bano']
    },
    {
      id: 'fiesta',
      nombre: '🎉 Para una Fiesta',
      descripcion: 'Luce elegante para una celebración especial',
      prendas_correctas: ['camisa', 'pantalon', 'zapatos'],
      prendas_incorrectas: ['shorts', 'gorra', 'deportivos']
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
      prendas_correctas: ['traje_bano', 'chancletas', 'gorra', 'lentes'],
      prendas_incorrectas: ['abrigo', 'botas', 'bufanda']
    },
    {
      id: 'deporte',
      nombre: '⚽ Para Hacer Deporte',
      descripcion: 'Viste apropiado para ejercitarte',
      prendas_correctas: ['deportivos', 'shorts', 'tenis'],
      prendas_incorrectas: ['camisa', 'pantalon', 'zapatos']
    }
  ]
};

let situacionActual = 0;
let intentos = 3;
let aciertos = 0;

// ===== INICIALIZAR NIVEL 3 =====
function inicializarNivel3() {
  situacionActual = 0;
  intentos = 3;
  aciertos = 0;
  mostrarSituacion();
}

// ===== MOSTRAR SITUACIÓN =====
function mostrarSituacion() {
  const situacion = NIVEL3_CONFIG.situaciones[situacionActual];
  
  // Actualizar nombre del nivel
  const nivelNombre = document.getElementById('nivelNombre');
  if (nivelNombre) {
    nivelNombre.textContent = NIVEL3_CONFIG.nombre;
  }
  
  // Crear interfaz de situación
  const munecosSection = document.querySelector('.muneco-section');
  munecosSection.innerHTML = `
    <div class="situacion-info">
      <div class="situacion-icono">${situacion.nombre.split(' ')[0]}</div>
      <h2>${situacion.nombre.substring(3)}</h2>
      <p>${situacion.descripcion}</p>
      <div class="intentos-display">
        <span>Intentos: </span>
        <span class="intentos-count">${'❤️'.repeat(intentos)}</span>
      </div>
    </div>
    
    <div class="opciones-situacion" id="opcionesSituacion">
      <!-- Las opciones se generan dinámicamente -->
    </div>
  `;
  
  generarOpcionesSituacion(situacion);
}

// ===== GENERAR OPCIONES =====
function generarOpcionesSituacion(situacion) {
  const opcionesDiv = document.getElementById('opcionesSituacion');
  
  // Combinar prendas correctas e incorrectas
  const todasOpciones = [
    ...situacion.prendas_correctas.map(p => ({ prenda: p, correcta: true })),
    ...situacion.prendas_incorrectas.slice(0, 3).map(p => ({ prenda: p, correcta: false }))
  ];
  
  // Mezclar
  todasOpciones.sort(() => Math.random() - 0.5);
  
  // Crear botones
  opcionesDiv.innerHTML = '';
  todasOpciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.className = 'opcion-situacion-btn';
    btn.innerHTML = `
      <div class="opcion-icono">${getIconoPrenda(opcion.prenda)}</div>
      <span>${formatearNombrePrenda(opcion.prenda)}</span>
    `;
    
    btn.addEventListener('click', () => {
      verificarOpcionSituacion(opcion.correcta, btn);
    });
    
    opcionesDiv.appendChild(btn);
  });
}

// ===== VERIFICAR OPCIÓN =====
function verificarOpcionSituacion(esCorrecta, boton) {
  // Deshabilitar todos los botones temporalmente
  const botones = document.querySelectorAll('.opcion-situacion-btn');
  botones.forEach(b => b.style.pointerEvents = 'none');
  
  if (esCorrecta) {
    boton.classList.add('correcta');
    aciertos++;
    
    mostrarFeedbackSituacion(true, '¡Correcto! 🎉');
    
    setTimeout(() => {
      siguienteSituacion();
    }, 1500);
  } else {
    boton.classList.add('incorrecta');
    intentos--;
    
    document.querySelector('.intentos-count').textContent = '❤️'.repeat(intentos);
    
    if (intentos <= 0) {
      mostrarFeedbackSituacion(false, 'Se acabaron los intentos 😅');
      setTimeout(() => {
        reiniciarNivel3();
      }, 2000);
    } else {
      mostrarFeedbackSituacion(false, '¡Intenta de nuevo!');
      setTimeout(() => {
        boton.classList.remove('incorrecta');
        botones.forEach(b => b.style.pointerEvents = 'auto');
      }, 1000);
    }
  }
}

// ===== SIGUIENTE SITUACIÓN =====
function siguienteSituacion() {
  situacionActual++;
  
  if (situacionActual >= NIVEL3_CONFIG.situaciones.length) {
    completarNivel3();
  } else {
    mostrarSituacion();
  }
}

// ===== COMPLETAR NIVEL 3 =====
function completarNivel3() {
  marcarNivelCompletado(2); // Índice 2 para nivel 3
  
  const mensajeFelicitacion = document.getElementById('mensajeFelicitacion');
  const modalFelicitaciones = document.getElementById('modalFelicitaciones');
  
  mensajeFelicitacion.textContent = `¡Increíble ${nombreJugador}! 🎊 Has completado todas las situaciones. Aciertos: ${aciertos}/${NIVEL3_CONFIG.situaciones.length}`;
  
  modalFelicitaciones.style.display = 'flex';
  
  // Cambiar botón de siguiente nivel
  const btnSiguiente = document.getElementById('btnSiguienteNivel');
  if (btnSiguiente) {
    btnSiguiente.textContent = '🏠 Volver al Menú';
    btnSiguiente.disabled = false;
    btnSiguiente.onclick = () => window.location.href = 'menu.html';
  }
}

// ===== REINICIAR NIVEL 3 =====
function reiniciarNivel3() {
  situacionActual = 0;
  intentos = 3;
  aciertos = 0;
  mostrarSituacion();
}

// ===== FEEDBACK =====
function mostrarFeedbackSituacion(esCorrecta, mensaje) {
  const feedbackDiv = document.createElement('div');
  feedbackDiv.className = `feedback-flotante ${esCorrecta ? 'correcto' : 'incorrecto'}`;
  feedbackDiv.textContent = mensaje;
  
  document.body.appendChild(feedbackDiv);
  
  setTimeout(() => {
    feedbackDiv.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    feedbackDiv.classList.remove('show');
    setTimeout(() => feedbackDiv.remove(), 300);
  }, 1500);
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
    traje_bano: '🩱',
    gorra: '🧢',
    lentes: '🕶️',
    shorts: '🩳',
    deportivos: '👕',
    tenis: '👟',
    abrigo: '🧥',
    botas: '🥾',
    bufanda: '🧣',
    jeans: '👖'
  };
  
  return iconos[prenda] || '👕';
}

function formatearNombrePrenda(prenda) {
  return prenda
    .replace(/_/g, ' ')
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

// ===== ESTILOS PARA NIVEL 3 =====
const estilosNivel3 = document.createElement('style');
estilosNivel3.textContent = `
  .situacion-info {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, rgba(42, 157, 143, 0.2), rgba(42, 157, 143, 0.1));
    border-radius: 20px;
    margin-bottom: 30px;
    border: 3px solid rgba(42, 157, 143, 0.3);
  }
  
  .situacion-icono {
    font-size: 5rem;
    margin-bottom: 20px;
    animation: flotar 3s ease-in-out infinite;
  }
  
  @keyframes flotar {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .situacion-info h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--color-light);
  }
  
  .situacion-info p {
    font-size: 1.2rem;
    color: var(--color-text-muted);
    margin-bottom: 20px;
  }
  
  .intentos-display {
    font-size: 1.5rem;
    margin-top: 15px;
  }
  
  .intentos-count {
    font-size: 2rem;
  }
  
  .opciones-situacion {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .opcion-situacion-btn {
    background: linear-gradient(135deg, rgba(29, 53, 87, 0.8), rgba(38, 77, 100, 0.8));
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    color: var(--color-text);
  }
  
  .opcion-situacion-btn:hover {
    transform: translateY(-8px);
    border-color: var(--color-secondary);
    box-shadow: 0 10px 30px rgba(42, 157, 143, 0.4);
  }
  
  .opcion-icono {
    font-size: 4rem;
  }
  
  .opcion-situacion-btn span {
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
  }
  
  .opcion-situacion-btn.correcta {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    border-color: #2ecc71;
    animation: pulsoVerde 0.5s ease;
  }
  
  .opcion-situacion-btn.incorrecta {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    border-color: #e74c3c;
    animation: shake 0.5s ease;
  }
  
  @keyframes pulsoVerde {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  .feedback-flotante {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 30px 50px;
    border-radius: 20px;
    font-size: 1.5rem;
    font-weight: bold;
    z-index: 1000;
    transition: transform 0.3s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }
  
  .feedback-flotante.show {
    transform: translate(-50%, -50%) scale(1);
  }
  
  .feedback-flotante.correcto {
    border: 4px solid #2ecc71;
  }
  
  .feedback-flotante.incorrecto {
    border: 4px solid #e74c3c;
  }
  
  @media (max-width: 768px) {
    .opciones-situacion {
      grid-template-columns: 1fr;
    }
    
    .situacion-info {
      padding: 25px 15px;
    }
    
    .situacion-icono {
      font-size: 4rem;
    }
  }
`;

document.head.appendChild(estilosNivel3);

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.inicializarNivel3 = inicializarNivel3;
  window.reiniciarNivel3 = reiniciarNivel3;
}

console.log('Nivel 3: Situaciones cargado correctamente ✅');