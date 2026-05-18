import { Footer, Header, WhatsAppButton } from "@/components/layout"
import { FAQPageClient } from "./faq-client"
import { createAdminClient } from "@/lib/supabase/server"

export default async function FAQPage() {
  const supabase = await createAdminClient()

  let faqs = []

  if (supabase) {
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error) {
      console.error("FAQ PAGE SUPABASE ERROR:", error.message)
    } else {
      faqs = data || []
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQPageClient faqs={faqs} />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}