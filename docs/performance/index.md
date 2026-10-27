# Web 性能优化笔记

> 一套可落地的前端性能诊断与优化清单，覆盖首屏、渲染、网络与打包体积。

## 优化前的诊断（先量再改）

1. **Lighthouse**：跑移动端报告，看 FCP / LCP / CLS / INP 四项核心指标
2. **Performance 面板**：定位长任务、主线程阻塞、布局抖动
3. **Network 面板**：看请求数、体积、瀑布图里被卡住的资源

## 首屏优化

| 手段 | 收益 | 成本 |
| --- | --- | --- |
| 代码分割 `dynamic import` | 减小首屏 JS | 低 |
| 路由懒加载 | 按需加载页面 | 低 |
| 图片 `loading="lazy"` + 响应式 `srcset` | 减少首屏图片下载 | 低 |
| 关键 CSS 内联 | 更快首屏样式 | 中 |
| 字体 `font-display: swap` | 避免 FOIT 白屏 | 低 |

## 渲染优化

- 列表加 `key`，避免整棵 diff
- `v-memo` / 计算属性缓存高频计算
- 大列表用虚拟滚动（`vue-virtual-scroller`）
- 避免不必要的响应式：`markRaw`、`shallowRef` 用于大数据结构

## 网络优化

- 开启 Gzip / Brotli 压缩
- 合理使用 HTTP 缓存（`Cache-Control` + ETag）
- CDN 加速静态资源
- 合并小请求，减少并发连接

## 打包体积治理

```bash
npx vite-bundle-visualizer
```

- 找出体积大户，按需引入（如 `lodash-es` 代替 `lodash`）
- 关闭没用的依赖 tree-shaking 开关
- 第三方库用 ESM 版本，交给打包器按需裁切

## 检查清单（上线前过一遍）

- [ ] FCP < 1.5s，LCP < 2.5s
- [ ] 首屏 JS < 200KB（gzip）
- [ ] 无未压缩大图
- [ ] 开启压缩与缓存
- [ ] 移动端可交互（INP < 200ms）
