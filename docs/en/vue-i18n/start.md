# Vue i18n Quick Start

> Goal: a Vue 3 + Vite project with install → config → usage → locale switch in ~10 minutes.

## 1. Install

```bash
npm install vue-i18n@9
```

## 2. Create the i18n instance

`src/i18n/index.ts`

```ts
import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'

const i18n = createI18n({
  legacy: false,          // use Composition API mode
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
```

## 3. Message files

`src/locales/en-US.ts`

```ts
export default {
  menu: {
    profile: 'Profile',
    logout: 'Log out'
  },
  common: {
    save: 'Save',
    cancel: 'Cancel'
  }
}
```

## 4. Mount the app

`src/main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

createApp(App).use(i18n).mount('#app')
```

## 5. Use in components

```vue
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <button>{{ t('menu.profile') }}</button>
  <button>{{ t('common.save') }}</button>
</template>
```

## 6. Switch locale

```ts
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function switchLang(lang: 'zh-CN' | 'en-US') {
  locale.value = lang
  localStorage.setItem('app-lang', lang)
}
```

> Persist the locale to `localStorage` and read it on startup, so refreshes keep the user's language.

## 7. Interpolation with params

```ts
welcome: 'Hello, {name}! You have {count} new messages.'
```

```vue
<template>
  <p>{{ t('welcome', { name: 'Xiao Ming', count: 3 }) }}</p>
</template>
```

Result: `Hello, Xiao Ming! You have 3 new messages.`

Next: [Gotchas →](./trap)
