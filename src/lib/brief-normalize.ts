import { type ClientBrief, SCHEMA_VERSION, defaultBrief } from "@/data/briefSchema";

export function normalizeBrief(raw: ClientBrief): ClientBrief {
  return {
    schemaVersion: SCHEMA_VERSION,
    lastSaved: raw.lastSaved ?? null,
    businessName: (raw.businessName ?? "").trim(),
    brandName: (raw.brandName ?? "").trim(),
    propertyTypes: dedup(raw.propertyTypes ?? []),
    primaryRegion: (raw.primaryRegion ?? "").trim(),
    transactionTypes: dedup(raw.transactionTypes ?? []),
    propertyCategories: dedup(raw.propertyCategories ?? []),
    branchType: raw.branchType === "multi" ? "multi" : "single",
    address: (raw.address ?? "").trim(),
    phone: (raw.phone ?? "").trim(),
    consultationHours: (raw.consultationHours ?? "").trim(),
    consultationChannels: dedup(raw.consultationChannels ?? []),
    hasRepresentativeInfo: !!raw.hasRepresentativeInfo,
    hasRegistrationInfo: !!raw.hasRegistrationInfo,
    hasListings: !!raw.hasListings,
    hasReviews: !!raw.hasReviews,
    hasRegionalContent: !!raw.hasRegionalContent,
    hasOfficePhotos: !!raw.hasOfficePhotos,
    requiredPages: dedup(raw.requiredPages ?? []),
    primaryCTA: dedup(raw.primaryCTA ?? []),
    brandTone: (raw.brandTone ?? "").trim(),
    prohibitedExpressions: (raw.prohibitedExpressions ?? "").trim(),
    competitorNotes: (raw.competitorNotes ?? "").trim(),
  };
}

function dedup(arr: string[]): string[] {
  return [...new Set(arr.map((s) => s.trim()).filter(Boolean))];
}

export function validateBriefShape(obj: unknown): obj is ClientBrief {
  if (!obj || typeof obj !== "object") return false;
  const o = obj as Record<string, unknown>;
  return (
    typeof o.schemaVersion === "string" &&
    typeof o.businessName === "string" &&
    Array.isArray(o.propertyTypes) &&
    Array.isArray(o.transactionTypes)
  );
}

export interface MissingField {
  field: string;
  label: string;
  severity: "error" | "warning";
}

export function getMissingFields(brief: ClientBrief): MissingField[] {
  const missing: MissingField[] = [];
  if (!brief.businessName) missing.push({ field: "businessName", label: "상호명", severity: "error" });
  if (!brief.primaryRegion) missing.push({ field: "primaryRegion", label: "주력 지역", severity: "error" });
  if (brief.transactionTypes.length === 0) missing.push({ field: "transactionTypes", label: "거래 유형", severity: "error" });
  if (!brief.phone) missing.push({ field: "phone", label: "전화번호", severity: "error" });
  if (!brief.address) missing.push({ field: "address", label: "주소", severity: "warning" });
  if (brief.propertyTypes.length === 0) missing.push({ field: "propertyTypes", label: "부동산 유형", severity: "warning" });
  if (brief.primaryCTA.length === 0) missing.push({ field: "primaryCTA", label: "핵심 CTA", severity: "warning" });
  if (!brief.brandTone) missing.push({ field: "brandTone", label: "브랜드 톤", severity: "warning" });
  return missing;
}
