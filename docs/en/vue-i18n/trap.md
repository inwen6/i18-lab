# Vue i18n Gotchas

> Pitfalls I hit in real projects and how to avoid them.

## 1. Don't hard-concatenate plurals / units

❌ Wrong:

```ts
t('dayCount') + ' days'
```

Use plural message formats:

```ts
// en-US
dayCount: '{count} day | {count} days'
```

```ts
t('dayCount', { count: 2 })
```

## 2. `t()` outside components

Using `t` in a plain `.ts` file may not pick up the current locale.

Use the instance directly:

```ts
import i18n from '@/i18n'
i18n.global.t('common.save')
```

## 3. `0` / falsy interpolation values

`t('welcome', { count: 0 })` may drop the `0`.

Enable `fallbackFormat` and use explicit `{{ count }}` interpolation.

## 4. Forgot `legacy: false`

Vue 3 Composition API requires `legacy: false`, otherwise `useI18n()` behaves unexpectedly.

## 5. Dynamic keys lose type hints

```ts
t(`menu.${dynamicKey}`)
```

Narrow with a const array and a fallback.

## 6. Loading all language packs hurts first paint

Lazy-load large packs:

```ts
const messages = {
  'en-US': () => import('../locales/en-US')
}
```

## 7. SSR / SEO locale mismatch

In Nuxt / SSR, keep `locale`, `lang`, and `<html>` consistent. Use `@nuxtjs/i18n` with `strategy: 'prefix_except_default'`.
