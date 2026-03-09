import { describe, it, expect } from "vitest";
import { determineSiteType, classifyPages, getProofStatuses, getBudgetTiers, CORE_BLOCKS } from "@/lib/brief-analysis";
import { defaultBrief, exampleBrief } from "@/data/briefSchema";

describe("brief-analysis", () => {
  it("determines site type for example brief", () => {
    const result = determineSiteType(exampleBrief);
    expect(result.type).toBe("매물탐색형");
    expect(result.score).toBeGreaterThan(0);
  });

  it("falls back to 상담전환형 for empty brief", () => {
    const result = determineSiteType(defaultBrief);
    expect(result.type).toBe("상담전환형");
  });

  it("detects 분양상담형", () => {
    const brief = { ...defaultBrief, propertyCategories: ["분양"] };
    expect(determineSiteType(brief).type).toBe("분양상담형");
  });

  it("detects 다지점형", () => {
    const brief = { ...defaultBrief, branchType: "multi" as const };
    expect(determineSiteType(brief).type).toBe("다지점형");
  });

  it("classifies pages based on brief", () => {
    const pages = classifyPages(exampleBrief);
    expect(pages.find((p) => p.name === "홈")?.classification).toBe("필수");
    expect(pages.find((p) => p.name === "매물 리스트")?.classification).toBe("필수");
  });

  it("prohibits listing pages when no listings", () => {
    const pages = classifyPages({ ...defaultBrief });
    expect(pages.find((p) => p.name === "매물 리스트")?.classification).toBe("금지");
  });

  it("returns proof statuses", () => {
    const statuses = getProofStatuses(exampleBrief);
    expect(statuses.length).toBe(6);
    expect(statuses.every((s) => s.status === "보유")).toBe(true);
  });

  it("returns budget tiers", () => {
    const tiers = getBudgetTiers(exampleBrief);
    expect(tiers.length).toBe(3);
    expect(tiers[0].label).toBe("최소 구성");
  });

  it("has core blocks defined", () => {
    expect(CORE_BLOCKS.length).toBeGreaterThan(0);
  });
});
