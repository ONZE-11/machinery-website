/**
 * TEMPORARY PREVIEW PAGE — delete after icon approval.
 * Visit /icon-preview in dev to compare old Lucide icons vs new custom SVGs.
 */
import {
  Shovel, Tractor, Cog, ArrowUpFromLine, HardHat, Forklift,
} from 'lucide-react'
import {
  MiniExcavadoraIcon,
  MiniTractorIcon,
  MiniCargadoraIcon,
  ElevadoresIcon,
  CarretillasIcon,
  EquiposIcon,
  MachineryFallbackIcon,
} from '@/components/ui/machinery-icons'

const categories = [
  {
    slug: 'mini-excavadoras',
    name: 'Mini Excavadoras',
    OldIcon: Shovel,
    NewIcon: MiniExcavadoraIcon,
  },
  {
    slug: 'mini-tractores',
    name: 'Mini Tractores',
    OldIcon: Tractor,
    NewIcon: MiniTractorIcon,
  },
  {
    slug: 'mini-cargadoras',
    name: 'Mini Cargadoras',
    OldIcon: Cog,
    NewIcon: MiniCargadoraIcon,
  },
  {
    slug: 'elevadores-compactos',
    name: 'Elevadores Compactos',
    OldIcon: ArrowUpFromLine,
    NewIcon: ElevadoresIcon,
  },
  {
    slug: 'carretillas-elevadoras',
    name: 'Carretillas Elevadoras',
    OldIcon: Forklift,
    NewIcon: CarretillasIcon,
  },
  {
    slug: 'equipos-construccion',
    name: 'Equipos de Construcción',
    OldIcon: HardHat,
    NewIcon: EquiposIcon,
  },
  {
    slug: 'categoria-nueva',
    name: 'Categoría Nueva (fallback)',
    OldIcon: HardHat,
    NewIcon: MachineryFallbackIcon,
  },
]

const sizes = [
  { label: '14 px — Footer size', cls: 'w-3.5 h-3.5' },
  { label: '20 px', cls: 'w-5 h-5' },
  { label: '32 px', cls: 'w-8 h-8' },
  { label: '48 px', cls: 'w-12 h-12' },
]

export default function IconPreviewPage() {
  return (
    <div className="min-h-screen bg-background p-10 space-y-14">
      <div>
        <h1 className="text-3xl font-bold mb-1">Icon Preview</h1>
        <p className="text-muted-foreground text-sm">
          Temporary page — delete <code>/app/icon-preview</code> after approval.
        </p>
      </div>

      {/* Side-by-side comparison at multiple sizes */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Old (Lucide) vs New (Custom SVG)</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-6 font-medium text-muted-foreground w-52">Category</th>
                {sizes.map((s) => (
                  <th key={s.label} className="text-center py-3 px-4 font-medium text-muted-foreground" colSpan={2}>
                    {s.label}
                  </th>
                ))}
              </tr>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-2 pr-6" />
                {sizes.map((s) => (
                  <>
                    <th key={`${s.label}-old`} className="py-2 px-4 text-xs text-muted-foreground font-normal">Old</th>
                    <th key={`${s.label}-new`} className="py-2 px-4 text-xs text-primary font-normal">New</th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat.slug} className={`border-b border-border/50 ${i % 2 === 0 ? '' : 'bg-muted/10'}`}>
                  <td className="py-4 pr-6 font-medium">{cat.name}</td>
                  {sizes.map((s) => (
                    <>
                      {/* Old Lucide icon */}
                      <td key={`${cat.slug}-${s.label}-old`} className="py-4 px-4 text-center">
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded bg-secondary/60 border border-border">
                          <cat.OldIcon className={`${s.cls} text-muted-foreground`} />
                        </div>
                      </td>
                      {/* New custom icon */}
                      <td key={`${cat.slug}-${s.label}-new`} className="py-4 px-4 text-center">
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded bg-primary/8 border border-primary/20">
                          <cat.NewIcon className={`${s.cls} text-primary`} />
                        </div>
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer simulation — exactly as it appears */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Footer Context Simulation</h2>
        <p className="text-sm text-muted-foreground">
          How the new icons look inside the actual footer link layout.
        </p>

        <div className="max-w-xs bg-card border border-border rounded-lg p-6 space-y-1">
          <p className="font-serif text-lg tracking-wider text-foreground mb-4">CATÁLOGO</p>
          {categories.slice(0, 6).map((cat) => (
            <div
              key={cat.slug}
              className="group flex items-center gap-2.5 text-sm text-muted-foreground cursor-pointer hover:text-primary transition-colors"
            >
              <span className="shrink-0 w-6 h-6 rounded flex items-center justify-center bg-primary/8 group-hover:bg-primary/15 transition-colors">
                <cat.NewIcon className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
              </span>
              <span className="truncate leading-snug">{cat.name}</span>
            </div>
          ))}
          <div className="pt-1">
            <span className="text-sm text-primary/80 font-medium">Ver todo →</span>
          </div>
        </div>
      </section>

      {/* Solo display on white and dark backgrounds */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Icons on Light / Dark Backgrounds</h2>
        <div className="flex gap-6 flex-wrap">
          {[
            { bg: 'bg-white border border-border', color: 'text-primary' },
            { bg: 'bg-foreground', color: 'text-background' },
            { bg: 'bg-primary', color: 'text-primary-foreground' },
            { bg: 'bg-secondary', color: 'text-foreground' },
          ].map(({ bg, color }, bi) => (
            <div key={bi} className={`rounded-lg p-4 ${bg} flex gap-4 flex-wrap`}>
              {categories.slice(0, 6).map((cat) => (
                <cat.NewIcon key={cat.slug} className={`w-8 h-8 ${color}`} />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
