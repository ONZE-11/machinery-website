/**
 * TEMPORARY — delete /app/icon-preview after approval.
 * Shows ONLY the two redesigned icons for approval before footer integration.
 */
import { MiniExcavadoraIcon, ElevadoresIcon } from '@/components/ui/machinery-icons'

const icons = [
  {
    name: 'Mini Excavadoras',
    slug: 'mini-excavadoras',
    Icon: MiniExcavadoraIcon,
    description: 'Track hull + idler/sprocket wheels + 3-segment arm (boom → stick → bucket scoop)',
  },
  {
    name: 'Elevadores Compactos',
    slug: 'elevadores-compactos',
    Icon: ElevadoresIcon,
    description: 'Wide platform + railing + scissor X with pivot pin + wheeled chassis base',
  },
]

const sizes: Array<{ label: string; px: number; cls: string }> = [
  { label: '14 px — footer', px: 14, cls: 'w-3.5 h-3.5' },
  { label: '20 px',          px: 20, cls: 'w-5 h-5'   },
  { label: '32 px',          px: 32, cls: 'w-8 h-8'   },
  { label: '64 px',          px: 64, cls: 'w-16 h-16' },
  { label: '96 px',          px: 96, cls: 'w-24 h-24' },
]

export default function IconPreviewPage() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-12 font-sans">

      <header>
        <h1 className="text-2xl font-bold mb-1">Icon Preview — Pending Approval</h1>
        <p className="text-sm text-muted-foreground">
          Review the two redesigned icons below. If approved, run{' '}
          <code className="bg-muted px-1 rounded">integrate-icons</code>{' '}
          to update the footer. Delete <code className="bg-muted px-1 rounded">/app/icon-preview</code> afterwards.
        </p>
      </header>

      {/* ── SIZE MATRIX ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Size comparison</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {icons.map(({ name, Icon, description }) => (
            <div key={name} className="border border-border rounded-xl p-6 space-y-5 bg-card">
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground mt-1">{description}</p>
              </div>

              {/* Size grid */}
              <div className="flex items-end gap-5 flex-wrap">
                {sizes.map(({ label, cls }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <Icon className={`${cls} text-foreground`} />
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{label}</span>
                  </div>
                ))}
              </div>

              {/* On coloured backgrounds */}
              <div className="flex gap-3 flex-wrap">
                {[
                  { bg: 'bg-background border border-border', fg: 'text-foreground',         label: 'light bg' },
                  { bg: 'bg-foreground',                       fg: 'text-background',         label: 'dark bg'  },
                  { bg: 'bg-primary',                          fg: 'text-primary-foreground', label: 'primary'  },
                ].map(({ bg, fg, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className={`rounded p-2 ${bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${fg}`} />
                    </span>
                    <span className="text-[10px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER SIMULATION ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Footer simulation (exact layout)</h2>

        <div className="max-w-xs bg-card border border-border rounded-xl p-6">
          <p className="font-serif text-lg tracking-wider mb-4">CATÁLOGO</p>
          <ul className="space-y-2.5">
            {[
              { slug: 'mini-excavadoras',    name: 'Mini Excavadoras',    Icon: MiniExcavadoraIcon },
              { slug: 'elevadores-compactos', name: 'Elevadores Compactos', Icon: ElevadoresIcon },
              { slug: 'other-a', name: 'Mini Tractores',         Icon: () => <span className="w-3.5 h-3.5 block bg-muted-foreground/30 rounded-sm" /> },
              { slug: 'other-b', name: 'Mini Cargadoras',        Icon: () => <span className="w-3.5 h-3.5 block bg-muted-foreground/30 rounded-sm" /> },
              { slug: 'other-c', name: 'Carretillas Elevadoras', Icon: () => <span className="w-3.5 h-3.5 block bg-muted-foreground/30 rounded-sm" /> },
              { slug: 'other-d', name: 'Equipos de Construcción',Icon: () => <span className="w-3.5 h-3.5 block bg-muted-foreground/30 rounded-sm" /> },
            ].map(({ slug, name, Icon }) => (
              <li key={slug} className="group flex items-center gap-2.5 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors">
                <span className="shrink-0 w-6 h-6 rounded flex items-center justify-center bg-primary/8 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
                </span>
                <span className="truncate">{name}</span>
              </li>
            ))}
            <li className="pt-1">
              <span className="text-sm text-primary/80 font-medium">Ver todo →</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── RAW SVG PATHS (for developer reference) ───────────────────────── */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Large isolated view (48 px)</h2>
        <div className="flex gap-12 flex-wrap">
          {icons.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-xl border border-border flex items-center justify-center bg-card">
                <Icon className="w-12 h-12 text-primary" />
              </div>
              <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-foreground">
                <Icon className="w-12 h-12 text-background" />
              </div>
              <p className="text-xs text-muted-foreground text-center max-w-[80px]">{name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
