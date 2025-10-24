# B급 Log

> 엉성하고, 솔직하며, 가끔 쓸모 있는 기록

Next.js (App Router) 기반의 개인 블로그입니다.

정적 사이트 빌드를 통해 빠르고 최적화된 사용자 경험을 제공하며,
MDX 기반의 콘텐츠와 다국어 지원, 그리고 손쉬운 확장성을 염두에 두고 설계되었습니다.

UI는 shadcn/ui를 활용하여 깔끔하고 접근성 높은 디자인을 구현하고,
Github Pages를 통해 자동으로 배포됩니다.

아키텍처 측면에서는 Domain-Driven Design(DDD) 원칙을 적용하여
블로그의 핵심 비지니스 도메인(포스트, 변경 이력 등)을 코드에 명확히 반영하고,
장기적인 유지보성과 확장성을 최우선으로 고려합니다.

또한, Husky 기반의 Git Hook과 커밋 메세지 린트(Commit Convention Lint)를 도입하여
커밋 메세지의 일관성과 코드 품질 향상도 함께 추구합니다.

## ✨ 주요 특징

- 다국어 지원: 한국어를 기본으로, 영어(en-us) 콘텐츠를 추가 지원
- MDX 기반 콘텐츠: 마크다운의 유연함과 JSX의 확장성을 모두 활용
- locale별 파일명 관리: 각 포스트의 언어 버전을 index.ko-kr.mdx, index.en-us.mdx 등으로 명확히 구분
- 포스트별 자산 관리: 이미지·다이어그램 등 모든 에셋을 해당 포스트 폴더에 함께 저장
- GitHub 댓글 연동: 포스트 하단에 Giscus 또는 Utterances 등 GitHub 기반 댓글 시스템 통합
- Google AdSense: 광고 코드 쉽게 삽입 및 관리
- Google Analytics (GA4): 방문자 트래픽 분석 및 데이터 추적
- UI 라이브러리: shadcn/ui 기반의 일관성 있는 커스텀 UI 컴포넌트 구현
- 아키텍처: DDD(도메인 주도 설계)로 도메인 모델의 순수성과 비즈니스 로직 응집성 강화
- kebab-case 명명: 모든 폴더·파일을 kebab-case로 통일하여 관리
- Git Hook & 커밋 린트: Husky, lint-staged, commitlint로 커밋 전 코드 스타일·문법 검사 및 커밋 메시지 컨벤션 준수 자동화
- 자동 배포: GitHub Actions로 코드 푸시 시 GitHub Pages에 자동 배포

## 🛠️ 주요 기술 스택

