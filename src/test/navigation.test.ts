import { describe, it, expect } from "vitest";
import { navItems } from "@/data/navigation";
import { routeMeta } from "@/data/seo-config";

describe("navigation", () => {
  it("all nav items have required fields", () => {
    for (const item of navItems) {
      expect(item.title).toBeTruthy();
      expect(item.path).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.keywords.length).toBeGreaterThan(0);
    }
  });

  it("all nav paths have SEO config", () => {
    for (const item of navItems) {
      expect(routeMeta[item.path]).toBeDefined();
      expect(routeMeta[item.path].title).toBeTruthy();
      expect(routeMeta[item.path].description).toBeTruthy();
    }
  });

  it("has correct number of nav items", () => {
    expect(navItems.length).toBe(13);
  });
});
