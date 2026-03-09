import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge, type BadgeVariant } from "@/components/guide/StatusBadge";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { useBrief } from "@/hooks/use-brief";
import { getProofStatuses } from "@/lib/brief-analysis";
import { Link } from "react-router-dom";
import { AlertTriangle, Info } from "lucide-react";

interface ProofItem {
  name: string;
  level: "강한 증빙" | "보조 증빙";
  pages: string[];
  nearCTA: string;
  fallback: string;
  prohibited: string;
  badge: BadgeVariant;
  briefField?: string;
}

const proofItems: ProofItem[] = [
  { name: "공인중개사 등록정보", level: "강한 증빙", pages: ["홈", "소개", "푸터"], nearCTA: "모든 상담 CTA", fallback: "사업자등록정보", prohibited: "허위 등록번호", badge: "required", briefField: "hasRegistrationInfo" },
  { name: "대표 공인중개사 프로필", level: "강한 증빙", pages: ["홈", "소개"], nearCTA: "전화/방문 CTA", fallback: "사무소 소개로 대체", prohibited: "허위 경력·자격", badge: "required", briefField: "hasRepresentativeInfo" },
  { name: "지역 전문성 (경험·기간)", level: "강한 증빙", pages: ["홈 히어로", "소개"], nearCTA: "상담 CTA", fallback: "지역 콘텐츠로 간접 증명", prohibited: "허위 경력 기간", badge: "recommended", briefField: "hasRegionalContent" },
  { name: "실제 거래 사례", level: "강한 증빙", pages: ["홈", "후기"], nearCTA: "상담 CTA", fallback: "고객 후기", prohibited: "허위 거래 건수·금액", badge: "conditional", briefField: "hasListings" },
  { name: "고객 후기", level: "보조 증빙", pages: ["홈", "후기 페이지"], nearCTA: "문의 CTA", fallback: "거래 사례 또는 생략", prohibited: "허위 후기 작성", badge: "conditional", briefField: "hasReviews" },
  { name: "사무소/지점 사진", level: "보조 증빙", pages: ["소개", "오시는길"], nearCTA: "방문 CTA", fallback: "지도 캡처", prohibited: "타 사무소 사진 도용", badge: "recommended", briefField: "hasOfficePhotos" },
  { name: "상담 프로세스 안내", level: "보조 증빙", pages: ["상담페이지", "홈"], nearCTA: "문의/전화 CTA", fallback: "FAQ로 대체", prohibited: "-", badge: "recommended" },
  { name: "지역 시세/분석 콘텐츠", level: "보조 증빙", pages: ["블로그", "홈"], nearCTA: "상담 CTA", fallback: "생략 가능", prohibited: "허위 시세, 투기 조장", badge: "optional", briefField: "hasRegionalContent" },
  { name: "FAQ/운영 정책", level: "보조 증빙", pages: ["홈 하단", "상담"], nearCTA: "문의 CTA", fallback: "생략 가능", prohibited: "-", badge: "recommended" },
];

const DEFICIENCY_COMBOS: { condition: string; combo: string }[] = [
  { condition: "대표 정보 + 후기 모두 부족", combo: "등록정보 + FAQ + 상담 프로세스 안내로 신뢰 구축" },
  { condition: "대표 정보 + 사무소 사진 부족", combo: "등록정보 + 지도 임베드 + 지역 전문성 텍스트로 대체" },
  { condition: "매물 DB + 지역 콘텐츠 부족", combo: "서비스 안내 + 상담 CTA 중심 원페이지 구성" },
  { condition: "후기 + 지역 콘텐츠 부족", combo: "FAQ 강화 + 등록정보 강조 + 상담 프로세스 안내" },
];

const getStatusFromBrief = (briefField: string | undefined, brief: Record<string, unknown>): "보유" | "부족" | "비공개" | "검토 필요" => {
  if (!briefField) return "검토 필요";
  return brief[briefField] === true ? "보유" : "부족";
};

const statusBadgeVariant = (status: string): BadgeVariant => {
  switch (status) {
    case "보유": return "recommended";
    case "부족": return "review";
    case "비공개": return "info";
    case "검토 필요": return "review";
    default: return "info";
  }
};

