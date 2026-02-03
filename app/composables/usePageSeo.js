import { getPageMeta } from '~/config/seo';

/**
 * 페이지별 SEO 메타 태그를 자동으로 설정하는 composable
 *
 * 사용법:
 * - 정적 페이지: usePageSeo() - 현재 경로 기반 자동 설정
 * - 동적 페이지: usePageSeo({ title: '...', description: '...' }) - 커스텀 설정
 *
 * @param {Object} customMeta - 커스텀 메타 정보 (선택사항)
 * @param {string} customMeta.title - 페이지 제목
 * @param {string} customMeta.description - 페이지 설명
 * @param {string} customMeta.ogTitle - Open Graph 제목 (선택사항)
 * @param {string} customMeta.ogDescription - Open Graph 설명 (선택사항)
 */
export function usePageSeo(customMeta) {
  const route = useRoute();
  const path = route.path;

  console.log(path);

  // 설정 파일에서 현재 경로의 메타 정보 가져오기
  const pageMeta = getPageMeta(path);
  console.log(pageMeta);

  // 커스텀 메타가 있으면 우선 사용, 없으면 설정 파일 사용
  const meta = customMeta || pageMeta;
  console.log(customMeta);
  if (!meta) {
    // 메타 정보가 없으면 기본값 사용 (nuxt.config.ts의 기본값)
    return;
  }

  // SEO 메타 태그 설정
  useHead({
    title: meta.title,
    meta: [
      {
        name: 'description',
        content: meta.description,
      },
      {
        property: 'og:title',
        content: meta.ogTitle || meta.title,
      },
      {
        property: 'og:description',
        content: meta.ogDescription || meta.description,
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],
  });
}
