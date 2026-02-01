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
                View Code →
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
  <section ref="endingText" class="mop_wrap container">
    <p class="ending_text">
      이 포트폴리오는 완성된 결과보다
      <strong>어떤 구조로 문제를 해석하고 확장 가능한 형태로 만들었는지</strong>를 보여주기 위한
      작업입니다.<br /><br />

      퍼블리셔로 시작했지만, 이제는 화면 뒤의 구조와 데이터 흐름까지 함께 설계할 수 있는
      프론트엔드로 성장하고자 합니다.<br /><br />

      이 구조는 앞으로 실제 API, 서비스 환경에서도 그대로 확장될 수 있는 기반이 됩니다.<br /><br />

      끝까지 봐주셔서 감사합니다.
    </p>
    <div class="copyright">&copy; 2026 jangyougnha</div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sections = [
  {
    area: 'intro',
    title: 'Intro',
    text: `
      퍼블리셔로 시작했지만,
      화면을 그리는 것보다 구조를 설계하는 과정에 더 흥미를 느껴왔습니다.
      저는 결과보다 그 결과가 만들어지는 과정과 구조를 중요하게 생각합니다.
    `,
  },
  {
    area: 'how',
    title: 'How I Work',
    text: `
      디자인을 그대로 구현하기보다, 화면이 어떤 역할을 하는지 먼저 해석합니다.
      반응형, 다국어, 유지보수 가능성을 고려해 컴포넌트와 데이터 구조를 먼저 정리한 뒤 화면을 구현합니다.
    `,
  },
  {
    area: 'purpose',
    title: 'Purpose Portfolio',
    text: `
      프로젝트가 늘어나더라도 구조를 바꾸지 않고, 데이터를 추가하는 것만으로 확장할 수 있는 포트폴리오를 목표로 했습니다.
			단순히 보여주기 위한 결과물이 아니라, 실제 서비스 구조를 가정한 작업물입니다.
    `,
  },
];

const stackItems = [
  {
    label: 'Excel / Raw Data',
    desc: '프로젝트 정보를 Excel 기반으로 정리해 데이터의 기준을 만들었습니다.',
    code: '/data/raw/projects.xlsx',
  },
  {
    label: 'JSON',
    desc: '구조화된 형태로 변환해 화면과 분리된 데이터 레이어를 구성했습니다.',
    code: '/data/raw/projects.json',
  },
  {
    label: 'JavaScript Merge',
    desc: 'key 값을 기준으로 데이터를 병합해 하나의 프로젝트 단위로 관리했습니다.',
    subDesc: `**현재는 Excel 기반 정적 데이터를 사용하지만, 
		JavaScript 병합 단계는 API 응답으로 대체 가능한 구조로 설계했습니다. 
		실제 서비스 환경에서는 이 지점에 API를 연결해도 화면 구조를 변경할 필요가 없습니다.`,
    code: '/data/projects.js',
    api: true,
  },
  {
    label: 'Dynamic Routing',
    desc: 'Nuxt의 동적 라우팅을 활용해 프로젝트별 페이지를 자동 생성했습니다.',
    code: '/pages/project/[name].vue',
  },
  {
    label: 'Reusable UI',
    desc: '구조는 유지한 채 데이터만 교체해 확장 가능한 화면을 구성했습니다.',
    code: '/components/project/ProjectDetail.vue',
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
      y: (i) => i * STACK_GAP * 2,
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
    // 🖥 Desktop
    '(min-width: 769px)': () => {
      initDesktopScroll();

      return () => {
        if (ctx) {
          ctx.revert();
          ctx = null;
        }
      };
    },

    // 📱 Mobile
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
  .copyright {
    border-top: 1px solid var(--border-color);
    padding: 1rem 0;
    margin-top: 14rem;
  }
}
</style>
