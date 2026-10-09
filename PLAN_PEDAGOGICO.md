# Plan Maestro y Arquitectura Pedagógica: Plataforma de Aprendizaje Power Automate

## 1. Estructura de Módulos y Lecciones

### Módulo 1: Fundamentos y Paradigma
- **Lección 1.1:** ¿Qué es Power Automate? El Modelo Mental (Trigger → Acciones → Condiciones → Resultado).
- **Lección 1.2:** Tipos de Flujos (Automated, Instant, Scheduled) vs Power Automate Desktop (RPA).
- **Lección 1.3:** Triggers y Conectores: Cómo se conecta con el ecosistema.
- **Lección 1.4:** El puente del desarrollador: Equivalencia directa entre Spring Boot / Java y Power Automate.

### Módulo 2: Manipulación de Datos, Lógica y Expresiones
- **Lección 2.1:** Variables, Tipos de Datos (Strings, Ints, Booleans) y la acción `Compose`.
- **Lección 2.2:** Arrays, Colecciones y el bucle `Apply to Each` (el `for-each` visual).
- **Lección 2.3:** Condiciones (If/Else) y Control de Flujo con `Switch`.
- **Lección 2.4:** Manejo de JSON, Contenido Dinámico y la acción `Parse JSON` (Schemas y tipado).
- **Lección 2.5:** Expresiones WDL esenciales: manipulación de texto, fechas (`formatDateTime`, `addDays`, timezones) y cálculos.

### Módulo 3: Automatización con el Ecosistema Microsoft 365
- **Lección 3.1:** Excel Online (Business): Tablas obligatorias, `Add/Get/Update/List rows`, paginación y por qué Excel no es una base de datos.
- **Lección 3.2:** Outlook y Teams: Notificaciones interactivas, plantillas HTML y alertas en canales.
- **Lección 3.3:** SharePoint & Forms: Listas estructuradas como base de datos ligera y recolección de solicitudes.
- **Lección 3.4:** Flujos de Aprobaciones: Aprobaciones multinivel, respuestas condicionales y seguimiento de auditoría.

### Módulo 4: Integración Externa, Google Workspace y APIs REST
- **Lección 4.1:** Google Workspace (Sheets, Drive, Gmail): Operaciones, diferencias con Microsoft y limitaciones de concurrencia.
- **Lección 4.2:** Conector HTTP y APIs REST: Métodos (GET, POST, PUT, DELETE), Headers, Body, Authentication y conectores Premium.
- **Lección 4.3:** Webhooks y Arquitectura con Spring Boot (ClínicaApp): Escuchar eventos y enviar notificaciones automáticas bidireccionales.

### Módulo 5: Arquitectura Empresarial, Seguridad y Buenas Prácticas
- **Lección 5.1:** Manejo de Errores Profesional: Scopes `Try / Catch / Finally` y `Configure run after`.
- **Lección 5.2:** Concurrencia, Paginación, Throttling y Prevención de Duplicados (Estrategias de Idempotencia).
- **Lección 5.3:** Seguridad, Credenciales, Gestión de Secretos, Conexiones y Ambientes (DEV / TEST / PROD).
- **Lección 5.4:** Convenciones de Nomenclatura, Documentación y las 10 Preguntas de Oro antes de crear un flujo.

### Módulo 6: Proyectos Prácticos Guiados & Simulador de Entrevistas
- **Proyecto 1:** Sistema de Solicitudes y Alertas en Excel.
- **Proyecto 2:** Circuito de Aprobación de Vacaciones con Forms + Teams + Outlook.
- **Proyecto 3:** Sincronización Google Sheets ↔ Microsoft 365.
- **Proyecto 4:** Integración Full-Stack ClínicaApp (Spring Boot Webhook → Power Automate → Multi-canal).
- **Entrenador de Entrevistas:** Banco de preguntas técnicas, respuestas estratégicas y análisis de casos.
