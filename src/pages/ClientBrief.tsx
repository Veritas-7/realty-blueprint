import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { SummaryCard } from "@/components/guide/SummaryCard";
import { Download, Upload, RotateCcw, Sparkles, Save, RefreshCw, AlertTriangle, Info } from "lucide-react";
import { useClientBrief } from "@/hooks/use-client-brief";
import { getAssetCompleteness } from "@/lib/brief-analysis";
import {
  type ClientBrief,
  SCHEMA_VERSION,
  PROPERTY_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
  PROPERTY_CATEGORY_OPTIONS,
  CONSULTATION_CHANNEL_OPTIONS,
  PAGE_OPTIONS,
  CTA_OPTIONS,
  BRAND_TONE_OPTIONS,
} from "@/data/briefSchema";

const InputField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
  </div>
);

const TextAreaField = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
    <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
  </div>
);

const CheckboxGroup = ({ label, selected, options, onToggle }: { label: string; selected: string[]; options: string[]; onToggle: (v: string) => void }) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button key={opt} onClick={() => onToggle(opt)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`}>
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const BoolField = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
  <button onClick={onChange} className="flex items-center gap-2 text-sm text-left">
    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${checked ? "bg-trust border-trust" : "border-border"}`}>
      {checked && <span className="text-trust-foreground text-xs">✓</span>}
    </div>
    <span className="text-foreground">{label}</span>
  </button>
);

