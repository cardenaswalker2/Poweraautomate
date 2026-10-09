# Power Automate Mastery - Plataforma Web Interactiva de Aprendizaje

Bienvenido a tu plataforma personal e interactiva de aprendizaje de **Power Automate**, diseñada bajo estándares de ingeniería de software, pedagogía estructurada y experiencia de usuario moderna (UI/UX).

---

## 📁 Estructura del Proyecto

```
/AjoverLuis
├── index.html              # Estructura semántica principal y layout responsive
├── PLAN_PEDAGOGICO.md      # Mapa curricular y objetivos de aprendizaje
├── css/
│   └── styles.css          # Sistema de diseño, Glassmorphism, Dark/Light mode y componentes
├── js/
│   ├── content.js          # Base de datos completa con módulos, lecciones, quizzes, flashcards y glosario
│   ├── storage.js          # Persistencia en LocalStorage (progreso, notas, marcadores, quizzes)
│   └── app.js              # Controlador interactivo, navegación, simulador y eventos
└── README.md               # Guía de uso y personalización
```

---

## 🚀 ¿Cómo Ejecutar la Plataforma?

La plataforma está construida utilizando exclusivamente **HTML5, CSS3 y JavaScript moderno**, por lo que **no requiere instalación de servidores ni dependencias pesadas**.

### Opción 1: Directamente en tu navegador
1. Ve a la carpeta `c:\Users\USUARIO\Music\AjoverLuis`.
2. Haz doble clic en el archivo [index.html](file:///c:/Users/USUARIO/Music/AjoverLuis/index.html).
3. Se abrirá en tu navegador predeterminado (Chrome, Edge, Firefox, etc.).

### Opción 2: Con Live Server (VS Code / Extensiones)
Si abres la carpeta en tu editor de código, puedes pulsar con clic derecho en `index.html` → **Open with Live Server**.

---

## 🌟 Funcionalidades Interactivas Implementadas

1. **Navegación Modular Progresiva:**
   - 6 Módulos completos y 20 lecciones profundas que cubren desde los fundamentos hasta la integración con Spring Boot (ClínicaApp).
   - Acordeón interactivo con estado de completado en tiempo real.

2. **Seguimiento de Progreso & Persistencia Local (`localStorage`):**
   - Cálculo automático del porcentaje de avance en base a lecciones finalizadas.
   - Todo se conserva automáticamente al recargar o cerrar el navegador.

3. **Comprobación de Aprendizaje (Quizzes Interactivos):**
   - Cada lección cuenta con una evaluación interactiva con retroalimentación inmediata y explicaciones razonadas.

4. **Bloc de Notas Personales (Autosave):**
   - Cada lección tiene su propio espacio de apuntes con guardado automático.

5. **Simulador Visual de Flujos:**
   - Herramienta interactiva para construir tuberías de ejecución (Trigger → Parse JSON → Scopes → Excel → Teams).

6. **Tarjetas de Memoria Activa (Flashcards):**
   - Tarjetas 3D con efecto de giro para repasar conceptos clave rápidamente.

7. **Glosario Técnico y Marcadores:**
   - Diccionario de términos y acceso directo a tus temas favoritos guardados.

8. **Modo Oscuro / Claro:**
   - Interfaz con selector de tema optimizada para largas sesiones de estudio sin fatiga visual.

---

## ✍️ Cómo Modificar o Agregar Más Lecciones

Para agregar nuevo contenido o editar lecciones existentes:
1. Abre el archivo [content.js](file:///c:/Users/USUARIO/Music/AjoverLuis/js/content.js).
2. Localiza el array `COURSE_DATA.modules` y agrega un nuevo objeto de lección dentro del módulo deseado siguiendo la estructura:
   ```javascript
   {
     id: "les-X-Y",
     title: "Título de la lección",
     objective: "Qué aprenderás al finalizar",
     duration: "20 min",
     keyPoints: ["Punto 1", "Punto 2"],
     content: `HTML con la explicación profunda, ejemplos y diagramas`,
     quiz: [
       {
         question: "¿Pregunta de comprobación?",
         options: ["Opción A", "Opción B", "Opción C", "Opción D"],
         answer: 1, // Índice de la respuesta correcta (0-indexed)
         explanation: "Explicación detallada de la respuesta correcta."
       }
     ]
   }
   ```
3. Guarda el archivo y recarga la página; el menú, el buscador y el sistema de progreso reconocerán automáticamente los cambios.
