import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge, type BadgeVariant } from "@/components/guide/StatusBadge";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { TableOfContents } from "@/components/guide/TableOfContents";

interface TemplateSection {
  name: string;
  purpose: string;
  badge: BadgeVariant;
}

interface PageTemplate {
  id: string;
  title: string;
  description: string;
  sections: TemplateSection[];
  cta: string;
  seoPoint: string;
  caution: string;
}

const templates: PageTemplate[] = [
  {
    id: "homepage",
    title: "홈페이지 템플릿",
    description: "첫 방문자에게 지역·거래 전문성, 신뢰, 상담 경로를 모두 전달하는 랜딩 페이지",
    sections: [
      { name: "Hero (지역+거래 전문성)", purpose: "핵심 메시지 + CTA", badge: "required" },
      { name: "Quick Info Bar", purpose: "전화/카카오/위치/상담시간", badge: "required" },
      { name: "지역/거래유형 바로가기", purpose: "방문 목적별 빠른 진입", badge: "recommended" },
      { name: "대표 매물/서비스", purpose: "주력 매물 노출", badge: "conditional" },
      { name: "대표/사무소 소개", purpose: "신뢰 형성", badge: "required" },
      { name: "후기/신뢰 요소", purpose: "사회적 증거", badge: "recommended" },
      { name: "상담 CTA 블록", purpose: "전환 유도", badge: "required" },
      { name: "FAQ", purpose: "의문 해소", badge: "recommended" },
      { name: "Footer", purpose: "사업자 정보, 면책", badge: "required" },
    ],
    cta: "전화상담 / 카카오문의 / 매물보기",
    seoPoint: "H1에 지역명+서비스 포함. 메타 디스크립션에 지역+거래유형.",
    caution: "히어로에서 지역·거래 전문 분야가 명확하지 않으면 즉시 이탈",
  },
  {
    id: "listing-list",
    title: "매물 리스트 페이지 템플릿",
    description: "매물을 조건별로 탐색하고 상세 페이지로 진입하는 허브 페이지",
    sections: [
      { name: "페이지 제목 + 지역/유형 표시", purpose: "현재 위치 인지", badge: "required" },
      { name: "필터/정렬 바", purpose: "조건 탐색", badge: "recommended" },
      { name: "매물 카드 그리드", purpose: "매물 목록 노출", badge: "required" },
      { name: "페이지네이션/더보기", purpose: "추가 매물 탐색", badge: "required" },
      { name: "상담 CTA", purpose: "원하는 매물이 없을 때 전환", badge: "required" },
    ],
    cta: "상담문의 / 전화상담 / 매물접수",
    seoPoint: "지역+매물유형 조합 제목. 각 매물에 구조화 데이터.",
    caution: "오래된 매물이 상단에 노출되면 허위매물 의심. 날짜 표시 필수.",
  },
  {
    id: "listing-detail",
    title: "매물 상세 페이지 템플릿",
    description: "개별 매물의 상세 정보를 보여주고 상담으로 전환하는 페이지",
    sections: [
      { name: "매물 이미지 갤러리", purpose: "시각 정보 제공", badge: "required" },
      { name: "가격/면적/층/거래유형 요약", purpose: "핵심 정보 빠른 확인", badge: "required" },
      { name: "위치/교통/생활권", purpose: "입지 정보", badge: "recommended" },
      { name: "상세 설명", purpose: "매물 특징 설명", badge: "required" },
      { name: "상담 CTA", purpose: "관심 매물 전환", badge: "required" },
      { name: "유사 매물 추천", purpose: "이탈 방지", badge: "optional" },
    ],
    cta: "이 매물 상담하기 / 전화문의",
    seoPoint: "매물별 고유 제목. 이미지 alt에 매물 정보.",
    caution: "허위 가격, 과장 면적 표시 절대 금지. '예시 데이터' 표시 필수.",
  },
  {
    id: "about",
    title: "대표/사무소 소개 페이지 템플릿",
    description: "대표 공인중개사와 사무소의 신뢰 정보를 집중 전달하는 페이지",
    sections: [
      { name: "대표 프로필 (사진+경력+자격)", purpose: "인물 신뢰", badge: "required" },
      { name: "사무소 등록정보", purpose: "법적 신뢰", badge: "required" },
      { name: "전문 분야/지역", purpose: "전문성 전달", badge: "required" },
      { name: "운영 철학/인사말", purpose: "브랜드 톤", badge: "optional" },
      { name: "사무소 사진", purpose: "실재감", badge: "recommended" },
      { name: "상담 CTA", purpose: "전환", badge: "required" },
    ],
    cta: "전화상담 / 방문예약",
    seoPoint: "H1에 '대표 공인중개사' + 이름 포함.",
    caution: "허위 경력, 허위 자격, 허위 수상 절대 금지.",
  },
  {
    id: "contact",
    title: "상담/문의 페이지 템플릿",
    description: "전화·카카오·폼을 통한 상담 전환 집중 페이지",
    sections: [
      { name: "상담 안내 (시간/채널)", purpose: "상담 가능 여부 확인", badge: "required" },
      { name: "전화/카카오 바로가기", purpose: "즉시 전환", badge: "required" },
      { name: "문의 폼 (최소 필드)", purpose: "비실시간 전환", badge: "required" },
      { name: "대표 프로필 요약", purpose: "신뢰 보강", badge: "recommended" },
      { name: "FAQ", purpose: "의문 해소", badge: "optional" },
    ],
    cta: "전화하기 / 카카오문의 / 폼 제출",
    seoPoint: "H1에 '상담' + 지역명.",
    caution: "폼 필드 5개 초과 금지. 개인정보 과다 수집 금지.",
  },
];

