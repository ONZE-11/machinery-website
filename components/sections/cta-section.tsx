'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('34601080799')

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((rows: Array<{ setting_key: string; value: string }>) => {
        if (!Array.isArray(rows)) return
        rows.forEach((r) => {
          if (r.setting_key === 'phone') setPhone(r.value)
          if (r.setting_key === 'email') setEmail(r.value)
          if (r.setting_key === 'whatsapp') setWhatsapp(r.value.replace(/[\s+]/g, ''))
        })
      })
      .catch(() => {})
  }, [])

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/homepage-cta.jpg"
          alt="Maquinaria japonesa"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-primary font-medium tracking-widest uppercase">
              Contacte con Nosotros
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-6">
              ¿NECESITA <span className="text-green-gradient">ASESORAMIENTO?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Nuestro equipo de expertos está listo para ayudarle a encontrar 
              la maquinaria perfecta para sus necesidades. Sin compromiso.
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background/80 backdrop-blur-sm hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="flex-1">
                  <span className="text-foreground font-medium block">WhatsApp</span>
                  <span className="text-sm text-muted-foreground">Respuesta inmediata</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[#25D366] transition-colors" />
              </a>

              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background/80 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-foreground font-medium block">{phone}</span>
                  <span className="text-sm text-muted-foreground">Llame directamente</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background/80 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-foreground font-medium block">{email}</span>
                  <span className="text-sm text-muted-foreground">Envíe un email</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Form CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-8 md:p-10 border border-primary/20">
              <h3 className="font-serif text-2xl tracking-wide text-foreground mb-4">
                Formulario de Contacto
              </h3>
              <p className="text-muted-foreground mb-6">
                Complete el formulario y nos pondremos en contacto con usted en menos de 24 horas.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Asesoramiento personalizado gratuito</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Sin compromiso de compra</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Respuesta en menos de 24 horas</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full btn-green-glow">
                <Link href="/contacto">
                  Solicitar Información
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
