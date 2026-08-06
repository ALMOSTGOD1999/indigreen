import { HugeiconsIcon } from '@hugeicons/react'
import {
  CheckmarkBadge01Icon,
  PaintBrush01Icon,
  Diamond01Icon,
  SparklesIcon,
  SecurityCheckIcon,
  Money01Icon,
  UserLove01Icon,
  GiftIcon,
  CrownIcon,
  GoldIcon,
} from '@hugeicons/core-free-icons'

const features = [
  {
    icon: CheckmarkBadge01Icon,
    title: 'Certified Purity',
    description:
      'Every piece comes with BIS hallmark certification and a genuine purity guarantee, ensuring you invest with complete confidence.',
  },
  {
    icon: PaintBrush01Icon,
    title: 'Custom Designs',
    description:
      'Bring your vision to life with our bespoke design service — from concept sketches to finished masterpieces tailored to your style.',
  },
  {
    icon: Diamond01Icon,
    title: 'Master Craftsmanship',
    description:
      'Our artisans combine traditional techniques with modern precision to create heirloom-quality jewellery that lasts generations.',
  },
  {
    icon: SparklesIcon,
    title: 'Exclusive Designs',
    description:
      'Curated collections that balance timeless elegance with contemporary flair — designs you will not find anywhere else.',
  },
  {
    icon: SecurityCheckIcon,
    title: 'Full Transparency',
    description:
      'From pricing and purity to sourcing and billing — we believe in complete transparency so you always know what you are investing in.',
  },
  {
    icon: Money01Icon,
    title: 'Smart Investment',
    description:
      'Competitive pricing, transparent rates, and the intrinsic value of gold make every purchase a wise financial decision.',
  },
  {
    icon: UserLove01Icon,
    title: 'Customer First',
    description:
      'From personalised consultations to after-sales care, our dedicated team ensures a seamless experience at every step.',
  },
  {
    icon: GiftIcon,
    title: 'Every Occasion',
    description:
      'Whether it is a wedding, festival, milestone, or everyday elegance — find the perfect piece that celebrates your moment.',
  },
  {
    icon: CrownIcon,
    title: 'Legacy of Trust',
    description:
      'With decades of tradition and thousands of happy families, Indigreen Jewellery stands for uncompromising quality and enduring trust.',
  },
]

const highlights = [
  {
    icon: GoldIcon,
    title: 'Gold as a Secure Investment',
    description:
      'Investing in gold helps build a secure financial future. With rising global demand and enduring value, gold remains one of the safest assets for long-term wealth preservation.',
    accent: 'emerald' as const,
  },
  {
    icon: GiftIcon,
    title: 'Welcome Membership Gift',
    description:
      'Every new registered member receives a membership gift worth ₹999 in the form of a branded Indigreen Jewellery bag — our way of welcoming you to the family.',
    accent: 'copper' as const,
  },
]

const accentMap = {
  emerald: {
    gradient: 'from-emerald/15 via-emerald/5 to-transparent',
    border: 'border-emerald/15',
    iconBg: 'bg-emerald/10',
    iconText: 'text-emerald',
    shadow: 'hover:shadow-emerald',
    hoverBorder: 'hover:border-emerald/30',
    barColor: 'bg-emerald',
  },
  copper: {
    gradient: 'from-copper/15 via-copper/5 to-transparent',
    border: 'border-copper/15',
    iconBg: 'bg-copper/10',
    iconText: 'text-copper',
    shadow: 'hover:shadow-copper',
    hoverBorder: 'hover:border-copper/30',
    barColor: 'bg-copper',
  },
}

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-background">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--color-emerald)_0%,_transparent_70%)] opacity-[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--color-copper)_0%,_transparent_70%)] opacity-[0.02] rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-emerald mb-4">
            Why Indigreen
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Crafted with <span className="text-gradient-emerald">Passion</span>, Backed by{' '}
            <span className="text-gradient-copper">Trust</span>
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-emerald via-copper to-emerald mb-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Discover why thousands of families trust Indigreen Jewellery for their most precious
            moments — where quality meets integrity.
          </p>
        </div>

        {/* Features Grid — 3x3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 lg:mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-card border border-border/60 rounded-2xl p-6 md:p-7 transition-all duration-400 hover:border-emerald/25 hover:shadow-lg hover:shadow-emerald/5 hover:-translate-y-1"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald via-teal to-emerald rounded-t-2xl transition-all duration-500 group-hover:w-full" />

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/5 border border-emerald/10 group-hover:bg-emerald/10 group-hover:border-emerald/20 mb-5 transition-all duration-300">
                <HugeiconsIcon
                  icon={feature.icon}
                  className="h-5 w-5 text-emerald group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-emerald transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Highlight Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {highlights.map((item) => {
            const a = accentMap[item.accent]
            return (
              <div
                key={item.title}
                className={`relative bg-linear-to-br ${a.gradient} border ${a.border} rounded-2xl p-6 md:p-8 lg:p-10 transition-all duration-400 hover:-translate-y-1 ${a.shadow}`}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className={`shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full ${a.iconBg} border border-border/50`}>
                    <HugeiconsIcon icon={item.icon} className={`h-5 w-5 ${a.iconText}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
