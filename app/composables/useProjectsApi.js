/**
 * 프로젝트 API 기반 Composable
 *
 * 실무 API를 사용하는 버전입니다.
 * 기존 useProjects와 동일한 인터페이스를 제공하지만,
 * 내부적으로는 API를 호출합니다.
 *
 * Nuxt의 useFetch는 SSR/SSG에서 자동으로 데이터를 가져오고,
 * 클라이언트에서는 캐싱된 데이터를 사용합니다.
 */

/**
 * 모든 프로젝트 조회
 * @returns {Object} { data, pending, error, refresh }
 */
export function useFetchAllProjects() {
  return useFetch('/api/projects', {
    // key는 캐싱을 위한 고유 식별자
    key: 'all-projects',
    // 서버에서 한 번만 가져오고 클라이언트에서 재사용
    server: true,
    // 데이터 변환
    transform: (response) => {
      return response.data || [];
    },
    // 에러 발생 시 기본값
    default: () => [],
  });
}

/**
 * 특정 프로젝트 조회
 * @param {string} key - 프로젝트 키
 * @returns {Object} { data, pending, error, refresh }
 */
export function useFetchProject(key) {
  return useFetch(`/api/projects/${key}`, {
    key: `project-${key}`,
    server: true,
    transform: (response) => {
      return response.data || null;
    },
    default: () => null,
  });
}

/**
 * API 기반 프로젝트 데이터 접근 (기존 useProjects와 동일한 인터페이스)
 *
 * 사용 예시:
 * const { allProjects, getProject, getOtherProjects } = await useProjectsApi();
 */
export async function useProjectsApi() {
  // 모든 프로젝트 데이터 가져오기
  const { data: allProjects, error } = await useFetchAllProjects();

  // 에러 처리
  if (error.value) {
    console.error('Failed to fetch projects:', error.value);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load projects',
    });
  }

  /**
   * 프로젝트 키로 특정 프로젝트 찾기
   * @param {string} key - 프로젝트 키
   * @returns {Object|undefined} 프로젝트 객체
   */
  const getProject = (key) => {
    return allProjects.value?.find((project) => project.key === key);
  };

  /**
   * 현재 프로젝트를 제외한 다른 프로젝트들
   * @param {string} currentKey - 현재 프로젝트 키
   * @returns {Array} 다른 프로젝트 배열
   */
  const getOtherProjects = (currentKey) => {
    return allProjects.value?.filter((project) => project.key !== currentKey) || [];
  };

  return {
    allProjects,
    getProject,
    getOtherProjects,
  };
}

/**
 * 비동기 데이터 로딩 (개별 프로젝트용)
 *
 * 페이지에서 특정 프로젝트만 필요한 경우 사용
 * 사용 예시:
 * const { project, pending, error } = await useAsyncProject('hiveplatform');
 */
export async function useAsyncProject(key) {
  const { data: project, pending, error, refresh } = await useFetchProject(key);

  // 프로젝트가 없으면 404 에러
  if (!pending.value && !project.value && !error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    });
  }

  return {
    project,
    pending,
    error,
    refresh,
  };
}
