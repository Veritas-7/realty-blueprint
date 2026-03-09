import {
  LayoutDashboard,
  Building2,
  Palette,
  Layers,
  Route,
  FileText,
  PenTool,
  ShieldCheck,
  Search,
  CheckSquare,
  ClipboardList,
  Map,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
  description: string;
  keywords: string[];
}

export const navItems: NavItem[] = [
  { title: "Overview", path: "/", icon: LayoutDashboard, description: "가이드 시스템 대시보드", keywords: ["홈", "메인", "대시보드", "시작"] },
  { title: "Industry", path: "/industry-overview", icon: Building2, description: "부동산/공인중개 업종 특성", keywords: ["업종", "특성", "부동산", "공인중개", "시장"] },
  { title: "Design Guide", path: "/design-guide", icon: Palette, description: "디자인 가이드", keywords: ["디자인", "컬러", "타이포", "레이아웃", "색상"] },
  { title: "UI Guide", path: "/ui-guide", icon: Layers, description: "UI 컴포넌트 가이드", keywords: ["UI", "컴포넌트", "버튼", "카드", "폼"] },
  { title: "UX Guide", path: "/ux-guide", icon: Route, description: "UX 흐름 가이드", keywords: ["UX", "사용자", "여정", "전환", "모바일"] },
  { title: "Page Templates", path: "/page-templates", icon: FileText, description: "페이지 템플릿 모음", keywords: ["템플릿", "페이지", "구조", "섹션"] },
  { title: "Content Guide", path: "/content-guide", icon: PenTool, description: "콘텐츠/카피 가이드", keywords: ["콘텐츠", "카피", "문구", "CTA", "텍스트"] },
  { title: "Proof System", path: "/proof-system", icon: ShieldCheck, description: "신뢰/증빙 시스템", keywords: ["신뢰", "증빙", "등록정보", "후기", "proof"] },
  { title: "SEO/GEO", path: "/seo-geo", icon: Search, description: "SEO/GEO 가이드", keywords: ["SEO", "검색", "메타", "스키마", "지역"] },
  { title: "Checklist", path: "/checklist", icon: CheckSquare, description: "실무 체크리스트", keywords: ["체크리스트", "검수", "점검", "런칭"] },
  { title: "Client Brief", path: "/client-brief", icon: ClipboardList, description: "고객사 브리프 도구", keywords: ["브리프", "고객사", "입력", "정보"] },
  { title: "Site Blueprint", path: "/site-blueprint", icon: Map, description: "사이트 청사진 생성기", keywords: ["청사진", "블루프린트", "구조", "생성"] },
  { title: "Impl. Rules", path: "/implementation-rules", icon: Settings, description: "제작 규칙 엔진", keywords: ["규칙", "구현", "제작", "엔진", "분기"] },
];

export const getPrevNext = (currentPath: string) => {
  const idx = navItems.findIndex((i) => i.path === currentPath);
  return {
    prev: idx > 0 ? navItems[idx - 1] : null,
    next: idx < navItems.length - 1 ? navItems[idx + 1] : null,
  };
};
