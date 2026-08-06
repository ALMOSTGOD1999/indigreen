import { Link } from '@inertiajs/react'
import modelBridal from '~/assets/website/model-bridal.jpg'
import modelElegant from '~/assets/website/model-elegant.jpg'

const CollectionBanners = () => {
  return (
    <section className="py-20 bg-background">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Gold Banner */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="relative overflow-hidden rounded-2xl border border-border/30">
            <img
              src={modelBridal}
              alt="Gold Collection"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="text-emerald font-semibold tracking-[0.2em] text-xs uppercase mb-4">
              Wedding Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
              Bridal Gold
              <span className="text-gradient-emerald block">Masterpieces</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Celebrate your special day with our exquisite bridal collection. Each piece is
              meticulously crafted to complement the radiance of the bride, featuring intricate
              designs that blend traditional motifs with contemporary elegance.
            </p>
            <Link
              href="/products?category=gold&collection=bridal"
              className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-4 transition-all duration-300 w-fit group"
            >
              Shop Bridal Collection
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Silver Banner */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center p-8 lg:p-12 order-2 lg:order-1">
            <span className="text-teal font-semibold tracking-[0.2em] text-xs uppercase mb-4">
              Everyday Elegance
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">
              Contemporary
              <span className="text-gradient-teal block">Silver Designs</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Discover our modern silver collection designed for everyday wear. Lightweight,
              stylish, and versatile pieces that effortlessly transition from office to evening
              gatherings.
            </p>
            <Link
              href="/products?category=silver"
              className="inline-flex items-center gap-2 text-teal font-semibold hover:gap-4 transition-all duration-300 w-fit group"
            >
              Explore Silver Collection
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border/30 order-1 lg:order-2">
            <img
              src={modelElegant}
              alt="Silver Collection"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionBanners
