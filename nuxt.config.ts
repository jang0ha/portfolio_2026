// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
	css: ['~/assets/scss/layout/_index.scss'],
  components: [
    {
      global: true,
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: ['@nuxt/eslint'],
})