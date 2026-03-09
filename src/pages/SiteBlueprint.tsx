import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge, type BadgeVariant } from "@/components/guide/StatusBadge";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { useBrief } from "@/hooks/use-brief";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import {
  determineSiteType,
  classifyPages,
} from "@/lib/brief-analysis";
import {
  getAllBlueprints,
  generateLovablePrompt,
  type BlueprintPageOutput,
} from "@/lib/blueprint-engine";

const BlueprintCard = ({ output }: { output: BlueprintPageOutput }) => (
  <div className="guide-card space-y-4">
    <div>
      <h3 className="text-lg font-bold text-foreground mb-1">{output.pageTitle}</h3>
      <p className="text-sm text-muted-foreground">{output.pageDescription}</p>
    </div>

    {/* Sections */}
    <div className="bg-card border border-border rounded-lg divide-y divide-border">
      {output.sections.map((sec, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-2.5">
          <span className="text-xs font-mono text-muted-foreground w-5">{String(i + 1).padStart(2, "0")}</span>
          <span className="font-medium text-foreground text-sm flex-1">{sec.name}</span>
          <span className="text-xs text-muted-foreground flex-1 hidden md:block">{sec.purpose}</span>
          <StatusBadge variant={sec.badge} />
        </div>
      ))}
    </div>

    {/* Details grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
      <div className="p-3 bg-muted rounded-md">
        <strong className="text-foreground block mb-1">핵심 CTA</strong>
        <span className="text-muted-foreground">{output.primaryCTA.join(", ")}</span>
      </div>
      <div className="p-3 bg-muted rounded-md">
        <strong className="text-foreground block mb-1">보조 CTA</strong>
        <span className="text-muted-foreground">{output.secondaryCTA.join(", ") || "없음"}</span>
      </div>
      <div className="p-3 bg-muted rounded-md">
        <strong className="text-foreground block mb-1">Proof 요소</strong>
        <span className="text-muted-foreground">{output.proofElements.join(", ")}</span>
      </div>
      <div className="p-3 bg-muted rounded-md">
        <strong className="text-foreground block mb-1">모바일 규칙</strong>
        <span className="text-muted-foreground">{output.mobileRules.join(", ")}</span>
      </div>
      <div className="p-3 bg-muted rounded-md">
        <strong className="text-foreground block mb-1">SEO 포인트</strong>
        <span className="text-muted-foreground">{output.seoPoints.join(", ")}</span>
      </div>
      <div className="p-3 bg-muted rounded-md">
        <strong className="text-foreground block mb-1">JSON-LD</strong>
        <span className="text-muted-foreground">{output.jsonLdTypes.join(", ")}</span>
      </div>
    </div>

    {output.fallbacks.length > 0 && (
      <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
        <strong className="text-foreground text-xs block mb-1">자산 부족 시 대체안</strong>
        {output.fallbacks.map((f, i) => <p key={i} className="text-xs text-muted-foreground">{f}</p>)}
      </div>
    )}

    {output.typeVariants.length > 0 && (
      <div className="p-3 bg-info/10 border border-info/20 rounded-md">
        <strong className="text-foreground text-xs block mb-1">부동산 유형별 변경점</strong>
        {output.typeVariants.map((v, i) => <p key={i} className="text-xs text-muted-foreground">{v}</p>)}
      </div>
    )}

    {output.reviewClaims.length > 0 && (
      <div className="p-3 bg-destructive/5 border border-destructive/15 rounded-md">
        <strong className="text-foreground text-xs block mb-1">검토 필요</strong>
        {output.reviewClaims.map((c, i) => <p key={i} className="text-xs text-muted-foreground">{c}</p>)}
      </div>
    )}

    <CopyBlock label="메타 타이틀" content={output.metaTitle} />
    <CopyBlock label="메타 디스크립션" content={output.metaDescription} />
  </div>
);

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
  const biz = brief.brandName || brief.businessName || "[사무소명]";
  const classified = classifyPages(brief);
  const blueprints = getAllBlueprints(brief);
  const prompt = generateLovablePrompt(brief);

  const requiredPages = classified.filter((p) => p.classification === "필수");
  const recommendedPages = classified.filter((p) => p.classification === "권장");
  const conditionalPages = classified.filter((p) => p.classification === "조건부");
  const prohibitedPages = classified.filter((p) => p.classification === "금지");

  return (
    <>
      <PageHeader title="Site Blueprint 생성기" description={`${biz}의 브리프를 기반으로 생성된 공개용 사이트 청사진입니다.`} badges={[{ label: siteType.type, variant: "info" }]} />
      <div className="guide-container">
        <SummaryCard items={[
          `추천 사이트 유형: ${siteType.type} — ${siteType.reasoning}`,
          `필수 페이지 ${requiredPages.length}개, 권장 ${recommendedPages.length}개, 조건부 ${conditionalPages.length}개`,
          `총 ${blueprints.length}개 페이지 청사진 생성됨`,
        ]} />

        {/* Site type */}
        <SectionBlock id="site-type" title="추천 사이트 유형">
          <div className="guide-card">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge variant="info">{siteType.type}</StatusBadge>
              <span className="text-sm text-muted-foreground">점수: {siteType.score} — {siteType.reasoning}</span>
            </div>
          </div>
        </SectionBlock>

        {/* Page classification */}
        <SectionBlock id="page-classification" title="페이지 분류">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "필수", items: requiredPages, badge: "required" as BadgeVariant },
              { label: "권장", items: recommendedPages, badge: "recommended" as BadgeVariant },
              { label: "조건부", items: conditionalPages, badge: "conditional" as BadgeVariant },
              { label: "금지", items: prohibitedPages, badge: "prohibited" as BadgeVariant },
            ].map((group) => (
              <div key={group.label} className="guide-card">
                <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2"><StatusBadge variant={group.badge} /> {group.label} 페이지</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {group.items.length > 0 ? group.items.map((p) => (
                    <li key={p.name} className="flex items-start gap-1">
                      <span>•</span>
                      <div>
                        <span className="text-foreground">{p.name}</span>
                        <span className="text-xs block">{p.reason}</span>
                      </div>
                    </li>
                  )) : <li>없음</li>}
                </ul>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Page blueprints */}
        {blueprints.map((bp, i) => (
          <SectionBlock key={i} id={`blueprint-${i}`} title={`${bp.pageTitle} 구조`}>
            <BlueprintCard output={bp} />
          </SectionBlock>
        ))}

        {/* Lovable prompt */}
        <SectionBlock id="lovable-prompt" title="Lovable용 사이트 생성 프롬프트">
          <CopyBlock label="프롬프트 (복사하여 사용)" content={prompt} />
        </SectionBlock>

        <PrevNextNav currentPath="/site-blueprint" />
      </div>
    </>
  );
};

export default SiteBlueprint;
