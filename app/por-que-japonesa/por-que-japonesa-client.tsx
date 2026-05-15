"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Award,
  Cog,
  Fuel,
  Clock,
  ShieldCheck,
  Wrench,
  TrendingUp,
  Leaf,
  ArrowRight,
} from "lucide-react"

export function PorQueJaponesaClient() {
  const advantages = [
    {
      icon: Award,
      title: "Calidad de Fabricación Superior",
      description:
        "La filosofía japonesa 'Monozukuri' (el arte de hacer cosas) garantiza estándares de producción excepcionales. Cada componente es fabricado con precisión milimétrica.",
    },
    {
      icon: Clock,
      title: "Mayor Vida Útil",
      description:
        "La maquinaria japonesa está diseñada para durar décadas. Es común encontrar equipos con más de 20 años de servicio funcionando perfectamente.",
    },
    {
      icon: Fuel,
      title: "Eficiencia Energética",
      description:
        "Tecnología avanzada que optimiza el consumo de combustible, reduciendo costes operativos y minimizando el impacto ambiental.",
    },
    {
      icon: Cog,
      title: "Tecnología de Vanguardia",
      description:
        "Japón lidera la innovación en maquinaria industrial. Sistemas hidráulicos avanzados, electrónica de precisión y automatización inteligente.",
    },
    {
      icon: ShieldCheck,
      title: "Fiabilidad Comprobada",
      description:
        "Las marcas japonesas tienen las tasas de averías más bajas del sector. Menos tiempo de inactividad significa mayor productividad.",
    },
    {
      icon: Wrench,
      title: "Facilidad de Mantenimiento",
      description:
        "Diseño pensado para el mantenimiento preventivo. Acceso fácil a componentes y amplia disponibilidad de repuestos originales.",
    },
    {
      icon: TrendingUp,
      title: "Mejor Valor de Reventa",
      description:
        "La maquinaria japonesa mantiene su valor en el mercado de segunda mano. Una inversión que protege su capital a largo plazo.",
    },
    {
      icon: Leaf,
      title: "Compromiso Ambiental",
      description:
        "Cumplimiento de las normativas medioambientales más estrictas. Menor huella de carbono y mayor responsabilidad ecológica.",
    },
  ]

  const comparisons = [
    { feature: "Vida útil media", japanese: "20-30 años", others: "10-15 años" },
    { feature: "Tasa de averías", japanese: "Muy baja", others: "Media-Alta" },
    { feature: "Valor de reventa", japanese: "60-70%", others: "30-40%" },
    { feature: "Consumo combustible", japanese: "Optimizado", others: "Estándar" },
    { feature: "Disponibilidad repuestos", japanese: "Excelente", others: "Variable" },
    { feature: "Precisión de trabajo", japanese: "Superior", others: "Estándar" },
  ]

  return (
    <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                Excelencia Japonesa
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                ¿Por Qué Elegir{" "}
                <span className="text-primary">Maquinaria Japonesa</span>?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Japón es sinónimo de calidad, innovación y excelencia en la
                fabricación de maquinaria industrial. Descubra las razones por
                las que las empresas líderes del mundo confían en la tecnología
                japonesa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/catalogo">
                  <Button size="lg" className="gap-2">
                    Ver Catálogo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button size="lg" variant="outline">
                    Solicitar Asesoramiento
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advantages Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Ventajas de la Maquinaria Japonesa
              </h2>
              <p className="text-muted-foreground">
                La inversión en maquinaria japonesa se traduce en beneficios
                tangibles para su negocio desde el primer día.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <advantage.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Comparativa de Rendimiento
              </h2>
              <p className="text-muted-foreground">
                La diferencia entre la maquinaria japonesa y otras alternativas
                del mercado es evidente en todos los aspectos clave.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-muted/50 border-b border-border">
                  <div className="p-4 font-semibold text-foreground">
                    Característica
                  </div>
                  <div className="p-4 font-semibold text-primary text-center">
                    Maquinaria Japonesa
                  </div>
                  <div className="p-4 font-semibold text-muted-foreground text-center">
                    Otras Procedencias
                  </div>
                </div>
                {comparisons.map((row, index) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 ${
                      index !== comparisons.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="p-4 text-muted-foreground">
                      {row.feature}
                    </div>
                    <div className="p-4 text-center">
                      <span className="inline-flex items-center gap-2 text-primary font-medium">
                        <CheckCircle className="h-4 w-4" />
                        {row.japanese}
                      </span>
                    </div>
                    <div className="p-4 text-center text-muted-foreground">
                      {row.others}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Japanese Philosophy */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1565034946487-077786996e27?w=800&h=600&fit=crop"
                    alt="Fabricación japonesa de precisión"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  Filosofía Japonesa
                </Badge>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                  El Espíritu del Monozukuri
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">Monozukuri</strong>{" "}
                  significa literalmente &quot;el arte de hacer cosas&quot; en japonés.
                  Es una filosofía de fabricación que va más allá de la simple
                  producción: representa el orgullo del artesano, la búsqueda
                  continua de la perfección y el respeto por la tradición
                  mientras se abraza la innovación.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Esta filosofía se refleja en cada máquina japonesa: atención
                  meticulosa al detalle, uso de los mejores materiales,
                  procesos de control de calidad exhaustivos y un compromiso
                  inquebrantable con la excelencia.
                </p>
                <div className="space-y-3">
                  {[
                    "Kaizen: Mejora continua en cada proceso",
                    "Jidoka: Automatización con toque humano",
                    "Genchi Genbutsu: Ir a la fuente para entender",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
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
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                ¿Preparado para invertir en calidad?
              </h2>
              <p className="text-muted-foreground mb-8">
                Descubra nuestra selección de maquinaria japonesa premium.
                Nuestro equipo de expertos le ayudará a encontrar la solución
                perfecta para su negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/catalogo">
                  <Button size="lg" className="gap-2">
                    Explorar Catálogo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button size="lg" variant="outline">
                    Hablar con un Experto
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
    </main>
  )
}
