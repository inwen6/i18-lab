// i18 占位符预览组件
// 输入含 {name} 的模板与参数，实时预览插值结果，贴合国际化场景
<template>
  <div class="placeholder-demo">
    <h3>占位符插值预览</h3>

    <label>消息模板（支持 {key} 占位）</label>
    <textarea
      v-model="template"
      rows="3"
      placeholder="例如：你好，{name}！你有 {count} 条新消息。"
    ></textarea>

    <label>参数（JSON 对象）</label>
    <textarea
      v-model="paramsText"
      rows="3"
      placeholder='{"name":"小明","count":3}'
    ></textarea>

    <div class="preview-box">
      <strong>预览结果：</strong>
      <span :class="{ empty: !result }">{{ result || '等待输入…' }}</span>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const template = ref('')
const paramsText = ref('')
const error = ref('')

const params = computed<Record<string, unknown>>(() => {
  if (!paramsText.value.trim()) return {}
  try {
    const parsed = JSON.parse(paramsText.value)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      error.value = '参数必须是 JSON 对象'
      return {}
    }
    error.value = ''
    return parsed
  } catch {
    error.value = '参数 JSON 解析失败，请检查格式'
    return {}
  }
})

const result = computed(() => {
  return template.value.replace(/\{(\w+)\}/g, (match, key: string) => {
    const val = params.value[key]
    return val === undefined || val === null ? match : String(val)
  })
})
</script>

<style scoped>
.placeholder-demo {
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  max-width: 720px;
}
.placeholder-demo label {
  display: block;
  margin: 10px 0 4px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.placeholder-demo textarea {
  width: 100%;
  padding: 8px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  resize: vertical;
}
.placeholder-demo .preview-box {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  font-size: 15px;
}
.placeholder-demo .preview-box .empty {
  color: var(--vp-c-text-3);
}
.placeholder-demo .error {
  margin-top: 8px;
  color: #e5484d;
  font-size: 13px;
}
</style>
