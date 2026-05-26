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
// Side profile silhouette — v4:
//   • Rubber track: rounded rect at bottom + two visible wheel circles.
//   • Cab: plain rectangle sitting on the track (left of centre).
//   • Arm system: boom (steep 65° rise) → stick (elbow down-right) →
//     bucket (quadratic-bezier C-scoop, opening facing body).

export function MiniExcavadoraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Track — rounded rectangle, flat underside on the ground */}
      <rect x="1" y="18" width="14.5" height="4.5" rx="2.25" />
      {/* Left idler wheel */}
      <circle cx="3.5" cy="20.25" r="1.9" />
      {/* Right drive sprocket */}
      <circle cx="13" cy="20.25" r="1.9" />

      {/* Cab — boxy rectangle, sits on top of track */}
      <rect x="2" y="12" width="9" height="6" />

      {/* Boom — rises steeply (~65°) from cab top-right pivot */}
      <line x1="10" y1="12" x2="15" y2="3" />
      {/* Stick — elbow joint, downward-right from boom tip */}
      <line x1="15" y1="3" x2="21.5" y2="10.5" />
      {/* Bucket — C-curve scoop; outer face convex, mouth opens toward body */}
      <path d="M21.5 10.5 Q23 13.5 21 17 L19 14" />
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
// Scissor-lift side silhouette — v4:
//   • Safety rail bar (thin line above platform) + wide platform deck.
//   • Two crossing scissor arms (X) with pivot pin at mathematical crossing.
//   • Rectangular chassis base + two caster wheels below.

export function ElevadoresIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Safety rail — single top bar only (reads cleanly at small sizes) */}
      <line x1="4" y1="2" x2="20" y2="2" />
      {/* Platform deck — wide, prominent */}
      <rect x="2" y="3" width="20" height="2.5" rx="0.5" />

      {/* Scissor arm — lower-left → upper-right */}
      <line x1="5" y1="18" x2="18" y2="5.5" />
      {/* Scissor arm — lower-right → upper-left */}
      <line x1="19" y1="18" x2="6" y2="5.5" />
      {/* Pivot pin at exact crossing (x=12, y≈11.2) */}
      <circle cx="12" cy="11.2" r="1.2" />

      {/* Chassis base frame */}
      <rect x="3" y="18" width="18" height="3" rx="1" />
      {/* Caster wheels */}
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
