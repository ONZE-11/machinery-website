'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Wrench, Clock, Award, Truck, HeartHandshake } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'Calidad Certificada',
    description: 'Cada máquina pasa rigurosas inspecciones técnicas antes de ser ofertada. Garantizamos la autenticidad de las horas de trabajo.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento Japonés',
    description: 'En Japón, las máquinas se mantienen con estándares impecables. Las revisiones son obligatorias y documentadas.',
  },
  {
    icon: Clock,
    title: 'Durabilidad Legendaria',
    description: 'La ingeniería japonesa es sinónimo de longevidad. Nuestras máquinas tienen décadas de vida útil por delante.',
  },
  {
    icon: Award,
    title: 'Marcas Premium',
    description: 'Trabajamos con Kubota, Yanmar, Komatsu, Iseki y otras marcas líderes reconocidas mundialmente.',
  },
  {
    icon: Truck,
    title: 'Entrega Nacional',
    description: 'Realizamos entregas en toda España peninsular e islas. Transporte especializado y seguro.',
  },
  {
    icon: HeartHandshake,
    title: 'Garantía Incluida',
    description: 'Todas nuestras máquinas incluyen garantía. Servicio técnico y recambios disponibles.',
  },
]

export function WhyJapaneseSection() {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A017' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-primary font-medium tracking-widest uppercase">
              La Diferencia Japonesa
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              ¿POR QUÉ <span className="text-green-gradient">MAQUINARIA JAPONESA?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La maquinaria japonesa es reconocida mundialmente por su excepcional calidad 
              de fabricación, durabilidad y bajo coste de mantenimiento.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-lg border border-border bg-background hover:border-primary/30 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl tracking-wide text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary">
            <Link href="/por-que-maquinaria-japonesa">
              Descubre Más
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
