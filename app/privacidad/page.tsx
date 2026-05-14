import type { Metadata } from "next"
import Link from "next/link"
import { Header, Footer } from "@/components/layout"
import { brand } from "@/lib/config/brand"

export const metadata: Metadata = {
  title: "Política de Privacidad | Maquinaria Japonesa",
  description:
    "Política de privacidad y protección de datos personales. Cumplimiento RGPD y LOPD-GDD para usuarios de nuestro sitio web de maquinaria japonesa.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-serif tracking-wide text-foreground mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Última actualización:</strong> 1 de enero de 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Responsable del Tratamiento
              </h2>
              <p className="text-muted-foreground mb-4">
                En cumplimiento del Reglamento (UE) 2016/679 del Parlamento
                Europeo y del Consejo (RGPD) y la Ley Orgánica 3/2018, de 5 de
                diciembre, de Protección de Datos Personales y garantía de los
                derechos digitales (LOPD-GDD), le informamos que:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li><strong>Razón Social:</strong> {brand.legalName}</li>
                <li><strong>NIF:</strong> B12345678</li>
                <li><strong>Dirección:</strong> Polígono Industrial La Maquinaria, Nave 15, 28001 Madrid, España</li>
                <li><strong>Email:</strong> {brand.emails.privacy}</li>
                <li><strong>Teléfono:</strong> +34 600 000 000</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Datos que Recopilamos
              </h2>
              <p className="text-muted-foreground mb-4">
                Recopilamos los siguientes tipos de datos personales:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li><strong>Datos de identificación:</strong> Nombre, apellidos, NIF/CIF, dirección postal.</li>
                <li><strong>Datos de contacto:</strong> Email, teléfono, empresa.</li>
                <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia.</li>
                <li><strong>Datos comerciales:</strong> Historial de consultas, productos de interés, presupuestos solicitados.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Finalidad del Tratamiento
              </h2>
              <p className="text-muted-foreground mb-4">
                Sus datos personales serán tratados para las siguientes finalidades:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>Gestión de consultas y solicitudes de información.</li>
                <li>Envío de presupuestos personalizados.</li>
                <li>Gestión de la relación comercial.</li>
                <li>Envío de comunicaciones comerciales (con su consentimiento previo).</li>
                <li>Cumplimiento de obligaciones legales.</li>
                <li>Mejora de nuestros servicios y experiencia de usuario.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Legitimación del Tratamiento
              </h2>
              <p className="text-muted-foreground mb-4">
                La base legal para el tratamiento de sus datos es:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li><strong>Consentimiento del interesado</strong> para el envío de comunicaciones comerciales.</li>
                <li><strong>Ejecución de un contrato</strong> o medidas precontractuales para la gestión de presupuestos y consultas.</li>
                <li><strong>Interés legítimo</strong> para la mejora de nuestros servicios.</li>
                <li><strong>Cumplimiento de obligaciones legales</strong> aplicables.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Conservación de los Datos
              </h2>
              <p className="text-muted-foreground mb-4">
                Los datos personales se conservarán durante el tiempo necesario
                para cumplir con la finalidad para la que fueron recabados y
                para determinar las posibles responsabilidades derivadas de
                dicha finalidad:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li><strong>Datos de clientes:</strong> Durante la relación comercial y hasta 5 años después para cumplir obligaciones fiscales.</li>
                <li><strong>Datos de consultas:</strong> Hasta 2 años desde la última comunicación.</li>
                <li><strong>Datos de marketing:</strong> Hasta que retire su consentimiento.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Destinatarios de los Datos
              </h2>
              <p className="text-muted-foreground mb-4">
                Sus datos podrán ser comunicados a:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>Administraciones públicas cuando lo exija la normativa aplicable.</li>
                <li>Proveedores de servicios (hosting, email marketing, analytics) bajo contrato de encargado de tratamiento.</li>
                <li>Entidades financieras para la gestión de pagos y financiación.</li>
                <li>Empresas de transporte para la entrega de maquinaria.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                No se realizan transferencias internacionales de datos fuera del
                Espacio Económico Europeo.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Derechos del Interesado
              </h2>
              <p className="text-muted-foreground mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li><strong>Acceso:</strong> Conocer qué datos personales tratamos sobre usted.</li>
                <li><strong>Rectificación:</strong> Modificar datos inexactos o incompletos.</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos.</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento.</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado.</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos.</li>
                <li><strong>Revocación del consentimiento:</strong> Retirar el consentimiento prestado.</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Para ejercer estos derechos, puede contactarnos en:{" "}
                <a href={`mailto:${brand.emails.privacy}`} className="text-primary hover:underline">
                  {brand.emails.privacy}
                </a>
              </p>
              <p className="text-muted-foreground mt-4">
                Asimismo, tiene derecho a presentar una reclamación ante la
                Agencia Española de Protección de Datos (
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  www.aepd.es
                </a>
                ).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                Este sitio web utiliza cookies propias y de terceros. Para más
                información, consulte nuestra{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Seguridad de los Datos
              </h2>
              <p className="text-muted-foreground mb-4">
                Implementamos medidas técnicas y organizativas apropiadas para
                garantizar un nivel de seguridad adecuado al riesgo, incluyendo:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>Cifrado de datos en tránsito mediante HTTPS/TLS.</li>
                <li>Control de acceso basado en roles.</li>
                <li>Copias de seguridad periódicas.</li>
                <li>Monitorización y detección de intrusiones.</li>
                <li>Formación del personal en protección de datos.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. Modificaciones
              </h2>
              <p className="text-muted-foreground">
                Nos reservamos el derecho de modificar esta Política de
                Privacidad para adaptarla a novedades legislativas o
                jurisprudenciales. Cualquier cambio será publicado en esta
                página con indicación de la fecha de última actualización.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Si tiene alguna pregunta sobre esta política, no dude en{" "}
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
