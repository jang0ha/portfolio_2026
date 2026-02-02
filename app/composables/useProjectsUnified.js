/**
 * 통합 프로젝트 Composable
 *
 * 환경변수(NUXT_PUBLIC_DATA_SOURCE)에 따라
 * 정적 데이터 또는 API를 선택적으로 사용합니다.
 *
 * 이 파일은 기존 코드 수정 없이 데이터 소스를 전환할 수 있도록 합니다.
 *
 * 사용 예시:
 * // .env 파일에서 NUXT_PUBLIC_DATA_SOURCE=static 또는 api 설정
 * const { allProjects, getProject, getOtherProjects } = await useProjectsUnified();
 */

import { useProjects } from './useProjects';
import { useProjectsApi } from './useProjectsApi';

/**
 * 환경변수 기반 프로젝트 데이터 접근
 *
 * @returns {Object} { allProjects, getProject, getOtherProjects, dataSource }
 */
export async function useProjectsUnified() {
  const config = useRuntimeConfig();
  const dataSource = config.public.dataSource || 'static';

  // API 모드
  if (dataSource === 'api') {
    const apiData = await useProjectsApi();
    return {
      ...apiData,
      dataSource: 'api',
    };
  }

  // 정적 모드 (기본값)
  const staticData = useProjects();
  return {
    ...staticData,
    dataSource: 'static',
  };
}

/**
 * 현재 데이터 소스 확인
 * @returns {string} 'static' 또는 'api'
 */
export function useDataSource() {
  const config = useRuntimeConfig();
  return config.public.dataSource || 'static';
}