- **메인 프레임워크: [Next.js 15+ (App Router)](https://nextjs.org/docs/app)**
  - React 기반 최신 풀스택 프레임워크
  - 정적 사이트 생성(SSG), SSR 등 다양한 렌더링 지원
  - 서버/클라이언트 컴포넌트 분리, 파일 시스템 기반 라우팅
  - 이미지, 스크립트 등 리소스 내장 최적화
- **UI**
  - **[shadcn/ui](https://ui.shadcn.com/)**
    - Tailwind CSS 기반 재사용 UI 컴포넌트
    - 직접 복사 및 커스터마이즈 방식, 번들 크기 최소화
    - 일관성 있고 접근성 높은 디자인 구현
  - **[Tailwind CSS](https://tailwindcss.com/), [PostCSS](https://postcss.org/)**
    - 유틸리티 퍼스트 CSS 프레임워크(Tailwind)
    - 빠른 스타일 적용, PostCSS를 통한 CSS 변환·최적화
- **콘텐츠 관리**
  - **[MDX](https://mdxjs.com/)**
    - Markdown과 JSX(React 컴포넌트) 결합 지원
    - 포스트 내 동적 UI 요소 및 복잡한 레이아웃 구현 가능
  - **[Zod (선택)](https://zod.dev/)**
    - TypeScript 우선의 스키마 선언 및 데이터 유효성 검사
    - MDX Frontmatter 구조 자동 검증
- **언어 및 타입**
  - **[TypeScript](https://www.typescriptlang.org/)**
    - 정적 타입 시스템으로 코드의 안전성 확보
    - 유지보수 및 협업 효율성 증대
- **코드 품질 및 자동화**
  - **[Husky](https://typicode.github.io/husky)**
    - Git Hook 관리 도구 (pre-commit, commit-msg 등)
  - **[lint-staged](https://www.npmjs.com/package/lint-staged)**
    - 스테이징 파일에 한정된 린트 및 포맷 자동 실행
  - **[commitlint](https://commitlint.js.org/)**
    - Conventional Commits 커밋 메시지 규칙 검사
- **배포 및 CI/CD**
  - **[GitHub Pages](https://pages.github.com/)**
    - 정적 빌드 결과물로 빠르고 안정적인 블로그 호스팅
  - **[GitHub Actions](https://docs.github.com/en/actions)**
    - 코드 푸시 시 자동 빌드 및 배포, CI/CD 파이프라인 구성

## 🗂️ DDD 기반 폴더 구조 (도메인 중심 설계)

DDD(Domain-Driven Design) 원칙에 따라,
비즈니스 도메인별로 domain, application, infrastructure, presentation(UI) 계층을 분리해 구조화합니다.
이를 통해 비즈니스 로직의 응집성을 높이고, 기술적 세부 사항과의 분리를 통해 유지보수성과 확장성을 강화합니다.

```
(예시)
my-nextjs-blog/
├── .github/                # ⚙️ 배포 워크플로우
│   └── workflows/
│       └── deploy.yml      # GitHub Pages 자동 배포 (GitHub Actions)
├── public/                 # 🌐 웹사이트 정적 자산
│   ├── assets/
│   │   ├── img/
│   │   └── fonts/
│   └── favicon.ico
├── content/                # 📝 콘텐츠 원본 (DDD 레이어 외부 소스)
│   ├── blog-posts/         # 블로그 포스트 MDX 파일
│   │   ├── my-first-post/  # 각 포스트 슬러그 기반 폴더
│   │   │   ├── index.en-us.mdx   # 영어 포스트 파일
│   │   │   ├── index.ko-kr.mdx   # 한국어 포스트 파일
│   │   │   ├── common-image-1.png # 두 언어 버전이 공유하는 이미지
│   │   │   ├── en-specific-image.png # 영어 전용 이미지
│   │   │   └── ko-specific-image.png # 한국어 전용 이미지
│   │   ├── nextjs-i18n-guide/
│   │   │   ├── index.en-us.mdx
│   │   │   └── index.ko-kr.mdx
│   ├── authors/            # 작성자 정보 MDX 파일
│   │   ├── your-name/
│   │   │   ├── index.en-us.mdx
│   │   │   └── index.ko-kr.mdx
│   │   schema.ts           # 콘텐츠 스키마 정의 (Zod 활용)
│   └── config.ts           # 콘텐츠 설정, 상수 정의
├── src/                    # 💻 애플리케이션 핵심 소스 코드
│   ├── app/                # 🌐 Presentation Layer: Next.js 라우팅 및 페이지
│   │   ├── [locale]/       # 로케일 프리픽스 라우팅
│   │   │   ├── about/      # About 페이지 라우팅
│   │   │   │   └── page.tsx
│   │   │   ├── blog/       # 블로그 포스트 라우팅
│   │   │   │   ├── [slug]/ # 동적 포스트 상세 페이지
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx # 블로그 목록 페이지
│   │   │   ├── changelogs/ # 변경 이력 페이지 라우팅
│   │   │   │   └── page.tsx
│   │   │   ├── tags/       # 태그별 포스트 목록 라우팅
│   │   │   │   ├── [tag]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx    # 로케일별 홈페이지
│   │   │   └── layout.tsx  # 로케일별 레이아웃
│   │   ├── api/            # Infrastructure Layer: API 라우트
│   │   │   └── rss-xml/
│   │   │       └── route.ts # RSS 피드 API
│   │   ├── layout.tsx      # 전역 레이아웃
│   │   ├── page.tsx        # 최상위 리다이렉트 또는 로케일 선택 페이지
│   │   └── not-found.tsx   # 최상위 404 페이지
│   ├── messages/           # 다국어 메세지 정의
│   ├── modules/            # 📦 도메인 모듈 (수직 분할)
│   │   ├── post/           # 블로그 포스트 도메인
│   │   │   ├── domain/     # 🎯 도메인 레이어 (엔티티, 값 객체, 인터페이스)
│   │   │   │   ├── post.ts
│   │   │   │   └── post-repository.ts # 인터페이스
│   │   │   ├── application/ # 🚀 애플리케이션 레이어 (유스케이스, 서비스)
│   │   │   │   └── post-service.ts
│   │   │   ├── infra/ # 🧱 인프라 레이어 (리포지토리 구현)
│   │   │   │   └── post-mdx-repository.ts # post-repository.ts 구현체
│   │   │   ├── lib/        # 🧩 포스트 관련 유틸리티
│   │   │   │   └── post-parser.ts
│   │   │   └── ui/         # 🖼️ 포스트 관련 UI 컴포넌트
│   │   │       ├── post-card.tsx
│   │   │       └── post-detail.tsx
│   │   ├── author/         # 작성자 도메인
│   │   │   ├── domain/
│   │   │   │   └── author.ts
│   │   │   ├── application/
│   │   │   │   └── author-service.ts
│   │   │   ├── infra/
│   │   │   │   └── author-mdx-repository.ts
│   │   │   └── ui/
│   │   │       └── author-bio.tsx
│   │   ├── changelog/      # 변경 이력 도메인
│   │   │   ├── domain/
│   │   │   │   ├── commit.ts
│   │   │   │   └── commit-repository.ts # 인터페이스
│   │   │   ├── application/
│   │   │   │   └── changelog-service.ts
│   │   │   ├── infra/
│   │   │   │   └── github-commit-repository.ts # commit-repository.ts 구현체
│   │   │   └── ui/
│   │   │       └── changelog-list.tsx
│   │   ├── common/         # 여러 도메인에 걸쳐 사용되는 공통 기능 모듈
│   │   │   ├── analytics/  # Google Analytics 기능
│   │   │   │   ├── application/
│   │   │   │   │   └── analytics-service.ts
│   │   │   │   └── ui/
│   │   │   │       └── google-analytics-provider.tsx # GA 스크립트 래퍼
│   │   │   ├── comments/   # GitHub 댓글 기능
│   │   │   │   └── ui/
│   │   │   │       └── github-comments-widget.tsx
│   │   │   └── adsense/    # Google AdSense 기능
│   ├── shared/             # 🤝 Shared Kernel (전역 재사용, 독립적인 코드)
│   │   ├── constants/      # 🎯 공유 도메인 개념 (값 객체)
│   │   ├── lib/            # 🧩 공유 유틸리티
│   │   ├── hooks/          # react hook 정의
│   │   ├── config/         # 공유 설정
│   │   │   └── site-metadata.ts # 블로그 제목, 설명 등
│   │   ├── mdx/            # mdx 파일 처리
│   │   ├── i18n/           # 다국어 기능
│   │   ├── shadcn-ui/      # shadcn/ui 컴포넌트 재수출 및 확장
│   │   ├── components/     # 범용 커스텀 UI 요소
│   │   ├── layouts/        # 범용 커스텀 UI Layout 요소
│   │   ├── fonts/          # 폰트 정의
│   │   ├── styles/         # css 정의
│   │   └── types/          # 전역 타입 정의 (DTO 등)
├── components.json         # shadcn/ui 설정 파일
├── next.config.mjs         # Next.js 설정 파일
├── package.json
├── tsconfig.json
├── README.md
└── .prettierrc
```

### DDD 기반 구조 상세 설명

이 구조는 전통적인 DDD 계층형 아키텍처를 Next.js App Router 환경에 맞춰 재해석한 것으로,
각 도메인별로 수직적 슬라이스(모듈화)와 계층 분리를 결합한 하이브리드 방식입니다.

#### modules/ (주요 비즈니스 도메인을 나타내는 핵심 영역)

주요 비즈니스 도메인별 폴더(예: post, author, changelog)가 위치합니다.
각 도메인은 아래와 같은 DDD 계층을 포함합니다:

- `domain/`: 순수 비즈니스 로직, 엔티티, 값 객체, 도메인 서비스, 리포지토리 인터페이스(기술 독립적)
- `application/`: 유스케이스/비즈니스 워크플로우. 도메인 레이어를 조작하며, 서비스 제공
  - `app/` 라우트 핸들러는 이 계층의 서비스 호출
- `infra/`: 실제 데이터 저장, 외부 API, 파일 접근 등 도메인 인터페이스의 구체적 구현
  - 예) `post-mdx-repository.ts`는 `post-repository.ts` 인터페이스를 구현하며 MDX 파일
- `lib/`: 도메인 특화 유틸리티 함수, 헬퍼
- `ui/`: 해당 도메인 전용 UI 컴포넌트(화면 표시만 담당)

##### modules/common/

- 여러 도메인에 걸쳐 사용되는 **공통 기능(횡단 관심사)**을 모듈화 (예: Analytics, Comments, AdSense 등).
- 각 기능도 자체적인 `application`, `ui` 계층을 가질 수 있음

#### app/ (프레젠테이션 레이어 - Next.js 라우팅)

- `application` 계층 서비스를 호출해 데이터 fetch
- `modules/{domain}/ui`, `modules/common/{feature}/ui` 컴포넌트 조합
- `api/` 라우트에서는 `infra` 계층 구현체 사용

#### shared/ (Shared Kernel)

- 전역적으로, 어떤 도메인에도 강하게 종속되지 않는 재사용성 높은 코드 집합
- `constants/`: 여러 도메인에서 쓰는 값 객체 (예: Locale, Slug)
- `lib/`: 범용 유틸리티(예: 날짜 포맷터)
- `config/`: 전역 설정, 사이트 메타데이터 등
- `styles/`: css 스타일 정의
- `fonts/`: css 스타일 정의
- `mdx/`: mdx 파일 처리
- `i18n/`: 다국어 처리
- `components/, layouts/, shadcn-ui/`: shadcn/ui 확장, 아이콘 등 기본 UI 요소
- `types/`: DTO 등 전역 타입 정의

#### content/ (콘텐츠 폴더)

- DDD 계층 외부에 위치.
- 실제 포스트, 데이터 등 도메인 모델의 원본 데이터 소스 역할
- modules/post/infra 구현체가 이 데이터를 도메인 객체로 변환

## 🚀 개발 및 배포

### 개발 환경

- **Node.js 22+**
  - 최신 JavaScript 기능 지원
  - Next.js의 요구사항 충족
- **패키지 관리자: npm**
- **TypeScript**
  - 정적 타입 검사로 코드의 안정성과 유지보수성 강화

### 배포 환경

- **GitHub Pages**
  - 정적 파일을 빠르고 비용 효율적으로 호스팅
- **GitHub Actions**
  - 코드 푸시 시 자동 빌드 및 gh-pages 브랜치로 배포
  - 완전 자동화된 CI/CD(지속적 통합/배포) 파이프라인

### 환경 변수 설정

(.env.local 및 GitHub Actions Secrets)

- **Giscus 연동:**
  - `NEXT_PUBLIC_GISCUS_REPO`
  - `NEXT_PUBLIC_GISCUS_REPO_ID`
  - `NEXT_PUBLIC_GISCUS_CATEGORY`
  - `NEXT_PUBLIC_GISCUS_CATEGORY_ID`
- **Google AdSense:**
  - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- **Google Analytics 4 (GA4):**
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **GitHub API 인증:**
  - `GITHUB_TOKEN`
  - (Changelogs 기능에서 GitHub API 연동 시 사용, 반드시 GitHub Actions Secret으로 안전하게 관리)

## 📚 가이드

### 프로젝트 시작

1. **리포지토리 클론**
   ```bash
   git clone git@github.com:bangjuyoung/bangjuyoung.github.io.git
   cd bangjuyoung.github.io.git
   ```
2. **의존성 설치**
   ```bash
   npm install
   ```
3. **환경 변수 설정**
   - `.env.local` 파일을 생성해 [필요한 환경 변수](#환경-변수-설정)를 추가합니다.
4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   - 브라우저에서 `http://localhost:3000` 접속

### 콘텐츠 관리

- **새 포스트 생성**
  - `content/{분류}/` 폴더 아래에 슬러그(예: `my-new-post`)로 폴더 생성
- **MDX 파일 작성**
  - `index.ko-kr.mdx`, `index.en-us.mdx` 등 로케일별 MDX 파일 작성
  - 각 파일에 [Frontmatter](https://mdxjs.com/docs/frontmatter/) 포함
- **에셋 관리**
  - 이미지, 다이어그램 등은 해당 포스트 폴더에 저장
  - MDX 내에서 상대 경로로 참조

### 코드 컨벤션 및 린트

- **품질 도구:**
  - **Husky:** Git Hook 관리 (pre-commit, commit-msg 등)
  - **lint-staged:** 스테이징 파일에 대해 린트/포맷 자동 실행
  - **commitlint:** 커밋 메시지 Conventional Commits 준수 검사
- **작동 방식:**
  1. `git commit` 실행 → pre-commit 훅 자동 실행
  2. `lint-staged`가 스테이징 파일에 ESLint, Prettier 등 적용
  3. commit-msg 훅에서 커밋 메시지 컨벤션 체크(commitlint)
  4. 모든 검사를 통과해야 커밋이 완료됨

### 배포 (GitHub Pages)

1. **리포지토리 생성 및 푸시**
2. **GitHub Pages 설정:**
   - 리포지토리 → Settings → Pages → Source: "Deploy from a branch", Branch: `gh-pages`
3. **GitHub Actions 워크플로우:**
   - `.github/workflows/deploy-nextjs-to-pages.yml`에서 main 브랜치 푸시 시 자동 빌드 및 배포
4. **환경 변수 시크릿 추가:**
   - GitHub 리포지토리 → Settings → Secrets and variables → Actions
   - [필요한 환경 변수](#환경-변수-설정) 추가

## 참고

### ❗️정적 사이트 에러 처리

이 프로젝트는 Next.js의 정적 사이트 내보내기(output: 'export') 설정을 사용합니다.

> 빌드 시 모든 페이지가 미리 렌더링되어 HTML 파일로 저장됩니다. 이로 인해 런타임 에러(예: throw new Error)는 빌드 중에만 감지됩니다.<br />
> 빌드 시점에 에러가 발생하면 빌드 실패 또는 해당 경로가 누락되며, 클라이언트에서 발생하는 에러는 error.tsx로 자동 라우팅되지 않습니다.

- 동적 라우트별 error.tsx는 정적으로 빌드되지 않음
- 최상위 not-found.tsx(404) 페이지만 정적으로 생성
  - 모든 404 에러는 최상위 not-found 페이지로 일관 처리
