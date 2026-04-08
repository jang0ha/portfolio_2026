// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', 'nuxt-swiper', '@nuxt/image-edge'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  features: {
    inlineStyles: true, //스타일 순서 나타내려면 fasle , features.inlineStyles를 활성화하여 렌더링 차단 리소스를 최소화
  },
  vite: {
    build: {
      // CSS를 별도 파일로 하나만 뽑아내도록 설정
      //특정 크기 이상의 스타일만 외부 파일로 빼고, 나머지는 인라이닝하지 않도록 설정하여 '한 번만 로드'되는 구조를 만듭니다. (Vite 설정 활용)
      cssCodeSplit: false,
    },
  },
  postcss: {
    plugins: {
      cssnano: {
        preset: [
          'default',
          {
            cssDeclarationSorter: false,
            discardComments: { removeAll: true }, // 모든 주석 제거 (용량 최적화)
          },
        ],
      },
    },
  },
  nitro: {
    routeRules: {
      '/': { prerender: true }, // 메인 페이지를 사전 렌더링하면 스타일 추출이 더 정확해집니다.
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/img/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        //{
        //  rel: 'modulepreload',
        //  href: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.js',
        //},
        {
          rel: 'preload',
          href: '/fonts/noto-serif-kr-v31-korean-regular.woff2', // 스크린샷 상단 폰트
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/noto-serif-kr-v31-korean-900.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
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
