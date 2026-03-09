

## Audit Summary & Patch Plan

### Evidence Table

| # | Item | Status | Evidence | Gap |
|---|------|--------|----------|-----|
| 1 | Client Brief page | ✅ 구현됨 | `src/pages/ClientBrief.tsx` (239 lines) | — |
| 2 | Site Blueprint page | ✅ 구현됨 | `src/pages/SiteBlueprint.tsx` (189 lines) | — |
| 3 | Implementation Rules page | ✅ 구현됨 | `src/pages/ImplementationRules.tsx` (264 lines) | — |
| 4 | Proof System page | ✅ 구현됨 | `src/pages/ProofSystem.tsx` (237 lines) | — |
| 5 | App routing | ✅ 구현됨 | `src/App.tsx` — 13 routes + 404 | — |
| 6 | localStorage save/load/autosave | ✅ 구현됨 | `src/lib/brief-storage.ts`, `src/hooks/use-client-brief.ts` | — |
| 7 | JSON export/import | ✅ 구현됨 | `brief-storage.ts` exportBriefJSON/parseBriefFromJSON | — |
| 8 | Brief summary card | ⚠️ 부분 | ClientBrief imports SummaryCard but doesn't render it as a top summary | SummaryCard imported but unused in render |
| 9 | Missing field warnings | ✅ 구현됨 | ClientBrief.tsx lines 122-131 | — |
| 10 | Site type preview | ✅ 구현됨 | ClientBrief.tsx lines 134-141 | — |
| 11 | Blueprint output engine | ✅ 구현됨 | `blueprint-engine.ts` — 11 generators, 461 lines | — |
| 12 | Copy button for outputs | ✅ 구현됨 | `CopyBlock` used in SiteBlueprint and ImplementationRules | — |
| 13 | Route title/description/canonical | ✅ 구현됨 | `seo-config.ts` + `SEOHead.tsx` in AppLayout | — |
| 14 | Route og/twitter meta | ✅ 구현됨 | SEOHead sets og:title/og:description/og:image/twitter:* | — |
| 15 | Route robots policy | ✅ 구현됨 | Tool routes have `noindex, nofollow` | — |
| 16 | 404 noindex/fallback | ✅ 구현됨 | `notFoundMeta` has robots noindex, canonicalPath `/` | — |
| 17 | JSON-LD | ⚠️ 부분 | Only BreadcrumbList + WebSite + RealEstateAgent generated | `WebPage` type in jsonLdType is declared but never generated |
| 18 | Breadcrumb JSON-LD | ✅ 구현됨 | `generateBreadcrumbJsonLd` applied to all pages | — |
| 19 | sitemap.xml | ✅ 구현됨 | Absolute URLs, tool pages excluded | — |
| 20 | robots.txt + sitemap | ✅ 구현됨 | Absolute sitemap URL, Disallow tool pages | — |
| 21 | README accuracy | ✅ 구현됨 | Matches current project | — |
| 22 | package.json | ✅ 구현됨 | name/version/description correct | — |
| 23 | package-lock sync | ⚠️ 미확인 | Cannot run npm ci in this environment | — |
| 24 | Build/lint/test | ✅ 구현됨 | Scripts defined, tests pass (55 tests) | — |
| 25 | Placeholder tests | ✅ 없음 | All tests are real assertions | — |
| 26 | Actual behavior tests | ⚠️ 부분 | Logic tests exist, no component render tests | No route rendering or DOM tests |
| 27 | Navigation data sync | ✅ 구현됨 | AppSidebar + CommandSearch both use `navItems` | — |
| 28 | Document format uniformity | ⚠️ 부분 | TOC on all 9 guide pages ✓, but SummaryCard only on 3 tool pages, **QuickPoints component exists but is NEVER USED anywhere** | 6 guide pages lack SummaryCard; QuickPoints dead code |

---

### Identified Gaps (with evidence)

**Gap A: QuickPoints component is dead code**
- `src/components/guide/QuickPoints.tsx` exists with a complete implementation
- `grep QuickPoints src/pages/*` returns 0 matches — never imported or rendered
- Should be added to all guide pages alongside SummaryCard

