'use client'
import { useEffect, useRef, useState } from 'react'
import { router } from '@inertiajs/react'

export default function PageTransition() {
  const [show, setShow] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [phase, setPhase] = useState<'brand' | 'tagline' | 'done'>('brand')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const cleanup = router.on('start', () => {
      // Clear any pending timers from previous navigation
      timers.current.forEach(clearTimeout)
      timers.current = []

      setShow(true)
      setFadeOut(false)
      setPhase('brand')

      // Fast sequence: brand → tagline → fade out
      timers.current.push(setTimeout(() => setPhase('tagline'), 350))
      timers.current.push(
        setTimeout(() => {
          setPhase('done')
          setFadeOut(true)
        }, 700)
      )
      timers.current.push(setTimeout(() => setShow(false), 1000))
    })

    return cleanup
  }, [])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-300 ease-in-out"
      style={{
        opacity: fadeOut ? 0 : 1,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0d1b2a 100%)',
      }}
    >
      {/* Quick glow orbs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 'min(24rem, 60vw)',
          height: 'min(24rem, 60vw)',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 'min(20rem, 50vw)',
          height: 'min(20rem, 50vw)',
          bottom: '-10%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* Brand */}
        <div
          className="mb-3 text-center transition-all duration-300 ease-out"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                boxShadow: '0 4px 20px -4px rgba(16,185,129,0.3)',
              }}
            >
              <span className="text-white text-lg font-bold font-heading">I</span>
            </div>
            <span
              className="font-heading font-bold no-underline"
              style={{
                color: '#10b981',
                fontSize: 'clamp(1.875rem, 5vw, 2.25rem)',
                textShadow: '0 0 20px rgba(16,185,129,0.3)',
              }}
            >
              Indigreen
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          className="text-center transition-all duration-300 ease-out"
          style={{
            opacity: phase === 'brand' ? 0 : 1,
            transform: phase === 'brand' ? 'translateY(15px)' : 'translateY(0)',
          }}
        >
          {(phase === 'tagline' || phase === 'done') && (
            <p className="text-white text-2xl md:text-4xl font-bold tracking-wide">
              <span style={{ color: '#10b981' }} className="font-bold">&ldquo;</span>
              Dreams Will Become True
              <span style={{ color: '#10b981' }} className="font-bold">&rdquo;</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
