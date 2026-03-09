export const SCHEMA_VERSION = "1.0.0";

export interface ClientBrief {
  schemaVersion: string;
  lastSaved: string | null;
  businessName: string;
  brandName: string;
  propertyTypes: string[];
  primaryRegion: string;
  transactionTypes: string[];
  propertyCategories: string[];
  branchType: "single" | "multi";
  address: string;
  phone: string;
  consultationHours: string;
  consultationChannels: string[];
  hasRepresentativeInfo: boolean;
  hasRegistrationInfo: boolean;
  hasListings: boolean;
  hasReviews: boolean;
  hasRegionalContent: boolean;
  hasOfficePhotos: boolean;
  requiredPages: string[];
  primaryCTA: string[];
  brandTone: string;
  prohibitedExpressions: string;
  competitorNotes: string;
}

export const defaultBrief: ClientBrief = {
  schemaVersion: SCHEMA_VERSION,
  lastSaved: null,
  businessName: "",
  brandName: "",
  propertyTypes: [],
  primaryRegion: "",
  transactionTypes: [],
  propertyCategories: [],
  branchType: "single",
  address: "",
  phone: "",
  consultationHours: "",
  consultationChannels: [],
  hasRepresentativeInfo: false,
  hasRegistrationInfo: false,
  hasListings: false,
  hasReviews: false,
  hasRegionalContent: false,
  hasOfficePhotos: false,
  requiredPages: [],
  primaryCTA: [],
  brandTone: "",
  prohibitedExpressions: "",
  competitorNotes: "",
};

export const exampleBrief: ClientBrief = {
  schemaVersion: SCHEMA_VERSION,
  lastSaved: null,
  businessName: "한강부동산공인중개사사무소 (예시 데이터)",
  brandName: "한강부동산 (예시 데이터)",
  propertyTypes: ["아파트", "오피스텔", "빌라"],
  primaryRegion: "서울특별시 마포구 (예시 데이터)",
  transactionTypes: ["매매", "전세", "월세"],
  propertyCategories: ["주거용"],
  branchType: "single",
  address: "서울특별시 마포구 월드컵북로 000 (예시 데이터)",
  phone: "02-000-0000 (예시 데이터)",
  consultationHours: "평일 09:00~18:00, 토요일 10:00~15:00 (예시 데이터)",
  consultationChannels: ["전화", "카카오톡", "방문상담"],
  hasRepresentativeInfo: true,
  hasRegistrationInfo: true,
  hasListings: true,
  hasReviews: true,
  hasRegionalContent: true,
  hasOfficePhotos: true,
  requiredPages: ["홈", "매물리스트", "대표소개", "오시는길", "상담문의"],
  primaryCTA: ["전화상담", "카카오문의"],
  brandTone: "신뢰감 있는 지역 전문 중개, 차분하고 전문적인 톤 (예시 데이터)",
  prohibitedExpressions: "수익 보장, 무조건 상승, 1등 중개 (예시 데이터)",
  competitorNotes: "인근 대형 프랜차이즈 중개업소 대비 지역 밀착 전문성 강조 (예시 데이터)",
};

export const PROPERTY_TYPE_OPTIONS = [
  "아파트", "오피스텔", "빌라/다세대", "원룸/투룸", "단독주택",
  "상가", "사무실", "공장/창고", "토지", "전원주택", "분양권",
];

export const TRANSACTION_TYPE_OPTIONS = [
  "매매", "전세", "월세", "분양", "임대",
];

export const PROPERTY_CATEGORY_OPTIONS = [
  "주거용", "상업용", "토지", "분양",
];

export const CONSULTATION_CHANNEL_OPTIONS = [
  "전화", "카카오톡", "네이버톡톡", "문의폼", "방문상담", "이메일",
];

export const PAGE_OPTIONS = [
  "홈", "지역/거래유형소개", "매물리스트", "매물상세", "대표소개",
  "오시는길", "상담문의", "매물접수", "후기", "블로그/지역정보", "분양상담",
];

export const CTA_OPTIONS = [
  "전화상담", "카카오문의", "문의폼", "방문예약", "매물보기", "내집내놓기",
];

export const BRAND_TONE_OPTIONS = [
  "신뢰·전문", "친근·따뜻", "모던·세련", "지역밀착·실속", "프리미엄·격조",
];
