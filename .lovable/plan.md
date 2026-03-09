

## Implementation Plan: 부동산/공인중개 웹 제작 시스템 업그레이드

This plan covers all 11 areas requested, organized into logical implementation phases.

---

### Phase 1: Project Meta & Branding Cleanup

**Files to modify:** `package.json`, `index.html`, `README.md`, `public/robots.txt`
**Files to create:** `public/sitemap.xml`

- Update `package.json`: name → `"re-guide-system"`, version → `"1.0.0"`, description → Korean description of the system
- Rewrite `README.md` with project purpose, workflow (Brief → Blueprint → Rules → Output), tech stack, and dev instructions
- Update `index.html`: title → "부동산/공인중개 웹 제작 가이드 시스템", update og/twitter meta, remove all "Lovable App" / "REPLACE_WITH_PROJECT_ID" references, set og:image to `/og-image.png`
- Generate `public/og-image.png` as a simple branded SVG-based image (since we can't create actual PNGs, we'll use an SVG file and reference it, or create a placeholder with proper branding)
- Create `public/sitemap.xml` with all 13 routes
- Update `public/robots.txt` to include `Sitemap:` directive

---

### Phase 2: SEO System

**Files to create:** `src/data/seo-config.ts`, `src/components/SEOHead.tsx`
**Files to modify:** `src/components/guide/PageHeader.tsx`, all page components

- Create `src/data/seo-config.ts` with per-route config: `title`, `description`, `canonical`, `og`, `twitter`, `robots`, `jsonLd` (type selection: WebSite, WebPage, BreadcrumbList, FAQPage, RealEstateAgent, etc.)
- Create `src/components/SEOHead.tsx` component that uses `useEffect` to set `document.title` and inject/update `<meta>` tags and `<script type="application/ld+json">` into `<head>`
- Move SEO responsibility out of `PageHeader` (currently sets title via useEffect) into `SEOHead`
- Each page wraps with `<SEOHead route="/path" />` which reads from seo-config
- BreadcrumbList JSON-LD generated from navigation data
- 404 gets `noindex, nofollow` robots meta

---

### Phase 3: 404 Page Overhaul

**Files to modify:** `src/pages/NotFound.tsx`

- Korean 404 content with clear messaging
- CTA links to: 홈(`/`), Client Brief(`/client-brief`), Site Blueprint(`/site-blueprint`), Checklist(`/checklist`)
- Uses `SEOHead` with noindex/nofollow
- Styled consistent with guide system design

---

### Phase 4: Brief Storage Refactoring

**Files to create:** `src/lib/brief-storage.ts`, `src/lib/brief-normalize.ts`, `src/lib/brief-analysis.ts`, `src/hooks/use-client-brief.ts`
**Files to modify:** `src/pages/ClientBrief.tsx`, `src/hooks/use-brief.ts`

- `brief-storage.ts`: `saveBrief()`, `loadBrief()`, `exportBriefJSON()`, `importBriefJSON()` with error handling, retry logic
- `brief-normalize.ts`: `normalizeBrief()` — trim strings, deduplicate arrays, ensure schema version, validate shape
- `brief-analysis.ts`: `determineSiteType()`, `getMissingFields()`, `getProofStatus()`, `getAssetSummary()` — extracted from current SiteBlueprint/ImplementationRules
- `use-client-brief.ts`: Full read-write hook with autosave (debounced), save status tracking (saved/saving/error with retry), lastSaved with success/failure state, import/export methods, normalize on load
- Update `use-brief.ts` to use `brief-storage.ts` internally (keep as read-only hook for consumer pages)
- Refactor `ClientBrief.tsx` to use `use-client-brief.ts`, removing all storage logic from the component
- Enhance brief summary card with asset completeness indicators
- Add missing field warnings with severity levels
- Add site type preview badge based on current input

---

### Phase 5: SiteBlueprint Engine Enhancement

**Files to modify:** `src/pages/SiteBlueprint.tsx`
**Files to create:** `src/lib/blueprint-engine.ts`

- Extract all blueprint generation logic to `blueprint-engine.ts`
- For each of the 10+ page types (홈, 지역/거래, 매물리스트, 매물상세, 대표소개, 지점/오시는길, 상담/문의, 매물접수, 후기, 블로그), generate a structured output card containing:
  - 필수/선택/조건부/금지 블록
  - 핵심 CTA / 보조 CTA
  - proof 요소
  - 모바일 축약 규칙
  - SEO 포인트
  - 자산 부족 시 대체안
  - 부동산 유형별 변경점
  - 검토 필요한 주장
- Each output card has a copy button (uses existing `CopyBlock` pattern)
- Site type determination with reasoning display
- Required/optional/removable/prohibited page classification
- Meta title/description examples per page type
- JSON-LD type recommendations per page
- Enhanced Lovable prompt generator with all brief data
- Create a reusable `BlueprintCard` component for the standardized output format

---

### Phase 6: ImplementationRules Engine Enhancement

**Files to modify:** `src/pages/ImplementationRules.tsx`

