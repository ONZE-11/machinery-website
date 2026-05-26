import Link from 'next/link'
import Image from 'next/image'
import {
  Phone, Mail, MapPin, Instagram, Youtube,
  Shovel, Tractor, Cog, ArrowUpFromLine, HardHat, Forklift,
  Package, type LucideIcon,
} from 'lucide-react'
import {
  getContactSettings,
  getActiveSocialLinks,
  getActiveCategories,
  getActiveBrands,
} from '@/lib/supabase/queries'
import { brand } from '@/lib/config/brand'
import { brandIconDefaults } from '@/lib/config/brand-icon-defaults'
import type { Category, Brand, SocialLink } from '@/types/database'

// Map category slugs → Lucide icons. Falls back to HardHat for unknown slugs.
const categoryIcons: Record<string, LucideIcon> = {
  'mini-excavadoras': Shovel,
  'mini-tractores': Tractor,
  'mini-cargadoras': Cog,
  'elevadores-compactos': ArrowUpFromLine,
  'equipos-construccion': HardHat,
  'carretillas-elevadoras': Forklift,
}

const staticLinks = {
  empresa: [
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: '¿Por Qué Japonesa?', href: '/por-que-maquinaria-japonesa' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Contacto', href: '/contacto' },
  ],
  legal: [
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Aviso Legal', href: '/aviso-legal' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'whatsapp':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    case 'instagram':
      return <Instagram className="w-5 h-5" />
    case 'tiktok':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      )
    case 'youtube':
      return <Youtube className="w-5 h-5" />
    default:
      return null
  }
}

function CategoryLink({ category }: { category: Category }) {
  const Icon = categoryIcons[category.slug] ?? HardHat
  return (
    <li>
      <Link
        href={`/catalogo?categoria=${category.slug}`}
        className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="shrink-0 w-6 h-6 rounded flex items-center justify-center bg-primary/8 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
        </span>
        <span className="truncate leading-snug">{category.name}</span>
      </Link>
    </li>
  )
}

function BrandAvatar({ b }: { b: Brand }) {
  // Priority 1: Admin-uploaded logo
  if (b.logo) {
    return (
      <span className="shrink-0 w-6 h-6 rounded overflow-hidden flex items-center justify-center bg-secondary/60 border border-border/50 group-hover:border-primary/30 transition-colors">
        <Image
          src={b.logo}
          alt={b.name}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </span>
    )
  }

  const defaults = brandIconDefaults[b.slug]

  // Priority 2a: Static image file from config (added when real logos land in /public)
  if (defaults?.imagePath) {
    return (
      <span className="shrink-0 w-6 h-6 rounded overflow-hidden flex items-center justify-center bg-secondary/60 border border-border/50 group-hover:border-primary/30 transition-colors">
        <Image
          src={defaults.imagePath}
          alt={b.name}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </span>
    )
  }

  // Priority 2b: Colored initials badge from config
  if (defaults) {
    return (
      <span
        className="shrink-0 w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold leading-none select-none"
        style={{ backgroundColor: defaults.bg, color: defaults.fg }}
      >
        {defaults.initials}
      </span>
    )
  }

  // Priority 3: Generic fallback for unknown brands
  return (
    <span className="shrink-0 w-6 h-6 rounded flex items-center justify-center bg-secondary/60 border border-border/50 group-hover:border-primary/30 transition-colors">
      <Package className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
    </span>
  )
}

function BrandLink({ brand: b }: { brand: Brand }) {
  return (
    <li>
      <Link
        href={`/catalogo?marca=${b.slug}`}
        className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <BrandAvatar b={b} />
        <span className="truncate leading-snug">{b.name}</span>
      </Link>
    </li>
  )
}

export async function Footer() {
  const [settings, socialLinks, categories, brands] = await Promise.all([
    getContactSettings(),
    getActiveSocialLinks(),
    getActiveCategories(),
    getActiveBrands(),
  ])

  const phone = settings.phone ?? ''
  const email = settings.email ?? ''
  const address = settings.address ?? ''
  const hours = settings.hours ?? ''

  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/footer-texture.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-background/95" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded flex items-center justify-center">
                    <span className="font-serif text-2xl text-primary-foreground font-bold">MJ</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[oklch(0.50_0.25_25)] rounded-full" />
                </div>
                <div>
                  <span className="font-serif text-xl tracking-wider text-foreground block">
                    MAQUINARIA JAPONESA
                  </span>
                  <span className="text-xs text-muted-foreground tracking-widest">ESPAÑA</span>
                </div>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Especialistas en importación de maquinaria japonesa de segunda mano.
              Más de 15 años llevando la calidad japonesa a España.
            </p>

            <div className="space-y-3">
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>{phone}</span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span>{email}</span>
                </a>
              )}
              {address && (
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{address}</span>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((social: SocialLink) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    aria-label={`Síguenos en ${social.platform}`}
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Catálogo — dynamic categories with icons */}
          <div className="min-w-0">
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4">CATÁLOGO</h3>
            {categories.length > 0 ? (
              <ul className="space-y-2.5">
                {categories.map((cat) => (
                  <CategoryLink key={cat.id} category={cat} />
                ))}
                <li className="pt-1">
                  <Link
                    href="/catalogo"
                    className="text-sm text-primary/80 hover:text-primary transition-colors font-medium"
                  >
                    Ver todo →
                  </Link>
                </li>
              </ul>
            ) : (
              <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Ver Catálogo
              </Link>
            )}
          </div>

          {/* Marcas — dynamic brands with logos/fallback */}
          <div className="min-w-0">
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4">MARCAS</h3>
            {brands.length > 0 ? (
              <ul className="space-y-2.5">
                {brands.map((b) => (
                  <BrandLink key={b.id} brand={b} />
                ))}
              </ul>
            ) : (
              <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Ver Marcas
              </Link>
            )}
          </div>

          {/* Empresa & Legal */}
          <div className="min-w-0">
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4">EMPRESA</h3>
            <ul className="space-y-2">
              {staticLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4 mt-8">LEGAL</h3>
            <ul className="space-y-2">
              {staticLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
            </p>
            {hours && (
              <p className="text-xs text-muted-foreground">{hours}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
