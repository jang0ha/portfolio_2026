/**
 * 특정 프로젝트 조회 API
 *
 * GET /api/projects/:key
 *
 * URL 파라미터로 프로젝트 키를 받아서 해당 프로젝트 정보를 반환합니다.
 *
 * 응답 예시:
 * {
 *   "success": true,
 *   "data": {
 *     key: "hiveplatform",
 *     title: "하이브 플랫폼 웹사이트",
 *     ...
 *   }
 * }
 */

export default defineEventHandler(async (event) => {
  try {
    // URL 파라미터에서 key 가져오기
    const key = getRouterParam(event, 'key');

    if (!key) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Project key is required',
        data: {
          success: false,
          error: 'Missing project key parameter',
        },
      });
    }

    // 서버 유틸에서 데이터 가져오기 (상대 경로 사용)
    const { getProjectByKey } = await import('../../utils/mergeProjectData');
    const project = getProjectByKey(key);

    // 프로젝트를 찾지 못한 경우
    if (!project) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Project not found',
        data: {
          success: false,
          error: `Project with key "${key}" not found`,
        },
      });
    }

    // 실무 API 형태로 응답
    return {
      success: true,
      data: project,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    // 이미 createError로 던진 에러는 그대로 전파
    if (error.statusCode) {
      throw error;
    }

    // 예상치 못한 에러 처리
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
      data: {
        success: false,
        error: error.message,
      },
    });
  }
});
