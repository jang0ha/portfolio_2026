// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'nuxt-swiper', '@nuxt/image-edge'],
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
  image: {
    // 로컬 이미지 기준
    dir: 'public/images',
    domains: [], // 외부 URL 허용 시 필요
  },
});
