# 代码片段 Snippet

> 常用工具函数、正则、Vue 组合式封装，随取随用，持续沉淀。

## 防抖 & 节流

```ts
export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let timer: ReturnType<typeof setTimeout>
  return function (...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => void>(fn: T, limit = 300) {
  let last = 0
  return function (...args: Parameters<T>) {
    const now = Date.now()
    if (now - last >= limit) {
      last = now
      fn(...args)
    }
  }
}
```

## 深拷贝（结构化克隆，无循环引用时用）

```ts
export function deepClone<T>(value: T): T {
  return structuredClone(value)
}
```

## 对象按 key 排序（稳定 JSON 输出）

```ts
export function sortObjectKeys<T extends Record<string, any>>(obj: T): T {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      const v = obj[key]
      acc[key] = v && typeof v === 'object' && !Array.isArray(v)
        ? sortObjectKeys(v)
        : v
      return acc
    }, {} as T)
}
```

## 数字千分位

```ts
export function toThousands(n: number | string): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
```

## Vue 组合式：窗口尺寸响应式

```ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}
```

## 小结

片段持续沉淀中，欢迎随手复制使用。更多可交互的工具见 [工具 Demo](/demo/)。
