/* =========================================================
   script.js — вся интерактивность сайта
     1. Переводы RU / EN
     2. Светлая / тёмная тема
     3. Мобильное меню
     4. Подсветка активного пункта меню
     5. Анимации появления при прокрутке
     6. Копирование email + всплывающее уведомление
     7. Мелочи: ссылки-заглушки, тень шапки, год в подвале
   Никаких библиотек — чистый JavaScript.
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;

  // localStorage может бросать ошибку (приватный режим, запрет cookies),
  // поэтому оборачиваем в try/catch — сайт должен работать в любом случае.
  const store = {
    get(key) {
      try { return localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch { /* ничего страшного */ }
    },
  };


  /* ---------- 1. Переводы ---------- */

  // Английские тексты. Ключ = значение атрибута data-i18n в index.html.
  // Русский текст хранится в самом HTML, поэтому здесь его нет.
  const EN = {
    'meta.title': 'Adilzhan Kadyrgazhy — CS & AI Engineering',
    'meta.description': 'Portfolio of Adilzhan Kadyrgazhy, a 9th-grade student at NIS Astana-Nura. Computer Science & AI engineering: projects built with Python, FastAPI and computer vision.',
    'skip': 'Skip to content',

    'nav.home': 'Back to top',
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'lang.switch': 'Переключить на русский',

    'hero.status': 'Building AI services · Open to projects and teams',
    'hero.hello': "Hi, I'm",
    'hero.name': 'Adilzhan Kadyrgazhy',
    'hero.lead': '9th-grade student from Kazakhstan, focused on Computer Science and AI engineering. I turn ideas into working products with Python and LLMs.',
    'hero.meta.school': 'NIS Astana-Nura · Grade 9A',
    'hero.meta.country': 'Kazakhstan',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Get in touch',
    'code.comment': '# from idea to deploy',

    'hl.projects': 'projects in portfolio',
    'hl.daryn.v': '2nd place',
    'hl.daryn': 'Daryn competition, LURA project',
    'hl.debate.v': 'Finalist',
    'hl.debate': 'debate tournament, NIS Semey',
    'hl.tedx': 'city TEDx organizer, Semey',

    'about.label': 'About',
    'about.title': 'I love turning ideas into products that actually work',
    'about.p1': "I'm Adilzhan, a Grade 9A student at NIS Astana-Nura. I code in Python and build things people can actually use: APIs, Telegram bots and web services.",
    'about.p2': 'My main focus is AI engineering — integrating large language models and computer vision into real applications. I also compete in informatics olympiads to sharpen my algorithmic thinking.',
    'about.p3': 'Outside of code, I’m actively involved in school life and all kinds of events.',
    'facts.school.k': 'School',
    'facts.school.v': 'NIS Astana-Nura',
    'facts.grade.k': 'Grade',
    'facts.focus.k': 'Focus',
    'facts.langs.k': 'Languages',

    'ach.title': 'Achievements & experience',
    'ach.1.tag': '2nd place',
    'ach.1.title': 'LURA project — Daryn competition',
    'ach.1.text': 'Prize winner at a research project competition with an intelligent business monitoring and analytics system.',
    'ach.2.tag': 'Finalist',
    'ach.2.title': 'Debate — tournament at NIS Semey',
    'ach.2.text': 'Reached the final: argumentation, quick thinking, teamwork.',
    'ach.3.text': 'Model UN conferences: diplomacy, negotiation and public speaking.',
    'ach.4.tag': 'Organizer',
    'ach.4.title': 'City TEDx event in Semey',
    'ach.4.text': 'Member of the organizing team of the city-wide TEDx event: preparation and coordination.',
    'ach.5.tag': 'Olympiad',
    'ach.5.title': 'Informatics Olympiad',
    'ach.5.text': 'Algorithms, data structures and timed problem solving.',

    'projects.label': 'Projects',
    'projects.title': 'Selected projects',
    'projects.lead': 'Each project solves a concrete problem — from waste sorting to business monitoring.',
    'card.stack': 'Tech stack',
    'card.features': 'Features',
    'card.private': 'Private repository',
    'card.demo': 'Demo',
    'p1.badge': 'Flagship project',
    'p1.title': 'Campus Atlas',
    'p1.text': 'A FastAPI service for university photos: it collects campus images, an AI model (CLIP/SigLIP) sorts them into categories — campus, labs, sports, dorms — and filters out the rest, while duplicates are removed via perceptual hashing. Built at LOCUS Startup Hackathon 2026.',
    'p2.badge': 'Telegram bot',
    'p2.demo': 'Open bot',
    'p2.text': 'A “read it later” bot: send it a link and it fetches the article title and saves it. /list shows unread links with a “Mark as read” button, /random picks a random article.',
    'p3.badge': 'Sustainability · AI',
    'p3.text': 'A waste-sorting web app: snap a photo and a neural network identifies the type (glass, metal, paper, plastic) with 91.8% accuracy and tells you where it goes. Includes a quiz, points and a school leaderboard.',
    'p4.badge': '2nd place · Daryn',
    'p4.text': 'An intelligent monitoring system for small and medium businesses. It tracks customer reviews, competitors (public data only) and market changes, compares new events with past ones and surfaces key signals: recurring complaints, new customer requests, trends. It also keeps a business history showing how decisions shaped the situation.',
    'p4.chip1': 'Review analysis',
    'p4.chip2': 'Competitor monitoring',
    'p4.chip3': 'Market trends',
    'p4.chip4': 'Business history',

    'skills.label': 'Skills',
    'skills.title': 'Stack & skills',
    'skills.lead': 'Tools I build with, and skills I develop beyond code.',
    'sk.prog': 'Programming',
    'sk.algo': 'Algorithms',
    'sk.backend': 'Backend & APIs',
    'sk.ai': 'AI engineering',
    'sk.tools': 'Tools',
    'sk.soft.1': 'Public speaking',
    'sk.soft.2': 'Debate & argumentation',
    'sk.soft.3': 'Teamwork',
    'sk.soft.4': 'Event organizing',
    'sk.langs': 'Languages',
    'sk.lang.kz': 'Kazakh',
    'sk.lang.ru': 'Russian',
    'sk.lang.en': 'English — IELTS 5.5',

    'contact.label': 'Contact',
    'contact.title': "Let's build something great together",
    'contact.text': "Open to startups, team projects, hackathons and internships. Drop me a message — I'll reply quickly.",
    'contact.copy': 'Copy',
    'contact.copyLabel': 'Copy email',

    'footer.name': 'Adilzhan Kadyrgazhy',
    'footer.made': 'Built with plain HTML, CSS & JS',
    'footer.top': 'Back to top ↑',
  };

  // Строки, которых нет в HTML: подписи, зависящие от состояния, и уведомления.
  const UI = {
    ru: {
      themeToDark: 'Включить тёмную тему',
      themeToLight: 'Включить светлую тему',
      copied: 'Email скопирован',
      copyFailed: 'Не получилось скопировать — выделите адрес вручную',
      soon: 'Ссылка скоро появится',
    },
    en: {
      themeToDark: 'Switch to dark theme',
      themeToLight: 'Switch to light theme',
      copied: 'Email copied',
      copyFailed: "Couldn't copy — please select the address manually",
      soon: 'Link coming soon',
    },
  };

  // data-i18n-attr="aria-label:nav.menu;title:x" → [['aria-label','nav.menu'], ['title','x']]
  const parseAttrMap = (el) =>
    el.dataset.i18nAttr.split(';').map((pair) => pair.split(':').map((s) => s.trim()));

  const textEls = document.querySelectorAll('[data-i18n]');
  const attrEls = document.querySelectorAll('[data-i18n-attr]');

  // Запоминаем исходный русский текст со страницы, чтобы к нему можно было вернуться.
  const RU = {};
  textEls.forEach((el) => {
    RU[el.dataset.i18n] ??= el.textContent.trim();
  });
  attrEls.forEach((el) => {
    parseAttrMap(el).forEach(([attr, key]) => {
      RU[key] ??= el.getAttribute(attr) ?? '';
    });
  });

  const langBtn = document.getElementById('lang-toggle');
  let lang = 'ru';

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'ru';
    const dict = lang === 'en' ? EN : RU;

    root.lang = lang;

    // Если перевода для ключа нет — текст остаётся прежним (не пропадает).
    textEls.forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.textContent = value;
    });
    attrEls.forEach((el) => {
      parseAttrMap(el).forEach(([attr, key]) => {
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    // Подсвечиваем активный язык на кнопке RU/EN
    langBtn.querySelectorAll('[data-lang-label]').forEach((span) => {
      span.classList.toggle('is-active', span.dataset.langLabel === lang);
    });

    // Подсказки, которые зависят от языка
    document.querySelectorAll('.is-disabled').forEach((a) => { a.title = UI[lang].soon; });
    updateThemeLabel();
  }

  langBtn.addEventListener('click', () => {
    const next = lang === 'ru' ? 'en' : 'ru';
    applyLang(next);
    store.set('lang', next); // запоминаем выбор пользователя
  });


  /* ---------- 2. Тема ---------- */
  // Начальная тема уже выставлена inline-скриптом в <head> (без мигания).

  const themeBtn = document.getElementById('theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const THEME_COLORS = { light: '#f6f6f3', dark: '#0b0d10' }; // = --bg из styles.css

  function updateThemeLabel() {
    const isDark = root.dataset.theme === 'dark';
    themeBtn.setAttribute('aria-label', isDark ? UI[lang].themeToLight : UI[lang].themeToDark);
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    metaThemeColor?.setAttribute('content', THEME_COLORS[theme]); // цвет адресной строки на телефоне
    updateThemeLabel();
  }

  themeBtn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    store.set('theme', next);
  });

  // Пока пользователь не выбрал тему вручную — следуем за настройкой системы
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!store.get('theme')) setTheme(e.matches ? 'dark' : 'light');
  });


  /* ---------- 3. Мобильное меню ---------- */

  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  function setMenu(open) {
    menuBtn.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }

  const isMenuOpen = () => menuBtn.getAttribute('aria-expanded') === 'true';

  menuBtn.addEventListener('click', () => setMenu(!isMenuOpen()));

  // Закрываем меню: по клику на пункт, по клику мимо, по Esc
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', (e) => {
    if (isMenuOpen() && !nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      setMenu(false);
      menuBtn.focus();
    }
  });
  // Если экран расширился до десктопа — сбрасываем состояние меню
  window.matchMedia('(min-width: 820px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });


  /* ---------- 4. Подсветка активного пункта меню ---------- */

  const navLinks = [...document.querySelectorAll('.nav__link')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    // Секция считается активной, когда пересекает середину экрана
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }


  /* ---------- 5. Анимации появления ---------- */

  const revealEls = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // анимируем только один раз
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  }


  /* ---------- 6. Копирование email ---------- */

  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2500);
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        showToast(UI[lang].copied);
      } catch {
        showToast(UI[lang].copyFailed);
      }
    });
  });


  /* ---------- 7. Мелочи ---------- */

  // Ссылки с href="#" — заглушки: делаем их серыми и некликабельными.
  // Впиши настоящий URL в index.html — кнопка оживёт автоматически.
  document.querySelectorAll('a[href="#"]').forEach((a) => {
    a.classList.add('is-disabled');
    a.setAttribute('aria-disabled', 'true');
    a.setAttribute('tabindex', '-1');
    a.addEventListener('click', (e) => e.preventDefault());
  });

  // Разделитель под шапкой появляется, когда страница прокручена
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Текущий год в подвале
  document.getElementById('year').textContent = new Date().getFullYear();


  /* ---------- Старт ---------- */
  // Язык: сохранённый выбор → язык браузера (ru/kk → русский) → английский
  const savedLang = store.get('lang');
  const browserLang = /^(ru|kk|be|uk)/i.test(navigator.language || '') ? 'ru' : 'en';
  applyLang(savedLang === 'ru' || savedLang === 'en' ? savedLang : browserLang);
  setTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');
})();
