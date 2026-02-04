<template>
  <!-- 프로젝트 페이지 -->
  <section class="project_wrap">
    <!-- 프로젝트 분류 -->
    <article class="project_sort container">
      <!-- 분류 sort -->
      <div class="sort">{{ project.sort }}</div>
      <!-- 타이틀 title -->
      <h2 class="name">{{ project.title }}</h2>
      <div class="project_links">
        <!-- 링크 links -->
        <NuxtLink
          v-for="link in project.links"
          :key="link.url"
          :to="link.url"
          :title="`${project.title} ${link.label} 새창 이동`"
          class="links"
          target="_blank"
          rel="noopener"
        >
          @{{ link.label }}
        </NuxtLink>
      </div>
    </article>

    <!-- 프로젝트 정보 -->
    <article class="project_information container">
      <ul class="task_list">
        <!-- 업무 기술 tasks -->
        <li v-for="task in project.tasks" :key="task">
          {{ task }}
        </li>
      </ul>

      <div class="project_description_wrap">
        <button
          type="button"
          :class="{ 'is-opened': isOpened }"
          @click="btnMoreToggle"
          class="btn_more"
        >
          {{ isOpened ? 'Project Detail' : 'Show more Information' }}
        </button>
        <table class="project_description">
          <caption>
            {{
              project.title
            }}프로젝트 설명
          </caption>
          <colgroup>
            <col width="20%" />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">구분</th>
              <th scope="col">내용</th>
            </tr>
          </thead>
          <tbody>
            <!-- 요약 summary -->
            <tr>
              <th scope="row">유형</th>
              <td>{{ project.summary.type }}</td>
            </tr>
            <tr>
              <th scope="row">투입인원</th>
              <td>{{ project.summary.people }}</td>
            </tr>
            <tr>
              <th scope="row">전체 기여도</th>
              <td>{{ project.summary.contribution }}</td>
            </tr>
            <tr>
              <th scope="row">환경 및 기술</th>
              <td>{{ project.summary.tech }}</td>
            </tr>
            <tr>
              <th scope="row">언어</th>
              <td>{{ project.summary.language }}</td>
            </tr>
            <tr>
              <th scope="row">기간</th>
              <td>{{ project.summary.period }}</td>
            </tr>
            <tr>
              <th scope="row">구성</th>
              <td>
                <!-- 담당 업무 configruation-->
                <ul class="task_list">
                  <li v-for="config in project.configuration" :key="config.label">
                    <div class="sort">{{ config.label }}</div>
                    <span v-if="config.description" style="white-space: pre-line">
                      {{ config.description }}
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- 프로젝트 이미지 -->
    <!-- 이미지 Images -->
    <article class="project_images" v-if="image">
      <img :src="image.src" :alt="image.alt" class="project_img" />
    </article>

    <!-- 현제 페이지 외 나머지 프로젝트 네비게이션 -->
    <nav class="nav_others_wrap container">
      <h3 class="nav_title">Other Projects</h3>
      <ul class="project_list">
        <li v-for="item in otherProjects" :key="item.key" class="project_item">
          <NuxtLink :to="`/projects/${item.key}`" :title="`${item.title} 페이지로 이동`">
            <span class="sort">{{ item.sort }}</span>
            <strong class="title">{{ item.title }}</strong>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup>
/**
 * 환경변수 기반 자동 전환
 *
 * useProjectsUnified()는 내부적으로:
 * - NUXT_PUBLIC_DATA_SOURCE=static → useProjects() 호출 (동기)
 * - NUXT_PUBLIC_DATA_SOURCE=api → useProjectsApi() 호출 (비동기)
 *
 * API 모드일 때는 await가 필요하므로 항상 await 사용
 */

// api/static 로 호출할경우
import { useProjectsUnified } from '@/composables/useProjectsUnified';
// static 으로만 호출할떄
//import { useProjects } from '@/composables/useProjects';

const route = useRoute(); // 라우터 가져오기

// 통합 composable 사용 (환경변수에 따라 자동 전환)
const { allProjects, getProject, getOtherProjects, dataSource } = await useProjectsUnified();

// 더보기 버튼 토글
const isOpened = ref(false);
const btnMoreToggle = () => {
  isOpened.value = !isOpened.value;
};

// 프로젝트 데이터 - 속성이 변했을때 감지하고 자동으로 다시 연산하기 위해서 computed 사용
// 현재 프로젝트 key
const projectKey = route.params.name;

// 현재 프로젝트
const project = computed(() => getProject(projectKey));

// 다른 프로젝트들 (현재 제외)
const otherProjects = computed(() => getOtherProjects(projectKey));

// 프로젝트가 없으면 404 처리
if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  });
}

// SEO 메타 태그 설정 (동적 프로젝트 정보)
usePageSeo({
  title: `프로젝트 | ${project.value.title}`,
  description: `${project.value.title} - ${project.value.sort} 프로젝트 상세 정보`,
  ogTitle: `프로젝트 | ${project.value.title}`,
  ogDescription: `${project.value.title} - ${project.value.sort}`,
});

// 이미지 가져오기 (PC / 모바일 구분)

