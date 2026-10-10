const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const apps = require('../assets/apps.json');
const { generateSite, renderPolicy } = require('../scripts/build.js');

const root = path.resolve(__dirname, '..');
const files = generateSite();
const pages = [...files].filter(([name]) => name.endsWith('.html'));
const decode = (text) => text.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => ({
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'"
})[entity]);
const normalize = (text) => text.replace(/\s+/g, ' ').trim();

test('all seven apps have a complete static product page and privacy page', () => {
  assert.equal(apps.length, 7);
  assert.equal(new Set(apps.map((app) => app.slug)).size, 7);
  assert.equal(pages.length, 16);
  for (const app of apps) {
    const product = files.get(path.join('apps', app.slug, 'index.html'));
    const policy = files.get(path.join('privacy', app.slug, 'index.html'));
    assert.ok(product && policy, app.name);
    assert.ok(product.includes(app.googlePlay.replaceAll('&', '&amp;')), app.name);
    assert.ok(product.includes(`privacy/${app.slug}/index.html`), app.name);
    assert.equal((product.match(/<details>/g) || []).length, app.faqs.length);
    assert.equal(app.features.length, 6);
    assert.equal(app.steps.length, 3);
    assert.ok(product.includes('Illustrative layout'));
    assert.ok(product.includes('View original policy (Markdown)'));
    assert.equal(Boolean(app.appStore), app.platforms.includes('iOS'), app.name);
    if (app.appStore) assert.ok(product.includes(app.appStore), app.name);
  }
});

test('every generated page has metadata, a single h1, and accessible landmarks', () => {
  for (const [name, html] of pages) {
    assert.match(html, /<html lang="en">/, name);
    assert.match(html, /<meta name="viewport"/, name);
    assert.match(html, /<meta name="description" content="[^"]+">/, name);
    assert.match(html, /<link rel="canonical" href="https:\/\/mishmash-labs.github.io\//, name);
    assert.match(html, /<main id="main"/, name);
    assert.match(html, /class="skip-link" href="#main"/, name);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, name);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, `Duplicate id in ${name}`);
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(match[0], /\balt="[^"]*"/, `Missing alt in ${name}`);
      assert.match(match[0], /\bwidth="\d+"/, `Missing width in ${name}`);
      assert.match(match[0], /\bheight="\d+"/, `Missing height in ${name}`);
    }
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(match[0], /rel="noopener noreferrer"/, name);
    }
  }
});

test('every page links to Instagram in the shared footer alongside existing socials', () => {
  for (const [name, html] of pages) {
    const footer = html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/);
    assert.ok(footer, name);
    assert.match(footer[0], /<a class="" href="https:\/\/www\.instagram\.com\/mishmash\.labs\/" target="_blank" rel="noopener noreferrer">Instagram<svg/, name);
    assert.ok(footer[0].includes('https://github.com/mishmash-labs'), name);
    assert.ok(footer[0].includes('https://www.linkedin.com/in/fawadakhan93/'), name);
  }
});

test('every page links to website privacy and no visitor counter remains', () => {
  for (const [name, html] of pages) {
    assert.match(html, /href="[^"]*privacy\/index\.html#website-privacy">Website privacy<\/a>/, name);
    assert.doesNotMatch(html, /hits\.sh|busuanzi|pageview-counter|data-counter-|footer-pageviews/, name);
  }
  const privacy = files.get(path.join('privacy', 'index.html'));
  assert.match(privacy, /id="website-privacy"/);
  assert.match(privacy, /does not include visitor counters, analytics, advertising, or tracking scripts/);
  assert.match(privacy, /GitHub Pages hosts this website/);
  assert.match(privacy, /fonts load from Google Fonts/);
  const script = fs.readFileSync(path.join(root, 'assets', 'site.js'), 'utf8');
  assert.doesNotMatch(script, /hits\.sh|busuanzi|pageview-counter|counterSrc|createElement|fetch\(/);
});

test('all local links, fragments, scripts, and images resolve, including file previews', () => {
  for (const [name, html] of pages) {
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (/^(?:https?:|mailto:)/.test(href)) continue;
      assert.ok(!href.startsWith('/'), `Root-relative path in ${name}: ${href}`);
      const [relative, fragment] = href.split('#');
      const target = relative ? path.normalize(path.join(path.dirname(name), relative)) : name;
      assert.ok(files.has(target) || fs.existsSync(path.join(root, target)), `${name} -> ${href}`);
      if (fragment) {
        const targetHtml = files.get(target);
        assert.ok(targetHtml && targetHtml.includes(`id="${fragment}"`), `${name} -> ${href}`);
      }
    }
  }
});

