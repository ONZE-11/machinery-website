'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { brand } from '@/lib/config/brand'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { getContactSetting } from '@/lib/mock-data'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Marcas', href: '/marcas' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
  { name: '¿Por Qué Japonesa?', href: '/por-que-maquinaria-japonesa' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const phone = getContactSetting('phone')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/[0.98] backdrop-blur-md border-b border-border/60 shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      )}
    >
      <nav
        className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"
        aria-label="Navegación principal"
      >
        <div className="flex h-[68px] items-center justify-between gap-6">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label={`${brand.name} — inicio`}
          >
            {/* Mark */}
            <div className={cn(
              'relative flex items-center justify-center w-9 h-9 rounded-[6px] transition-colors duration-300',
              isScrolled
                ? 'bg-primary'
                : 'bg-white/15 border border-white/25 group-hover:bg-primary'
            )}>
              <span className="font-serif text-[13px] font-bold tracking-wider text-white leading-none">
                MJ
              </span>
            </div>
            {/* Wordmark */}
            <div className="hidden sm:flex flex-col gap-0">
              <span className={cn(
                'text-[11px] font-bold tracking-[0.18em] uppercase leading-none transition-colors duration-300',
                isScrolled ? 'text-foreground' : 'text-white'
              )}>
                Maquinaria
              </span>
              <span className={cn(
                'text-[11px] font-bold tracking-[0.18em] uppercase leading-none transition-colors duration-300',
                isScrolled ? 'text-primary' : 'text-white/70'
              )}>
                Japonesa
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 flex-1 justify-center">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200',
                    'after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[1.5px] after:rounded-full',
                    'after:transition-transform after:duration-200 after:origin-left',
                    isScrolled
                      ? isActive
                        ? 'text-foreground after:bg-primary after:scale-x-100'
                        : 'text-foreground/70 hover:text-foreground after:bg-primary after:scale-x-0 hover:after:scale-x-100'
                      : isActive
                        ? 'text-white after:bg-white after:scale-x-100'
                        : 'text-white/75 hover:text-white after:bg-white after:scale-x-0 hover:after:scale-x-100'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* ── Right side: phone + CTA ── */}
          <div className="hidden lg:flex lg:items-center lg:gap-4 shrink-0">
            {/* Phone — subtle link */}
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className={cn(
                'flex items-center gap-1.5 text-[12px] font-medium transition-colors duration-200',
                isScrolled
                  ? 'text-muted-foreground hover:text-primary'
                  : 'text-white/60 hover:text-white'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden xl:inline tabular-nums">
                {phone}
              </span>
            </a>

            {/* Divider */}
            <div className={cn(
              'w-px h-5 transition-colors duration-300',
              isScrolled ? 'bg-border' : 'bg-white/20'
            )} />

            {/* CTA */}
            <Button
              asChild
              size="sm"
              className={cn(
                'h-8 px-5 text-[12px] font-semibold tracking-wide rounded-[6px] transition-all duration-300',
                isScrolled
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                  : 'bg-white text-foreground hover:bg-white/90'
              )}
            >
              <Link href="/contacto">Contacto</Link>
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className={cn(
              'lg:hidden p-2 rounded-md transition-colors duration-200',
              isScrolled
                ? 'text-foreground hover:bg-secondary'
                : 'text-white hover:bg-white/10'
            )}
          >
            {mobileMenuOpen
              ? <X className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>

        </div>
      </nav>

      {/* ── Mobile menu panel ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden bg-white border-b border-border shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 space-y-0.5">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center px-3 py-2.5 text-[14px] font-medium rounded-md transition-colors',
                      isActive
                        ? 'text-primary bg-primary/5'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <div className="pt-3 pb-1">
                <Button
                  asChild
                  className="w-full h-10 bg-primary text-white hover:bg-primary/90 text-sm font-semibold rounded-[6px]"
                >
                  <Link href="/contacto" onClick={() => setMobileMenuOpen(false)}>
                    Contacto
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
