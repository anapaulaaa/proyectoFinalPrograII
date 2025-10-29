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
// Buscar el elemento del muñeco aceptando id con o sin tilde. Si no existe, crearlo como fallback.
let muneco = document.getElementById('muneco') || document.getElementById('muñeco');
if (!muneco) {
  const wrapperEl = document.querySelector('.muneco-wrapper');
  // crear un elemento img simple para asegurar que siempre haya un elemento donde cargar la imagen
  muneco = document.createElement('img');
  muneco.id = 'muneco';
  muneco.alt = 'Personaje';
  muneco.className = 'muneco-img';
  // usar el recurso por defecto (nino) como fallback inmediato
  muneco.src = `recursos/imagenes/nino/muneco.png`;
  if (wrapperEl) wrapperEl.appendChild(muneco);
}
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

// Zonas de drop (se actualizan después de limpiar)
let zonaCamisa = document.getElementById('zonaCamisa');
let zonaPantalon = document.getElementById('zonaPantalon');
let zonaZapatos = document.getElementById('zonaZapatos');
let zonaGorra = document.getElementById('zonaGorra');
let zonaReloj = document.getElementById('zonaReloj');
let zonaLentes = document.getElementById('zonaLentes');
let zonaMochila = document.getElementById('zonaMochila');

