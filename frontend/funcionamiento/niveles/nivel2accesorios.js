const nivel2 = {
  nombre: "Accesorios",
  zonas: {
    gorra: document.getElementById('zonaGorra'),
    reloj: document.getElementById('zonaReloj'),
    lentes: document.getElementById('zonaLentes'),
    mochila: document.getElementById('zonaMochila')
  },
  prendas: [
    `recursos/imagenes/${generoJugador}/accesorios/gorra1.png`,
    `recursos/imagenes/${generoJugador}/accesorios/gorra2.png`,
    `recursos/imagenes/${generoJugador}/accesorios/reloj1.png`,
    `recursos/imagenes/${generoJugador}/accesorios/reloj2.png`,
    `recursos/imagenes/${generoJugador}/accesorios/lentes1.png`,
    `recursos/imagenes/${generoJugador}/accesorios/mochila1.png`
  ]
};

// Wrapper de zona-drop para nivel 2
const zonasNivel2 = Object.values(nivel2.zonas);

// Función para cargar accesorios (similar a cargarPrendas de nivel1)
function cargarAccesorios() {
  prendasDiv.innerHTML = "";

  nivel2.prendas.forEach((ruta, index) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('prenda-wrapper');

    const img = document.createElement('img');
    img.src = ruta;
    img.id = `prenda-2-${index}`;
    img.classList.add('prenda');
    img.draggable = true;

    // Inferir tipo (gorra/reloj/lentes/mochila)
    let tipo = 'accesorio';
    if (ruta.includes('gorra')) tipo = 'gorra';
    else if (ruta.includes('reloj')) tipo = 'reloj';
    else if (ruta.includes('lentes')) tipo = 'lentes';
    else if (ruta.includes('mochila')) tipo = 'mochila';
    wrapper.dataset.tipo = tipo;

    // Drag & drop
    img.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text', img.id);
      zonasNivel2.forEach(z => {
        if (z === nivel2.zonas[tipo]) z.classList.add('highlight');
      });
      img.classList.add('dragging');
    });
    img.addEventListener('dragend', () => {
      zonasNivel2.forEach(z => z.classList.remove('highlight', 'invalid'));
      img.classList.remove('dragging');
    });

    wrapper.appendChild(img);
    prendasDiv.appendChild(wrapper);
  });
}

// Configurar zonas de drop nivel 2
zonasNivel2.forEach(zona => {
  zona.addEventListener('dragover', e => e.preventDefault());

  zona.addEventListener('drop', e => {
    e.preventDefault();
    const idPrenda = e.dataTransfer.getData('text');
    const elemento = document.getElementById(idPrenda);
    let wrapper = elemento.closest('.prenda-wrapper') || elemento;

    const tipoEsperado = Object.keys(nivel2.zonas).find(key => nivel2.zonas[key] === zona);
    const tipoPrenda = wrapper.dataset.tipo;

    if (tipoPrenda === tipoEsperado) {
      muñeco.appendChild(wrapper);
      wrapper.style.position = 'absolute';
      wrapper.style.left = zona.offsetLeft + 'px';
      wrapper.style.top = zona.offsetTop + 'px';
      wrapper.style.width = zona.clientWidth + 'px';
      wrapper.style.height = zona.clientHeight + 'px';

      wrapper.querySelector('img').draggable = false;
      wrapper.classList.add('placed');

      alert(`¡Has colocado correctamente el accesorio! 🎉`);
      marcarNivelCompletado(1); // Nivel 2 → índice 1
    } else {
      zona.classList.add('invalid');
      setTimeout(() => zona.classList.remove('invalid'), 600);
    }
  });
});

// Llamar a esta función cuando nivelActual === 2
if (nivelActual === 2) {
  cargarAccesorios();
}
