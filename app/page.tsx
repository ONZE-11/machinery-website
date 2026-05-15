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
} from "@/lib/supabase/queries"

export default async function HomePage() {
  const [products, categories, brands, faqs] = await Promise.all([
    getFeaturedProducts(6),
    getActiveCategories(),
    getActiveBrands(),
    getActiveFAQs(5),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts products={products} />
        <CategoriesSection categories={categories} />
        <BrandsSection brands={brands} />
        <WhyJapaneseSection />
        <FAQSection faqs={faqs} />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