// ===== CONFIGURACIÓN DE NIVELES =====
const NIVELES_CONFIG = {
  1: {
    nombre: 'Ropa Básica',
    prendas: [
      { tipo: 'camisa', variantes: 2 },
      { tipo: 'pantalon', variantes: 2 },
      { tipo: 'zapatos', variantes: 2 }
    ],
    zonas: ['zonaCamisa', 'zonaPantalon', 'zonaZapatos']
  },
  2: {
    nombre: 'Accesorios',
    prendas: [
      { tipo: 'gorra', variantes: 2 },
      { tipo: 'reloj', variantes: 2 },
      { tipo: 'lentes', variantes: 2 },
      { tipo: 'mochila', variantes: 1 }
    ],
    zonas: ['zonaGorra', 'zonaReloj', 'zonaLentes', 'zonaMochila']
  },
  3: {
    nombre: 'Situaciones Especiales',
    especial: true // Indica que usa lógica especial
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

  // Cargar script del nivel 3 si es necesario
  if (nivelActual === 3 && !window.inicializarNivel3) {
    const script = document.createElement('script');
    script.src = 'funcionamiento/niveles/nivel3situaciones.js';
    script.onload = () => {
      actualizarPantalla();
    };
    document.body.appendChild(script);
  } else {
    actualizarPantalla();
  }
  
  configurarEventos();
}

// ===== ACTUALIZAR PANTALLA =====
function actualizarPantalla() {
  bienvenida.textContent = `¡Hola, ${nombreJugador}! 🌊`;
  nivelHTML.textContent = nivelActual;
  
  const config = NIVELES_CONFIG[nivelActual];
  if (!config) {
    alert('¡Felicidades! Has completado todos los niveles 🎊');
    window.location.href = 'menu.html';
    return;
  }
  
  nivelNombre.textContent = config.nombre;
  
  // Si es nivel especial (3), usar su propia lógica
  if (config.especial && window.inicializarNivel3) {
    window.inicializarNivel3();
    // Ocultar elementos no necesarios para nivel 3
    const prendasSection = document.querySelector('.prendas-section');
    if (prendasSection) prendasSection.style.display = 'none';
    return;
  } else {
    // Mostrar elementos para niveles 1 y 2
    const prendasSection = document.querySelector('.prendas-section');
    if (prendasSection) prendasSection.style.display = 'flex';
  }
  
  // Para niveles 1 y 2
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
  
  // Limpiar todas las zonas existentes
  const todasLasZonas = document.querySelectorAll('.zona-drop');
  todasLasZonas.forEach(zona => {
    zona.innerHTML = '';
    zona.classList.remove('highlight', 'invalid', 'filled');
    zona.style.display = 'none';
  });
  
  // Actualizar referencias a las zonas
  actualizarReferenciasZonas();
  
  // Asegurar que el muñeco esté visible
  muneco = document.getElementById('muneco');
  if (muneco) {
    muneco.style.display = 'block';
    muneco.style.opacity = '1';
  }
}

// ===== ACTUALIZAR REFERENCIAS A ZONAS =====
function actualizarReferenciasZonas() {
  zonaCamisa = document.getElementById('zonaCamisa');
  zonaPantalon = document.getElementById('zonaPantalon');
  zonaZapatos = document.getElementById('zonaZapatos');
  zonaGorra = document.getElementById('zonaGorra');
  zonaReloj = document.getElementById('zonaReloj');
  zonaLentes = document.getElementById('zonaLentes');
  zonaMochila = document.getElementById('zonaMochila');
}

// ===== OBTENER ZONA POR NOMBRE =====
function obtenerZona(nombreZona) {
  const zonas = {
    'zonaCamisa': zonaCamisa,
    'zonaPantalon': zonaPantalon,
    'zonaZapatos': zonaZapatos,
    'zonaGorra': zonaGorra,
    'zonaReloj': zonaReloj,
    'zonaLentes': zonaLentes,
    'zonaMochila': zonaMochila
  };
  return zonas[nombreZona];
}

// ===== CONFIGURAR ZONAS DEL NIVEL =====
function configurarZonasNivel() {
  const config = NIVELES_CONFIG[nivelActual];
  if (!config || config.especial) return;
  
  // Mostrar zonas del nivel actual
  config.zonas.forEach(nombreZona => {
    const zona = obtenerZona(nombreZona);
    if (zona) {
      zona.style.display = 'block';
      // Configurar eventos de drop
      const tipoPrenda = nombreZona.replace('zona', '').toLowerCase();
      configurarZonaDrop(zona, tipoPrenda);
    }
  });

  // También permitir drop directamente sobre el contenedor del muñeco
  configurarDropSobreMunecoWrapper();
}

// ===== PERMITIR DROP SOBRE EL WRAPPER DEL MUÑECO =====
function configurarDropSobreMunecoWrapper() {
  const wrapper = document.querySelector('.muneco-wrapper');
  if (!wrapper) return;

  // Evitar duplicar listeners
  if (wrapper.__dropConfigured) return;
  wrapper.__dropConfigured = true;

  wrapper.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  wrapper.addEventListener('drop', (e) => {
    e.preventDefault();
    // Si el drop ocurrió directamente sobre una zona, dejar que el handler de la zona lo procese
    const elementoDestino = document.elementFromPoint(e.clientX, e.clientY);
    const zonaDirecta = elementoDestino?.closest('.zona-drop');
    if (zonaDirecta) return; // zona ya maneja el drop

    // Obtener id de la prenda arrastrada
    const id = e.dataTransfer.getData('text/plain');
    const prenda = document.getElementById(id);
    if (!prenda) return;

    // Buscar la zona cuyo rect contenga el punto del cursor
    const zonas = Array.from(wrapper.querySelectorAll('.zona-drop')).filter(z => z.style.display !== 'none');
    const x = e.clientX;
    const y = e.clientY;
    let zonaEncontrada = null;
    for (const z of zonas) {
      const r = z.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        zonaEncontrada = z;
        break;
      }
    }

    if (!zonaEncontrada) {
      // Si no se encontró zona exactamente bajo el cursor, seleccionar la zona más cercana al punto
      let minDist = Infinity;
      for (const z of zonas) {
        const r = z.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(cx - x, cy - y);
        if (dist < minDist) {
          minDist = dist;
          zonaEncontrada = z;
        }
      }
    }

    if (!zonaEncontrada) return;

    const tipoPrenda = prenda.dataset.tipo;
    const zonaTipo = zonaEncontrada.dataset.tipo;

    if (tipoPrenda === zonaTipo && !zonaEncontrada.classList.contains('filled')) {
      colocarPrenda(prenda, zonaEncontrada);
    } else {
      mostrarError(zonaEncontrada);
    }
  });
}

