# Web Performance Notes

> A practical frontend performance audit & optimization checklist: first paint, rendering, network, bundle size.

## Diagnose before you optimize

1. **Lighthouse**: mobile report, focus on FCP / LCP / CLS / INP
2. **Performance panel**: long tasks, main-thread blocking, layout thrashing
3. **Network panel**: request count, size, waterfall bottlenecks

## First-paint optimizations

| Tactic | Benefit | Cost |
| --- | --- | --- |
| Code splitting `dynamic import` | smaller first JS | low |
| Route lazy loading | load per page | low |
| `loading="lazy"` images + responsive `srcset` | fewer downloads | low |
| Inline critical CSS | faster first style | medium |
| `font-display: swap` | avoid FOIT | low |

## Rendering optimizations

- `key` on lists to avoid full-tree diff
- `v-memo` / cached computed for hot calculations
- Virtual scrolling for big lists (`vue-virtual-scroller`)
- Avoid unnecessary reactivity: `markRaw`, `shallowRef` for large structures

## Network optimizations

- Enable Gzip / Brotli
- HTTP caching (`Cache-Control` + ETag)
- CDN for static assets
- Merge small requests

## Bundle-size control

```bash
npx vite-bundle-visualizer
```

- Replace heavy deps (`lodash-es` instead of `lodash`)
- Prefer ESM versions so the bundler can tree-shake

## Pre-launch checklist

- [ ] FCP < 1.5s, LCP < 2.5s
- [ ] first JS < 200KB (gzip)
- [ ] no large uncompressed images
- [ ] compression & caching enabled
- [ ] mobile interactive (INP < 200ms)
