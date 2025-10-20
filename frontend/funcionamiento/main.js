// Archivo: funcionamiento/main.js
// `niveles.js` ahora expone `marcarNivelCompletado` y `puedeAvanzar` en window

// Obtener datos del jugador
const nombreJugador = localStorage.getItem('nombreJugador') || "Niño";
// Normalizamos el género para evitar acentos y mayúsculas
const generoJugadorRaw = localStorage.getItem('generoJugador') || "nino";
const generoJugador = generoJugadorRaw
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase();

let nivelActual = parseInt(localStorage.getItem('nivelActual')) || 1;

// Elementos DOM
const bienvenida = document.getElementById('bienvenida');
const nivelHTML = document.getElementById('nivel');
const muñeco = document.getElementById('muñeco');
const prendasDiv = document.getElementById('prendas');

const zonaCamisa = document.getElementById('zonaCamisa');
const zonaPantalon = document.getElementById('zonaPantalon');
const zonaZapatos = document.getElementById('zonaZapatos');
const zonas = [zonaCamisa, zonaPantalon, zonaZapatos];

const siguienteNivelBtn = document.getElementById('siguienteNivelBtn');

// ======================
// Ajustes de prenda (hoisted)
// Mapping de ajustes por nombre de archivo: { 'camisa1.png': { dx: 0, dy: 0, scale: 1.0 } }
const ajustesKey = 'ajustesPrendas';
let ajustesPrendas = JSON.parse(localStorage.getItem(ajustesKey) || '{}');

function guardarAjuste(nombreArchivo, ajuste) {
  ajustesPrendas[nombreArchivo] = ajuste;
  localStorage.setItem(ajustesKey, JSON.stringify(ajustesPrendas));
}

function obtenerAjuste(nombreArchivo) {
  return ajustesPrendas[nombreArchivo] || { dx: 0, dy: 0, scale: 1 };
}

function aplicarAjustesAlWrapper(wrapper, nombreArchivo) {
  const ajuste = obtenerAjuste(nombreArchivo);
  wrapper.style.transform = `translate(${ajuste.dx}px, ${ajuste.dy}px) scale(${ajuste.scale})`;
}

// Definir niveles con prendas
const niveles = [
  {
    nombre: "Camisa",
    zona: zonaCamisa,
    prendas: [
      `recursos/imagenes/${generoJugador}/camisa1.png`,
      `recursos/imagenes/${generoJugador}/camisa2.png`
    ]
  },
  {
    nombre: "Pantalón",
    zona: zonaPantalon,
    prendas: [
      `recursos/imagenes/${generoJugador}/pantalon1.png`,
      `recursos/imagenes/${generoJugador}/pantalon2.png`
    ]
  },
  {
    nombre: "Zapatos",
    zona: zonaZapatos,
    prendas: [
      `recursos/imagenes/${generoJugador}/zapatos1.png`,
      `recursos/imagenes/${generoJugador}/zapatos2.png`
    ]
  }
];

// ======================
// Mostrar pantalla inicial
// ======================
function actualizarPantalla() {
  bienvenida.textContent = `¡Hola, ${nombreJugador}! 🌊`;
  nivelHTML.textContent = nivelActual;
  // limpiar cualquier prenda colocada anteriormente antes de cargar el nuevo nivel
  limpiarZonas();
  cargarPrendas();
  actualizarMuñeco();
  comprobarCarpetaGenero();
}

// Elimina las prendas colocadas en las zonas (usado al cambiar de nivel)
function limpiarZonas() {
  zonas.forEach(z => {
    // vaciar la zona
    z.innerHTML = '';
    z.classList.remove('highlight', 'invalid', 'placed');
    // eliminar estilos inline aplicados al tamaño
    z.style.width = '';
    z.style.height = '';
  });
  // Además, eliminar cualquier prenda que haya sido colocada dentro del contenedor del muñeco
  const muñecoWrapper = document.querySelector('.muñeco-wrapper');
  if (muñecoWrapper) {
    const colocadas = muñecoWrapper.querySelectorAll('.prenda-wrapper');
    colocadas.forEach(c => c.remove());
  }
}

// Comprobar si la carpeta de género tiene assets
function comprobarCarpetaGenero() {
  const prueba = `recursos/imagenes/${generoJugador}/camisa1.png`;
  const probe = new Image();
  probe.onload = () => { /* existe */ };
  probe.onerror = () => {
    console.warn(`Advertencia: no se encontró assets para el género '${generoJugador}' en ${prueba}.`);
  };
  probe.src = prueba;
}

