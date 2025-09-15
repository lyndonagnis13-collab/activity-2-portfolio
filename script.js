(function() {
  const THEME_KEY = 'preferred-theme';
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');

  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.setAttribute('data-theme', 'dark');
    if (toggleBtn) {
      toggleBtn.textContent = '☀️';
      toggleBtn.setAttribute('aria-label', 'Switch to light mode');
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'light');
        toggleBtn.textContent = '🌙';
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem(THEME_KEY, 'dark');
        toggleBtn.textContent = '☀️';
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
      }
    });
  }

  const aboutKey = 'about-content-html';
  const aboutContent = document.getElementById('about-content');
  const editBtn = document.getElementById('about-edit');
  const saveBtn = document.getElementById('about-save');
  const cancelBtn = document.getElementById('about-cancel');

  if (aboutContent) {
    const storedAbout = localStorage.getItem(aboutKey);
    if (storedAbout) {
      aboutContent.innerHTML = storedAbout;
    }
  }

  function setEditing(isEditing) {
    if (!aboutContent) return;
    aboutContent.setAttribute('contenteditable', isEditing ? 'true' : 'false');
    aboutContent.classList.toggle('editing', isEditing);
    if (editBtn) editBtn.hidden = isEditing;
    if (saveBtn) saveBtn.hidden = !isEditing;
    if (cancelBtn) cancelBtn.hidden = !isEditing;
    if (editBtn) editBtn.setAttribute('aria-expanded', String(isEditing));
    if (isEditing) {
      aboutContent.focus();
      const range = document.createRange();
      range.selectNodeContents(aboutContent);
      range.collapse(false);
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  if (editBtn) {
    editBtn.addEventListener('click', function() { setEditing(true); });
  }
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      const original = localStorage.getItem(aboutKey);
      if (original && aboutContent) aboutContent.innerHTML = original;
      setEditing(false);
    });
  }
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      if (!aboutContent) return;
      const html = aboutContent.innerHTML.trim();
      localStorage.setItem(aboutKey, html);
      setEditing(false);
    });
  }
})();


