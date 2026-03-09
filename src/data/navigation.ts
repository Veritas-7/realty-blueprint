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
}

export const navItems: NavItem[] = [
  { title: "Overview", path: "/", icon: LayoutDashboard, description: "가이드 시스템 대시보드" },
  { title: "Industry", path: "/industry-overview", icon: Building2, description: "부동산/공인중개 업종 특성" },
  { title: "Design Guide", path: "/design-guide", icon: Palette, description: "디자인 가이드" },
  { title: "UI Guide", path: "/ui-guide", icon: Layers, description: "UI 컴포넌트 가이드" },
  { title: "UX Guide", path: "/ux-guide", icon: Route, description: "UX 흐름 가이드" },
  { title: "Page Templates", path: "/page-templates", icon: FileText, description: "페이지 템플릿 모음" },
  { title: "Content Guide", path: "/content-guide", icon: PenTool, description: "콘텐츠/카피 가이드" },
  { title: "Proof System", path: "/proof-system", icon: ShieldCheck, description: "신뢰/증빙 시스템" },
  { title: "SEO/GEO", path: "/seo-geo", icon: Search, description: "SEO/GEO 가이드" },
  { title: "Checklist", path: "/checklist", icon: CheckSquare, description: "실무 체크리스트" },
  { title: "Client Brief", path: "/client-brief", icon: ClipboardList, description: "고객사 브리프 도구" },
  { title: "Site Blueprint", path: "/site-blueprint", icon: Map, description: "사이트 청사진 생성기" },
  { title: "Impl. Rules", path: "/implementation-rules", icon: Settings, description: "제작 규칙 엔진" },
];

export const getPrevNext = (currentPath: string) => {
  const idx = navItems.findIndex((i) => i.path === currentPath);
  return {
    prev: idx > 0 ? navItems[idx - 1] : null,
    next: idx < navItems.length - 1 ? navItems[idx + 1] : null,
  };
};
