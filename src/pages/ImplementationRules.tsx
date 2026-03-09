import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { useBrief } from "@/hooks/use-brief";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import {
  determineSiteType,
  getRemovableBlocks,
  getBudgetTiers,
  getProofStatuses,
  CORE_BLOCKS,
  classifyPages,
} from "@/lib/brief-analysis";

const PROOF_ALTERNATIVES: Record<string, string> = {
  "공인중개사 등록정보": "사업자등록정보로 대체",
  "대표 공인중개사 정보": "사무소 소개 블록으로 대체",
  "대표 매물/주력 매물": "서비스 안내 + 상담 CTA 중심 구성",
  "고객 후기": "거래 프로세스 안내 또는 FAQ 강화",
  "지역 콘텐츠": "생략 가능 (SEO 약화 감수)",
  "사무소/시설 사진": "지도 캡처 또는 로드뷰로 대체",
};

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

  const siteType = determineSiteType(brief);
  const removableBlocks = getRemovableBlocks(brief);
  const budgetTiers = getBudgetTiers(brief);
  const proofStatuses = getProofStatuses(brief);
  const classified = classifyPages(brief);
  const biz = brief.brandName || brief.businessName;

  const isMultiBranch = brief.branchType === "multi";
  const hasRep = brief.hasRepresentativeInfo;
  const hasListings = brief.hasListings;
  const hasReviews = brief.hasReviews;
  const hasRegional = brief.hasRegionalContent;
  const isBunyang = brief.propertyCategories.includes("분양");

  const requiredPages = classified.filter((p) => p.classification === "필수").map((p) => p.name);
  const deficientProofs = proofStatuses.filter((p) => p.status === "부족");

  return (
    <>
      <PageHeader title="Implementation Rules 엔진" description={`${biz}의 브리프 기반 제작 규칙입니다.`} badges={[{ label: siteType.type, variant: "info" }]} />
      <div className="guide-container">
        <SummaryCard items={[
          `사이트 유형: ${siteType.type} (${siteType.reasoning}, 점수 ${siteType.score})`,
          `절대 유지 블록: ${CORE_BLOCKS.length}개`,
          `제거 가능 블록: ${removableBlocks.length}개`,
          `보유 자산: ${proofStatuses.filter((p) => p.status === "보유").length}/${proofStatuses.length}개`,
        ]} />

        {/* 즉시 제작 지침 카드 */}
        <SectionBlock id="instant-directive" title="즉시 제작 지침" subtitle="복사하여 바로 제작에 사용">
          <div className="guide-card border-primary/20">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. <strong className="text-foreground">사이트 유형:</strong> {siteType.type} ({siteType.reasoning})</p>
              <p>2. <strong className="text-foreground">필수 페이지:</strong> {requiredPages.join(", ")}</p>
              <p>3. <strong className="text-foreground">디자인 시스템:</strong> 딥 네이비 + 화이트 + 틸 기본. 브랜드 톤 "{brief.brandTone || "미지정"}" 반영.</p>
              <p>4. <strong className="text-foreground">히어로:</strong> "{brief.primaryRegion} {brief.transactionTypes.join("·")} 전문" 메시지 중심.</p>
              <p>5. <strong className="text-foreground">CTA 우선순위:</strong> {brief.primaryCTA.join(" > ") || "미지정"}</p>
              <p>6. <strong className="text-foreground">모바일 하단 CTA:</strong> {brief.consultationChannels.slice(0, 3).join(" / ") || "전화 / 카카오"}</p>
              <p>7. <strong className="text-foreground">절대 유지 블록:</strong> {CORE_BLOCKS.join(", ")}</p>
              <p>8. <strong className="text-foreground">금지 표현:</strong> {brief.prohibitedExpressions || "미지정"}</p>
              <p>9. <strong className="text-foreground">신뢰 요소:</strong> {proofStatuses.filter((p) => p.status === "보유").map((p) => p.name).join(", ") || "등록정보만"}</p>
              <p>10. <strong className="text-foreground">부족 자산 대체:</strong> {removableBlocks.map((b) => b.condition).join("; ") || "없음"}</p>
            </div>
          </div>
          <div className="mt-3">
            <CopyBlock label="즉시 제작 지침 (복사)" content={`사이트 유형: ${siteType.type} (${siteType.reasoning})
필수 페이지: ${requiredPages.join(", ")}
디자인: 딥 네이비+화이트+틸, ${brief.brandTone || "신뢰·전문"} 톤
히어로: ${brief.primaryRegion} ${brief.transactionTypes.join("·")} 전문
핵심 CTA: ${brief.primaryCTA.join(" > ") || "전화상담 > 카카오문의"}
모바일 CTA: ${brief.consultationChannels.slice(0, 3).join(" / ") || "전화 / 카카오"}
절대 유지: ${CORE_BLOCKS.join(", ")}
금지: ${brief.prohibitedExpressions || "없음"}
보유 자산: ${proofStatuses.filter((p) => p.status === "보유").map((p) => p.name).join(", ") || "없음"}`} />
          </div>
        </SectionBlock>

        {/* Site type */}
        <SectionBlock id="site-type" title="사이트 유형 판별 결과">
          <div className="guide-card">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge variant="info">{siteType.type}</StatusBadge>
              <span className="text-sm text-muted-foreground">점수 {siteType.score} — {siteType.reasoning}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground"><strong className="text-foreground">지점 유형:</strong> {isMultiBranch ? "다지점" : "단일 지점"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">대표 정보:</strong> {hasRep ? "보유" : "미보유"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground"><strong className="text-foreground">매물 DB:</strong> {hasListings ? "보유" : "미보유"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">후기:</strong> {hasReviews ? "보유" : "미보유"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground"><strong className="text-foreground">지역 콘텐츠:</strong> {hasRegional ? "보유" : "미보유"}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">상담 채널:</strong> {brief.consultationChannels.join(", ") || "미지정"}</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* Consultation channel branching */}
        {brief.consultationChannels.length > 0 && (
          <SectionBlock id="channel-branching" title="상담 채널 CTA 분기" subtitle="채널별 CTA 배치 규칙">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {brief.consultationChannels.map((channel) => (
                <div key={channel} className="p-3 bg-muted rounded-md">
                  <strong className="text-foreground text-sm">{channel}</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    {channel === "전화" && "모바일 하단 CTA 첫번째 배치. tel: 링크. 상담시간 표시 필수."}
                    {channel === "카카오톡" && "모바일 CTA 두번째. 카카오톡 채널 연결. 옐로아이디 필요."}
                    {channel === "네이버톡톡" && "네이버톡톡 채널 연결. 네이버 유입 사용자 대상."}
                    {channel === "문의폼" && "상담 페이지 메인 CTA. 필드 5개 이하. 개인정보 최소화."}
                    {channel === "방문상담" && "오시는 길 페이지 CTA. 방문 예약 폼 또는 전화 연결."}
                    {channel === "이메일" && "푸터 또는 상담 페이지. 스팸 방지를 위해 이미지 처리 고려."}
                  </p>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Conditional branching */}
        <SectionBlock id="branching" title="조건부 분기 규칙" subtitle="브리프 입력에 따라 달라지는 규칙">
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
            {!hasRegional && (
              <div className="guide-card">
                <StatusBadge variant="info">지역 콘텐츠 미보유</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2">지역 소개/시세 페이지 생략. SEO 효과 약화 감수. 히어로와 소개 페이지에서 지역 전문성을 텍스트로 보완.</p>
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

        {/* Core blocks */}
        <SectionBlock id="core-blocks" title="절대 유지 블록" subtitle="어떤 구성에서도 제거 불가">
          <div className="space-y-1">
            {CORE_BLOCKS.map((block) => (
              <div key={block} className="flex items-center gap-2 p-2 bg-primary/5 border border-primary/15 rounded-md">
                <StatusBadge variant="required" />
                <span className="text-sm text-foreground">{block}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Removable blocks */}
        <SectionBlock id="removable-blocks" title="제거 가능한 블록" subtitle="자산 부족 시 생략 가능">
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

        {/* Proof status with alternatives */}
        <SectionBlock id="proof-status" title="Proof 상태 및 대체안" subtitle="브리프 기반 증빙 자산 현황">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {proofStatuses.map((ps) => (
              <div key={ps.name} className="p-3 bg-muted rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{ps.name}</span>
                  <StatusBadge variant={ps.status === "보유" ? "recommended" : "review"}>{ps.status}</StatusBadge>
                </div>
                {ps.status === "부족" && PROOF_ALTERNATIVES[ps.name] && (
                  <p className="text-xs text-muted-foreground mt-1">대체안: {PROOF_ALTERNATIVES[ps.name]}</p>
                )}
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Budget tiers */}
        <SectionBlock id="budget-tiers" title="예산별 구성" subtitle="최소 / 표준 / 풀 구성">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetTiers.map((tier) => (
              <div key={tier.name} className={`guide-card ${tier.name === "standard" ? "border-primary/20" : ""}`}>
                <h4 className="font-semibold text-foreground text-sm mb-2">
                  {tier.name === "minimal" ? "🔹" : tier.name === "standard" ? "🔷" : "🔶"} {tier.label}
                </h4>
                <div className="mb-2">
                  <p className="text-xs font-medium text-foreground mb-1">페이지</p>
                  <ul className="space-y-0.5 text-sm text-muted-foreground">{tier.pages.map((p) => <li key={p}>• {p}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground mb-1">섹션</p>
                  <ul className="space-y-0.5 text-xs text-muted-foreground">{tier.sections.map((s) => <li key={s}>• {s}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/implementation-rules" />
      </div>
    </>
  );
};

export default ImplementationRules;
