# Aventuropa - Proyecto Final Programación II

> Una aplicación educativa interactiva para enseñar a niños de 3 a 6 años a vestirse de forma autónoma y aprender a leer la hora.

## 📋 Descripción

**Aventuropa** es un juego educativo diseñado para ayudar a niños en edad preescolar a desarrollar habilidades de autonomía personal. A través de actividades interactivas y divertidas, los niños aprenden:

- 👕 A identificar y vestirse con diferentes prendas de ropa
- ⏰ A leer la hora en relojes análogos
- 🌤️ A elegir ropa apropiada según diferentes situaciones
- 🎮 A desarrollar coordinación mediante interacciones drag & drop

## ✨ Características

### 🎯 Modos de Juego

#### 📚 Modo Aprendizaje
- **Tutoriales interactivos** con explicaciones paso a paso
- **Ropa Básica**: Camisa, pantalón y zapatos
- **Accesorios**: Gorra, reloj, lentes y mochila
- **Situaciones**: Vestimenta apropiada para diferentes ocasiones
- **Tutorial del Reloj**: 6 lecciones progresivas para aprender a leer la hora

#### 🎮 Modo Juego
**Nivel 1: Ropa Básica**
- Viste al personaje con prendas esenciales
- Sistema drag & drop intuitivo
- Feedback visual inmediato

**Nivel 2: Accesorios**
- Complementa el outfit con accesorios
- Mayor dificultad y precisión

**Nivel 3: Situaciones**
- Selecciona prendas apropiadas según el contexto:
  - 🏫 Para la Escuela
  - 🎉 Para una Fiesta
  - 🌙 Para Dormir
  - ⛱️ Para la Playa
  - ⚽ Para Hacer Deporte

#### ⏰ Juego del Reloj
- **4 niveles progresivos**: Horas en punto → Media hora → Cuartos → Mixto
- Sistema de puntos y rachas
- Feedback inmediato sobre respuestas
- Estadísticas finales de desempeño

### 🎨 Diseño

- **Interfaz colorida y atractiva** optimizada para niños
- **Animaciones suaves** que captan la atención
- **Sonido visual** con efectos de estrellas y celebraciones
- **Responsive Design** compatible con tablets y móviles
- **Modo táctil** para dispositivos touch

### 👦👧 Personalización

- Selección de género del personaje (niño/niña)
- Imágenes adaptadas según la selección
- Progreso guardado automáticamente en LocalStorage
- Perfil personalizado con nombre del jugador

## 🚀 Instalación

### Opción 1: Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/aventuropa.git
cd aventuropa
```

### Opción 2: Descargar ZIP

1. Haz clic en el botón "Code" → "Download ZIP"
2. Extrae el archivo en tu carpeta deseada

## 🎮 Uso

### Frontend (Modo Simple)

1. Navega a la carpeta `frontend`
2. Abre `index.html` en tu navegador
3. ¡Comienza a jugar!

**Nota**: Los datos se guardan localmente en tu navegador usando LocalStorage.

### Backend (Opcional - Para persistencia en servidor)

Si deseas implementar el backend para guardar progreso en un servidor:

```bash
cd backend
npm install
npm start
```

El servidor correrá en `http://localhost:4000`

**Configurar la API**:
- Edita `frontend/funcionamiento/api.js` con la URL de tu servidor
- Descomentar llamadas a la API en los archivos de niveles

## 📁 Estructura del Proyecto

```
aventuropa/
│
├── frontend/
│   ├── index.html                    # Pantalla de inicio/login
│   ├── menu.html                     # Menú principal
│   ├── aprender.html                 # Modo aprendizaje
│   ├── tutorial-reloj.html           # Tutorial del reloj
│   ├── juego.html                    # Niveles de vestimenta
│   ├── juego-reloj.html             # Juego del reloj
│   │
│   ├── estilos/
│   │   ├── estilos.css              # Estilos globales
│   │   ├── menu.css                 # Estilos del menú
│   │   ├── aprender.css             # Estilos de tutoriales
│   │   ├── juego.css                # Estilos del juego principal
│   │   ├── juego-reloj.css          # Estilos del juego del reloj
│   │   └── tutorial-reloj.css       # Estilos del tutorial del reloj
│   │
│   ├── funcionamiento/
│   │   ├── login.js                 # Lógica de inicio
│   │   ├── menu.js                  # Lógica del menú
│   │   ├── niveles.js               # Gestión de progreso
│   │   ├── utils.js                 # Funciones utilitarias
│   │   ├── api.js                   # Comunicación con backend
│   │   │
│   │   ├── aprender/
│   │   │   ├── tutoropa.js         # Tutoriales de ropa
│   │   │   └── tutoreloj.js        # Tutorial del reloj
│   │   │
│   │   ├── niveles/
│   │   │   ├── nivel1ropa.js       # Nivel 1: Ropa básica
│   │   │   ├── nivel2accesorios.js # Nivel 2: Accesorios
│   │   │   └── nivel3situaciones.js # Nivel 3: Situaciones
│   │   │
│   │   └── juegos/
│   │       └── juego-reloj.js      # Lógica del juego del reloj
│   │
│   └── recursos/
│       └── imagenes/
│           ├── nino/                # Imágenes para niño
│           │   ├── muneco.png
│           │   ├── camisa1.png
│           │   ├── pantalon1.png
│           │   └── ...
│           │
│           └── nina/                # Imágenes para niña
│               ├── muneco.png
│               ├── camisa1.png
│               └── ...
│
└── backend/ (Opcional)
    ├── server.js                    # Servidor Express
    ├── package.json
    └── routes/
        └── profiles.js              # API de perfiles
```

## 🎯 Características Técnicas

### Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: 
  - Variables CSS para temas consistentes
  - Flexbox y Grid para layouts responsivos
  - Animaciones y transiciones suaves
  - Gradientes y efectos visuales modernos
- **JavaScript**: 
  - Sin dependencias externas
  - LocalStorage para persistencia local
  - API drag & drop nativa
  - Canvas para dibujar relojes

### Backend (Opcional)
- **Node.js** con **Express**
- **SQLite** para base de datos ligera
- API RESTful para gestión de perfiles
- CORS habilitado para desarrollo

## 📱 Compatibilidad

- ✅ Chrome (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🎓 Objetivos Educativos

### Habilidades Desarrolladas

**Motricidad Fina**
- Coordinación ojo-mano mediante drag & drop
- Precisión al colocar prendas en zonas específicas

**Autonomía Personal**
- Identificación de prendas de vestir
- Orden correcto para vestirse
- Selección apropiada según situaciones

**Pensamiento Lógico**
- Asociación de prendas con contextos
- Resolución de problemas simples
- Toma de decisiones

**Lectura del Tiempo**
- Identificación de partes del reloj
- Comprensión de horas, medias y cuartos
- Práctica progresiva con dificultad creciente

## 👨‍💻 Autora

**Ana Paula Vásquez**
- **Universidad**: Universidad Mariano Gálvez de Guatemala - Campus Huehuetenango
- **Curso**: Programación II
- **Proyecto**: Trabajo Final
- **Año**: 2025

## 🎓 Contexto Académico

Este proyecto fue desarrollado como trabajo final para el curso de **Programación II** en la Universidad Mariano Gálvez de Guatemala, Campus Huehuetenango. El objetivo fue crear una aplicación educativa funcional que integrara los conocimientos adquiridos durante el curso, incluyendo:

- Estructura de datos y algoritmos
- Programación orientada a eventos
- Manejo del DOM
- Diseño responsivo
- Persistencia de datos local
- Buenas prácticas de programación
