import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { useBrief } from "@/hooks/use-brief";
import { Link } from "react-router-dom";
import { AlertTriangle, Copy, Check } from "lucide-react";
import { useState } from "react";

const determineSiteType = (brief: { hasListings: boolean; hasRepresentativeInfo: boolean; propertyCategories: string[]; branchType: string }) => {
  if (brief.propertyCategories.includes("분양")) return "분양상담형";
  if (brief.branchType === "multi") return "다지점형";
  if (brief.hasListings) return "매물탐색형";
  if (brief.hasRepresentativeInfo) return "대표신뢰형";
  return "상담전환형";
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="p-1 rounded hover:bg-muted" aria-label="복사">
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
    </button>
  );
};

const SiteBlueprint = () => {
  const { brief, error } = useBrief();

  if (error || !brief) {
    return (
      <>
        <PageHeader title="Site Blueprint 생성기" description="Client Brief를 기반으로 공개용 부동산 사이트 구조를 자동 제안합니다." />
        <div className="guide-container">
          <div className="guide-card flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">{error || "Client Brief가 아직 작성되지 않았습니다."}</p>
              <Link to="/client-brief" className="text-sm text-primary hover:underline mt-1 inline-block">Client Brief 작성하기 →</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const siteType = determineSiteType(brief);
  const region = brief.primaryRegion || "[지역]";
  const biz = brief.brandName || brief.businessName || "[사무소명]";

  const requiredPages = ["홈", "상담문의"];
  const recommendedPages = ["대표소개", "오시는길"];
  const conditionalPages: string[] = [];
  if (brief.hasListings) { requiredPages.push("매물리스트"); conditionalPages.push("매물상세"); }
  if (brief.hasReviews) conditionalPages.push("후기");
  if (brief.hasRegionalContent) conditionalPages.push("블로그/지역정보");
  if (brief.branchType === "multi") requiredPages.push("지점안내");
  if (brief.propertyCategories.includes("분양")) conditionalPages.push("분양상담");

  const heroText = `${region} ${brief.transactionTypes.join("·")} 전문 — ${biz}`;
  const metaTitle = `${region} ${brief.propertyTypes.join("/")} ${brief.transactionTypes[0] || "중개"} 전문 — ${biz}`;
  const metaDesc = `${region} ${brief.propertyTypes.join(", ")} ${brief.transactionTypes.join(", ")} 전문 중개. ${brief.consultationChannels.join(", ")} 상담 가능. ${brief.phone}`;

  const promptText = `다음 조건으로 부동산 공인중개사 홈페이지를 만들어주세요:
- 사이트 유형: ${siteType}
- 사무소명: ${biz}
- 지역: ${region}
- 부동산 유형: ${brief.propertyTypes.join(", ")}
- 거래 유형: ${brief.transactionTypes.join(", ")}
- 지점: ${brief.branchType === "single" ? "단일" : "다지점"}
- 핵심 CTA: ${brief.primaryCTA.join(", ")}
- 브랜드 톤: ${brief.brandTone}
- 필수 페이지: ${[...requiredPages, ...recommendedPages].join(", ")}
- 전화: ${brief.phone}
- 주소: ${brief.address}
- 상담시간: ${brief.consultationHours}
${brief.prohibitedExpressions ? `- 금지 표현: ${brief.prohibitedExpressions}` : ""}

디자인 방향: 신뢰감, 지역 전문성, 모바일 우선, 상담 전환 중심. 딥 네이비+화이트+틸 컬러. 과장/투자광고 톤 금지.`;

  const homeStructure = [
    { name: "Hero", purpose: `${region} ${brief.transactionTypes.join("·")} 전문 전달 + CTA`, badge: "required" as const },
    { name: "Quick Info Bar", purpose: `${brief.phone} / ${brief.consultationChannels.join(" / ")}`, badge: "required" as const },
    { name: "지역/거래유형 바로가기", purpose: "방문 목적별 진입", badge: "recommended" as const },
    ...(brief.hasListings ? [{ name: "대표 매물", purpose: "주력 매물 노출", badge: "required" as const }] : []),
    ...(brief.hasRepresentativeInfo ? [{ name: "대표 공인중개사 소개", purpose: "인물 신뢰", badge: "required" as const }] : []),
    { name: "사무소 정보/등록정보", purpose: "법적 신뢰", badge: "required" as const },
    ...(brief.hasReviews ? [{ name: "고객 후기", purpose: "사회적 증거", badge: "recommended" as const }] : []),
    { name: "상담 CTA 블록", purpose: "전환 유도", badge: "required" as const },
    { name: "FAQ", purpose: "의문 해소", badge: "recommended" as const },
    { name: "Footer", purpose: "사업자 정보, 면책", badge: "required" as const },
  ];

  return (
    <>
      <PageHeader title="Site Blueprint 생성기" description={`${biz}의 브리프를 기반으로 생성된 공개용 사이트 청사진입니다.`} badges={[{ label: siteType, variant: "info" }]} />
      <div className="guide-container">
        <SectionBlock title="추천 사이트 유형">
          <div className="guide-card">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge variant="info">{siteType}</StatusBadge>
              <span className="text-sm text-muted-foreground">브리프 기반 자동 판별 결과</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {siteType === "매물탐색형" && "매물 DB를 보유하고 있어 매물 리스트/상세 페이지 중심 구조를 추천합니다."}
              {siteType === "대표신뢰형" && "대표 공인중개사 정보가 있어 인물 중심 신뢰 구조를 추천합니다."}
              {siteType === "상담전환형" && "매물 DB 없이 상담 CTA 중심 구조를 추천합니다."}
              {siteType === "분양상담형" && "분양 카테고리가 포함되어 분양 상담 중심 구조를 추천합니다."}
              {siteType === "다지점형" && "다지점 운영에 맞는 지점 선택형 구조를 추천합니다."}
            </p>
          </div>
        </SectionBlock>

        <SectionBlock title="페이지 구성">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2"><StatusBadge variant="required" /> 필수 페이지</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">{requiredPages.map(p => <li key={p}>• {p}</li>)}</ul>
            </div>
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2"><StatusBadge variant="recommended" /> 권장 페이지</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">{recommendedPages.map(p => <li key={p}>• {p}</li>)}</ul>
            </div>
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2"><StatusBadge variant="conditional" /> 조건부 페이지</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">{conditionalPages.length > 0 ? conditionalPages.map(p => <li key={p}>• {p}</li>) : <li>없음</li>}</ul>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="홈페이지 구조">
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {homeStructure.map((sec, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-foreground text-sm flex-1">{sec.name}</span>
                <span className="text-sm text-muted-foreground flex-1 hidden md:block">{sec.purpose}</span>
                <StatusBadge variant={sec.badge} />
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="히어로 카피 제안">
          <div className="flex items-start gap-2">
            <div className="flex-1"><CopyBlock content={heroText} label="히어로 헤드라인" /></div>
          </div>
        </SectionBlock>

        <SectionBlock title="메타 타이틀/디스크립션">
          <CopyBlock label="메타 타이틀" content={metaTitle} />
          <div className="mt-3"><CopyBlock label="메타 디스크립션" content={metaDesc} /></div>
        </SectionBlock>

        <SectionBlock title="JSON-LD 추천">
          <CopyBlock label="추천 스키마" content={`RealEstateAgent, LocalBusiness, FAQPage, BreadcrumbList${brief.hasReviews ? ", Review" : ""}${brief.hasListings ? ", Product (RealEstateListing)" : ""}`} />
        </SectionBlock>

        <SectionBlock title="Lovable용 사이트 생성 프롬프트">
          <CopyBlock label="프롬프트 (복사하여 사용)" content={promptText} />
        </SectionBlock>

        <PrevNextNav currentPath="/site-blueprint" />
      </div>
    </>
  );
};

export default SiteBlueprint;