const ClientBriefPage = () => {
  const {
    brief, saveStatus, lastSaved, loadError, loadWarning, missingFields, siteType,
    update, toggleArray, fillExample, resetAll, exportJSON, importJSON, retrySave,
  } = useClientBrief();

  const assets = getAssetCompleteness(brief);
  const errors = missingFields.filter((f) => f.severity === "error");
  const warnings = missingFields.filter((f) => f.severity === "warning");

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await importJSON(file);
    e.target.value = "";
  };

  return (
    <>
      <PageHeader title="Client Brief 도구" description="고객사 정보를 입력하고 저장합니다. 이 브리프를 기반으로 Site Blueprint와 Implementation Rules가 자동 생성됩니다." />
      <div className="guide-container">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button onClick={fillExample} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80"><Sparkles className="h-3.5 w-3.5" />예시 데이터</button>
          <button onClick={resetAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80"><RotateCcw className="h-3.5 w-3.5" />초기화</button>
          <button onClick={exportJSON} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80"><Download className="h-3.5 w-3.5" />JSON 내보내기</button>
          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80 cursor-pointer">
            <Upload className="h-3.5 w-3.5" />JSON 불러오기
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            {saveStatus === "saved" && <><Save className="h-3.5 w-3.5 text-trust" />저장됨</>}
            {saveStatus === "saving" && <><Save className="h-3.5 w-3.5 animate-pulse" />저장 중...</>}
            {saveStatus === "error" && (
              <button onClick={retrySave} className="flex items-center gap-1 text-destructive hover:underline">
                <RefreshCw className="h-3.5 w-3.5" />저장 실패 — 재시도
              </button>
            )}
            {lastSaved && <span>({new Date(lastSaved).toLocaleString("ko-KR")})</span>}
          </div>
        </div>

        {loadError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div>
              <strong>불러오기 오류:</strong> {loadError}
            </div>
          </div>
        )}

        {loadWarning && (
          <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-md text-sm text-foreground flex items-start gap-2">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-warning" />
            <div>
              <strong>마이그레이션 알림:</strong> {loadWarning}
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-foreground">
            <strong>필수 누락:</strong> {errors.map((f) => f.label).join(", ")}
          </div>
        )}
        {warnings.length > 0 && (
          <div className="mb-6 p-3 bg-warning/10 border border-warning/20 rounded-md text-sm text-foreground">
            <strong>권장 누락:</strong> {warnings.map((f) => f.label).join(", ")}
          </div>
        )}

        {/* Site type preview */}
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-foreground">예상 사이트 유형:</span>
            <StatusBadge variant="info">{siteType.type}</StatusBadge>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-background rounded">점수: {siteType.score}</span>
          </div>
          <p className="text-xs text-muted-foreground">판별 근거: {siteType.reasoning}</p>
        </div>

        {/* Form sections */}
        <SectionBlock title="기본 정보">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="상호명" value={brief.businessName} onChange={(v) => update("businessName", v)} placeholder="OO공인중개사사무소" />
            <InputField label="브랜드명" value={brief.brandName} onChange={(v) => update("brandName", v)} placeholder="OO부동산" />
            <InputField label="주력 지역" value={brief.primaryRegion} onChange={(v) => update("primaryRegion", v)} placeholder="서울특별시 마포구" />
            <InputField label="전화번호" value={brief.phone} onChange={(v) => update("phone", v)} placeholder="02-000-0000" />
            <InputField label="주소" value={brief.address} onChange={(v) => update("address", v)} placeholder="서울특별시 마포구 ..." />
            <InputField label="상담시간" value={brief.consultationHours} onChange={(v) => update("consultationHours", v)} placeholder="평일 09:00~18:00" />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">지점 유형</label>
              <div className="flex gap-2">
                {(["single", "multi"] as const).map((t) => (
                  <button key={t} onClick={() => update("branchType", t)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border ${brief.branchType === t ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border"}`}>
                    {t === "single" ? "단일 지점" : "다지점"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="부동산 유형/거래">
          <div className="space-y-4">
            <CheckboxGroup label="부동산 유형" selected={brief.propertyTypes} options={PROPERTY_TYPE_OPTIONS} onToggle={(v) => toggleArray("propertyTypes", v)} />
            <CheckboxGroup label="거래 유형" selected={brief.transactionTypes} options={TRANSACTION_TYPE_OPTIONS} onToggle={(v) => toggleArray("transactionTypes", v)} />
            <CheckboxGroup label="부동산 카테고리" selected={brief.propertyCategories} options={PROPERTY_CATEGORY_OPTIONS} onToggle={(v) => toggleArray("propertyCategories", v)} />
            <CheckboxGroup label="상담 채널" selected={brief.consultationChannels} options={CONSULTATION_CHANNEL_OPTIONS} onToggle={(v) => toggleArray("consultationChannels", v)} />
          </div>
        </SectionBlock>

        <SectionBlock title="보유 자산">
          <div className="mb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span>자산 완비율: {assets.owned}/{assets.total} ({assets.pct}%)</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-trust rounded-full transition-all duration-300" style={{ width: `${assets.pct}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BoolField label="대표 공인중개사 정보 보유" checked={brief.hasRepresentativeInfo} onChange={() => update("hasRepresentativeInfo", !brief.hasRepresentativeInfo)} />
            <BoolField label="등록정보 공개 가능" checked={brief.hasRegistrationInfo} onChange={() => update("hasRegistrationInfo", !brief.hasRegistrationInfo)} />
            <BoolField label="대표 매물/주력 매물 보유" checked={brief.hasListings} onChange={() => update("hasListings", !brief.hasListings)} />
            <BoolField label="고객 후기 보유" checked={brief.hasReviews} onChange={() => update("hasReviews", !brief.hasReviews)} />
            <BoolField label="지역 콘텐츠 보유" checked={brief.hasRegionalContent} onChange={() => update("hasRegionalContent", !brief.hasRegionalContent)} />
            <BoolField label="사무소/시설 사진 보유" checked={brief.hasOfficePhotos} onChange={() => update("hasOfficePhotos", !brief.hasOfficePhotos)} />
          </div>
        </SectionBlock>

        <SectionBlock title="사이트 요구사항">
          <div className="space-y-4">
            <CheckboxGroup label="필수 페이지" selected={brief.requiredPages} options={PAGE_OPTIONS} onToggle={(v) => toggleArray("requiredPages", v)} />
            <CheckboxGroup label="핵심 CTA 우선순위" selected={brief.primaryCTA} options={CTA_OPTIONS} onToggle={(v) => toggleArray("primaryCTA", v)} />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">브랜드 톤</label>
              <div className="flex flex-wrap gap-2">
                {BRAND_TONE_OPTIONS.map((tone) => (
                  <button key={tone} onClick={() => update("brandTone", tone)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border ${brief.brandTone === tone ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`}>
                    {tone}
                  </button>
                ))}
              </div>
            </div>
            <TextAreaField label="금지 표현" value={brief.prohibitedExpressions} onChange={(v) => update("prohibitedExpressions", v)} placeholder="수익 보장, 무조건 상승 등..." />
            <TextAreaField label="경쟁사 대비 포지션 메모" value={brief.competitorNotes} onChange={(v) => update("competitorNotes", v)} placeholder="경쟁 현황, 차별화 포인트 등..." />
          </div>
        </SectionBlock>

        {/* Brief summary */}
        <SectionBlock title="브리프 요약">
          <div className="guide-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong className="text-foreground">상호:</strong> <span className="text-muted-foreground">{brief.businessName || "미입력"}</span></div>
              <div><strong className="text-foreground">지역:</strong> <span className="text-muted-foreground">{brief.primaryRegion || "미입력"}</span></div>
              <div><strong className="text-foreground">부동산 유형:</strong> <span className="text-muted-foreground">{brief.propertyTypes.join(", ") || "미선택"}</span></div>
              <div><strong className="text-foreground">거래 유형:</strong> <span className="text-muted-foreground">{brief.transactionTypes.join(", ") || "미선택"}</span></div>
              <div><strong className="text-foreground">지점:</strong> <span className="text-muted-foreground">{brief.branchType === "single" ? "단일" : "다지점"}</span></div>
              <div><strong className="text-foreground">핵심 CTA:</strong> <span className="text-muted-foreground">{brief.primaryCTA.join(", ") || "미선택"}</span></div>
              <div><strong className="text-foreground">사이트 유형:</strong> <StatusBadge variant="info">{siteType.type}</StatusBadge> <span className="text-xs text-muted-foreground ml-1">(점수 {siteType.score})</span></div>
              <div><strong className="text-foreground">자산 완비율:</strong> <span className="text-muted-foreground">{assets.pct}%</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
              스키마 버전: {SCHEMA_VERSION}
            </div>
          </div>
        </SectionBlock>

        <PrevNextNav currentPath="/client-brief" />
      </div>
    </>
  );
};

export default ClientBriefPage;
