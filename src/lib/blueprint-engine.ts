import { type ClientBrief } from "@/data/briefSchema";
import { type SiteTypeResult, determineSiteType, classifyPages } from "./brief-analysis";
import { type BadgeVariant } from "@/components/guide/StatusBadge";

export interface BlueprintSection {
  name: string;
  purpose: string;
  badge: BadgeVariant;
}

export interface BlueprintPageOutput {
  pageTitle: string;
  pageDescription: string;
  sections: BlueprintSection[];
  primaryCTA: string[];
  secondaryCTA: string[];
  proofElements: string[];
  mobileRules: string[];
  seoPoints: string[];
  fallbacks: string[];
  typeVariants: string[];
  reviewClaims: string[];
  metaTitle: string;
  metaDescription: string;
  jsonLdTypes: string[];
}

export function generateHomepageBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  const txTypes = brief.transactionTypes.join("·") || "중개";

  const sections: BlueprintSection[] = [
    { name: "Hero", purpose: `${region} ${txTypes} 전문 전달 + 핵심 CTA`, badge: "required" },
    { name: "Quick Info Bar", purpose: `${brief.phone || "전화"} / ${brief.consultationChannels.join(" / ") || "상담 채널"}`, badge: "required" },
    { name: "지역/거래유형 바로가기", purpose: "방문 목적별 진입", badge: "recommended" },
  ];

  if (brief.hasListings) sections.push({ name: "대표 매물", purpose: "주력 매물 노출", badge: "required" });
  if (brief.hasRepresentativeInfo) sections.push({ name: "대표 공인중개사 소개", purpose: "인물 신뢰", badge: "required" });
  sections.push({ name: "사무소 정보/등록정보", purpose: "법적 신뢰", badge: "required" });
  if (brief.hasReviews) sections.push({ name: "고객 후기", purpose: "사회적 증거", badge: "recommended" });
  sections.push(
    { name: "상담 CTA 블록", purpose: "전환 유도", badge: "required" },
    { name: "FAQ", purpose: "의문 해소", badge: "recommended" },
    { name: "Footer", purpose: "사업자 정보, 면책", badge: "required" },
  );

  return {
    pageTitle: "홈페이지",
    pageDescription: "첫 방문자에게 지역·거래 전문성, 신뢰, 상담 경로를 모두 전달하는 메인 페이지",
    sections,
    primaryCTA: brief.primaryCTA.length > 0 ? brief.primaryCTA : ["전화상담", "카카오문의"],
    secondaryCTA: ["매물보기", "오시는 길"],
    proofElements: [
      brief.hasRegistrationInfo ? "등록정보 ✓" : "등록정보 필요",
      brief.hasRepresentativeInfo ? "대표 프로필 ✓" : "사무소 소개로 대체",
      brief.hasReviews ? "후기 ✓" : "FAQ로 대체",
    ],
    mobileRules: ["하단 고정 CTA 바 필수", "히어로 텍스트 중심 (이미지 축소)", "Quick Info Bar 아이콘만 표시"],
    seoPoints: [`H1에 "${region} ${txTypes} 전문" 포함`, "메타 디스크립션에 지역+거래유형+전화번호"],
    fallbacks: [
      !brief.hasListings ? "매물 섹션 → 서비스 안내로 대체" : "",
      !brief.hasRepresentativeInfo ? "대표 프로필 → 사무소 소개로 대체" : "",
      !brief.hasReviews ? "후기 → FAQ 강화" : "",
      !brief.hasOfficePhotos ? "사무소 사진 → 지도 임베드" : "",
    ].filter(Boolean),
    typeVariants: [
      brief.propertyCategories.includes("상업용") ? "상업용: 유동인구/권리금 정보 섹션 추가" : "",
      brief.propertyCategories.includes("토지") ? "토지: 용도지역/개발계획 정보 추가" : "",
      brief.propertyCategories.includes("분양") ? "분양: 분양 일정/평형 안내 섹션 추가" : "",
    ].filter(Boolean),
    reviewClaims: brief.prohibitedExpressions ? brief.prohibitedExpressions.split(",").map((s) => s.trim()).filter(Boolean) : [],
    metaTitle: `${region} ${brief.propertyTypes.join("/")} ${brief.transactionTypes[0] || "중개"} 전문 — ${biz}`,
    metaDescription: `${region} ${brief.propertyTypes.join(", ")} ${brief.transactionTypes.join(", ")} 전문 중개. ${brief.consultationChannels.join(", ")} 상담 가능. ${brief.phone}`,
    jsonLdTypes: ["RealEstateAgent", "LocalBusiness", "BreadcrumbList", "FAQPage"],
  };
}

