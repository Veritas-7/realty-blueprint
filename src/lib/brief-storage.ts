import { type ClientBrief, SCHEMA_VERSION } from "@/data/briefSchema";
import { normalizeBrief, validateBriefShape } from "./brief-normalize";

const STORAGE_KEY = "re-client-brief";
const MAX_RETRIES = 3;

export interface LoadResult {
  brief: ClientBrief | null;
  error: string | null;
  warning: string | null;
}

export function loadBrief(): LoadResult {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { brief: null, error: null, warning: null };

    let parsed: unknown;
    try {
      parsed = JSON.parse(stored);
    } catch {
      return { brief: null, error: "저장된 브리프를 불러올 수 없습니다. JSON 형식이 올바르지 않습니다.", warning: null };
    }

    if (!validateBriefShape(parsed)) {
      return { brief: null, error: "저장된 브리프의 형식이 올바르지 않습니다. (필수 필드 누락)", warning: null };
    }

    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      // Attempt migration: normalize with current schema defaults
      try {
        const migrated = normalizeBrief(parsed);
        return {
          brief: migrated,
          error: null,
          warning: `스키마 버전이 다릅니다 (v${parsed.schemaVersion} → v${SCHEMA_VERSION}). 데이터를 자동 마이그레이션했습니다. 내용을 확인해주세요.`,
        };
      } catch {
        return { brief: null, error: `스키마 버전이 다릅니다 (v${parsed.schemaVersion}). 데이터를 초기화하거나 다시 입력해주세요.`, warning: null };
      }
    }

    return { brief: normalizeBrief(parsed), error: null, warning: null };
  } catch {
    return { brief: null, error: "저장된 브리프를 불러올 수 없습니다.", warning: null };
  }
}

export function saveBrief(brief: ClientBrief, retries = MAX_RETRIES): { success: boolean; lastSaved: string | null } {
  const normalized = normalizeBrief(brief);
  const toSave = { ...normalized, lastSaved: new Date().toISOString() };

  for (let i = 0; i < retries; i++) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      return { success: true, lastSaved: toSave.lastSaved };
    } catch {
      if (i === retries - 1) return { success: false, lastSaved: null };
    }
  }
  return { success: false, lastSaved: null };
}

export function clearBrief(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportBriefJSON(brief: ClientBrief): void {
  const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "client-brief.json";
  a.click();
  URL.revokeObjectURL(url);
}

export interface ImportResult {
  brief: ClientBrief | null;
  error: string | null;
  warning: string | null;
}

export function parseBriefFromJSON(jsonString: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    return { brief: null, error: "JSON 파일을 파싱할 수 없습니다.", warning: null };
  }

  if (!validateBriefShape(parsed)) {
    return { brief: null, error: "유효하지 않은 브리프 파일입니다. (필수 필드 누락: schemaVersion, businessName, propertyTypes, transactionTypes)", warning: null };
  }

  if ((parsed as ClientBrief).schemaVersion !== SCHEMA_VERSION) {
    try {
      const migrated = normalizeBrief(parsed as ClientBrief);
      return {
        brief: migrated,
        error: null,
        warning: `스키마 버전이 다릅니다 (v${(parsed as ClientBrief).schemaVersion} → v${SCHEMA_VERSION}). 자동 마이그레이션 완료.`,
      };
    } catch {
      return { brief: null, error: `스키마 버전이 다릅니다 (v${(parsed as ClientBrief).schemaVersion}).`, warning: null };
    }
  }

  return { brief: normalizeBrief(parsed as ClientBrief), error: null, warning: null };
}
