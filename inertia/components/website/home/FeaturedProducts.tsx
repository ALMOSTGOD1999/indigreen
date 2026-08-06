import { Link } from '@inertiajs/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { FavouriteIcon } from '@hugeicons/core-free-icons'
import productRing from '~/assets/website/product-ring.jpg'
import productNecklace from '~/assets/website/product-necklace.jpg'
import productEarrings from '~/assets/website/product-earrings.jpg'
import productBangles from '~/assets/website/product-bangles.jpg'
import productChain from '~/assets/website/product-chain.jpg'
import productAnklet from '~/assets/website/product-anklet.jpg'
import productMaangtikka from '~/assets/website/product-maangtikka.jpg'
import productPendant from '~/assets/website/product-pendant.jpg'

const products = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    category: 'Gold Ring',
    price: 45999,
    originalPrice: 52999,
    image: productRing,
    isNew: true,
  },
  {
    id: 2,
    name: 'Elegant Gold Pendant',
    category: 'Gold Necklace',
    price: 28999,
    image: productNecklace,
    isBestSeller: true,
  },
  {
    id: 3,
    name: 'Traditional Earrings',
    category: 'Gold Earrings',
    price: 18999,
    originalPrice: 22999,
    image: productEarrings,
  },
  {
    id: 4,
    name: 'Bridal Bangle Set',
    category: 'Gold Bangles',
    price: 125999,
    image: productBangles,
    isNew: true,
  },
  {
    id: 5,
    name: 'Temple Gold Chain',
    category: 'Gold Chain',
    price: 78999,
    image: productChain,
    isBestSeller: true,
  },
  {
    id: 6,
    name: 'Silver Payal Set',
    category: 'Silver Anklet',
    price: 8999,
    originalPrice: 10999,
    image: productAnklet,
  },
  {
    id: 7,
    name: 'Bridal Maang Tikka',
    category: 'Gold Headpiece',
    price: 35999,
    image: productMaangtikka,
    isNew: true,
  },
  {
    id: 8,
    name: 'Ruby Gold Pendant',
    category: 'Gold Pendant',
    price: 42999,
    image: productPendant,
    isBestSeller: true,
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-emerald font-semibold tracking-[0.2em] text-xs uppercase">
            Handpicked for You
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 text-foreground">
            Featured Collection
          </h2>
          <div className="w-16 h-1 bg-gradient-emerald mx-auto mt-5 rounded-full" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border/40 hover:border-emerald/20 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-400"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-cream">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-emerald text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg tracking-wide uppercase">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-copper text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg tracking-wide uppercase">
                      Bestseller
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-destructive text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg tracking-wide uppercase">
                      Sale
                    </span>
                  )}
                </div>
                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white shadow-sm">
                  <HugeiconsIcon
                    icon={FavouriteIcon}
                    className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors"
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                <h3 className="font-medium mt-1 text-sm md:text-base line-clamp-1 group-hover:text-emerald transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-semibold text-emerald">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-4 transition-all duration-300 group"
          >
            View All Products
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
