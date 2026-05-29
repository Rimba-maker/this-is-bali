import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import StatsBar from '@/components/landing/StatsBar'
import AboutSection from '@/components/landing/AboutSection'
import FoodGallery from '@/components/landing/FoodGallery'
import ReviewsSection from '@/components/landing/ReviewsSection'
import LocationSection from '@/components/landing/LocationSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <FoodGallery />
        <ReviewsSection />
        <LocationSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
