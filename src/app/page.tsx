import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import AboutSection from '@/components/landing/AboutSection'
import FoodGallery from '@/components/landing/FoodGallery'
import ReviewsSection from '@/components/landing/ReviewsSection'
import NumbersSection from '@/components/landing/NumbersSection'
import LocationSection from '@/components/landing/LocationSection'
import FAQSection from '@/components/landing/FAQSection'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <FoodGallery />
        <ReviewsSection />
        <NumbersSection />
        <LocationSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
