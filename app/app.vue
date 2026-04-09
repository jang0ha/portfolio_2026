<template>
  <div id="wrap">
    <!-- 스킵 링크: 스크린리더 사용자가 네비게이션 건너뛰고 메인 콘텐츠로 이동 -->
    <a href="#main-content" class="skip-link">메인 콘텐츠로 이동</a>
    <AppHeader />
    <main class="content_block" id="main-content">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
