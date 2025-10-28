// ===== OBTENER DATOS DEL JUGADOR =====
const nombreJugador = localStorage.getItem('nombreJugador') || "Jugador";
const generoJugadorRaw = localStorage.getItem('generoJugador') || "nino";
const generoJugador = generoJugadorRaw
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

let nivelActual = getNivelActual();

// ===== ELEMENTOS DOM =====
const bienvenida = document.getElementById('bienvenida');
const nivelHTML = document.getElementById('nivelActual');
const nivelNombre = document.getElementById('nivelNombre');
const muneco = document.getElementById('muneco');
const prendasDiv = document.getElementById('prendas');
const btnMenu = document.getElementById('btnMenu');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnSiguienteNivel = document.getElementById('btnSiguienteNivel');
const progressFill = document.getElementById('progressFill');
const prendasColocadas = document.getElementById('prendasColocadas');
const prendasTotal = document.getElementById('prendasTotal');
const modalFelicitaciones = document.getElementById('modalFelicitaciones');
const mensajeFelicitacion = document.getElementById('mensajeFelicitacion');
const btnContinuar = document.getElementById('btnContinuar');

// Zonas de drop
const zonaCamisa = document.getElementById('zonaCamisa');
const zonaPantalon = document.getElementById('zonaPantalon');
const zonaZapatos = document.getElementById('zonaZapatos');
const zonaGorra = document.getElementById('zonaGorra');
const zonaReloj = document.getElementById('zonaReloj');
const zonaLentes = document.getElementById('zonaLentes');
const zonaMochila = document.getElementById('zonaMochila');

// ===== CONFIGURACIÓN DE NIVELES =====
const NIVELES_CONFIG = {
  1: {
    nombre: 'Ropa Básica',
    prendas: [
      { tipo: 'camisa', zona: zonaCamisa, variantes: 2 },
      { tipo: 'pantalon', zona: zonaPantalon, variantes: 2 },
      { tipo: 'zapatos', zona: zonaZapatos, variantes: 2 }
    ],
    zonas: [zonaCamisa, zonaPantalon, zonaZapatos]
  },
  2: {
    nombre: 'Accesorios',
    prendas: [
      { tipo: 'gorra', zona: zonaGorra, variantes: 2 },
      { tipo: 'reloj', zona: zonaReloj, variantes: 2 },
      { tipo: 'lentes', zona: zonaLentes, variantes: 2 },
      { tipo: 'mochila', zona: zonaMochila, variantes: 1 }
    ],
    zonas: [zonaGorra, zonaReloj, zonaLentes, zonaMochila]
  }
};

// ===== ESTADO DEL JUEGO =====
let prendasColocadasCount = 0;
let prendasTotalCount = 0;

// ===== INICIALIZAR JUEGO =====
function inicializarJuego() {
  if (!localStorage.getItem('nombreJugador')) {
    window.location.href = "index.html";
    return;
  }

  actualizarPantalla();
  configurarEventos();
}

// ===== ACTUALIZAR PANTALLA =====
function actualizarPantalla() {
  bienvenida.textContent = `¡Hola, ${nombreJugador}! 🌊`;
  nivelHTML.textContent = nivelActual;
  nivelNombre.textContent = NIVELES_CONFIG[nivelActual].nombre;
  
  limpiarJuego();
  configurarZonasNivel();
  cargarMuneco();
  cargarPrendas();
  actualizarProgreso();
}

// ===== LIMPIAR JUEGO =====
function limpiarJuego() {
  prendasDiv.innerHTML = '';
  prendasColocadasCount = 0;
  
  // Limpiar todas las zonas
  Object.values(NIVELES_CONFIG).forEach(config => {
    config.zonas.forEach(zona => {
      zona.innerHTML = '';
      zona.classList.remove('highlight', 'invalid', 'filled');
      zona.style.display = 'none';
    });
  });
}

// ===== CONFIGURAR ZONAS DEL NIVEL =====
function configurarZonasNivel() {
  const config = NIVELES_CONFIG[nivelActual];
  if (!config) return;
  
  // Mostrar zonas del nivel actual
  config.zonas.forEach(zona => {
    zona.style.display = 'block';
  });
  
  // Configurar eventos de drop
  config.prendas.forEach(prenda => {
    configurarZonaDrop(prenda.zona, prenda.tipo);
  });
}

// ===== CARGAR MUÑECO =====
function cargarMuneco() {
  const rutasMuneco = [
    `recursos/imagenes/${generoJugador}/muneco.png`,
    `recursos/imagenes/${generoJugador}/muñeco.png`,
    `recursos/imagenes/nino/muneco.png`,
    `recursos/imagenes/nino/muñeco.png`
  ];
  
  let intentoActual = 0;
  
  function intentarCargar() {
    if (intentoActual >= rutasMuneco.length) {
      console.error('No se pudo cargar el muñeco');
      muneco.style.display = 'none';
      return;
    }
    
    muneco.src = rutasMuneco[intentoActual];
    intentoActual++;
  }
  
  muneco.onerror = intentarCargar;
  muneco.onload = () => {
    muneco.style.display = 'block';
  };
  
  intentarCargar();
}

// ===== CARGAR PRENDAS =====
function cargarPrendas() {
  const config = NIVELES_CONFIG[nivelActual];
  if (!config) return;
  
  const prendasAMostrar = [];
  
  // Seleccionar prendas según el nivel
  config.prendas.forEach(prenda => {
    const variante = Math.floor(Math.random() * prenda.variantes) + 1;
    prendasAMostrar.push({
      tipo: prenda.tipo,
      ruta: `recursos/imagenes/${generoJugador}/${prenda.tipo}${variante}.png`,
      zona: prenda.zona
    });
  });
  
  // Mezclar prendas
  prendasAMostrar.sort(() => Math.random() - 0.5);
  
  // Actualizar total
  prendasTotalCount = prendasAMostrar.length;
  prendasTotal.textContent = prendasTotalCount;
  
  // Crear elementos de prendas
  prendasAMostrar.forEach((prenda, index) => {
    const wrapper = crearPrendaElement(prenda, index);
    prendasDiv.appendChild(wrapper);
  });
}

