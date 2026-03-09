import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge, type BadgeVariant } from "@/components/guide/StatusBadge";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { QuickPoints } from "@/components/guide/QuickPoints";

interface UIComponent {
  name: string;
  purpose: string;
  where: string;
  dontUse: string;
  badge: BadgeVariant;
  mobile: string;
  accessibility: string;
}

const components: UIComponent[] = [
  { name: "상단 정보 바", purpose: "전화번호·상담시간·주소·카카오 등 핵심 연락 정보를 항상 노출", where: "모든 페이지 최상단", dontUse: "정보가 2개 미만이면 생략 가능", badge: "required", mobile: "아이콘만 표시하거나 접기", accessibility: "tel: 링크 필수" },
  { name: "헤더", purpose: "로고, 내비게이션, CTA 버튼 배치", where: "모든 페이지", dontUse: "", badge: "required", mobile: "햄버거 메뉴 + 전화 CTA 아이콘", accessibility: "skip nav 링크" },
  { name: "히어로 섹션", purpose: "지역·거래 전문성을 즉시 전달하고 핵심 CTA 배치", where: "홈페이지", dontUse: "서브 페이지에는 축소 또는 생략", badge: "required", mobile: "텍스트 중심, 이미지 축소", accessibility: "H1 포함 필수" },
  { name: "지역/거래유형 바로가기 카드", purpose: "방문 목적별 빠른 진입점 제공", where: "홈 히어로 하단", dontUse: "매물 직접 노출형에서는 생략 가능", badge: "recommended", mobile: "2열 그리드 또는 가로 스크롤", accessibility: "명확한 링크 텍스트" },
  { name: "대표 매물 카드", purpose: "주력 매물 썸네일·가격·위치·면적 정보 노출", where: "홈, 매물리스트", dontUse: "매물 DB 없으면 사용 금지", badge: "conditional", mobile: "세로 카드, 이미지 상단", accessibility: "alt 텍스트, 가격 aria-label" },
  { name: "조건별 필터 UI", purpose: "지역·거래유형·가격대·면적 등 조건 필터", where: "매물 리스트 페이지", dontUse: "매물 10개 미만이면 과잉", badge: "conditional", mobile: "바텀시트 또는 아코디언", accessibility: "label 연결" },
  { name: "대표 공인중개사 프로필 카드", purpose: "대표 사진·이름·경력·자격 표시로 신뢰 형성", where: "홈, 소개 페이지", dontUse: "정보 미보유 시 사무소 소개로 대체", badge: "recommended", mobile: "세로 배치", accessibility: "img alt 필수" },
  { name: "사무소 정보 카드", purpose: "등록번호·주소·전화·상담시간 등 기본 사업 정보", where: "홈, 소개, 오시는길", dontUse: "", badge: "required", mobile: "전체 표시", accessibility: "address 태그 사용" },
  { name: "상담 CTA 블록", purpose: "전화·카카오·문의폼·방문예약 행동 유도", where: "홈 중간/하단, 매물 상세, 모든 페이지", dontUse: "너무 자주 반복하면 공격적으로 느껴짐", badge: "required", mobile: "하단 고정 바", accessibility: "role=region, aria-label" },
  { name: "후기/신뢰 카드", purpose: "고객 후기·거래 사례 표시", where: "홈, 후기 페이지", dontUse: "허위 후기 절대 금지", badge: "conditional", mobile: "가로 스크롤", accessibility: "blockquote 사용" },
  { name: "FAQ 아코디언", purpose: "자주 묻는 질문 정리", where: "홈 하단, 상담 페이지", dontUse: "질문 3개 미만이면 단순 텍스트로", badge: "recommended", mobile: "전체 표시", accessibility: "aria-expanded 필수" },
  { name: "문의 폼", purpose: "이름·연락처·문의내용 최소 필드 폼", where: "상담/문의 페이지", dontUse: "필드 5개 초과 금지", badge: "required", mobile: "full width, 큰 터치 타겟", accessibility: "label, required 표시" },
  { name: "모바일 하단 고정 CTA 바", purpose: "전화·카카오·길찾기 등 핵심 2~4개 액션 고정", where: "모바일 모든 페이지", dontUse: "데스크톱에서는 불필요", badge: "required", mobile: "하단 고정, 높이 56~64px", accessibility: "각 버튼 aria-label" },
  { name: "푸터", purpose: "사업자 정보·면책·저작권·연락처·지도", where: "모든 페이지", dontUse: "", badge: "required", mobile: "세로 스택", accessibility: "nav, address 태그" },
];

