import type { Metadata } from "next"
import Link from "next/link"
import { Header, Footer } from "@/components/layout"
import { brand } from "@/lib/config/brand"

export const metadata: Metadata = {
  title: "Política de Cookies | Maquinaria Japonesa",
  description:
    "Información sobre las cookies que utilizamos en nuestro sitio web. Tipos de cookies, finalidades y cómo gestionarlas según la normativa RGPD y LSSI.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-serif tracking-wide text-foreground mb-8">
            Política de Cookies
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-6">
              <strong>Última actualización:</strong> 26 de mayo de 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. ¿Qué son las Cookies?
              </h2>
              <p className="text-muted-foreground mb-4">
                Las cookies son pequeños archivos de texto que los sitios web
                almacenan en su navegador cuando los visita. Se utilizan
                ampliamente para hacer que los sitios web funcionen de manera
                más eficiente, así como para proporcionar información a los
                propietarios del sitio.
              </p>
              <p className="text-muted-foreground">
                Las cookies permiten que un sitio web reconozca el dispositivo
                de un usuario y recuerde información sobre su visita, como sus
                preferencias de idioma, configuraciones y otros detalles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Tipos de Cookies que Utilizamos
              </h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.1 Cookies Técnicas (Necesarias)
              </h3>
              <p className="text-muted-foreground mb-4">
                Son esenciales para el funcionamiento básico del sitio web.
                Permiten la navegación y el uso de funciones básicas.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-muted-foreground">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Finalidad</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-3">session_id</td>
                      <td className="p-3">Mantener la sesión del usuario</td>
                      <td className="p-3">Sesión</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3">cookie_consent</td>
                      <td className="p-3">Almacenar preferencias de cookies</td>
                      <td className="p-3">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.2 Cookies de Análisis
              </h3>
              <p className="text-muted-foreground mb-4">
                Nos permiten reconocer y contar el número de visitantes,
                así como ver cómo navegan por nuestro sitio web.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-muted-foreground">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-foreground">Cookie</th>
                      <th className="text-left p-3 font-semibold text-foreground">Proveedor</th>
                      <th className="text-left p-3 font-semibold text-foreground">Finalidad</th>
                      <th className="text-left p-3 font-semibold text-foreground">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-3">_va</td>
                      <td className="p-3">Vercel Analytics</td>
                      <td className="p-3">Análisis de uso del sitio</td>
                      <td className="p-3">Sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                2.3 Cookies de Funcionalidad
              </h3>
              <p className="text-muted-foreground mb-4">
                Permiten recordar sus preferencias (como el idioma o región)
                y proporcionar funciones mejoradas y personalizadas.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Cookies de Terceros
              </h2>
              <p className="text-muted-foreground mb-4">
                Nuestro sitio web puede incluir funcionalidades proporcionadas
                por terceros que pueden establecer sus propias cookies:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>
                  <strong>Vercel Analytics:</strong> Proporciona análisis de
                  rendimiento y uso del sitio web respetando la privacidad
                  del usuario.
                </li>
                <li>
                  <strong>WhatsApp:</strong> El botón de WhatsApp puede
                  establecer cookies cuando se utiliza para contactar con
                  nosotros.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Base Legal
              </h2>
              <p className="text-muted-foreground mb-4">
                De conformidad con el artículo 22.2 de la Ley 34/2002, de 11
                de julio, de Servicios de la Sociedad de la Información y de
                Comercio Electrónico (LSSI-CE) y el Reglamento (UE) 2016/679
                (RGPD):
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>
                  <strong>Cookies técnicas necesarias:</strong> Se utilizan
                  sobre la base de interés legítimo, ya que son
                  imprescindibles para el funcionamiento del sitio web.
                </li>
                <li>
                  <strong>Cookies de análisis y otras:</strong> Requieren su
                  consentimiento expreso antes de ser instaladas en su
                  dispositivo.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Gestión de Cookies
              </h2>
              <p className="text-muted-foreground mb-4">
                Puede configurar su navegador para rechazar o aceptar cookies,
                así como para eliminar las cookies existentes. A continuación
                le indicamos cómo hacerlo en los navegadores más comunes:
              </p>
              <ul className="text-muted-foreground space-y-2 list-disc pl-6">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Internet Explorer
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                <strong>Importante:</strong> Si desactiva las cookies, algunas
                funcionalidades del sitio web pueden no estar disponibles o
                funcionar correctamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Actualización de la Política
              </h2>
              <p className="text-muted-foreground">
                Esta Política de Cookies puede ser actualizada periódicamente
                para reflejar cambios en las cookies que utilizamos o por
                otros motivos operativos, legales o reglamentarios. Le
                recomendamos que revise esta política regularmente para estar
                informado sobre el uso de cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Más Información
              </h2>
              <p className="text-muted-foreground mb-4">
                Para más información sobre cómo tratamos sus datos personales,
                consulte nuestra{" "}
                <Link href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </Link>
                .
              </p>
              <p className="text-muted-foreground">
                Si tiene alguna duda sobre nuestra política de cookies, puede
                contactarnos en:{" "}
                <a
                  href={`mailto:${brand.emails.privacy}`}
                  className="text-primary hover:underline"
                >
                  {brand.emails.privacy}
                </a>
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
