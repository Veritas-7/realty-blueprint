import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { TableOfContents } from "@/components/guide/TableOfContents";

const tocItems = [
  { id: "user-journey", title: "대표 사용자 여정" },
  { id: "visit-purpose", title: "방문 목적별 UX 분기" },
  { id: "above-fold", title: "첫 화면에서 반드시 전달해야 하는 것" },
  { id: "cta-placement", title: "CTA 배치 원칙" },
  { id: "form-minimal", title: "폼 최소화 전략" },
  { id: "mobile-ux", title: "모바일 UX 우선순위" },
  { id: "exit-prevention", title: "이탈 방지 포인트" },
  { id: "microcopy", title: "마이크로카피 원칙" },
];

const UXGuide = () => {
  return (
    <>
      <PageHeader
        title="UX 가이드"
        description="부동산 사이트 방문자의 사용자 여정, 정보 우선순위, 전환 흐름, 모바일 UX 원칙을 정리합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        <SectionBlock id="user-journey" title="대표 사용자 여정" subtitle="첫 방문부터 상담 전환까지">
          <div className="guide-card">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {["검색 유입 (지역+거래)", "첫 화면에서 적합성 확인", "지역/거래 전문 분야 탐색", "매물 또는 서비스 확인", "대표/사무소 신뢰 확인", "상담 CTA 전환"].map((step, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <span className="text-muted-foreground">→</span>}
                  <span className={`px-3 py-1.5 rounded-md ${i === 5 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{step}</span>
                </span>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="visit-purpose" title="방문 목적별 UX 분기" subtitle="5가지 대표 방문 유형">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: "매물 탐색형", flow: "히어로 → 매물 리스트 → 필터 → 상세 → 상담", key: "필터와 매물 카드 품질이 핵심" },
              { type: "바로 상담형", flow: "히어로 → 전화/카카오 CTA", key: "CTA 접근성이 핵심 (특히 모바일)" },
              { type: "지역 정보 확인형", flow: "히어로 → 지역 소개 → 시세 → 상담", key: "지역 콘텐츠 깊이가 핵심" },
              { type: "내 매물 접수형", flow: "히어로 → 매물 접수 → 폼 → 완료", key: "폼 최소화와 안내가 핵심" },
              { type: "분양 문의형", flow: "히어로 → 분양 정보 → 상담", key: "분양 일정/평형/가격 정보가 핵심" },
            ].map((item) => (
              <div key={item.type} className="guide-card">
                <StatusBadge variant="info">{item.type}</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2 mb-1">{item.flow}</p>
                <p className="text-xs font-medium text-trust">{item.key}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="above-fold" title="첫 화면에서 반드시 전달해야 하는 것" subtitle="Above the fold 정보 우선순위">
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {[
              { priority: "1", item: "어느 지역·어떤 거래를 전문으로 하는지", badge: "required" as const },
              { priority: "2", item: "누구를 위한 서비스인지 (임차인? 매수자? 사업자?)", badge: "required" as const },
              { priority: "3", item: "지금 무엇을 할 수 있는지 (전화? 문의? 매물보기?)", badge: "required" as const },
              { priority: "4", item: "상담 가능 시간/채널", badge: "recommended" as const },
              { priority: "5", item: "대표 공인중개사 또는 사무소 이름", badge: "recommended" as const },
            ].map((item) => (
              <div key={item.priority} className="flex items-center gap-4 px-4 py-3">
                <span className="font-bold text-primary text-sm w-6">{item.priority}</span>
                <span className="text-sm text-foreground flex-1">{item.item}</span>
                <StatusBadge variant={item.badge} />
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="cta-placement" title="CTA 배치 원칙">
          <div className="guide-card">
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2"><StatusBadge variant="required" /><span className="text-muted-foreground">히어로 영역에 핵심 CTA 1~2개 (전화, 매물보기, 문의 중 택)</span></div>
              <div className="flex items-start gap-2"><StatusBadge variant="required" /><span className="text-muted-foreground">모바일 하단 고정 CTA 바 (전화, 카카오, 길찾기 중 2~4개)</span></div>
              <div className="flex items-start gap-2"><StatusBadge variant="recommended" /><span className="text-muted-foreground">매물 상세 페이지에 상담 CTA 배치</span></div>
              <div className="flex items-start gap-2"><StatusBadge variant="recommended" /><span className="text-muted-foreground">페이지 하단 최종 CTA 블록</span></div>
              <div className="flex items-start gap-2"><StatusBadge variant="prohibited" /><span className="text-muted-foreground">3초 팝업, 강제 폼, 스크롤 차단형 CTA 금지</span></div>
              <div className="flex items-start gap-2"><StatusBadge variant="prohibited" /><span className="text-muted-foreground">"지금 안 하면 늦습니다" 같은 압박형 CTA 금지</span></div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="form-minimal" title="폼 최소화 전략">
          <div className="guide-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-2">최소 필드 (권장)</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 이름 (또는 연락처만)</li>
                  <li>• 연락처 (전화번호)</li>
                  <li>• 문의 내용 (선택)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">금지</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• 주민등록번호, 소득, 자산 정보</li>
                  <li>• 5개 초과 필수 필드</li>
                  <li>• 복잡한 다단계 폼</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="mobile-ux" title="모바일 UX 우선순위">
          <div className="space-y-3">
            {[
              { item: "전화 버튼 터치 한 번으로 연결", priority: "최우선" },
              { item: "카카오/문의 하단 고정", priority: "최우선" },
              { item: "지도/길찾기 원터치 실행", priority: "높음" },
              { item: "매물 카드 세로 스택, 스와이프 가능", priority: "높음" },
              { item: "폼 모바일 키보드 최적화 (tel, email 타입)", priority: "중간" },
              { item: "이미지 lazy loading", priority: "중간" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-md">
                <span className="text-sm text-foreground">{item.item}</span>
                <StatusBadge variant={item.priority === "최우선" ? "required" : "recommended"}>{item.priority}</StatusBadge>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="exit-prevention" title="이탈 방지 포인트">
          <div className="guide-card">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong className="text-foreground">히어로에서 지역이 안 맞으면:</strong> 즉시 이탈 → 지역명을 최상단에 명확히</p>
              <p>• <strong className="text-foreground">매물이 오래되어 보이면:</strong> 허위매물 의심 → 날짜 표시, 갱신 표시</p>
              <p>• <strong className="text-foreground">연락 방법을 못 찾으면:</strong> 이탈 → 하단 고정 CTA 필수</p>
              <p>• <strong className="text-foreground">누가 운영하는지 모르면:</strong> 불신 → 대표/사무소 정보 조기 노출</p>
              <p>• <strong className="text-foreground">폼이 길면:</strong> 포기 → 3개 이하 필드</p>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="microcopy" title="마이크로카피 원칙">
          <div className="guide-card">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• CTA: 구체적 행동 기술 ("전화 상담하기", "카카오로 문의", "매물 보기")</p>
              <p>• 모호한 표현 금지 ("자세히 보기", "클릭하세요", "확인")</p>
              <p>• 상담 안내: "평일 09:00~18:00 상담 가능합니다"처럼 구체적으로</p>
              <p>• 폼 placeholder: "예: 마포구 아파트 전세 상담 희망"처럼 예시 제공</p>
              <p>• 에러 메시지: "연락처를 입력해주세요"처럼 친절하게</p>
            </div>
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/ux-guide" />
      </div>
    </>
  );
};

export default UXGuide;
