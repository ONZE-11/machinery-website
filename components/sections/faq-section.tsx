'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import type { FAQ } from '@/types/database'

interface FAQSectionProps {
  faqs: FAQ[]
  showAll?: boolean
}

export function FAQSection({ faqs, showAll = false }: FAQSectionProps) {
  const displayFaqs = faqs
  const shownFaqs = showAll ? displayFaqs : displayFaqs.slice(0, 5)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-primary font-medium tracking-widest uppercase">
              Preguntas Frecuentes
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wider mt-4 mb-4">
              RESOLVEMOS TUS <span className="text-green-gradient">DUDAS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Encuentra respuestas a las preguntas más comunes sobre nuestra maquinaria japonesa.
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {shownFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-border rounded-lg px-6 bg-card data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline">
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* View All CTA */}
        {!showAll && displayFaqs.length > 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Button asChild variant="outline" className="border-primary/30 hover:border-primary">
              <Link href="/faq">
                Ver Todas las Preguntas
                <ChevronDown className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
