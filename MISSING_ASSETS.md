# Missing Assets Report — Maquinaria Japonesa Demo Site

Generated: 2026-05-15  
Status: Demo stage using semantically-matched existing photos until real assets are sourced.

---

## Summary

| Category | Total needed | Available (demo) | Missing (real) |
|----------|-------------|-----------------|----------------|
| Products | 7 | 7 (demo reassignments) | 7 |
| Brand heroes | 6 | 6 (demo copies) | 6 |
| Brand logos | 6 | 0 | **6** (high priority) |
| Category covers | 6 | 6 (demo copies) | 6 |
| Homepage sections | 4 | 4 | 0 ✓ |
| About page | 3 | 3 | 0 ✓ |
| Layout/UI | 3 | 3 | 0 ✓ |

---

## HIGH PRIORITY: Brand Logos

These are completely missing — no PNG logo files exist. Currently `logo` fields in mock-data and the DB
point to the brand hero JPG as a fallback. Logos will likely appear broken in any `<img>` context
expecting a transparent PNG.

| File needed | Used in | Notes |
|-------------|---------|-------|
| `/images/brands/logo-kubota.png` | Brand cards, product headers | Official Kubota orange/white logo |
| `/images/brands/logo-yanmar.png` | Brand cards, product headers | Official Yanmar red/white logo |
| `/images/brands/logo-komatsu.png` | Brand cards, product headers | Official Komatsu yellow/black logo |
| `/images/brands/logo-iseki.png` | Brand cards, product headers | Official Iseki blue/white logo |
| `/images/brands/logo-hinowa.png` | Brand cards, product headers | Official Hinowa red logo |
| `/images/brands/logo-toyota.png` | Brand cards, product headers | Toyota Industries logo (not automotive Toyota) |

---

## Product Photos (7 needed)

All 7 products currently display demo images that are semantically plausible but not authentic.
Replace with actual unit photos from stock or import documentation.

| Product slug | Demo image used | Semantic match | Real photo needed |
|-------------|-----------------|----------------|-------------------|
| `kubota-kx61-3-mini-excavadora` | `product-kubota-kx61-3.jpg` | Kubota excavator ✓ good | Actual KX61-3 unit |
| `yanmar-vio55-6a-excavadora-compacta` | `product-yanmar-vio55-6a.jpg` | Kubota excavator used (wrong brand) | Yanmar ViO55-6A unit |
| `kubota-b2420-mini-tractor` | `product-kubota-b2420.jpg` | Tractor type ✓, wrong brand origin | Actual Kubota B2420 unit |
| `komatsu-pc30mr-3-mini-excavadora` | `product-komatsu-pc30mr-3.jpg` | Komatsu brand ✓, loader vs excavator mismatch | Komatsu PC30MR-3 excavator |
| `iseki-tg5470-mini-tractor` | `product-iseki-tg5470.jpg` | Iseki tractor ✓ good | Actual TG5470 unit |
| `hinowa-lightlift-17-75-elevador` | `product-hinowa-lightlift-17-75.jpg` | Tracked platform (dumper body used) | Hinowa Lightlift 17.75 spider lift |
| `toyota-8fg25-carretilla-elevadora` | `product-toyota-8fg25.jpg` | Forklift type ✓ (was generic placeholder, now forklift) | Toyota 8FG25 counterbalance forklift |

---

## Brand Hero Images (6 needed)

All brand heroes currently reuse the same product photo for the brand page hero.
These create visual repetition across brand landing pages.

| File | Current demo source | Notes |
|------|--------------------|----|
| `/images/brands/brand-kubota.jpg` | product-kubota-kx61-3.jpg | Replace with Kubota factory/fleet shot |
| `/images/brands/brand-yanmar.jpg` | product-kubota-kx61-3.jpg | Same as Kubota — replace with Yanmar fleet |
| `/images/brands/brand-komatsu.jpg` | product-komatsu-pc30mr-3.jpg | Replace with Komatsu lineup shot |
| `/images/brands/brand-iseki.jpg` | product-iseki-tg5470.jpg | Replace with Iseki farm machinery scene |
| `/images/brands/brand-hinowa.jpg` | product-hinowa-lightlift-17-75.jpg | Replace with Hinowa spider lift in action |
| `/images/brands/brand-toyota.jpg` | hero-forklift.jpg | Replace with Toyota forklift fleet/warehouse |

