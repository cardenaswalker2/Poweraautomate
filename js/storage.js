/**
 * Motor de Gestión de Estado y Persistencia Local (LocalStorage)
 * Gestiona progreso de lecciones, notas personales, marcadores, quizzes completados y preferencias visuales.
 */

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'pa_mastery_completed_lessons',
  BOOKMARKS: 'pa_mastery_bookmarks',
  NOTES: 'pa_mastery_notes',
  QUIZ_RESULTS: 'pa_mastery_quiz_results',
  THEME: 'pa_mastery_theme',
  LAST_LESSON: 'pa_mastery_last_lesson'
};

const StorageManager = {
  // Lecciones completadas
  getCompletedLessons() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading completed lessons from storage', e);
      return [];
    }
  },

  isLessonCompleted(lessonId) {
    const list = this.getCompletedLessons();
    return list.includes(lessonId);
  },

  toggleLessonCompleted(lessonId) {
    const list = this.getCompletedLessons();
    const index = list.indexOf(lessonId);
    let isCompleted = false;

    if (index > -1) {
      list.splice(index, 1);
      isCompleted = false;
    } else {
      list.push(lessonId);
      isCompleted = true;
    }

    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(list));
    return isCompleted;
  },

  // Marcadores (Bookmarks)
  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isBookmarked(lessonId) {
    const list = this.getBookmarks();
    return list.includes(lessonId);
  },

  toggleBookmark(lessonId) {
    const list = this.getBookmarks();
    const index = list.indexOf(lessonId);
    let isBookmarked = false;

    if (index > -1) {
      list.splice(index, 1);
      isBookmarked = false;
    } else {
      list.push(lessonId);
      isBookmarked = true;
    }

    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return isBookmarked;
  },

  // Notas personales por lección
  getNotes(lessonId) {
    try {
      const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
      return lessonId ? (allNotes[lessonId] || '') : allNotes;
    } catch (e) {
      return lessonId ? '' : {};
    }
  },

  saveNote(lessonId, noteText) {
    try {
      const allNotes = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES) || '{}');
      if (!noteText || noteText.trim() === '') {
        delete allNotes[lessonId];
      } else {
        allNotes[lessonId] = noteText;
      }
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(allNotes));
      return true;
    } catch (e) {
      console.error('Error saving note', e);
      return false;
    }
  },

  // Resultados de Quizzes
  saveQuizResult(lessonId, score, total) {
    try {
      const results = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '{}');
      results[lessonId] = { score, total, date: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
    } catch (e) {
      console.error('Error saving quiz result', e);
    }
  },

  getQuizResults() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '{}');
    } catch (e) {
      return {};
    }
  },

  // Última lección visitada
  setLastVisitedLesson(lessonId) {
    localStorage.setItem(STORAGE_KEYS.LAST_LESSON, lessonId);
  },

  getLastVisitedLesson() {
    return localStorage.getItem(STORAGE_KEYS.LAST_LESSON) || 'les-1-1';
  },

  // Tema visual (light / dark)
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Reset con confirmación
  resetAllProgress() {
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_RESULTS);
    localStorage.removeItem(STORAGE_KEYS.LAST_LESSON);
  }
};