// ===== CREAR ELEMENTO DE PRENDA =====
function crearPrendaElement(prenda, index) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('prenda-wrapper');
  wrapper.dataset.tipo = prenda.tipo;
  wrapper.id = `prenda-${nivelActual}-${index}`;
  wrapper.draggable = true;
  
  const img = document.createElement('img');
  img.src = prenda.ruta;
  img.alt = prenda.tipo;
  img.draggable = false;
  
  // Manejo de errores de carga
  img.onerror = () => {
    const altSrc = img.src.replace(`/${generoJugador}/`, '/nino/');
    if (!img.src.includes('/nino/')) {
      img.src = altSrc;
    } else {
      wrapper.style.display = 'none';
    }
  };
  
  const label = document.createElement('span');
  label.classList.add('prenda-label');
  label.textContent = prenda.tipo.charAt(0).toUpperCase() + prenda.tipo.slice(1);
  
  // Eventos de arrastre
  wrapper.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', wrapper.id);
    wrapper.classList.add('dragging');
    resaltarZonasValidas(prenda.tipo);
  });
  
  wrapper.addEventListener('dragend', () => {
    wrapper.classList.remove('dragging');
    quitarResaltado();
  });
  
  wrapper.appendChild(img);
  wrapper.appendChild(label);
  
  return wrapper;
}

// ===== RESALTAR ZONAS VÁLIDAS =====
function resaltarZonasValidas(tipo) {
  const config = NIVELES_CONFIG[nivelActual];
  config.prendas.forEach(prenda => {
    if (prenda.tipo === tipo) {
      prenda.zona.classList.add('highlight');
    }
  });
}

// ===== QUITAR RESALTADO =====
function quitarResaltado() {
  const config = NIVELES_CONFIG[nivelActual];
  config.zonas.forEach(zona => {
    zona.classList.remove('highlight', 'invalid');
  });
}

// ===== CONFIGURAR ZONA DE DROP =====
function configurarZonaDrop(zona, tipoEsperado) {
  zona.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  zona.addEventListener('drop', (e) => {
    e.preventDefault();
    
    const id = e.dataTransfer.getData('text/plain');
    const prenda = document.getElementById(id);
    
    if (!prenda) return;
    
    const tipoPrenda = prenda.dataset.tipo;
    
    if (tipoPrenda === tipoEsperado && !zona.classList.contains('filled')) {
      colocarPrenda(prenda, zona);
    } else {
      mostrarError(zona);
    }
  });
}

// ===== COLOCAR PRENDA =====
function colocarPrenda(prenda, zona) {
  // Remover del inventario
  prenda.remove();
  
  // Marcar zona como llena
  zona.classList.add('filled');
  zona.classList.remove('highlight');
  
  // Crear imagen en la zona
  const img = prenda.querySelector('img').cloneNode();
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  zona.appendChild(img);
  
  // Incrementar contador
  prendasColocadasCount++;
  actualizarProgreso();
  
  // Verificar si completó el nivel
  if (prendasColocadasCount === prendasTotalCount) {
    setTimeout(() => {
      nivelCompletado();
    }, 500);
  }
}

// ===== MOSTRAR ERROR =====
function mostrarError(zona) {
  zona.classList.add('invalid');
  setTimeout(() => {
    zona.classList.remove('invalid');
  }, 400);
}

// ===== ACTUALIZAR PROGRESO =====
function actualizarProgreso() {
  prendasColocadas.textContent = prendasColocadasCount;
  const porcentaje = (prendasColocadasCount / prendasTotalCount) * 100;
  progressFill.style.width = porcentaje + '%';
}

// ===== NIVEL COMPLETADO =====
function nivelCompletado() {
  marcarNivelCompletado(nivelActual - 1);
  
  const mensajes = [
    `¡Felicidades ${nombreJugador}! Has completado el nivel ${nivelActual} 🎉`,
    `¡Excelente trabajo! Nivel ${nivelActual} superado 🌟`,
    `¡Increíble! Dominaste el nivel ${nivelActual} 🏆`
  ];
  
  const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
  mensajeFelicitacion.textContent = mensajeAleatorio;
  
  modalFelicitaciones.style.display = 'flex';
  btnSiguienteNivel.disabled = false;
}

// ===== REINICIAR NIVEL =====
function reiniciarNivel() {
  actualizarPantalla();
}

// ===== SIGUIENTE NIVEL =====
function siguienteNivel() {
  if (nivelActual < Object.keys(NIVELES_CONFIG).length) {
    nivelActual++;
    setNivelActual(nivelActual);
    actualizarPantalla();
    btnSiguienteNivel.disabled = true;
  } else {
    alert(`¡Felicidades ${nombreJugador}! Has completado todos los niveles 🎊`);
    window.location.href = "menu.html";
  }
}

// ===== CONFIGURAR EVENTOS =====
function configurarEventos() {
  btnMenu.addEventListener('click', () => {
    const confirmar = confirm('¿Quieres volver al menú? Se perderá el progreso actual.');
    if (confirmar) {
      window.location.href = "menu.html";
    }
  });
  
  btnReiniciar.addEventListener('click', reiniciarNivel);
  
  btnSiguienteNivel.addEventListener('click', siguienteNivel);
  
  btnContinuar.addEventListener('click', () => {
    modalFelicitaciones.style.display = 'none';
  });
}

// ===== INICIAR =====
inicializarJuego();