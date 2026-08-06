'use client'
import { useEffect, useState, useMemo } from 'react'

const LETTERS = ['I', 'N', 'D', 'I', 'G', 'R', 'E', 'E', 'N']

// Each letter gets a distinct color and starting corner/edge
const letterConfig = [
  { color: '#10b981', glow: 'rgba(16,185,129,0.5)', startX: -120, startY: -120, rotation: -45 }, // I - top-left
  { color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', startX: 120, startY: -100, rotation: 30 }, // N - top-right
  { color: '#14b8a6', glow: 'rgba(20,184,166,0.5)', startX: -100, startY: 120, rotation: -30 }, // D - bottom-left
  { color: '#f97316', glow: 'rgba(249,115,22,0.5)', startX: 110, startY: 110, rotation: 45 }, // I - bottom-right
  { color: '#059669', glow: 'rgba(5,150,105,0.5)', startX: 0, startY: -130, rotation: -20 }, // G - top-center
  { color: '#e879f9', glow: 'rgba(232,121,249,0.5)', startX: -130, startY: 0, rotation: 25 }, // R - left-center
  { color: '#34d399', glow: 'rgba(52,211,153,0.5)', startX: 130, startY: 0, rotation: -35 }, // E - right-center
  { color: '#fbbf24', glow: 'rgba(251,191,36,0.5)', startX: -80, startY: 130, rotation: 40 }, // E - bottom-left-center
  { color: '#2dd4bf', glow: 'rgba(45,212,191,0.5)', startX: 80, startY: -130, rotation: -15 }, // N - top-right-center
]

// Coin count for the burst phase
const COIN_COUNT = 24

export default function WelcomeAnimation() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [phase, setPhase] = useState<'flying' | 'formed' | 'bursting' | 'done'>('flying')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('formed'), 2200), // Letters arrive
      setTimeout(() => setPhase('bursting'), 4400), // Letters explode into coins
      setTimeout(() => {
        setPhase('done')
        setFadeOut(true)
      }, 7200),
      setTimeout(() => setShow(false), 8300),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const letterOffsets = useMemo(() => {
    return LETTERS.map((_, i) => {
      const count = LETTERS.length
      const offset = (i - (count - 1) / 2) * 40
      return offset
    })
  }, [])

  // Scale the word and the coin burst down on small screens so nothing
  // overflows the viewport. Desktop (>= 700px) stays at 1 = unchanged.
  const smallScreenScale = useMemo(() => {
    if (typeof window === 'undefined') return 1
    return Math.min(1, window.innerWidth / 700)
  }, [])

  // Coin positions for the burst phase — distances are scaled with the
  // viewport so coins stay on screen on mobile.
  const coinBursts = useMemo(() => {
    return Array.from({ length: COIN_COUNT }, (_, i) => {
      const angle = (i / COIN_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
      const distance = (80 + Math.random() * 160) * smallScreenScale
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 720 - 360,
        delay: Math.random() * 0.45,
        size: 16 + Math.random() * 12,
      }
    })
  }, [smallScreenScale])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.9s ease-in-out',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0d1b2a 100%)',
      }}
    >
      {/* Ambient background orbs */}
      <div
        className="absolute rounded-full blur-3xl animate-pulse"
        style={{
          width: 'min(24rem, 60vw)',
          height: 'min(24rem, 60vw)',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          animationDuration: '4s',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl animate-pulse"
        style={{
          width: 'min(20rem, 50vw)',
          height: 'min(20rem, 50vw)',
          bottom: '-10%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%)',
          animationDuration: '5s',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex flex-col items-center justify-center">
        {/* === Letters flying in and forming === */}
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: '6rem', transform: `scale(${smallScreenScale})` }}
        >
          {LETTERS.map((letter, i) => {
            const cfg = letterConfig[i]
            const offset = letterOffsets[i]
            const isFlying = phase === 'flying'
            const isFormed = phase === 'formed'
            const isBursting = phase === 'bursting'

            let transform: string
            let opacity: number
            let letterSpacing: string

            if (isFlying) {
              transform = `translate(${cfg.startX}vw, ${cfg.startY}vh) rotate(${cfg.rotation}deg) scale(0.3)`
              opacity = 0
              letterSpacing = '0'
            } else if (isFormed) {
              transform = `translateX(${offset}px) rotate(0deg) scale(1)`
              opacity = 1
              letterSpacing = '0'
            } else {
              // bursting or done — letters scatter upward and fade
              const scatterX = (Math.random() - 0.5) * 60
              const scatterY = -80 - Math.random() * 40
              transform = `translateX(${offset + scatterX}px) translateY(${scatterY}px) rotate(${(Math.random() - 0.5) * 90}deg) scale(0)`
              opacity = 0
              letterSpacing = '0'
            }

            return (
              <span
                key={i}
                className="inline-block font-heading font-bold select-none"
                style={{
                  color: cfg.color,
                  textShadow: `0 0 20px ${cfg.glow}, 0 0 40px ${cfg.glow}`,
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  transform,
                  opacity,
                  letterSpacing,
                  transition: isFormed
                    ? `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.08}s`
                    : isBursting
                      ? `all 0.5s cubic-bezier(0.55, 0, 1, 0.45) ${i * 0.03}s`
                      : `all 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s`,
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>

        {/* === Gold coins bursting out === */}
        {(phase === 'bursting' || phase === 'done') && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {coinBursts.map((coin, i) => (
              <div
                key={`coin-${i}`}
                className="absolute"
                style={{
                  width: `${coin.size}px`,
                  height: `${coin.size}px`,
                  animation: `coinBurst${i} 2.4s cubic-bezier(0.22, 1, 0.36, 1) ${coin.delay}s forwards`,
                  opacity: 0,
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                    boxShadow:
                      '0 2px 8px rgba(245,158,11,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
                    border: '1px solid rgba(251,191,36,0.5)',
                  }}
                >
                  <span
                    className="font-bold select-none"
                    style={{
                      fontSize: `${coin.size * 0.45}px`,
                      color: '#92400e',
                    }}
                  >
                    ₹
                  </span>
                </div>
                {/* Coin shine */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: `${coin.size * 0.25}px`,
                    height: `${coin.size * 0.25}px`,
                    top: '15%',
                    right: '20%',
                    background: 'rgba(255,255,255,0.4)',
                    filter: 'blur(1px)',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* === Tagline === */}
        <div
          className="text-center mt-8"
          style={{
            opacity: phase === 'formed' ? 1 : 0,
            transform: phase === 'formed' ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s',
          }}
        >
          <p
            className="font-heading font-semibold tracking-wide"
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)',
            }}
          >
            <span style={{ color: '#10b981' }}>&ldquo;</span>
            WELCOME TO THE GOLDEN FUTURE
            <span style={{ color: '#10b981' }}>&rdquo;</span>
          </p>
        </div>

        {/* Loading bar */}
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 overflow-hidden rounded-full"
          style={{
            height: '3px',
            width: 'min(12rem, 40vw)',
            background: 'rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #10b981, #14b8a6, #f59e0b)',
              animation: 'loadingBar 7.4s ease-in-out forwards',
              width: '0%',
            }}
          />
        </div>

        <p
          className="fixed bottom-1 tracking-widest animate-pulse"
          style={{
            fontSize: '10px',
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          LOADING
        </p>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        ${coinBursts
          .map(
            (coin, i) => `
            @keyframes coinBurst${i} {
              0% {
                opacity: 0;
                transform: translate(0, 0) scale(0.3) rotate(0deg);
              }
              10% {
                opacity: 1;
              }
              60% {
                opacity: 1;
                transform: translate(${coin.x * 0.5}px, ${coin.y * 0.5}px) scale(0.85) rotate(${coin.rotation * 0.5}deg);
              }
              100% {
                opacity: 0;
                transform: translate(${coin.x}px, ${coin.y}px) scale(0.6) rotate(${coin.rotation}deg);
              }
            }
          `
          )
          .join('')}
      `}</style>
    </div>
  )
}
