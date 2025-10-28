// ===== ELEMENTOS DOM =====
const btnMenu = document.getElementById('btnMenu');
const tutorialCards = document.querySelectorAll('.tutorial-card');
const tutorialContent = document.getElementById('tutorialContent');
const tutorialBody = document.getElementById('tutorialBody');
const btnCerrarTutorial = document.getElementById('btnCerrarTutorial');

// ===== CONTENIDO DE TUTORIALES =====
const TUTORIALES = {
  ropa: {
    titulo: '👕 Ropa Básica',
    contenido: `
      <h2>Aprende sobre Ropa Básica</h2>
      
      <div class="tutorial-section">
        <h3>🎽 La Camisa</h3>
        <p>La camisa es una prenda que usamos en la parte superior del cuerpo. Nos protege y nos mantiene cómodos.</p>
        <ul>
          <li>Se coloca sobre el torso</li>
          <li>Puede tener mangas largas o cortas</li>
          <li>Se abrocha con botones o es de colgar</li>
          <li>La usamos todos los días</li>
        </ul>
      </div>

      <div class="tutorial-section">
        <h3>👖 El Pantalón</h3>
        <p>El pantalón cubre nuestras piernas y nos ayuda a movernos libremente.</p>
        <ul>
          <li>Se coloca en la parte inferior del cuerpo</li>
          <li>Tiene dos perneras para cada pierna</li>
          <li>Puede ser largo o corto</li>
          <li>Tiene una cintura que se ajusta</li>
        </ul>
      </div>

      <div class="tutorial-section">
        <h3>👟 Los Zapatos</h3>
        <p>Los zapatos protegen nuestros pies cuando caminamos o corremos.</p>
        <ul>
          <li>Se colocan en los pies</li>
          <li>Nos protegen del suelo</li>
          <li>Pueden ser deportivos, formales o casuales</li>
          <li>Siempre debemos usarlos al salir</li>
        </ul>
      </div>

      <div class="tutorial-section" style="background-color: rgba(42, 157, 143, 0.2); padding: 20px; border-radius: 10px; margin-top: 20px;">
        <h3>💡 Consejo</h3>
        <p>Recuerda siempre vestirte en orden: primero la ropa interior, luego la camisa, después el pantalón y por último los zapatos.</p>
      </div>
    `
  },
  
  accesorios: {
    titulo: '👓 Accesorios',
    contenido: `
      <h2>Aprende sobre Accesorios</h2>
      
      <div class="tutorial-section">
        <h3>🧢 La Gorra</h3>
        <p>La gorra nos protege del sol y es parte de nuestro estilo.</p>
        <ul>
          <li>Se coloca en la cabeza</li>
          <li>Tiene una visera que protege del sol</li>
          <li>Es perfecta para días soleados</li>
          <li>Puede tener diferentes diseños</li>
        </ul>
      </div>

      <div class="tutorial-section">
        <h3>⌚ El Reloj</h3>
        <p>El reloj nos ayuda a saber qué hora es durante el día.</p>
        <ul>
          <li>Se coloca en la muñeca</li>
          <li>Nos dice la hora</li>
          <li>Tiene una correa ajustable</li>
          <li>Nos ayuda a ser puntuales</li>
        </ul>
      </div>

      <div class="tutorial-section">
        <h3>👓 Los Lentes</h3>
        <p>Los lentes nos ayudan a ver mejor o nos protegen del sol.</p>
        <ul>
          <li>Se colocan en la cara, sobre los ojos</li>
          <li>Pueden ser para ver o para el sol</li>
          <li>Nos protegen de la luz fuerte</li>
          <li>Deben cuidarse con cuidado</li>
        </ul>
      </div>

      <div class="tutorial-section">
        <h3>🎒 La Mochila</h3>
        <p>La mochila nos sirve para llevar nuestras cosas.</p>
        <ul>
          <li>Se coloca en la espalda</li>
          <li>Tiene correas para los hombros</li>
          <li>Podemos guardar libros, juguetes y más</li>
          <li>Es perfecta para la escuela</li>
        </ul>
      </div>

      <div class="tutorial-section" style="background-color: rgba(42, 157, 143, 0.2); padding: 20px; border-radius: 10px; margin-top: 20px;">
        <h3>💡 Consejo</h3>
        <p>Los accesorios se ponen al final, después de estar completamente vestido.</p>
      </div>
    `
  },
  
  situaciones: {
    titulo: '🌤️ Situaciones',
    contenido: `
      <h2>Próximamente</h2>
      <p>Esta sección estará disponible pronto. Aquí aprenderás a vestirte según el clima y las ocasiones especiales.</p>
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
});

btnCerrarTutorial.addEventListener('click', cerrarTutorial);

// Cerrar al hacer clic fuera del contenido
tutorialContent.addEventListener('click', (e) => {
  if (e.target === tutorialContent) {
    cerrarTutorial();
  }
});

// ===== FUNCIONES =====
function mostrarTutorial(tipo) {
  const tutorial = TUTORIALES[tipo];
  if (!tutorial) return;
  
  tutorialBody.innerHTML = tutorial.contenido;
  tutorialContent.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function cerrarTutorial() {
  tutorialContent.style.display = 'none';
  document.body.style.overflow = 'auto';
}