// ===== ELEMENTOS DOM =====
const btnMenu = document.getElementById('btnMenu');
const btnComenzar = document.getElementById('btnComenzar');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnAnterior = document.getElementById('btnAnterior');
const leccionActualSpan = document.getElementById('leccionActual');
const leccionTotalSpan = document.getElementById('leccionTotal');
const contenidoLeccion = document.getElementById('contenidoLeccion');

// Canvas para dibujar el reloj
const canvasReloj = document.getElementById('relojCanvas');
const ctx = canvasReloj ? canvasReloj.getContext('2d') : null;

// ===== ESTADO =====
let leccionActual = 0;

// ===== LECCIONES =====
const LECCIONES = [
  {
    titulo: "🕐 Bienvenido al Tutorial del Reloj",
    contenido: `
      <div class="leccion-intro">
        <h2>Aprende a Leer el Reloj</h2>
        <p class="intro-text">
          ¡Hola! Hoy aprenderás a leer la hora en un reloj análogo (de manecillas).
          Es muy fácil y divertido. ¡Vamos a empezar!
        </p>
        <div class="reloj-preview">
          <canvas id="relojDemo" width="300" height="300"></canvas>
        </div>
        <div class="info-box">
          <h3>¿Por qué es importante?</h3>
          <ul>
            <li>Para llegar a tiempo a la escuela</li>
            <li>Para saber cuándo es hora de comer</li>
            <li>Para organizar tu día</li>
            <li>Para ser puntual con tus amigos</li>
          </ul>
        </div>
      </div>
    `,
    reloj: { horas: 3, minutos: 0 }
  },
  {
    titulo: "🎯 Partes del Reloj",
    contenido: `
      <div class="leccion-partes">
        <h2>Conoce las Partes del Reloj</h2>
        <div class="partes-grid">
          <div class="parte-card">
            <div class="parte-icon">⚫</div>
            <h3>La Carátula</h3>
            <p>Es el círculo donde están los números del 1 al 12</p>
          </div>
          <div class="parte-card">
            <div class="parte-icon">➡️</div>
            <h3>Manecilla Corta</h3>
            <p>Es la más pequeña y nos dice las HORAS</p>
          </div>
          <div class="parte-card">
            <div class="parte-icon">⬆️</div>
            <h3>Manecilla Larga</h3>
            <p>Es la más grande y nos dice los MINUTOS</p>
          </div>
          <div class="parte-card">
            <div class="parte-icon">🔢</div>
            <h3>Los Números</h3>
            <p>Van del 1 al 12 alrededor del reloj</p>
          </div>
        </div>
        <div class="reloj-preview">
          <canvas id="relojPartes" width="300" height="300"></canvas>
        </div>
      </div>
    `,
    reloj: { horas: 3, minutos: 15 }
  },
  {
    titulo: "⏰ Horas en Punto",
    contenido: `
      <div class="leccion-horas">
        <h2>Leer las Horas en Punto</h2>
        <p class="intro-text">
          Cuando la manecilla larga está en el 12, significa que son las horas "en punto".
        </p>
        <div class="reloj-preview">
          <canvas id="relojHoras" width="300" height="300"></canvas>
        </div>
        <div class="ejemplos-grid">
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕐</div>
            <h4>1:00</h4>
            <p>La una en punto</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕒</div>
            <h4>3:00</h4>
            <p>Las tres en punto</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕕</div>
            <h4>6:00</h4>
            <p>Las seis en punto</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕘</div>
            <h4>9:00</h4>
            <p>Las nueve en punto</p>
          </div>
        </div>
        <div class="tip-box">
          <strong>💡 Truco:</strong>
          <p>Cuando veas la manecilla larga en el 12, solo mira dónde está la manecilla corta. ¡Ese número es la hora!</p>
        </div>
      </div>
    `,
    reloj: { horas: 6, minutos: 0 }
  },
  {
    titulo: "🕐 Media Hora (y media)",
    contenido: `
      <div class="leccion-media">
        <h2>Leer las Medias Horas</h2>
        <p class="intro-text">
          Cuando la manecilla larga está en el 6, han pasado 30 minutos.
          Decimos que es "y media".
        </p>
        <div class="reloj-preview">
          <canvas id="relojMedia" width="300" height="300"></canvas>
        </div>
        <div class="ejemplos-grid">
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕜</div>
            <h4>1:30</h4>
            <p>La una y media</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕞</div>
            <h4>3:30</h4>
            <p>Las tres y media</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕡</div>
            <h4>6:30</h4>
            <p>Las seis y media</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕤</div>
            <h4>9:30</h4>
            <p>Las nueve y media</p>
          </div>
        </div>
        <div class="tip-box">
          <strong>💡 Truco:</strong>
          <p>Si la manecilla larga está en el 6 (abajo), son "y media". La manecilla corta está entre dos números.</p>
        </div>
      </div>
    `,
    reloj: { horas: 3, minutos: 30 }
  },
  {
    titulo: "🕐 Cuarto de Hora (y cuarto)",
    contenido: `
      <div class="leccion-cuarto">
        <h2>Leer los Cuartos de Hora</h2>
        <p class="intro-text">
          Cuando la manecilla larga está en el 3, han pasado 15 minutos.
          Decimos que es "y cuarto" o "y quince".
        </p>
        <div class="reloj-preview">
          <canvas id="relojCuarto" width="300" height="300"></canvas>
        </div>
        <div class="info-box">
          <h3>Posiciones importantes:</h3>
          <ul>
            <li><strong>12</strong> = En punto (0 minutos)</li>
            <li><strong>3</strong> = Y cuarto (15 minutos)</li>
            <li><strong>6</strong> = Y media (30 minutos)</li>
            <li><strong>9</strong> = Menos cuarto (45 minutos)</li>
          </ul>
        </div>
        <div class="ejemplos-grid">
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕐</div>
            <h4>2:15</h4>
            <p>Las dos y cuarto</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕓</div>
            <h4>4:15</h4>
            <p>Las cuatro y cuarto</p>
          </div>
          <div class="ejemplo-card">
            <div class="ejemplo-hora">🕘</div>
            <h4>9:45</h4>
            <p>Las diez menos cuarto</p>
          </div>
        </div>
      </div>
    `,
    reloj: { horas: 2, minutos: 15 }
  },
  {
    titulo: "🎓 ¡Practica lo Aprendido!",
    contenido: `
      <div class="leccion-practica">
        <h2>¡Excelente Trabajo!</h2>
        <p class="intro-text">
          Ya sabes leer la hora en un reloj análogo. Ahora es momento de practicar con el juego.
        </p>
        <div class="resumen-box">
          <h3>📚 Resumen de lo Aprendido</h3>
          <ul>
            <li>✅ Identificar las partes del reloj</li>
            <li>✅ Leer las horas en punto</li>
            <li>✅ Leer las medias horas (y media)</li>
            <li>✅ Leer los cuartos de hora (y cuarto)</li>
          </ul>
        </div>
        <div class="reloj-preview">
          <canvas id="relojFinal" width="300" height="300"></canvas>
        </div>
        <button class="btn-practica btn-grande" onclick="window.location.href='juego-reloj.html'">
          🎮 ¡Jugar Ahora!
        </button>
        <button class="btn-secondary btn-grande" onclick="window.location.href='menu.html'" style="margin-top: 15px;">
          🏠 Volver al Menú
        </button>
      </div>
    `,
    reloj: { horas: 9, minutos: 45 }
  }
];

