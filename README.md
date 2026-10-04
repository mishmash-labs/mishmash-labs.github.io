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
- Keep legal content in the existing [privacy_policies](privacy_policies) Markdown files. The build renders them without changing their terms. The policy renderer supports the syntax currently used by these files: headings, paragraphs, flat unordered lists with continuation lines, bold text, inline code, and HTTP(S) links. Unsupported block syntax fails the build.
- Run `npm run build` after editing app content, templates, or policy sources. Commit the generated HTML, sitemap, and robots file with the source changes. `npm run check` verifies generated files are current.

The visual app previews are labeled illustrative layouts, not screenshots. Store listings are the source of current availability, pricing, and product details.

## Deployment and existing resources

GitHub Pages serves the committed static files directly; no deployment build or framework is required. The build produces [sitemap.xml](sitemap.xml) and [robots.txt](robots.txt) for the canonical `https://mishmash-labs.github.io` origin.

Existing Markdown policy URLs, `app-ads.txt`, Google verification, and the [Explore Lahore guide-data feed](explore_lahore) are preserved. DM Sans loads from Google Fonts with system-font fallbacks. The website does not include analytics, advertising, or tracking scripts; individual mobile apps have their own data practices described in their policies.
