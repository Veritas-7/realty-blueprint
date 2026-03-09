import { useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/guide/PageHeader";
import { SectionBlock } from "@/components/guide/SectionBlock";
import { PrevNextNav } from "@/components/guide/PrevNextNav";
import { StatusBadge } from "@/components/guide/StatusBadge";
import { Download, Upload, RotateCcw, Sparkles, Save } from "lucide-react";
import {
  type ClientBrief,
  defaultBrief,
  exampleBrief,
  SCHEMA_VERSION,
  PROPERTY_TYPE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
  PROPERTY_CATEGORY_OPTIONS,
  CONSULTATION_CHANNEL_OPTIONS,
  PAGE_OPTIONS,
  CTA_OPTIONS,
  BRAND_TONE_OPTIONS,
} from "@/data/briefSchema";

const STORAGE_KEY = "re-client-brief";

const ClientBriefPage = () => {
  const [brief, setBrief] = useState<ClientBrief>(defaultBrief);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error" | "idle">("idle");
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.schemaVersion === SCHEMA_VERSION) {
          setBrief(parsed);
          setLastSaved(parsed.lastSaved);
          setSaveStatus("saved");
        } else {
          setLoadError("스키마 버전이 다릅니다 (v" + parsed.schemaVersion + "). 데이터를 초기화하거나 다시 입력해주세요.");
        }
      }
    } catch {
      setLoadError("저장된 브리프를 불러올 수 없습니다. JSON 형식이 올바르지 않습니다.");
    }
  }, []);

  useEffect(() => {
    if (saveStatus === "idle") return;
    const timer = setTimeout(() => {
      try {
        setSaveStatus("saving");
        const toSave = { ...brief, lastSaved: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        setLastSaved(toSave.lastSaved);
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [brief]);

  const update = useCallback((field: keyof ClientBrief, value: unknown) => {
    setBrief((prev) => ({ ...prev, [field]: value }));
    setSaveStatus("saving");
  }, []);

  const toggleArray = useCallback((field: keyof ClientBrief, value: string) => {
    setBrief((prev) => {
      const arr = prev[field] as string[];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
    setSaveStatus("saving");
  }, []);

  const fillExample = () => { setBrief(exampleBrief); setSaveStatus("saving"); };
  const resetAll = () => { setBrief(defaultBrief); setSaveStatus("saving"); setLoadError(null); };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "client-brief.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed.schemaVersion) { setLoadError("유효하지 않은 브리프 파일입니다."); return; }
        if (parsed.schemaVersion !== SCHEMA_VERSION) { setLoadError("스키마 버전이 다릅니다."); return; }
        setBrief(parsed);
        setSaveStatus("saving");
        setLoadError(null);
      } catch { setLoadError("JSON 파일을 파싱할 수 없습니다."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const missingFields: string[] = [];
  if (!brief.businessName) missingFields.push("상호명");
  if (!brief.primaryRegion) missingFields.push("주력 지역");
  if (brief.transactionTypes.length === 0) missingFields.push("거래 유형");
  if (!brief.phone) missingFields.push("전화번호");
  if (!brief.address) missingFields.push("주소");

  const InputField = ({ label, field, placeholder }: { label: string; field: keyof ClientBrief; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <input
        type="text"
        value={brief[field] as string}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );

  const TextAreaField = ({ label, field, placeholder }: { label: string; field: keyof ClientBrief; placeholder?: string }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <textarea
        value={brief[field] as string}
        onChange={(e) => update(field, e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y"
      />
    </div>
  );

  const CheckboxGroup = ({ label, field, options }: { label: string; field: keyof ClientBrief; options: string[] }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = (brief[field] as string[]).includes(opt);
          return (
            <button key={opt} onClick={() => toggleArray(field, opt)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:bg-muted"}`}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );

  const BoolField = ({ label, field }: { label: string; field: keyof ClientBrief }) => (
    <button onClick={() => update(field, !brief[field])}
      className="flex items-center gap-2 text-sm text-left">
      <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${brief[field] ? "bg-trust border-trust" : "border-border"}`}>
        {brief[field] && <span className="text-trust-foreground text-xs">✓</span>}
      </div>
      <span className="text-foreground">{label}</span>
    </button>
  );

  return (
    <>
      <PageHeader title="Client Brief 도구" description="고객사 정보를 입력하고 저장합니다. 이 브리프를 기반으로 Site Blueprint와 Implementation Rules가 자동 생성됩니다." />
      <div className="guide-container">
        {/* 도구 바 */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button onClick={fillExample} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80"><Sparkles className="h-3.5 w-3.5" />예시 데이터</button>
          <button onClick={resetAll} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80"><RotateCcw className="h-3.5 w-3.5" />초기화</button>
          <button onClick={exportJSON} className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80"><Download className="h-3.5 w-3.5" />JSON 내보내기</button>
          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-xs font-medium hover:bg-secondary/80 cursor-pointer">
            <Upload className="h-3.5 w-3.5" />JSON 불러오기
            <input type="file" accept=".json" onChange={importJSON} className="hidden" />
          </label>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            {saveStatus === "saved" && <><Save className="h-3.5 w-3.5 text-trust" />저장됨</>}
            {saveStatus === "saving" && <><Save className="h-3.5 w-3.5 animate-pulse" />저장 중...</>}
            {saveStatus === "error" && <span className="text-destructive">저장 실패</span>}
            {lastSaved && <span>({new Date(lastSaved).toLocaleString("ko-KR")})</span>}
          </div>
        </div>

        {loadError && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">{loadError}</div>
        )}

        {missingFields.length > 0 && (
          <div className="mb-6 p-3 bg-warning/10 border border-warning/20 rounded-md text-sm text-foreground">
            <strong>누락 항목:</strong> {missingFields.join(", ")}
          </div>
        )}

        {/* 폼 */}
        <SectionBlock title="기본 정보">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="상호명" field="businessName" placeholder="OO공인중개사사무소" />
            <InputField label="브랜드명" field="brandName" placeholder="OO부동산" />
            <InputField label="주력 지역" field="primaryRegion" placeholder="서울특별시 마포구" />
            <InputField label="전화번호" field="phone" placeholder="02-000-0000" />
            <InputField label="주소" field="address" placeholder="서울특별시 마포구 ..." />
            <InputField label="상담시간" field="consultationHours" placeholder="평일 09:00~18:00" />
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
            <CheckboxGroup label="부동산 유형" field="propertyTypes" options={PROPERTY_TYPE_OPTIONS} />
            <CheckboxGroup label="거래 유형" field="transactionTypes" options={TRANSACTION_TYPE_OPTIONS} />
            <CheckboxGroup label="부동산 카테고리" field="propertyCategories" options={PROPERTY_CATEGORY_OPTIONS} />
            <CheckboxGroup label="상담 채널" field="consultationChannels" options={CONSULTATION_CHANNEL_OPTIONS} />
          </div>
        </SectionBlock>

        <SectionBlock title="보유 자산">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BoolField label="대표 공인중개사 정보 보유" field="hasRepresentativeInfo" />
            <BoolField label="등록정보 공개 가능" field="hasRegistrationInfo" />
            <BoolField label="대표 매물/주력 매물 보유" field="hasListings" />
            <BoolField label="고객 후기 보유" field="hasReviews" />
            <BoolField label="지역 콘텐츠 보유" field="hasRegionalContent" />
            <BoolField label="사무소/시설 사진 보유" field="hasOfficePhotos" />
          </div>
        </SectionBlock>

        <SectionBlock title="사이트 요구사항">
          <div className="space-y-4">
            <CheckboxGroup label="필수 페이지" field="requiredPages" options={PAGE_OPTIONS} />
            <CheckboxGroup label="핵심 CTA 우선순위" field="primaryCTA" options={CTA_OPTIONS} />
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
            <TextAreaField label="금지 표현" field="prohibitedExpressions" placeholder="수익 보장, 무조건 상승 등..." />
            <TextAreaField label="경쟁사 대비 포지션 메모" field="competitorNotes" placeholder="경쟁 현황, 차별화 포인트 등..." />
          </div>
        </SectionBlock>

        {/* 브리프 요약 카드 */}
        <SectionBlock title="브리프 요약">
          <div className="guide-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong className="text-foreground">상호:</strong> <span className="text-muted-foreground">{brief.businessName || "미입력"}</span></div>
              <div><strong className="text-foreground">지역:</strong> <span className="text-muted-foreground">{brief.primaryRegion || "미입력"}</span></div>
              <div><strong className="text-foreground">부동산 유형:</strong> <span className="text-muted-foreground">{brief.propertyTypes.join(", ") || "미선택"}</span></div>
              <div><strong className="text-foreground">거래 유형:</strong> <span className="text-muted-foreground">{brief.transactionTypes.join(", ") || "미선택"}</span></div>
              <div><strong className="text-foreground">지점:</strong> <span className="text-muted-foreground">{brief.branchType === "single" ? "단일" : "다지점"}</span></div>
              <div><strong className="text-foreground">핵심 CTA:</strong> <span className="text-muted-foreground">{brief.primaryCTA.join(", ") || "미선택"}</span></div>
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
