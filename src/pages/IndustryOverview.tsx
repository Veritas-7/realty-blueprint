import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { QuickPoints } from "@/components/guide/QuickPoints";

const tocItems = [
  { id: "diff", title: "일반 서비스업과 다른 점" },
  { id: "visitor-priority", title: "방문자가 가장 먼저 확인하는 정보" },
  { id: "site-types", title: "사이트 유형별 차이" },
  { id: "property-types", title: "주거형 / 상업형 / 토지형 / 분양형 차이" },
  { id: "conversion-flow", title: "전환이 발생하는 대표 흐름" },
  { id: "trust-elements", title: "부동산 사이트에서 신뢰를 주는 요소" },
  { id: "fail-patterns", title: "자주 실패하는 패턴" },
];

const IndustryOverview = () => {
  return (
    <>
      <PageHeader
        title="부동산/공인중개 업종 특성"
        description="부동산/공인중개 홈페이지가 일반 서비스업 홈페이지와 다른 점, 방문자 행동 패턴, 사이트 유형별 차이를 정리합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        <SectionBlock id="diff" title="일반 서비스업과 다른 점" subtitle="부동산 사이트만의 고유 특성">
          <div className="space-y-3">
            {[
              { title: "지역 기반 서비스", desc: "특정 지역의 매물·시세·생활권 정보가 핵심이며, 지역을 벗어난 방문자에게는 관련성이 급격히 떨어집니다." },
              { title: "거래 금액이 큼", desc: "수천만 원~수억 원 단위의 거래이므로, 신뢰 형성이 전환의 전제 조건입니다." },
              { title: "법적 등록 정보 필수", desc: "공인중개사 등록번호, 사무소 등록 정보 등 법적 증빙이 있어야 신뢰를 얻습니다." },
              { title: "상담 중심 전환", desc: "온라인에서 바로 거래가 이루어지지 않고, 전화·방문·카카오 상담으로 전환됩니다." },
              { title: "매물 정보의 시의성", desc: "매물은 수시로 변동되므로, 오래된 매물 정보는 허위매물 의심을 받습니다." },
              { title: "복잡한 거래 유형", desc: "매매·전세·월세·분양·임대 등 거래 유형별로 방문 목적과 정보 구조가 달라집니다." },
            ].map((item, i) => (
              <div key={i} className="guide-card">
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="visitor-priority" title="방문자가 가장 먼저 확인하는 정보" subtitle="우선순위별 정리">
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {[
              { priority: "1순위", items: "전문 지역 + 거래 유형, 지금 상담 가능 여부" },
              { priority: "2순위", items: "대표 공인중개사/사무소 신뢰 정보" },
              { priority: "3순위", items: "주요 매물 또는 주력 서비스 확인" },
              { priority: "4순위", items: "위치, 주차, 상담시간, 연락 채널" },
              { priority: "5순위", items: "지역 시세, 생활권 정보, 블로그 콘텐츠" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <StatusBadge variant={i === 0 ? "required" : i < 3 ? "recommended" : "optional"}>
                  {item.priority}
                </StatusBadge>
                <span className="text-sm text-foreground">{item.items}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="site-types" title="사이트 유형별 차이" subtitle="부동산 사이트의 5가지 대표 유형">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: "지역전문형", desc: "특정 지역의 매물·시세·생활권 정보 중심. 지역명이 사이트 전체에 반복 노출.", example: "마포구 아파트 전문 중개" },
              { type: "매물탐색형", desc: "매물 리스트·필터·상세가 메인. 방문자가 직접 매물을 탐색.", example: "수백 건의 매물 DB 보유 사무소" },
              { type: "상담전환형", desc: "매물보다 상담 CTA가 중심. '전화 주세요'가 핵심 메시지.", example: "소규모 1인 중개사무소" },
              { type: "대표신뢰형", desc: "대표 공인중개사의 경력·전문성·후기가 중심. 인물 중심 구성.", example: "경력 20년 대표 중개사" },
              { type: "분양상담형", desc: "특정 분양 단지나 신축 매물 상담이 중심. 분양 일정·평형·가격 안내.", example: "신축 아파트 분양 상담" },
              { type: "다지점형", desc: "여러 지점 정보와 지점별 담당자·매물 구분이 필요. 지점 선택이 진입점.", example: "3개 지점 운영 중개 브랜드" },
            ].map((item) => (
              <div key={item.type} className="guide-card">
                <StatusBadge variant="info">{item.type}</StatusBadge>
                <p className="text-sm text-muted-foreground mt-2 mb-2">{item.desc}</p>
                <p className="text-xs text-muted-foreground italic">예: {item.example}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="property-types" title="주거형 / 상업형 / 토지형 / 분양형 차이">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-semibold text-foreground">구분</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">핵심 방문자</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">핵심 정보</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground">주요 CTA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="py-2 px-3 text-foreground">주거용</td><td className="py-2 px-3 text-muted-foreground">임차인, 매수자</td><td className="py-2 px-3 text-muted-foreground">면적, 가격, 층, 생활권</td><td className="py-2 px-3 text-muted-foreground">전화상담, 매물보기</td></tr>
                <tr><td className="py-2 px-3 text-foreground">상업용</td><td className="py-2 px-3 text-muted-foreground">사업자, 투자자</td><td className="py-2 px-3 text-muted-foreground">위치, 유동인구, 권리금, 임대조건</td><td className="py-2 px-3 text-muted-foreground">상담문의, 현장방문</td></tr>
                <tr><td className="py-2 px-3 text-foreground">토지</td><td className="py-2 px-3 text-muted-foreground">건축주, 투자자</td><td className="py-2 px-3 text-muted-foreground">용도지역, 면적, 접근성, 개발계획</td><td className="py-2 px-3 text-muted-foreground">전화상담, 현장안내</td></tr>
                <tr><td className="py-2 px-3 text-foreground">분양</td><td className="py-2 px-3 text-muted-foreground">실수요자, 투자자</td><td className="py-2 px-3 text-muted-foreground">분양가, 평형, 입주일, 단지 정보</td><td className="py-2 px-3 text-muted-foreground">분양상담, 모델하우스</td></tr>
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock id="conversion-flow" title="전환이 발생하는 대표 흐름">
          <div className="guide-card">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-1">전형적 전환 경로</h4>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded">검색 유입</span>
                  <span>→</span>
                  <span className="bg-muted px-2 py-1 rounded">지역/거래 확인</span>
                  <span>→</span>
                  <span className="bg-muted px-2 py-1 rounded">매물/서비스 탐색</span>
                  <span>→</span>
                  <span className="bg-muted px-2 py-1 rounded">대표/사무소 신뢰</span>
                  <span>→</span>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded">전화/카카오/문의</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">바로 상담형 (모바일)</h4>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded">검색 유입</span>
                  <span>→</span>
                  <span className="bg-muted px-2 py-1 rounded">히어로에서 지역 확인</span>
                  <span>→</span>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded">하단 CTA 전화</span>
                </div>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="trust-elements" title="부동산 사이트에서 신뢰를 주는 요소">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "공인중개사 등록번호·자격 정보 공개",
              "대표 공인중개사 실명·경력·사진",
              "사무소 외관·내부 실제 사진",
              "실제 거래 사례·상담 후기",
              "지역 시세 분석·생활권 콘텐츠",
              "명확한 상담 프로세스 안내",
              "영업시간·위치·주차 정보 명시",
              "과장 없는 정직한 매물 정보",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-accent rounded-md">
                <StatusBadge variant="proof">신뢰</StatusBadge>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="fail-patterns" title="자주 실패하는 패턴" subtitle="부동산 사이트에서 반드시 피해야 할 구성">
          <div className="space-y-3">
            {[
              { pattern: "지역·거래 전문 분야 불명확", desc: "방문자가 첫 화면에서 '여기가 내가 원하는 곳인지' 판단할 수 없음" },
              { pattern: "허위매물처럼 보이는 과장된 리스트", desc: "오래된 매물, 비현실적 가격, 미끼 매물 느낌" },
              { pattern: "대표/사무소 정보가 부족", desc: "누가 운영하는지, 등록된 사무소인지 알 수 없음" },
              { pattern: "CTA가 약하거나 너무 공격적", desc: "'상담하기' 버튼이 없거나, 팝업·강제 폼이 과다" },
              { pattern: "위치/상담시간/등록정보 찾기 어려움", desc: "기본 사업 정보가 푸터에만 작게 표시" },
              { pattern: "수익률/가격/투자 과장 표현", desc: "'무조건 상승', '수익 보장' 등 검증 불가능한 표현" },
              { pattern: "모바일에서 전화/카카오/길찾기 불편", desc: "버튼이 작거나 하단 고정 CTA가 없음" },
            ].map((item, i) => (
              <div key={i} className="guide-card border-destructive/20">
                <div className="flex items-start gap-2">
                  <StatusBadge variant="prohibited">금지</StatusBadge>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{item.pattern}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/industry-overview" />
      </div>
    </>
  );
};

export default IndustryOverview;