- Use shared logic from `brief-analysis.ts` for site type determination (aligned with SiteBlueprint)
- Enhanced branching rules with more granular conditions:
  - 5 site type classifications with scoring/reasoning
  - Branch type (single/multi) with specific UI rules
  - Representative info presence → specific block rules
  - Listings DB presence → page inclusion rules
  - Reviews/regional content → section rules
  - Consultation channel type → CTA configuration
- Budget tiers (최소/표준/풀) with detailed page and section lists
- Core blocks list (never remove) vs removable blocks with conditions
- "Instant production directive" card with all key decisions summarized
- Incomplete brief state handling with specific guidance

---

### Phase 7: ProofSystem ↔ Brief Integration

**Files to modify:** `src/pages/ProofSystem.tsx`

- Import `useBrief` and compute proof status per item based on brief data:
  - `hasRegistrationInfo` → 등록정보 status
  - `hasRepresentativeInfo` → 대표 프로필 status
  - `hasReviews` → 후기 status
  - `hasOfficePhotos` → 사무소 사진 status
  - `hasRegionalContent` → 지역 콘텐츠 status
  - `hasListings` → 매물 관련 status
- Display computed states: 보유 / 부족 / 비공개 / 검토 필요
- When no brief: show static catalog (current behavior) with prompt to fill brief
- When brief exists: show dynamic status per proof item
- Add proof placement rules per page
- Add proof deficiency alternatives section

---

### Phase 8: Document Format Unification

**Files to modify:** All 12 main page components
**Files to create:** `src/components/guide/TableOfContents.tsx`, `src/components/guide/QuickPoints.tsx`, `src/components/guide/SummaryCard.tsx`

- `TableOfContents.tsx`: In-page TOC component using anchor links, auto-generated from section headings on the page. Sticky on desktop, collapsible on mobile.
- `SummaryCard.tsx`: Top-of-page summary with key takeaways
- `QuickPoints.tsx`: "Quick apply" points card
- Update `SectionBlock` to accept an `id` prop for anchor targeting
- Add TOC, summary card, and quick points to all 12 main pages
- Ensure PrevNextNav is present on all pages (already mostly done)
- Standardize badge usage across all pages

---

### Phase 9: Command Search (Cmd+K)

**Files to create:** `src/components/CommandSearch.tsx`
**Files to modify:** `src/components/layout/AppLayout.tsx`, `src/data/navigation.ts`

- Add `keywords` field to `NavItem` interface in navigation data
- Create `CommandSearch.tsx` using existing `cmdk` + `@radix-ui/react-dialog` (already in dependencies)
- Search across page titles, descriptions, and keywords
- Navigate to selected page on selection
- Empty state UI
- Keyboard shortcut: Cmd+K / Ctrl+K
- Add search trigger button in AppLayout header
- Sidebar and search share the same `navItems` data

---

### Phase 10: Tests

**Files to create:**
- `src/test/routes.test.tsx` — core route rendering
- `src/test/seo.test.tsx` — route meta and 404 noindex
- `src/test/brief-storage.test.ts` — save/load/normalize/import/export
- `src/test/blueprint-engine.test.ts` — output varies by brief input
- `src/test/implementation-rules.test.ts` — rules vary by brief input
- `src/test/proof-status.test.ts` — proof status computation
- `src/test/navigation.test.ts` — nav data consistency

**Files to remove:** `src/test/example.test.ts`

Tests will use vitest + @testing-library/react (already configured). Route rendering tests will wrap with MemoryRouter. Brief-dependent tests will mock localStorage.

---

### Phase 11: Repository Cleanup

- Remove `bun.lock` and `bun.lockb` (standardize on npm with `package-lock.json`)
- Remove `public/placeholder.svg`
- Ensure `package-lock.json` is consistent
- Verify build passes with all changes

---

### Summary of New Files

```text
src/data/seo-config.ts
src/components/SEOHead.tsx
src/components/CommandSearch.tsx
src/components/guide/TableOfContents.tsx
src/components/guide/QuickPoints.tsx
src/components/guide/SummaryCard.tsx
src/lib/brief-storage.ts
src/lib/brief-normalize.ts
src/lib/brief-analysis.ts
src/lib/blueprint-engine.ts
src/hooks/use-client-brief.ts
public/sitemap.xml
src/test/routes.test.tsx
src/test/seo.test.tsx
src/test/brief-storage.test.ts
src/test/blueprint-engine.test.ts
src/test/implementation-rules.test.ts
src/test/proof-status.test.ts
src/test/navigation.test.ts
```

### Implementation Order

1. Phase 1 (meta/branding) + Phase 11 (cleanup) — foundational
2. Phase 2 (SEO system) + Phase 3 (404) — depends on meta
3. Phase 4 (brief refactor) — core data layer
4. Phase 5 (blueprint) + Phase 6 (impl rules) + Phase 7 (proof) — depends on brief refactor
5. Phase 8 (doc format) + Phase 9 (command search) — UI enhancements
6. Phase 10 (tests) — after all logic is stable

This will be implemented across multiple iterations given the scope. Each phase produces working, buildable code.

