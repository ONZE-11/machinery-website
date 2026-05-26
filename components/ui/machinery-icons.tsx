/**
 * Custom SVG icon set for machinery categories.
 * Style: monochrome, stroke-based, 24×24 viewBox, strokeWidth 1.5.
 * Uses currentColor so they inherit text color from context.
 * All icons are side-profile silhouettes — minimalist, European industrial UI style.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// ─── Mini Excavadora ─────────────────────────────────────────────────────────
// v3 — real geometry:
//   • Track undercarriage: rounded-end oval hull + idler wheel (left) + drive
//     sprocket (right) visible as circles at each end of the hull.
//   • Rotating upper structure: single outline path — heavy counterweight hump
//     at rear, flat cab roof, angled windshield at front.
//   • Three-segment arm: boom (steep rise), stick (elbow down-right),
//     bucket (quadratic-bezier scoop, convex outer face, mouth open toward body).

export function MiniExcavadoraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* ── UNDERCARRIAGE ─────────────────────────────────────────────────── */}
      {/* Rubber track hull — elongated oval, rounded ends for idler/sprocket */}
      <path d="M3 22 Q1 22 1 19 Q1 16 3 16 L14 16 Q16 16 16 19 Q16 22 14 22 Z" />
      {/* Front idler wheel (left end of track) */}
      <circle cx="3" cy="19" r="1.8" />
      {/* Rear drive sprocket (right end of track) */}
      <circle cx="14" cy="19" r="1.8" />

      {/* ── ROTATING UPPER STRUCTURE ──────────────────────────────────────── */}
      {/* Counterweight hump (rear/left) → flat cab roof → angled windshield → front face */}
      <path d="M3 16 Q2.5 14 2.5 12.5 Q2.5 11 4 11 H10 L11 12 V16" />

      {/* ── BOOM–STICK–BUCKET ARM SYSTEM ──────────────────────────────────── */}
      {/* Boom: rises steeply from front of upper structure */}
      <line x1="10.5" y1="12" x2="16" y2="7" />
      {/* Stick (forearm): elbow joint, hangs down-right from boom tip */}
      <line x1="16" y1="7" x2="20" y2="13" />
      {/* Bucket: quadratic scoop — convex back face, open mouth faces dig direction */}
      <path d="M20 13 Q22.5 16 20.5 18.5 L18.5 16" />
    </svg>
  )
}

// ─── Mini Tractor ─────────────────────────────────────────────────────────────
// Side profile: large rear wheel, small front wheel, sloped hood, box cab.

export function MiniTractorIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Large rear drive wheel + hub */}
      <circle cx="17" cy="16" r="6" />
      <circle cx="17" cy="16" r="2" />
      {/* Small front steering wheel + hub */}
      <circle cx="5" cy="18" r="3" />
      <circle cx="5" cy="18" r="1" />
      {/* Sloped hood — connects front wheel to cab area */}
      <path d="M5 15 L9 11 L15 11" />
      {/* Box cab */}
      <rect x="12" y="7" width="6" height="4" />
      {/* Exhaust stack */}
      <line x1="10" y1="11" x2="10" y2="8" />
    </svg>
  )
}

// ─── Mini Cargadora ───────────────────────────────────────────────────────────
// Side profile: compact square body, raised parallel lift arms, bucket.

export function MiniCargadoraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Main body — square/boxy */}
      <rect x="8" y="11" width="13" height="8" />
      {/* Upper lift arm */}
      <line x1="8" y1="12" x2="3" y2="7" />
      {/* Lower lift arm (parallel) */}
      <line x1="8" y1="15" x2="3" y2="10" />
      {/* Bucket — C-shape facing right */}
      <path d="M1 6 H3 V11 H1" />
      {/* Front drive wheel */}
      <circle cx="10" cy="20" r="1.5" />
      {/* Rear drive wheel */}
      <circle cx="19" cy="20" r="1.5" />
    </svg>
  )
}

