import { defineConfig } from 'vitepress'

// i18 实验室 —— 双语技术文档站配置
export default defineConfig({
  lang: 'zh-CN',
  title: 'i18 实验室',
  description: '前端国际化、Vue 工程化、Web 性能、开发笔记与工具 Demo',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#2f855a' }]
  ],

  themeConfig: {
    logo: '/favicon.svg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    locales: {
      '/': {
        label: '简体中文',
        lang: 'zh-CN',
        title: 'i18 实验室',
        description: '前端国际化、Vue 工程化、Web 性能、开发笔记与工具 Demo',
        nav: [
          { text: '首页', link: '/' },
          { text: 'Vue i18n', link: '/vue-i18n/' },
          { text: '性能优化', link: '/performance/' },
          { text: '代码片段', link: '/snippets/' },
          { text: '工具 Demo', link: '/demo/' }
        ],
        sidebar: {
          '/vue-i18n/': [
            {
              text: 'Vue i18n',
              items: [
                { text: '概览', link: '/vue-i18n/' },
                { text: '快速上手', link: '/vue-i18n/start' },
                { text: '陷阱与避坑', link: '/vue-i18n/trap' }
              ]
            }
          ],
          '/performance/': [
            {
              text: '性能优化',
              items: [
                { text: '概览', link: '/performance/' }
              ]
            }
          ],
          '/snippets/': [
            {
              text: '代码片段',
              items: [
                { text: '概览', link: '/snippets/' }
              ]
            }
          ],
          '/demo/': [
            {
              text: '工具 Demo',
              items: [
                { text: '概览', link: '/demo/' },
                { text: '占位符预览', link: '/demo/placeholder' }
              ]
            }
          ]
        }
      },
      '/en/': {
        label: 'English',
        lang: 'en-US',
        title: 'i18 Lab',
        description: 'i18n, Vue engineering, Web performance, dev notes & tools',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Vue i18n', link: '/en/vue-i18n/' },
          { text: 'Performance', link: '/en/performance/' },
          { text: 'Snippets', link: '/en/snippets/' },
          { text: 'Demo', link: '/en/demo/' }
        ],
        sidebar: {
          '/en/vue-i18n/': [
            {
              text: 'Vue i18n',
              items: [
                { text: 'Overview', link: '/en/vue-i18n/' },
                { text: 'Quick Start', link: '/en/vue-i18n/start' },
                { text: 'Gotchas', link: '/en/vue-i18n/trap' }
              ]
            }
          ],
          '/en/performance/': [
            {
              text: 'Performance',
              items: [
                { text: 'Overview', link: '/en/performance/' }
              ]
            }
          ],
          '/en/snippets/': [
            {
              text: 'Snippets',
              items: [
                { text: 'Overview', link: '/en/snippets/' }
              ]
            }
          ],
          '/en/demo/': [
            {
              text: 'Tools',
              items: [
                { text: 'Overview', link: '/en/demo/' },
                { text: 'Placeholder Preview', link: '/en/demo/placeholder' }
              ]
            }
          ]
        }
      }
    }
  }
})