const { image } = useResponsiveImage(project.value.images);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/_functions.scss' as *;
@use '@/assets/scss/abstracts/_mixins.scss' as *;
@use '@/assets/scss/abstracts/_mediaQuery.scss' as *;
@use '@/assets/scss/components/_button.scss' as *;
.project_wrap {
  @include media-breakpoint-up {
    display: grid;
    grid-template-areas:
      'sort information'
      'images images'
      'nav nav';
    grid-template-columns: 40% 1fr;
    grid-gap: 2rem;
  }
}

.project_sort {
  margin-bottom: 10rem;
  height: auto;
  .sort {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .name {
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .project_links {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    line-height: 1.6;
    .links {
      width: max-content;
      @extend %anchor;
      font-weight: normal;
      color: var(--gray-color);
      transition: color 0.2s;
      &::after {
        opacity: 0;
        content: '';
        width: 1rem;
        height: 1rem;
        margin-left: 0.6rem;
        background-color: var(--text-color);
        mask-image: url('#{svg-image(arrow-short)}');
        -webkit-mask-image: url('#{svg-image(arrow-short)}');
        transition: opacity 0.2s transform 0.1s 0.2s;
      }
      &:hover {
        font-weight: bold;
        color: var(--text-color);
        &::after {
          opacity: 1;
          transform: rotate(360deg);
        }
      }
    }
  }
  @include media-breakpoint-up {
    grid-area: sort;
    margin-bottom: 0;
    .sort {
      font-size: 2rem;
    }
    .name {
      font-size: 4.2rem;
      line-height: 1.2;
    }
    .project_links {
      margin-top: 8rem;
      font-size: 1.4rem;
    }
  }
}
.task_list {
  display: table;
  white-space: pre-line;
  li {
    & + li {
      margin-top: 0.4rem;
    }
    > .sort {
      width: max-content;
    }
  }
  @include media-breakpoint-up {
    li {
      & + li {
        margin-top: 1rem;
      }
    }
  }
}
.project_information {
  height: auto;
  margin-top: auto;
  @include media-breakpoint-up {
    grid-area: information;
    margin-top: 4rem;
    margin-bottom: 2rem;
    font-size: 1.4rem;
  }
}
.project_description {
  display: none;
  width: 95%;
  margin-left: auto;
  line-height: 1.6;
  thead,
  caption {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  th,
  td {
    padding: 0.4rem 0;
    border-top: 1px solid var(--border-color);
    vertical-align: top;
    text-align: left;
  }
  th + td {
    padding-left: 2rem;
  }
  li {
    list-style-type: disc;
    margin-left: 1.8rem;
  }
  tbody {
    tr:first-child {
      th,
      td {
        border-top: none;
      }
    }
  }
  @include media-breakpoint-up {
    li {
      padding: 0.4rem 0;
    }
  }
}
.project_description_wrap {
  margin-top: 2rem;
  .btn_more {
    color: var(--text-color);
    @extend %anchor;
    justify-content: space-between;
    width: 100%;
    padding: 0.8rem 0;
    border-top: 1px solid var(--text-color);
    border-bottom: 1px solid var(--text-color);
    transition: border-top 0.2s border-bottom 0.2s;
    &::before {
      display: none;
    }
    &::after {
      width: 1rem;
      height: 1rem;
      margin-left: 0.6rem;
      background-color: var(--text-color);
      mask-image: url('#{svg-image(arrow-down)}');
      -webkit-mask-image: url('#{svg-image(arrow-down)}');
    }
    &.is-opened {
      &::after {
        transform: rotate(180deg);
      }
      & + .project_description {
        opacity: 1;
        visibility: visible;
        display: table;
      }
    }
  }
  @include media-breakpoint-up {
    margin-top: 10rem;
  }
}

.project_images {
  position: relative;
  //padding-bottom: 68%;
  margin-top: 2rem;
  width: 100%;
  height: 30rem;
  overflow: hidden;
  [data-theme='dark'] & {
    &::after {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  .project_img {
    width: 100%;
    height: auto;
    max-width: none;
    transform: translateY(0);
    transition-property: transform;
    transition-timing-function: linear;
    transition-duration: 10s;
  }
  &:hover,
  &:active {
    &::after {
      opacity: 0;
    }
    .project_img {
      transform: translateY(calc(calc(100% - 30rem) * -1));
    }
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.3s;
  }
  @include media-breakpoint-up {
    height: 70rem;
    grid-area: images;
    margin-top: 0;
    .project_img {
      transition-duration: 10s;
      transition-delay: 0.4s;
    }

    &:hover {
      .project_img {
        transform: translateY(calc(calc(100% - 70rem) * -1));
      }
    }
  }
}

.nav_others_wrap {
  margin-top: 4rem;
  grid-area: nav;
  .nav_title {
    padding-bottom: 0.4rem;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--text-color);
  }
  .project_list {
    li {
      display: flex;
      justify-content: space-between;
      &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
      }
      a {
        padding: 0.8rem 0;
        width: 100%;
        &:hover,
        &:active {
          background-color: var(--primary-color);
        }
      }
      strong {
        margin-left: 2rem;
      }
    }
  }
  @include media-breakpoint-up {
    .nav_title {
      font-size: 1.6rem;
    }
    font-size: 1.2rem;
  }
}
</style>
