'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getContactSetting } from '@/lib/mock-data'

export function HeroSection() {
  const whatsappNumber = getContactSetting('whatsapp') || '34600000000'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hola%2C+me+interesa+vuestra+maquinaria+japonesa`

  return (
    <section className="relative w-full h-screen overflow-hidden pt-16">
      <Image
        src="/images/hero-excavator.jpg"
        alt="Maquinaria japonesa premium"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl px-4 sm:px-6 lg:px-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Importación Directa desde Japón</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Maquinaria{' '}
            <span className="text-primary">Japonesa</span>
            <br />
            Premium
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-8 font-light">
            Calidad. Precisión. Confianza.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 text-base px-8 h-12">
              <Link href="/catalogo">
                Explorar Catálogo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50 text-base px-8 h-12 backdrop-blur-sm"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-4 h-4" />
                Consultar por WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center gap-6 sm:gap-10 mt-10 pt-8 border-t border-white/15"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">+500</div>
              <div className="text-xs text-white/55 uppercase tracking-wider mt-0.5">Máquinas Vendidas</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-white/55 uppercase tracking-wider mt-0.5">Marcas Premium</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-white/55 uppercase tracking-wider mt-0.5">Años Experiencia</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </div>
    </section>
  )
}
