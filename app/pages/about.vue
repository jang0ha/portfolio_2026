<template>
  <section class="about_wrap">
    <p ref="scrollText" class="scroll_text">Scroll</p>
    <!-- Intro / How I Work / Why This portfolio -->
    <article
      v-for="(article, i) in sections"
      :key="i"
      class="about_article container"
      :class="article.area"
    >
      <h2>{{ article.title }}</h2>
      <p v-html="article.text"></p>
    </article>
    <!-- Portfolio Structure -->
    <article ref="sectionRef" class="portfolio_structure container">
      <div class="inner">
        <h2 class="structure_title">Portfolio Structure</h2>
        <div class="stack_diagram">
          <!-- Stack Cards -->
          <div class="stack">
            <div v-for="(item, index) in stackItems" :key="index" class="stack_card">
              <strong class="label">
                {{ item.label }}
                <span v-if="item.api" class="api_badge">API</span>
              </strong>

              <p class="desc">{{ item.desc }}</p>
              <p class="desc">{{ item.subDesc }}</p>
              <span class="number">0{{ 1 + index }}</span>
              <a v-if="item.code" :href="item.code" target="_blank" class="code_link">
                View Code → </a
              ><br />
              <a v-if="item.codeAPI" :href="item.codeAPI" target="_blank" class="code_link">
                View Code API→
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
  <section ref="endingText" class="mop_wrap container">
    <p class="ending_text">
      이 포트폴리오는 4년간의 실무 경험을 바탕으로
      <strong>확장 가능한 데이터 구조와 컴포넌트 기반 설계</strong>를 적용한 작업물입니다.<br /><br />

      Nuxt.js를 활용한 사이트 제작 경험을 통해 데이터 흐름과 구조 설계의 중요성을 배웠으며, 이를
      바탕으로 확장 가능한 포트폴리오 시스템을 구축했습니다.<br /><br />

      웹 표준, 접근성, 성능 최적화를 기반으로 실무에서 요구되는 프론트엔드 개발 역량을 갖추고
      있습니다.
    </p>
  </section>
</template>

<script setup>
// SEO 메타 태그 설정 (config/seo.ts에서 관리)
usePageSeo();
const sections = [
  {
    area: 'intro',
    title: 'Intro',
    text: `
      4년간 웹 퍼블리싱과 프론트엔드 개발 경험을 쌓았습니다.
      Nuxt.js를 활용한 웹 플랫폼을 제작하며
      단순히 화면을 구현하는 것을 넘어, 데이터 구조와 확장 가능한 설계를 고민하게 되었습니다.
    `,
  },
  {
    area: 'how',
    title: 'How I Work',
    text: `
      웹 표준과 접근성을 준수한 시맨틱 마크업을 기반으로,
      반응형/분리형 웹사이트와 크로스 브라우징을 대응합니다.
      컴포넌트 단위로 구조를 분리하고 데이터 흐름을 먼저 설계하여
      유지보수 가능한 코드를 작성합니다.
    `,
  },
  {
    area: 'purpose',
    title: 'Technical Approach',
    text: `
      이 포트폴리오는 데이터 중심 설계를 통해 프로젝트 추가 시
      코드 변경 없이 JSON 데이터만으로 확장 가능하도록 구현했습니다.
      실무에서 학습한 Nuxt.js, GSAP, SCSS를 활용하여
      실제 서비스처럼 동작하는 구조를 목표로 제작했습니다.
    `,
  },
];

const stackItems = [
  {
    label: 'Data Modeling',
    desc: 'Excel 기반의 정규화된 데이터 스키마를 설계하여 프로젝트 정보를 구조화했습니다.',
    code: '/data/raw/projects.xlsx',
  },
  {
    label: 'Data Layer',
    desc: '화면과 독립된 JSON 기반 데이터 레이어를 구성하였습니다.',
    code: '/data/raw/projects.json',
    codeAPI: `/api/projects`,
  },
  {
    label: 'API Architecture',
    desc: 'Nuxt 4 Server Routes를 활용한 RESTful API 엔드포인트를 구축했습니다.',
    subDesc: `정적 데이터와 API 기반 구조를 환경변수(Runtime Config)로 전환 가능하도록 설계했습니다.
		클라이언트 코드 수정 없이 데이터 소스를 교체할 수 있어,
		실무 환경에서도 최소한의 마이그레이션 비용으로 전환할 수 있습니다.`,
    code: '/code/projects.js',
    api: true,
  },
  {
    label: 'Dynamic Routing',
    desc: 'File-based Routing과 동적 파라미터를 활용하여 프로젝트별 상세 페이지를 자동 생성했습니다.',
  },
  {
    label: 'Runtime Config',
    desc: `Nuxt 4의 runtimeConfig를 활용한 환경별 설정 관리 시스템을 구현했습니다.

		• dataSource: 'static' - 정적 JSON 파일 (SSG 최적화)
		• dataSource: 'api' - API 엔드포인트 (SSR 실무 환경)

		환경변수 전환만으로 개발/프로덕션 환경을 분리했습니다.`,
  },
];
const sectionRef = ref(null);
const scrollText = ref(null);
const endingText = ref(null);

let ctx = null;
let mm = null;
let mobileObserver = null;

const initMobileObserver = () => {
  const { $gsap } = useNuxtApp();

  const section = sectionRef.value;
  if (!section) return;

  const cards = section.querySelectorAll('.stack_card');
  if (!cards.length) return;

  // 초기 상태
  $gsap.set(cards, {
    opacity: 0,
    y: 40,
    scale: 1,
  });

  mobileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        $gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });

        mobileObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  cards.forEach((card) => mobileObserver.observe(card));
};

