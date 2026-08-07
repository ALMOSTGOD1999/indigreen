import { Link } from '@inertiajs/react'
import Layout from '~/components/website/layout/Layout'
import { HugeiconsIcon } from '@hugeicons/react'
import { Award01Icon, UserGroupIcon, FavouriteIcon, SparklesIcon } from '@hugeicons/core-free-icons'
import modelGold from '~/assets/website/model-gold.jpg'
import goldCollection from '~/assets/website/gold-collection.jpg'

const stats = [
  { label: 'Years of Excellence', value: '38+' },
  { label: 'Happy Families', value: '50K+' },
  { label: 'Designs Created', value: '10K+' },
  { label: 'Stores Nationwide', value: '25+' },
]

const values = [
  {
    icon: Award01Icon,
    title: 'Quality Craftsmanship',
    description:
      'Every piece is crafted with precision by our master artisans who bring decades of expertise.',
  },
  {
    icon: UserGroupIcon,
    title: 'Customer First',
    description:
      'Your satisfaction is our priority. We go above and beyond to ensure a delightful experience.',
  },
  {
    icon: FavouriteIcon,
    title: 'Trust & Transparency',
    description: '100% BIS Hallmarked jewellery with complete transparency in pricing and quality.',
  },
  {
    icon: SparklesIcon,
    title: 'Innovation',
    description:
      'Blending traditional artistry with contemporary designs to create timeless pieces.',
  },
]

const AboutUs = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-cream-dark overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald/3 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-emerald font-semibold tracking-[0.2em] text-xs uppercase">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground dark:text-slate-900">
              Crafting Dreams Since 1985
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For nearly four decades, Indigreen Jewellery has been a trusted name in fine jewellery,
              creating pieces that celebrate life's most precious moments.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={modelGold}
                alt="Indigreen Jewellery Legacy"
                className="rounded-2xl shadow-premium"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-emerald p-6 rounded-2xl shadow-emerald hidden md:block">
                <p className="text-3xl font-heading font-bold text-white">38+</p>
                <p className="text-white/80 text-sm">Years of Excellence</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                A Legacy of Trust & Excellence
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 1985 by Mr. Hari Singh Mehta, Indigreen Jewellery began as a small
                  family-owned shop in the heart of Delhi. With a passion for creating beautiful
                  jewellery and a commitment to quality, the business quickly grew into one of the
                  most trusted names in the industry.
                </p>
                <p>
                  Today, under the leadership of the third generation, we continue to uphold the
                  same values that our grandfather instilled — craftsmanship, integrity, and
                  customer satisfaction. Every piece that leaves our workshop carries the weight of
                  our legacy and the promise of excellence.
                </p>
                <p>
                  Our team of master artisans, many of whom have been with us for over 20 years,
                  bring their expertise and passion to every design. We combine time-honored
                  techniques with modern innovation to create pieces that are both traditional and
                  contemporary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-luxury relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-heading font-bold text-emerald-light mb-2">
                  {stat.value}
                </p>
                <p className="text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-copper font-semibold tracking-[0.2em] text-xs uppercase">
              What We Believe
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 text-foreground">
              Our Core Values
            </h2>
            <div className="w-16 h-1 bg-gradient-copper mx-auto mt-5 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-2xl bg-card border border-border/40 hover:border-emerald/20 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald/5 border border-emerald/10 mb-4">
                  <HugeiconsIcon icon={value.icon} className="h-6 w-6 text-emerald" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-emerald font-semibold tracking-[0.2em] text-xs uppercase">
                Our Workshop
              </span>
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Where Magic Happens
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our state-of-the-art workshop houses the finest equipment and technology while
                  preserving traditional craftsmanship techniques passed down through generations.
                </p>
                <p>
                  Each piece undergoes rigorous quality checks at every stage — from design
                  conceptualization to final polishing. We use only the purest metals and ethically
                  sourced gemstones in our creations.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  '100% BIS Hallmarked',
                  'Certified Artisans',
                  'Quality Guaranteed',
                  'Ethical Sourcing',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 bg-emerald rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={goldCollection}
                alt="Indigreen Jewellery Workshop"
                className="rounded-2xl shadow-premium"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AboutUs
