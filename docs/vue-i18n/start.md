# Vue i18n 快速上手

> 目标：10 分钟在 Vue 3 + Vite 项目里跑通「安装 → 配置 → 使用 → 切换语言」。

## 1. 安装

```bash
npm install vue-i18n@9
```

## 2. 创建 i18n 实例

`src/i18n/index.ts`

```ts
import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'

const i18n = createI18n({
  legacy: false,          // 使用 Composition API 模式
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
```

## 3. 语言包文件

`src/locales/zh-CN.ts`

```ts
export default {
  menu: {
    profile: '个人中心',
    logout: '退出登录'
  },
  common: {
    save: '保存',
    cancel: '取消'
  }
}
```

## 4. 挂载到应用

`src/main.ts`

```ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

createApp(App).use(i18n).mount('#app')
```

## 5. 组件内使用

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

## 6. 切换语言

```ts
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function switchLang(lang: 'zh-CN' | 'en-US') {
  locale.value = lang
  localStorage.setItem('app-lang', lang)
}
```

> 推荐把当前语言持久化到 `localStorage`，应用启动时读取并设置，避免每次刷新都回到默认语言。

## 7. 带参数的翻译（插值）

语言包：

```ts
welcome: '你好，{name}！你有 {count} 条新消息。'
```

组件：

```vue
<template>
  <p>{{ t('welcome', { name: '小明', count: 3 }) }}</p>
</template>
```

结果：`你好，小明！你有 3 条新消息。`

## 下一步

[陷阱与避坑 →](./trap)
