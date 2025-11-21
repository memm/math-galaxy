// Emoji picker for astronaut creation form
// Usage:
//  - call EmojiPicker.init({ containerSelector: '#emoji-grid', inputSelector: '#astronaut-emoji' });
//  - the selected emoji will be stored in the input.value

const EmojiPicker = (function () {
  const emojis = ["🚀","👩‍🚀","👨‍🚀","🪐","🌟","✨","🌙","🛰️","🪂","🛸","🔭","🌌","💫","🧑‍🚀","👽","🌠","🧭","🥽"];

  let containerEl = null;
  let inputEl = null;
  let selectedClass = 'emoji-selected';

  function renderGrid() {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    emojis.forEach((e) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'emoji-btn';
      btn.textContent = e;
      btn.setAttribute('aria-label', `Wybierz emoji ${e}`);
      btn.addEventListener('click', () => {
        selectEmoji(e, btn);
      });
      containerEl.appendChild(btn);
    });
  }

  function selectEmoji(e, btnEl) {
    // clear previous selection
    const prev = containerEl.querySelector(`.${selectedClass}`);
    if (prev) prev.classList.remove(selectedClass);
    if (btnEl) btnEl.classList.add(selectedClass);

    if (inputEl) {
      inputEl.value = e;
      // Optional: dispatch input/change events so other listeners update
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function init({ containerSelector, inputSelector, defaultEmoji } = {}) {
    containerEl = document.querySelector(containerSelector);
    inputEl = document.querySelector(inputSelector);

    if (!containerEl || !inputEl) {
      console.warn('EmojiPicker: container or input not found', containerSelector, inputSelector);
      return;
    }

    renderGrid();

    // if there's a default value (e.g., input already has emoji), select it
    const initial = inputEl.value || defaultEmoji;
    if (initial) {
      // find button with same emoji
      const btn = Array.from(containerEl.querySelectorAll('.emoji-btn')).find(b => b.textContent === initial);
      if (btn) btn.classList.add(selectedClass);
      inputEl.value = initial;
    }
  }

  return {
    init,
    _emojis: emojis // exposed for testing/customization
  };
})();