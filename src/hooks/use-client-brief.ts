import { useState, useEffect, useCallback, useRef } from "react";
import { type ClientBrief, defaultBrief, exampleBrief } from "@/data/briefSchema";
import { loadBrief, saveBrief, exportBriefJSON, parseBriefFromJSON } from "@/lib/brief-storage";
import { getMissingFields, type MissingField } from "@/lib/brief-normalize";
import { determineSiteType, type SiteTypeResult } from "@/lib/brief-analysis";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface UseClientBriefReturn {
  brief: ClientBrief;
  saveStatus: SaveStatus;
  lastSaved: string | null;
  loadError: string | null;
  loadWarning: string | null;
  missingFields: MissingField[];
  siteType: SiteTypeResult;

  update: (field: keyof ClientBrief, value: unknown) => void;
  toggleArray: (field: keyof ClientBrief, value: string) => void;
  fillExample: () => void;
  resetAll: () => void;
  exportJSON: () => void;
  importJSON: (file: File) => Promise<string | null>;
  retrySave: () => void;
}

export const useClientBrief = (): UseClientBriefReturn => {
  const [brief, setBrief] = useState<ClientBrief>(defaultBrief);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadWarning, setLoadWarning] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load on mount
  useEffect(() => {
    const result = loadBrief();
    if (result.error) {
      setLoadError(result.error);
    } else if (result.brief) {
      setBrief(result.brief);
      setLastSaved(result.brief.lastSaved);
      setSaveStatus("saved");
    }
    if (result.warning) {
      setLoadWarning(result.warning);
    }
  }, []);

  // Autosave with debounce
  const doSave = useCallback((b: ClientBrief) => {
    setSaveStatus("saving");
    const result = saveBrief(b);
    if (result.success) {
      setLastSaved(result.lastSaved);
      setSaveStatus("saved");
    } else {
      setSaveStatus("error");
    }
  }, []);

  const scheduleSave = useCallback((b: ClientBrief) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSaveStatus("saving");
    debounceRef.current = setTimeout(() => doSave(b), 800);
  }, [doSave]);

  const update = useCallback((field: keyof ClientBrief, value: unknown) => {
    setBrief((prev) => {
      const next = { ...prev, [field]: value };
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const toggleArray = useCallback((field: keyof ClientBrief, value: string) => {
    setBrief((prev) => {
      const arr = prev[field] as string[];
      const next = { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
      scheduleSave(next);
      return next;
    });
  }, [scheduleSave]);

  const fillExample = useCallback(() => {
    setBrief(exampleBrief);
    scheduleSave(exampleBrief);
    setLoadWarning(null);
  }, [scheduleSave]);

  const resetAll = useCallback(() => {
    setBrief(defaultBrief);
    scheduleSave(defaultBrief);
    setLoadError(null);
    setLoadWarning(null);
  }, [scheduleSave]);

  const exportJSON = useCallback(() => {
    exportBriefJSON(brief);
  }, [brief]);

  const importJSON = useCallback(async (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = parseBriefFromJSON(ev.target?.result as string);
        if (result.error) {
          setLoadError(result.error);
          setLoadWarning(null);
          resolve(result.error);
        } else if (result.brief) {
          setBrief(result.brief);
          scheduleSave(result.brief);
          setLoadError(null);
          setLoadWarning(result.warning);
          resolve(null);
        }
      };
      reader.onerror = () => {
        setLoadError("파일을 읽을 수 없습니다.");
        resolve("파일을 읽을 수 없습니다.");
      };
      reader.readAsText(file);
    });
  }, [scheduleSave]);

  const retrySave = useCallback(() => {
    doSave(brief);
  }, [brief, doSave]);

  const missingFields = getMissingFields(brief);
  const siteType = determineSiteType(brief);

  return {
    brief, saveStatus, lastSaved, loadError, loadWarning, missingFields, siteType,
    update, toggleArray, fillExample, resetAll, exportJSON, importJSON, retrySave,
  };
};