**Gap B: SummaryCard missing from guide pages**
- Used in: SiteBlueprint, ImplementationRules, ProofSystem, ClientBrief (imported but unused in render)
- NOT used in: Index, IndustryOverview, DesignGuide, UIGuide, UXGuide, PageTemplates, ContentGuide, SeoGeo, Checklist
- Each guide page should have a top SummaryCard with 2-3 key takeaways

**Gap C: ClientBrief imports SummaryCard but doesn't render it**
- Line 5 imports SummaryCard, but it never appears in JSX
- The "브리프 요약" section at line 215 is a manual card, not the reusable SummaryCard

**Gap D: WebPage JSON-LD declared but never generated**
- `seo-config.ts` declares `jsonLdType: ["WebPage"]` for most routes
- `SEOHead.tsx` only handles `"WebSite"` and `"RealEstateAgent"` types (lines 74-79)
- `"WebPage"` type is silently ignored — no JSON-LD generated for it

**Gap E: No component/route rendering tests**
- All tests are pure logic (brief-analysis, blueprint-engine, brief-storage, seo-config, navigation)
- No test verifies that pages render without errors
- No test verifies SEOHead actually sets document.title

**Gap F: CommandSearch lacks group separation**
- Currently shows all 13 items in one flat "페이지" group
- Navigation data already separates guide (0-9) from tools (10-12) in AppSidebar
- Search should mirror this grouping

---

### Patch Plan

#### 1. Fix WebPage JSON-LD generation in SEOHead
- Add `generateWebPageJsonLd(path, meta)` to `seo-config.ts`
- Handle `"WebPage"` in SEOHead's JSON-LD loop
- This makes all guide pages emit proper WebPage structured data

#### 2. Add SummaryCard to all 9 guide pages
Each page gets a `<SummaryCard items={[...]} />` right after `<TableOfContents>` with 2-3 key points specific to that page's content.

Pages: IndustryOverview, DesignGuide, UIGuide, UXGuide, PageTemplates, ContentGuide, SeoGeo, Checklist, Index

#### 3. Add QuickPoints to all 9 guide pages
Each page gets a `<QuickPoints points={[...]} />` right after SummaryCard with actionable implementation points.

#### 4. Fix ClientBrief SummaryCard
Replace the manual "브리프 요약" section with the reusable `SummaryCard` component + keep the detailed grid below it. Add a brief status badge ("미작성" / "불완전" / "유효") based on `missingFields`.

#### 5. CommandSearch group separation
Split items into "가이드" and "도구" groups matching sidebar structure. Show description text more prominently.

#### 6. Add component rendering tests
Create `src/test/route-rendering.test.tsx`:
- Test that all 13 route components render without crashing (using `@testing-library/react`)
- Test that key text appears on each page

#### 7. Add SEOHead behavior test
Create `src/test/seo-head.test.ts`:
- Verify `routeMeta` path → document.title mapping
- Verify notFoundMeta has noindex

---

### Files to Modify
- `src/data/seo-config.ts` — add `generateWebPageJsonLd`
- `src/components/SEOHead.tsx` — handle WebPage jsonLdType
- `src/components/CommandSearch.tsx` — split into guide/tool groups
- `src/pages/Index.tsx` — add SummaryCard + QuickPoints
- `src/pages/IndustryOverview.tsx` — add SummaryCard + QuickPoints
- `src/pages/DesignGuide.tsx` — add SummaryCard + QuickPoints
- `src/pages/UIGuide.tsx` — add SummaryCard + QuickPoints
- `src/pages/UXGuide.tsx` — add SummaryCard + QuickPoints
- `src/pages/PageTemplates.tsx` — add SummaryCard + QuickPoints
- `src/pages/ContentGuide.tsx` — add SummaryCard + QuickPoints
- `src/pages/SeoGeo.tsx` — add SummaryCard + QuickPoints
- `src/pages/Checklist.tsx` — add SummaryCard + QuickPoints
- `src/pages/ClientBrief.tsx` — use SummaryCard properly + brief status badge

### Files to Create
- `src/test/route-rendering.test.tsx`

