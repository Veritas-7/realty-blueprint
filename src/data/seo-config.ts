import { industryConfig } from "./industry-config";

export interface RouteMetaConfig {
  title: string;
  description: string;
  robots?: string;
  ogImage?: string;
  canonicalPath?: string;
  jsonLdType?: string[];
}

export const SITE_URL = industryConfig.siteUrl;
const DEFAULT_OG_IMAGE = industryConfig.defaultOgImage;

export const routeMeta: Record<string, RouteMetaConfig> = {
  "/": {
    title: industryConfig.systemNameKo,
    description: "부동산/공인중개 업종 홈페이지를 빠르고 정확하게 제작하기 위한 내부 기준서, 브리프 도구, 사이트 청사진 생성 시스템입니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebSite"],
  },
  "/industry-overview": {
    title: "부동산/공인중개 업종 특성 — RE Guide System",
    description: "부동산/공인중개 홈페이지가 일반 서비스업과 다른 점, 방문자 행동 패턴, 사이트 유형별 차이를 정리합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/design-guide": {
    title: "디자인 가이드 — RE Guide System",
    description: "부동산/공인중개 업종에 최적화된 컬러, 타이포그래피, 레이아웃, 이미지 사용 기준을 정의합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/ui-guide": {
    title: "UI 가이드 — RE Guide System",
    description: "부동산 사이트에 필요한 UI 컴포넌트의 사용 목적, 배치 위치, 접근성 주의사항을 정리합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/ux-guide": {
    title: "UX 가이드 — RE Guide System",
    description: "부동산 사이트 방문자의 사용자 여정, 정보 우선순위, 전환 흐름, 모바일 UX 원칙을 정리합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/page-templates": {
    title: "페이지 템플릿 — RE Guide System",
    description: "실제 고객사 부동산 사이트 제작에 바로 사용할 수 있는 페이지별 섹션 구조, CTA, SEO 포인트를 정리합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/content-guide": {
    title: "콘텐츠/카피 가이드 — RE Guide System",
    description: "부동산 업종에서 신뢰를 높이고 전환을 유도하는 문장 작성 원칙과 템플릿을 제공합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/proof-system": {
    title: "신뢰/증빙 시스템 — RE Guide System",
    description: "부동산 사이트에서 방문자의 신뢰를 확보하기 위한 증빙 요소의 분류, 배치, 상태 관리 체계입니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/seo-geo": {
    title: "SEO/GEO 가이드 — RE Guide System",
    description: "부동산/공인중개 사이트의 검색 최적화, 지역 기반 탐색, 구조화 데이터, AI 검색 대응 전략을 정리합니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/checklist": {
    title: "실무 체크리스트 — RE Guide System",
    description: "부동산/공인중개 사이트 제작의 단계별 검수 항목 체크리스트입니다.",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/client-brief": {
    title: "Client Brief 도구 — RE Guide System",
    description: "고객사 정보를 입력하고 저장하는 브리프 도구입니다. 브리프를 기반으로 사이트 청사진이 자동 생성됩니다.",
    robots: "noindex, nofollow",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/site-blueprint": {
    title: "Site Blueprint 생성기 — RE Guide System",
    description: "Client Brief 기반으로 공개용 부동산 사이트 구조를 자동 제안하는 청사진 생성기입니다.",
    robots: "noindex, nofollow",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
  "/implementation-rules": {
    title: "Implementation Rules 엔진 — RE Guide System",
    description: "Client Brief 기반으로 제작 규칙과 우선순위를 자동 도출하는 규칙 엔진입니다.",
    robots: "noindex, nofollow",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLdType: ["WebPage"],
  },
};

export const notFoundMeta: RouteMetaConfig = {
  title: "페이지를 찾을 수 없습니다 — RE Guide System",
  description: "요청하신 페이지를 찾을 수 없습니다.",
  robots: "noindex, nofollow",
  canonicalPath: "/",
  ogImage: DEFAULT_OG_IMAGE,
};

export function generateBreadcrumbJsonLd(path: string, title: string) {
  const items = [
    { "@type": "ListItem", position: 1, name: "홈", item: `${SITE_URL}/` },
  ];
  if (path !== "/") {
    items.push({ "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}${path}` });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: industryConfig.systemNameKo,
    url: SITE_URL,
    description: "부동산/공인중개 업종 홈페이지 제작을 위한 내부 기준서 및 청사진 생성 시스템",
  };
}
