import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { useBrief } from "@/hooks/use-brief";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const ImplementationRules = () => {
  const { brief, error } = useBrief();

  if (error || !brief) {
    return (
      <>
        <PageHeader title="Implementation Rules 엔진" description="Client Brief 기반으로 제작 규칙과 우선순위를 자동 도출합니다." />
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

  const isMultiBranch = brief.branchType === "multi";
  const hasRep = brief.hasRepresentativeInfo;
  const hasListings = brief.hasListings;
  const hasReviews = brief.hasReviews;
  const hasRegional = brief.hasRegionalContent;
  const hasPhotos = brief.hasOfficePhotos;
  const isBunyang = brief.propertyCategories.includes("분양");

  // Site type classification
  let siteType = "상담전환형";
  if (isBunyang) siteType = "분양상담형";
  else if (isMultiBranch) siteType = "다지점형";
  else if (hasListings) siteType = "매물탐색형";
  else if (hasRep) siteType = "대표신뢰형";

  // Core blocks that must always stay
  const coreBlocks = [
    "히어로 (지역+거래 전문성)",
    "Quick Info Bar (전화/상담시간/주소)",
    "상담 CTA 블록",
    "사무소 등록정보",
    "모바일 하단 고정 CTA",
    "푸터 (사업자 정보, 면책)",
  ];

  // Removable blocks based on conditions
  const removableBlocks: { name: string; condition: string }[] = [];
  if (!hasListings) removableBlocks.push({ name: "매물 리스트/상세 페이지", condition: "매물 DB 미보유" });
  if (!hasReviews) removableBlocks.push({ name: "후기 섹션/페이지", condition: "후기 미보유" });
  if (!hasRegional) removableBlocks.push({ name: "지역 정보/블로그", condition: "지역 콘텐츠 미보유" });
  if (!hasPhotos) removableBlocks.push({ name: "사무소 사진 갤러리", condition: "사진 미보유 → 지도로 대체" });
  if (!hasRep) removableBlocks.push({ name: "대표 프로필 카드", condition: "대표 정보 미보유 → 사무소 소개로 대체" });

  // Configurations
  const minConfig = ["홈 (원페이지)", "상담 CTA", "사무소 정보", "모바일 하단 CTA"];
  const stdConfig = ["홈", "대표/사무소 소개", "상담/문의", "오시는 길"];
  const fullConfig = ["홈", "매물 리스트", "매물 상세", "대표 소개", "오시는 길", "상담/문의", "매물 접수", "후기", "블로그", "분양상담"];

  if (hasListings) stdConfig.splice(1, 0, "매물 리스트");

  return (
    <>
      <PageHeader title="Implementation Rules 엔진" description={`${brief.brandName || brief.businessName}의 브리프 기반 제작 규칙입니다.`} badges={[{ label: siteType, variant: "info" }]} />
      <div className="guide-container">
        <SectionBlock title="사이트 유형 판별 결과">
          <div className="guide-card">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge variant="info">{siteType}</StatusBadge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground"><strong className="text-foreground">지점 유형:</strong> {isMultiBranch ? "다지점" : "단일 지점"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">대표 정보:</strong> {hasRep ? "보유" : "미보유"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">매물 DB:</strong> {hasListings ? "보유" : "미보유"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground"><strong className="text-foreground">후기:</strong> {hasReviews ? "보유" : "미보유"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">지역 콘텐츠:</strong> {hasRegional ? "보유" : "미보유"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">사무소 사진:</strong> {hasPhotos ? "보유" : "미보유"}</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="조건부 분기 규칙" subtitle="브리프 입력에 따라 달라지는 규칙">
          <div className="space-y-3">
            {isMultiBranch && (
              <div className="guide-card border-info/30">
                <StatusBadge variant="conditional">다지점</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2">홈에서 지점 선택 UI 필요. 각 지점별 연락처/주소/담당자 표시. 지점별 매물 분리 고려.</p>
              </div>
            )}
            {!hasRep && (
              <div className="guide-card border-warning/30">
                <StatusBadge variant="review">대표 정보 미보유</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2">대표 프로필 카드 대신 사무소 소개 블록 사용. 등록정보 중심 신뢰 구축.</p>
              </div>
            )}
            {!hasListings && (
              <div className="guide-card border-warning/30">
                <StatusBadge variant="review">매물 DB 미보유</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2">매물 리스트/상세 페이지 제거. 서비스 안내 + 상담 CTA 중심 구조. "매물 문의" CTA로 대체.</p>
              </div>
            )}
            {!hasReviews && (
              <div className="guide-card">
                <StatusBadge variant="info">후기 미보유</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2">후기 섹션 생략. 대신 거래 프로세스 안내 또는 FAQ 강화로 신뢰 보강.</p>
              </div>
            )}
            {isBunyang && (
              <div className="guide-card border-info/30">
                <StatusBadge variant="conditional">분양 포함</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2">분양 상담 전용 페이지 추가. 분양 일정/평형/가격 안내 섹션 필요. 모델하우스 안내 CTA.</p>
              </div>
            )}
          </div>
        </SectionBlock>

        <SectionBlock title="절대 유지 블록" subtitle="어떤 구성에서도 제거 불가">
          <div className="space-y-1">
            {coreBlocks.map((block) => (
              <div key={block} className="flex items-center gap-2 p-2 bg-primary/5 border border-primary/15 rounded-md">
                <StatusBadge variant="required" />
                <span className="text-sm text-foreground">{block}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="제거 가능한 블록" subtitle="자산 부족 시 생략 가능">
          {removableBlocks.length > 0 ? (
            <div className="space-y-1">
              {removableBlocks.map((block) => (
                <div key={block.name} className="flex items-center justify-between gap-2 p-2 bg-muted rounded-md">
                  <span className="text-sm text-foreground">{block.name}</span>
                  <span className="text-xs text-muted-foreground">{block.condition}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">모든 자산을 보유하고 있어 제거 필요 블록이 없습니다.</p>
          )}
        </SectionBlock>

        <SectionBlock title="예산별 구성" subtitle="최소 / 표준 / 풀 구성">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2">🔹 최소 구성</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">{minConfig.map(p => <li key={p}>• {p}</li>)}</ul>
            </div>
            <div className="guide-card border-primary/20">
              <h4 className="font-semibold text-foreground text-sm mb-2">🔷 표준 구성</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">{stdConfig.map(p => <li key={p}>• {p}</li>)}</ul>
            </div>
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2">🔶 풀 구성</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">{fullConfig.map(p => <li key={p}>• {p}</li>)}</ul>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="즉시 제작 지침">
          <div className="guide-card">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. <strong className="text-foreground">디자인 시스템:</strong> 딥 네이비 + 화이트 + 틸 기본. 브랜드 톤 "{brief.brandTone || "미지정"}" 반영.</p>
              <p>2. <strong className="text-foreground">히어로:</strong> "{brief.primaryRegion} {brief.transactionTypes.join("·")} 전문" 메시지 중심.</p>
              <p>3. <strong className="text-foreground">CTA 우선순위:</strong> {brief.primaryCTA.join(" > ") || "미지정"}</p>
              <p>4. <strong className="text-foreground">모바일 하단 CTA:</strong> {brief.consultationChannels.slice(0, 3).join(" / ") || "전화 / 카카오"}</p>
              <p>5. <strong className="text-foreground">금지 표현:</strong> {brief.prohibitedExpressions || "미지정"}</p>
              <p>6. <strong className="text-foreground">신뢰 요소:</strong> {[
                brief.hasRegistrationInfo && "등록정보",
                brief.hasRepresentativeInfo && "대표 프로필",
                brief.hasReviews && "후기",
                brief.hasOfficePhotos && "사무소 사진",
              ].filter(Boolean).join(", ") || "등록정보만"}</p>
            </div>
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/implementation-rules" />
      </div>
    </>
  );
};

export default ImplementationRules;
