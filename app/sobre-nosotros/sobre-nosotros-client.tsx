"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Header, Footer, WhatsAppButton } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Globe,
  TrendingUp,
  Shield,
  ArrowRight,
} from "lucide-react"

export function SobreNosotrosClient() {
  const stats = [
    { value: "15+", label: "Años de experiencia" },
    { value: "500+", label: "Máquinas vendidas" },
    { value: "98%", label: "Clientes satisfechos" },
    { value: "24h", label: "Respuesta garantizada" },
  ]

  const values = [
    {
      icon: Shield,
      title: "Calidad",
      description:
        "Solo trabajamos con maquinaria que cumple nuestros estrictos estándares de calidad japonesa.",
    },
    {
      icon: Heart,
      title: "Compromiso",
      description:
        "Nos comprometemos con cada cliente como si fuera el único. Su éxito es nuestro éxito.",
    },
    {
      icon: Users,
      title: "Confianza",
      description:
        "Relaciones a largo plazo basadas en la transparencia y el cumplimiento de promesas.",
    },
    {
      icon: TrendingUp,
      title: "Excelencia",
      description:
        "Mejora continua en todos nuestros procesos para ofrecer siempre el mejor servicio.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Cinematic Hero */}
        <section className="relative min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden">
          <Image
            src="/images/about-team.jpg"
            alt="Equipo especialista en maquinaria japonesa"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Directional overlay — dark on left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
          {/* Bottom fade — smooth transition to page content below */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Text content */}
          <div className="relative z-10 w-full">
            <div className="container mx-auto px-4 pt-24 pb-16 md:pt-28">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                <Badge className="mb-4 bg-white/15 text-white border-white/25 backdrop-blur-sm">
                  Nuestra Historia
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-6">
                  Especialistas en{" "}
                  <span className="text-primary">Maquinaria Japonesa</span>
                </h1>
                <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                  Desde 2009, nos dedicamos a importar la mejor maquinaria
                  japonesa para empresas españolas. Nuestra pasión por la
                  calidad japonesa y nuestro conocimiento del mercado nos
                  convierte en el socio ideal para su negocio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 gap-2">
                    <Link href="/catalogo">
                      Ver Catálogo
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50">
                    <Link href="/contacto">Contactar</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating trust card — anchored bottom-right of section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute bottom-8 right-6 md:right-12 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/30 flex items-center justify-center">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">+15 años</p>
                <p className="text-xs text-white/65">de excelencia</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-8"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Nuestra Misión
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Proporcionar a las empresas españolas acceso a la mejor
                  maquinaria japonesa del mercado, con un servicio integral que
                  incluye asesoramiento experto, importación directa y soporte
                  postventa de primera clase. Queremos ser el puente entre la
                  excelencia japonesa y la industria española.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-8"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Nuestra Visión
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconocidos como el referente número uno en España para la
                  adquisición de maquinaria japonesa. Aspiramos a expandir
                  nuestra presencia en toda Europa, manteniendo siempre nuestro
                  compromiso inquebrantable con la calidad y la satisfacción del
                  cliente.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Lo que nos define
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Nuestros Valores
              </h2>
              <p className="text-muted-foreground">
                Los principios que guían cada decisión y cada interacción con
                nuestros clientes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Por qué elegirnos
                </Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  La diferencia de trabajar con expertos
                </h2>
                <div className="space-y-4">
                  {[
                    "Importación directa desde Japón sin intermediarios",
                    "Inspección rigurosa de cada máquina antes del envío",
                    "Documentación completa y tramitación incluida",
                    "Garantía en todos nuestros productos",
                    "Servicio técnico y repuestos disponibles",
                    "Financiación flexible adaptada a sus necesidades",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/about-shipping.jpg"
                    alt="Maquinaria de calidad"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <Globe className="h-12 w-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                ¿Listo para trabajar con los mejores?
              </h2>
              <p className="text-muted-foreground mb-8">
                Descubra cómo podemos ayudarle a encontrar la maquinaria
                japonesa perfecta para su negocio. Contacte hoy para una
                consulta sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button size="lg" className="gap-2">
                    Solicitar Consulta
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/catalogo">
                  <Button size="lg" variant="outline">
                    Ver Catálogo
                  </Button>
                </Link>
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
