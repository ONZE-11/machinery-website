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
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Nuestra Historia
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                  Especialistas en{" "}
                  <span className="text-primary">Maquinaria Japonesa</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Desde 2009, nos dedicamos a importar la mejor maquinaria
                  japonesa para empresas españolas. Nuestra pasión por la
                  calidad japonesa y nuestro conocimiento del mercado nos
                  convierte en el socio ideal para su negocio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/catalogo">
                    <Button size="lg" className="gap-2">
                      Ver Catálogo
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contacto">
                    <Button size="lg" variant="outline">
                      Contactar
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/about-team.jpg"
                    alt="Equipo de profesionales"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">+15 años</p>
                      <p className="text-sm text-muted-foreground">
                        de excelencia
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
