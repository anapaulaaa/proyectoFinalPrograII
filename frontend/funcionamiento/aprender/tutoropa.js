// ===== ELEMENTOS DOM =====
const btnMenu = document.getElementById('btnMenu');
const tutorialCards = document.querySelectorAll('.tutorial-card');
const tutorialModal = document.getElementById('tutorialModal');
const tutorialBody = document.getElementById('tutorialBody');
const btnCerrarTutorial = document.getElementById('btnCerrarTutorial');

// ===== CONTENIDO DE TUTORIALES =====
const TUTORIALES = {
  ropa: {
    titulo: '👕 Ropa Básica',
    subtitulo: 'Aprende sobre las prendas esenciales',
    contenido: `
      <div class="tutorial-header">
        <h2>👕 Ropa Básica</h2>
        <p>Las prendas que usamos todos los días</p>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">👔</div>
          <div class="prenda-title">
            <h3>La Camisa</h3>
            <span class="prenda-subtitle">Prenda superior del cuerpo</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            La camisa es una prenda que usamos en la parte superior del cuerpo. 
            Nos protege y nos mantiene cómodos durante el día.
          </p>
          <ul class="prenda-list">
            <li>Se coloca sobre el torso</li>
            <li>Puede tener mangas largas o cortas</li>
            <li>Se abrocha con botones o es de colgar</li>
            <li>La usamos todos los días</li>
          </ul>
        </div>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">👖</div>
          <div class="prenda-title">
            <h3>El Pantalón</h3>
            <span class="prenda-subtitle">Prenda para las piernas</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            El pantalón cubre nuestras piernas y nos ayuda a movernos libremente.
            Es una prenda fundamental en nuestro día a día.
          </p>
          <ul class="prenda-list">
            <li>Se coloca en la parte inferior del cuerpo</li>
            <li>Tiene dos perneras para cada pierna</li>
            <li>Puede ser largo o corto</li>
            <li>Tiene una cintura que se ajusta con botón o zipper</li>
          </ul>
        </div>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">👟</div>
          <div class="prenda-title">
            <h3>Los Zapatos</h3>
            <span class="prenda-subtitle">Protección para los pies</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            Los zapatos protegen nuestros pies cuando caminamos o corremos.
            Son la última prenda que nos ponemos al vestirnos.
          </p>
          <ul class="prenda-list">
            <li>Se colocan en los pies</li>
            <li>Nos protegen del suelo y del clima</li>
            <li>Pueden ser deportivos, formales o casuales</li>
            <li>Siempre debemos usarlos al salir de casa</li>
          </ul>
        </div>
      </div>

      <div class="pasos-section">
        <h3>📋 Orden Correcto para Vestirse</h3>
        
        <div class="paso-item">
          <div class="paso-numero">1</div>
          <div class="paso-content">
            <h4>Ropa Interior</h4>
            <p>Siempre es lo primero que nos ponemos</p>
          </div>
        </div>

        <div class="paso-item">
          <div class="paso-numero">2</div>
          <div class="paso-content">
            <h4>La Camisa</h4>
            <p>Luego ponemos la camisa o playera</p>
          </div>
        </div>

        <div class="paso-item">
          <div class="paso-numero">3</div>
          <div class="paso-content">
            <h4>El Pantalón</h4>
            <p>Después nos ponemos el pantalón</p>
          </div>
        </div>

        <div class="paso-item">
          <div class="paso-numero">4</div>
          <div class="paso-content">
            <h4>Los Zapatos</h4>
            <p>Por último, nos ponemos los zapatos</p>
          </div>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 Consejo Importante</strong>
        <p>Recuerda siempre vestirte en orden. Primero la ropa interior, luego la camisa, después el pantalón y por último los zapatos. ¡Así será más fácil!</p>
      </div>

      <button class="btn-practica" onclick="window.location.href='juego.html'">
        🎮 ¡Vamos a Practicar!
      </button>
    `
  },
  
  accesorios: {
    titulo: '👓 Accesorios',
    subtitulo: 'Complementos que hacen tu outfit especial',
    contenido: `
      <div class="tutorial-header">
        <h2>👓 Accesorios</h2>
        <p>Los complementos perfectos para tu vestuario</p>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">🧢</div>
          <div class="prenda-title">
            <h3>La Gorra</h3>
            <span class="prenda-subtitle">Protección y estilo</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            La gorra nos protege del sol y es parte de nuestro estilo personal.
            Es perfecta para días soleados y actividades al aire libre.
          </p>
          <ul class="prenda-list">
            <li>Se coloca en la cabeza</li>
            <li>Tiene una visera que protege del sol</li>
            <li>Es perfecta para días soleados</li>
            <li>Puede tener diferentes diseños y colores</li>
          </ul>
        </div>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">⌚</div>
          <div class="prenda-title">
            <h3>El Reloj</h3>
            <span class="prenda-subtitle">Para estar a tiempo</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            El reloj nos ayuda a saber qué hora es durante el día.
            Es un accesorio útil y elegante que se usa en la muñeca.
          </p>
          <ul class="prenda-list">
            <li>Se coloca en la muñeca izquierda o derecha</li>
            <li>Nos dice la hora en todo momento</li>
            <li>Tiene una correa ajustable</li>
            <li>Nos ayuda a ser puntuales</li>
          </ul>
        </div>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">🕶️</div>
          <div class="prenda-title">
            <h3>Los Lentes</h3>
            <span class="prenda-subtitle">Para ver mejor o protegernos</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            Los lentes nos ayudan a ver mejor o nos protegen del sol.
            Son muy importantes para cuidar nuestros ojos.
          </p>
          <ul class="prenda-list">
            <li>Se colocan en la cara, sobre los ojos</li>
            <li>Pueden ser para ver o para el sol</li>
            <li>Nos protegen de la luz muy fuerte</li>
            <li>Deben cuidarse con mucho cuidado</li>
          </ul>
        </div>
      </div>

      <div class="prenda-card">
        <div class="prenda-header">
          <div class="prenda-icon">🎒</div>
          <div class="prenda-title">
            <h3>La Mochila</h3>
            <span class="prenda-subtitle">Para llevar tus cosas</span>
          </div>
        </div>
        <div class="prenda-content">
          <p class="prenda-description">
            La mochila nos sirve para llevar nuestras cosas como libros,
            juguetes, lunch y todo lo que necesitamos durante el día.
          </p>
          <ul class="prenda-list">
            <li>Se coloca en la espalda</li>
            <li>Tiene correas para los hombros</li>
            <li>Podemos guardar libros, juguetes y más</li>
            <li>Es perfecta para la escuela</li>
          </ul>
        </div>
      </div>

      <div class="tip-box">
        <strong>💡 Consejo Importante</strong>
        <p>Los accesorios se ponen al final, después de estar completamente vestido con tu ropa básica. ¡Son el toque final perfecto!</p>
      </div>

      <button class="btn-practica" onclick="window.location.href='juego.html'">
        🎮 ¡Practica con Accesorios!
      </button>
    `
  },
  
  
situaciones: {
  titulo: '🌤️ Situaciones y Ocasiones',
  subtitulo: 'Aprende a vestirte según el momento',
  contenido: `
    <div class="tutorial-header">
      <h2>🌤️ Situaciones y Ocasiones</h2>
      <p>Viste apropiadamente para cada momento del día</p>
    </div>

    <div class="prenda-card">
      <div class="prenda-header">
        <div class="prenda-icon">🏫</div>
        <div class="prenda-title">
          <h3>Para la Escuela</h3>
          <span class="prenda-subtitle">Ropa cómoda y práctica</span>
        </div>
      </div>
      <div class="prenda-content">
        <p class="prenda-description">
          En la escuela necesitamos estar cómodos para aprender y jugar.
          La ropa debe ser práctica y permitirnos movernos libremente.
        </p>
        <ul class="prenda-list">
          <li>Uniforme escolar o ropa casual</li>
          <li>Zapatos cerrados y cómodos</li>
          <li>Mochila con útiles escolares</li>
          <li>Gorra para el recreo (si hay sol)</li>
        </ul>
      </div>
    </div>

    <div class="prenda-card">
      <div class="prenda-header">
        <div class="prenda-icon">🎉</div>
        <div class="prenda-title">
          <h3>Para una Fiesta</h3>
          <span class="prenda-subtitle">Ropa especial y elegante</span>
        </div>
      </div>
      <div class="prenda-content">
        <p class="prenda-description">
          Las fiestas son ocasiones especiales donde nos vestimos
          con nuestra mejor ropa para celebrar y divertirnos.
        </p>
        <ul class="prenda-list">
          <li>Camisa o vestido elegante</li>
          <li>Pantalón o falda formal</li>
          <li>Zapatos limpios y brillantes</li>
          <li>Accesorios especiales (moño, diadema)</li>
        </ul>
      </div>
    </div>

    <div class="prenda-card">
      <div class="prenda-header">
        <div class="prenda-icon">🌙</div>
        <div class="prenda-title">
          <h3>Para Dormir</h3>
          <span class="prenda-subtitle">Ropa cómoda para descansar</span>
        </div>
      </div>
      <div class="prenda-content">
        <p class="prenda-description">
          La pijama es ropa especial que usamos para dormir.
          Debe ser suave, cómoda y abrigadora.
        </p>
        <ul class="prenda-list">
          <li>Pijama de dos piezas o de una sola</li>
          <li>Pantuflas suaves</li>
          <li>Sin accesorios que molesten</li>
          <li>Ropa limpia y fresca</li>
        </ul>
      </div>
    </div>

    <div class="prenda-card">
      <div class="prenda-header">
        <div class="prenda-icon">⛱️</div>
        <div class="prenda-title">
          <h3>Para la Playa o Piscina</h3>
          <span class="prenda-subtitle">Ropa de baño y protección</span>
        </div>
      </div>
      <div class="prenda-content">
        <p class="prenda-description">
          Cuando vamos a la playa o piscina necesitamos ropa
          especial que nos permita nadar y protegernos del sol.
        </p>
        <ul class="prenda-list">
          <li>Traje de baño o pantaloneta</li>
          <li>Sandalias o chanclas</li>
          <li>Gorra para proteger del sol</li>
          <li>Lentes de sol</li>
        </ul>
      </div>
    </div>

    <div class="pasos-section">
      <h3>🕐 Momentos del Día</h3>
      
      <div class="paso-item">
        <div class="paso-numero">🌅</div>
        <div class="paso-content">
          <h4>Por la Mañana (7:00 AM)</h4>
          <p>Nos vestimos para ir a la escuela con uniforme o ropa casual</p>
        </div>
      </div>

      <div class="paso-item">
        <div class="paso-numero">☀️</div>
        <div class="paso-content">
          <h4>En la Tarde (3:00 PM)</h4>
          <p>Podemos cambiar a ropa más cómoda para jugar en casa</p>
        </div>
      </div>

      <div class="paso-item">
        <div class="paso-numero">🌆</div>
        <div class="paso-content">
          <h4>Por la Noche (7:00 PM)</h4>
          <p>Nos ponemos ropa fresca para cenar y estar en familia</p>
        </div>
      </div>

      <div class="paso-item">
        <div class="paso-numero">🌙</div>
        <div class="paso-content">
          <h4>Antes de Dormir (9:00 PM)</h4>
          <p>Nos cambiamos a pijama para estar cómodos toda la noche</p>
        </div>
      </div>
    </div>

    <div class="tip-box">
      <strong>💡 Consejo Importante</strong>
      <p>Cada situación requiere ropa diferente. Piensa siempre: ¿A dónde voy? ¿Qué voy a hacer? ¿Qué clima hay? Esto te ayudará a elegir la ropa perfecta.</p>
    </div>

    <button class="btn-practica" onclick="window.location.href='juego.html'">
      🎮 ¡Practica Diferentes Situaciones!
    </button>
  `
}
};