// ======================
// Cargar prendas según nivel
// ======================
function cargarPrendas() {
  prendasDiv.innerHTML = "";

  if (nivelActual === 1) {
    // Nivel 1: solo prendas terminadas en '1'
    const prendasAMostrar = niveles.map(n => n.prendas[0]);
    prendasAMostrar.sort(() => Math.random() - 0.5); // mezclar
    prendasAMostrar.forEach((ruta, i) => {
      const img = crearImagenPrenda(ruta, i);
      prendasDiv.appendChild(img);
    });

  } else if (nivelActual === 2) {
    // Nivel 2: solo prendas terminadas en '2'
    const prendasAMostrar = niveles.map(n => n.prendas[1]);
    prendasAMostrar.sort(() => Math.random() - 0.5);
    prendasAMostrar.forEach((ruta, i) => {
      const img = crearImagenPrenda(ruta, i);
      prendasDiv.appendChild(img);
    });

  } else {
    // Niveles posteriores: mostrar todas las prendas del nivel
    const nivel = niveles[nivelActual - 1];
    nivel.prendas.forEach((ruta, index) => {
      const img = crearImagenPrenda(ruta, index);
      prendasDiv.appendChild(img);
    });
  }
}

// ======================
// Crear imagen draggable
// ======================
function crearImagenPrenda(ruta, index) {
  // Crear wrapper para poder añadir label y centrar
  const wrapper = document.createElement('div');
  wrapper.classList.add('prenda-wrapper');

  const img = document.createElement('img');
  img.src = ruta;
  img.id = `prenda-${nivelActual}-${index}`;
  img.classList.add('prenda');
  img.draggable = true;

  // Manejo de errores de carga
  img.onerror = () => {
    const src = img.src;
    // 1) Intentar carpeta 'nino'
    const altGenderSrc = src.replace(`/imagenes/${generoJugador}/`, `/imagenes/nino/`);
    if (!src.includes('/imagenes/nino/') && altGenderSrc !== src) {
      img.src = altGenderSrc;
      return;
    }
    // 2) cambiar '2' por '1'
    if (/2\.png$/.test(src)) {
      img.src = src.replace(/2\.png$/, '1.png');
      return;
    }
    // 3) intentar versión sin ñ
    if (src.includes('muñeco')) {
      img.src = src.replace('muñeco', 'muneco');
      return;
    }
    // 4) ocultar
    img.style.display = 'none';
  };

  // Inferir tipo (camisa/pantalon/zapatos) desde la ruta
  let tipo = 'prenda';
  if (ruta.includes('camisa')) tipo = 'camisa';
  else if (ruta.includes('pantalon')) tipo = 'pantalon';
  else if (ruta.includes('zapatos')) tipo = 'zapatos';

  wrapper.dataset.tipo = tipo;

  // Label opcional bajo la prenda
  const label = document.createElement('span');
  label.classList.add('prenda-label');
  label.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);

  // Drag handlers: marcar zonas válidas y setData
  img.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text', img.id);
    // Resaltar zonas válidas
    zonas.forEach(z => {
      if (z === zonaCamisa && tipo === 'camisa') z.classList.add('highlight');
      if (z === zonaPantalon && tipo === 'pantalon') z.classList.add('highlight');
      if (z === zonaZapatos && tipo === 'zapatos') z.classList.add('highlight');
    });
    img.classList.add('dragging');
  });

  img.addEventListener('dragend', () => {
    zonas.forEach(z => z.classList.remove('highlight', 'invalid'));
    img.classList.remove('dragging');
  });

  wrapper.appendChild(img);
  wrapper.appendChild(label);
  return wrapper;
  return img;
}

