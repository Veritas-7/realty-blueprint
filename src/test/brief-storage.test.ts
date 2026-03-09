import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadBrief, saveBrief, parseBriefFromJSON } from "@/lib/brief-storage";
import { exampleBrief, defaultBrief, SCHEMA_VERSION } from "@/data/briefSchema";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(global, "localStorage", { value: localStorageMock });

describe("brief-storage", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("loadBrief returns null when empty", () => {
    const result = loadBrief();
    expect(result.brief).toBeNull();
    expect(result.error).toBeNull();
  });

  it("saveBrief and loadBrief roundtrip", () => {
    const saveResult = saveBrief(exampleBrief);
    expect(saveResult.success).toBe(true);
    expect(saveResult.lastSaved).toBeTruthy();

    const loadResult = loadBrief();
    expect(loadResult.brief).toBeTruthy();
    expect(loadResult.brief!.businessName).toBe(exampleBrief.businessName);
    expect(loadResult.error).toBeNull();
  });

  it("loadBrief handles invalid JSON", () => {
    localStorageMock.getItem.mockReturnValueOnce("not valid json {{{");
    const result = loadBrief();
    expect(result.brief).toBeNull();
    expect(result.error).toContain("JSON");
  });

  it("loadBrief handles invalid shape", () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ foo: "bar" }));
    const result = loadBrief();
    expect(result.brief).toBeNull();
    expect(result.error).toContain("형식");
  });

  it("loadBrief attempts migration on version mismatch", () => {
    const oldBrief = { ...exampleBrief, schemaVersion: "0.0.1" };
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(oldBrief));
    const result = loadBrief();
    // Should attempt migration and return with warning
    expect(result.brief).toBeTruthy();
    expect(result.warning).toContain("마이그레이션");
    expect(result.error).toBeNull();
  });

  it("parseBriefFromJSON handles valid JSON", () => {
    const json = JSON.stringify(exampleBrief);
    const result = parseBriefFromJSON(json);
    expect(result.brief).toBeTruthy();
    expect(result.error).toBeNull();
  });

  it("parseBriefFromJSON handles invalid JSON string", () => {
    const result = parseBriefFromJSON("not json");
    expect(result.brief).toBeNull();
    expect(result.error).toContain("파싱");
  });

  it("parseBriefFromJSON handles invalid shape", () => {
    const result = parseBriefFromJSON(JSON.stringify({ random: true }));
    expect(result.brief).toBeNull();
    expect(result.error).toContain("유효하지 않은");
  });

  it("parseBriefFromJSON handles version mismatch with migration", () => {
    const oldBrief = { ...exampleBrief, schemaVersion: "0.5.0" };
    const result = parseBriefFromJSON(JSON.stringify(oldBrief));
    expect(result.brief).toBeTruthy();
    expect(result.warning).toContain("마이그레이션");
  });
});