// ─── Elevadores Compactos ─────────────────────────────────────────────────────
// v3 — real scissor-lift geometry:
//   • Wide work platform at top (with 3-post safety railing above).
//   • Two crossing scissor arms forming a real X mechanism with a visible
//     pivot pin (circle) at the exact mathematical crossing point.
//   • Rectangular chassis base below the scissor.
//   • Two drive wheels hanging from the chassis.
// The wide-platform + X-mechanism + wheeled-base silhouette is immediately
// recognisable as a scissor-type aerial work platform / compact lift.

export function ElevadoresIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* ── WORK PLATFORM ─────────────────────────────────────────────────── */}
      {/* Safety guard rail — three uprights + top bar */}
      <path d="M5 4 V2 H19 V4" />
      {/* Platform deck (wide, prominent) */}
      <rect x="2" y="4" width="20" height="2.5" rx="0.5" />

      {/* ── SCISSOR MECHANISM ─────────────────────────────────────────────── */}
      {/* Left arm: lower-left → upper-right (attaches to platform base at right) */}
      <line x1="5" y1="18" x2="17" y2="6.5" />
      {/* Right arm: lower-right → upper-left (attaches to platform base at left) */}
      <line x1="19" y1="18" x2="7" y2="6.5" />
      {/* Pivot pin — at the exact crossing point of both arms (x=12, y≈11.3) */}
      <circle cx="12" cy="11.5" r="1.2" />

      {/* ── CHASSIS BASE ──────────────────────────────────────────────────── */}
      {/* Base frame */}
      <rect x="3" y="18" width="18" height="3" rx="1" />
      {/* Drive / caster wheels */}
      <circle cx="6.5" cy="22" r="1.5" />
      <circle cx="17.5" cy="22" r="1.5" />
    </svg>
  )
}

// ─── Carretillas Elevadoras ───────────────────────────────────────────────────
// Side profile: twin-rail mast, horizontal fork tines, body + counterweight.

export function CarretillasIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Mast — twin vertical rails */}
      <line x1="6" y1="2" x2="6" y2="18" />
      <line x1="9" y1="2" x2="9" y2="18" />
      {/* Fork tine (upper) */}
      <line x1="1" y1="13" x2="6" y2="13" />
      {/* Fork tine (lower) */}
      <line x1="1" y1="16" x2="6" y2="16" />
      {/* Body */}
      <rect x="9" y="10" width="10" height="9" />
      {/* Counterweight bump at rear */}
      <path d="M19 12 H22 V18 H19" />
      {/* Operator cab */}
      <rect x="9" y="6" width="7" height="5" />
      {/* Drive wheel (front) */}
      <circle cx="7" cy="21" r="2" />
      {/* Stability wheel (rear) */}
      <circle cx="16" cy="21" r="2" />
    </svg>
  )
}

// ─── Equipos de Construcción ──────────────────────────────────────────────────
// Side profile: compact crawler dozer — rubber track, body, cab, front blade.

export function EquiposIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Crawler track */}
      <rect x="3" y="17" width="18" height="5" rx="2" />
      {/* Main body */}
      <rect x="5" y="11" width="14" height="6" />
      {/* Operator cab */}
      <rect x="13" y="7" width="6" height="4" />
      {/* Front blade — curved inward (concave) */}
      <path d="M1 11 L5 11 L5 19 L1 19 Q0 15 1 11 Z" />
      {/* Blade tilt cylinder arm */}
      <line x1="5" y1="13" x2="3" y2="11" />
      {/* Exhaust stack */}
      <line x1="15" y1="7" x2="15" y2="5" />
    </svg>
  )
}

// ─── Fallback / Generic Machinery ─────────────────────────────────────────────
// Used for unknown category slugs. Simple gear + chassis symbol.

export function MachineryFallbackIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Gear outline */}
      <circle cx="12" cy="11" r="4" />
      <circle cx="12" cy="11" r="1.5" />
      {/* Chassis / base bar */}
      <rect x="3" y="18" width="18" height="3" rx="1.5" />
      {/* Connecting pillar */}
      <line x1="12" y1="15" x2="12" y2="18" />
    </svg>
  )
}
