import type { Metadata } from "next"
import Link from "next/link"
import { Header, Footer } from "@/components/layout"
import { brand } from "@/lib/config/brand"

export const metadata: Metadata = {
  title: "Aviso Legal | Maquinaria Japonesa",
  description:
    "Aviso legal y condiciones de uso del sitio web de Maquinaria Japonesa. Información sobre la empresa, términos y condiciones, y responsabilidades legales.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-serif tracking-wide text-foreground mb-8">
            Aviso Legal
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Última actualización:</strong> 26 de mayo de 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Datos Identificativos
              </h2>
              <p className="text-muted-foreground mb-4">
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de
                julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE), se exponen los datos
                identificativos del titular del sitio web:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li><strong>Denominación social:</strong> {brand.legalName}</li>
                <li><strong>NIF:</strong> B12345678</li>
                <li><strong>Domicilio social:</strong> [Dirección completa], Valencia (Comunitat Valenciana), España</li>
                <li><strong>Teléfono:</strong> +34 601 080 799</li>
                <li><strong>Email:</strong> {brand.emails.legal}</li>
                <li><strong>Inscripción:</strong> Registro Mercantil de Valencia, Tomo [____], Folio [___], Hoja V-[______]</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Objeto
              </h2>
              <p className="text-muted-foreground mb-4">
                El presente sitio web tiene por objeto facilitar información
                sobre los productos y servicios de Maquinaria Japonesa
                S.L., incluyendo la exhibición de su catálogo de maquinaria
                japonesa y la posibilidad de contactar con la empresa para
                solicitar información o presupuestos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Condiciones de Uso
              </h2>
              <p className="text-muted-foreground mb-4">
                El acceso y uso del sitio web atribuye la condición de usuario
                e implica la aceptación plena de todas las condiciones
                incluidas en este Aviso Legal. El usuario se compromete a:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>Hacer un uso adecuado y lícito del sitio web, conforme a la legislación vigente.</li>
                <li>No realizar actividades ilícitas o contrarias a la buena fe y al orden público.</li>
                <li>No difundir contenidos de carácter racista, xenófobo, pornográfico, de apología del terrorismo o que atenten contra los derechos humanos.</li>
                <li>No provocar daños en los sistemas físicos y lógicos del sitio web, de sus proveedores o de terceros.</li>
                <li>No introducir virus informáticos o cualquier otro código que pueda causar daños a los sistemas.</li>
                <li>No intentar acceder a áreas restringidas del sitio web o de los sistemas informáticos.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Propiedad Intelectual e Industrial
              </h2>
              <p className="text-muted-foreground mb-4">
                Todos los contenidos del sitio web, incluyendo a título
                enunciativo pero no limitativo: textos, fotografías, gráficos,
                imágenes, iconos, tecnología, software, enlaces y demás
                contenidos audiovisuales, así como su diseño gráfico y códigos
                fuente, son propiedad intelectual de {brand.legalName} o de
                terceros que han autorizado su uso.
              </p>
              <p className="text-muted-foreground mb-4">
                Queda prohibida la reproducción total o parcial de cualquiera
                de los contenidos de este sitio web sin autorización expresa y
                por escrito de Maquinaria Japonesa S.L.
              </p>
              <p className="text-muted-foreground">
                Las marcas comerciales, nombres comerciales, logotipos o
                cualquier otro signo distintivo que aparezca en el sitio web
                son propiedad de sus respectivos titulares.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Exclusión de Responsabilidad
              </h2>
              <p className="text-muted-foreground mb-4">
                Maquinaria Japonesa S.L. no se hace responsable de:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>Los daños y perjuicios que puedan derivarse del uso del sitio web.</li>
                <li>La falta de disponibilidad, continuidad o calidad del funcionamiento del sitio web.</li>
                <li>Los contenidos de las páginas web de terceros a las que se pueda acceder mediante enlaces desde este sitio web.</li>
                <li>Los errores u omisiones en los contenidos del sitio web.</li>
                <li>Los daños causados por virus informáticos o por cualquier elemento que pueda producir alteraciones en los sistemas.</li>
                <li>El uso indebido que los usuarios puedan hacer de los contenidos del sitio web.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Información sobre Productos
              </h2>
              <p className="text-muted-foreground mb-4">
                La información sobre los productos mostrada en el sitio web
                tiene carácter meramente informativo. Las características
                técnicas, disponibilidad y precios pueden variar sin previo
                aviso.
              </p>
              <p className="text-muted-foreground mb-4">
                Las imágenes de los productos son orientativas y pueden no
                corresponder exactamente con el producto final. Para obtener
                información precisa y actualizada sobre cualquier producto,
                por favor contacte directamente con nosotros.
              </p>
              <p className="text-muted-foreground">
                Los precios mostrados, cuando aplique, no incluyen IVA ni
                gastos de transporte, salvo indicación expresa en contrario.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Enlaces a Terceros
              </h2>
              <p className="text-muted-foreground mb-4">
                Este sitio web puede contener enlaces a sitios web de terceros.
                Maquinaria Japonesa S.L. no controla ni es responsable
                de los contenidos, políticas de privacidad o prácticas de
                dichos sitios web.
              </p>
              <p className="text-muted-foreground">
                La inclusión de estos enlaces no implica ningún tipo de
                asociación, fusión o participación con las entidades
                conectadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Protección de Datos
              </h2>
              <p className="text-muted-foreground">
                La información relativa al tratamiento de datos personales se
                encuentra detallada en nuestra{" "}
                <Link href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Legislación Aplicable y Jurisdicción
              </h2>
              <p className="text-muted-foreground mb-4">
                Las presentes condiciones se rigen por la legislación española.
                Para la resolución de cualquier controversia que pudiera
                derivarse del acceso al sitio web, el usuario y {brand.legalName}{" "}
                acuerdan someterse, en la medida en que la legislación lo
                permita, a los Juzgados y Tribunales de Valencia, con renuncia
                expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Modificaciones
              </h2>
              <p className="text-muted-foreground">
                Maquinaria Japonesa S.L. se reserva el derecho de
                modificar en cualquier momento las presentes condiciones de uso
                del sitio web. Tales modificaciones serán publicadas en esta
                misma página y entrarán en vigor desde el momento de su
                publicación.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. Resolución de Litigios en Línea
              </h2>
              <p className="text-muted-foreground">
                De conformidad con el art. 14.1 del Reglamento (UE) 524/2013,
                la Comisión Europea facilita una plataforma de resolución de
                litigios en línea que se encuentra disponible en:{" "}
                <a
                  href="https://consumer-redress.ec.europa.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://consumer-redress.ec.europa.eu/
                </a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Si tiene alguna pregunta sobre este aviso legal, no dude en{" "}
              <Link href="/contacto" className="text-primary hover:underline">
                contactarnos
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
