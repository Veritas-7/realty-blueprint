import { describe, it, expect } from "vitest";
import { getAllBlueprints, generateLovablePrompt } from "@/lib/blueprint-engine";
import { exampleBrief, defaultBrief } from "@/data/briefSchema";

describe("blueprint-engine", () => {
  it("generates blueprints for example brief", () => {
    const blueprints = getAllBlueprints(exampleBrief);
    expect(blueprints.length).toBeGreaterThan(5);
    expect(blueprints[0].pageTitle).toBe("홈페이지");
  });

  it("generates fewer blueprints for minimal brief", () => {
    const full = getAllBlueprints(exampleBrief);
    const minimal = getAllBlueprints(defaultBrief);
    expect(minimal.length).toBeLessThan(full.length);
  });

  it("each blueprint has required fields", () => {
    const blueprints = getAllBlueprints(exampleBrief);
    for (const bp of blueprints) {
      expect(bp.pageTitle).toBeTruthy();
      expect(bp.sections.length).toBeGreaterThan(0);
      expect(bp.primaryCTA.length).toBeGreaterThan(0);
      expect(bp.metaTitle).toBeTruthy();
      expect(bp.jsonLdTypes.length).toBeGreaterThan(0);
    }
  });

  it("generates lovable prompt with brief data", () => {
    const prompt = generateLovablePrompt(exampleBrief);
    expect(prompt).toContain("마포구");
    expect(prompt).toContain("한강부동산");
    expect(prompt).toContain("매물탐색형");
  });

  it("includes listings blueprint when hasListings", () => {
    const blueprints = getAllBlueprints(exampleBrief);
    expect(blueprints.some((b) => b.pageTitle === "매물 리스트")).toBe(true);
  });

  it("excludes listings blueprint when no listings", () => {
    const blueprints = getAllBlueprints(defaultBrief);
    expect(blueprints.some((b) => b.pageTitle === "매물 리스트")).toBe(false);
  });

  it("includes bunyang blueprint when propertyCategories includes 분양", () => {
    const bunyangBrief = { ...exampleBrief, propertyCategories: ["분양"] };
    const blueprints = getAllBlueprints(bunyangBrief);
    expect(blueprints.some((b) => b.pageTitle === "분양/신축 상담")).toBe(true);
  });

  it("excludes bunyang blueprint when no 분양 category", () => {
    const blueprints = getAllBlueprints(exampleBrief);
    expect(blueprints.some((b) => b.pageTitle === "분양/신축 상담")).toBe(false);
  });

  it("lovable prompt includes structured sections", () => {
    const prompt = generateLovablePrompt(exampleBrief);
    expect(prompt).toContain("### 1. 사이트 개요");
    expect(prompt).toContain("### 4. 페이지 구성");
    expect(prompt).toContain("### 8. 핵심 규칙");
  });
});
