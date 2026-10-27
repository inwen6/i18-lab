# Vue i18n 陷阱与避坑

> 以下是我在实际项目中踩过的坑，以及对应的规避方案。

## 1. 复数与带单位的文本别硬拼

❌ 错误：

```ts
t('dayCount') + ' 天'
```

正确：在语言包里用复数消息格式

```ts
// en-US
dayCount: '{count} day | {count} days'
// zh-CN
dayCount: '{count} 天'
```

```ts
t('dayCount', { count: 2 })
```

## 2. `t()` 在组合式外的坑

在普通 `.ts` 文件（非组件内）直接用 `t` 可能拿不到当前 locale，或触发警告。

规避：导出 i18n 实例后直接用

```ts
import i18n from '@/i18n'

export function someHelper() {
  return i18n.global.t('common.save')
}
```

## 3. 布尔值 / 变量传给插值会丢失

`t('welcome', { count: 0 })` 在某些配置下 `0` 会被当假值丢弃。

规避：`createI18n` 里开启

```ts
const i18n = createI18n({
  missingWarn: true,
  fallbackWarn: true,
  fallbackFormat: true
})
```

并给 `count` 用 `{{ count }}` 显式插值。

## 4. `legacy: false` 忘了传导致 API 不对

Vue 3 使用 Composition API 时必须 `legacy: false`，否则 `useI18n()` 行为不符合预期。

## 5. 动态 key（模板字符串）会失去类型提示

```ts
t(`menu.${dynamicKey}`)
```

规避：用对象索引收窄范围

```ts
const keys = ['profile', 'logout'] as const
t(`menu.${keys.includes(k) ? k : 'profile'}`)
```

## 6. 首屏加载全量语言包拖慢体积

规避：按需动态 import

```ts
import { defineAsyncComponent } from 'vue'
// 语言包同样可以用异步加载
const messages = {
  'en-US': () => import('../locales/en-US')
}
```

## 7. SSR / SEO 场景 locale 不一致

Nuxt 或 SSR 下，语言要与 `lang` 属性、`<html>` 标签保持一致，否则搜索引擎抓取混乱。用 `@nuxtjs/i18n` 时配置 `strategy: 'prefix_except_default'` 处理默认语言路径。

## 小结

- 插值用消息格式，不硬拼字符串
- 组件外用 `i18n.global.t`
- 记住 `legacy: false`
- 动态 key 尽量收窄类型
- 大项目语言包懒加载
