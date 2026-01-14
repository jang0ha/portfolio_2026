<template>
  <header class="header container">
    <div class="header-block">
      <h1>
        <NuxtLink to="/" class="logo">0&emsp;&emsp;H<br />/&emsp;&emsp; JANG</NuxtLink>
        <span>&ensp;PORTFOLIO</span>
      </h1>
      <button type="button" class="btn_theme" @click="toggleTheme">
        <span v-if="theme === 'dark'">🌙</span>
        <span v-else>☀️</span>
      </button>

      <button type="button" :class="isMobile ? 'btn_menu' : 'btn_menu hide'">
        <span class="hide">menu button</span>
      </button>
    </div>
  </header>
</template>

<script setup>
const theme = ref(null)

/**
 * 테마 적용
 */
const applyTheme = (value) => {
  document.documentElement.setAttribute('data-theme', value)
  theme.value = value
}

/**
 * 토글 버튼
 */
const toggleTheme = () => {
  const next = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(next)
}

/**
 * 초기 테마 설정
 */
onMounted(() => {
  // 항상 시스템 테마 기준으로 시작
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  applyTheme(media.matches ? 'dark' : 'light')

  // 시스템 테마 변경 시 자동 반영 (선택)
  media.addEventListener('change', (e) => {
    applyTheme(e.matches ? 'dark' : 'light')
  })
})
</script>

<style lang="scss" scoped>
.header-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  line-height: 1.2;
}
.btn_theme {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 2rem;
}
.logo {
  font-weight: 700;
  line-height: 1.2;
}
</style>