const tocItems = [
  { id: "ui-components", title: "핵심 UI 컴포넌트 목록" },
  { id: "button-system", title: "버튼 시스템" },
  { id: "form-states", title: "폼 필드 상태" },
  { id: "tab-chip-filter", title: "탭 / 칩 / 필터 / 태그" },
];

const UIGuide = () => {
  return (
    <>
      <PageHeader
        title="UI 가이드"
        description="부동산/공인중개 사이트에 필요한 UI 컴포넌트의 사용 목적, 배치 위치, 주의사항을 정리합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        <SectionBlock id="ui-components" title="핵심 UI 컴포넌트 목록" subtitle="각 컴포넌트의 사용 가이드">
          <div className="space-y-4">
            {components.map((comp) => (
              <div key={comp.name} className="guide-card">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-semibold text-foreground">{comp.name}</h3>
                  <StatusBadge variant={comp.badge} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground"><strong className="text-foreground">사용 목적:</strong> {comp.purpose}</p>
                    <p className="text-muted-foreground mt-1"><strong className="text-foreground">배치 위치:</strong> {comp.where}</p>
                    {comp.dontUse && <p className="text-muted-foreground mt-1"><strong className="text-foreground">사용 금지:</strong> {comp.dontUse}</p>}
                  </div>
                  <div>
                    <p className="text-muted-foreground"><strong className="text-foreground">모바일:</strong> {comp.mobile}</p>
                    <p className="text-muted-foreground mt-1"><strong className="text-foreground">접근성:</strong> {comp.accessibility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock id="button-system" title="버튼 시스템">
          <div className="guide-card">
            <div className="space-y-3">
              {[
                { variant: "Primary (CTA)", desc: "전화상담, 문의하기 등 핵심 행동", style: "bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium" },
                { variant: "Secondary", desc: "매물 더보기, 지도 보기 등 보조 행동", style: "bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium" },
                { variant: "Outline", desc: "카카오 문의, 길찾기 등 대체 채널", style: "border border-border bg-background text-foreground px-4 py-2 rounded-md text-sm font-medium" },
                { variant: "Ghost", desc: "내비게이션, 필터 토글", style: "text-foreground hover:bg-muted px-4 py-2 rounded-md text-sm font-medium" },
              ].map((btn) => (
                <div key={btn.variant} className="flex items-center gap-4">
                  <button className={btn.style}>{btn.variant}</button>
                  <span className="text-sm text-muted-foreground">{btn.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="form-states" title="폼 필드 상태">
          <div className="guide-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { state: "기본", desc: "빈 상태, placeholder 표시" },
                { state: "포커스", desc: "ring 색상 강조, label 활성" },
                { state: "입력됨", desc: "값 표시, 유효성 통과" },
                { state: "에러", desc: "destructive 보더, 에러 메시지" },
                { state: "비활성", desc: "muted 배경, 커서 변경" },
              ].map((f) => (
                <div key={f.state} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground w-16">{f.state}</span>
                  <span className="text-sm text-muted-foreground">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="tab-chip-filter" title="탭 / 칩 / 필터 / 태그">
          <div className="guide-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">탭:</strong> 매물 유형 전환 (아파트/오피스텔/빌라 등)</li>
              <li>• <strong className="text-foreground">칩:</strong> 활성 필터 표시, 제거 가능</li>
              <li>• <strong className="text-foreground">필터:</strong> 지역/가격/면적/거래유형 선택</li>
              <li>• <strong className="text-foreground">태그:</strong> 매물 상태 표시 (신규, 급매, 추천, 계약완료)</li>
            </ul>
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/ui-guide" />
      </div>
    </>
  );
};

export default UIGuide;
