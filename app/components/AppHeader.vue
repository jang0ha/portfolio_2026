<template>
  <header class="header container">
    <div class="header-block">
      <h1>
        <NuxtLink to="/" class="logo" :title="`메인 페이지로 이동`"
          >0&emsp;&emsp;H<br />/&emsp;&emsp; JANG<span>&ensp;PORTFOLIO</span></NuxtLink
        >
      </h1>
      <NuxtLink to="/about" class="menu" :title="`어바웃 페이지로 이동`">About</NuxtLink>
      <button
        type="button"
        class="btn_theme"
        @click="toggleTheme"
        aria-label="라이트/다크모드 전환 버튼"
      >
        <span v-if="theme === 'dark'">🌙<span class="hide">다크모드로 보는중</span></span>
        <span v-else>☀️<span class="hide">라이트모드로 보는중</span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
const theme = ref(null);
const route = useRoute(); // 라우터 가져오기

/**
 * 테마 적용
 */
const applyTheme = (value) => {
  document.documentElement.setAttribute('data-theme', value);
  theme.value = value;
};

/**
 * 토글 버튼
 */
const toggleTheme = () => {
  const next = theme.value === 'dark' ? 'light' : 'dark';
  applyTheme(next);
};

/**
 * 초기 테마 설정
 */
onMounted(() => {
  // 항상 시스템 테마 기준으로 시작
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  applyTheme(media.matches ? 'dark' : 'light');

  // 시스템 테마 변경 시 자동 반영 (선택)
  media.addEventListener('change', (e) => {
    applyTheme(e.matches ? 'dark' : 'light');
  });
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/_mediaQuery.scss' as *;
.header-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--text-color);
  padding: 1rem 0 0.6rem;
  @include media-breakpoint-up {
    padding: 2rem 0 1rem;
  }
  h1 {
    line-height: 1;
  }
}

.btn_theme {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 2rem;
  height: 100%;
  padding: 0 0 0 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  box-sizing: content-box;
  span {
    display: inline-block;
  }
  @include media-breakpoint-up {
    width: 4rem;
    height: 4rem;
    padding: 0 0 0 0.4rem;
  }
}
.logo,
.menu,
.btn_theme {
  font-weight: 900;
  font-size: 1.2rem;
  @include media-breakpoint-up {
    font-size: 1.4rem;
  }
}
.menu {
  position: relative;
  padding: 0 1rem;
  margin-left: auto;
  & + * {
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 1px;
      height: 40%;
      background-color: var(--text-color);
    }
  }
  @include media-breakpoint-up {
    padding: 0 2rem;
    & + * {
      &::before {
        content: '';
      }
    }
  }
}
</style>