export function generateListingsBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "매물 리스트",
    pageDescription: "매물을 조건별로 탐색하고 상세 페이지로 진입하는 허브 페이지",
    sections: [
      { name: "페이지 제목 + 지역/유형 표시", purpose: "현재 위치 인지", badge: "required" },
      { name: "필터/정렬 바", purpose: "조건 탐색", badge: "recommended" },
      { name: "매물 카드 그리드", purpose: "매물 목록 노출", badge: "required" },
      { name: "페이지네이션/더보기", purpose: "추가 매물 탐색", badge: "required" },
      { name: "상담 CTA", purpose: "원하는 매물 없을 때 전환", badge: "required" },
    ],
    primaryCTA: ["상담문의", "전화상담"],
    secondaryCTA: ["매물접수"],
    proofElements: ["매물 날짜 표시", "등록정보 푸터"],
    mobileRules: ["세로 카드 스택", "필터 바텀시트", "무한 스크롤 또는 더보기"],
    seoPoints: ["지역+매물유형 조합 제목", "각 매물에 구조화 데이터"],
    fallbacks: [],
    typeVariants: [
      brief.propertyCategories.includes("상업용") ? "상업용: 권리금/월세 필터 추가" : "",
    ].filter(Boolean),
    reviewClaims: ["오래된 매물 상단 노출 시 허위매물 의심 — 날짜 표시 필수"],
    metaTitle: `${region} ${brief.propertyTypes.join("/")} 매물 — ${biz}`,
    metaDescription: `${region} ${brief.propertyTypes.join(", ")} 매물을 확인하세요. 실시간 업데이트. 상담 가능.`,
    jsonLdTypes: ["ItemList", "BreadcrumbList"],
  };
}

export function generateAboutBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "대표/사무소 소개",
    pageDescription: "대표 공인중개사와 사무소의 신뢰 정보를 집중 전달하는 페이지",
    sections: [
      { name: "대표 프로필 (사진+경력+자격)", purpose: "인물 신뢰", badge: brief.hasRepresentativeInfo ? "required" : "conditional" },
      { name: "사무소 등록정보", purpose: "법적 신뢰", badge: "required" },
      { name: "전문 분야/지역", purpose: "전문성 전달", badge: "required" },
      { name: "운영 철학/인사말", purpose: "브랜드 톤", badge: "optional" },
      { name: "사무소 사진", purpose: "실재감", badge: brief.hasOfficePhotos ? "recommended" : "optional" },
      { name: "상담 CTA", purpose: "전환", badge: "required" },
    ],
    primaryCTA: ["전화상담", "방문예약"],
    secondaryCTA: ["카카오문의"],
    proofElements: ["등록정보", "대표 프로필", "사무소 사진"],
    mobileRules: ["세로 배치", "프로필 카드 중심"],
    seoPoints: ["H1에 '대표 공인중개사' + 이름 포함"],
    fallbacks: [
      !brief.hasRepresentativeInfo ? "대표 프로필 → 사무소 소개로 대체" : "",
      !brief.hasOfficePhotos ? "사무소 사진 → 지도 캡처" : "",
    ].filter(Boolean),
    typeVariants: [],
    reviewClaims: ["허위 경력, 허위 자격, 허위 수상 절대 금지"],
    metaTitle: `대표 공인중개사 소개 — ${biz} ${region}`,
    metaDescription: `${region} ${biz} 대표 공인중개사 소개. 등록정보 공개. 전문 상담.`,
    jsonLdTypes: ["RealEstateAgent", "Person", "BreadcrumbList"],
  };
}

