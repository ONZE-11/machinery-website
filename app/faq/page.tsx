import { Footer, Header, WhatsAppButton } from "@/components/layout"
import { FAQPageClient } from "./faq-client"

export default async function FAQPage() {
  const res = await fetch("http://localhost:3000/api/faq", {
    cache: "no-store",
  })

  const data = await res.json()
  const faqs = Array.isArray(data)
    ? data.filter((faq) => faq.active)
    : []

  console.log("FAQ PAGE DATA:", faqs)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQPageClient faqs={faqs} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}