---

## Category Cover Images (6 needed)

Category covers reuse product images. Fine for demo but creates visual repetition on the
categories/browse grid.

| File | Current demo source | Notes |
|------|--------------------|----|
| `/images/categories/category-mini-excavadoras.jpg` | product-kubota-kx61-3.jpg | Acceptable for demo |
| `/images/categories/category-mini-tractores.jpg` | product-kubota-b2420.jpg | Acceptable for demo |
| `/images/categories/category-mini-cargadoras.jpg` | product-komatsu-pc30mr-3.jpg | Note: loader image but mini-cargadora may need wheeled loader |
| `/images/categories/category-elevadores-compactos.jpg` | hero-crane.jpg | ✓ Good match (crane/lift) |
| `/images/categories/category-equipos-construccion.jpg` | homepage-hero-secondary.jpg | ✓ Excavator = good construction icon |
| `/images/categories/category-carretillas-elevadoras.jpg` | hero-forklift.jpg | ✓ Good match |

---

## Orphaned Asset (ready but under-used)

| File | Status | Recommendation |
|------|--------|---------------|
| `/images/about-inspection.jpg` | Exists, not rendered on any page | Add to a "Quality Process" section in `/sobre-nosotros` — e.g. alongside the existing shipping/delivery image |

---

## Demo Semantic Mismatch Notes

These are known mismatches that remain after the reorganization, acceptable for demo stage:

1. **Komatsu PC30MR-3** is a *mini excavator* but its demo photo originates from `komatsu-loader.jpg`
   (a wheeled loader). The Komatsu brand is correct; only the machine type is off.

2. **Hinowa Lightlift 17.75** is a *tracked spider lift* but the demo photo is a compact dumper.
   These are very different machine types — priority replacement once real Hinowa photos are available.

3. **Yanmar ViO55-6A** uses a Kubota excavator photo. Same machine type (both excavators) so visually
   consistent, but wrong brand on the photo.

---

## Current Asset Inventory (all production-ready)

### `/public/images/` (root)
```
homepage-hero.jpg             ← Main homepage hero (was hero-main.jpg)
homepage-hero-secondary.jpg   ← Secondary hero / mock-data section (was hero-excavator.jpg)
homepage-cta.jpg              ← CTA section background (was cta-background.jpg)
homepage-why-japanese.jpg     ← Why Japanese section (was hero-light.jpg)
brands-hero.jpg               ← Brands listing page hero ✓ now wired
catalog-hero.jpg              ← Catalog page hero ✓ now wired
about-team.jpg                ← About page hero
about-shipping.jpg            ← About page Why-Choose-Us section
about-inspection.jpg          ← Quality/inspection visual (ORPHANED — see above)
footer-texture.jpg            ← Footer background
placeholder-machinery.jpg     ← Fallback for missing product images
hero-crane.jpg                ← Used on brands page secondary + category elevadores
hero-forklift.jpg             ← Used on why-japanese page + category/brand toyota
```

### `/public/images/products/` (7 production files)
```
product-kubota-kx61-3.jpg
product-yanmar-vio55-6a.jpg
product-kubota-b2420.jpg
product-komatsu-pc30mr-3.jpg
product-iseki-tg5470.jpg
product-hinowa-lightlift-17-75.jpg
product-toyota-8fg25.jpg
```

### `/public/images/categories/` (6 production files)
```
category-mini-excavadoras.jpg
category-mini-tractores.jpg
category-mini-cargadoras.jpg
category-elevadores-compactos.jpg
category-equipos-construccion.jpg
category-carretillas-elevadoras.jpg
```

### `/public/images/brands/` (6 production files)
```
brand-kubota.jpg
brand-yanmar.jpg
brand-komatsu.jpg
brand-iseki.jpg
brand-hinowa.jpg
brand-toyota.jpg
```

### Legacy files (safe to delete once confirmed working)
```
products/kubota-excavator.jpg
products/yanmar-tractor.jpg
products/komatsu-loader.jpg
products/iseki-tractor.jpg
products/hinowa-dumper.jpg
hero-main.jpg
hero-excavator.jpg
hero-light.jpg
cta-background.jpg
```
