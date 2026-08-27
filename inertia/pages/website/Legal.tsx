import Layout from '~/components/website/layout/Layout'
import { HugeiconsIcon } from '@hugeicons/react'
import { File01Icon } from '@hugeicons/core-free-icons'

interface LegalDocument {
  title: string
  description: string
  image: string
}

interface LegalProps {
  documents: LegalDocument[]
}

const Legal = ({ documents }: LegalProps) => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-cream-dark overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald/3 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-emerald font-semibold tracking-[0.2em] text-xs uppercase">
              Legal Documents
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-6 text-foreground dark:text-slate-900">
              Terms & Policies
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Important legal documents and policies governing our business operations and customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {documents.length > 0 ? (
            <div className="space-y-16">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border/40 bg-card overflow-hidden hover:shadow-lg hover:shadow-emerald/5 transition-all duration-300"
                >
                  <div className="p-6 md:p-8 border-b border-border/40">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                      {doc.title}
                    </h2>
                    <p className="text-muted-foreground">{doc.description}</p>
                  </div>
                  <div className="p-4 md:p-8 bg-cream-dark/50">
                    <img
                      src={doc.image}
                      alt={doc.title}
                      className="w-full h-auto rounded-xl shadow-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald/5 border border-emerald/10 mb-6">
                <HugeiconsIcon icon={File01Icon} className="h-10 w-10 text-emerald/40" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-3">
                Coming Soon
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our legal documents are currently being updated. Please check back later for the latest terms, policies, and certifications.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Legal
