import Layout from '~/components/website/layout/Layout'

interface LegalDocument {
  title: string
  image: string
}

interface LegalProps {
  documents: LegalDocument[]
}

const Legal = ({ documents }: LegalProps) => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-cream-dark overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald/3 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-emerald font-semibold tracking-[0.2em] text-xs uppercase">
            Legal Documents
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mt-3 text-foreground dark:text-slate-900">
            Terms & Policies
          </h1>
        </div>
      </section>

      {/* Documents — full-bleed images stacked vertically */}
      <section className="bg-background">
        {documents.map((doc, index) => (
          <div key={index} className="w-full">
            <img
              src={doc.image}
              alt={doc.title}
              className="w-full h-auto block"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {documents.length === 0 && (
          <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
              Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our legal documents are currently being updated. Please check back later.
            </p>
          </div>
        )}
      </section>
    </Layout>
  )
}

export default Legal
