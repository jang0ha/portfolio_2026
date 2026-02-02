/**
 * 모든 프로젝트 조회 API
 *
 * GET /api/projects
 *
 * 실무에서는 데이터베이스에서 데이터를 가져오지만,
 * 이 프로젝트에서는 JSON 파일을 읽어서 반환합니다.
 *
 * 응답 예시:
 * {
 *   "success": true,
 *   "data": [
 *     { key: "hiveplatform", title: "...", ... },
 *     ...
 *   ],
 *   "total": 7
 * }
 */

export default defineEventHandler(async (event) => {
  try {
    // 서버 유틸에서 데이터 가져오기 (상대 경로 사용)
    const { getProjectsArray } = await import('../../utils/mergeProjectData');
    const projects = getProjectsArray();

    // 실무 API 형태로 응답
    return {
      success: true,
      data: projects,
      total: projects.length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    // 에러 핸들링
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch projects',
      data: {
        success: false,
        error: error.message,
      },
    });
  }
});
