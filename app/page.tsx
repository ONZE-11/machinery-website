// Always render server-side so admin changes appear immediately without a redeploy
export const dynamic = 'force-dynamic'

import { Header, Footer, WhatsAppButton } from "@/components/layout"
import {
  HeroSection,
  FeaturedProducts,
  CategoriesSection,
  BrandsSection,
  WhyJapaneseSection,
  FAQSection,
  CTASection,
} from "@/components/sections"
import {
  getFeaturedProducts,
  getActiveCategories,
  getActiveBrands,
  getActiveFAQs,
  getHomepageSection,
} from "@/lib/supabase/queries"

export default async function HomePage() {
  const [products, categories, brands, faqs, heroSection, whySection] = await Promise.all([
    getFeaturedProducts(6),
    getActiveCategories(),
    getActiveBrands(),
    getActiveFAQs(5),
    getHomepageSection('hero'),
    getHomepageSection('why_japanese'),
  ])

  const heroImageUrl = heroSection?.image ?? null
  const whyImageUrl  = whySection?.image  ?? null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection imageUrl={heroImageUrl} />
        <FeaturedProducts products={products} />
        <CategoriesSection categories={categories} />
        <BrandsSection brands={brands} />
        <WhyJapaneseSection imageUrl={whyImageUrl} />
        <FAQSection faqs={faqs} />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