const ProofSystem = () => {
  const { brief, error } = useBrief();
  const hasBrief = !error && brief;
  const proofStatuses = hasBrief ? getProofStatuses(brief) : null;
  const ownedCount = proofStatuses?.filter((p) => p.status === "보유").length ?? 0;
  const deficientCount = proofStatuses?.filter((p) => p.status === "부족").length ?? 0;

  // Build page-to-proof mapping
  const pageProofMap: Record<string, string[]> = {};
  proofItems.forEach((item) => {
    item.pages.forEach((page) => {
      if (!pageProofMap[page]) pageProofMap[page] = [];
      pageProofMap[page].push(item.name);
    });
  });

  // Determine applicable deficiency combos
  const applicableCombos = hasBrief ? DEFICIENCY_COMBOS.filter((combo) => {
    if (combo.condition === "대표 정보 + 후기 모두 부족") return !brief.hasRepresentativeInfo && !brief.hasReviews;
    if (combo.condition === "대표 정보 + 사무소 사진 부족") return !brief.hasRepresentativeInfo && !brief.hasOfficePhotos;
    if (combo.condition === "매물 DB + 지역 콘텐츠 부족") return !brief.hasListings && !brief.hasRegionalContent;
    if (combo.condition === "후기 + 지역 콘텐츠 부족") return !brief.hasReviews && !brief.hasRegionalContent;
    return false;
  }) : [];

  return (
    <>
      <PageHeader
        title="신뢰/증빙 시스템"
        description="부동산/공인중개 사이트에서 방문자의 신뢰를 확보하기 위한 증빙 요소의 분류, 배치, 상태 관리 체계입니다."
      />
      <div className="guide-container">
        <TableOfContents items={[
          { id: "catalog", title: "증빙 요소 카탈로그" },
          { id: "proof-placement", title: "페이지별 Proof 배치 규칙" },
          ...(hasBrief && deficientCount > 0 ? [{ id: "deficiency-combos", title: "Proof 부족 시 대체 조합" }] : []),
          { id: "status-system", title: "증빙 상태 체계" },
          { id: "prohibited", title: "허위 생성 금지 원칙" },
        ]} />
        {hasBrief && (
          <SummaryCard items={[
            `보유 자산: ${ownedCount}/${proofStatuses!.length}개`,
            `부족 자산: ${deficientCount}개 — 대체안 적용 필요`,
            "아래 카탈로그에서 각 증빙 요소의 브리프 기반 상태를 확인하세요.",
          ]} />
        )}

        {!hasBrief && (
          <div className="guide-card flex items-start gap-3 mb-8">
            <Info className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground">Client Brief를 작성하면 증빙 요소의 보유 상태가 자동으로 표시됩니다.</p>
              <Link to="/client-brief" className="text-sm text-primary hover:underline mt-1 inline-block">Client Brief 작성하기 →</Link>
            </div>
          </div>
        )}

        <SectionBlock id="catalog" title="증빙 요소 카탈로그" subtitle="각 증빙의 수준, 배치, 대체 방안">
          <div className="space-y-4">
            {proofItems.map((item) => {
              const status = hasBrief ? getStatusFromBrief(item.briefField, brief as unknown as Record<string, unknown>) : null;
              return (
                <div key={item.name} className="guide-card">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <StatusBadge variant={item.badge} />
                      {status && <StatusBadge variant={statusBadgeVariant(status)}>{status}</StatusBadge>}
                    </div>
                    <StatusBadge variant={item.level === "강한 증빙" ? "proof" : "info"}>{item.level}</StatusBadge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground"><strong className="text-foreground">배치 페이지:</strong> {item.pages.join(", ")}</p>
                      <p className="text-muted-foreground"><strong className="text-foreground">CTA 근처:</strong> {item.nearCTA}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground"><strong className="text-foreground">대체 가능:</strong> {item.fallback}</p>
                      <p className="text-muted-foreground"><strong className="text-foreground">금지:</strong> <span className="text-destructive">{item.prohibited}</span></p>
                    </div>
                  </div>
                  {status === "부족" && (
                    <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-xs text-muted-foreground">
                      <strong className="text-foreground">대체안:</strong> {item.fallback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SectionBlock>

        <SectionBlock id="proof-placement" title="페이지별 Proof 배치 규칙" subtitle="각 페이지에 필요한 증빙 요소">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(pageProofMap).map(([page, proofs]) => (
              <div key={page} className="p-3 bg-muted rounded-md">
                <strong className="text-foreground text-sm">{page}</strong>
                <ul className="mt-1 space-y-0.5">
                  {proofs.map((proof) => {
                    const proofItem = proofItems.find((p) => p.name === proof);
                    const status = hasBrief && proofItem?.briefField ? getStatusFromBrief(proofItem.briefField, brief as unknown as Record<string, unknown>) : null;
                    return (
                      <li key={proof} className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>•</span> {proof}
                        {status && (
                          <span className={`text-[10px] px-1 rounded ${status === "보유" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                            {status}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Deficiency alternatives */}
        {hasBrief && deficientCount > 0 && (
          <SectionBlock id="deficiency-combos" title="Proof 부족 시 대체 조합" subtitle="복수 자산 부족 시 권장 대체 전략">
            {applicableCombos.length > 0 ? (
              <div className="space-y-3">
                {applicableCombos.map((combo, i) => (
                  <div key={i} className="guide-card border-warning/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{combo.condition}</p>
                        <p className="text-xs text-muted-foreground mt-1">→ {combo.combo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">부족 자산이 있지만 복합 대체 조합이 필요한 경우는 아닙니다. 개별 대체안을 참고하세요.</p>
            )}
          </SectionBlock>
        )}

        <SectionBlock id="status-system" title="증빙 상태 체계" subtitle="고객사 자산 현황 파악용">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { status: "보유", desc: "자산이 준비되어 있고 즉시 사용 가능", badge: "recommended" as BadgeVariant },
              { status: "부족", desc: "자산이 없거나 품질이 낮음. 대체안 필요", badge: "review" as BadgeVariant },
              { status: "비공개", desc: "자산은 있으나 공개하지 않기로 결정", badge: "info" as BadgeVariant },
              { status: "검토 필요", desc: "내용의 사실 여부 또는 적절성 확인 필요", badge: "review" as BadgeVariant },
            ].map((item) => (
              <div key={item.status} className="guide-card text-center">
                <StatusBadge variant={item.badge}>{item.status}</StatusBadge>
                <p className="text-xs text-muted-foreground mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="prohibited" title="허위 생성 금지 원칙">
          <div className="guide-card border-destructive/20">
            <h4 className="font-semibold text-foreground mb-3">절대 허위로 만들면 안 되는 증빙</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "공인중개사 등록번호", "대표 경력·자격·수상", "거래 건수·금액", "고객 후기",
                "시세·수익률 정보", "지점 수·직원 수", "매물 사진·정보", "사무소 외관 사진",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 p-2 bg-destructive/5 rounded-md">
                  <StatusBadge variant="prohibited" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/proof-system" />
      </div>
    </>
  );
};

export default ProofSystem;
