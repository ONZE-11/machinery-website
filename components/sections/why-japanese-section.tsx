'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Shield, Wrench, Clock, Award, Truck, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'Calidad Certificada',
    description: 'Inspecciones técnicas rigurosas antes de cada oferta. Autenticidad de horas garantizada.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento Japonés',
    description: 'Revisiones obligatorias y documentadas conforme a los estándares impecables de Japón.',
  },
  {
    icon: Clock,
    title: 'Durabilidad Legendaria',
    description: 'Ingeniería japonesa diseñada para décadas. La mejor relación vida útil por euro invertido.',
  },
  {
    icon: Award,
    title: 'Marcas Premium',
    description: 'Kubota, Yanmar, Komatsu, Iseki y Toyota: los fabricantes más valorados del mundo.',
  },
  {
    icon: Truck,
    title: 'Entrega Nacional',
    description: 'Transporte especializado a toda España peninsular e islas. Seguro y puntual.',
  },
  {
    icon: HeartHandshake,
    title: 'Garantía Incluida',
    description: 'Garantía en motor e hidráulica en todos los equipos. Servicio técnico propio.',
  },
]

const stats = [
  { value: '+500', label: 'Máquinas vendidas' },
  { value: '15+', label: 'Años de experiencia' },
  { value: '98%', label: 'Clientes satisfechos' },
  { value: '24h', label: 'Respuesta garantizada' },
]

const DEFAULT_IMAGE = '/images/homepage-why-japanese.jpg'

interface WhyJapaneseSectionProps {
  imageUrl?: string | null
}

export function WhyJapaneseSection({ imageUrl }: WhyJapaneseSectionProps) {
  const [currentImage, setCurrentImage] = useState(imageUrl || DEFAULT_IMAGE)

  useEffect(() => {
    setCurrentImage(imageUrl || DEFAULT_IMAGE)
  }, [imageUrl])

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Top: split layout — image left, headline + stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: image with overlaid stat counter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={currentImage}
                alt="Precisión de la ingeniería japonesa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setCurrentImage(DEFAULT_IMAGE)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent" />

              {/* Stat counter overlay — bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 grid grid-cols-2 gap-px bg-black/30 backdrop-blur-sm">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center py-3 px-4">
                    <div className="font-serif text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] text-white/55 uppercase tracking-wider mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: headline + text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="text-sm text-primary font-medium tracking-widest uppercase">
              La Diferencia Japonesa
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-6">
              ¿POR QUÉ <span className="text-green-gradient">MAQUINARIA JAPONESA?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              La maquinaria japonesa es reconocida mundialmente por su calidad de fabricación excepcional,
              durabilidad legendaria y bajo coste operativo. En Japón, cada máquina se mantiene con
              estándares industriales impecables, lo que garantiza equipos en condiciones superiores
              al resto del mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="gap-2 bg-primary text-white hover:bg-primary/90">
                <Link href="/por-que-maquinaria-japonesa">
                  Descubrir Más
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 border-border hover:border-primary">
                <Link href="/catalogo">
                  Ver Catálogo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom: 6-feature icon grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group"
            >
              <div className="p-6 rounded-xl border border-border bg-background hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg tracking-wide text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