// ===== EVENTOS =====
if (btnMenu) {
  btnMenu.addEventListener('click', () => {
    const confirmar = confirm('¿Quieres salir del tutorial? Perderás tu progreso.');
    if (confirmar) window.location.href = "menu.html";
  });
}

if (btnComenzar) {
  btnComenzar.addEventListener('click', iniciarTutorial);
}

if (btnSiguiente) {
  btnSiguiente.addEventListener('click', siguienteLeccion);
}

if (btnAnterior) {
  btnAnterior.addEventListener('click', anteriorLeccion);
}

// ===== FUNCIONES =====
function iniciarTutorial() {
  leccionActual = 0;
  mostrarLeccion();
  document.getElementById('pantallaBienvenida').style.display = 'none';
  document.getElementById('pantallaLecciones').style.display = 'block';
}

function mostrarLeccion() {
  if (leccionActual < 0 || leccionActual >= LECCIONES.length) return;
  
  const leccion = LECCIONES[leccionActual];
  
  // Actualizar contenido
  if (contenidoLeccion) {
    contenidoLeccion.innerHTML = leccion.contenido;
  }
  
  // Actualizar contador
  if (leccionActualSpan) leccionActualSpan.textContent = leccionActual + 1;
  if (leccionTotalSpan) leccionTotalSpan.textContent = LECCIONES.length;
  
  // Actualizar botones
  if (btnAnterior) btnAnterior.disabled = leccionActual === 0;
  if (btnSiguiente) {
    if (leccionActual === LECCIONES.length - 1) {
      btnSiguiente.textContent = '✓ Finalizar';
    } else {
      btnSiguiente.textContent = 'Siguiente →';
    }
  }
  
  // Dibujar reloj después de un pequeño delay para que el canvas exista
  setTimeout(() => {
    dibujarRelojLeccion(leccion.reloj);
  }, 100);
}