test('rendered policies preserve every word of the original legal content', () => {
  for (const app of apps) {
    const markdown = fs.readFileSync(path.join(root, 'privacy_policies', app.policy), 'utf8');
    const { html, headings } = renderPolicy(markdown);
    const sourceText = markdown
      .replace(/^# .+\r?\n/, '')
      .replace(/^#{2,3} /gm, '')
      .replace(/^- /gm, '')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '$1')
      .replace(/<(https?:\/\/[^>]+)>/g, '$1')
      .replace(/\*\*|`/g, '');
    const renderedText = decode(html.replace(/<\/(?:p|li|h[23])>|<br>/g, ' ').replace(/<[^>]*>/g, ''));
    assert.equal(normalize(renderedText), normalize(sourceText), app.name);
    const expectedHeadings = [...markdown.matchAll(/^#{2,3} (.+)$/gm)];
    assert.equal(headings.length, expectedHeadings.length, app.name);
  }
});

test('every policy publishes a revision date and a direct privacy contact', () => {
  for (const app of apps) {
    const markdown = fs.readFileSync(path.join(root, 'privacy_policies', app.policy), 'utf8');
    assert.match(markdown.replace(/\*\*/g, ''), /^(?:Effective date|Last updated): [A-Z][a-z]+ \d{1,2}, \d{4}[ \t]*\r?$/m, app.name);
    assert.ok(markdown.includes('mishmash.labs@gmail.com'), app.name);
    const policy = files.get(path.join('privacy', app.slug, 'index.html'));
    assert.ok(policy.includes('mishmash.labs@gmail.com'), app.name);
  }
});

test('policy renderer handles wrapped lists, hard breaks, links, and safe inline markup', () => {
  const { html } = renderPolicy('# Policy\n\n## Section\n\nFirst  \nsecond.\n\n- **Store:** a wrapped\n  item with `code` and <https://example.com/privacy>\n- [Another provider](https://example.com/terms?a=1&b=2)\n\n<script>alert("x")</script>');
  assert.match(html, /First<br>second\./);
  assert.match(html, /<li><strong>Store:<\/strong> a wrapped item with <code>code<\/code>/);
  assert.match(html, /href="https:\/\/example.com\/terms\?a=1&amp;b=2"/);
  assert.ok(!html.includes('<script>'));
  assert.match(html, /&lt;script&gt;/);
  assert.throws(() => renderPolicy('# Policy\n\n```js\ncode\n```'), /Unsupported policy syntax/);
});

test('catalog categories and privacy directory include every app', () => {
  const home = files.get('index.html');
  const directory = files.get(path.join('privacy', 'index.html'));
  for (const app of apps) {
    assert.ok(home.includes(`href="apps/${app.slug}/index.html"`), app.name);
    assert.ok(directory.includes(`href="${app.slug}/index.html"`), app.name);
  }
  assert.equal(apps.filter((app) => app.category === 'Everyday tools').length, 3);
  assert.equal(apps.filter((app) => app.category === 'Lifestyle').length, 2);
  assert.equal(apps.filter((app) => app.category === 'Games & sport').length, 2);
  assert.match(home, /role="status" aria-live="polite"/);
  assert.match(home, /class="app-filters"[^>]* hidden/);
});

test('generated files on disk are current and the sitemap covers every page', () => {
  for (const [name, html] of files) {
    assert.equal(fs.readFileSync(path.join(root, name), 'utf8'), html, name);
  }
  const sitemap = files.get('sitemap.xml');
  assert.equal((sitemap.match(/<url>/g) || []).length, pages.length);
  assert.match(files.get('robots.txt'), /Sitemap: https:\/\/mishmash-labs.github.io\/sitemap.xml/);
});
