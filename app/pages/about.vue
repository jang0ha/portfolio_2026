<template>
  <section class="index_wrap"></section>
</template>

<script setup>
const containerRef = ref(null);
const slides = ref([
  {
    title: 'Think.',
    desc: 'Think in Structure',
  },
  {
    title: 'Search.',
    desc: 'Search for Better Markup',
  },
  {
    title: 'Calculate.',
    desc: 'Calculate UI Behavior',
  },
  {
    title: 'Communicate.',
    desc: 'Communicate with Purpose',
  },
  {
    title: 'Solved.',
    desc: 'Ship a Stable Interface',
  },
]);

const swiper = useSwiper(containerRef, {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 2500,
  },
});

onMounted(() => {
  console.log(swiper.instance);
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/_functions.scss' as *;
@use '@/assets/scss/components/_button.scss' as *;
@use '@/assets/scss/abstracts/_mediaQuery.scss' as *;

.content_block {
  display: flex;
  flex-direction: column;
}
.index_wrap {
  font-size: clamp(1.2rem, 2vw, 1.2rem);
  overflow: hidden;
  @include media-breakpoint-up {
    display: grid;
    grid-template-areas:
      'index index index index index'
      'hero hero hero project project';
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  }
}
.inform_wrap {
  margin-bottom: 10rem;
  font-size: clamp(1rem, 2vw, 1.6rem);
  grid-area: index;
  a {
    color: var(--gray-color);
    transition: color 0.2s;
    &:hover {
      color: var(--text-color);
    }
  }
  @include media-breakpoint-up {
    margin-bottom: 0;
  }
}
.project_wrap {
  display: flex;
  flex-direction: column;
  height: auto;
  grid-area: project;
  @include media-breakpoint-up {
    justify-content: end;
  }
}
.hero_wrap {
  position: relative;
  grid-area: hero;
  height: 100%;
  mix-blend-mode: difference;
}
.main_title {
  font-size: clamp(1.8rem, 1vw, 8rem);
  color: var(--gray-color);
}
.hero_swiper_wrap {
  .hero_title {
    margin-top: 2rem;
    font-size: clamp(4rem, 7vw, 10rem);
    line-height: 1;
    color: var(--gray-color);
    //  -webkit-text-stroke: 2px var(--background-inversion-color);
    // mix-blend-mode: color-burn;
    mix-blend-mode: exclusion;
  }
  .hero_desc {
    margin-top: 1rem;
    padding: 0 1vw;
    font-size: clamp(1.2rem, 2vw, 2.4rem);
    font-weight: 300;
    color: var(--gray-color);
    mix-blend-mode: color-burn;
  }
  .swiper-slide {
    position: relative;
    height: 100% !important;
    opacity: 0 !important;
    transition: opacity 0.4s ease;
    &::before {
      content: '';
      position: absolute;
      bottom: 50%;
      background-color: var(--background-inversion-color);
      width: 100%;
      height: 20rem;
      z-index: -1;
    }
  }
  .swiper-slide-active {
    opacity: 1 !important;
    h3 {
      animation: slideUp 1s ease forwards;
    }
    p {
      animation: slideUp 1s ease forwards;
    }
  }
  @include media-breakpoint-up {
    .hero_title {
      margin-top: 10rem;
    }
    .hero_desc {
      padding: 0 0.6vw;
    }
    .swiper-slide {
      &::before {
        bottom: 35%;
        height: 20rem;
      }
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.project_sort {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
  > span {
    flex: none;
  }

  &:last-child {
    border-bottom: 1px solid var(--border-color);
  }
}
.projects {
  width: 60%;
  padding-left: 2rem;
}
.project_link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  text-align: left;
  color: var(--text-color);
  transition: all 0.2s;
  &:hover {
    font-weight: 700;
  }
  & + .project_link {
    margin-top: 0.6rem;
  }
  @extend %anchor;
  &::after {
    width: 1rem;
    height: 1rem;
    margin-left: 0.6rem;
    background-color: var(--text-color);
    mask-image: url('#{svg-image(anchor-diagonal)}');
    -webkit-mask-image: url('#{svg-image(anchor-diagonal)}');
  }
}
</style>
