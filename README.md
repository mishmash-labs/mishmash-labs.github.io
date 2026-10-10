# Mishmash Labs

A responsive, static app-studio website with a warm, flat pastel design. Includes the homepage, seven dedicated app pages, a privacy-policy directory, and seven readable policy pages.

## Develop and preview

Requires Node.js 18 or later. There are no npm dependencies to install.

```sh
npm run build
npm test
npm run check
```

Open [index.html](index.html) directly in a browser, or serve the repository with a static server. All internal links use relative paths and explicit `index.html` filenames, so both local-file previews and GitHub Pages work. Content, downloads, privacy policies, and FAQ disclosures work without JavaScript; JavaScript enhances mobile navigation and app filtering.

## Update the site

- Edit app descriptions, features, FAQs, platforms, and store links in [assets/apps.json](assets/apps.json).
- Edit layouts in [scripts/build.js](scripts/build.js), shared styles in [assets/site.css](assets/site.css), and interactions in [assets/site.js](assets/site.js).
- The homepage hero highlights the studio's Google Play and App Store developer links with large buttons in place of "Find your next app" and "Meet the studio." Update these developer URLs in [scripts/build.js](scripts/build.js); individual app store URLs remain in [assets/apps.json](assets/apps.json).
- The shared footer in [scripts/build.js](scripts/build.js) links to the studio's Instagram, GitHub, and LinkedIn profiles on every page.
- Keep legal content in the existing [privacy_policies](privacy_policies) Markdown files. The build renders them without changing their terms. The policy renderer supports the syntax currently used by these files: headings, paragraphs, flat unordered lists with continuation lines, bold text, inline code, and HTTP(S) links. Unsupported block syntax fails the build.
- Run `npm run build` after editing app content, templates, or policy sources. Commit the generated HTML, sitemap, and robots file with the source changes. `npm run check` verifies generated files are current.

### Privacy-policy updates

Keep each website policy source identical to the corresponding policy in the app repository. Konvertr and Konvertr Pro share a repository but have separate policies:

| Website source in `privacy_policies` | App-repository source |
| --- | --- |
| `autofolio_policy.md` | `autofolio/docs/privacy-policy.md` |
| `5prayers_policy.md` | `five-prayers/docs/privacy_policy.md` |
| `konvertr_policy.md` | `konvertr/docs/privacy-policy-free.md` |
| `konvertrpro_policy.md` | `konvertr/docs/privacy-policy-pro.md` |
| `explorelahore_policy.md` | `explore_lahore/docs/PRIVACY_POLICY.md` |
| `wordsleuth_policy.md` | `word_sleuth/docs/privacy_policy.md` |
| `profpl_policy.md` | `profpl/docs/privacy_policy.md` |

Verify disclosures against the current app implementation, update the revision date, and synchronize both copies. Also update related privacy summaries and FAQs in [assets/apps.json](assets/apps.json) when practices change. Run the build, tests and generated-file check so the collective [privacy directory](privacy/index.html), individual policy pages and downloadable Markdown copies remain consistent. App repositories are not needed to build this website.

The visual app previews are labeled illustrative layouts, not screenshots. Store listings are the source of current availability, pricing, and product details.

## Deployment and existing resources

GitHub Pages serves the committed static files directly; no deployment build or framework is required. The build produces [sitemap.xml](sitemap.xml) and [robots.txt](robots.txt) for the canonical `https://mishmash-labs.github.io` origin.

Existing Markdown policy URLs, `app-ads.txt`, Google verification, and the [Explore Lahore guide-data feed](explore_lahore) are preserved. DM Sans loads from Google Fonts with system-font fallbacks. The website does not include visitor counters, analytics, advertising, or tracking scripts. Individual mobile apps have their own data practices described in their policies.

## Website privacy

Visitor tracking is currently disabled; this site does not collect page-view or unique-visitor totals. [assets/site.js](assets/site.js) only enhances mobile navigation and app filtering.

The [website privacy notice](privacy/index.html#website-privacy), linked from every page's footer, documents the site's hosting and font providers separately from the unchanged app policies. GitHub Pages and Google Fonts receive connection information when serving their resources; the site code does not set cookies or create visitor identifiers.
