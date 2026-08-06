import { Link } from '@inertiajs/react'
import { Button } from '~/components/website/ui/button'
import modelBridal from '~/assets/website/model-bridal.jpg'

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={modelBridal}
          alt="Indigreen Jewellery Collection"
          className="w-full h-full object-cover object-top scale-105"
        />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-dark/95 via-slate-dark/80 to-emerald-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-transparent to-transparent opacity-60" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-[15%] w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-copper/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Brand badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-emerald-light text-xs font-medium tracking-[0.15em] uppercase">
              Indigreen Jewellery Pvt. Ltd.
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] mb-6 animate-fade-in-up">
            <span className="text-white">Crafted for</span>
            <br />
            <span className="text-gradient-emerald">Generations</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-lg animate-fade-in-up font-light">
            Where tradition meets modern artistry. Every piece tells a story of heritage,
            precision, and timeless beauty.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <Link href="/products">
              <Button variant="hero" size="xl">
                Explore Collections
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/investments">
              <Button variant="outlineGold" size="xl">
                Investment Plans
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 mt-12 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white/50 text-sm">BIS Hallmarked</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white/50 text-sm">100% Certified</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white/50 text-sm">Since 1985</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}

export default HeroSection
