import { describe, it, expect } from "vitest";
import { routeMeta, notFoundMeta, SITE_URL, generateBreadcrumbJsonLd, generateWebSiteJsonLd } from "@/data/seo-config";
import { navItems } from "@/data/navigation";

describe("seo-config", () => {
  it("all nav routes have SEO config with title and description", () => {
    for (const item of navItems) {
      const meta = routeMeta[item.path];
      expect(meta, `Missing SEO config for ${item.path}`).toBeDefined();
      expect(meta.title.length).toBeGreaterThan(0);
      expect(meta.description.length).toBeGreaterThan(0);
    }
  });

  it("tool routes have noindex robots", () => {
    const toolPaths = ["/client-brief", "/site-blueprint", "/implementation-rules"];
    for (const path of toolPaths) {
      expect(routeMeta[path].robots).toContain("noindex");
    }
  });

  it("guide routes do NOT have robots restriction", () => {
    const guidePaths = ["/", "/industry-overview", "/design-guide", "/seo-geo", "/checklist"];
    for (const path of guidePaths) {
      expect(routeMeta[path].robots).toBeUndefined();
    }
  });

  it("404 meta has noindex", () => {
    expect(notFoundMeta.robots).toContain("noindex");
  });

  it("404 canonical points to root", () => {
    expect(notFoundMeta.canonicalPath).toBe("/");
  });

  it("all routes have ogImage", () => {
    for (const [path, meta] of Object.entries(routeMeta)) {
      expect(meta.ogImage, `Missing ogImage for ${path}`).toBeTruthy();
    }
  });

  it("SITE_URL is defined", () => {
    expect(SITE_URL).toBeTruthy();
    expect(SITE_URL.startsWith("https://")).toBe(true);
  });

  it("generateBreadcrumbJsonLd returns correct structure for home", () => {
    const result = generateBreadcrumbJsonLd("/", "홈");
    expect(result["@type"]).toBe("BreadcrumbList");
    expect(result.itemListElement).toHaveLength(1);
  });

  it("generateBreadcrumbJsonLd returns 2 items for subpage", () => {
    const result = generateBreadcrumbJsonLd("/design-guide", "디자인 가이드");
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[1].item).toContain("/design-guide");
  });

  it("generateWebSiteJsonLd returns WebSite type", () => {
    const result = generateWebSiteJsonLd();
    expect(result["@type"]).toBe("WebSite");
    expect(result.url).toBe(SITE_URL);
  });
});
