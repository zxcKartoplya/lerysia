export default defineNuxtConfig({
  compatibilityDate: '2026-03-28',
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { name: 'theme-color', content: '#efe2d4' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
})
