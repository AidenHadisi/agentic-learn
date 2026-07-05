# Vendored libraries

Single-file builds vendored into this repo so HTML artifacts never touch the network at view time. Inline a library's contents into a `<script>`/`<style>` block only in artifacts that actually use it.

Downloaded 2026-07-05 from jsDelivr.

| File | Library | Version | Source URL |
| --- | --- | --- | --- |
| `chart.umd.min.js` | Chart.js (UMD build) | 4.5.1 | https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js |
| `highlight.min.js` | highlight.js (common languages build) | 11.11.1 | https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/highlight.min.js |
| `highlight-github.min.css` | highlight.js GitHub theme (light) | 11.11.1 | https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/styles/github.min.css |
| `highlight-github-dark.min.css` | highlight.js GitHub Dark theme | 11.11.1 | https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/styles/github-dark.min.css |
| `mermaid.min.js` | Mermaid (IIFE build, global `mermaid`) | 11.16.0 | https://cdn.jsdelivr.net/npm/mermaid@11.16.0/dist/mermaid.min.js |

## Theme pairing

The two highlight.js theme files are a light/dark pair. When inlining, scope each to the matching color scheme:

```html
<style>
/* contents of highlight-github.min.css */
@media (prefers-color-scheme: dark) {
  /* contents of highlight-github-dark.min.css, selectors unchanged */
}
</style>
```

Wrap the dark theme's rules in the `prefers-color-scheme: dark` media query so one artifact renders correctly in both schemes.

## Updating

Re-download from the URL pattern above with a newer version, verify the first line is real JS/CSS (not an HTML error page), and update this table.