// ===== CARGAR MUÑECO =====
function cargarMuneco() {
  const munecoEl = muneco || document.getElementById('muneco') || document.getElementById('muñeco');
  if (!munecoEl) {
    console.error('❌ Elemento muneco no encontrado en el DOM y no se pudo crear fallback');
    return;
  }

  // Mostrar el elemento inmediatamente
  munecoEl.style.display = 'block';
  munecoEl.style.opacity = '0.5'; // Semi-transparente mientras carga
  
  console.log(`🎭 Cargando muñeco para género: ${generoJugador}`);
  
  const rutasMuneco = [
    `recursos/imagenes/${generoJugador}/muneco.png`,
    `recursos/imagenes/${generoJugador}/muñeco.png`,
    `recursos/imagenes/nino/muneco.png`,
    `recursos/imagenes/nino/muñeco.png`
  ];
  
  let intentoActual = 0;
  
  function intentarCargar() {
    if (intentoActual >= rutasMuneco.length) {
      console.error('❌ No se pudo cargar el muñeco desde ninguna ruta');
      console.log('Rutas intentadas:', rutasMuneco);
      
      // Mostrar placeholder visual
      munecoEl.alt = '👤 Personaje';
      munecoEl.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
      munecoEl.style.border = '3px dashed rgba(255,255,255,0.4)';
      munecoEl.style.minHeight = '400px';
      munecoEl.style.minWidth = '300px';
      munecoEl.style.borderRadius = '20px';
      munecoEl.style.opacity = '1';
      
      // Agregar texto de placeholder
      const placeholder = document.createElement('div');
      placeholder.style.position = 'absolute';
      placeholder.style.top = '50%';
      placeholder.style.left = '50%';
      placeholder.style.transform = 'translate(-50%, -50%)';
      placeholder.style.fontSize = '5rem';
      placeholder.textContent = generoJugador === 'nina' ? '👧' : '👦';
      munecoEl.parentElement.appendChild(placeholder);
      
      return;
    }
    
    console.log(`🔄 Intento ${intentoActual + 1}: ${rutasMuneco[intentoActual]}`);
    munecoEl.src = rutasMuneco[intentoActual];
    intentoActual++;
  }
  
  munecoEl.onerror = () => {
    console.warn(`⚠️ Error al cargar: ${munecoEl.src}`);
    intentarCargar();
  };
  
  munecoEl.onload = () => {
    console.log(`✅ Muñeco cargado exitosamente: ${munecoEl.src}`);
    munecoEl.style.display = 'block';
    munecoEl.style.opacity = '1';
    munecoEl.style.background = 'none';
    munecoEl.style.border = 'none';
    // Asegurar que la imagen sea visible y tenga tamaño razonable
    try {
      munecoEl.style.visibility = 'visible';
      munecoEl.style.position = 'relative';
  // keep the muñeco behind placed prendas (use low z-index)
  munecoEl.style.zIndex = '1';
      munecoEl.style.maxWidth = '100%';
      munecoEl.style.height = 'auto';
      munecoEl.style.objectFit = 'contain';

      // Ajustar según tamaño natural y el contenedor
      const wrapper = munecoEl.parentElement;
      if (wrapper) {
        wrapper.style.position = wrapper.style.position || 'relative';
        wrapper.style.overflow = 'visible';
        wrapper.style.zIndex = wrapper.style.zIndex || '900';
        // Si la imagen es más ancha que el contenedor, usar 100% del contenedor
        if (munecoEl.naturalWidth && wrapper.clientWidth && munecoEl.naturalWidth > wrapper.clientWidth) {
          munecoEl.style.width = '100%';
        } else if (munecoEl.naturalWidth) {
          // usar tamaño natural si cabe
          munecoEl.style.width = munecoEl.naturalWidth + 'px';
        }
      }

      // Log de estilos computados para ayudar a depurar si el elemento sigue sin verse
      const cs = window.getComputedStyle ? getComputedStyle(munecoEl) : null;
      console.log('🔎 computed styles muñeco:', {
        display: cs ? cs.display : munecoEl.style.display,
        visibility: cs ? cs.visibility : munecoEl.style.visibility,
        opacity: cs ? cs.opacity : munecoEl.style.opacity,
        width: cs ? cs.width : munecoEl.style.width,
        height: cs ? cs.height : munecoEl.style.height,
        zIndex: cs ? cs.zIndex : munecoEl.style.zIndex
      });
    } catch (err) {
      console.warn('⚠️ Error aplicando estilos de visibilidad al muñeco', err);
    }
      // Update debug UI
      let dbg = document.getElementById('munecoDebug');
      if (!dbg) {
        dbg = document.createElement('div');
        dbg.id = 'munecoDebug';
        dbg.style.position = 'absolute';
        dbg.style.bottom = '8px';
        dbg.style.left = '8px';
        dbg.style.padding = '6px 8px';
        dbg.style.background = 'rgba(0,0,0,0.6)';
        dbg.style.color = '#fff';
        dbg.style.fontSize = '12px';
        dbg.style.borderRadius = '6px';
        dbg.style.zIndex = '9999';
        if (munecoEl.parentElement) munecoEl.parentElement.appendChild(dbg);
      }
      dbg.textContent = `muneco src: ${munecoEl.src} (loaded)`;
  };
  
  // Iniciar carga
  intentarCargar();

    // Small extra check: after a short delay, if image not visible, print debug info
    setTimeout(() => {
      const dbg = document.getElementById('munecoDebug');
      if (dbg) return; // already updated on load
      const currentSrc = munecoEl ? munecoEl.src : '(no element)';
      console.warn('🔍 Depuración: muneco no ha reportado carga. src=', currentSrc);
      // create debug box so user sees the path tried
      const wrapper = munecoEl && munecoEl.parentElement ? munecoEl.parentElement : document.querySelector('.muneco-wrapper');
      if (wrapper) {
        const info = document.createElement('div');
        info.id = 'munecoDebug';
        info.style.position = 'absolute';
        info.style.bottom = '8px';
        info.style.left = '8px';
        info.style.padding = '6px 8px';
        info.style.background = 'rgba(255,0,0,0.7)';
        info.style.color = '#fff';
        info.style.fontSize = '12px';
        info.style.borderRadius = '6px';
        info.style.zIndex = '9999';
        info.textContent = `muneco src: ${currentSrc} (no load event)`;
        wrapper.appendChild(info);
      }
    }, 900);
}

