const fs = require('node:fs');
const path = require('node:path');
const apps = require('../assets/apps.json');

const root = path.resolve(__dirname, '..');
const origin = 'https://mishmash-labs.github.io';
const email = 'mishmash.labs@gmail.com';
const googlePlay = 'https://play.google.com/store/apps/dev?id=5114658008790714296';
const appStore = 'https://apps.apple.com/pk/developer/fawad-khan/id1542221013';
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

function icon(name, className = '') {
  const shapes = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external: '<path d="M7 17 17 7M7 7h10v10"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
    star: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
    menu: '<path d="M4 8h16M4 16h16"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>',
    back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
    play: '<path d="m8 4 12 8-12 8V4Z"/>',
    instagram: '<path fill="currentColor" stroke="none" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>',
    threads: '<path fill="currentColor" stroke="none" d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>',
    github: '<path fill="currentColor" stroke="none" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    linkedin: '<path fill="currentColor" stroke="none" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'
  };
  if (!shapes[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
}

function externalLink(href, text, className = '') {
  return `<a class="${className}" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${text}${icon('external')}</a>`;
}

function socialLink(href, name) {
  return `<a href="${escape(href)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(name)}" title="${escape(name)}">${icon(name.toLowerCase())}</a>`;
}

function header(base, current = '') {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="${base}index.html" aria-label="Mishmash Labs home"><img src="${base}assets/brand-mark.svg" alt="" width="36" height="36"><span>mishmash<span class="brand-labs">labs</span></span></a>
      <button class="menu-toggle" aria-controls="site-navigation" aria-expanded="false" aria-label="Toggle navigation" hidden>${icon('menu')}</button>
      <nav id="site-navigation" class="site-navigation" aria-label="Main navigation">
        <a href="${base}index.html#apps"${current === 'apps' ? ' aria-current="page"' : ''}>Our apps</a>
        <a href="${base}index.html#about">The studio</a>
        <a href="${base}privacy/index.html"${current === 'privacy' ? ' aria-current="page"' : ''}>Privacy</a>
        <a class="nav-contact" href="${base}index.html#contact">Say hello ${icon('external')}</a>
      </nav>
    </div>
  </header>`;
}

function footer(base) {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div><a class="brand" href="${base}index.html"><img src="${base}assets/brand-mark.svg" alt="" width="32" height="32"><span>mishmash<span class="brand-labs">labs</span></span></a><p>A little mix. A lot of purpose.</p></div>
        <nav aria-label="Footer"><a href="${base}index.html#apps">Our apps</a><a href="${base}index.html#about">The studio</a><a href="${base}privacy/index.html">Privacy policies</a><a href="${base}privacy/index.html#website-privacy">Website privacy</a><a href="mailto:${email}">Contact</a></nav>
        <div class="footer-social">${socialLink('https://www.instagram.com/mishmash.labs/', 'Instagram')}${socialLink('https://www.threads.com/@mishmash.labs', 'Threads')}${socialLink('https://github.com/mishmash-labs', 'GitHub')}${socialLink('https://www.linkedin.com/in/fawadakhan93/', 'LinkedIn')}</div>
      </div>
      <div class="footer-bottom"><span>&copy; 2026 Mishmash Labs. Built by Fawad Khan.</span><span>Independent by design.</span></div>
    </div>
  </footer>`;
}

function documentPage({ title, description, base, route, content, current, image = 'assets/brand-mark.svg' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#faf9f6">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${origin}${route}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${origin}${route}">
  <meta property="og:image" content="${origin}/${image}">
  <link rel="icon" type="image/svg+xml" href="${base}assets/brand-mark.svg">
  <link rel="stylesheet" href="${base}assets/site.css">
  <script src="${base}assets/site.js" defer></script>
</head>
<body>
${header(base, current)}
${content}
${footer(base)}
</body>
</html>
`;
}

function appImage(app, base, size = 64, eager = false) {
  return `<img class="app-icon" src="${base}assets/${app.icon}" alt="${escape(app.name)} app icon" width="${size}" height="${size}"${eager ? '' : ' loading="lazy"'}>`;
}

function storeLinks(app, className = '') {
  return `<div class="store-links${className ? ` ${className}` : ''}">${externalLink(app.googlePlay, `${icon('play')}<span><small>Get it on</small>Google Play</span>`, 'store-button')}${app.appStore ? externalLink(app.appStore, `<span class="apple-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12.5c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.8C7.3 7.8 5 9.7 5 13c0 2 1.1 4.2 2.1 5.6.6.9 1.3 1.8 2.3 1.8s1.4-.6 2.7-.6 1.7.6 2.8.6 1.7-.9 2.3-1.8c.7-1 1-1.7 1.5-2.8-1.5-.7-1.7-2.2-1.7-3.3ZM14.4 6.5c.5-.7 1-1.6.9-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.9 2.5.9.1 1.8-.5 2.4-1.2Z"/></svg></span><span><small>Download on the</small>App Store</span>`, 'store-button') : ''}</div>`;
}

function preview(app, base) {
  const previews = {
    autofolio: `<div class="preview-title"><span>My garage</span><span class="mini-badge">All in one place</span></div><div class="vehicle-art"><svg viewBox="0 0 280 110" fill="none" aria-hidden="true"><path d="m43 70 17-34c3-5 7-8 13-8h114c7 0 12 3 16 9l19 33 17 8v17H28V78l15-8Z" fill="#C77B5B"/><path d="m77 40-14 29h139l-17-29H77Z" fill="#FCEADD"/><path d="M128 40v29" stroke="#C77B5B" stroke-width="5"/><circle cx="73" cy="94" r="15" fill="#343C36"/><circle cx="201" cy="94" r="15" fill="#343C36"/><circle cx="73" cy="94" r="6" fill="#FCEADD"/><circle cx="201" cy="94" r="6" fill="#FCEADD"/></svg></div><div class="preview-tiles"><span>${icon('check')} Fuel & charging</span><span>${icon('check')} Service history</span><span>${icon('check')} Running costs</span></div>`,
    '5-prayers': `<div class="preview-title"><span>Your daily rhythm</span>${icon('star')}</div><div class="prayer-visual"><span class="prayer-arch"></span><span class="prayer-sun"></span></div><div class="prayer-row"><span>Fajr</span><span>Dhuhr</span><span>Asr</span><span>Maghrib</span><span>Isha</span></div><div class="preview-note">Prayer times, wherever life takes you.</div>`,
    konvertr: `<div class="preview-title"><span>Length</span><span class="mini-badge">Offline</span></div><div class="conversion-box"><small>Metres</small><strong>1</strong></div><div class="conversion-divider">${icon('arrow')}</div><div class="conversion-box result"><small>Centimetres</small><strong>100</strong></div><div class="preview-note">Different units. One clear answer.</div>`,
    'konvertr-pro': `<div class="preview-title"><span>Your pocket toolkit</span><span class="mini-badge">Pro</span></div><div class="tool-grid"><span><b>cm</b>Convert</span><span><b>+</b>Calculate</span><span>${icon('star')}Favorites</span><span><b>%</b>Tip split</span><span><b>12:00</b>Time zones</span><span><b>N</b>Compass</span></div><div class="preview-note">Less app-switching. More getting things done.</div>`,
    'explore-lahore': `<div class="preview-title"><span>A day in Lahore</span><span class="mini-badge">Your itinerary</span></div><div class="city-visual"><span></span><span></span><span></span><span></span><span></span></div><div class="itinerary-row"><b>01</b><span>Morning discoveries</span></div><div class="itinerary-row"><b>02</b><span>Afternoon wanderings</span></div><div class="itinerary-row"><b>03</b><span>Evening favorites</span></div>`,
    'word-sleuth': `<div class="preview-title"><span>A little wordplay</span>${icon('star')}</div><div class="word-grid">${'CLUESLOGICWORDS'.split('').map((letter, i) => `<span class="${i < 5 ? 'solved' : ''}">${letter}</span>`).join('')}</div><div class="preview-note">Connect. Decode. Discover.</div><div class="preview-tiles"><span>8 ways to find your aha</span></div>`,
    profpl: `<div class="preview-title"><span>Your next gameweek</span><span class="mini-badge">Squad planner</span></div><div class="pitch"><div>${shirt('1')}</div><div>${shirt('2')}${shirt('3')}${shirt('4')}</div><div>${shirt('5')}${shirt('6')}${shirt('7')}${shirt('8')}</div><div>${shirt('9')}${shirt('10')}${shirt('11')}</div></div><div class="preview-note">A little planning. A bigger gameweek.</div>`
  };
  return `<div class="product-visual ${app.color}"><div class="visual-label">${appImage(app, base, 36)}<span>${escape(app.name)}</span><span class="visual-dots" aria-hidden="true">&bull; &bull; &bull;</span></div><div class="preview-board" aria-hidden="true">${previews[app.slug]}</div><p class="preview-caption">Illustrative layout &middot; not an app screenshot</p></div>`;
}

function shirt(number) {
  return `<span class="shirt"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="m12 4 8 3 8-3 10 9-7 8-3-3v18H12V18l-3 3-7-8L12 4Z" fill="currentColor"/></svg><b>${number}</b></span>`;
}

function appCard(app, base, featured = false) {
  return `<article class="app-card ${app.color}${featured ? ' featured-card' : ''}" data-category="${escape(app.category)}">
    <div class="card-content">
      <div class="card-top">${appImage(app, base)}<span class="card-category">${featured ? 'Fresh from the lab' : escape(app.category)}</span></div>
      <h3><a href="${base}apps/${app.slug}/index.html">${escape(app.name)} ${icon('external')}</a></h3>
      <p>${escape(app.summary)}</p>
      <div class="card-tags">${app.highlights.slice(0, 2).map((text) => `<span>${escape(text)}</span>`).join('')}</div>
      <div class="card-bottom"><a class="text-link" href="${base}apps/${app.slug}/index.html">Explore ${escape(app.name)} ${icon('arrow')}</a><span>${app.platforms.join(' + ')}</span></div>
    </div>${featured ? `\n    ${preview(app, base)}` : ''}
  </article>`;
}

function homepage() {
  const heroApps = [apps[1], apps[2], apps[5], apps[4], apps[6]];
  const content = `<main id="main">
    <section class="hero container" id="home" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> Independent minds. Useful little apps.</p>
        <h1 id="hero-title">Good little apps.<br>For your<br><span class="highlight lavender">everyday.${icon('star')}</span></h1>
        <p class="hero-description">A mishmash of ideas, made into things you'll actually use. Thoughtful mobile apps for life's little routines, big passions, and everything in between.</p>
        ${storeLinks({ googlePlay, appStore }, 'hero-actions')}
        <div class="hero-footnote"><span class="tiny-shapes" aria-hidden="true"><i></i><i></i><i></i></span> Small, independent, and made with care.</div>
      </div>
      <div class="hero-art" aria-label="A mix of Mishmash Labs apps">
        <div class="art-topline"><span>A LITTLE MIX</span><span>A LOT OF POSSIBILITY ${icon('star')}</span></div>
        <div class="app-mosaic">${heroApps.map((app, i) => `<a class="mosaic-tile ${app.color} mosaic-${i}" href="apps/${app.slug}/index.html" aria-label="Explore ${escape(app.name)}">${appImage(app, '', 76, true)}<span>${escape(app.name)}</span>${i === 1 ? '<span class="mosaic-decoration" aria-hidden="true">cm &harr; in</span>' : ''}${i === 4 ? '<span class="mosaic-decoration" aria-hidden="true">Your next big call.</span>' : ''}</a>`).join('')}</div>
        <div class="art-bottomline"><span class="status-dot"></span><span>Different ideas. The same thoughtful approach.</span></div>
        <span class="art-spark" aria-hidden="true">${icon('star')}</span>
      </div>
    </section>
    <div class="intro-strip"><div class="container"><span>Made for real life</span><span>${icon('star')} A little more useful</span><span>${icon('star')} A little more playful</span><span>${icon('star')} A little more you</span></div></div>
    <section class="catalog section-space container" id="apps" aria-labelledby="apps-title">
      <div class="section-heading"><div><p class="eyebrow">The app collection</p><h2 id="apps-title">Different interests.<br>Same attention to detail.</h2></div><p>From your morning routine to your next gameweek, there's a little something for everyone.</p></div>
      <div class="catalog-toolbar"><div class="app-filters" role="group" aria-label="Filter apps by category" hidden>${['All apps', 'Everyday tools', 'Lifestyle', 'Games & sport'].map((category, i) => `<button type="button" data-filter="${i === 0 ? 'all' : escape(category)}" aria-pressed="${i === 0}">${escape(category)}</button>`).join('')}</div><p id="filter-status" role="status" aria-live="polite">7 apps to explore</p></div>
      <div class="app-grid">${apps.map((app, i) => appCard(app, '', i === 0)).join('')}</div>
    </section>
    <section class="studio-section section-space" id="about" aria-labelledby="studio-title">
      <div class="container studio-layout">
        <div class="studio-art lavender" aria-hidden="true"><span class="studio-circle mint"></span><span class="studio-square peach"></span><span class="studio-arch blue"></span><span class="studio-word">A curious<br>little studio.</span>${icon('star', 'studio-star')}<span class="studio-caption">MANY IDEAS. ONE MAKER.</span></div>
        <div class="studio-copy"><p class="eyebrow">Hello from the studio</p><h2 id="studio-title">Not a big company.<br>Just big on the details.</h2><p>I'm Fawad Khan, a Senior Flutter Developer and the person behind Mishmash Labs.</p><p>I turn a wonderfully mixed bag of interests into focused mobile apps. The goal isn't to make another app for everything. It's to make the right little app for something that matters.</p><div class="maker-signature"><span class="maker-avatar">FK</span><div><strong>Fawad Khan</strong><span>Developer, designer, curious human.</span></div>${externalLink('https://www.linkedin.com/in/fawadakhan93/', 'Meet Fawad', 'text-link')}</div></div>
      </div>
      <div class="container values-grid"><div><span class="value-icon peach">${icon('check')}</span><h3>Useful by nature</h3><p>Focused tools that solve real problems, without turning the small things into big chores.</p></div><div><span class="value-icon mint">${icon('shield')}</span><h3>Clear about data</h3><p>Honest, app-specific privacy policies. Know what's stored, what's shared, and what you control.</p></div><div><span class="value-icon lavender">${icon('star')}</span><h3>Made with care</h3><p>Thoughtful details, considered interfaces, and a little personality in every app.</p></div></div>
    </section>
    <section class="container contact-section section-space" id="contact" aria-labelledby="contact-title"><div class="contact-panel lavender"><div><p class="eyebrow">Let's talk</p><h2 id="contact-title">Have a little idea?<br>Let's make it useful.</h2><p>A project, a question, an app that needs a fix, or just a hello.<br>There's a real person on the other end.</p><a class="button button-dark" href="mailto:${email}">${icon('mail')} Say hello by email ${icon('external')}</a><a class="contact-address" href="mailto:${email}">${email}</a></div><div class="contact-shape" aria-hidden="true">${icon('star')}</div></div></section>
  </main>`;
  return documentPage({ title: 'Mishmash Labs — Good little apps for your everyday', description: 'An independent app studio by Fawad Khan. Discover Autofolio, 5 Prayers, Konvertr, Konvertr Pro, Explore Lahore, Word Sleuth, and proFPL.', base: '', route: '/', content });
}

function appPage(app) {
  const base = '../../';
  const related = app.related ? apps.find((candidate) => candidate.slug === app.related) : undefined;
  const more = related ? [related, apps.find((candidate) => candidate.category !== app.category)] : apps.filter((candidate) => candidate.slug !== app.slug).slice(0, 2);
  const content = `<main id="main">
    <div class="container breadcrumb"><a href="${base}index.html#apps">${icon('back')} All apps</a><span>/</span><span>${escape(app.name)}</span></div>
    <section class="container app-hero" aria-labelledby="app-title">
      <div class="app-hero-copy"><div class="app-identity">${appImage(app, base, 72, true)}<div><p class="eyebrow">${escape(app.category)}</p><h1 id="app-title">${escape(app.name)}</h1><p>${escape(app.subtitle)}</p></div></div>
      <h2 class="app-tagline">${escape(app.tagline).replace('\n', '<br>')}</h2><p class="app-introduction">${escape(app.description)}</p><div class="app-highlights">${app.highlights.map((highlight) => `<span>${icon('check')}${escape(highlight)}</span>`).join('')}</div>${storeLinks(app)}<p class="pricing-note">${escape(app.pricing)} <span>&middot;</span> ${app.platforms.join(' + ')}</p><a class="text-link privacy-hero-link" href="${base}privacy/${app.slug}/index.html">${icon('shield')} Read the privacy policy ${icon('arrow')}</a></div>
      ${preview(app, base)}
    </section>
    <section class="container app-facts" aria-label="${escape(app.name)} at a glance">${app.facts.map(([label, value]) => `<div><span>${escape(label)}</span><strong>${escape(value)}</strong></div>`).join('')}</section>
    <section class="container section-space" aria-labelledby="features-title"><div class="section-heading"><div><p class="eyebrow">A closer look</p><h2 id="features-title">Small details.<br>A useful difference.</h2></div><p>Here's what you can do with ${escape(app.name)}.</p></div><div class="feature-grid">${app.features.map(([title, text], i) => `<article><span class="feature-number ${app.color}">${String(i + 1).padStart(2, '0')}</span><h3>${escape(title)}</h3><p>${escape(text)}</p></article>`).join('')}</div></section>
    <section class="getting-started section-space"><div class="container"><p class="eyebrow">Make yourself at home</p><h2>From download to doing.</h2><div class="steps-grid">${app.steps.map(([title, text], i) => `<div><span class="step-number">${i + 1}</span><h3>${escape(title)}</h3><p>${escape(text)}</p></div>`).join('')}</div></div></section>
    <section class="container section-space app-information"><div class="privacy-callout mint"><span class="value-icon">${icon('shield')}</span><p class="eyebrow">Your data, explained</p><h2>No mystery.<br>Just the details.</h2><p>${escape(app.privacySummary)}</p><a class="text-link" href="${base}privacy/${app.slug}/index.html">${escape(app.name)} privacy policy ${icon('arrow')}</a><a class="subtle-link" href="${base}privacy_policies/${app.policy}">View original policy (Markdown)</a></div><div class="faq-section"><p class="eyebrow">Good to know</p><h2>A few helpful answers.</h2>${app.faqs.map(([question, answer]) => `<details><summary>${escape(question)}<span aria-hidden="true">+</span></summary><p>${escape(answer)}</p></details>`).join('')}<p class="support-note">Something else on your mind? <a href="mailto:${email}?subject=${encodeURIComponent(`${app.name} support`)}">Get in touch.</a></p></div></section>
    <section class="container section-space download-section"><div class="download-panel ${app.color}">${appImage(app, base, 80)}<div><p class="eyebrow">A little more ${app.slug === 'word-sleuth' || app.slug === 'profpl' ? 'play' : 'possibility'} in your pocket</p><h2>Make room for ${escape(app.name)}.</h2><p>${escape(app.pricing)}. See the store for current availability and pricing.</p>${storeLinks(app)}</div></div>${app.disclaimer ? `<p class="disclaimer">${escape(app.disclaimer)}</p>` : ''}</section>
    <section class="container section-space more-apps"><div class="section-heading"><div><p class="eyebrow">Keep exploring</p><h2>More from the mishmash.</h2></div><a class="text-link" href="${base}index.html#apps">See all apps ${icon('arrow')}</a></div><div class="related-grid">${more.map((candidate) => appCard(candidate, base)).join('')}</div></section>
  </main>`;
  return documentPage({ title: `${app.name}: ${app.subtitle} — Mishmash Labs`, description: app.summary, base, route: `/apps/${app.slug}/`, content, current: 'apps', image: `assets/${app.icon}` });
}

// The policy sources use headings, paragraphs, flat lists, strong text, code, and links.
// Unsupported block syntax fails the build rather than silently dropping legal content.
function renderPolicy(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const output = [];
  const headings = [];
  let paragraph = [];
  let items = [];
  const inline = (text) => {
    const tokens = [];
    const token = (html) => `\u0000${tokens.push(html) - 1}\u0000`;
    let value = text
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label, url) => token(`<a href="${escape(url)}">${escape(label)}</a>`))
      .replace(/<?https?:\/\/[^\s<>]+>?/g, (match) => {
        const url = match.replace(/^<|>$/g, '');
        return token(`<a href="${escape(url)}">${escape(url)}</a>`);
      });
    value = escape(value)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
    return value;
  };
  const joinLines = (block) => block.map((line, i) => inline(line.trim()) + (i < block.length - 1 ? (/ {2}$/.test(line) ? '<br>' : ' ') : '')).join('');
  const flushParagraph = () => {
    if (paragraph.length) output.push(`<p>${joinLines(paragraph)}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (items.length) output.push(`<ul>${items.map((item) => `<li>${joinLines(item)}</li>`).join('')}</ul>`);
    items = [];
  };
  for (const line of lines) {
    if (/^\s*$/.test(line)) {
      flushParagraph();
      flushList();
    } else if (/^#{1,3} /.test(line)) {
      flushParagraph();
      flushList();
      const [, hashes, text] = /^(#{1,3}) (.+)$/.exec(line);
      if (hashes.length === 1) continue;
      const id = `policy-section-${headings.length + 1}`;
      headings.push({ text, id, level: hashes.length });
      output.push(`<h${hashes.length} id="${id}">${inline(text)}</h${hashes.length}>`);
    } else if (/^- /.test(line)) {
      flushParagraph();
      items.push([line.slice(2)]);
    } else if (/^ {2}\S/.test(line) && items.length) {
      items[items.length - 1].push(line.trimStart());
    } else if (/^(?:#{4,}|>|```|\||\s*\d+[.)] |\s+- )/.test(line)) {
      throw new Error(`Unsupported policy syntax: ${line}`);
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return { html: output.join('\n'), headings };
}

function privacyPage(app, markdown) {
  const base = '../../';
  const policy = renderPolicy(markdown);
  const content = `<main id="main">
    <div class="container breadcrumb"><a href="${base}apps/${app.slug}/index.html">${icon('back')} ${escape(app.name)}</a><span>/</span><a href="../index.html">Privacy policies</a></div>
    <header class="container policy-header"><p class="eyebrow">The details matter</p><h1>${escape(app.name)}<br>Privacy Policy<span class="heading-dot mint">.</span></h1><p>The information behind the app. Read what it uses, how it works, and the choices you have.</p><a class="text-link" href="${base}privacy_policies/${app.policy}">View original policy (Markdown) ${icon('external')}</a></header>
    <div class="container policy-layout"><aside class="policy-sidebar"><nav aria-label="Policy contents"><p class="eyebrow">On this page</p>${policy.headings.filter((heading) => heading.level === 2).map((heading) => `<a href="#${heading.id}">${escape(heading.text)}</a>`).join('')}</nav><div class="policy-help"><strong>Questions about privacy?</strong><a href="mailto:${email}?subject=${encodeURIComponent(`${app.name} privacy question`)}">Contact Mishmash Labs ${icon('external')}</a></div></aside><article class="policy-prose" aria-label="${escape(app.name)} privacy policy">${policy.html}</article></div>
    <div class="container policy-back"><a class="button button-dark" href="${base}apps/${app.slug}/index.html">${icon('back')} Back to ${escape(app.name)}</a><a class="text-link" href="../index.html">All privacy policies ${icon('arrow')}</a></div>
  </main>`;
  return documentPage({ title: `${app.name} Privacy Policy — Mishmash Labs`, description: `Read the ${app.name} privacy policy, including data storage, third-party services, permissions, and your choices.`, base, route: `/privacy/${app.slug}/`, content, current: 'privacy' });
}

function privacyIndex() {
  const base = '../';
  const content = `<main id="main" class="container privacy-index"><header class="policy-header"><p class="eyebrow">Clear by design</p><h1>Your apps.<br>Your information<span class="heading-dot mint">.</span></h1><p>Every app works a little differently. Find the full privacy policy for yours, with the details on local storage, permissions, third-party services, and your choices.</p></header><div class="privacy-grid">${apps.map((app) => `<a class="policy-card ${app.color}" href="${app.slug}/index.html">${appImage(app, base, 56)}<span><strong>${escape(app.name)}</strong><span>Read privacy policy</span></span>${icon('arrow')}</a>`).join('')}</div><div class="privacy-index-note">${icon('shield')}<p>Each policy describes that app's data practices and shows its latest revision date. These pages match the Markdown policies maintained with the individual apps; downloadable copies are linked from each policy page. Have a question? <a href="mailto:${email}">Contact Mishmash Labs.</a></p></div>
    <section id="website-privacy" class="policy-prose" aria-labelledby="website-privacy-title">
      <h2 id="website-privacy-title">Website privacy</h2>
      <p>Last updated: October 10, 2026. This notice applies to this website, not to the mobile apps.</p>
      <p>This website does not include visitor counters, analytics, advertising, or tracking scripts. Our site code does not set cookies or create visitor identifiers. JavaScript is used only to enhance mobile navigation and app filtering.</p>
      <p>GitHub Pages hosts this website, and fonts load from Google Fonts. These providers receive connection information when serving their resources. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub's privacy statement</a> and <a href="https://policies.google.com/privacy">Google's privacy policy</a>. Questions? <a href="mailto:${email}">Contact Mishmash Labs.</a></p>
    </section></main>`;
  return documentPage({ title: 'App Privacy Policies — Mishmash Labs', description: 'Find the privacy policies for all seven Mishmash Labs apps, including Autofolio, 5 Prayers, Konvertr, Word Sleuth, and proFPL.', base, route: '/privacy/', content, current: 'privacy' });
}

function generateSite() {
  const files = new Map([['index.html', homepage()], [path.join('privacy', 'index.html'), privacyIndex()]]);
  for (const app of apps) {
    const markdown = fs.readFileSync(path.join(root, 'privacy_policies', app.policy), 'utf8');
    files.set(path.join('apps', app.slug, 'index.html'), appPage(app));
    files.set(path.join('privacy', app.slug, 'index.html'), privacyPage(app, markdown));
  }
  const routes = ['/', '/privacy/', ...apps.flatMap((app) => [`/apps/${app.slug}/`, `/privacy/${app.slug}/`])];
  files.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n')}\n</urlset>\n`);
  files.set('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
  return files;
}

if (require.main === module) {
  const check = process.argv.includes('--check');
  const files = generateSite();
  const stale = [];
  for (const [relative, content] of files) {
    const destination = path.join(root, relative);
    if (check) {
      if (!fs.existsSync(destination) || fs.readFileSync(destination, 'utf8') !== content) stale.push(relative);
    } else {
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.writeFileSync(destination, content);
    }
  }
  if (stale.length) {
    console.error(`Generated files are out of date:\n${stale.join('\n')}\nRun npm run build.`);
    process.exitCode = 1;
  } else {
    console.log(`${check ? 'Verified' : 'Built'} ${files.size} static files for ${apps.length} apps.`);
  }
}

module.exports = { generateSite, renderPolicy };
