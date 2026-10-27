# Code Snippets

> Utility functions, regex, Vue composables — copy & reuse, keep growing.

## Debounce & throttle

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

## Deep clone (structured, no circular refs)

```ts
export function deepClone<T>(value: T): T {
  return structuredClone(value)
}
```

## Stable object key sorting

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

## Thousands separator

```ts
export function toThousands(n: number | string): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
```

## Vue composable: reactive window size

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

More interactive tools in [Tools Demo](/en/demo/).
