import { type ClientBrief } from "@/data/briefSchema";

export type SiteType = "지역전문형" | "매물탐색형" | "상담전환형" | "대표신뢰형" | "분양상담형" | "다지점형";

export interface SiteTypeResult {
  type: SiteType;
  score: number;
  reasoning: string;
}

export function determineSiteType(brief: ClientBrief): SiteTypeResult {
  const scores: { type: SiteType; score: number; reasoning: string }[] = [
    {
      type: "분양상담형",
      score: brief.propertyCategories.includes("분양") ? 10 : 0,
      reasoning: "분양 카테고리 포함",
    },
    {
      type: "다지점형",
      score: brief.branchType === "multi" ? 9 : 0,
      reasoning: "다지점 운영",
    },
    {
      type: "매물탐색형",
      score: brief.hasListings ? 7 + (brief.requiredPages.includes("매물리스트") ? 2 : 0) : 0,
      reasoning: "매물 DB 보유" + (brief.requiredPages.includes("매물리스트") ? " + 매물리스트 페이지 요청" : ""),
    },
    {
      type: "대표신뢰형",
      score: brief.hasRepresentativeInfo ? 6 + (brief.hasRegistrationInfo ? 1 : 0) : 0,
      reasoning: "대표 정보 보유" + (brief.hasRegistrationInfo ? " + 등록정보 공개" : ""),
    },
    {
      type: "지역전문형",
      score: brief.hasRegionalContent ? 5 + (brief.primaryRegion ? 2 : 0) : (brief.primaryRegion ? 3 : 0),
      reasoning: brief.hasRegionalContent ? "지역 콘텐츠 보유" : "지역 정보 입력",
    },
    {
      type: "상담전환형",
      score: 2,
      reasoning: "기본 폴백 (상담 CTA 중심)",
    },
  ];

  const sorted = scores.sort((a, b) => b.score - a.score);
  return sorted[0];
}

export interface ProofStatus {
  name: string;
  status: "보유" | "부족" | "비공개" | "검토 필요";
  briefField: keyof ClientBrief;
}

export function getProofStatuses(brief: ClientBrief): ProofStatus[] {
  return [
    { name: "공인중개사 등록정보", status: brief.hasRegistrationInfo ? "보유" : "부족", briefField: "hasRegistrationInfo" },
    { name: "대표 공인중개사 정보", status: brief.hasRepresentativeInfo ? "보유" : "부족", briefField: "hasRepresentativeInfo" },
    { name: "대표 매물/주력 매물", status: brief.hasListings ? "보유" : "부족", briefField: "hasListings" },
    { name: "고객 후기", status: brief.hasReviews ? "보유" : "부족", briefField: "hasReviews" },
    { name: "지역 콘텐츠", status: brief.hasRegionalContent ? "보유" : "부족", briefField: "hasRegionalContent" },
    { name: "사무소/시설 사진", status: brief.hasOfficePhotos ? "보유" : "부족", briefField: "hasOfficePhotos" },
  ];
}

export function getAssetCompleteness(brief: ClientBrief): { total: number; owned: number; pct: number } {
  const fields: (keyof ClientBrief)[] = [
    "hasRegistrationInfo", "hasRepresentativeInfo", "hasListings",
    "hasReviews", "hasRegionalContent", "hasOfficePhotos",
  ];
  const owned = fields.filter((f) => brief[f] === true).length;
  return { total: fields.length, owned, pct: Math.round((owned / fields.length) * 100) };
}

export interface PageClassification {
  name: string;
  classification: "필수" | "권장" | "조건부" | "금지";
  reason: string;
}

