import { useState, useEffect } from "react";
import { type ClientBrief, SCHEMA_VERSION } from "@/data/briefSchema";
import { loadBrief } from "@/lib/brief-storage";

export const useBrief = () => {
  const [brief, setBrief] = useState<ClientBrief | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const result = loadBrief();
    if (result.error) {
      setError(result.error);
    } else {
      setBrief(result.brief);
    }
  }, []);

  return { brief, error };
};
