import { useState } from "react";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { QuickPoints } from "@/components/guide/QuickPoints";
import { Check } from "lucide-react";

interface CheckItem {
  text: string;
  checked: boolean;
}

interface CheckSection {
  title: string;
  items: CheckItem[];
}

const initialSections: CheckSection[] = [
  {
    title: "홈페이지 제작 전 체크리스트",
    items: [
      { text: "고객사 브리프 작성 완료", checked: false },
      { text: "사이트 유형 결정 (지역전문/매물탐색/상담전환/대표신뢰/분양상담)", checked: false },
      { text: "주력 지역 및 거래 유형 확정", checked: false },
      { text: "필수 페이지 목록 확정", checked: false },
      { text: "대표 공인중개사 정보 수집 여부 확인", checked: false },
      { text: "등록정보 공개 여부 확인", checked: false },
      { text: "매물 데이터 보유 여부 확인", checked: false },
      { text: "사진 자산 수집 상태 확인", checked: false },
    ],
  },
  {
    title: "디자인 검수 체크리스트",
    items: [
      { text: "컬러 시스템이 가이드와 일치하는가", checked: false },
      { text: "타이포 위계가 명확한가 (H1 → H2 → H3 → Body)", checked: false },
      { text: "여백과 그리드가 일관적인가", checked: false },
      { text: "투자 광고처럼 보이지 않는가", checked: false },
      { text: "신뢰감 있는 톤인가", checked: false },
      { text: "과장된 시각 표현이 없는가", checked: false },
    ],
  },
  {
    title: "UI 검수 체크리스트",
    items: [
      { text: "상단 정보 바에 전화/상담시간/주소 포함", checked: false },
      { text: "히어로에 지역+거래 전문성이 명확한가", checked: false },
      { text: "CTA 버튼이 구체적 행동을 명시하는가", checked: false },
      { text: "모바일 하단 고정 CTA 바 구현", checked: false },
      { text: "폼 필드 5개 이하", checked: false },
      { text: "hover/focus/active/disabled 상태 구현", checked: false },
      { text: "접근성 대비 충족 (4.5:1 이상)", checked: false },
    ],
  },
  {
    title: "모바일 검수 체크리스트",
    items: [
      { text: "전화 버튼 원터치 연결", checked: false },
      { text: "카카오/문의 하단 고정 CTA 동작", checked: false },
      { text: "지도/길찾기 원터치 실행", checked: false },
      { text: "폼이 모바일 키보드에 최적화", checked: false },
      { text: "이미지 lazy loading 적용", checked: false },
      { text: "텍스트 가독성 확보 (최소 14px)", checked: false },
    ],
  },
  {
    title: "콘텐츠 검수 체크리스트",
    items: [
      { text: "과장 표현이 없는가", checked: false },
      { text: "허위 매물/후기/수치가 없는가", checked: false },
      { text: "구체적 지역명·거래유형이 명시되어 있는가", checked: false },
      { text: "CTA 문구가 모호하지 않은가", checked: false },
      { text: "예시 데이터에 '예시' 표기가 되어 있는가", checked: false },
    ],
  },
  {
    title: "신뢰/증빙 검수 체크리스트",
    items: [
      { text: "공인중개사 등록정보 표시", checked: false },
      { text: "대표 공인중개사 정보 표시 (보유 시)", checked: false },
      { text: "사무소 정보 (주소, 전화, 상담시간) 표시", checked: false },
      { text: "후기가 실제 후기인가 확인", checked: false },
      { text: "증빙 부족 항목 대체안 적용", checked: false },
    ],
  },
  {
    title: "SEO/GEO 체크리스트",
    items: [
      { text: "각 페이지 메타 타이틀/디스크립션 설정", checked: false },
      { text: "H1 페이지당 1개, 지역명 포함", checked: false },
      { text: "canonical 태그 적용", checked: false },
      { text: "JSON-LD 구조화 데이터 적용", checked: false },
      { text: "Open Graph / Twitter 메타 설정", checked: false },
      { text: "sitemap.xml 생성", checked: false },
      { text: "robots.txt 설정", checked: false },
      { text: "이미지 alt text 설정", checked: false },
      { text: "404 페이지 noindex 적용", checked: false },
    ],
  },
  {
    title: "런칭 전 최종 점검",
    items: [
      { text: "모든 링크 정상 동작", checked: false },
      { text: "전화번호/주소 정확성 확인", checked: false },
      { text: "폼 제출 테스트 완료", checked: false },
      { text: "모바일 전 페이지 확인", checked: false },
      { text: "로딩 속도 확인 (3초 이내)", checked: false },
      { text: "SSL 인증서 적용", checked: false },
      { text: "Google Search Console 등록", checked: false },
      { text: "네이버 웹마스터도구 등록", checked: false },
    ],
  },
];

const Checklist = () => {
  const [sections, setSections] = useState<CheckSection[]>(initialSections);

  const toggleItem = (sectionIdx: number, itemIdx: number) => {
    setSections((prev) =>
      prev.map((sec, si) =>
        si === sectionIdx
          ? {
              ...sec,
              items: sec.items.map((item, ii) =>
                ii === itemIdx ? { ...item, checked: !item.checked } : item
              ),
            }
          : sec
      )
    );
  };

  const getProgress = (section: CheckSection) => {
    const checked = section.items.filter((i) => i.checked).length;
    return { checked, total: section.items.length, pct: Math.round((checked / section.items.length) * 100) };
  };

  return (
    <>
      <PageHeader
        title="실무 체크리스트"
        description="부동산/공인중개 사이트 제작의 단계별 검수 항목입니다. 체크박스를 클릭하여 진행 상태를 관리하세요."
      />
      <div className="guide-container">
        <TableOfContents items={sections.map((s, i) => ({ id: `check-${i}`, title: s.title }))} />
        {sections.map((section, sIdx) => {
          const progress = getProgress(section);
          return (
            <SectionBlock key={section.title} id={`check-${sIdx}`} title={section.title} subtitle={`${progress.checked}/${progress.total} 완료 (${progress.pct}%)`}>
              <div className="mb-2">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-trust rounded-full transition-all duration-300" style={{ width: `${progress.pct}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                {section.items.map((item, iIdx) => (
                  <button
                    key={iIdx}
                    onClick={() => toggleItem(sIdx, iIdx)}
                    className="flex items-center gap-3 w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${item.checked ? "bg-trust border-trust" : "border-border"}`}>
                      {item.checked && <Check className="h-3.5 w-3.5 text-trust-foreground" />}
                    </div>
                    <span className={`text-sm ${item.checked ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.text}</span>
                  </button>
                ))}
              </div>
            </SectionBlock>
          );
        })}

        <PrevNextNav currentPath="/checklist" />
      </div>
    </>
  );
};

export default Checklist;
