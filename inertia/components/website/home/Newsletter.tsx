import { useState } from 'react'
import { Button } from '~/components/website/ui/button'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for subscribing!')
    setEmail('')
  }

  return (
    <section className="py-20 bg-gradient-luxury relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-copper/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-emerald-light font-semibold tracking-[0.2em] text-xs uppercase">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-3 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/50 mb-8">
            Be the first to know about new arrivals, exclusive offers, and special events.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-emerald/50 focus:bg-white/8 transition-all duration-300"
            />
            <Button variant="hero" size="lg" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
