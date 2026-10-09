/**
 * Base de Datos Integral de Contenidos - Plataforma Power Automate Mastery
 * Contiene módulos, lecciones completas con explicaciones profundas, ejemplos reales,
 * comparativas con Java/Spring Boot, ejercicios de comprobación, glosario, flashcards y proyectos.
 */

const COURSE_DATA = {
  title: "Power Automate Mastery: De Cero a Arquitectura Empresarial",
  subtitle: "Guía interactiva para desarrolladores y profesionales de automatización",
  description: "Aprende a diseñar, construir y desplegar flujos de trabajo robustos, conectar APIs REST, Spring Boot, Microsoft 365, Google Workspace y manejar errores como un desarrollador senior.",
  modules: [
    {
      id: "mod-1",
      title: "Módulo 1: Fundamentos, Paradigma y Mentalidad de Flujo",
      icon: "zap",
      summary: "Comprende el modelo mental esencial, la diferencia entre Cloud y Desktop flows y la equivalencia directa con la programación tradicional (Java/Spring Boot).",
      lessons: [
        {
          id: "les-1-1",
          title: "1.1 ¿Qué es Power Automate? El Modelo Mental",
          objective: "Comprender la esencia de Power Automate y su fórmula fundamental de funcionamiento.",
          duration: "15 min",
          keyPoints: [
            "Power Automate es una plataforma de automatización basada en eventos y acciones.",
            "Fórmula de oro: TRIGGER → ACCIONES → CONDICIONES → RESULTADO.",
            "No es solo automatizar botones; es orquestar datos y procesos entre múltiples sistemas."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Introducción al Paradigma de Flujos</h3>
              <p>Power Automate es la solución de Microsoft dentro de la Power Platform diseñada para orquestar la automatización de procesos empresariales y la integración de sistemas heterogéneos sin necesidad de reinventar protocolos de red o librerías de conexión.</p>
              <p>Para un desarrollador, la forma más precisa de definirlo es: <strong>un motor de orquestación de eventos reactivos y basados en tareas (Event-Driven Task Orchestration Engine)</strong>.</p>
              
              <div class="callout callout-important">
                <div class="callout-title"><i class="ph-bold ph-lightbulb"></i> La Regla Fundamental</div>
                <p>Si solo recuerdas una cosa a lo largo de todo tu aprendizaje, recuerda este flujo constante:</p>
                <div class="flow-diagram-mini">
                  <span class="flow-step trigger">TRIGGER (Disparador)</span>
                  <span class="flow-arrow">→</span>
                  <span class="flow-step action">ACCIONES (Procesamiento)</span>
                  <span class="flow-arrow">→</span>
                  <span class="flow-step condition">CONDICIONES (Lógica If/Else)</span>
                  <span class="flow-arrow">→</span>
                  <span class="flow-step result">RESULTADO (Persistencia/Avisos)</span>
                </div>
              </div>

              <h3>2. ¿Cómo funciona bajo el capó?</h3>
              <p>Cada vez que un flujo se ejecuta, Power Automate crea una <em>instancia de ejecución</em> con un identificador único (Run ID). Cada paso produce una salida en formato JSON que pasa a estar disponible de forma inmutable para todos los pasos subsiguientes.</p>
              
              <div class="code-compare-grid">
                <div class="code-box">
                  <div class="code-header"><i class="ph-bold ph-code"></i> Modelo Mental en Java (Spring Boot)</div>
                  <pre><code class="language-java">// Event listener o Controller
@PostMapping("/eventos")
public ResponseEntity<?> handleEvent(@RequestBody Solicitud sol) {
    if (sol.getMonto() > 1_000_000) {
        aprobacionesService.solicitarGerente(sol);
    } else {
        solicitudService.aprobarDirecto(sol);
    }
    return ResponseEntity.ok("Procesado");
}</code></pre>
                </div>
                <div class="code-box">
                  <div class="code-header"><i class="ph-bold ph-tree-structure"></i> Equivalente en Power Automate</div>
                  <pre><code class="language-plaintext">[TRIGGER: When a HTTP request is received]
       ↓
[CONDITION: Monto > 1000000]
 ├─► SÍ: [ACTION: Start and wait for an approval]
 └─► NO: [ACTION: Update row - Estado: 'Aprobado']
       ↓
[ACTION: Response - 200 OK]</code></pre>
                </div>
              </div>
            </div>
          `,
          quiz: [
            {
              question: "¿Cuál es la secuencia lógica fundamental en la que se basa cualquier flujo en Power Automate?",
              options: [
                "Acciones → Trigger → Resultado → Base de datos",
                "Trigger → Acciones → Condiciones → Resultado",
                "Condiciones → Bucle → Trigger → Notificación",
                "Formulario → Variables → API → Trigger"
              ],
              answer: 1,
              explanation: "Todo flujo comienza obligatoriamente con un Trigger (evento disparador), seguido por acciones de obtención/transformación, condiciones lógicas y un resultado final."
            }
          ]
        },
        {
          id: "les-1-2",
          title: "1.2 Cloud Flows vs Desktop Flows (RPA)",
          objective: "Diferenciar con claridad cuándo usar flujos de nube (Cloud) y cuándo flujos de escritorio (RPA / Desktop).",
          duration: "20 min",
          keyPoints: [
            "Cloud Flows operan en la nube vía APIs y conectores web.",
            "Desktop Flows (RPA) automatizan interfaces gráficas locales (UI) de sistemas legacy sin API.",
            "En empresas modernas, ambos colaboran: un Cloud Flow puede disparar un Desktop Flow."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Los tres tipos de Cloud Flows</h3>
              <p>Los flujos de nube (Cloud Flows) son nativos de la web, se ejecutan en los servidores de Microsoft Azure y operan mediante llamadas a APIs REST estandarizadas:</p>
              
              <div class="cards-grid-3">
                <div class="info-card">
                  <div class="badge badge-primary">Automated</div>
                  <h4>Flujo Automatizado</h4>
                  <p>Iniciado por un evento externo en un servicio conectado. Ejemplo: Llega un correo con adjunto, se inserta una fila en una base de datos o se crea un ticket.</p>
                </div>
                <div class="info-card">
                  <div class="badge badge-success">Instant</div>
                  <h4>Flujo Instantáneo (Manual)</h4>
                  <p>Iniciado explícitamente por la interacción de un usuario: pulsando un botón en la app móvil, en Power Apps o mediante una llamada HTTP/Webhook.</p>
                </div>
                <div class="info-card">
                  <div class="badge badge-warning">Scheduled</div>
                  <h4>Flujo Programado (Cron)</h4>
                  <p>Se ejecuta según una periodicidad temporal definida (ej. todos los lunes a las 08:00 AM o cada 15 minutos).</p>
                </div>
              </div>

              <h3>2. Power Automate Desktop y el mundo RPA</h3>
              <p>¿Qué ocurre cuando la empresa utiliza un software contable de hace 20 años en Windows que no tiene APIs ni webhooks?</p>
              <p>Aquí entra <strong>RPA (Robotic Process Automation)</strong> con <strong>Power Automate Desktop</strong>. Emula el teclado y ratón humanos: abre aplicaciones de escritorio, hace clic en coordenadas, lee campos de texto de ventanas y extrae datos de emuladores.</p>

              <div class="table-responsive">
                <table class="styled-table">
                  <thead>
                    <tr>
                      <th>Característica</th>
                      <th>Cloud Flows (Nube)</th>
                      <th>Desktop Flows (RPA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Entorno</strong></td>
                      <td>Nube (Azure) / SaaS</td>
                      <td>Máquina local o Virtual Machine (Windows)</td>
                    </tr>
                    <tr>
                      <td><strong>Mecanismo</strong></td>
                      <td>APIs REST, JSON, Webhooks</td>
                      <td>UI Automation, OCR, clicks, keystrokes</td>
                    </tr>
                    <tr>
                      <td><strong>Velocidad y Resiliencia</strong></td>
                      <td>Muy alta (directo a nivel de red)</td>
                      <td>Moderada (depende de la UI y resolución)</td>
                    </tr>
                    <tr>
                      <td><strong>Caso de Uso</strong></td>
                      <td>Spring Boot, Microsoft 365, Gmail, SQL</td>
                      <td>Software ERP legacy, SAP GUI clásico, Excel de escritorio sin API</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `,
          quiz: [
            {
              question: "Si necesitas extraer datos diariamente de un software contable antiguo instalado en un servidor Windows que no tiene API, ¿qué tecnología de Power Automate debes elegir?",
              options: [
                "Un Scheduled Cloud Flow con conector HTTP",
                "Un Desktop Flow (RPA)",
                "Un Instant Flow con conector de Teams",
                "Un conector de Excel Online"
              ],
              answer: 1,
              explanation: "Power Automate Desktop (RPA) es la herramienta indicada para automatizar interfaces gráficas de usuario en aplicaciones de escritorio legacy sin soporte para APIs."
            }
          ]
        },
        {
          id: "les-1-3",
          title: "1.3 Triggers, Acciones y Conectores",
          objective: "Comprender la arquitectura de conectores y cómo fluyen los datos entre sistemas.",
          duration: "25 min",
          keyPoints: [
            "Un Conector es un wrapper o encapsulado sobre la API REST de un servicio.",
            "Los Triggers pueden ser por Polling (consultan periódicamente) o Webhook (push en tiempo real).",
            "Las Acciones reciben parámetros y entregan un cuerpo JSON accesible mediante Dynamic Content."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. La Arquitectura de Conectores</h3>
              <p>Un <strong>Conector</strong> en Power Automate es esencialmente una especificación OpenAPI (Swagger) que envuelve los endpoints de un servicio externo. Power Automate gestiona la autenticación (OAuth2, API Keys o Entra ID) y traduce la interfaz visual a llamadas HTTP.</p>

              <div class="diagram-container">
                <div class="arch-box">Power Automate Engine</div>
                <div class="arch-arrow">⇅ OAuth2 / Tokens</div>
                <div class="arch-connector-grid">
                  <div class="connector-chip"><i class="ph-bold ph-microsoft-excel-logo"></i> Excel Online</div>
                  <div class="connector-chip"><i class="ph-bold ph-envelope"></i> Outlook 365</div>
                  <div class="connector-chip"><i class="ph-bold ph-chats-circle"></i> Microsoft Teams</div>
                  <div class="connector-chip"><i class="ph-bold ph-google-logo"></i> Google Sheets</div>
                  <div class="connector-chip"><i class="ph-bold ph-globe"></i> Custom HTTP API</div>
                </div>
              </div>

              <h3>2. Tipos de Triggers: Polling vs Webhook</h3>
              <ul>
                <li><strong>Polling Triggers:</strong> El conector consulta al servicio cada cierto intervalo (ej. cada 3 minutos: <em>"¿Hay algún correo nuevo?"</em>). Si hay nuevos datos, inicia el flujo.</li>
                <li><strong>Webhook Triggers:</strong> El servicio externo notifica inmediatamente a Power Automate mediante un HTTP POST en cuanto ocurre el evento. Es instantáneo y consume menos recursos.</li>
              </ul>

              <h3>3. Contenido Dinámico (Dynamic Content)</h3>
              <p>Cada vez que una acción se completa, genera un payload JSON. Power Automate inspecciona este schema y expone cada propiedad como una ficha gráfica de "Contenido Dinámico". Al hacer clic en <code>Nombre</code> o <code>Correo</code>, el motor inserta por debajo la expresión WDL adecuada, por ejemplo: <code>outputs('Obtener_usuario')?['body/mail']</code>.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Qué es en realidad un 'Conector' dentro de la arquitectura de Power Automate?",
              options: [
                "Un cable de red virtual en Azure",
                "Un encapsulado (wrapper) basado en OpenAPI sobre la API REST de un servicio con gestión de autenticación",
                "Una base de datos relacional interna",
                "Un plugin escrito en C++ que se instala en el navegador"
              ],
              answer: 1,
              explanation: "Los conectores son wrappers sobre APIs REST documentadas con especificaciones OpenAPI que traducen acciones visuales a peticiones HTTP autenticadas."
            }
          ]
        },
        {
          id: "les-1-4",
          title: "1.4 El Puente del Desarrollador: Java / Spring Boot vs Power Automate",
          objective: "Mapear cada concepto de desarrollo backend tradicional a su homólogo en Power Automate para acelerar el dominio.",
          duration: "20 min",
          keyPoints: [
            "Trigger = Controller / @PostMapping / Event Listener.",
            "Apply to each = for-each loop.",
            "Condition = if / else block.",
            "Compose / Variable = Asignación y transformación de variables.",
            "Parse JSON = Jackson / DTO Deserialization."
          ],
          content: `
            <div class="lesson-section">
              <h3>La Tabla de Traducción Definitiva</h3>
              <p>Como desarrollador backend (por ejemplo en Java con Spring Boot), ya posees el 90% de la lógica necesaria. Solo debes aprender a mapear la sintaxis:</p>

              <div class="table-responsive">
                <table class="styled-table">
                  <thead>
                    <tr>
                      <th>Concepto en Java / Spring Boot</th>
                      <th>Concepto en Power Automate</th>
                      <th>Explicación Técnica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>@PostMapping("/webhook")</code></td>
                      <td><strong>When a HTTP request is received</strong></td>
                      <td>Punto de entrada que recibe un JSON y dispara la lógica.</td>
                    </tr>
                    <tr>
                      <td><code>if (x > 10) { ... } else { ... }</code></td>
                      <td><strong>Condition (Yes / No branches)</strong></td>
                      <td>Evaluación booleana de expresiones.</td>
                    </tr>
                    <tr>
                      <td><code>switch(tipo) { case A: ... }</code></td>
                      <td><strong>Switch action</strong></td>
                      <td>Bifurcación múltiple según el valor de una clave.</td>
                    </tr>
                    <tr>
                      <td><code>for (Item i : lista) { ... }</code></td>
                      <td><strong>Apply to each</strong></td>
                      <td>Iterador de colecciones o arrays JSON.</td>
                    </tr>
                    <tr>
                      <td><code>objectMapper.readValue(json, DTO.class)</code></td>
                      <td><strong>Parse JSON</strong></td>
                      <td>Valida el schema JSON y extrae tipado para uso dinámico.</td>
                    </tr>
                    <tr>
                      <td><code>try { ... } catch (Exception e) { ... }</code></td>
                      <td><strong>Scope (Try) + Scope (Catch con Configure Run After)</strong></td>
                      <td>Aislamiento de bloques y captura de fallos de acciones.</td>
                    </tr>
                    <tr>
                      <td><code>log.info("Mensaje: {}", id);</code></td>
                      <td><strong>Compose / Log a SharePoint/DB</strong></td>
                      <td>Inspección de valores y persistencia de auditoría.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `,
          quiz: [
            {
              question: "¿Qué acción de Power Automate cumple la misma función que la deserialización de un JSON a un DTO (como ObjectMapper en Jackson)?",
              options: [
                "Compose",
                "Parse JSON",
                "Apply to each",
                "HTTP Get"
              ],
              answer: 1,
              explanation: "Parse JSON toma una cadena o payload JSON en bruto, le aplica un JSON Schema y genera tokens de contenido dinámico fuertemente tipados, igual que un DTO en Java."
            }
          ]
        }
      ]
    },
    {
      id: "mod-2",
      title: "Módulo 2: Manipulación de Datos, Lógica y Expresiones",
      icon: "code",
      summary: "Domina variables, arrays, bucles for-each, condiciones, deserialización de JSON y expresiones WDL de fechas y cadenas.",
      lessons: [
        {
          id: "les-2-1",
          title: "2.1 Variables y la Acción 'Compose'",
          objective: "Comprender la diferencia crucial entre Variables y la acción Compose para optimizar el rendimiento de los flujos.",
          duration: "20 min",
          keyPoints: [
            "Las variables deben inicializarse en la raíz del flujo antes de usarse en bucles.",
            "`Compose` es inmutable y extremadamente rápida (ideal para cálculos intermedios).",
            "Usa variables solo cuando necesites mutabilidad (ej. acumuladores o contadores)."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Variables en Power Automate</h3>
              <p>Power Automate permite declarar variables con tipos estrictos: <code>Boolean</code>, <code>Integer</code>, <code>Float</code>, <code>String</code>, <code>Object</code> y <code>Array</code>.</p>
              <div class="callout callout-warning">
                <div class="callout-title"><i class="ph-bold ph-warning-circle"></i> Regla de Inicialización</div>
                <p>La acción <strong>Initialize variable</strong> solo puede colocarse en el nivel superior (raíz) del flujo. No puedes inicializar una variable dentro de una condición o dentro de un bucle; en esos casos, la inicializas arriba y luego usas <strong>Set variable</strong> o <strong>Increment variable</strong>.</p>
              </div>

              <h3>2. ¿Por qué 'Compose' suele ser mejor que una Variable?</h3>
              <p>La acción <strong>Compose (Redactar)</strong> toma una entrada (o expresión), la evalúa y guarda la salida de forma inmutable. A diferencia de las variables:</p>
              <ul>
                <li>No requiere inicialización previa.</li>
                <li>Se evalúa de manera instantánea en memoria sin bloquear concurrencia.</li>
                <li>Permite que los bucles <code>Apply to each</code> se ejecuten en paralelo sin condiciones de carrera (Race Conditions).</li>
              </ul>
            </div>
          `,
          quiz: [
            {
              question: "¿Dónde debe declararse obligatoriamente la acción 'Initialize variable' en un flujo?",
              options: [
                "Dentro del bucle Apply to each",
                "En la raíz o nivel superior del flujo",
                "Dentro del bloque Catch de un Scope",
                "En cualquier lugar sin restricciones"
              ],
              answer: 1,
              explanation: "Las variables en Power Automate solo pueden inicializarse a nivel raíz del flujo. Dentro de bloques condicionales o bucles solo se pueden modificar con Set o Increment."
            }
          ]
        },
        {
          id: "les-2-2",
          title: "2.2 Arrays y Bucles: Apply to Each",
          objective: "Dominar el procesamiento iterativo de colecciones de datos y el control de concurrencia en bucles.",
          duration: "25 min",
          keyPoints: [
            "`Apply to each` itera sobre una lista de objetos JSON.",
            "Por defecto se ejecuta de forma secuencial (1 por 1) o paralela (hasta 50 hilos).",
            "Ten cuidado con variables mutables dentro de bucles paralelos."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. El bucle for-each visual</h3>
              <p>Cuando una acción devuelve un array (por ejemplo, <em>List rows present in a table</em> de Excel o una consulta SQL), <strong>Apply to each</strong> se encarga de ejecutar un bloque de acciones para cada elemento.</p>
              
              <div class="code-box">
                <div class="code-header"><i class="ph-bold ph-brackets-curly"></i> Ejemplo de Array de Entrada</div>
                <pre><code class="language-json">[
  { "id": 101, "cliente": "Empresa A", "monto": 450.0 },
  { "id": 102, "cliente": "Empresa B", "monto": 1200.0 }
]</code></pre>
              </div>

              <h3>2. Concurrencia en Bucles (Concurrency Control)</h3>
              <p>En la configuración (<em>Settings</em>) de un <code>Apply to each</code>, puedes activar <strong>Concurrency Control</strong>:</p>
              <ul>
                <li><strong>Secuencial (Grado 1):</strong> Procesa un registro tras otro. Es indispensable si estás escribiendo en una misma hoja de Google Sheets o actualizando una variable acumuladora para evitar colisiones.</li>
                <li><strong>Paralelo (Grado hasta 50):</strong> Procesa múltiples registros simultáneamente. Ideal para enviar 200 correos independientes rápidamente.</li>
              </ul>
            </div>
          `,
          quiz: [
            {
              question: "Si dentro de un Apply to each estás sumando valores a una variable acumuladora global, ¿cómo debes configurar la concurrencia?",
              options: [
                "Al máximo nivel (50 hilos) para que sea instantáneo",
                "Desactivar concurrencia o fijarla en Grado 1 (secuencial) para evitar condiciones de carrera",
                "Cambiar la variable por un archivo de texto",
                "Eliminar el bucle"
              ],
              answer: 1,
              explanation: "Si múltiples hilos intentan mutar una misma variable simultáneamente se producen inconsistencias por condiciones de carrera (race conditions). Debe ser secuencial."
            }
          ]
        },
        {
          id: "les-2-3",
          title: "2.3 Condiciones (If/Else) y Control de Flujo con Switch",
          objective: "Implementar lógica condicional compleja, operadores lógicos y bifurcaciones limpias.",
          duration: "20 min",
          keyPoints: [
            "Las Condiciones ofrecen ramas Yes/No con operadores lógicos (AND / OR).",
            "El Switch permite bifurcaciones múltiples limpias según un valor clave.",
            "Evita anidar más de 3 condiciones para mantener la legibilidad."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Condition (If / Else)</h3>
              <p>Permite comparar valores mediante operadores estándar: <em>is equal to</em>, <em>is greater than</em>, <em>contains</em>, <em>starts with</em>, etc. Puedes combinar varias reglas con <strong>AND</strong> (deben cumplirse todas) o <strong>OR</strong> (basta con que se cumpla una).</p>

              <h3>2. Switch para múltiples casos</h3>
              <p>Cuando tienes una variable como <code>EstadoSolicitud</code> que puede ser 'COMPRA', 'VACACIONES', 'SOPORTE' o 'VIAJE', anidar condiciones 'If' genera un árbol ilegible. Un <strong>Switch</strong> evalúa la expresión una sola vez y bifurca al caso correspondiente de forma limpia.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Cuándo es preferible utilizar un Switch en lugar de múltiples acciones Condition anidadas?",
              options: [
                "Solo cuando trabajas con números enteros",
                "Cuando una misma variable puede tomar múltiples valores discretos conocidos y quieres bifurcar limpiamente",
                "Cuando no tienes conexión a internet",
                "Cuando el flujo tiene más de 100 pasos"
              ],
              answer: 1,
              explanation: "El Switch simplifica el mantenimiento cuando se evalúan múltiples valores conocidos para un mismo campo, evitando ramas if-else profundamente anidadas."
            }
          ]
        },
        {
          id: "les-2-4",
          title: "2.4 Manejo de JSON, Schemas y 'Parse JSON'",
          objective: "Dominar la deserialización de payloads complejos y la generación automática de Schemas.",
          duration: "30 min",
          keyPoints: [
            "JSON es el lenguaje nativo con el que dialogan todas las acciones de Power Automate.",
            "`Parse JSON` toma un string y crea tokens dinámicos listos para arrastrar y soltar.",
            "Usa 'Generate from sample' con un payload de prueba para crear el schema automáticamente."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. La importancia de 'Parse JSON'</h3>
              <p>Cuando consumes una API REST con HTTP o recibes un Webhook de Spring Boot, el cuerpo (Body) llega como un objeto plano. Para que Power Automate te muestre botones visuales como <code>cliente.nombre</code> o <code>cliente.email</code>, debes usar <strong>Parse JSON</strong>.</p>

              <div class="code-box">
                <div class="code-header"><i class="ph-bold ph-brackets-curly"></i> Payload de Ejemplo (Spring Boot - Cita Médica)</div>
                <pre><code class="language-json">{
  "idCita": 1042,
  "paciente": "Max",
  "dueno": "Luis Martínez",
  "correo": "luis@ejemplo.com",
  "fechaHora": "2026-10-10T15:30:00Z",
  "servicios": ["Vacunación", "Control General"],
  "costoTotal": 85000.0
}</code></pre>
              </div>

              <h3>2. Generación del Schema</h3>
              <p>En la acción <em>Parse JSON</em>, haz clic en <strong>Generate from sample</strong>, pega el JSON anterior y Power Automate creará el JSON Schema con sus tipos (integer, string, array, number). A partir de ese paso, todas las propiedades estarán disponibles como Contenido Dinámico.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Cómo se genera de forma rápida y sin errores el JSON Schema en la acción Parse JSON?",
              options: [
                "Escribiendo el esquema a mano en XML",
                "Usando la opción 'Generate from sample' y pegando un JSON real de prueba",
                "Descargándolo de la tienda de Microsoft",
                "No es necesario generar schema"
              ],
              answer: 1,
              explanation: "El botón 'Generate from sample' infiere automáticamente las propiedades y sus tipos de datos a partir de una carga útil JSON de muestra."
            }
          ]
        },
        {
          id: "les-2-5",
          title: "2.5 Expresiones WDL: Fechas, Texto y Cálculos",
          objective: "Escribir expresiones avanzadas para transformar cadenas, formatear fechas y realizar validaciones lógicas.",
          duration: "30 min",
          keyPoints: [
            "Power Automate utiliza el lenguaje de expresiones Workflow Definition Language (WDL).",
            "Fechas: `utcNow()`, `formatDateTime()`, `addDays()`, `convertTimeZone()`.",
            "Texto: `concat()`, `split()`, `replace()`, `toUpper()`, `coalesce()`."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. ¿Qué es WDL?</h3>
              <p>Cuando el contenido dinámico no es suficiente y necesitas manipular datos sobre la marcha, recurres a la pestaña <strong>Expression</strong>. Estas funciones se ejecutan en tiempo real en el motor de flujo.</p>

              <h3>2. Funciones de Fecha más utilizadas</h3>
              <div class="table-responsive">
                <table class="styled-table">
                  <thead>
                    <tr>
                      <th>Expresión</th>
                      <th>Resultado / Propósito</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>utcNow()</code></td>
                      <td>Devuelve la fecha y hora actual en UTC: <code>2026-10-08T19:00:00Z</code></td>
                    </tr>
                    <tr>
                      <td><code>formatDateTime(utcNow(), 'dd/MM/yyyy')</code></td>
                      <td>Formatea a formato local legible: <code>08/10/2026</code></td>
                    </tr>
                    <tr>
                      <td><code>addDays(utcNow(), 7, 'yyyy-MM-dd')</code></td>
                      <td>Suma 7 días a la fecha actual para vencimientos.</td>
                    </tr>
                    <tr>
                      <td><code>convertTimeZone(utcNow(), 'UTC', 'SA Pacific Standard Time')</code></td>
                      <td>Convierte la hora de UTC a la zona horaria de Colombia/Bogotá.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>3. Funciones de Texto y Manejo de Nulos</h3>
              <ul>
                <li><code>concat('ID-', triggerBody()?['id'], '-PROD')</code>: Concatena cadenas de forma segura.</li>
                <li><code>coalesce(variables('telefono'), 'No suministrado')</code>: Devuelve el primer valor no nulo (como el operador <code>?:</code> o <code>Optional.orElse</code>).</li>
                <li><code>length(body('Parse_JSON')?['items'])</code>: Obtiene la cantidad de elementos en un array.</li>
              </ul>
            </div>
          `,
          quiz: [
            {
              question: "¿Qué función WDL debes usar si quieres formatear una fecha al formato 'día/mes/año'?",
              options: [
                "dateToString(fecha)",
                "formatDateTime(fecha, 'dd/MM/yyyy')",
                "convertDate(fecha, 'ES')",
                "dateParser(fecha)"
              ],
              answer: 1,
              explanation: "formatDateTime() es la función estándar de WDL para dar formato a strings de fecha y hora según los especificadores estándar de .NET."
            }
          ]
        }
      ]
    },
    {
      id: "mod-3",
      title: "Módulo 3: Automatización con el Ecosistema Microsoft 365",
      icon: "microsoft-excel-logo",
      summary: "Aprende a integrar Excel Online (Business), listas de SharePoint, Microsoft Forms, Outlook y el sistema de Aprobaciones corporativas.",
      lessons: [
        {
          id: "les-3-1",
          title: "3.1 Excel Online (Business): Operaciones y Límites",
          objective: "Manipular libros de Excel corporativos de forma profesional, comprendiendo la obligatoriedad de Tablas y la paginación.",
          duration: "30 min",
          keyPoints: [
            "Power Automate exige que los datos estén en una TABLA oficial de Excel (no rango libre).",
            "Operaciones clave: Add row, Update row, Get row, List rows present in a table.",
            "List rows devuelve 256 filas por defecto; activa paginación para hasta 5,000.",
            "Excel NO es una base de datos relacional para millones de registros."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. La Regla de Oro de Excel Online</h3>
              <p>No puedes simplemente indicarle a Power Automate que escriba en la celda <code>C14</code>. El conector <strong>Excel Online (Business)</strong> requiere obligatoriamente que tus datos pertenezcan a una <strong>Tabla con Nombre</strong> (creada con <em>Ctrl + T</em> en Excel, ej. <code>TablaSolicitudes</code>).</p>

              <h3>2. Las 4 Operaciones Fundamentales</h3>
              <div class="cards-grid-2">
                <div class="info-card">
                  <h4><i class="ph-bold ph-plus-circle"></i> Add a row into a table</h4>
                  <p>Inserta una nueva fila al final de la tabla. Mapea directamente cada columna con contenido dinámico.</p>
                </div>
                <div class="info-card">
                  <h4><i class="ph-bold ph-pencil-simple"></i> Update a row</h4>
                  <p>Busca una fila usando una <em>Key Column</em> (ej. <code>ID</code>) y un <em>Key Value</em> para actualizar campos específicos.</p>
                </div>
                <div class="info-card">
                  <h4><i class="ph-bold ph-magnifying-glass"></i> Get a row</h4>
                  <p>Recupera un registro individual por su identificador único para procesar sus datos en pasos posteriores.</p>
                </div>
                <div class="info-card">
                  <h4><i class="ph-bold ph-list-dashes"></i> List rows present in a table</h4>
                  <p>Obtiene una lista de filas. <strong>Límite:</strong> 256 filas por defecto. En Settings → Pagination puedes subir el límite hasta 5,000.</p>
                </div>
              </div>

              <div class="callout callout-danger">
                <div class="callout-title"><i class="ph-bold ph-shield-warning"></i> Advertencia de Arquitectura</div>
                <p>Excel Online está pensado para procesos administrativos, pequeñas listas y reportes. Si necesitas concurrencia masiva, bloqueos transaccionales o más de 100,000 registros, debes migrar a <strong>SharePoint Lists</strong>, <strong>Dataverse</strong> o <strong>Azure SQL / PostgreSQL</strong>.</p>
              </div>
            </div>
          `,
          quiz: [
            {
              question: "¿Por qué un flujo de Power Automate falla al intentar agregar datos en un archivo Excel nuevo que solo tiene celdas normales?",
              options: [
                "Porque Excel requiere licencia de Office 2010",
                "Porque los datos deben estar estructurados dentro de una Tabla oficial de Excel (Insertar → Tabla)",
                "Porque el archivo debe estar en formato PDF",
                "Porque Power Automate solo lee archivos de Google"
              ],
              answer: 1,
              explanation: "El conector de Excel Online solo puede interactuar con datos formateados explícitamente como una Tabla con nombre."
            }
          ]
        },
        {
          id: "les-3-2",
          title: "3.2 Outlook y Teams: Notificaciones Corporativas",
          objective: "Enviar correos HTML interactivos y publicar tarjetas adaptativas en canales de Microsoft Teams.",
          duration: "20 min",
          keyPoints: [
            "Conector Office 365 Outlook: correos HTML con formato y adjuntos dinámicos.",
            "Conector Microsoft Teams: mensajes en canales, chats 1 a 1 y Adaptive Cards interactivas.",
            "Separa notificaciones críticas (Teams) de confirmaciones formales (Correo)."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Notificaciones Profesionales por Correo</h3>
              <p>La acción <strong>Send an email (V2)</strong> permite construir mensajes HTML enriquecidos con estilos inline, tablas formateadas, enlaces directos a las solicitudes y archivos adjuntos extraídos de SharePoint o generados al vuelo.</p>

              <h3>2. Alertas en Tiempo Real en Microsoft Teams</h3>
              <p>Puedes automatizar el envío de mensajes a canales de soporte o gerencia utilizando:</p>
              <ul>
                <li><strong>Post message in a chat or channel:</strong> Publica mensajes de alerta cuando una solicitud supera cierto monto.</li>
                <li><strong>Adaptive Cards:</strong> Tarjetas interactivas en formato JSON con botones que permiten al usuario responder o aprobar sin salir de Teams.</li>
              </ul>
            </div>
          `,
          quiz: [
            {
              question: "¿Cuál es la mejor práctica para alertar inmediatamente a un equipo de guardia sobre una solicitud urgente?",
              options: [
                "Guardar un archivo de texto en OneDrive",
                "Publicar un mensaje o Adaptive Card directamente en el canal correspondiente de Teams",
                "Imprimir un documento en red",
                "Crear una nueva fila en Google Drive"
              ],
              answer: 1,
              explanation: "Publicar en un canal de Teams con una Adaptive Card permite visibilidad instantánea y acción inmediata por parte del equipo."
            }
          ]
        },
        {
          id: "les-3-3",
          title: "3.3 SharePoint Lists & Microsoft Forms",
          objective: "Utilizar SharePoint como almacenamiento estructurado y Forms como disparador de recolección de datos.",
          duration: "25 min",
          keyPoints: [
            "Microsoft Forms dispara el flujo con el evento 'When a new response is submitted'.",
            "SharePoint Lists es más robusto y rápido que Excel para almacenar solicitudes intermedias.",
            "Permite control de versiones, permisos a nivel de fila y campos tipados (Fecha, Moneda, Opción)."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. El Combo Estándar Empresarial</h3>
              <p>Una de las arquitecturas más repetidas en corporaciones es:</p>
              <div class="flow-diagram-mini">
                <span class="flow-step trigger">Microsoft Forms</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step action">Power Automate</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step action">SharePoint List</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step result">Outlook / Teams</span>
              </div>

              <h3>2. Pasos para capturar datos de Forms</h3>
              <ol>
                <li><strong>Trigger:</strong> <em>When a new response is submitted</em> (captura el ID de respuesta).</li>
                <li><strong>Acción obligatoria:</strong> <em>Get response details</em> (recupera las respuestas reales del usuario usando el Response ID).</li>
                <li><strong>Acción de guardado:</strong> <em>Create item</em> en SharePoint List.</li>
              </ol>
            </div>
          `,
          quiz: [
            {
              question: "Después del trigger 'When a new response is submitted' de Forms, ¿qué acción es obligatoria para leer lo que escribió el usuario?",
              options: [
                "Send email",
                "Get response details",
                "Delete response",
                "Parse JSON"
              ],
              answer: 1,
              explanation: "El trigger solo devuelve el ID de la respuesta; para obtener los textos y opciones marcadas por el usuario es necesario ejecutar la acción 'Get response details'."
            }
          ]
        },
        {
          id: "les-3-4",
          title: "3.4 Flujos de Aprobación Corporativos (Approvals)",
          objective: "Implementar circuitos de aprobación humana con seguimiento de respuestas, comentarios y auditoría.",
          duration: "25 min",
          keyPoints: [
            "Acción 'Start and wait for an approval' pausa el flujo hasta que el responsable responde.",
            "El aprobador puede responder desde Outlook, Teams o el portal de Power Automate.",
            "Tipos: First to respond (primero en responder) o Everyone must approve (consenso unánime)."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. ¿Cómo funcionan las Aprobaciones?</h3>
              <p>Power Automate incluye un motor nativo de aprobaciones. Cuando ejecutas <strong>Start and wait for an approval</strong>, el flujo entra en estado de suspensión (sin consumir tiempo de cómputo activo) y despacha una tarjeta interactiva al aprobador.</p>

              <h3>2. Estructura de Decisión Posterior</h3>
              <p>Una vez que el usuario hace clic en <strong>Approve</strong> o <strong>Reject</strong>, el flujo se reanuda y entrega variables como <code>Outcome</code> y <code>Responses Comments</code>. Con una condición <code>Outcome is equal to 'Approve'</code> decides si actualizas el estado en la base de datos o envías una notificación de rechazo.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Qué ocurre con el flujo mientras el gerente aún no ha respondido a la aprobación?",
              options: [
                "El flujo falla por timeout a los 5 segundos",
                "El flujo se suspende esperando la respuesta sin consumir recursos activos y se reanuda al responder",
                "El flujo se cancela automáticamente",
                "Se envían 100 correos de spam por minuto"
              ],
              answer: 1,
              explanation: "El flujo queda en estado de espera (Waiting) hasta que se reciba la respuesta del aprobador o expire el tiempo límite de aprobación (hasta 30 días)."
            }
          ]
        }
      ]
    },
    {
      id: "mod-4",
      title: "Módulo 4: Integración Externa, Google Workspace y APIs REST",
      icon: "globe",
      summary: "Conecta Power Automate con Google Sheets, consume APIs REST con HTTP, gestiona autenticación y conecta tu backend Spring Boot.",
      lessons: [
        {
          id: "les-4-1",
          title: "4.1 Google Workspace (Sheets, Drive, Gmail)",
          objective: "Integrar hojas de cálculo y servicios de Google gestionando sus peculiaridades y límites de concurrencia.",
          duration: "25 min",
          keyPoints: [
            "Conector oficial de Google Sheets para insertar, leer y actualizar registros.",
            "Limitaciones críticas: problemas con escrituras simultáneas y bloqueos de edición manual.",
            "Hojas compartidas: si no aparecen en el dropdown, usa 'Custom value' con el ID extraído de la URL."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Integración Google Sheets ↔ Power Automate</h3>
              <p>Muchas empresas combinan el ecosistema Microsoft con Google Workspace. El conector de Google Sheets permite disparar flujos ante nuevas filas o insertar datos desde formularios de Microsoft.</p>

              <div class="callout callout-warning">
                <div class="callout-title"><i class="ph-bold ph-shield-warning"></i> Concurrencia y Bloqueos en Google Sheets</div>
                <p>Google Sheets no gestiona bien múltiples llamadas de escritura paralelas desde flujos concurrentes, pudiendo provocar filas sobreescritas. En flujos de alto tráfico hacia Google Sheets, <strong>fija la concurrencia del bucle en 1 (Secuencial)</strong>.</p>
              </div>

              <h3>2. Obtención del File ID en Google Drive</h3>
              <p>Si una hoja compartida no aparece en el selector, copia el identificador de la URL:</p>
              <code>https://docs.google.com/spreadsheets/d/<strong>1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms</strong>/edit</code>
              <p>Pega esa cadena en el campo como <em>Enter custom value</em>.</p>
            </div>
          `,
          quiz: [
            {
              question: "Si una hoja de Google Sheets compartida en una unidad de equipo no aparece en la lista desplegable de Power Automate, ¿cómo se soluciona?",
              options: [
                "No es posible conectarla",
                "Seleccionando 'Enter custom value' y pegando el ID de la hoja extraído de su URL",
                "Reinstalando Windows",
                "Cambiando el nombre del archivo a Excel"
              ],
              answer: 1,
              explanation: "Pegar el File ID extraído de la URL como valor personalizado permite acceder a cualquier hoja compartida con los permisos de la conexión."
            }
          ]
        },
        {
          id: "les-4-2",
          title: "4.2 Conector HTTP y Consumo de APIs REST",
          objective: "Realizar peticiones HTTP (GET, POST, PUT, DELETE), configurar Headers, autenticación y entender conectores Premium.",
          duration: "30 min",
          keyPoints: [
            "La acción HTTP permite conectarse a cualquier servicio REST del mundo.",
            "Soporta autenticación Básica, API Key, Certificados y Microsoft Entra ID (OAuth2).",
            "El conector HTTP es considerado conector Premium en la mayoría de entornos corporativos."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. La Acción HTTP: Poder Ilimitado de Integración</h3>
              <p>Como desarrollador backend, la acción <strong>HTTP</strong> es tu herramienta más potente. Te permite llamar a cualquier microservicio o API externa:</p>

              <div class="code-box">
                <div class="code-header"><i class="ph-bold ph-paper-plane-tilt"></i> Configuración de Petición HTTP</div>
                <pre><code class="language-plaintext">Method: POST
URI: https://api.miempresa.com/v1/notificaciones
Headers:
  Content-Type: application/json
  Authorization: Bearer @{variables('TokenJwt')}
Body:
{
  "usuarioId": @{triggerBody()?['id']},
  "evento": "SOLICITUD_PROCESADA",
  "timestamp": "@{utcNow()}"
}</code></pre>
              </div>

              <h3>2. Conectores Premium y Licenciamiento</h3>
              <p>Las acciones HTTP genéricas y conectores avanzados a bases de datos directas (SQL Server on-premise) requieren licencia <em>Power Automate Premium</em> (o por usuario/por flujo). Siempre valida con el equipo de TI el tipo de licencia disponible antes de diseñar una solución basada en HTTP directo.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Qué tipo de autenticación admite el conector HTTP para comunicarse de forma segura con APIs empresariales?",
              options: [
                "Solo contraseñas en texto plano",
                "Basic Auth, API Keys, Certificados de cliente y OAuth 2.0 / Microsoft Entra ID",
                "Ninguna, solo peticiones públicas",
                "Únicamente Bluetooth"
              ],
              answer: 1,
              explanation: "El conector HTTP ofrece soporte completo para esquemas de autenticación estándar de la industria, incluyendo Microsoft Entra ID / OAuth 2.0."
            }
          ]
        },
        {
          id: "les-4-3",
          title: "4.3 Arquitectura Webhook con Spring Boot (Caso ClínicaApp)",
          objective: "Diseñar una integración bidireccional entre un backend Spring Boot y Power Automate mediante Webhooks y JSON.",
          duration: "35 min",
          keyPoints: [
            "Spring Boot emite un evento vía RestTemplate o WebClient hacia la URL del Trigger HTTP.",
            "Power Automate procesa el evento, notifica a los veterinarios/clientes y actualiza registros.",
            "Ventaja: desacopla el core de la aplicación del canal de mensajería y automatizaciones."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Arquitectura de Integración: ClínicaApp</h3>
              <p>Imagina tu aplicación <strong>ClínicaApp</strong> desarrollada en Spring Boot con MongoDB. Cuando un paciente agenda una cita médica, no quieres recargar tu servidor con lógica de envío masivo de correos, generación de tareas en Teams o sincronización en hojas de cálculo.</p>

              <div class="code-compare-grid">
                <div class="code-box">
                  <div class="code-header"><i class="ph-bold ph-leaf"></i> Spring Boot (Service)</div>
                  <pre><code class="language-java">@Service
public class CitaNotificationService {
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("\${powerautomate.webhook.cita-creada}")
    private String powerAutomateUrl;

    public void notificarCitaCreada(Cita cita) {
        CitaEventDto payload = new CitaEventDto(
            cita.getId(),
            cita.getCliente().getNombre(),
            cita.getCliente().getEmail(),
            cita.getMascota().getNombre(),
            cita.getFechaHora().toString()
        );
        // Despacho asíncrono al Webhook
        restTemplate.postForEntity(powerAutomateUrl, payload, Void.class);
    }
}</code></pre>
                </div>
                <div class="code-box">
                  <div class="code-header"><i class="ph-bold ph-flow-arrow"></i> Flujo en Power Automate</div>
                  <pre><code class="language-plaintext">[TRIGGER: When an HTTP request is received]
       ↓
[ACTION: Parse JSON (Schema CitaEventDto)]
       ↓
[ACTION: Send Email al Dueño (Confirmación)]
       ↓
[ACTION: Post Adaptive Card en Teams (Canal Veterinarios)]
       ↓
[ACTION: Add row into Excel / SharePoint (Auditoría)]
       ↓
[ACTION: Response 200 OK]</code></pre>
                </div>
              </div>

              <h3>2. Beneficio Arquitectural</h3>
              <p>Si el día de mañana la clínica decide que además quieren enviar un mensaje por WhatsApp o crear una tarea en Planner, <strong>no tienes que recompilar ni redesplegar Spring Boot</strong>: simplemente agregas una acción en el flujo de Power Automate.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Cuál es la principal ventaja arquitectural de disparar Power Automate vía Webhook desde Spring Boot en lugar de programar todos los envíos dentro de Java?",
              options: [
                "Que Java se vuelve obsoleto",
                "Desacoplar la lógica de negocio de los canales de notificación, permitiendo cambiar destinos sin redesplegar el backend",
                "Evitar usar bases de datos",
                "Reducir la memoria RAM a 0 MB"
              ],
              answer: 1,
              explanation: "El desacoplamiento permite que los canales de comunicación y automatizaciones evolucionen de forma independiente sin tocar el código fuente del microservicio."
            }
          ]
        }
      ]
    },
    {
      id: "mod-5",
      title: "Módulo 5: Arquitectura Empresarial, Resiliencia y Seguridad",
      icon: "shield-check",
      summary: "Patrones avanzados de Try/Catch con Scopes, prevención de duplicados (Idempotencia), paginación, throttling, secretos y gobernanza de ambientes.",
      lessons: [
        {
          id: "les-5-1",
          title: "5.1 Manejo Profesional de Errores: Try / Catch con Scopes",
          objective: "Implementar bloques estructurados de captura de fallos, configuración de 'Run After' y registro de alertas automáticas.",
          duration: "30 min",
          keyPoints: [
            "Usa acciones 'Scope' para agrupar pasos en bloques lógicos: Scope_Try, Scope_Catch, Scope_Finally.",
            "Configura 'Configure run after' en el Scope_Catch para que se ejecute si el Try falla (has failed, timed out).",
            "Notifica al equipo de soporte con el Run ID y el motivo exacto del fallo."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. El Patrón Scope Try / Catch</h3>
              <p>En flujos profesionales nunca dejes que un fallo en un conector externo (ej. Excel bloqueado o API caída) interrumpa el flujo de forma silenciosa. Se utiliza el patrón de <strong>Scopes</strong>:</p>

              <div class="flow-diagram-mini">
                <span class="flow-step action">SCOPE: Try (Proceso Principal)</span>
                <span class="flow-arrow">⚡ Si falla</span>
                <span class="flow-step condition">SCOPE: Catch (Log + Alerta Teams)</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step result">SCOPE: Finally (Limpieza)</span>
              </div>

              <h3>2. Cómo configurar 'Configure run after'</h3>
              <ol>
                <li>Crea un Scope llamado <code>Scope_Procesar</code> (Try) y dentro coloca tus acciones de negocio.</li>
                <li>Crea un segundo Scope llamado <code>Scope_ManejoErrores</code> (Catch).</li>
                <li>Haz clic en los tres puntos (...) de <code>Scope_ManejoErrores</code> → <strong>Configure run after</strong>.</li>
                <li>Desmarca <em>is successful</em> y marca <strong>has failed</strong>, <strong>is skipped</strong> y <strong>has timed out</strong>.</li>
                <li>Dentro del Catch, extrae los detalles con la función <code>result('Scope_Procesar')</code> y envía una alerta a Teams con el enlace directo a la ejecución fallida.</li>
              </ol>
            </div>
          `,
          quiz: [
            {
              question: "Para que un Scope 'Catch' se ejecute únicamente cuando el Scope 'Try' principal sufra un error, ¿qué configuración se debe aplicar en 'Configure run after'?",
              options: [
                "Dejar únicamente marcado 'is successful'",
                "Desmarcar 'is successful' y marcar 'has failed' y 'has timed out'",
                "Eliminar el trigger",
                "Poner una condición de texto"
              ],
              answer: 1,
              explanation: "Configurar el run after para ejecutarse en 'has failed' o 'has timed out' asegura que el bloque Catch capture los fallos exactamente como un bloque try-catch en Java."
            }
          ]
        },
        {
          id: "les-5-2",
          title: "5.2 Idempotencia, Duplicados, Paginación y Throttling",
          objective: "Proteger los flujos contra ejecuciones duplicadas, saturación de límites de API (Throttling) y límites de paginación.",
          duration: "30 min",
          keyPoints: [
            "Idempotencia: garantizar que procesar el mismo mensaje dos veces no duplique registros.",
            "Estrategia de deduplicación: verificar si el ID único ya existe antes de insertar.",
            "Throttling (Límites 429): configurar políticas de Retry exponencial en los conectores."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Prevención de Duplicados (Idempotencia)</h3>
              <p>Un usuario puede pulsar dos veces el botón de enviar o una API puede reintentar un Webhook. Para evitar registrar dos veces el mismo pago o cita:</p>
              <ol>
                <li>Usa un identificador de idempotencia (ej. <code>idTransaccion</code> o <code>idSolicitud</code>).</li>
                <li>Antes de insertar, realiza una búsqueda previa (<em>Filter Query</em>).</li>
                <li>Si el registro ya existe, omite la creación y devuelve el estado actual sin duplicar.</li>
              </ol>

              <h3>2. Throttling y Códigos HTTP 429</h3>
              <p>Si un flujo envía 10,000 peticiones en 1 minuto a Excel o a una API REST, el servicio responderá con <strong>HTTP 429 Too Many Requests</strong>. En los Settings de cada acción, verifica la <strong>Retry Policy</strong> (Exponential Interval) para que Power Automate espere progresivamente antes de reintentar.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Cómo se previene la duplicación de registros cuando un usuario envía un formulario dos veces consecutivas?",
              options: [
                "Borrando la base de datos",
                "Buscando primero si ya existe un registro con ese ID único y abortando la inserción si se encuentra",
                "Apagando el flujo por 10 minutos",
                "Cambiando el nombre del usuario"
              ],
              answer: 1,
              explanation: "El patrón de verificación previa mediante un ID único garantiza la idempotencia del proceso, evitando inserciones duplicadas."
            }
          ]
        },
        {
          id: "les-5-3",
          title: "5.3 Seguridad, Conexiones, Secretos y Ambientes (ALM)",
          objective: "Aplicar principios de seguridad empresarial, nunca quemar credenciales en texto plano y gestionar ambientes DEV/TEST/PROD.",
          duration: "25 min",
          keyPoints: [
            "Nunca expongas passwords o API Keys en acciones Compose o texto plano.",
            "Usa Azure Key Vault o Secure Inputs/Outputs en la configuración de la acción.",
            "Usa Soluciones (Solutions) y Variables de Entorno para mover flujos entre DEV, TEST y PROD."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Seguridad de Credenciales y Ocultamiento de Salidas</h3>
              <p>Cualquier persona con permisos de lectura en el historial de ejecuciones podría ver lo que viaja por los pasos. En las acciones sensibles (como HTTP o autenticación), activa en <em>Settings</em>:</p>
              <ul>
                <li><strong>Secure Inputs:</strong> Oculta los datos de entrada en el historial de ejecución.</li>
                <li><strong>Secure Outputs:</strong> Oculta las respuestas para que no se filtren contraseñas o tokens.</li>
              </ul>

              <h3>2. Gobernanza de Ambientes (DEV / TEST / PROD)</h3>
              <p>En organizaciones formales nunca se edita un flujo directamente en Producción. Los flujos se crean dentro de <strong>Solutions (Soluciones)</strong> y utilizan <strong>Environment Variables (Variables de Entorno)</strong> para almacenar URLs de endpoints y nombres de SharePoint según el ambiente.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Qué característica de configuración en una acción evita que un token o contraseña aparezca en el historial de ejecuciones visible?",
              options: [
                "Secure Inputs / Secure Outputs",
                "Concurrency Control",
                "Retry Policy",
                "Pagination"
              ],
              answer: 0,
              explanation: "Al activar Secure Inputs y Secure Outputs, Power Automate enmascara el contenido en el historial de ejecución con asteriscos, protegiendo datos confidenciales."
            }
          ]
        },
        {
          id: "les-5-4",
          title: "5.4 Naming Conventions y las 10 Preguntas de Oro",
          objective: "Aplicar estándares de código limpio a flujos y dominar la metodología para analizar cualquier requerimiento empresarial.",
          duration: "20 min",
          keyPoints: [
            "Nunca dejes nombres por defecto como 'Compose 1' o 'Condition 3'.",
            "Usa nomenclatura estándar: PA - [Área] - [Verbo] [Entidad].",
            "Aplica siempre las 10 Preguntas de Oro antes de agregar la primera acción."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Convención de Nomenclatura Profesional</h3>
              <p>Un flujo profesional debe ser autoexplicativo para cualquier miembro del equipo:</p>
              <div class="table-responsive">
                <table class="styled-table">
                  <thead>
                    <tr>
                      <th>Tipo de Elemento</th>
                      <th>Nombre Incorrecto ❌</th>
                      <th>Nombre Profesional Recomendado ✔️</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Nombre de Flujo</strong></td>
                      <td>Flujo 1 / Prueba final 2</td>
                      <td><code>PA - RRHH - Procesar Aprobacion Vacaciones</code></td>
                    </tr>
                    <tr>
                      <td><strong>Acción Compose</strong></td>
                      <td>Compose 2</td>
                      <td><code>Formatear Fecha Notificacion</code></td>
                    </tr>
                    <tr>
                      <td><strong>Condición</strong></td>
                      <td>Condition</td>
                      <td><code>Validar si Monto Supera Limite Gerencial</code></td>
                    </tr>
                    <tr>
                      <td><strong>Variable</strong></td>
                      <td>var1</td>
                      <td><code>varTotalCalculadoPresupuesto</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>2. Las 10 Preguntas de Oro del Arquitecto</h3>
              <ol>
                <li><strong>¿Qué inicia el proceso?</strong> (Trigger, evento o cron).</li>
                <li><strong>¿Qué información recibimos y con qué schema?</strong></li>
                <li><strong>¿Dónde está almacenada la información maestra?</strong></li>
                <li><strong>¿Qué validaciones de negocio existen?</strong></li>
                <li><strong>¿Quién o quiénes deben aprobar?</strong></li>
                <li><strong>¿Qué sucede si se aprueba?</strong></li>
                <li><strong>¿Qué sucede si se rechaza?</strong></li>
                <li><strong>¿Dónde se persiste el resultado final?</strong></li>
                <li><strong>¿Quién debe ser notificado y por qué canal?</strong></li>
                <li><strong>¿Qué ocurre si falla un servicio intermedio?</strong> (Estrategia de rollback/alerta).</li>
              </ol>
            </div>
          `,
          quiz: [
            {
              question: "Antes de comenzar a arrastrar acciones en Power Automate para un nuevo proyecto empresarial, ¿cuál es el primer paso profesional?",
              options: [
                "Crear 10 variables al azar",
                "Responder las 10 preguntas de diseño arquitectural (Trigger, datos, validaciones, aprobaciones, fallos)",
                "Publicar el flujo en producción",
                "Comprar más licencias"
              ],
              answer: 1,
              explanation: "El análisis estructurado previo de requerimientos, entradas, salidas, caminos de fallo y destinos garantiza flujos mantenibles y sin deuda técnica."
            }
          ]
        }
      ]
    },
    {
      id: "mod-6",
      title: "Módulo 6: Proyectos Guiados & Simulador de Entrevistas",
      icon: "briefcase",
      summary: "Casos prácticos de extremo a extremo, integración con ClínicaApp y simulador de preguntas de entrevista técnica.",
      lessons: [
        {
          id: "les-6-1",
          title: "6.1 Proyecto 1: Sistema de Solicitudes y Alertas en Excel",
          objective: "Construir un flujo completo que liste solicitudes pendientes en Excel, filtre registros y despache correos personalizados.",
          duration: "35 min",
          keyPoints: [
            "Estructuración de `Solicitudes.xlsx` con tabla formal.",
            "List rows con OData filter (`Estado eq 'Pendiente'`).",
            "Apply to each para enviar correos y actualizar estado a 'Procesado'."
          ],
          content: `
            <div class="lesson-section">
              <h3>Objetivo del Proyecto</h3>
              <p>Construir un flujo que automatice la revisión periódica de una hoja de Excel corporativa para notificar a los solicitantes sobre sus trámites pendientes.</p>
              
              <h3>Arquitectura Paso a Paso</h3>
              <ol>
                <li><strong>Estructura en OneDrive:</strong> Archivo <code>Solicitudes.xlsx</code> con tabla <code>TablaSolicitudes</code> (Columnas: ID, Empleado, Correo, Solicitud, Monto, Estado).</li>
                <li><strong>Trigger:</strong> Recurrence (Todos los días a las 08:00 AM) o Manual para pruebas.</li>
                <li><strong>Acción 1:</strong> <em>List rows present in a table</em> con <em>Filter Query</em>: <code>Estado eq 'Pendiente'</code>.</li>
                <li><strong>Acción 2:</strong> <em>Apply to each</em> iterando sobre la salida <code>value</code>.</li>
                <li><strong>Acción 3 (dentro del bucle):</strong> <em>Send an email (V2)</em> al destinatario dinámico.</li>
                <li><strong>Acción 4:</strong> <em>Update a row</em> cambiando <code>Estado</code> a <code>Notificado</code>.</li>
              </ol>
            </div>
          `,
          quiz: [
            {
              question: "Para evitar que el flujo vuelva a enviar correos a las mismas solicitudes en la siguiente ejecución, ¿qué acción es fundamental al final del bucle?",
              options: [
                "Borrar el archivo Excel",
                "Actualizar el campo 'Estado' de la fila en Excel a 'Notificado' o 'Procesado'",
                "Apagar la computadora",
                "Enviar un segundo correo"
              ],
              answer: 1,
              explanation: "Actualizar el estado del registro asegura que el filtro 'Estado eq Pendiente' no vuelva a incluirlo en la próxima ejecución."
            }
          ]
        },
        {
          id: "les-6-2",
          title: "6.2 Proyecto 2: Circuito de Aprobación de Vacaciones",
          objective: "Construir un sistema integral con Forms, Aprobaciones de Teams, registro en SharePoint y confirmación por Outlook.",
          duration: "40 min",
          keyPoints: [
            "Captura de solicitud en Microsoft Forms.",
            "Creación de registro 'Pendiente' en SharePoint List.",
            "Start and wait for an approval con el jefe directo.",
            "Actualización condicional y notificación multi-canal."
          ],
          content: `
            <div class="lesson-section">
              <h3>Diagrama del Circuito</h3>
              <div class="flow-diagram-mini">
                <span class="flow-step trigger">Forms: Solicitud Vacaciones</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step action">SharePoint: Crear Item 'Pendiente'</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step condition">Approval: Gerente</span>
                <span class="flow-arrow">→</span>
                <span class="flow-step result">Teams / Outlook: Notificar Resultado</span>
              </div>

              <h3>Lógica de Ramificación</h3>
              <p>Si la respuesta es <strong>Approve</strong>: se actualiza el ítem de SharePoint a <em>Aprobado</em>, se descuentan los días y se envía confirmación con calendario. Si es <strong>Reject</strong>: se registra el motivo de rechazo y se notifica al colaborador con los comentarios del líder.</p>
            </div>
          `,
          quiz: [
            {
              question: "¿Dónde puede el gerente autorizar la solicitud de vacaciones generada por la acción de aprobación?",
              options: [
                "Solo yendo personalmente a Recursos Humanos",
                "Desde el correo en Outlook con botones interactivos, desde la app de Microsoft Teams o desde el portal de Power Automate",
                "Únicamente modificando la base de datos con SQL",
                "Escribiendo una carta a mano"
              ],
              answer: 1,
              explanation: "Power Automate Approvals se integra nativamente en Outlook (Actionable Messages), Teams y la web de Power Automate para una experiencia fluida."
            }
          ]
        },
        {
          id: "les-6-3",
          title: "6.3 Proyecto 3: Integración Full-Stack ClínicaApp (Spring Boot + Webhook + Multi-Canal)",
          objective: "Conectar tu API en Spring Boot con Power Automate para gestionar notificaciones y reportería de citas veterinarias.",
          duration: "45 min",
          keyPoints: [
            "Spring Boot emite evento CitaCreada hacia el Webhook de Power Automate.",
            "Parse JSON procesa los datos del paciente, dueño y costo.",
            "Despacho simultáneo: Correo al dueño, mensaje en Teams a veterinarios y fila en Google Sheets / Excel."
          ],
          content: `
            <div class="lesson-section">
              <h3>El Escenario Real</h3>
              <p>Tu sistema <strong>ClínicaApp</strong> gestiona citas de mascotas. Queremos que cada vez que se confirme una cita:</p>
              <ul>
                <li>El cliente reciba un correo HTML con las indicaciones previas (ayuno, vacunas).</li>
                <li>Los veterinarios reciban una notificación en el canal de Teams <code>#Guardia-Veterinaria</code>.</li>
                <li>La administración tenga un registro en una hoja de cálculo compartida para facturación.</li>
              </ul>

              <h3>Esquema JSON del Webhook</h3>
              <div class="code-box">
                <div class="code-header"><i class="ph-bold ph-code"></i> JSON Payload emitido por Spring Boot</div>
                <pre><code class="language-json">{
  "tipoEvento": "CITA_CONFIRMADA",
  "idCita": 8921,
  "clienteNombre": "Carlos Gómez",
  "clienteEmail": "carlos.gomez@empresa.com",
  "mascotaNombre": "Toby",
  "especie": "Canino",
  "veterinarioAsignado": "Dra. Valeria Silva",
  "fechaCita": "2026-10-15T09:00:00",
  "requiereAyuno": true
}</code></pre>
              </div>
            </div>
          `,
          quiz: [
            {
              question: "Si el veterinario asignado cambia en la base de datos de Spring Boot, ¿qué debe modificarse en Power Automate?",
              options: [
                "Rehacer todo el flujo desde cero",
                "Nada en la estructura; el flujo recibe dinámicamente el nuevo nombre en el campo 'veterinarioAsignado' del JSON y lo utiliza",
                "Desinstalar Spring Boot",
                "Cambiar la dirección IP del servidor"
              ],
              answer: 1,
              explanation: "El desacoplamiento basado en contratos JSON permite que los datos varíen dinámicamente sin requerir modificaciones en la lógica del flujo."
            }
          ]
        },
        {
          id: "les-6-4",
          title: "6.4 Simulador y Banco de Preguntas para Entrevistas Técnicas",
          objective: "Dominar las preguntas conceptuales y de arquitectura que realizan los reclutadores y líderes técnicos para puestos de Power Platform / Integración.",
          duration: "30 min",
          keyPoints: [
            "Explicación estratégica de fortalezas: combinar desarrollo Backend (Java/APIs) con Power Automate.",
            "Respuestas a preguntas clave: Triggers, Concurrency, Error Handling, Paginación, Límites.",
            "Cómo responder con madurez cuando no conoces un conector específico."
          ],
          content: `
            <div class="lesson-section">
              <h3>1. Preguntas Frecuentes y Respuestas de Nivel Senior</h3>
              
              <div class="interview-card">
                <div class="interview-q"><i class="ph-bold ph-question"></i> ¿Cómo manejas errores en un flujo de Power Automate en producción?</div>
                <div class="interview-a">
                  <strong>Respuesta recomendada:</strong> "No dejo que los errores rompan el flujo en silencio. Utilizo el patrón de <strong>Scopes (Try / Catch / Finally)</strong>. Configuro el bloque Catch con 'Configure run after' para que se active ante fallos o timeouts, capturo el <code>result()</code> del Try, y envío una alerta enriquecida a Microsoft Teams con el Run ID, timestamp y datos del registro fallido para facilitar el troubleshooting."
                </div>
              </div>

              <div class="interview-card">
                <div class="interview-q"><i class="ph-bold ph-question"></i> ¿Cuál es la diferencia entre un Trigger de Polling y uno de Webhook?</div>
                <div class="interview-a">
                  <strong>Respuesta recomendada:</strong> "Un trigger de Polling consulta activamente al servicio cada cierto intervalo de tiempo (ej. cada 5 min) buscando novedades, lo cual genera consumo constante. Un trigger de Webhook o HTTP Request es pasivo y reactivo: el servicio externo empuja (push) el evento inmediatamente mediante un HTTP POST en tiempo real cuando ocurre."
                </div>
              </div>

              <div class="interview-card">
                <div class="interview-q"><i class="ph-bold ph-question"></i> ¿Qué ventaja tienes tú como desarrollador frente a un perfil puramente no-code?</div>
                <div class="interview-a">
                  <strong>Respuesta recomendada:</strong> "Comprendo lo que ocurre bajo la capa visual: entiendo el protocolo HTTP, códigos de estado, arquitectura REST, deserialización de JSON, manejo de concurrencia, idempotencia para evitar duplicados y cómo diseñar APIs en Spring Boot que se integren de forma limpia y mantenible con el ecosistema corporativo."
                </div>
              </div>
            </div>
          `,
          quiz: [
            {
              question: "Si en una entrevista técnica te preguntan por un conector muy específico que nunca has usado, ¿cuál es la mejor respuesta?",
              options: [
                "Decir 'No tengo idea' y cambiar de tema",
                "Inventar que eres experto en ese conector",
                "Explicar que aunque no lo has utilizado puntualmente, comprendes su arquitectura como wrapper de API REST y que puedes consultar su documentación oficial de Microsoft para implementarlo en un flujo controlado",
                "Decir que ese conector no sirve para nada"
              ],
              answer: 2,
              explanation: "Demuestra honestidad profesional, comprensión sólida de los fundamentos arquitectónicos y capacidad autónoma de aprendizaje y resolución de problemas."
            }
          ]
        }
      ]
    }
  ],
  glossary: [
    { term: "Trigger (Disparador)", definition: "Evento inicial que arranca la ejecución de un flujo (Manual, Automatizado por evento, Programado por tiempo o HTTP Webhook)." },
    { term: "Action (Acción)", definition: "Paso u operación ejecutada por el flujo tras iniciarse (ej. enviar correo, actualizar fila, invocar API)." },
    { term: "Connector (Conector)", definition: "Envoltorio (wrapper) OpenAPI sobre la API REST de un servicio que abstrae la autenticación y peticiones." },
    { term: "Dynamic Content", definition: "Propiedades del payload JSON de salidas anteriores expuestas de forma gráfica para reutilizarse en pasos posteriores." },
    { term: "Parse JSON", definition: "Acción que deserializa una cadena JSON aplicando un JSON Schema para tipar sus campos y hacerlos accesibles." },
    { term: "Apply to each", definition: "Bucle iterador que procesa uno a uno (o en paralelo) los elementos de una colección o array JSON." },
    { term: "WDL (Workflow Definition Language)", definition: "Lenguaje de expresiones y funciones internas utilizado por Power Automate y Azure Logic Apps." },
    { term: "Scope", definition: "Contenedor de bloque para agrupar múltiples acciones. Se utiliza para estructurar bloques Try / Catch / Finally." },
    { term: "Configure Run After", definition: "Configuración que define bajo qué condiciones de salida del paso previo (éxito, fallo, omitido, timeout) debe ejecutarse una acción." },
    { term: "Idempotencia", definition: "Propiedad de un flujo o API donde ejecutar la misma operación múltiples veces produce exactamente el mismo resultado sin generar duplicados." },
    { term: "Throttling (HTTP 429)", definition: "Límite de tasa (Rate Limiting) impuesto por un servicio externo cuando se sobrepasa el número máximo de llamadas por minuto." },
    { term: "Adaptive Card", definition: "Tarjeta interactiva en formato JSON estructurado que se renderiza con botones y campos en Microsoft Teams y Outlook." },
    { term: "RPA (Robotic Process Automation)", definition: "Automatización de procesos robóticos mediante emulación de interacción de usuario en interfaces gráficas de escritorio." }
  ],
  flashcards: [
    { q: "¿Qué estructura es obligatoria en Excel Online para que Power Automate pueda manipular filas?", a: "Debe estar formateado como una Tabla de Excel con nombre (Ctrl + T)." },
    { q: "¿Cuál es la función WDL para obtener la fecha y hora actual en formato UTC?", a: "utcNow()" },
    { q: "¿Cómo evitas que dos ejecuciones paralelas de un bucle sobreescriban una misma variable?", a: "Fijando Concurrency Control en Grado 1 (Secuencial)." },
    { q: "¿Qué acción permite convertir un JSON en bruto en campos dinámicos listos para arrastrar?", a: "Parse JSON (usando 'Generate from sample')." },
    { q: "¿Qué mecanismo de Power Automate equivale a un bloque 'catch' de Java?", a: "Un Scope configurado con 'Configure run after' para 'has failed' y 'has timed out'." },
    { q: "¿Cuál es el límite por defecto de filas que devuelve 'List rows present in a table' de Excel?", a: "256 filas (ampliable mediante configuración de Paginación hasta 5,000)." },
    { q: "¿Cómo se llama la tecnología de Power Automate para automatizar software antiguo de escritorio sin API?", a: "Power Automate Desktop (RPA - Robotic Process Automation)." },
    { q: "¿Qué método HTTP se usa habitualmente para recibir eventos instantáneos en un Webhook?", a: "HTTP POST." }
  ]
};
