import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { CopyBlock } from "@/components/guide/CopyBlock";
import { TableOfContents } from "@/components/guide/TableOfContents";

const tocItems = [
  { id: "meta-examples", title: "페이지별 메타 타이틀/디스크립션 예시" },
  { id: "url-structure", title: "URL 구조 예시" },
  { id: "landing-design", title: "검색 유입용 랜딩 페이지 설계" },
  { id: "heading-rules", title: "H1/H2/H3 규칙" },
  { id: "structured-data", title: "구조화 데이터 (JSON-LD)" },
  { id: "ai-search", title: "AI 검색/요약 대응" },
  { id: "technical-seo", title: "기술적 SEO 체크포인트" },
];

const SeoGeo = () => {
  return (
    <>
      <PageHeader
        title="SEO / GEO 가이드"
        description="부동산/공인중개 사이트의 검색 최적화, 지역 기반 탐색, 구조화 데이터, AI 검색 대응 전략을 정리합니다."
      />
      <div className="guide-container">
        <TableOfContents items={tocItems} />

        <SectionBlock id="meta-examples" title="페이지별 메타 타이틀/디스크립션 예시">
          <CopyBlock label="메타 예시 (예시 데이터)" content={`홈:
  title: "마포구 아파트 전세·매매 전문 — 한강부동산 공인중개사사무소"
  description: "서울 마포구 아파트 전세, 매매 전문 중개. 대표 공인중개사 직접 상담. 전화 02-000-0000."

매물 리스트:
  title: "마포구 아파트 전세 매물 — 한강부동산"
  description: "마포구 아파트 전세 매물을 확인하세요. 실시간 업데이트. 상담 가능."

소개:
  title: "대표 공인중개사 소개 — 한강부동산 마포구"
  description: "마포구 15년 경력 대표 공인중개사. 등록번호 00000-0000-00000."

상담:
  title: "상담 문의 — 한강부동산 마포구 아파트 전문"
  description: "전화, 카카오톡, 온라인 문의. 평일 09:00~18:00 상담."

(예시 데이터 — 실제 사무소 정보에 맞게 수정)`} />
        </SectionBlock>

        <SectionBlock id="url-structure" title="URL 구조 예시">
          <CopyBlock label="권장 URL 패턴" content={`/ — 홈
/listings — 매물 리스트
/listings/apartment-jeonse — 아파트 전세
/listings/:id — 매물 상세
/about — 대표/사무소 소개
/contact — 상담/문의
/location — 오시는 길
/area/mapo — 지역 소개
/blog — 블로그/지역 정보
/blog/:slug — 블로그 상세
/submit-listing — 매물 접수
/reviews — 후기`} />
        </SectionBlock>

        <SectionBlock id="landing-design" title="검색 유입용 랜딩 페이지 설계">
          <div className="guide-card">
            <h4 className="font-semibold text-foreground text-sm mb-2">지역 + 거래유형 조합 랜딩</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
              {[
                "마포구 아파트 전세", "강남구 오피스텔 월세", "용인시 상가 임대",
                "분당 아파트 매매 상담", "일산 신축 분양 상담", "마포구 공인중개사",
              ].map((kw) => (
                <div key={kw} className="p-2 bg-muted rounded-md">{kw} → 전용 랜딩 페이지</div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">(예시 데이터 — 고객사 지역에 맞게 설계)</p>
          </div>
        </SectionBlock>

        <SectionBlock id="heading-rules" title="H1/H2/H3 규칙">
          <div className="guide-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">H1:</strong> 페이지당 1개. 지역명 + 서비스 + 브랜드 포함 권장.</li>
              <li>• <strong className="text-foreground">H2:</strong> 섹션 제목. 검색 키워드 자연스럽게 포함.</li>
              <li>• <strong className="text-foreground">H3:</strong> 하위 항목. 매물 카드 제목, FAQ 질문 등.</li>
              <li>• H4 이하는 최소 사용. 깊은 계층 구조 지양.</li>
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="structured-data" title="구조화 데이터 (JSON-LD)">
          <CopyBlock label="추천 스키마 유형" content={`1. Organization — 사무소 정보
2. RealEstateAgent — 공인중개사 정보
3. Place / LocalBusiness — 위치, 영업시간
4. FAQPage — FAQ 섹션
5. BreadcrumbList — 탐색 경로
6. Article — 블로그/지역 정보
7. Review — 후기 (실제 후기만)
8. Product — 매물 (RealEstateListing 확장)`} />
          <CopyBlock label="Organization JSON-LD 예시 (예시 데이터)" content={`{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "한강부동산 공인중개사사무소",
  "url": "https://example.com",
  "telephone": "02-000-0000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "서울특별시 마포구",
    "streetAddress": "월드컵북로 000"
  },
  "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-15:00"
}`} />
        </SectionBlock>

        <SectionBlock id="ai-search" title="AI 검색/요약 대응">
          <div className="guide-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 질문-답변 구조 (FAQ)를 적극 활용</li>
              <li>• 명확한 문장 구조 (주어-목적어-서술어)</li>
              <li>• 구체적 지역명, 거래유형, 상담 채널 명시</li>
              <li>• 구조화 데이터로 기계 가독성 확보</li>
              <li>• 과장 없는 사실 기반 정보 작성</li>
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock id="technical-seo" title="기술적 SEO 체크포인트">
          <div className="guide-card">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• canonical 태그: 모든 페이지에 자기 참조 canonical 적용</li>
              <li>• sitemap.xml: 모든 공개 페이지 포함</li>
              <li>• robots.txt: 관리자, 미완성 페이지 차단</li>
              <li>• Open Graph: og:title, og:description, og:image 설정</li>
              <li>• Twitter Card: summary_large_image 설정</li>
              <li>• 404 페이지: noindex 적용</li>
              <li>• 이미지 alt text: 매물명/지역명 포함</li>
              <li>• 내부 링크: 주요 페이지 간 상호 링크</li>
            </ul>
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/seo-geo" />
      </div>
    </>
  );
};

export default SeoGeo;
