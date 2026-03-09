import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge, type BadgeVariant } from "@/components/guide/StatusBadge";

interface ProofItem {
  name: string;
  level: "강한 증빙" | "보조 증빙";
  pages: string;
  nearCTA: string;
  fallback: string;
  prohibited: string;
  badge: BadgeVariant;
}

const proofItems: ProofItem[] = [
  { name: "공인중개사 등록정보", level: "강한 증빙", pages: "홈, 소개, 푸터", nearCTA: "모든 상담 CTA", fallback: "사업자등록정보", prohibited: "허위 등록번호", badge: "required" },
  { name: "대표 공인중개사 프로필", level: "강한 증빙", pages: "홈, 소개", nearCTA: "전화/방문 CTA", fallback: "사무소 소개로 대체", prohibited: "허위 경력·자격", badge: "required" },
  { name: "지역 전문성 (경험·기간)", level: "강한 증빙", pages: "홈 히어로, 소개", nearCTA: "상담 CTA", fallback: "지역 콘텐츠로 간접 증명", prohibited: "허위 경력 기간", badge: "recommended" },
  { name: "실제 거래 사례", level: "강한 증빙", pages: "홈, 후기", nearCTA: "상담 CTA", fallback: "고객 후기", prohibited: "허위 거래 건수·금액", badge: "conditional" },
  { name: "고객 후기", level: "보조 증빙", pages: "홈, 후기 페이지", nearCTA: "문의 CTA", fallback: "거래 사례 또는 생략", prohibited: "허위 후기 작성", badge: "conditional" },
  { name: "사무소/지점 사진", level: "보조 증빙", pages: "소개, 오시는길", nearCTA: "방문 CTA", fallback: "지도 캡처", prohibited: "타 사무소 사진 도용", badge: "recommended" },
  { name: "상담 프로세스 안내", level: "보조 증빙", pages: "상담페이지, 홈", nearCTA: "문의/전화 CTA", fallback: "FAQ로 대체", prohibited: "-", badge: "recommended" },
  { name: "지역 시세/분석 콘텐츠", level: "보조 증빙", pages: "블로그, 홈", nearCTA: "상담 CTA", fallback: "생략 가능", prohibited: "허위 시세, 투기 조장", badge: "optional" },
  { name: "FAQ/운영 정책", level: "보조 증빙", pages: "홈 하단, 상담", nearCTA: "문의 CTA", fallback: "생략 가능", prohibited: "-", badge: "recommended" },
];

const ProofSystem = () => {
  return (
    <>
      <PageHeader
        title="신뢰/증빙 시스템"
        description="부동산/공인중개 사이트에서 방문자의 신뢰를 확보하기 위한 증빙 요소의 분류, 배치, 상태 관리 체계입니다."
      />
      <div className="guide-container">
        <SectionBlock title="증빙 요소 카탈로그" subtitle="각 증빙의 수준, 배치, 대체 방안">
          <div className="space-y-4">
            {proofItems.map((item) => (
              <div key={item.name} className="guide-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <StatusBadge variant={item.badge} />
                  </div>
                  <StatusBadge variant={item.level === "강한 증빙" ? "proof" : "info"}>{item.level}</StatusBadge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground"><strong className="text-foreground">배치 페이지:</strong> {item.pages}</p>
                    <p className="text-muted-foreground"><strong className="text-foreground">CTA 근처:</strong> {item.nearCTA}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground"><strong className="text-foreground">대체 가능:</strong> {item.fallback}</p>
                    <p className="text-muted-foreground"><strong className="text-foreground">금지:</strong> <span className="text-destructive">{item.prohibited}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="증빙 상태 체계" subtitle="고객사 자산 현황 파악용">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { status: "보유", desc: "자산이 준비되어 있고 즉시 사용 가능", badge: "recommended" as const },
              { status: "부족", desc: "자산이 없거나 품질이 낮음. 대체안 필요", badge: "review" as const },
              { status: "비공개", desc: "자산은 있으나 공개하지 않기로 결정", badge: "info" as const },
              { status: "검토 필요", desc: "내용의 사실 여부 또는 적절성 확인 필요", badge: "review" as const },
            ].map((item) => (
              <div key={item.status} className="guide-card text-center">
                <StatusBadge variant={item.badge}>{item.status}</StatusBadge>
                <p className="text-xs text-muted-foreground mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="허위 생성 금지 원칙">
          <div className="guide-card border-destructive/20">
            <h4 className="font-semibold text-foreground mb-3">절대 허위로 만들면 안 되는 증빙</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "공인중개사 등록번호",
                "대표 경력·자격·수상",
                "거래 건수·금액",
                "고객 후기",
                "시세·수익률 정보",
                "지점 수·직원 수",
                "매물 사진·정보",
                "사무소 외관 사진",
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
