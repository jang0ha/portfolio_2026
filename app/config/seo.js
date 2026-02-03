/**
 * SEO 메타 태그 중앙 관리
 *
 * 페이지별 메타 태그를 한 곳에서 관리합니다.
 * 동적 페이지(프로젝트 상세)는 페이지 내에서 useHead()로 처리합니다.
 */

export const seoConfig = {
  // 메인 페이지
  '/': {
    title: 'Portfolio | 장영하',
    description:
      '4년간의 웹 퍼블리싱과 프론트엔드 개발 경험을 바탕으로 Nuxt.js, GSAP, SCSS를 활용한 프로젝트 포트폴리오',
    ogTitle: 'Portfolio | 장영하',
    ogDescription: '웹 퍼블리싱 & 프론트엔드 개발자 포트폴리오',
  },

  // About 페이지
  '/about': {
    title: 'About | 장영하',
    description:
      '4년간 웹 퍼블리싱과 프론트엔드 개발 경험. Nuxt.js, GSAP, SCSS를 활용한 데이터 중심 설계와 컴포넌트 기반 아키텍처 구현',
    ogTitle: 'About | 장영하',
    ogDescription:
      '웹 표준, 접근성, 성능 최적화를 기반으로 실무에서 요구되는 프론트엔드 개발 역량',
  },
};

/**
 * 현재 경로에 맞는 SEO 메타 태그 반환
 * @param {string} path - 페이지 경로
 * @returns {Object|null} 페이지 메타 정보
 */
export function getPageMeta(path) {
  return seoConfig[path] || null;
}