// ===== EVENTOS =====
btnMenu.addEventListener('click', () => {
  window.location.href = "menu.html";
});

tutorialCards.forEach(card => {
  const btnTutorial = card.querySelector('.btn-tutorial');
  const tutorial = card.dataset.tutorial;
  
  btnTutorial.addEventListener('click', () => {
    if (btnTutorial.disabled) return;
    mostrarTutorial(tutorial);
  });
  
  // También permitir clic en toda la tarjeta (excepto si está deshabilitada)
  card.addEventListener('click', (e) => {
    if (card.classList.contains('disabled')) return;
    if (e.target === btnTutorial) return; // Evitar doble disparo
    mostrarTutorial(tutorial);
  });
});

btnCerrarTutorial.addEventListener('click', cerrarTutorial);

// Cerrar al hacer clic fuera del contenido
tutorialModal.addEventListener('click', (e) => {
  if (e.target === tutorialModal) {
    cerrarTutorial();
  }
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && tutorialModal.style.display === 'block') {
    cerrarTutorial();
  }
});

// ===== FUNCIONES =====
function mostrarTutorial(tipo) {
  const tutorial = TUTORIALES[tipo];
  if (!tutorial) return;
  
  tutorialBody.innerHTML = tutorial.contenido;
  tutorialModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Animación de entrada
  setTimeout(() => {
    tutorialModal.style.animation = 'fadeIn 0.3s ease';
  }, 10);
}

function cerrarTutorial() {
  tutorialModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ===== AUTO-INICIALIZACIÓN =====
console.log('Tutorial de Aprendizaje cargado correctamente ✅');