import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { QuickPoints } from "@/components/guide/QuickPoints";

const tocItems = [
  { id: "brand-tone", title: "브랜드 톤 정의" },
  { id: "color-system", title: "컬러 시스템" },
  { id: "typography", title: "타이포그래피 시스템" },
  { id: "spacing", title: "간격 시스템" },
  { id: "border-shadow", title: "라운드·보더·그림자" },
  { id: "image-rules", title: "이미지 사용 기준" },
  { id: "icon-style", title: "아이콘 스타일 가이드" },
  { id: "prohibited-visuals", title: "금지해야 할 시각 표현" },
];

const DesignGuide = () => {
  return (
    <>
      <PageHeader
        title="디자인 가이드"
        description="부동산/공인중개 업종에 최적화된 디자인 시스템, 컬러, 타이포그래피, 레이아웃, 이미지 사용 기준을 정의합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        <SectionBlock id="brand-tone" title="브랜드 톤 정의" subtitle="부동산 업종에 맞는 비주얼 키워드">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Trustworthy", "Local-Expert", "Professional", "Structured", "Modern", "Clear", "Conversion-Oriented", "Calm & Credible"].map((kw) => (
              <div key={kw} className="text-center p-3 bg-card border border-border rounded-lg">
                <span className="text-sm font-medium text-foreground">{kw}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 guide-card">
            <p className="text-sm text-muted-foreground">
              부동산 사이트는 투자 광고처럼 보이면 안 됩니다. 지역 전문 중개 안내서와 현대적 웹 인터페이스의 균형을 추구합니다.
              신뢰감 있는 정보 디자인을 최우선으로 하되, 상담 전환 구조가 자연스럽게 내장되어야 합니다.
            </p>
          </div>
        </SectionBlock>

        <SectionBlock id="color-system" title="컬러 시스템" subtitle="추천 컬러 토큰과 사용 기준">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">메인 팔레트</h4>
              {[
                { name: "Primary (Deep Navy)", token: "--primary", color: "bg-primary", text: "text-primary-foreground", desc: "헤더, CTA, 강조 요소" },
                { name: "Background (White)", token: "--background", color: "bg-background border", text: "text-foreground", desc: "전체 배경" },
                { name: "Surface (Warm Gray)", token: "--surface", color: "bg-surface", text: "text-foreground", desc: "카드, 섹션 배경" },
                { name: "Trust (Teal)", token: "--trust", color: "bg-trust", text: "text-trust-foreground", desc: "신뢰 요소, 검증 배지" },
                { name: "Warm (Gold)", token: "--warm", color: "bg-warm", text: "text-warm-foreground", desc: "보조 포인트, 주의 표시" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md ${c.color} ${c.text} flex items-center justify-center text-xs font-mono flex-shrink-0`}>Aa</div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground text-sm">상태 컬러</h4>
              {[
                { name: "Success", desc: "거래 완료, 확인 상태", color: "bg-success" },
                { name: "Warning", desc: "주의, 검토 필요", color: "bg-warning" },
                { name: "Destructive", desc: "오류, 금지 표현", color: "bg-destructive" },
                { name: "Muted", desc: "보조 텍스트, 비활성", color: "bg-muted" },
              ].map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md ${c.color} flex-shrink-0`} />
                  <div>
                    <span className="text-sm font-medium text-foreground">{c.name}</span>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <CopyBlock label="컬러 토큰 예시 (CSS Custom Properties)" content={`--primary: 215 60% 22%;      /* Deep Navy - 메인 브랜드, CTA */
--trust: 168 38% 38%;         /* Teal - 신뢰 요소 */
--warm: 38 70% 50%;           /* Gold - 보조 포인트 */
--surface: 220 15% 97%;       /* Warm Gray - 카드 배경 */
--foreground: 220 25% 12%;    /* 본문 텍스트 */
--muted-foreground: 215 12% 50%;  /* 보조 텍스트 */`} />
          </div>
        </SectionBlock>

        <SectionBlock id="typography" title="타이포그래피 시스템">
          <div className="space-y-4">
            <div className="guide-card">
              <div className="space-y-3">
                <div><span className="text-3xl font-bold text-foreground">H1 — 페이지 제목 (30px/Bold)</span><p className="text-xs text-muted-foreground mt-1">페이지당 1개. 지역명+서비스 포함 권장.</p></div>
                <div><span className="text-2xl font-bold text-foreground">H2 — 섹션 제목 (24px/Bold)</span><p className="text-xs text-muted-foreground mt-1">주요 섹션 구분용.</p></div>
                <div><span className="text-xl font-semibold text-foreground">H3 — 소제목 (20px/Semibold)</span><p className="text-xs text-muted-foreground mt-1">카드, 블록 제목.</p></div>
                <div><span className="text-base text-foreground">Body — 본문 (16px/Regular)</span><p className="text-xs text-muted-foreground mt-1">일반 본문 텍스트.</p></div>
                <div><span className="text-sm text-muted-foreground">Caption — 부가 정보 (14px/Regular)</span><p className="text-xs text-muted-foreground mt-1">매물 상세, 부가 설명.</p></div>
                <div><span className="text-xs text-muted-foreground">Label — 라벨/태그 (12px/Medium)</span><p className="text-xs text-muted-foreground mt-1">배지, 상태 표시, 필터 태그.</p></div>
              </div>
            </div>
            <CopyBlock label="타이포 스케일 (Tailwind)" content={`H1: text-3xl font-bold    (30px)
H2: text-2xl font-bold    (24px)
H3: text-xl font-semibold (20px)
Body: text-base           (16px)
Caption: text-sm text-muted-foreground (14px)
Label: text-xs font-medium (12px)`} />
          </div>
        </SectionBlock>

        <SectionBlock id="spacing" title="간격 시스템">
          <CopyBlock label="Spacing Scale" content={`xs: 4px  (p-1)   — 인라인 요소 간격
sm: 8px  (p-2)   — 배지, 태그 내부
md: 16px (p-4)   — 카드 내부 기본
lg: 24px (p-6)   — 카드 패딩, 섹션 간
xl: 32px (p-8)   — 페이지 패딩
2xl: 48px (py-12) — 섹션 간 여백
3xl: 64px (py-16) — 주요 섹션 구분`} />
        </SectionBlock>

        <SectionBlock id="border-shadow" title="라운드·보더·그림자">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2">Border Radius</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>sm: 4px — 배지, 태그</p>
                <p>md: 6px — 버튼, 입력 필드</p>
                <p>lg: 8px — 카드, 모달</p>
                <p>xl: 12px — 히어로 카드, 이미지</p>
              </div>
            </div>
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2">Border</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>기본: 1px solid border</p>
                <p>강조: 2px solid primary</p>
                <p>컬러 보더는 최소 사용</p>
              </div>
            </div>
            <div className="guide-card">
              <h4 className="font-semibold text-foreground text-sm mb-2">Shadow</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>sm: 카드 기본 (hover)</p>
                <p>md: 드롭다운, 모달</p>
                <p>과도한 그림자 금지</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="image-rules" title="이미지 사용 기준">
          <div className="space-y-3">
            {[
              { title: "대표 공인중개사 사진", rules: "실제 인물 사진 사용. 정면 또는 45도 각도. 밝은 배경. 정장 또는 단정한 캐주얼. AI 생성 이미지 사용 가능하나 실제 인물처럼 보이게 과장하면 안 됨.", badge: "recommended" as const },
              { title: "사무소/지점 외관 사진", rules: "실제 사무소 외관·내부 사진. 깨끗하고 밝은 사진. 간판이 보이면 좋음. 없으면 지도 캡처로 대체 가능.", badge: "recommended" as const },
              { title: "매물 사진", rules: "실제 매물 사진 사용. 허위매물 사진 금지. 사진 없는 매물은 '사진 준비 중' 표시. 타 사이트 매물 사진 무단 사용 금지.", badge: "required" as const },
              { title: "지도/지역 정보", rules: "카카오맵 또는 네이버지도 임베드 권장. 스크린샷 사용 시 출처 표시.", badge: "recommended" as const },
            ].map((item) => (
              <div key={item.title} className="guide-card">
                <div className="flex items-start gap-2">
                  <StatusBadge variant={item.badge} />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.rules}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="icon-style" title="아이콘 스타일 가이드">
          <div className="guide-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">스타일:</strong> 라인 아이콘 (Lucide 또는 Heroicons 계열)</li>
              <li>• <strong className="text-foreground">크기:</strong> 16px(인라인), 20px(버튼), 24px(카드 헤더), 32px(히어로)</li>
              <li>• <strong className="text-foreground">컬러:</strong> foreground(기본), primary(CTA), trust(신뢰), muted(보조)</li>
              <li>• <strong className="text-foreground">금지:</strong> 3D 아이콘, 과도한 컬러풀 아이콘, 투자 관련 자극적 아이콘</li>
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="prohibited-visuals" title="금지해야 할 시각 표현">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "투자 광고형 네온·골드 배경",
              "과도한 글래스모피즘/블러 효과",
              "자극적인 가격 상승 그래프",
              "클릭베이트형 배너 디자인",
              "과장된 수익률 차트",
              "허위매물 연상 이미지",
              "과도한 럭셔리 톤 (대리석/샹들리에 등)",
              "너무 많은 애니메이션/모션",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 p-3 bg-destructive/5 border border-destructive/15 rounded-md">
                <StatusBadge variant="prohibited" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/design-guide" />
      </div>
    </>
  );
};

export default DesignGuide;
