"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockFAQs } from "@/lib/mock-data"
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react"

export function FAQPageClient() {
  // Group FAQs by category
  const faqsByCategory = mockFAQs.reduce(
    (acc, faq) => {
      const category = faq.category || "General"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(faq)
      return acc
    },
    {} as Record<string, typeof mockFAQs>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <HelpCircle className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Preguntas{" "}
                <span className="text-primary">Frecuentes</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Encuentre respuestas a las dudas más comunes sobre nuestros
                productos, servicios y el proceso de importación de maquinaria
                japonesa a España.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {Object.entries(faqsByCategory).map(
              ([category, faqs], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Badge
                      variant="outline"
                      className="text-sm px-3 py-1 bg-primary/5 border-primary/20 text-primary"
                    >
                      {category}
                    </Badge>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-border rounded-lg px-6 data-[state=open]:border-primary/50 transition-colors"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-foreground pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                ¿No encuentra su pregunta?
              </h2>
              <p className="text-muted-foreground mb-8">
                Nuestro equipo de expertos está disponible para responder
                cualquier duda que tenga sobre nuestra maquinaria japonesa.
                Contáctenos y le responderemos en menos de 24 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button size="lg" className="gap-2">
                    Contactar Ahora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/34601080799"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="gap-2">
                    WhatsApp
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
