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
// Side profile: rubber-tracked base, compact cab, articulated boom + bucket.

export function MiniExcavadoraIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Rubber track — elongated rounded rectangle */}
      <rect x="1" y="17" width="15" height="5" rx="2.5" />
      {/* Cab body */}
      <rect x="2" y="12" width="7" height="5" />
      {/* Cab roof — slightly angled trapezoid */}
      <path d="M2 12 L3.5 9.5 H8.5 L10 12" />
      {/* Boom arm — main diagonal going upper-right */}
      <path d="M9.5 10.5 L18 7" />
      {/* Forearm — elbow going lower-right */}
      <line x1="18" y1="7" x2="21" y2="11" />
      {/* Bucket — open quad at arm tip */}
      <path d="M21 11 L22.5 14 L19 15 L18 12 Z" />
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
// Side profile: elevated work platform, X-crossing scissor mechanism, wheeled base.

export function ElevadoresIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Guard railing above platform */}
      <path d="M4 3 V1 H20 V3" />
      {/* Work platform */}
      <rect x="2" y="3" width="20" height="3" rx="0.5" />
      {/* Left scissor arm (lower-left → upper-right) */}
      <line x1="7" y1="17" x2="15" y2="6" />
      {/* Right scissor arm (lower-right → upper-left) — crossing */}
      <line x1="17" y1="17" x2="9" y2="6" />
      {/* Wheeled chassis base */}
      <rect x="4" y="17" width="16" height="4" rx="1" />
      {/* Caster wheels */}
      <circle cx="7" cy="22" r="1" />
      <circle cx="17" cy="22" r="1" />
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
