import { HugeiconsIcon } from '@hugeicons/react'
import { Target01Icon, ViewIcon } from '@hugeicons/core-free-icons'

const commitments = [
  'Honesty and transparency in every transaction',
  'Reliability and unwavering quality standards',
  'Customer satisfaction as our top priority',
  'Continuous innovation in design and service',
  'Adapting to modern jewellery trends with grace',
]

const MissionVision = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--color-emerald)_0%,_transparent_70%)] opacity-[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--color-teal)_0%,_transparent_70%)] opacity-[0.02] rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-teal mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Mission{' '}
            <span className="text-gradient-emerald">&</span>{' '}
            <span className="text-gradient-teal">Vision</span>
          </h2>
          <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-emerald via-teal to-emerald mb-6" />
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Guided by purpose and driven by passion — shaping every decision we make
            and every piece we create.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Mission Card */}
          <div className="group relative bg-card border border-border/60 rounded-2xl shadow-premium overflow-hidden transition-all duration-400 hover:-translate-y-1">
            <div className="h-1.5 w-full bg-gradient-emerald" />

            <div className="p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald/8 border border-emerald/15">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    className="h-7 w-7 text-emerald"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald">
                    Our Mission
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-1">
                    What Drives Us
                  </h3>
                </div>
              </div>

              <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
                To celebrate weddings, anniversaries, festivals, achievements, and personal
                milestones by offering jewellery that becomes a treasured part of every
                customer&rsquo;s life.
              </p>

              <div className="space-y-3">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Our Commitments
                </span>
                <ul className="space-y-2.5">
                  {commitments.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald" />
                      <span className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-card border border-border/60 rounded-2xl shadow-premium overflow-hidden transition-all duration-400 hover:-translate-y-1">
            <div className="h-1.5 w-full bg-gradient-teal" />

            <div className="p-8 md:p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal/8 border border-teal/15">
                  <HugeiconsIcon
                    icon={ViewIcon}
                    className="h-7 w-7 text-teal"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal">
                    Our Vision
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-1">
                    Where We&rsquo;re Headed
                  </h3>
                </div>
              </div>

              <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
                To become one of the most trusted jewellery brands by providing authentic
                jewellery, superior craftsmanship, and outstanding customer service.
              </p>

              {/* Legacy Goal */}
              <div className="bg-gradient-to-br from-teal/[0.03] to-emerald/[0.03] border border-border/50 rounded-xl p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald/15 to-teal/15">
                    <svg
                      className="w-5 h-5 text-emerald"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v3m0 0a6 6 0 016 6v3m-6-9a6 6 0 00-6 6v3m0 0a6 6 0 00-6 6v3m12-3a6 6 0 016 6v3m-6-9a6 6 0 00-6 6v3"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-semibold text-foreground mb-1.5">
                      A Legacy for Generations
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      Build a legacy that lasts for generations by offering jewellery that becomes
                      part of family traditions and celebrations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MissionVision
