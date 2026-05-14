import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react'
import { getActiveSocialLinks, getContactSetting } from '@/lib/mock-data'
import { brand } from '@/lib/config/brand'

const footerLinks = {
  catalogo: [
    { name: 'Mini Excavadoras', href: '/catalogo?categoria=mini-excavadoras' },
    { name: 'Mini Tractores', href: '/catalogo?categoria=mini-tractores' },
    { name: 'Mini Cargadoras', href: '/catalogo?categoria=mini-cargadoras' },
    { name: 'Elevadores', href: '/catalogo?categoria=elevadores-compactos' },
    { name: 'Carretillas', href: '/catalogo?categoria=carretillas-elevadoras' },
    { name: 'Ver Todo', href: '/catalogo' },
  ],
  marcas: [
    { name: 'Kubota', href: '/catalogo?marca=kubota' },
    { name: 'Yanmar', href: '/catalogo?marca=yanmar' },
    { name: 'Komatsu', href: '/catalogo?marca=komatsu' },
    { name: 'Iseki', href: '/catalogo?marca=iseki' },
    { name: 'Hinowa', href: '/catalogo?marca=hinowa' },
    { name: 'Toyota', href: '/catalogo?marca=toyota' },
  ],
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

export function Footer() {
  const socialLinks = getActiveSocialLinks()
  const phone = getContactSetting('phone')
  const email = getContactSetting('email')
  const address = getContactSetting('address')
  const hours = getContactSetting('hours')

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Background Texture */}
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
      
      {/* Main Footer */}
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
                  <span className="text-xs text-muted-foreground tracking-widest">
                    ESPAÑA
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Especialistas en importación de maquinaria japonesa de segunda mano. 
              Más de 15 años llevando la calidad japonesa a España.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>{email}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>{address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
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
          </div>

          {/* Catálogo */}
          <div>
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4">CATÁLOGO</h3>
            <ul className="space-y-2">
              {footerLinks.catalogo.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marcas */}
          <div>
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4">MARCAS</h3>
            <ul className="space-y-2">
              {footerLinks.marcas.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4">EMPRESA</h3>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="font-serif text-lg tracking-wider text-foreground mb-4 mt-8">LEGAL</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              {hours}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