// ===== CARGAR PRENDAS =====
function cargarPrendas() {
  const config = NIVELES_CONFIG[nivelActual];
  if (!config || config.especial) return;
  
  const prendasAMostrar = [];
  
  // Seleccionar prendas según el nivel
  config.prendas.forEach(prenda => {
    const variante = Math.floor(Math.random() * prenda.variantes) + 1;
    prendasAMostrar.push({
      tipo: prenda.tipo,
      ruta: `recursos/imagenes/${generoJugador}/${prenda.tipo}${variante}.png`
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
      console.warn(`No se pudo cargar la prenda: ${prenda.tipo}`);
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
  
  // Soporte táctil (móviles)
  let touchStartX, touchStartY;
  
  wrapper.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    wrapper.classList.add('dragging');
    resaltarZonasValidas(prenda.tipo);
  });
  
  wrapper.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    wrapper.style.position = 'fixed';
    wrapper.style.left = touch.clientX - 50 + 'px';
    wrapper.style.top = touch.clientY - 50 + 'px';
    wrapper.style.zIndex = '1000';
  });
  
  wrapper.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const elemento = document.elementFromPoint(touch.clientX, touch.clientY);
    const zona = elemento?.closest('.zona-drop');
    
    if (zona && zona.dataset.tipo === prenda.tipo && !zona.classList.contains('filled')) {
      colocarPrenda(wrapper, zona);
    } else if (zona) {
      mostrarError(zona);
    }
    
    wrapper.style.position = '';
    wrapper.style.left = '';
    wrapper.style.top = '';
    wrapper.style.zIndex = '';
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
  if (!config || config.especial) return;
  
  const nombreZona = 'zona' + tipo.charAt(0).toUpperCase() + tipo.slice(1);
  const zona = obtenerZona(nombreZona);
  
  if (zona && !zona.classList.contains('filled')) {
    zona.classList.add('highlight');
  }
}

