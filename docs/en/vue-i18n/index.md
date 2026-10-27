# Vue i18n Overview

> A series of notes on internationalizing Vue apps: message structure, runtime switching, build-time extraction, and SSR / SEO trade-offs.

## Why vue-i18n

- Official ecosystem, actively maintained, supports Vue 2 / Vue 3
- Compile-time message extraction via `vue-i18n` message compiler → smaller bundles
- Mature Vite / Nuxt integration (`@intlify/unplugin-vue-i18n`, `@nuxtjs/i18n`)

## Contents

| Chapter | Description |
| --- | --- |
| [Quick Start](./start) | Install, configure, switch locale from scratch |
| [Gotchas](./trap) | Pitfalls I hit in real projects and how to avoid them |

## Suggested message structure

```text
src/
  locales/
    zh-CN.ts
    en-US.ts
    index.ts      # combined export + type hints
  i18n/
    index.ts      # createI18n instance
    messages.ts   # register language packs
```

## Design principles

1. Use dot-separated keys, not Chinese as keys: `menu.profile` instead of `menu.个人中心`
2. Type safety first: `defineI18nLocale` + global types for autocomplete on `t()`
3. Default fallback locale to avoid blank screens on missing keys
4. Lazy-load language packs in large projects — first paint ships only the default locale

Next: [Quick Start →](./start)
