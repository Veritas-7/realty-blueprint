import { Link } from "react-router-dom";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { navItems } from "@/data/navigation";
import { ArrowRight, Phone, MessageCircle, MapPin, Shield, TrendingUp, Users } from "lucide-react";

const Index = () => {
  return (
    <>
      <PageHeader
        title="부동산/공인중개 웹 제작 가이드 시스템"
        description="부동산/공인중개 업종 홈페이지를 빠르고 정확하게 제작하기 위한 내부 기준서, 고객사 브리프 도구, 사이트 청사진 생성 시스템입니다."
      />
      <div className="guide-container">
        {/* 핵심 특성 요약 */}
        <SectionBlock title="부동산/공인중개 홈페이지의 핵심" subtitle="이 업종 사이트에서 가장 중요한 3가지">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="guide-card flex gap-3">
              <Shield className="h-8 w-8 text-trust flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">신뢰 형성</h3>
                <p className="text-sm text-muted-foreground">대표 공인중개사, 등록정보, 지역 전문성, 실제 거래 경험이 드러나야 합니다.</p>
              </div>
            </div>
            <div className="guide-card flex gap-3">
              <MapPin className="h-8 w-8 text-trust flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">지역 전문성</h3>
                <p className="text-sm text-muted-foreground">어느 지역, 어떤 거래를 전문으로 하는지 첫 화면에서 즉시 전달해야 합니다.</p>
              </div>
            </div>
            <div className="guide-card flex gap-3">
              <Phone className="h-8 w-8 text-trust flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">상담 전환</h3>
                <p className="text-sm text-muted-foreground">전화, 카카오, 방문예약 등 상담 채널로의 전환이 빠르고 명확해야 합니다.</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* 방문자가 가장 먼저 원하는 정보 */}
        <SectionBlock title="방문자가 가장 먼저 확인하는 것" subtitle="실제 부동산 사이트 방문자의 핵심 목적">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "어떤 지역·어떤 거래를 전문으로 하는지",
              "믿을 만한 중개사무소인지 (등록정보, 대표 경력)",
              "원하는 매물 유형이 있는지",
              "지금 바로 상담/전화/문의할 수 있는지",
              "사무소 위치·주차·방문 상담 정보",
              "지역 시세·거래 정보",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-muted rounded-md">
                <span className="text-trust font-bold text-sm mt-0.5">{i + 1}</span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* 핵심 디자인 원칙 */}
        <SectionBlock title="핵심 디자인 원칙" subtitle="부동산 업종에 맞는 디자인 방향">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "신뢰감 우선", "정보 구조 명확", "모바일 최적화", "과장 표현 금지",
              "지역성 강조", "상담 전환 중심", "깔끔한 여백", "스캔 가능한 구조"
            ].map((item) => (
              <div key={item} className="text-center p-3 bg-card border border-border rounded-lg">
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* 빠른 이동 카드 */}
        <SectionBlock title="가이드 전체 구조" subtitle="각 섹션으로 빠르게 이동하세요">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navItems.filter(n => n.path !== "/").map((item) => (
              <Link key={item.path} to={item.path} className="guide-card group hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </SectionBlock>

        {/* 시스템 흐름 */}
        <SectionBlock title="브리프 → 청사진 → 구현 규칙 흐름" subtitle="고객사 프로젝트 제작 프로세스">
          <div className="flex flex-col md:flex-row gap-4">
            {[
              { step: "1", title: "Client Brief", desc: "고객사 정보·자산·요구사항 입력" },
              { step: "2", title: "Site Blueprint", desc: "브리프 기반 사이트 구조·페이지 자동 생성" },
              { step: "3", title: "Impl. Rules", desc: "조건별 제작 규칙·우선순위 도출" },
            ].map((item) => (
              <div key={item.step} className="flex-1 guide-card text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* 공개용 부동산 사이트 대표 구조 */}
        <SectionBlock title="공개용 부동산 사이트 대표 구조" subtitle="실제 고객사 사이트의 권장 섹션 순서">
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {[
              { name: "Hero", desc: "지역·거래 전문성 즉시 전달" },
              { name: "Quick Info Bar", desc: "전화 / 카카오 / 위치 / 상담시간" },
              { name: "지역/거래유형 바로가기", desc: "방문자 목적별 빠른 진입" },
              { name: "대표 매물/주력 서비스", desc: "핵심 매물 또는 서비스 노출" },
              { name: "대표 공인중개사/사무소 소개", desc: "신뢰 형성 핵심 섹션" },
              { name: "신뢰 요소", desc: "등록정보, 후기, 지역 전문성" },
              { name: "상담/문의 CTA", desc: "명확한 행동 유도" },
              { name: "FAQ", desc: "자주 묻는 질문 대응" },
              { name: "Footer", desc: "사업자 정보, 면책, 연락처" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <span className="text-xs font-mono text-muted-foreground w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium text-foreground text-sm w-48">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* 포괄 대상 */}
        <SectionBlock title="포괄 대상 범위" subtitle="이 가이드 시스템이 지원하는 부동산 세부 유형">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "지역 공인중개사무소", "아파트/오피스텔 전월세", "매매 중심 중개", "상가/사무실 중개",
              "신축 분양 상담형", "원룸/투룸/다가구", "토지/전원주택", "소규모 다지점 브랜드"
            ].map((item) => (
              <div key={item} className="p-3 bg-accent rounded-lg text-center">
                <span className="text-sm font-medium text-accent-foreground">{item}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* 모바일 우선 */}
        <SectionBlock title="모바일 우선 설계" subtitle="부동산 사이트 방문의 70% 이상이 모바일">
          <div className="guide-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">모바일 핵심 원칙</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 전화 버튼 터치 한 번으로 바로 연결</li>
                  <li>• 카카오/문의 하단 고정 CTA 바</li>
                  <li>• 지도/길찾기 원터치 실행</li>
                  <li>• 폼 최소 필드 구성</li>
                  <li>• 매물 카드 스와이프 가능 구조</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">하단 고정 CTA 바 구성</h3>
                <div className="flex gap-2 bg-primary rounded-lg p-3 justify-center">
                  <div className="flex items-center gap-1 text-primary-foreground text-xs"><Phone className="h-4 w-4" /> 전화</div>
                  <div className="flex items-center gap-1 text-primary-foreground text-xs"><MessageCircle className="h-4 w-4" /> 카카오</div>
                  <div className="flex items-center gap-1 text-primary-foreground text-xs"><MapPin className="h-4 w-4" /> 길찾기</div>
                </div>
              </div>
            </div>
          </div>
        </SectionBlock>
      </div>
    </>
  );
};

export default Index;
