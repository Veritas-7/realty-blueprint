import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { QuickPoints } from "@/components/guide/QuickPoints";

const tocItems = [
  { id: "tone", title: "신뢰를 높이는 문장 톤" },
  { id: "hero-copy", title: "히어로 카피 공식" },
  { id: "service-intro", title: "서비스 소개 문장 템플릿" },
  { id: "rep-intro", title: "대표 공인중개사 소개 템플릿" },
  { id: "cta-library", title: "CTA 문구 라이브러리" },
  { id: "prohibited-expressions", title: "피해야 할 표현" },
  { id: "faq-guide", title: "FAQ 작성 가이드" },
];

const ContentGuide = () => {
  return (
    <>
      <PageHeader
        title="콘텐츠/카피라이팅 가이드"
        description="부동산/공인중개 업종에서 신뢰를 높이고 전환을 유도하는 문장 작성 원칙과 템플릿을 제공합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        <SectionBlock id="tone" title="신뢰를 높이는 문장 톤" subtitle="부동산 업종 카피의 핵심 방향">
          <div className="guide-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">구체적 지역명</strong>과 <strong className="text-foreground">구체적 거래 유형</strong>을 중심으로 씁니다.</li>
              <li>• 단정·과장 대신 <strong className="text-foreground">경험 기반 표현</strong>을 사용합니다.</li>
              <li>• "~해드립니다", "~안내합니다"처럼 <strong className="text-foreground">서비스 안내 톤</strong>을 유지합니다.</li>
              <li>• 수치가 필요하면 <strong className="text-foreground">검증 가능한 범위</strong>만 사용합니다.</li>
              <li>• 약속이 아닌 <strong className="text-foreground">과정과 전문성</strong>을 전달합니다.</li>
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="hero-copy" title="히어로 카피 공식">
          <CopyBlock label="히어로 카피 구조" content={`[지역명] [거래유형] 전문
[사무소명/대표명]이 [핵심 강점]으로 안내합니다.

예시:
"마포구 아파트 전세·매매 전문 — 한강부동산이 지역 경험으로 안내합니다." (예시 데이터)
"강남구 상가·사무실 임대 전문 상담" (예시 데이터)
"용인시 신축 아파트 분양 상담 — 000공인중개사사무소" (예시 데이터)`} />
        </SectionBlock>

        <SectionBlock id="service-intro" title="서비스 소개 문장 템플릿">
          <CopyBlock label="거래유형 소개 예시" content={`"[지역명] 아파트 전세·월세를 전문으로 중개하고 있습니다."
"[지역명] 상가·사무실 임대 상담을 도와드립니다."
"매매·전세·월세 모든 거래를 정직하게 안내합니다."
(예시 데이터 — 실제 사용 시 사무소 정보에 맞게 수정)`} />
        </SectionBlock>

        <SectionBlock id="rep-intro" title="대표 공인중개사 소개 템플릿">
          <CopyBlock label="대표 소개 예시" content={`"[지역명]에서 [N]년간 [거래유형]을 중개해온 [이름] 대표 공인중개사입니다."
"국가공인 공인중개사 자격을 보유하고 있으며, [전문 분야]를 중심으로 상담합니다."
(예시 데이터 — 실제 경력 정보에 맞게 수정. 허위 경력 기재 금지.)`} />
        </SectionBlock>

        <SectionBlock id="cta-library" title="CTA 문구 라이브러리">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { type: "전화 상담", examples: ["전화 상담하기", "지금 전화로 문의", "상담 전화 연결"] },
              { type: "카카오 문의", examples: ["카카오톡 문의", "카카오로 상담", "카카오톡 상담하기"] },
              { type: "문의 폼", examples: ["온라인 문의하기", "상담 신청", "문의 남기기"] },
              { type: "매물 탐색", examples: ["매물 보기", "전체 매물 확인", "조건에 맞는 매물 찾기"] },
              { type: "매물 접수", examples: ["내 매물 내놓기", "매물 접수하기", "매도/임대 문의"] },
              { type: "방문 예약", examples: ["방문 상담 예약", "사무소 방문 예약", "현장 상담 신청"] },
            ].map((item) => (
              <div key={item.type} className="guide-card">
                <h4 className="font-semibold text-foreground text-sm mb-2">{item.type}</h4>
                <div className="flex flex-wrap gap-2">
                  {item.examples.map((ex) => (
                    <span key={ex} className="px-2 py-1 bg-muted rounded text-xs text-foreground">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="prohibited-expressions" title="피해야 할 표현" subtitle="부동산 업종에서 금지되는 카피 패턴">
          <div className="space-y-2">
            {[
              { bad: "무조건 팔립니다", reason: "거래 결과를 보장하는 표현" },
              { bad: "수익 보장 / 무조건 상승", reason: "투자 수익을 단정하는 표현" },
              { bad: "가장 좋은 투자 / 압도적 1위", reason: "검증 불가능한 최상급 표현" },
              { bad: "허위 없이 100%", reason: "모든 매물의 완전성을 보장하는 표현" },
              { bad: "지금 안 하면 후회합니다", reason: "압박형 마케팅 표현" },
              { bad: "누구나 가능한 재테크", reason: "투기를 조장하는 표현" },
            ].map((item) => (
              <div key={item.bad} className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/15 rounded-md">
                <StatusBadge variant="prohibited" />
                <div>
                  <span className="text-sm font-medium text-foreground">"{item.bad}"</span>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="faq-guide" title="FAQ 작성 가이드">
          <CopyBlock label="FAQ 예시 질문" content={`Q. 상담 비용이 있나요?
A. 상담은 무료이며, 중개 수수료는 거래 성사 시 법정 요율에 따라 안내해 드립니다.

Q. 전세 사기 예방은 어떻게 하나요?
A. 등기부등본 확인, 전입신고, 확정일자 등 기본 안전 절차를 상담 시 안내해 드립니다.

Q. 주말에도 상담 가능한가요?
A. 토요일 [시간]까지 상담 가능하며, 일요일은 사전 예약 시 상담 가능합니다.
(예시 데이터 — 실제 운영 정보에 맞게 수정)`} />
        </SectionBlock>

        <PrevNextNav currentPath="/content-guide" />
      </div>
    </>
  );
};

export default ContentGuide;
