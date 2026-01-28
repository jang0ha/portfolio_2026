// 프로젝트 데이터

import projects from '@/data/projects';

export function useProjects() {
  //배열로 담기
  const allProjects = Object.values(projects);
  // 프로젝트 키갑 ㅅ가져오기
  const getProject = (key) => allProjects.find((project) => project.key === key);
  // 현재 페이지값이 아닌 프로젝트들 찾기
  const getOtherProjects = (currentKey) =>
    allProjects.filter((project) => project.key !== currentKey);

  return {
    allProjects,
    getProject,
    getOtherProjects,
  };
}