// ======================
// Configurar zonas de drop
// ======================
zonas.forEach(zona => {
  zona.addEventListener('dragover', e => {
    e.preventDefault();
  });

  zona.addEventListener('drop', e => {
    e.preventDefault();
    const idPrenda = e.dataTransfer.getData('text');
    const elemento = document.getElementById(idPrenda);
    // Si el elemento está dentro de un wrapper, obtener el wrapper
    let wrapper = elemento && elemento.closest ? elemento.closest('.prenda-wrapper') : null;
    if (!wrapper) wrapper = elemento; // fallback

    // Determinar tipo esperado por la zona
    const tipoEsperado = (zona === zonaCamisa) ? 'camisa' : (zona === zonaPantalon) ? 'pantalon' : 'zapatos';
    const tipoPrenda = wrapper ? wrapper.dataset.tipo : null;

  if (tipoPrenda === tipoEsperado) {
      // Posicionar la prenda sobre el muñeco y ajustarla al tamaño de la zona
      // para que encaje visualmente (mejora el ajuste sobre la imagen).
      const muñecoWrapper = muñeco.closest('.muñeco-wrapper') || document.querySelector('.muñeco-wrapper');
  if (muñecoWrapper) {
        // calcular posición relativa dentro del muñeco-wrapper usando offsets de la zona
        const zonaLeft = zona.offsetLeft;
        const zonaTop = zona.offsetTop;

        // escala por tipo para ajustar tamaño relativo (ajusta valores si es necesario)
        const scaleMap = { camisa: 1.6, pantalon: 1.2, zapatos: 1.0 };
        const scale = scaleMap[tipoPrenda] || 1.0;

        // mover el wrapper al contenedor del muñeco y posicionarlo absolutamente
        muñecoWrapper.appendChild(wrapper);
        wrapper.style.position = 'absolute';
        // Tamaño objetivo basado en la zona (anchura)
        // Mostrar la prenda con las dimensiones originales del archivo (naturalWidth/naturalHeight)
        const img = wrapper.querySelector('img');
        let naturalW = 0;
        let naturalH = 0;
        if (img && img.naturalWidth && img.naturalHeight) {
          naturalW = img.naturalWidth;
          naturalH = img.naturalHeight;
        } else if (img) {
          naturalW = img.width || 120;
          naturalH = img.height || Math.round(naturalW * 1.0);
        }

        // Usamos el tamaño natural tal cual para mostrar la imagen como fue guardada.
        const finalWidth = naturalW || zona.clientWidth;
        const finalHeight = naturalH || zona.clientHeight;

        wrapper.style.width = finalWidth + 'px';
        wrapper.style.height = finalHeight + 'px';

        // centrar la prenda en la zona (ajusta left/top para centrar según tamaño natural)
        const left = Math.round(zonaLeft - (finalWidth - zona.clientWidth) / 2);
        const top = Math.round(zonaTop - (finalHeight - zona.clientHeight) / 2);
        wrapper.style.left = left + 'px';
        wrapper.style.top = top + 'px';

        // Ajustar la caja de la zona visualmente para que refleje el tamaño esperado
        zona.style.width = finalWidth + 'px';
        zona.style.height = finalHeight + 'px';

        // Ajustar la imagen para llenar el wrapper, mantener proporción
        if (img) {
          img.style.width = '100%';
          img.style.height = '100%';
          img.draggable = false;
          img.style.cursor = 'default';
          // aplicar ajustes guardados (si existen)
          const file = img.getAttribute('src').split('/').pop();
          aplicarAjustesAlWrapper(wrapper, file);
        }
      } else {
        // Fallback: si no se encuentra el wrapper, anexar a la zona como antes
        zona.appendChild(wrapper);
        const img = wrapper.querySelector('img');
        if (img) { img.draggable = false; img.style.cursor = 'default'; }
      }
      zonas.forEach(z => z.classList.remove('highlight', 'invalid'));
        // marcar zona como ocupada para ocultar el contorno
        zona.classList.add('placed');
      alert("¡Has colocado correctamente la prenda! 🎉");
      marcarNivelCompletado(nivelActual - 1);
    } else {
      // indicar zona inválida temporalmente
      zona.classList.add('invalid');
      setTimeout(() => zona.classList.remove('invalid'), 600);
    }
  });
});

// Al cargar prendas en el inventario, hacemos que el contorno punteado muestre el tamaño esperado
function actualizarTamanoZonasSegunNivel() {
  // para cada zona, ajustar tamaño visual en función del nivel actual
  const indexToShow = nivelActual === 1 ? 0 : (nivelActual === 2 ? 1 : 0);
  niveles.forEach((n, idx) => {
    const ruta = n.prendas[indexToShow];
    if (!ruta) return;
    // inferir si existe un ajuste guardado y calcular ancho
    const file = ruta.split('/').pop();
    const ajuste = obtenerAjuste(file);
    const base = 60; // tamaño base de zona
    const ancho = Math.round(base * (ajuste.scale || 1));
    const zona = n.zona;
    zona.style.width = ancho + 'px';
    zona.style.height = Math.round(ancho * 0.8) + 'px';
  });
}

