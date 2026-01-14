<template>
  <!-- 프로젝트 페이지 -->
  <section class="project_wrap">
    <!-- 프로젝트 분류 -->
    <div class="project_sort container">
      <div class="sort">Frontend</div>
      <h2 class="name">하이브 플랫폼 웹사이트</h2>
      <div class="project_links">
        <NuxtLink to="https://hiveplatform.ai/" class="links" rel="noopener"
          >@hiveplatform.ai/</NuxtLink
        >
        <NuxtLink to="https://hiveplatform.ai/" class="links" rel="noopener">@노션주소</NuxtLink>
      </div>
    </div>

    <!-- 프로젝트 정보 -->
    <div class="project_information container">
      <ul class="task_list">
        <li>Nuxt SSR 환경에서 글로벌 서비스 웹사이트 개발</li>
        <li>초기 렌더링 안정성을 고려한 UI 구현</li>
        <li>브라우저 언어 감지 기반 다국어 처리 및 구조 설계</li>
        <li>컴포넌트 단위 퍼블리싱과 스타일 관리로 확장성과 유지보수성 강화</li>
        <li>다국어 대응 시 UI 이슈를 사전에 대응해 글로벌 환경에서도 안정적인 사용자 경험 제공</li>
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
            프로젝트 설명
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
            <tr>
              <th scope="row">유형</th>
              <td>반응형 (Desktop, Mobile)</td>
            </tr>
            <tr>
              <th scope="row">투입인원</th>
              <td>2명</td>
            </tr>
            <tr>
              <th scope="row">전체 기여도</th>
              <td>95%</td>
            </tr>
            <tr>
              <th scope="row">환경 및 기술</th>
              <td>Nuxt3.js, Pinia, vi18n, swiper.js</td>
            </tr>
            <tr>
              <th scope="row">언어</th>
              <td>KO/EN</td>
            </tr>
            <tr>
              <th scope="row">기간</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">구성</th>
              <td>
                <ul class="task_list">
                  <li>메인 1p : 네이버 블로그 rss 파싱 제외</li>
                  <li>솔루션 1p(총6p): 동적 페이지 구성</li>
                  <li>요금 1p</li>
                  <li>고객사와 파트너 1p</li>
                  <li>페이지 구조, 컴포넌트, 스타일, 인터렉션</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 프로젝트 이미지 -->
    <div class="project_images"></div>
  </section>
</template>

<script setup>
// 더보기 버튼 토글
const isOpened = ref(false)

const btnMoreToggle = () => {
  isOpened.value = !isOpened.value
}
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
      'images images';
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
      font-size: 1.2rem;
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
    font-size: 1.2rem;
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
}
.project_description_wrap {
  margin-top: 2rem;
  .btn_more {
    color: var(--text-color);
    @extend %anchor;
    justify-content: space-between;
    width: 100%;
    padding: 0.8rem 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    transition: all 0.2s;
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
}
.project_images {
  //display: none;
  position: relative;
  width: 100%;
  padding-bottom: 68%;
  margin-top: 2rem;
  overflow: hidden;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('@/assets/images/project/hive-mobile.png');
    background-position: center top;
    transition: background-position 50s linear;
  }
  &:hover::before {
    background-position: center bottom;
  }
  @include media-breakpoint-up {
    grid-area: images;
    margin-top: 0;
    padding-bottom: 36.25%;
    &::before {
      background-image: url('@/assets/images/project/hive-pc.png');
      transition-duration: 14s;
      transition-delay: 0.4s;
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
      background: rgba(0, 0, 0, 0.9);
      opacity: 1;
      transition: opacity 0.3s;
    }
    &:hover::after {
      opacity: 0;
    }
  }
}
</style>
