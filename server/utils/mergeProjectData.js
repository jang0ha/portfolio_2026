/**
 * 프로젝트 데이터 병합 유틸리티
 *
 * app/data/raw/ 폴더의 JSON 파일들을 읽어서
 * projectKey를 기준으로 병합합니다.
 *
 * 기존 app/data/projects.js의 로직을 서버 사이드로 이동
 */

import projects from '../../app/data/raw/projects.json';
import links from '../../app/data/raw/links.json';
import tasks from '../../app/data/raw/tasks.json';
import summary from '../../app/data/raw/summary.json';
import configuration from '../../app/data/raw/configuration.json';
import images from '../../app/data/raw/images.json';

/**
 * 모든 프로젝트 데이터를 병합하여 반환
 * @returns {Object} projectKey를 키로 하는 프로젝트 객체
 */
export function mergeProjectData() {
  const result = {};

  // 1. 기본 프로젝트 정보 초기화
  projects.forEach((project) => {
    result[project.projectKey] = {
      key: project.projectKey,
      sort: project.sort,
      title: project.title,
      links: [],
      tasks: [],
      summary: {},
      configuration: [],
      images: {},
    };
  });

  // 2. 링크 추가
  links.forEach((link) => {
    result[link.projectKey]?.links.push({
      label: link.label,
      url: link.url,
    });
  });

  // 3. 업무 기술 추가
  tasks.forEach((task) => {
    result[task.projectKey]?.tasks.push(task.text);
  });

  // 4. 요약 정보 추가
  summary.forEach((summarytext) => {
    if (result[summarytext.projectKey]) {
      result[summarytext.projectKey].summary = {
        type: summarytext.type,
        people: summarytext.people,
        contribution: summarytext.contribution,
        tech: summarytext.tech,
        language: summarytext.language,
        period: summarytext.period,
      };
    }
  });

  // 5. 담당 업무 추가
  configuration.forEach((configtext) => {
    result[configtext.projectKey]?.configuration.push({
      label: configtext.label,
      description: configtext.description || '',
    });
  });

  // 6. 이미지 추가
  images.forEach((img) => {
    if (result[img.projectKey]) {
      result[img.projectKey].images[img.device] = {
        src: img.src,
        alt: img.alt,
      };
    }
  });

  return result;
}

/**
 * 프로젝트 배열 형태로 반환
 * @returns {Array} 프로젝트 배열
 */
export function getProjectsArray() {
  const mergedData = mergeProjectData();
  return Object.values(mergedData);
}

/**
 * 특정 프로젝트 조회
 * @param {string} key - 프로젝트 키
 * @returns {Object|null} 프로젝트 객체 또는 null
 */
export function getProjectByKey(key) {
  const mergedData = mergeProjectData();
  return mergedData[key] || null;
}
