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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoriesSection />
        <BrandsSection />
        <WhyJapaneseSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
