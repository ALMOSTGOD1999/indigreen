import modelGold from '~/assets/website/model-gold.jpg'

const stats = [
  { label: 'Years of Excellence', value: '38+' },
  { label: 'Happy Families', value: '50K+' },
  { label: 'Unique Designs', value: '10K+' },
]

const CompanyProfile = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/5 via-background to-background" />

      {/* Decorative orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald/3 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-copper/3 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 lg:mb-16 animate-fade-in-up">
          <span className="inline-block text-copper font-semibold tracking-[0.2em] text-xs uppercase">
            Our Story
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 text-foreground">
            About Indigreen Jewellery
          </h2>
          <div className="w-16 h-1 bg-gradient-emerald mx-auto mt-5 rounded-full" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-5 animate-fade-in-up">
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              At{' '}
              <strong className="text-emerald font-semibold">
                Indigreen Jewellery Private Limited
              </strong>
              , we are dedicated to providing elegant, premium-quality jewellery crafted with
              exceptional workmanship. Each piece is thoughtfully designed to celebrate life's most
              precious moments.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              Trust and authenticity are the cornerstones of everything we do. We take pride in
              offering 100% BIS Hallmarked jewellery with complete transparency, ensuring every
              purchase brings confidence and joy.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              Our master artisans pour decades of expertise into every design, blending timeless
              aesthetics with contemporary elegance — creating heirloom-worthy pieces that transcend
              generations.
            </p>

            {/* Quote box */}
            <div className="relative pl-6 border-l-2 border-emerald/30 mt-8">
              <p className="italic text-foreground/80 font-heading text-lg">
                "Every piece is designed to celebrate life's most precious moments."
              </p>
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden shadow-premium">
              <img
                src={modelGold}
                alt="Indigreen Jewellery — Premium Gold Collection"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/20 to-transparent pointer-events-none" />
            </div>

            {/* Decorative frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-emerald/10 -z-10 hidden lg:block" />
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-copper/10 -z-10 hidden lg:block" />

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 lg:-left-6 bg-gradient-emerald text-white font-heading font-bold px-5 py-3 rounded-xl shadow-emerald hidden md:block">
              <span className="text-sm">Since 1985</span>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative mt-16 lg:mt-20 grid grid-cols-3 gap-8 py-10 px-6 lg:px-12 rounded-2xl bg-gradient-luxury shadow-premium overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          {stats.map((stat, index) => (
            <div key={stat.label} className="relative text-center">
              <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-emerald-light">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm md:text-base mt-1">{stat.label}</p>
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/4 bottom-1/4 w-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyProfile
