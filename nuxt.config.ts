// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
  ],
  i18n: {
    vueI18n: './plugins/i18n', 
  },
  // axios: {
  //   baseURL: 'https://auth.ronservice.co',
  // }
})