export function generateContactBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "상담/문의",
    pageDescription: "전화·카카오·폼을 통한 상담 전환 집중 페이지",
    sections: [
      { name: "상담 안내 (시간/채널)", purpose: "상담 가능 여부 확인", badge: "required" },
      { name: "전화/카카오 바로가기", purpose: "즉시 전환", badge: "required" },
      { name: "문의 폼 (최소 필드)", purpose: "비실시간 전환", badge: "required" },
      { name: "대표 프로필 요약", purpose: "신뢰 보강", badge: "recommended" },
      { name: "FAQ", purpose: "의문 해소", badge: "optional" },
    ],
    primaryCTA: ["전화하기", "카카오문의", "폼 제출"],
    secondaryCTA: [],
    proofElements: ["상담시간", "등록정보"],
    mobileRules: ["폼 full width", "큰 터치 타겟", "tel 입력 타입"],
    seoPoints: ["H1에 '상담' + 지역명"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: ["폼 필드 5개 초과 금지", "개인정보 과다 수집 금지"],
    metaTitle: `상담 문의 — ${biz} ${region}`,
    metaDescription: `${brief.consultationChannels.join(", ")} 상담. ${brief.consultationHours}. ${brief.phone}.`,
    jsonLdTypes: ["ContactPage", "BreadcrumbList"],
  };
}

export function generateLocationBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "오시는 길" + (brief.branchType === "multi" ? " / 지점 안내" : ""),
    pageDescription: "사무소 위치, 교통, 주차 안내" + (brief.branchType === "multi" ? " 및 지점 정보" : ""),
    sections: [
      { name: "지도 임베드", purpose: "위치 확인", badge: "required" },
      { name: "주소/교통/주차 안내", purpose: "방문 정보", badge: "required" },
      ...(brief.branchType === "multi" ? [{ name: "지점 선택 카드", purpose: "지점별 연락처/주소", badge: "required" as BadgeVariant }] : []),
      { name: "상담시간 안내", purpose: "방문 가능 확인", badge: "required" },
      { name: "사무소 외관 사진", purpose: "실재감", badge: brief.hasOfficePhotos ? "recommended" : "optional" },
    ],
    primaryCTA: ["길찾기", "전화하기"],
    secondaryCTA: ["방문예약"],
    proofElements: ["사무소 사진", "주소"],
    mobileRules: ["지도 터치 스크롤 주의", "길찾기 원터치"],
    seoPoints: ["Place 스키마", "주소 address 태그"],
    fallbacks: [!brief.hasOfficePhotos ? "사무소 사진 → 로드뷰/지도 캡처" : ""].filter(Boolean),
    typeVariants: brief.branchType === "multi" ? ["다지점: 지점 선택 후 개별 지도 표시"] : [],
    reviewClaims: [],
    metaTitle: `오시는 길 — ${biz}`,
    metaDescription: `${brief.address}. ${brief.consultationHours}. 방문 상담 가능.`,
    jsonLdTypes: ["Place", "LocalBusiness", "BreadcrumbList"],
  };
}

export function generateReviewsBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "후기/고객 이야기",
    pageDescription: "실제 거래 후기와 고객 경험을 보여주는 페이지",
    sections: [
      { name: "후기 목록", purpose: "사회적 증거", badge: "required" },
      { name: "후기 요약/통계", purpose: "전체 만족도", badge: "optional" },
      { name: "상담 CTA", purpose: "전환", badge: "required" },
    ],
    primaryCTA: ["상담문의"],
    secondaryCTA: [],
    proofElements: ["실제 후기만 사용"],
    mobileRules: ["가로 스크롤 카드"],
    seoPoints: ["Review 스키마"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: ["허위 후기 작성 절대 금지"],
    metaTitle: `고객 후기 — ${biz}`,
    metaDescription: `${biz} 실제 고객 후기. 거래 경험을 확인하세요.`,
    jsonLdTypes: ["Review", "BreadcrumbList"],
  };
}

export function generateSubmitListingBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "매물 접수",
    pageDescription: "매도자/임대인이 매물을 내놓기 위한 접수 폼 페이지",
    sections: [
      { name: "매물 접수 안내", purpose: "프로세스 설명", badge: "required" },
      { name: "접수 폼 (최소 필드)", purpose: "매물 정보 수집", badge: "required" },
      { name: "접수 후 안내", purpose: "다음 단계 안내", badge: "recommended" },
    ],
    primaryCTA: ["매물 접수하기", "전화상담"],
    secondaryCTA: [],
    proofElements: ["접수 프로세스 안내", "등록정보"],
    mobileRules: ["폼 full width", "단계별 진행"],
    seoPoints: ["'매물 내놓기' + 지역명"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: [],
    metaTitle: `내 매물 내놓기 — ${biz}`,
    metaDescription: `매도/임대 매물을 접수하세요. 무료 상담.`,
    jsonLdTypes: ["WebPage", "BreadcrumbList"],
  };
}

