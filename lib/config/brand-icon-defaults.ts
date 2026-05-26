// =============================================================================
// BRAND ICON DEFAULTS
// Defines the fallback visual identity for known brands when no logo has been
// uploaded via Admin. Priority used in the footer:
//   1. brand.logo  (Admin-uploaded image URL)
//   2. BrandIconDefault.imagePath  (static file in /public, if added later)
//   3. BrandIconDefault.initials   (colored text badge — always present)
//   4. Generic <Package /> icon    (for unknown brands with no entry here)
//
// To add real logo files later:
//   - Place the image at /public/images/brands/<slug>.png  (or .svg)
//   - Add `imagePath: '/images/brands/<slug>.png'` to the entry below
//   - No code changes needed elsewhere
// =============================================================================

export interface BrandIconDefault {
  /** Static image path from /public — add when real logo file is available */
  imagePath?: string
  /** 1–2 character abbreviation shown inside the colored badge */
  initials: string
  /** CSS background color of the badge */
  bg: string
  /** CSS foreground (text) color of the badge */
  fg: string
}

/** Keyed by brand slug (matches Brand.slug in the database). */
export const brandIconDefaults: Record<string, BrandIconDefault> = {
  kubota:  { initials: 'K',  bg: '#E8450A', fg: '#ffffff' },
  yanmar:  { initials: 'Y',  bg: '#D32E27', fg: '#ffffff' },
  komatsu: { initials: 'Ko', bg: '#FFB800', fg: '#1a1a1a' },
  iseki:   { initials: 'I',  bg: '#003DA5', fg: '#ffffff' },
  hinowa:  { initials: 'H',  bg: '#003478', fg: '#ffffff' },
  toyota:  { initials: 'T',  bg: '#EB0A1E', fg: '#ffffff' },
}