// Llamar a la actualización de zonas después de cargar prendas
const originalCargarPrendas = cargarPrendas;
cargarPrendas = function() {
  originalCargarPrendas();
  actualizarTamanoZonasSegunNivel();
};

// ======================
// Actualizar muñeco
// ======================
function actualizarMuñeco() {
  // Intentar varias rutas posibles para el muñeco (muneco/muñeco y en ambos géneros)
  const gendersToTry = [generoJugador, generoJugador === 'nino' ? 'nina' : 'nino'];
  const namesToTry = ['muneco.png', 'muñeco.png'];
  const candidates = [];
  gendersToTry.forEach(g => namesToTry.forEach(n => candidates.push(`recursos/imagenes/${g}/${n}`)));

  let attempt = 0;
  muñeco.style.display = ''; // asegurar visible antes de intentar
  function tryNext() {
    if (attempt >= candidates.length) {
      console.warn('No se pudo cargar imagen del muñeco. Rutas intentadas:', candidates);
      muñeco.style.display = 'none';
      return;
    }
    const url = candidates[attempt++];
    muñeco.src = url;
  }

  muñeco.onerror = () => {
    tryNext();
  };

  // si carga correctamente, aseguramos que esté visible
  muñeco.onload = () => {
    muñeco.style.display = '';
  };

  // iniciar intento
  tryNext();
}

// ======================
// Botón siguiente nivel
// ======================
siguienteNivelBtn.addEventListener('click', () => {
  if (nivelActual < niveles.length) {
    if (!puedeAvanzar(nivelActual - 1)) {
      alert("Debes completar el nivel actual antes de avanzar 👕");
      return;
    }
    nivelActual++;
    localStorage.setItem('nivelActual', nivelActual);
    actualizarPantalla();
  } else {
    alert(`¡Felicidades ${nombreJugador}! Has completado todos los niveles 🎉`);
  }
});

// ======================
// Inicializar juego
// ======================
actualizarPantalla();

// Crear botón editor en DOM
const editorBtn = document.createElement('button');
editorBtn.className = 'editor-btn';
editorBtn.textContent = 'Editar ajuste';
document.body.appendChild(editorBtn);

const editorHint = document.createElement('div');
editorHint.className = 'editor-hint';
editorHint.textContent = 'Modo edición: arrastra prendas y guarda';
editorHint.style.display = 'none';
document.body.appendChild(editorHint);

let editMode = false;
editorBtn.addEventListener('click', () => {
  editMode = !editMode;
  document.body.classList.toggle('editing', editMode);
  editorBtn.classList.toggle('active', editMode);
  editorHint.style.display = editMode ? 'block' : 'none';
});

// Hacemos que en modo edición arrastrar una prenda dentro del muñeco la reposicione y guarde
document.addEventListener('pointerdown', e => {
  if (!editMode) return;
  const el = e.target.closest('.prenda-wrapper');
  if (!el) return;
  let startX = e.clientX;
  let startY = e.clientY;
  const style = window.getComputedStyle(el);
  const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? '' : style.transform);
  let offsetX = matrix.m41 || 0;
  let offsetY = matrix.m42 || 0;

  function move(ev) {
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    el.style.transform = `translate(${offsetX + dx}px, ${offsetY + dy}px)`;
  }

  function up(ev) {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    // guardar ajuste (intentar inferir archivo desde la img src)
    const img = el.querySelector('img');
    if (img) {
      const src = img.getAttribute('src');
      const file = src.split('/').pop();
      const styleNow = window.getComputedStyle(el);
      const mat = new DOMMatrixReadOnly(styleNow.transform === 'none' ? '' : styleNow.transform);
      guardarAjuste(file, { dx: mat.m41 || 0, dy: mat.m42 || 0, scale: 1 });
      // feedback
      editorHint.textContent = `Guardado ajuste para ${file}: dx=${Math.round(mat.m41||0)}, dy=${Math.round(mat.m42||0)}`;
      setTimeout(() => editorHint.textContent = 'Modo edición: arrastra prendas y guarda', 2000);
    }
  }

  document.addEventListener('pointermove', move);
  document.addEventListener('pointerup', up);
});