export function generateBlogBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "블로그/지역 정보",
    pageDescription: "시세 분석, 지역 뉴스, 부동산 정보 콘텐츠",
    sections: [
      { name: "콘텐츠 목록", purpose: "정보 탐색", badge: "required" },
      { name: "카테고리 필터", purpose: "주제별 탐색", badge: "optional" },
      { name: "상담 CTA", purpose: "전환", badge: "required" },
    ],
    primaryCTA: ["상담문의"],
    secondaryCTA: ["매물보기"],
    proofElements: ["지역 전문성 간접 증명"],
    mobileRules: ["카드형 목록"],
    seoPoints: ["Article 스키마", "지역+주제 키워드"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: ["허위 시세, 투기 조장 콘텐츠 금지"],
    metaTitle: `${region} 부동산 정보 — ${biz}`,
    metaDescription: `${region} 시세 분석, 지역 정보, 부동산 뉴스.`,
    jsonLdTypes: ["Article", "BreadcrumbList"],
  };
}

export function generateAreaBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "지역/거래유형 소개",
    pageDescription: "특정 지역의 생활권·시세·거래 동향 정보 페이지",
    sections: [
      { name: "지역 개요", purpose: "지역 특성 전달", badge: "required" },
      { name: "생활권 정보", purpose: "교통/학군/편의시설", badge: "recommended" },
      { name: "거래 동향", purpose: "시세 참고", badge: "conditional" },
      { name: "해당 지역 매물 바로가기", purpose: "매물 탐색 연결", badge: brief.hasListings ? "recommended" : "optional" },
      { name: "상담 CTA", purpose: "전환", badge: "required" },
    ],
    primaryCTA: ["상담문의", "매물보기"],
    secondaryCTA: [],
    proofElements: ["지역 전문성"],
    mobileRules: ["카드형 정보 블록"],
    seoPoints: ["지역명+거래유형 H1", "지역 키워드 밀도"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: ["허위 시세 정보 금지"],
    metaTitle: `${region} 부동산 안내 — ${biz}`,
    metaDescription: `${region} 생활권, 시세, 거래 동향 안내. 전문 상담.`,
    jsonLdTypes: ["Place", "WebPage", "BreadcrumbList"],
  };
}

export function generateListingDetailBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "매물 상세",
    pageDescription: "개별 매물의 상세 정보를 보여주고 상담으로 전환하는 페이지",
    sections: [
      { name: "매물 이미지 갤러리", purpose: "시각 정보 제공", badge: "required" },
      { name: "가격/면적/층/거래유형 요약", purpose: "핵심 정보 빠른 확인", badge: "required" },
      { name: "위치/교통/생활권", purpose: "입지 정보", badge: "recommended" },
      { name: "상세 설명", purpose: "매물 특징 설명", badge: "required" },
      { name: "상담 CTA", purpose: "관심 매물 전환", badge: "required" },
      { name: "유사 매물 추천", purpose: "이탈 방지", badge: "optional" },
    ],
    primaryCTA: ["이 매물 상담하기", "전화문의"],
    secondaryCTA: ["유사 매물 보기"],
    proofElements: ["매물 등록일", "등록정보"],
    mobileRules: ["이미지 스와이프", "CTA 하단 고정"],
    seoPoints: ["매물별 고유 제목", "이미지 alt에 매물 정보"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: ["허위 가격, 과장 면적 표시 절대 금지"],
    metaTitle: `매물 상세 — ${biz}`,
    metaDescription: `매물 상세 정보. 상담 가능.`,
    jsonLdTypes: ["Product", "BreadcrumbList"],
  };
}

