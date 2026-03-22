/* ═══════════════════════════════════════════════════════════════
   (un)announced. — Application JavaScript  (app.js)
   External JS — routing, interactions, animations
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── STATE ──────────────────────────────────────────────────── */
let currentPage = 'home';

/* ─── ROOM DATA ──────────────────────────────────────────────── */
const ROOM_DATA = {
  studio: {
    title: 'the studio',
    tagline: 'Where creativity meets videography.',
    description: [
      'This is where ideas turn into visuals. long-form, short-form, and everything in between.',
      'This room focuses on video content and visual storytelling.'
    ],
    tags: ['video', 'visual', 'long-form']
  },
  library: {
    title: 'the library',
    tagline: 'Where ideas slow down and thinking goes deeper.',
    description: [
      'This is where thoughts turn into words. essays, reflections, analysis, and long-form writing that delve deeper into ideas.',
      'This room focuses on written work and intentional thinking.'
    ],
    tags: ['writing', 'essays', 'analysis']
  },
  'living-room': {
    title: 'the living room',
    tagline: 'Where conversations are sparked and ideas are explained.',
    description: [
      'This is where the conversation starts. from big ideas to quiet thoughts.',
      'This room focuses on discussions, reflections and connections in real time via podcasts.'
    ],
    tags: ['podcasts', 'conversations', 'audio']
  },
  basement: {
    title: 'the basement',
    tagline: 'Where the behind-the-scenes of ideas, finished and unfinished, come to life.',
    description: [
      'This is where you find out more about what people are building.',
      'This room focuses on the highs and lows of the founder life: what worked and what went wrong.'
    ],
    tags: ['founders', 'startups', 'raw']
  }
};

/* ─── NAVIGATION ─────────────────────────────────────────────── */
function navigateTo(pageId, updateHistory = true) {
  const target = document.getElementById('page-' + pageId);
  if (!target) return;

  // Deactivate current page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Activate target
  target.classList.add('active');
  currentPage = pageId;

  // Reset stagger animations so they replay
  target.querySelectorAll('.stagger').forEach(el => {
    el.style.animation = 'none';
    void el.offsetHeight; // force reflow
    el.style.animation = '';
  });

  // Update nav pills
  document.querySelectorAll('[data-page]').forEach(el => {
    el.classList.remove('active');
    const elPage = el.getAttribute('data-page');
    if (
      elPage === pageId ||
      (pageId.startsWith('room-') && elPage === 'rooms')
    ) {
      el.classList.add('active');
    }
  });

  // Rooms page: reset CRT state each visit
  if (pageId === 'rooms') {
    resetRoomsPage();
    document.body.style.overflowY = 'hidden';
  } else if (pageId === 'home') {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'auto';
  }

  // Update page indicator
  const indicator = document.getElementById('page-indicator');
  if (indicator) {
    indicator.textContent = '// ' + pageId.replace(/-/g, ' ').toUpperCase();
  }

  // Update URL
  if (updateHistory) {
    history.pushState({ page: pageId }, '', '#' + pageId);
  }

  // Scroll top
  window.scrollTo(0, 0);
}

/* ─── ROOMS: RESET CRT ───────────────────────────────────────── */
function resetRoomsPage() {
  const crt   = document.getElementById('crt-state');
  const doors = document.getElementById('doors-state');
  if (!crt || !doors) return;

  // Show CRT, hide doors
  crt.style.display    = '';
  crt.style.opacity    = '1';
  crt.style.transform  = '';
  crt.style.transition = '';
  crt.classList.remove('hidden');

  doors.style.display    = 'none';
  doors.style.opacity    = '';
  doors.style.transform  = '';
  doors.style.transition = '';
}