// ===== QUITAR RESALTADO =====
function quitarResaltado() {
  const todasLasZonas = document.querySelectorAll('.zona-drop');
  todasLasZonas.forEach(zona => {
    zona.classList.remove('highlight', 'invalid');
  });
}

// ===== CONFIGURAR ZONA DE DROP =====
function configurarZonaDrop(zona, tipoEsperado) {
  if (!zona) return;
  
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
  // Crear efecto de éxito
  crearEfectoEstrellas(zona);
  
  // Remover del inventario
  prenda.remove();
  
  // Marcar zona como llena
  zona.classList.add('filled');
  zona.classList.remove('highlight');
  
  // Crear imagen en la zona
  const img = prenda.querySelector('img').cloneNode();
  // Asegurar que la prenda quede por encima del muñeco
  img.style.position = 'absolute';
  img.style.left = '0';
  img.style.top = '0';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'contain';
  img.style.zIndex = '2000';
  img.style.pointerEvents = 'none';

  // Asegurar que la zona y su wrapper permitan que la prenda se muestre por encima
  try {
    zona.style.overflow = 'visible';
    const wrapper = zona.closest('.muneco-wrapper');
    if (wrapper) wrapper.style.overflow = 'visible';
  } catch (e) {
    // ignore
  }

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

// ===== EFECTO VISUAL =====
function crearEfectoEstrellas(zona) {
  for (let i = 0; i < 5; i++) {
    const estrella = document.createElement('div');
    estrella.textContent = '⭐';
    estrella.style.position = 'fixed';
    estrella.style.left = zona.getBoundingClientRect().left + zona.offsetWidth / 2 + 'px';
    estrella.style.top = zona.getBoundingClientRect().top + zona.offsetHeight / 2 + 'px';
    estrella.style.fontSize = '2rem';
    estrella.style.zIndex = '9999';
    estrella.style.pointerEvents = 'none';
    estrella.style.animation = `estrellaVolar ${0.8 + i * 0.1}s ease-out forwards`;
    
    document.body.appendChild(estrella);
    
    setTimeout(() => estrella.remove(), 1000);
  }
}

// Añadir animación de estrellas
if (!document.getElementById('estrellas-style')) {
  const styleEfectos = document.createElement('style');
  styleEfectos.id = 'estrellas-style';
  styleEfectos.textContent = `
    @keyframes estrellaVolar {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(${Math.random() * 200 - 100}px, ${-100 - Math.random() * 100}px) scale(0.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleEfectos);
}

// ===== MOSTRAR ERROR =====
function mostrarError(zona) {
  zona.classList.add('invalid');
  
  // Vibrar si el dispositivo lo soporta
  if (navigator.vibrate) {
    navigator.vibrate(200);
  }
  
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
    `¡Increíble! Dominaste el nivel ${nivelActual} 🏆`,
    `¡Eres un campeón! Nivel ${nivelActual} completado 🎊`
  ];
  
  const mensajeAleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
  mensajeFelicitacion.textContent = mensajeAleatorio;
  
  modalFelicitaciones.style.display = 'flex';
  btnSiguienteNivel.disabled = false;
}

// ===== REINICIAR NIVEL =====
function reiniciarNivel() {
  if (nivelActual === 3 && window.reiniciarNivel3) {
    window.reiniciarNivel3();
  } else {
    actualizarPantalla();
  }
}

// ===== SIGUIENTE NIVEL =====
function siguienteNivel() {
  if (nivelActual < Object.keys(NIVELES_CONFIG).length) {
    nivelActual++;
    setNivelActual(nivelActual);
    modalFelicitaciones.style.display = 'none';
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
  
  // Cerrar modal al hacer clic fuera
  modalFelicitaciones.addEventListener('click', (e) => {
    if (e.target === modalFelicitaciones) {
      modalFelicitaciones.style.display = 'none';
    }
  });
}

// ===== INICIAR =====
inicializarJuego();

console.log('🎮 Aventuropa - Sistema de niveles cargado correctamente');
console.log(`📊 Género del jugador: ${generoJugador}`);