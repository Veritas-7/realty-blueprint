# 부동산/공인중개 웹 제작 가이드 시스템 (RE Guide System)

부동산/공인중개 업종 홈페이지를 빠르고 정확하게 제작하기 위한 **내부 기준서 + 고객사 브리프 도구 + 사이트 청사진 생성 시스템**입니다.

<!-- SOURCE_DERIVED_DESIGN_CONTRACT_START -->

## Source-derived design contract

This repository includes a source-derived [DESIGN.md](./DESIGN.md) for recreating the same homepage style, color system, component rhythm, and industry-specific UI rules from implementation evidence.

- Public reference repo: https://github.com/Veritas-7/realty-blueprint
- Industry: 부동산/공인중개
- Source evidence: `src/index.css`, `tailwind.config.ts`, route/navigation data, guide components, and industry configuration
- Verification gates: `design-md-lint DESIGN.md`, `npm run build`, `npm test`, `npm run lint`

<!-- SOURCE_DERIVED_DESIGN_CONTRACT_END -->


## 핵심 기능

### 1. 내부 가이드 (기준서)
- **Industry Overview** — 부동산/공인중개 업종 특성
- **Design Guide** — 컬러, 타이포, 레이아웃, 이미지 기준
- **UI Guide** — 업종 필수 UI 컴포넌트 가이드
- **UX Guide** — 사용자 여정, 전환 흐름, 모바일 UX
- **Page Templates** — 재사용 가능한 페이지 템플릿
- **Content Guide** — 카피라이팅 원칙, CTA 문구
- **Proof System** — 신뢰/증빙 요소 관리
- **SEO/GEO** — 검색 최적화, 지역 기반 탐색
- **Checklist** — 단계별 실무 검수 체크리스트

### 2. 고객사 브리프 도구 (`/client-brief`)
- 고객사 정보 입력 (상호, 지역, 거래유형, 자산 보유 여부 등)
- localStorage 자동 저장
- JSON 내보내기/불러오기
- 브리프 요약 및 누락 항목 경고

### 3. 사이트 청사진 생성기 (`/site-blueprint`)
- 브리프 기반 사이트 유형 자동 판별
- 필수/선택/조건부/금지 페이지 분류
- 페이지별 섹션 구조 출력
- 메타 타이틀/디스크립션 예시
- JSON-LD 추천
- Lovable용 생성 프롬프트 출력

### 4. 제작 규칙 엔진 (`/implementation-rules`)
- 브리프 기반 조건부 분기 규칙
- 예산별 구성 (최소/표준/풀)
- 절대 유지 블록 / 제거 가능 블록
- 즉시 제작 지침 카드

## 워크플로우

```
Client Brief → Site Blueprint → Implementation Rules → 공개용 사이트 제작
```

1. **Client Brief** 페이지에서 고객사 정보 입력
2. **Site Blueprint**에서 자동 생성된 사이트 구조 확인
3. **Implementation Rules**에서 제작 규칙/우선순위 확인
4. 가이드 페이지를 참고하여 실제 사이트 제작

## 포괄 대상
- 지역 공인중개사무소
- 아파트/오피스텔 전월세/매매 중개
- 상가/사무실/상업용 부동산
- 신축 분양 상담형 부동산
- 원룸/투룸/다가구 중개
- 토지/전원주택 중개
- 소규모 다지점 중개 브랜드

## 기술 스택
- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router (SPA)

## 개발

```sh
npm install
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드
npm run test    # 테스트 실행
```