const tocItems = [
  ...templates.map((t) => ({ id: t.id, title: t.title })),
  { id: "additional-templates", title: "추가 템플릿 (간략)" },
];

const PageTemplates = () => {
  return (
    <>
      <PageHeader
        title="페이지 템플릿 모음"
        description="실제 고객사 부동산 사이트 제작에 바로 사용할 수 있는 페이지별 섹션 구조, CTA, SEO 포인트를 정리합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        {templates.map((tmpl) => (
          <SectionBlock key={tmpl.title} id={tmpl.id} title={tmpl.title} subtitle={tmpl.description}>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg divide-y divide-border">
                {tmpl.sections.map((sec, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3">
                    <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium text-foreground text-sm flex-1">{sec.name}</span>
                    <span className="text-sm text-muted-foreground flex-1 hidden md:block">{sec.purpose}</span>
                    <StatusBadge variant={sec.badge} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-muted rounded-md">
                  <strong className="text-foreground">CTA:</strong>
                  <p className="text-muted-foreground mt-0.5">{tmpl.cta}</p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <strong className="text-foreground">SEO:</strong>
                  <p className="text-muted-foreground mt-0.5">{tmpl.seoPoint}</p>
                </div>
                <div className="p-3 bg-destructive/5 border border-destructive/15 rounded-md">
                  <strong className="text-foreground">주의:</strong>
                  <p className="text-muted-foreground mt-0.5">{tmpl.caution}</p>
                </div>
              </div>
            </div>
          </SectionBlock>
        ))}

        <SectionBlock id="additional-templates" title="추가 템플릿 (간략)" subtitle="필요 시 확장 가능한 페이지 구조">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "지역/거래유형 소개", desc: "특정 지역의 생활권·시세·거래 동향 정보 페이지" },
              { title: "오시는 길/지점", desc: "지도·주차·대중교통 안내. 다지점 시 지점 선택 UI." },
              { title: "매물 접수", desc: "매도자/임대인이 매물을 내놓기 위한 접수 폼 페이지" },
              { title: "후기/고객 이야기", desc: "실제 거래 후기 목록. 허위 후기 생성 금지." },
              { title: "블로그/지역 정보", desc: "시세 분석, 지역 뉴스, 부동산 정보 콘텐츠" },
              { title: "분양/신축 상담", desc: "특정 분양 단지 정보와 상담 신청 페이지" },
            ].map((t) => (
              <div key={t.title} className="guide-card">
                <h4 className="font-semibold text-foreground text-sm mb-1">{t.title}</h4>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/page-templates" />
      </div>
    </>
  );
};

export default PageTemplates;
