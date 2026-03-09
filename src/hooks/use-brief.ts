import { useState, useEffect } from "react";
import { type ClientBrief, SCHEMA_VERSION } from "@/data/briefSchema";

const STORAGE_KEY = "re-client-brief";

export const useBrief = () => {
  const [brief, setBrief] = useState<ClientBrief | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.schemaVersion === SCHEMA_VERSION) {
          setBrief(parsed);
        } else {
          setError("브리프 스키마 버전이 다릅니다. Client Brief 페이지에서 다시 작성해주세요.");
        }
      }
    } catch {
      setError("저장된 브리프를 불러올 수 없습니다.");
    }
  }, []);

  return { brief, error };
};