export function classifyPages(brief: ClientBrief): PageClassification[] {
  const pages: PageClassification[] = [
    { name: "홈", classification: "필수", reason: "모든 사이트의 진입점" },
    { name: "상담/문의", classification: "필수", reason: "전환의 핵심" },
    { name: "대표/사무소 소개", classification: brief.hasRepresentativeInfo ? "필수" : "권장", reason: brief.hasRepresentativeInfo ? "대표 정보 보유" : "사무소 소개로 대체 가능" },
    { name: "오시는 길", classification: "권장", reason: "위치/방문 신뢰" },
    { name: "매물 리스트", classification: brief.hasListings ? "필수" : "금지", reason: brief.hasListings ? "매물 DB 보유" : "매물 DB 미보유 시 허위매물 우려" },
    { name: "매물 상세", classification: brief.hasListings ? "조건부" : "금지", reason: brief.hasListings ? "매물 리스트 연동" : "매물 DB 미보유" },
    { name: "후기", classification: brief.hasReviews ? "조건부" : "금지", reason: brief.hasReviews ? "후기 보유" : "허위 후기 생성 금지" },
    { name: "블로그/지역정보", classification: brief.hasRegionalContent ? "조건부" : "권장", reason: brief.hasRegionalContent ? "지역 콘텐츠 보유" : "SEO 효과 기대" },
    { name: "지점 안내", classification: brief.branchType === "multi" ? "필수" : "금지", reason: brief.branchType === "multi" ? "다지점 운영" : "단일 지점" },
    { name: "분양 상담", classification: brief.propertyCategories.includes("분양") ? "조건부" : "금지", reason: brief.propertyCategories.includes("분양") ? "분양 카테고리 포함" : "분양 미포함" },
    { name: "매물 접수", classification: "권장", reason: "매도자/임대인 전환 채널" },
  ];
  return pages;
}

export interface BudgetTier {
  name: string;
  label: string;
  pages: string[];
  sections: string[];
}

export function getBudgetTiers(brief: ClientBrief): BudgetTier[] {
  const min: BudgetTier = {
    name: "minimal",
    label: "최소 구성",
    pages: ["홈 (원페이지)"],
    sections: ["히어로", "Quick Info Bar", "사무소 정보", "상담 CTA", "모바일 하단 CTA", "푸터"],
  };

  const std: BudgetTier = {
    name: "standard",
    label: "표준 구성",
    pages: ["홈", "대표/사무소 소개", "상담/문의", "오시는 길"],
    sections: [...min.sections, "지역/거래 바로가기", "FAQ"],
  };
  if (brief.hasListings) std.pages.splice(1, 0, "매물 리스트");
  if (brief.hasRepresentativeInfo) std.sections.push("대표 프로필 카드");

  const full: BudgetTier = {
    name: "full",
    label: "풀 구성",
    pages: ["홈", "매물 리스트", "매물 상세", "대표 소개", "오시는 길", "상담/문의", "매물 접수", "후기", "블로그/지역정보"],
    sections: [...std.sections, "대표 매물", "후기 카드", "지역 콘텐츠", "비교표"],
  };
  if (brief.propertyCategories.includes("분양")) full.pages.push("분양 상담");
  if (brief.branchType === "multi") full.pages.push("지점 안내");

  return [min, std, full];
}

export const CORE_BLOCKS = [
  "히어로 (지역+거래 전문성)",
  "Quick Info Bar (전화/상담시간/주소)",
  "상담 CTA 블록",
  "사무소 등록정보",
  "모바일 하단 고정 CTA",
  "푸터 (사업자 정보, 면책)",
];

export interface RemovableBlock {
  name: string;
  condition: string;
}

export function getRemovableBlocks(brief: ClientBrief): RemovableBlock[] {
  const blocks: RemovableBlock[] = [];
  if (!brief.hasListings) blocks.push({ name: "매물 리스트/상세 페이지", condition: "매물 DB 미보유" });
  if (!brief.hasReviews) blocks.push({ name: "후기 섹션/페이지", condition: "후기 미보유" });
  if (!brief.hasRegionalContent) blocks.push({ name: "지역 정보/블로그", condition: "지역 콘텐츠 미보유" });
  if (!brief.hasOfficePhotos) blocks.push({ name: "사무소 사진 갤러리", condition: "사진 미보유 → 지도로 대체" });
  if (!brief.hasRepresentativeInfo) blocks.push({ name: "대표 프로필 카드", condition: "대표 정보 미보유 → 사무소 소개로 대체" });
  return blocks;
}
