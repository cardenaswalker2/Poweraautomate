/**
 * Controlador de Aplicación, Navegación, Herramientas Interactivas y UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de Variables de Estado
  let currentLessonId = StorageManager.getLastVisitedLesson();
  let currentFlashcardIndex = 0;
  let activeTab = 'lesson'; // 'lesson' | 'simulator' | 'flashcards' | 'glossary' | 'bookmarks'

  // Elementos DOM Principales
  const navModulesContainer = document.getElementById('nav-modules-list');
  const lessonView = document.getElementById('lesson-view');
  const toolsView = document.getElementById('tools-view');
  const searchInput = document.getElementById('search-lessons-input');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const bookmarkToggleBtn = document.getElementById('bookmark-toggle-btn');
  const sidebar = document.getElementById('app-sidebar');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const progressPercentText = document.getElementById('overall-progress-pct');
  const progressBarFill = document.getElementById('overall-progress-fill');
  const resetProgressBtn = document.getElementById('reset-progress-btn');

  // Inicializar Tema Visual
  const savedTheme = StorageManager.getTheme();
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Inicializar Interfaz
  renderSidebarNav();
  updateProgressUI();
  loadLesson(currentLessonId);

  // ==========================================
  // NAVEGACIÓN Y RENDERIZADO DEL SIDEBAR
  // ==========================================
  function renderSidebarNav(filterQuery = '') {
    navModulesContainer.innerHTML = '';
    const completedList = StorageManager.getCompletedLessons();

    COURSE_DATA.modules.forEach((mod, modIndex) => {
      // Filtrar lecciones si hay búsqueda
      const filteredLessons = mod.lessons.filter(les => {
        if (!filterQuery) return true;
        const q = filterQuery.toLowerCase();
        return les.title.toLowerCase().includes(q) || les.objective.toLowerCase().includes(q);
      });

      if (filteredLessons.length === 0 && filterQuery) return;

      const modEl = document.createElement('div');
      modEl.className = 'nav-module';
      // Abrir por defecto el módulo de la lección actual o si hay búsqueda activa
      const hasCurrent = mod.lessons.some(l => l.id === currentLessonId);
      if (hasCurrent || filterQuery) modEl.classList.add('open');

      modEl.innerHTML = `
        <div class="module-header" data-mod-id="${mod.id}">
          <div class="module-header-left">
            <i class="ph-bold ph-${mod.icon || 'folder'}"></i>
            <span>${mod.title.split(':')[0]}</span>
          </div>
          <i class="ph-bold ph-caret-right arrow"></i>
        </div>
        <div class="module-lessons">
          ${filteredLessons.map(les => {
            const isComp = completedList.includes(les.id);
            const isAct = les.id === currentLessonId;
            return `
              <div class="lesson-item ${isAct ? 'active' : ''}" data-lesson-id="${les.id}">
                <span>${les.title}</span>
                <span class="lesson-item-status ${isComp ? 'completed' : ''}">
                  <i class="ph-bold ${isComp ? 'ph-check-circle' : 'ph-circle'}"></i>
                </span>
              </div>
            `;
          }).join('')}
        </div>
      `;

      // Evento acordeón
      modEl.querySelector('.module-header').addEventListener('click', () => {
        modEl.classList.toggle('open');
      });

      // Evento clic lección
      modEl.querySelectorAll('.lesson-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const targetId = item.getAttribute('data-lesson-id');
          switchView('lesson');
          loadLesson(targetId);
          closeSidebar();
        });
      });

      navModulesContainer.appendChild(modEl);
    });
  }

  // ==========================================
  // CARGA Y RENDERIZADO DE LECCIÓN
  // ==========================================
  function loadLesson(lessonId) {
    let foundLesson = null;
    let foundModule = null;

    for (const mod of COURSE_DATA.modules) {
      const les = mod.lessons.find(l => l.id === lessonId);
      if (les) {
        foundLesson = les;
        foundModule = mod;
        break;
      }
    }

    if (!foundLesson) return;

    currentLessonId = lessonId;
    StorageManager.setLastVisitedLesson(lessonId);

    // Actualizar migas de pan y cabecera
    document.getElementById('breadcrumb-mod').innerText = foundModule.title.split(':')[0];
    document.getElementById('breadcrumb-les').innerText = foundLesson.title;

    // Actualizar estado del botón de Bookmark
    const isBookmarked = StorageManager.isBookmarked(lessonId);
    bookmarkToggleBtn.classList.toggle('active', isBookmarked);
    bookmarkToggleBtn.innerHTML = `<i class="ph-bold ${isBookmarked ? 'ph-bookmark-simple-fill' : 'ph-bookmark-simple'}"></i>`;

    // Renderizar Hero y Contenido
    const isCompleted = StorageManager.isLessonCompleted(lessonId);
    const existingNote = StorageManager.getNotes(lessonId);

    lessonView.innerHTML = `
      <div class="lesson-hero">
        <div class="lesson-meta-bar">
          <span class="lesson-tag">${foundModule.title.split(':')[0]}</span>
          <span class="lesson-time"><i class="ph-bold ph-clock"></i> ${foundLesson.duration || '20 min'}</span>
        </div>
        <h2 class="lesson-title">${foundLesson.title}</h2>
        <div class="lesson-objective-box">
          <strong><i class="ph-bold ph-target"></i> Objetivo de Aprendizaje:</strong> ${foundLesson.objective}
        </div>
      </div>

      <div class="lesson-content">
        ${foundLesson.content}
      </div>

      <!-- Sección de Quiz / Comprobación -->
      ${renderQuizSection(foundLesson)}

      <!-- Sección de Notas Personales -->
      <div class="notes-section">
        <div class="notes-header">
          <h4><i class="ph-bold ph-notepad"></i> Mis Notas de Aprendizaje</h4>
          <span class="notes-save-status" id="notes-status"><i class="ph-bold ph-check"></i> Guardado automáticamente</span>
        </div>
        <textarea class="notes-textarea" id="lesson-notes-input" placeholder="Escribe aquí tus apuntes, dudas o fórmulas clave sobre esta lección...">${existingNote}</textarea>
      </div>

      <!-- Navegación Inferior -->
      <div class="lesson-footer-nav">
        <button class="btn-secondary" id="btn-prev-lesson"><i class="ph-bold ph-arrow-left"></i> Anterior</button>
        <button class="btn-complete ${isCompleted ? 'is-completed' : ''}" id="btn-toggle-complete">
          <i class="ph-bold ${isCompleted ? 'ph-check-circle' : 'ph-circle'}"></i> 
          <span>${isCompleted ? 'Lección Completada' : 'Marcar como Completada'}</span>
        </button>
        <button class="btn-primary" id="btn-next-lesson">Siguiente <i class="ph-bold ph-arrow-right"></i></button>
      </div>
    `;

    // Eventos de la lección
    attachLessonEvents(foundLesson);
    renderSidebarNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // RENDERIZADO Y CONTROL DE QUIZZES
  // ==========================================
  function renderQuizSection(lesson) {
    if (!lesson.quiz || lesson.quiz.length === 0) return '';
    const q = lesson.quiz[0];

    return `
      <div class="quiz-container">
        <div class="quiz-header">
          <i class="ph-bold ph-sparkle" style="color: var(--accent-cyan); font-size: 1.4rem;"></i>
          <h4>Comprobación de Aprendizaje</h4>
        </div>
        <div class="quiz-question-box">
          <div class="quiz-question-title">${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, i) => `
              <button class="quiz-option-btn" data-opt-index="${i}">
                <i class="ph-bold ph-circle"></i>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback" id="quiz-feedback-box"></div>
        </div>
      </div>
    `;
  }

  function attachLessonEvents(lesson) {
    // Manejo de Notas Personales (Autosave con debounce)
    const notesInput = document.getElementById('lesson-notes-input');
    const notesStatus = document.getElementById('notes-status');
    let debounceTimer;

    notesInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        StorageManager.saveNote(lesson.id, notesInput.value);
        notesStatus.style.display = 'inline-block';
        setTimeout(() => { notesStatus.style.display = 'none'; }, 2000);
      }, 500);
    });

    // Manejo de Quiz Interactivo
    if (lesson.quiz && lesson.quiz.length > 0) {
      const q = lesson.quiz[0];
      const optionButtons = document.querySelectorAll('.quiz-option-btn');
      const feedbackBox = document.getElementById('quiz-feedback-box');

      optionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedIdx = parseInt(btn.getAttribute('data-opt-index'));
          optionButtons.forEach(b => b.disabled = true);

          if (selectedIdx === q.answer) {
            btn.classList.add('correct');
            btn.querySelector('i').className = 'ph-bold ph-check-circle';
            feedbackBox.className = 'quiz-feedback show success';
            feedbackBox.innerHTML = `<strong>¡Excelente! Respuesta correcta.</strong><br>${q.explanation}`;
            StorageManager.saveQuizResult(lesson.id, 1, 1);
          } else {
            btn.classList.add('incorrect');
            btn.querySelector('i').className = 'ph-bold ph-x-circle';
            // Resaltar la correcta
            optionButtons[q.answer].classList.add('correct');
            optionButtons[q.answer].querySelector('i').className = 'ph-bold ph-check-circle';
            feedbackBox.className = 'quiz-feedback show error';
            feedbackBox.innerHTML = `<strong>Incorrecto.</strong><br>${q.explanation}`;
            StorageManager.saveQuizResult(lesson.id, 0, 1);
          }
        });
      });
    }

    // Toggle Completada
    const toggleCompleteBtn = document.getElementById('btn-toggle-complete');
    toggleCompleteBtn.addEventListener('click', () => {
      const isComp = StorageManager.toggleLessonCompleted(lesson.id);
      toggleCompleteBtn.classList.toggle('is-completed', isComp);
      toggleCompleteBtn.querySelector('span').innerText = isComp ? 'Lección Completada' : 'Marcar como Completada';
      toggleCompleteBtn.querySelector('i').className = `ph-bold ${isComp ? 'ph-check-circle' : 'ph-circle'}`;
      updateProgressUI();
      renderSidebarNav();
    });

    // Botones Anterior y Siguiente
    const allLessons = COURSE_DATA.modules.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === lesson.id);

    const prevBtn = document.getElementById('btn-prev-lesson');
    const nextBtn = document.getElementById('btn-next-lesson');

    if (currentIndex <= 0) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.addEventListener('click', () => loadLesson(allLessons[currentIndex - 1].id));
    }

    if (currentIndex >= allLessons.length - 1) {
      nextBtn.style.visibility = 'hidden';
    } else {
      nextBtn.addEventListener('click', () => loadLesson(allLessons[currentIndex + 1].id));
    }
  }

  // ==========================================
  // ACTUALIZACIÓN DE PROGRESO GLOBAL
  // ==========================================
  function updateProgressUI() {
    const allLessons = COURSE_DATA.modules.flatMap(m => m.lessons);
    const completed = StorageManager.getCompletedLessons();
    const pct = Math.round((completed.length / allLessons.length) * 100) || 0;

    progressPercentText.innerText = `${pct}%`;
    progressBarFill.style.width = `${pct}%`;
  }

  // ==========================================
  // VISTAS ESPECIALES (SIMULADOR, FLASHCARDS, GLOSARIO)
  // ==========================================
  function switchView(viewName) {
    activeTab = viewName;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));

    if (viewName === 'lesson') {
      lessonView.style.display = 'block';
      toolsView.style.display = 'none';
    } else {
      lessonView.style.display = 'none';
      toolsView.style.display = 'flex';
      const activeBtn = document.querySelector(`.tool-btn[data-tool="${viewName}"]`);
      if (activeBtn) activeBtn.classList.add('active');

      if (viewName === 'simulator') renderFlowSimulator();
      else if (viewName === 'flashcards') renderFlashcardsView();
      else if (viewName === 'glossary') renderGlossaryView();
      else if (viewName === 'bookmarks') renderBookmarksView();
    }
  }

  // --- 1. Simulador de Flujos ---
  let simulatorNodes = [
    { type: 'trigger', name: 'When an HTTP request is received', icon: 'lightning', color: '#1e3a8a' },
    { type: 'action', name: 'Parse JSON (Validar DTO Cita)', icon: 'brackets-curly', color: '#14532d' },
    { type: 'condition', name: 'Condition (¿Monto > $1.000.000?)', icon: 'split-horizontal', color: '#713f12' },
    { type: 'action', name: 'Start and wait for an approval', icon: 'seal-check', color: '#581c87' }
  ];

  function renderFlowSimulator() {
    toolsView.innerHTML = `
      <div class="simulator-box">
        <div class="quiz-header">
          <i class="ph-bold ph-tree-structure" style="color: var(--accent-cyan); font-size: 1.6rem;"></i>
          <div>
            <h3>Simulador Visual de Arquitectura de Flujos</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Construye y visualiza la tubería de ejecución Trigger → Acciones → Condiciones → Persistencia.</p>
          </div>
        </div>

        <div class="sim-controls">
          <button class="sim-add-btn" data-type="trigger"><i class="ph-bold ph-lightning"></i> + Trigger HTTP</button>
          <button class="sim-add-btn" data-type="action-excel"><i class="ph-bold ph-microsoft-excel-logo"></i> + Excel Add Row</button>
          <button class="sim-add-btn" data-type="action-email"><i class="ph-bold ph-envelope"></i> + Outlook Send Email</button>
          <button class="sim-add-btn" data-type="action-teams"><i class="ph-bold ph-chats-circle"></i> + Teams Post Alert</button>
          <button class="sim-add-btn" data-type="condition"><i class="ph-bold ph-split-horizontal"></i> + Condition If/Else</button>
          <button class="sim-add-btn" data-type="scope"><i class="ph-bold ph-shield-check"></i> + Scope Try/Catch</button>
        </div>

        <div class="sim-canvas" id="sim-canvas"></div>
      </div>
    `;

    renderSimulatorCanvas();

    toolsView.querySelectorAll('.sim-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        let newNode = { type: 'action', name: 'Nueva Acción', icon: 'gear', color: '#14532d' };

        if (type === 'trigger') newNode = { type: 'trigger', name: 'Trigger: Recurrence / Webhook', icon: 'lightning', color: '#1e3a8a' };
        else if (type === 'action-excel') newNode = { type: 'action', name: 'Excel: Insertar fila en Tabla', icon: 'microsoft-excel-logo', color: '#15803d' };
        else if (type === 'action-email') newNode = { type: 'action', name: 'Outlook: Enviar Correo HTML', icon: 'envelope', color: '#0284c7' };
        else if (type === 'action-teams') newNode = { type: 'action', name: 'Teams: Notificar en Canal', icon: 'chats-circle', color: '#4338ca' };
        else if (type === 'condition') newNode = { type: 'condition', name: 'Condition: ¿Monto > Límite?', icon: 'split-horizontal', color: '#b45309' };
        else if (type === 'scope') newNode = { type: 'scope', name: 'Scope: Try / Catch Block', icon: 'shield-check', color: '#be123c' };

        simulatorNodes.push(newNode);
        renderSimulatorCanvas();
      });
    });
  }

  function renderSimulatorCanvas() {
    const canvas = document.getElementById('sim-canvas');
    if (!canvas) return;

    if (simulatorNodes.length === 0) {
      canvas.innerHTML = '<p style="color: var(--text-dim); margin: 40px 0;">El flujo está vacío. Agrega pasos arriba.</p>';
      return;
    }

    canvas.innerHTML = simulatorNodes.map((node, i) => `
      <div class="sim-node">
        <div class="sim-node-info">
          <div class="sim-node-icon" style="background-color: ${node.color}">
            <i class="ph-bold ph-${node.icon}"></i>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-main);">${node.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">${node.type}</div>
          </div>
        </div>
        <button class="sim-node-delete" data-node-idx="${i}"><i class="ph-bold ph-trash"></i></button>
      </div>
      ${i < simulatorNodes.length - 1 ? '<div class="sim-connector-line"><i class="ph-bold ph-arrow-down"></i></div>' : ''}
    `).join('');

    canvas.querySelectorAll('.sim-node-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-node-idx'));
        simulatorNodes.splice(idx, 1);
        renderSimulatorCanvas();
      });
    });
  }

  // --- 2. Flashcards Interactivas ---
  function renderFlashcardsView() {
    const card = COURSE_DATA.flashcards[currentFlashcardIndex];
    toolsView.innerHTML = `
      <div class="simulator-box">
        <div class="quiz-header">
          <i class="ph-bold ph-cards" style="color: var(--accent-cyan); font-size: 1.6rem;"></i>
          <div>
            <h3>Tarjetas de Memoria Activa (Flashcards)</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Haz clic en la tarjeta para voltearla y poner a prueba tu retención técnica.</p>
          </div>
        </div>

        <div class="flashcards-container">
          <div class="flashcard" id="active-flashcard">
            <div class="flashcard-inner">
              <div class="flashcard-front">
                <div style="font-size: 1.25rem; font-weight: 700; line-height: 1.5;">${card.q}</div>
                <div class="card-hint"><i class="ph-bold ph-hand-pointing"></i> Haz clic para ver la respuesta</div>
              </div>
              <div class="flashcard-back">
                <div style="font-size: 1.15rem; font-weight: 600; line-height: 1.6;">${card.a}</div>
                <div class="card-hint"><i class="ph-bold ph-check"></i> Concepto clave verificado</div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 16px; align-items: center;">
            <button class="btn-secondary" id="fc-prev"><i class="ph-bold ph-arrow-left"></i> Anterior</button>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${currentFlashcardIndex + 1} / ${COURSE_DATA.flashcards.length}</span>
            <button class="btn-primary" id="fc-next">Siguiente <i class="ph-bold ph-arrow-right"></i></button>
          </div>
        </div>
      </div>
    `;

    const fcEl = document.getElementById('active-flashcard');
    fcEl.addEventListener('click', () => fcEl.classList.toggle('flipped'));

    document.getElementById('fc-prev').addEventListener('click', () => {
      if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        renderFlashcardsView();
      }
    });
    document.getElementById('fc-next').addEventListener('click', () => {
      if (currentFlashcardIndex < COURSE_DATA.flashcards.length - 1) {
        currentFlashcardIndex++;
        renderFlashcardsView();
      }
    });
  }

  // --- 3. Glosario Técnico ---
  function renderGlossaryView() {
    toolsView.innerHTML = `
      <div class="simulator-box">
        <div class="quiz-header">
          <i class="ph-bold ph-book-open" style="color: var(--accent-cyan); font-size: 1.6rem;"></i>
          <div>
            <h3>Glosario de Términos y Conceptos Clave</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Definiciones técnicas precisas del ecosistema de Power Automate y la Power Platform.</p>
          </div>
        </div>

        <div class="glossary-grid">
          ${COURSE_DATA.glossary.map(item => `
            <div class="glossary-card">
              <div class="glossary-term">${item.term}</div>
              <div class="glossary-desc">${item.definition}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // --- 4. Marcadores ---
  function renderBookmarksView() {
    const bookmarkedIds = StorageManager.getBookmarks();
    const allLessons = COURSE_DATA.modules.flatMap(m => m.lessons);
    const bookmarkedLessons = allLessons.filter(l => bookmarkedIds.includes(l.id));

    toolsView.innerHTML = `
      <div class="simulator-box">
        <div class="quiz-header">
          <i class="ph-bold ph-bookmark-simple" style="color: var(--accent-amber); font-size: 1.6rem;"></i>
          <div>
            <h3>Mis Lecciones Marcadas</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Acceso rápido a las lecciones que guardaste para repasar.</p>
          </div>
        </div>

        ${bookmarkedLessons.length === 0 ? `
          <p style="color: var(--text-dim); text-align: center; margin: 40px 0;">No tienes lecciones marcadas. Usa el botón de marcador en la barra superior mientras estudias una lección.</p>
        ` : `
          <div class="glossary-grid">
            ${bookmarkedLessons.map(l => `
              <div class="glossary-card" style="cursor: pointer;" data-go-lesson="${l.id}">
                <div class="glossary-term" style="color: var(--accent-cyan);">${l.title}</div>
                <div class="glossary-desc">${l.objective}</div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    toolsView.querySelectorAll('[data-go-lesson]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-go-lesson');
        switchView('lesson');
        loadLesson(id);
      });
    });
  }

  // ==========================================
  // EVENTOS GLOBALES DE CABECERA Y SIDEBAR
  // ==========================================
  // Buscador de lecciones
  searchInput.addEventListener('input', (e) => {
    renderSidebarNav(e.target.value.trim());
  });

  // Toggle Menú Móvil & Overlay
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    if (sidebarOverlay) sidebarOverlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  }

  menuToggleBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Botón Marcador en Cabecera
  bookmarkToggleBtn.addEventListener('click', () => {
    const isNowBookmarked = StorageManager.toggleBookmark(currentLessonId);
    bookmarkToggleBtn.classList.toggle('active', isNowBookmarked);
    bookmarkToggleBtn.innerHTML = `<i class="ph-bold ${isNowBookmarked ? 'ph-bookmark-simple-fill' : 'ph-bookmark-simple'}"></i>`;
  });

  // Toggle Tema Claro / Oscuro
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    StorageManager.setTheme(newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggleBtn.innerHTML = `<i class="ph-bold ${theme === 'dark' ? 'ph-sun' : 'ph-moon'}"></i>`;
  }

  // Herramientas del Sidebar
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const toolName = btn.getAttribute('data-tool');
      switchView(toolName);
      closeSidebar();
    });
  });

  // Botón Reiniciar Progreso
  resetProgressBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas reiniciar todo tu progreso, notas y marcadores? Esta acción no se puede deshacer.')) {
      StorageManager.resetAllProgress();
      updateProgressUI();
      loadLesson('les-1-1');
      alert('Tu progreso ha sido reiniciado.');
    }
  });
});
