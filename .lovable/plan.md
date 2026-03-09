

## 부동산/공인중개 웹 제작 시스템 — 최종 마감 업그레이드 플랜

### Current State Summary
The project has solid foundations: 13 routes, brief schema + storage + normalize + analysis layers, blueprint engine with 10 page generators, SEOHead component, CommandSearch, sidebar, tests. The gaps are in SEO precision, noindex policies, branding data-ification, and test coverage for routes/meta/UX.

---

### 1. SEO Engine Enhancement

**Modify `src/data/seo-config.ts`:**
- Add `robots` field to tool routes: `/client-brief`, `/site-blueprint`, `/implementation-rules` → `"noindex, nofollow"`
- Add `ogImage` field (default `/og-image.svg`) to `RouteMetaConfig`
- Hardcode a `SITE_URL` constant for absolute canonical/og:url generation

**Modify `src/components/SEOHead.tsx`:**
- Generate absolute URLs for `canonical`, `og:url`, `og:image`, `twitter:image` using `SITE_URL`
- Set `og:image` and `twitter:image` meta tags (currently missing)
- For routes without explicit `robots`, remove the robots meta tag (current behavior — good)
- Ensure 404 uses `notFoundMeta` with noindex (already works but ensure canonical is also set to `/`)

---

### 2. 404 Page Finalization

**Modify `src/pages/NotFound.tsx`:**
- Already has `<SEOHead is404 />` and Korean content — just verify canonical falls back to `/` in SEOHead
- Current 404 CTA links are good (홈, Client Brief, Site Blueprint, Checklist)
- No significant changes needed beyond SEOHead improvements above

---

### 3. AppSidebar & Branding Data-ification

**Create `src/data/industry-config.ts`:**
```typescript
export const industryConfig = {
  systemName: "RE Guide System",
  systemNameKo: "부동산/공인중개 웹 제작 가이드 시스템",
  industryName: "부동산/공인중개",
  icon: "Building2",
};
```

**Modify `src/components/layout/AppSidebar.tsx`:**
- Import and use `industryConfig.systemName` instead of hardcoded "RE Guide System"

**Modify `src/components/layout/AppLayout.tsx`:**
- Import and use `industryConfig.systemNameKo` for the header text

---

### 4. Client Brief Enhancements

**Modify `src/hooks/use-client-brief.ts`:**
- `saveStatus` already has `"idle" | "saving" | "saved" | "error"` — good
- Add `retrySave()` method (already exists) — verify it's exposed and connected to UI
- `lastSaved` already tracks success/failure — good

**Modify `src/pages/ClientBrief.tsx`:**
- Add site type reasoning display next to the badge (show `siteType.reasoning` and `siteType.score`)
- Add `loadError` display as a visible alert when import fails (currently `loadError` is tracked but may not render visibly in all cases)
- Improve the missing fields section with grouped error/warning display

**Modify `src/lib/brief-storage.ts`:**
- Currently handles schema version mismatch and invalid JSON — enhance to distinguish "partial migration" case: if shape is valid but version differs, attempt to normalize and warn rather than fully reject

---

### 5. Site Blueprint Output Standardization

**Modify `src/pages/SiteBlueprint.tsx`:**
- The `BlueprintCard` component is already inline and displays sections, CTAs, proof, mobile rules, SEO points, fallbacks, type variants, review claims, and meta title/description
- Add a `분양상담` page blueprint inclusion when relevant (already handled by `shouldInclude`)
- Ensure the Lovable prompt section is more structured with labeled sections

**Modify `src/lib/blueprint-engine.ts`:**
- `generateLovablePrompt()` — restructure into labeled sections with clear headings for better copy/paste usability
- Ensure all blueprint outputs consistently populate `fallbacks`, `typeVariants`, and `reviewClaims` arrays (some generators return empty arrays for fields that could have conditional content)

---

### 6. Implementation Rules Enhancement

**Modify `src/pages/ImplementationRules.tsx`:**
- Already uses `determineSiteType`, `getRemovableBlocks`, `getBudgetTiers`, `getProofStatuses`, `CORE_BLOCKS`
- Add "즉시 제작 지침 카드" — a summary card that combines site type + required pages + core blocks + primary CTA into a single copy-ready block
- Add consultation channel branching section showing which CTAs to use based on `brief.consultationChannels`
- Strengthen the proof ↔ rules connection: show proof deficiency alternatives inline

---

### 7. ProofSystem ↔ Blueprint/Rules Integration

**Modify `src/pages/ProofSystem.tsx`:**
- Already integrates with brief via `useBrief` + `getProofStatuses`
- Add a "페이지별 proof 배치 규칙" section showing which proof items go on which pages (data already in `proofItems` array's `pages` field)
- Add "proof 부족 시 대체 조합" section when brief exists and some proofs are 부족

---

### 8. Test Expansion

**Create `src/test/seo-config.test.ts`:**
- All nav routes have SEO config (already in navigation.test but make more explicit)
- Tool routes have noindex robots
- 404 meta has noindex
- All routes have valid title and description

**Create `src/test/brief-storage.test.ts`:**
- `saveBrief` / `loadBrief` roundtrip
- Schema version mismatch handling
- Invalid JSON handling
- `exportBriefJSON` / `parseBriefFromJSON` roundtrip

**Enhance existing tests:**
- `navigation.test.ts` — add test that tool routes (client-brief, site-blueprint, implementation-rules) have noindex in SEO config
- `blueprint-engine.test.ts` — add test that bunyang blueprint appears when propertyCategories includes "분양"
- `brief-analysis.test.ts` — add test for `getRemovableBlocks` and `getAssetCompleteness`

---

### 9. Repository Cleanup

- Remove `bun.lock` and `bun.lockb` files (standardize on npm)
- Verify `package.json` is correct (already looks good)
- README already has project description — add explicit install/build/test commands section if missing

---

### Implementation Order

1. `industry-config.ts` + AppSidebar/AppLayout branding (quick, no risk)
2. `seo-config.ts` enhancement + `SEOHead.tsx` absolute URLs + og:image/twitter:image
3. 404 canonical fix
4. Brief storage migration tolerance + ClientBrief UI improvements
5. Blueprint engine prompt restructuring + ImplementationRules "즉시 제작 지침"
6. ProofSystem placement rules + deficiency alternatives
7. New tests + enhanced existing tests
8. Remove bun lockfiles

### Files to Create
- `src/data/industry-config.ts`
- `src/test/seo-config.test.ts`
- `src/test/brief-storage.test.ts`

### Files to Modify
- `src/data/seo-config.ts`
- `src/components/SEOHead.tsx`
- `src/components/layout/AppSidebar.tsx`
- `src/components/layout/AppLayout.tsx`
- `src/pages/ClientBrief.tsx`
- `src/pages/SiteBlueprint.tsx`
- `src/pages/ImplementationRules.tsx`
- `src/pages/ProofSystem.tsx`
- `src/lib/brief-storage.ts`
- `src/lib/blueprint-engine.ts`
- `src/test/navigation.test.ts`
- `src/test/blueprint-engine.test.ts`
- `src/test/brief-analysis.test.ts`

### Files to Delete
- `bun.lock`
- `bun.lockb`

