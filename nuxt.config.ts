// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'nuxt-swiper', '@nuxt/image-edge'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  features: {
    inlineStyles: false,
  },
  postcss: {
    plugins: {
      cssnano: {
        preset: ['default', { cssDeclarationSorter: false }],
      },
    },
  },
  css: ['~/assets/scss/layout/_index.scss'],

  app: {
    head: {
      title: 'Portfolio | 장영하',
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '4년간의 웹 퍼블리싱과 프론트엔드 경험을 바탕으로 Nuxt.js, GSAP, SCSS를 활용한 프로젝트 포트폴리오',
        },
        { name: 'author', content: '장영하' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Portfolio | 장영하' },
        { property: 'og:title', content: 'Portfolio | 장영하' },
        {
          property: 'og:description',
          content: '웹 퍼블리싱 & 프론트엔드 포트폴리오',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
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

  runtimeConfig: {
    // 서버 사이드에서만 접근 가능한 설정
    // (현재는 필요 없지만 향후 DB 연결 등에 사용)
    // apiSecret: '', // .env의 NUXT_API_SECRET로 자동 오버라이드

    // 클라이언트에서도 접근 가능한 공개 설정
    public: {
      // 데이터 소스: 'static' 또는 'api'
      // .env 파일의 NUXT_PUBLIC_DATA_SOURCE 값으로 자동 오버라이드됨
      // 기본값: 'static' (환경변수가 없을 때)
      dataSource: 'static',

      // API 기본 URL (선택사항)
      // .env 파일의 NUXT_PUBLIC_API_BASE_URL 값으로 자동 오버라이드됨
      apiBaseUrl: '',
    },
  },
});
