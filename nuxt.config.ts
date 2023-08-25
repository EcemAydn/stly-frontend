import themeConfig from "./themeConfig"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  components: [
    '~/components/icons',
    '~/components',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-gtag'
  ],
  i18n: {
    vueI18n: './utils/i18n',
  },
  gtag: themeConfig.GoogleGtagConfiguration,
})