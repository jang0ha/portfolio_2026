# 🎨 포트폴리오 웹사이트 | Portfolio Website

> 4년간의 웹 퍼블리싱과 프론트엔드 개발 경험을 바탕으로 만든 **장영하**의 포트폴리오

**Nuxt.js**, **GSAP 애니메이션**, **SCSS**를 활용한 모던한 포트폴리오 웹사이트입니다.

- [라이브 주소](https://jang0ha-portfolio.vercel.app/)

---

## 📋 목차

- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [개발 가이드](#개발-가이드)
- [배포](#배포)

---

## 🌟 주요 기능

### 홈페이지 (`/`)

- 흥미로운 스크롤 애니메이션과 함께 자신을 소개
- GSAP을 활용한 부드러운 상호작용

### 소개 페이지 (`/about`)

- 경력, 기술 스택, 소개 정보 표시
- 다양한 프로젝트 경험 설명

### 프로젝트 상세 페이지 (`/projects/:id`)

- 개별 프로젝트의 상세 정보 표시
- 기술 스택, 설명, 링크 정보 포함
- 반응형 이미지 최적화

### 포함된 프로젝트

- **Hive Platform**: Nuxt.js 기반 웹사이트
- **The Starlight**: 브랜드 사이트 (GSAP 스크롤 애니메이션)
- **GC 녹십자**: 채용 사이트 (인터랙티브 애니메이션)
- **중앙대 원격미래교육원**: 웹 접근성 강화 사이트
- **게임 이벤트 페이지**: 인터랙티브 이벤트 페이지
- **삼성 갤럭시 SPEC**: CMS/Admin 패널
- **카카오 엔터프라이즈**: Zendesk SaaS 플랫폼

---

## 📁 프로젝트 구조

```
portfolio2026/
├── app/
│   ├── assets/                    # 정적 리소스
│   │   └── scss/                  # SCSS 스타일시트
│   │       ├── abstracts/         # 변수, 함수, 믹스인
│   │       ├── base/              # 기본 스타일
│   │       ├── components/        # 컴포넌트 스타일
│   │       └── layout/            # 레이아웃 스타일
│   ├── components/                # Vue 컴포넌트
│   │   ├── AppHeader.vue          # 헤더 컴포넌트
│   │   └── AppFooter.vue          # 푸터 컴포넌트
│   ├── composables/               # Vue Composables (재사용 가능한 로직)
│   │   ├── usePageSeo.js          # SEO 메타 데이터 관리
│   │   ├── useProjects.js         # 프로젝트 데이터 관리
│   │   ├── useProjectsApi.js      # API 데이터 가져오기
│   │   ├── useProjectsUnified.js  # 통합 데이터 소스 관리
│   │   └── useResponsiveImage.js  # 반응형 이미지 처리
│   ├── config/                    # 설정 파일
│   │   └── seo.js                 # SEO 설정
│   ├── data/                      # 정적 데이터
│   │   └── raw/                   # 원본 데이터 (JSON)
│   │       ├── projects.json      # 프로젝트 목록
│   │       ├── summary.json       # 요약 정보
│   │       ├── links.json         # 링크 정보
│   │       ├── images.json        # 이미지 메타데이터
│   │       ├── tasks.json         # 업무/경험 정보
│   │       └── configuration.json # 구성 설정
│   ├── pages/                     # 페이지 컴포넌트 (자동 라우팅)
│   │   ├── index.vue              # 홈페이지 (/)
│   │   ├── about.vue              # 소개 페이지 (/about)
│   │   └── projects/
│   │       └── [id].vue           # 프로젝트 상세 페이지
│   └── plugins/                   # Nuxt 플러그인
│       └── gsap.client.ts         # GSAP 플러그인 (클라이언트 전용)
├── server/                        # Nitro 서버
├── public/                        # 공개 정적 파일 (이미지, 아이콘 등)
├── nuxt.config.ts                 # Nuxt 설정
├── tsconfig.json                  # TypeScript 설정
├── package.json                   # 프로젝트 의존성
└── .env                          # 환경 변수 (커밋 안 됨)
```

---

## 🛠️ 기술 스택

### 프론트엔드

- **Nuxt 4**: 메타 프레임워크 (Vue 3 기반)
- **Vue 3**: progressive 웹 프레임워크
- **GSAP 3**: 고급 애니메이션 라이브러리
- **SCSS**: CSS 전처리기
- **Nuxt Image**: 이미지 최적화

### 개발 도구

- **Javascript**: 안전성
- **ESLint**: 코드 스타일 검사
- **Prettier**: 코드 포맷팅
- **Nitro**: 서버 프레임워크

### 스타일링

- **SASS/SCSS**: 구조화된 스타일 관리
- **PostCSS**: CSS 처리 (cssnano로 최적화)

---

## 🚀 시작하기

### 요구사항

- Node.js 18.0 이상
- npm, pnpm, yarn 또는 bun

### 설치

```bash
# 의존성 설치
npm install

# 또는 다른 패키지 관리자 사용
pnpm install
yarn install
bun install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 시작됩니다.

### 코드 품질 도구

```bash
# ESLint 검사
npm run lint

# ESLint 자동 수정
npm run lint:fix

# Prettier 포맷팅 검사
npm run format

# Prettier 자동 포맷팅
npm run format:fix
```

---

## 💡 개발 가이드

### 페이지 추가

새로운 페이지는 `app/pages/` 디렉토리에 `.vue` 파일을 생성하면 자동으로 라우트가 생성됩니다.

```
pages/
├── index.vue          → /
├── about.vue          → /about
└── projects/
    └── [id].vue       → /projects/:id
```

### Composable 사용

프로젝트 데이터는 `useProjects()` 또는 `useProjectsUnified()` composable을 통해 접근합니다:

```javascript
const projects = useProjects(); // 정적 데이터
// 또는
const projects = useProjectsUnified(); // 통합 데이터 소스 (정적 또는 API)
```

### 스타일 구조

SCSS는 SMACSS 방식으로 구성되어 있습니다:

- **abstracts**: 변수, 함수, 믹스인
- **base**: 기본 스타일, 리셋
- **components**: 컴포넌트 스타일
- **layout**: 레이아웃 관련 스타일

### SEO 설정

각 페이지의 SEO 메타데이터는 `usePageSeo()` composable로 관리합니다:

```javascript
usePageSeo({
  title: '페이지 제목',
  description: '페이지 설명',
});
```

### 데이터 소스 설정

프로젝트 데이터는 정적 JSON 또는 API에서 가져올 수 있습니다.
`.env` 파일에서 설정:

```env
NUXT_PUBLIC_DATA_SOURCE=static  # 또는 'api'
NUXT_PUBLIC_API_BASE_URL=https://api.example.com
```

---

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

### 프로덕션 빌드 미리보기

```bash
npm run preview
```

### 정적 생성 (SSG)

```bash
npm run generate
```

자세한 배포 정보는 [Nuxt 배포 문서](https://nuxt.com/docs/getting-started/deployment)를 참고하세요.

---

## 📄 라이선스 및 정보

- **작성자**: 장영하 (Youngha Jang)
- **포트폴리오**: [https://jang0ha-portfolio.vercel.app/]
- **경력**: 웹 퍼블리싱 및 프론트엔드 개발 4년 3개월

---

## 🔗 관련 문서

- [Nuxt 공식 문서](https://nuxt.com)
- [Vue 3 문서](https://vuejs.org)
- [GSAP 문서](https://greensock.com/gsap/)
- [SCSS 문서](https://sass-lang.com)

---

## 📞 문의

포트폴리오에 대한 질문이나 제안이 있으시면 연락 주세요!
