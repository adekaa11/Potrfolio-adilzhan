# Портфолио — Адильжан Кадыргажы

Одностраничный сайт-портфолио на чистом HTML/CSS/JS: без сборки, без зависимостей.

- Секции: hero, обо мне + достижения, проекты (GitHub/демо), навыки, контакты
- Адаптив (mobile-first), светлая/тёмная тема, RU/EN
- Выбор темы и языка сохраняется в `localStorage`

## Структура

```
index.html   — разметка и весь русский текст
styles.css   — оформление; цвета меняются в блоке переменных :root
script.js    — переводы (объект EN), тема, меню, анимации
favicon.svg  — иконка вкладки
vercel.json  — настройки Vercel (заголовки безопасности, чистые URL)
```

## Контакты на сайте

- Email: kadyrgazhyadilzhan@gmail.com
- Telegram: [@crybaby_c](https://t.me/crybaby_c)
- Instagram: [@_kadyrgazhy_a](https://www.instagram.com/_kadyrgazhy_a)
- GitHub: [@adekaa11](https://github.com/adekaa11)

## Как редактировать

- **Текст на русском** — прямо в `index.html`.
- **Текст на английском** — в `script.js`, объект `EN`; ключ = `data-i18n` из HTML.
- **Новый проект** — скопировать блок `<article class="card">…</article>`, задать новые ключи `data-i18n` и добавить их в `EN`.
- **Ссылка в карточке проекта** — добавить внутрь карточки блок `<div class="card__links">` с кнопкой `<a class="link-btn">` (пример — в карточке Wastewise).
- **Цвета** — переменные в начале `styles.css` (`:root` — светлая тема, `[data-theme="dark"]` — тёмная).

## Локальный запуск

```bash
python3 -m http.server 8080
# открыть http://localhost:8080
```

## Деплой на Vercel в 3 шага

1. **Код на GitHub.** Ветка `main` репозитория `adekaa11/Potrfolio-adilzhan` содержит сайт. Сделай её веткой по умолчанию: GitHub → Settings → General → Default branch.
2. **Импорт в Vercel.** [vercel.com/new](https://vercel.com/new) → войти через GitHub → **Import** у репозитория. Framework Preset: **Other**, Build Command — пусто, Output Directory — пусто (корень).
3. **Deploy.** Через ~30 секунд сайт доступен на `*.vercel.app`. Дальше каждый `git push` в основную ветку обновляет сайт автоматически. Свой домен: Project → Settings → Domains.

Вариант через терминал: `npx vercel` (превью) → `npx vercel --prod` (продакшн).
