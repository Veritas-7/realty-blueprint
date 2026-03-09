import { describe, it, expect } from "vitest";
import { normalizeBrief, validateBriefShape, getMissingFields } from "@/lib/brief-normalize";
import { defaultBrief, exampleBrief } from "@/data/briefSchema";

describe("brief-normalize", () => {
  it("validates correct brief shape", () => {
    expect(validateBriefShape(exampleBrief)).toBe(true);
  });

  it("rejects invalid shapes", () => {
    expect(validateBriefShape(null)).toBe(false);
    expect(validateBriefShape({})).toBe(false);
    expect(validateBriefShape({ schemaVersion: "1" })).toBe(false);
  });

  it("normalizes brief by trimming strings", () => {
    const raw = { ...defaultBrief, businessName: "  test  ", primaryRegion: " 서울 " };
    const result = normalizeBrief(raw);
    expect(result.businessName).toBe("test");
    expect(result.primaryRegion).toBe("서울");
  });

  it("deduplicates arrays", () => {
    const raw = { ...defaultBrief, propertyTypes: ["아파트", "아파트", "빌라"] };
    const result = normalizeBrief(raw);
    expect(result.propertyTypes).toEqual(["아파트", "빌라"]);
  });

  it("returns missing fields for empty brief", () => {
    const missing = getMissingFields(defaultBrief);
    expect(missing.length).toBeGreaterThan(0);
    expect(missing.some((f) => f.field === "businessName")).toBe(true);
  });

  it("returns no errors for complete brief", () => {
    const missing = getMissingFields(exampleBrief);
    const errors = missing.filter((f) => f.severity === "error");
    expect(errors.length).toBe(0);
  });
});