const initDesktopScroll = () => {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  const section = sectionRef.value;
  if (!section) return;

  const cards = section.querySelectorAll('.stack_card');
  if (!cards.length) return;

  ctx = $gsap.context(() => {
    const cardHeight = cards[0].offsetHeight;
    const STACK_GAP = 40;
    const totalSteps = cards.length + 1;
    const CARD_SCROLL = (cardHeight + STACK_GAP) * totalSteps;

    // 초기 상태
    $gsap.set(cards, {
      opacity: 0,
      y: (i) => i * STACK_GAP * 3,
      scale: 0.96,
    });

    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${CARD_SCROLL}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        markers: false,

        onUpdate(self) {
          // 스크롤 안내 텍스트
          $gsap.set(scrollText.value, {
            autoAlpha: self.progress > 0.95 ? 0 : 1,
          });

          // 엔딩 텍스트
          $gsap.set(endingText.value, {
            autoAlpha: self.progress > 0.1 ? 1 : 0,
          });
        },
      },
    });

    cards.forEach((card, index) => {
      tl.to(card, {
        opacity: 1,
        y: index * STACK_GAP,
        scale: 1,
        ease: 'power2.out',
      });

      if (index > 0) {
        tl.to(
          cards[index - 1],
          {
            scale: 0.9,
            ease: 'power2.out',
          },
          '<'
        );
      }
    });

    // 마지막 카드 정리
    tl.to(cards[cards.length - 1], {
      scale: 0.9,
      ease: 'power2.out',
    });
  }, section);

  $ScrollTrigger.refresh();
};
const initScrollAnimation = () => {
  if (!process.client) return;

  const { $ScrollTrigger } = useNuxtApp();

  $ScrollTrigger.matchMedia({
    // Desktop
    '(min-width: 769px)': () => {
      initDesktopScroll();

      return () => {
        if (ctx) {
          ctx.revert();
          ctx = null;
        }
      };
    },

    // Mobile
    '(max-width: 768px)': () => {
      initMobileObserver();

      return () => {
        if (mobileObserver) {
          mobileObserver.disconnect();
          mobileObserver = null;
        }
      };
    },
  });
};

onMounted(() => {
  nextTick(() => {
    initScrollAnimation();
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  if (mobileObserver) mobileObserver.disconnect();
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/abstracts/_mediaQuery.scss' as *;
.about_wrap {
  justify-content: flex-start;
  .scroll_text {
    display: none;
    position: fixed;
    left: 50%;
    bottom: 0%;
    transform: translateX(-50%);
    font-size: 20vw;
    mix-blend-mode: difference;
    z-index: 1;
    animation: sparkle 3s ease-in Infinite Alternate;
  }
  @keyframes sparkle {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .about_article {
    height: fit-content;
    margin-bottom: 4rem;
    white-space: pre-line;
    p {
      line-height: 1.8;
    }
    h2 {
      font-size: clamp(1.4rem, 2vw, 1.6rem);
    }
    p,
    strong {
      font-size: clamp(1rem, 2vw, 1.4rem);
    }
  }
  $articles: (
    intro: intro,
    how: how,
    purpose: purpose,
  );
  @include media-breakpoint-up {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'intro how purpose' 'structure structure structure' 'mop mop mop';
    gap: 4rem;
    .scroll_text {
      display: block;
    }
    .about_article {
      margin-bottom: 8rem;
      p {
        padding-left: 2rem;
        font-size: 1.4rem;
      }
    }
    @each $name, $area in $articles {
      .#{$name} {
        grid-area: $area;
      }
    }
  }
}

.portfolio_structure {
  position: relative;
  grid-area: structure;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background: var(--background-inversion-color);
  .structure_title {
    color: var(--background-color);
  }
  .stack_diagram {
    position: relative;
    margin-top: 2rem;
    min-height: 40rem;
  }
  @include media-breakpoint-up {
    padding-top: 4rem;
    padding-bottom: 4rem;
    .stack_diagram {
      margin-top: 4rem;
    }
  }
}

.stack {
  position: relative;
  z-index: 1;
  .stack_card {
    width: 100%;
    min-height: 20rem;
    padding: 2rem;
    border-radius: 1.2rem;
    background: var(--color-bg, #fff);
    box-shadow: 0 1.2rem 4rem rgba(0, 0, 0, 0.12);
    font-size: 1.2rem;
    color: #303030;
    & + .stack_card {
      margin-top: 2rem;
    }
  }
  .label {
    display: flex;
    align-items: center;
    font-weight: 600;
  }

  .desc {
    margin-top: 0.75rem;
    margin-bottom: 2rem;
    line-height: 1.6;
    white-space: pre-line;
  }
  .number {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    font-size: 4rem;
    opacity: 0.4;
  }
  .code_link {
    display: inline-block;
    margin-top: 1rem;
    color: #4f7cff;
    font-size: 1rem;
    text-decoration: underline;
  }
  @include media-breakpoint-up {
    .stack_card {
      position: absolute;
      top: 0;
      left: 0;
      & + .stack_card {
        margin-top: 0;
      }
    }
    .code_link {
      font-size: 1.2rem;
    }
  }
}

.api_badge {
  margin-left: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.7em;
  border-radius: 4px;
  background: #111;
  color: #fff;
}

.mop_wrap {
  padding-top: 4rem;
  padding-bottom: 4rem;
  grid-area: mop;
  transition: none;
  font-size: clamp(1rem, 2vw, 1.4rem);
  text-align: center;
  line-height: 1.6;
}
</style>