export function generateBunyangBlueprint(brief: ClientBrief): BlueprintPageOutput {
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  return {
    pageTitle: "분양/신축 상담",
    pageDescription: "특정 분양 단지 정보와 상담 신청 페이지",
    sections: [
      { name: "분양 단지 정보", purpose: "단지 개요", badge: "required" },
      { name: "평형/가격 안내", purpose: "핵심 분양 정보", badge: "required" },
      { name: "분양 일정", purpose: "청약/입주 일정", badge: "required" },
      { name: "모델하우스 안내", purpose: "현장 방문 유도", badge: "recommended" },
      { name: "상담 CTA", purpose: "분양 상담 전환", badge: "required" },
    ],
    primaryCTA: ["분양 상담", "전화문의"],
    secondaryCTA: ["모델하우스 방문"],
    proofElements: ["분양 일정", "시행사/시공사 정보"],
    mobileRules: ["평형 비교 가로 스크롤"],
    seoPoints: ["단지명+지역+분양 키워드"],
    fallbacks: [],
    typeVariants: [],
    reviewClaims: ["허위 분양가, 허위 수익률 금지"],
    metaTitle: `${region} 분양 상담 — ${biz}`,
    metaDescription: `${region} 신축 분양 상담. 평형, 가격, 일정 안내.`,
    jsonLdTypes: ["WebPage", "BreadcrumbList"],
  };
}

export function getAllBlueprints(brief: ClientBrief): BlueprintPageOutput[] {
  const pages: BlueprintPageOutput[] = [generateHomepageBlueprint(brief)];
  const classified = classifyPages(brief);

  const shouldInclude = (name: string) => {
    const c = classified.find((p) => p.name === name);
    return c && c.classification !== "금지";
  };

  if (shouldInclude("매물 리스트")) pages.push(generateListingsBlueprint(brief));
  if (shouldInclude("매물 상세")) pages.push(generateListingDetailBlueprint(brief));
  pages.push(generateAboutBlueprint(brief));
  pages.push(generateLocationBlueprint(brief));
  pages.push(generateContactBlueprint(brief));
  pages.push(generateAreaBlueprint(brief));
  if (shouldInclude("매물 접수")) pages.push(generateSubmitListingBlueprint(brief));
  if (shouldInclude("후기")) pages.push(generateReviewsBlueprint(brief));
  if (shouldInclude("블로그/지역정보")) pages.push(generateBlogBlueprint(brief));
  if (shouldInclude("분양 상담")) pages.push(generateBunyangBlueprint(brief));

  return pages;
}

export function generateLovablePrompt(brief: ClientBrief): string {
  const siteType = determineSiteType(brief);
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  const classified = classifyPages(brief);
  const requiredPages = classified.filter((p) => p.classification === "필수").map((p) => p.name);
  const recommendedPages = classified.filter((p) => p.classification === "권장").map((p) => p.name);

  return `다음 조건으로 부동산 공인중개사 홈페이지를 만들어주세요:
- 사이트 유형: ${siteType.type} (${siteType.reasoning})
- 사무소명: ${biz}
- 지역: ${region}
- 부동산 유형: ${brief.propertyTypes.join(", ")}
- 거래 유형: ${brief.transactionTypes.join(", ")}
- 지점: ${brief.branchType === "single" ? "단일" : "다지점"}
- 핵심 CTA: ${brief.primaryCTA.join(", ")}
- 브랜드 톤: ${brief.brandTone}
- 필수 페이지: ${requiredPages.join(", ")}
- 권장 페이지: ${recommendedPages.join(", ")}
- 전화: ${brief.phone}
- 주소: ${brief.address}
- 상담시간: ${brief.consultationHours}
- 상담 채널: ${brief.consultationChannels.join(", ")}
${brief.prohibitedExpressions ? `- 금지 표현: ${brief.prohibitedExpressions}` : ""}

디자인 방향: 신뢰감, 지역 전문성, 모바일 우선, 상담 전환 중심. 딥 네이비+화이트+틸 컬러. 과장/투자광고 톤 금지.
보유 자산: ${[
    brief.hasRegistrationInfo && "등록정보",
    brief.hasRepresentativeInfo && "대표 프로필",
    brief.hasListings && "매물 DB",
    brief.hasReviews && "후기",
    brief.hasRegionalContent && "지역 콘텐츠",
    brief.hasOfficePhotos && "사무소 사진",
  ].filter(Boolean).join(", ") || "없음"}`;
}