/* ─── ROOMS: ENTER CLICK ─────────────────────────────────────── */
function initRoomsEnter() {
  const crt   = document.getElementById('crt-state');
  const doors = document.getElementById('doors-state');
  if (!crt || !doors) return;

  crt.addEventListener('click', () => {
    // Fade out + shrink CRT
    crt.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    crt.style.opacity    = '0';
    crt.style.transform  = 'scale(0.93)';

    setTimeout(() => {
      crt.style.display = 'none';

      // Reveal doors
      doors.style.display   = 'block';
      doors.style.opacity   = '0';
      doors.style.transform = 'translateY(18px)';
      document.body.style.overflowY = 'auto';

      requestAnimationFrame(() => {
        doors.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        doors.style.opacity    = '1';
        doors.style.transform  = 'translateY(0)';
      });

      // Re-trigger stagger animations on door cards
      doors.querySelectorAll('.stagger').forEach(el => {
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = '';
      });
    }, 420);
  });

  // Keyboard: Enter/Space also triggers
  crt.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      crt.click();
    }
  });
}

/* ─── DOOR CARDS → ROOM PAGES ────────────────────────────────── */
function initDoorCards() {
  document.querySelectorAll('.door-card').forEach(card => {
    card.addEventListener('click', () => {
      const roomId = card.getAttribute('data-room');
      if (roomId) navigateTo('room-' + roomId);
    });

    // Keyboard support
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

/* ─── BACK BUTTONS ───────────────────────────────────────────── */
function initBackLinks() {
  document.querySelectorAll('.back-link').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('rooms'));
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter') btn.click();
    });
  });
}

/* ─── NAVBAR SCROLL ──────────────────────────────────────────── */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* ─── HAMBURGER / MOBILE MENU ────────────────────────────────── */
function initMobileMenu() {
  const burger  = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-overlay');
  if (!burger || !overlay) return;

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    overlay.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  overlay.querySelectorAll('[data-page]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const page = a.getAttribute('data-page');
      burger.classList.remove('open');
      overlay.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      if (page) navigateTo(page);
    });
  });
}

/* ─── NAV PILL LINKS ─────────────────────────────────────────── */
function initNavLinks() {
  // Desktop pills
  document.querySelectorAll('.nav-pills [data-page]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(a.getAttribute('data-page'));
    });
  });

  // Logo
  document.querySelectorAll('.logo').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('home');
    });
  });
}

/* ─── APPLY FORM ─────────────────────────────────────────────── */
function initApplyForm() {
  const form       = document.getElementById('apply-form');
  const formWrap   = document.getElementById('apply-form-wrap');
  const successMsg = document.getElementById('apply-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      name:     form.elements['name'].value,
      email:    form.elements['email'].value,
      creates:  form.elements['creates'].value,
      link:     form.elements['link'].value,
      why:      form.elements['why'].value,
    };
    console.log('[un)announced.] Application:', data);

    formWrap.style.opacity = '0';
    formWrap.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      formWrap.style.display = 'none';
      successMsg.classList.add('visible');
    }, 300);
  });
}

/* ─── PARALLAX ON MOUSE MOVE (subtle) ───────────────────────── */
function initParallax() {
  let rafId = null;
  document.addEventListener('mousemove', e => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      document.body.style.setProperty('--mx', String(mx.toFixed(3)));
      document.body.style.setProperty('--my', String(my.toFixed(3)));
      // Move grain/grid very slightly
      const offset = `${mx * -2}px ${my * -2}px`;
      document.body.style.backgroundPosition = offset;
      rafId = null;
    });
  }, { passive: true });
}

/* ─── BROWSER BACK/FORWARD ───────────────────────────────────── */
window.addEventListener('popstate', e => {
  if (e.state && e.state.page) {
    navigateTo(e.state.page, false);
  }
});

/* ─── EXPOSE PUBLIC API ──────────────────────────────────────── */
window.__navigate = navigateTo;

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initNavLinks();
  initRoomsEnter();
  initDoorCards();
  initBackLinks();
  initApplyForm();
  initParallax();

  // Determine starting page from URL hash
  const hash = window.location.hash.replace('#', '');
  const startPage = (hash && document.getElementById('page-' + hash)) ? hash : 'home';

  navigateTo(startPage, false);
  history.replaceState({ page: startPage }, '', '#' + startPage);
});
