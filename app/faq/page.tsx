import { Footer, Header, WhatsAppButton } from "@/components/layout"
import { FAQPageClient } from "./faq-client"

export default async function FAQPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  const res = await fetch(`${baseUrl}/api/faq`, {
    cache: "no-store",
  })

  const data = await res.json()

  const faqs = Array.isArray(data)
    ? data.filter((faq) => faq.active)
    : []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQPageClient faqs={faqs} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}