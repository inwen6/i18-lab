# Vue i18n 概览

> 这一系列记录我在 Vue 项目中落地国际化的完整路径：从语言包结构、运行时切换，到构建期抽取、SSR 与 SEO 的取舍。

## 为什么是 vue-i18n

- 官方生态、维护活跃，Vue 2 / Vue 3 都有对应版本
- 支持**编译期消息抽取**（`vue-i18n` 的消息编译器），体积更小
- 与 Vite / Nuxt 集成成熟（`@intlify/unplugin-vue-i18n`、`@nuxtjs/i18n`）

## 内容导航

| 章节 | 说明 |
| --- | --- |
| [快速上手](./start) | 从零安装、配置、切换语言的完整流程 |
| [陷阱与避坑](./trap) | 我在实际项目中踩过的坑与规避方案 |

## 我的语言包结构建议

```text
src/
  locales/
    zh-CN.ts
    en-US.ts
    index.ts      # 汇总导出 + 类型提示
  i18n/
    index.ts      # createI18n 实例
    messages.ts   # 语言包注册
```

## 设计原则

1. **Key 用点号分层，不用中文做 key**：`menu.profile` 而不是 `menu.个人中心`
2. **类型安全优先**：用 `defineI18nLocale` + 全局类型让 `t()` 有补全与校验
3. **默认语言兜底**：缺失 key 回退到 `fallbackLocale`，避免白屏
4. **懒加载语言包**：大项目按需动态 import，首屏只带默认语言

下一章：[快速上手 →](./start)