function siguienteLeccion() {
  if (leccionActual < LECCIONES.length - 1) {
    leccionActual++;
    mostrarLeccion();
    window.scrollTo(0, 0);
  } else {
    // Finalizar tutorial
    window.location.href = 'juego-reloj.html';
  }
}

function anteriorLeccion() {
  if (leccionActual > 0) {
    leccionActual--;
    mostrarLeccion();
    window.scrollTo(0, 0);
  }
}

function dibujarRelojLeccion(config) {
  // Buscar el canvas en el contenido actual
  const canvases = ['relojDemo', 'relojPartes', 'relojHoras', 'relojMedia', 'relojCuarto', 'relojFinal'];
  
  canvases.forEach(id => {
    const canvas = document.getElementById(id);
    if (canvas) {
      dibujarReloj(canvas, config.horas, config.minutos);
    }
  });
}

function dibujarReloj(canvas, horas, minutos) {
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  
  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar fondo
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = '#1d3557';
  ctx.lineWidth = 4;
  ctx.stroke();
  
  // Dibujar números
  ctx.fillStyle = '#1d3557';
  ctx.font = 'bold 24px Poppins';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  for (let i = 1; i <= 12; i++) {
    const angle = (i - 3) * (Math.PI / 6);
    const x = centerX + Math.cos(angle) * (radius - 30);
    const y = centerY + Math.sin(angle) * (radius - 30);
    ctx.fillText(i.toString(), x, y);
  }
  
  // Dibujar marcas
  ctx.strokeStyle = '#2a9d8f';
  ctx.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    const angle = i * (Math.PI / 30);
    const innerRadius = i % 5 === 0 ? radius - 15 : radius - 8;
    const outerRadius = radius - 5;
    
    const x1 = centerX + Math.cos(angle) * innerRadius;
    const y1 = centerY + Math.sin(angle) * innerRadius;
    const x2 = centerX + Math.cos(angle) * outerRadius;
    const y2 = centerY + Math.sin(angle) * outerRadius;
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  // Dibujar manecilla de horas
  const horasAngle = ((horas % 12) + minutos / 60) * (Math.PI / 6) - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(horasAngle) * (radius * 0.5),
    centerY + Math.sin(horasAngle) * (radius * 0.5)
  );
  ctx.strokeStyle = '#1d3557';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Dibujar manecilla de minutos
  const minutosAngle = minutos * (Math.PI / 30) - Math.PI / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(
    centerX + Math.cos(minutosAngle) * (radius * 0.7),
    centerY + Math.sin(minutosAngle) * (radius * 0.7)
  );
  ctx.strokeStyle = '#2a9d8f';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.stroke();
  
  // Centro del reloj
  ctx.beginPath();
  ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
  ctx.fillStyle = '#e63946';
  ctx.fill();
  
  // Mostrar hora digital debajo
  const horaTexto = `${horas}:${minutos.toString().padStart(2, '0')}`;
  ctx.fillStyle = '#1d3557';
  ctx.font = 'bold 20px Poppins';
  ctx.fillText(horaTexto, centerX, centerY + radius + 30);
}

// ===== INICIALIZACIÓN =====
console.log('Tutorial del Reloj cargado ⏰');