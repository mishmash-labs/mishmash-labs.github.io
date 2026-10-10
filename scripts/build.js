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
    play: '<path d="m8 4 12 8-12 8V4Z"/>'
  };
  if (!shapes[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]}</svg>`;
}

function externalLink(href, text, className = '') {
  return `<a class="${className}" href="${escape(href)}" target="_blank" rel="noopener noreferrer">${text}${icon('external')}</a>`;
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
        <nav aria-label="Footer"><a href="${base}index.html#apps">Our apps</a><a href="${base}index.html#about">The studio</a><a href="${base}privacy/index.html">Privacy policies</a><a href="mailto:${email}">Contact</a></nav>
        <div class="footer-social">${externalLink('https://www.instagram.com/mishmash.labs/', 'Instagram')}${externalLink('https://github.com/mishmash-labs', 'GitHub')}${externalLink('https://www.linkedin.com/in/fawadakhan93/', 'LinkedIn')}</div>
      </div>
      <div class="footer-bottom"><span>&copy; 2026 Mishmash Labs. Built by Fawad Khan.</span><span>Independent by design. Made in Pakistan.</span></div>
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

function storeLinks(app) {
  return `<div class="store-links">${externalLink(app.googlePlay, `${icon('play')}<span><small>Get it on</small>Google Play</span>`, 'store-button')}${app.appStore ? externalLink(app.appStore, `<span class="apple-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12.5c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.8C7.3 7.8 5 9.7 5 13c0 2 1.1 4.2 2.1 5.6.6.9 1.3 1.8 2.3 1.8s1.4-.6 2.7-.6 1.7.6 2.8.6 1.7-.9 2.3-1.8c.7-1 1-1.7 1.5-2.8-1.5-.7-1.7-2.2-1.7-3.3ZM14.4 6.5c.5-.7 1-1.6.9-2.5-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.9 2.5.9.1 1.8-.5 2.4-1.2Z"/></svg></span><span><small>Download on the</small>App Store</span>`, 'store-button') : ''}</div>`;
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
        <div class="hero-actions"><a class="button button-dark" href="#apps">Find your next app ${icon('arrow')}</a><a class="text-link" href="#about">Meet the studio ${icon('external')}</a></div>
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
      <div class="catalog-stores"><span>Find the collection on your favorite store.</span><div>${externalLink(googlePlay, 'Google Play', 'text-link')}${externalLink(appStore, 'App Store', 'text-link')}</div></div>
    </section>
    <section class="studio-section section-space" id="about" aria-labelledby="studio-title">
      <div class="container studio-layout">
        <div class="studio-art lavender" aria-hidden="true"><span class="studio-circle mint"></span><span class="studio-square peach"></span><span class="studio-arch blue"></span><span class="studio-word">A curious<br>little studio.</span>${icon('star', 'studio-star')}<span class="studio-caption">MANY IDEAS. ONE MAKER.</span></div>
        <div class="studio-copy"><p class="eyebrow">Hello from the studio</p><h2 id="studio-title">Not a big company.<br>Just big on the details.</h2><p>I'm Fawad Khan, a Senior Flutter Developer based in Pakistan and the person behind Mishmash Labs.</p><p>I turn a wonderfully mixed bag of interests into focused mobile apps. The goal isn't to make another app for everything. It's to make the right little app for something that matters.</p><div class="maker-signature"><span class="maker-avatar">FK</span><div><strong>Fawad Khan</strong><span>Developer, designer, curious human.</span></div>${externalLink('https://www.linkedin.com/in/fawadakhan93/', 'Meet Fawad', 'text-link')}</div></div>
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
  const content = `<main id="main" class="container privacy-index"><header class="policy-header"><p class="eyebrow">Clear by design</p><h1>Your apps.<br>Your information<span class="heading-dot mint">.</span></h1><p>Every app works a little differently. Find the full privacy policy for yours, with the details on local storage, permissions, third-party services, and your choices.</p></header><div class="privacy-grid">${apps.map((app) => `<a class="policy-card ${app.color}" href="${app.slug}/index.html">${appImage(app, base, 56)}<span><strong>${escape(app.name)}</strong><span>Read privacy policy</span></span>${icon('arrow')}</a>`).join('')}</div><div class="privacy-index-note">${icon('shield')}<p>Each policy describes that app's data practices and shows its latest revision date. These pages match the Markdown policies maintained with the individual apps; downloadable copies are linked from each policy page. Have a question? <a href="mailto:${email}">Contact Mishmash Labs.</a></p></div></main>`;
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
