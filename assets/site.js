(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');

  if (toggle && navigation) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    };

    toggle.hidden = false;
    navigation.classList.add('collapsible');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navigation.classList.toggle('is-open', !expanded);
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
  }

  const filters = document.querySelector('.app-filters');
  const cards = [...document.querySelectorAll('[data-category]')];
  const status = document.querySelector('#filter-status');

  if (filters && status && cards.length) {
    filters.hidden = false;
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      const category = button.dataset.filter;
      for (const filter of filters.querySelectorAll('button')) {
        filter.setAttribute('aria-pressed', String(filter === button));
      }
      let count = 0;
      for (const card of cards) {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) count++;
      }
      status.textContent = `${count} ${count === 1 ? 'app' : 'apps'} to explore`;
    });
  }
})();
