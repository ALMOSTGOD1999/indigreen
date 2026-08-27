import { Link, usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Menu01Icon, Search01Icon, UserIcon } from '@hugeicons/core-free-icons'
import { ThemeToggle } from '~/components/theme-toggle'
import logo from '~/assets/website/logo.png'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/products' },
  { name: 'Gold', href: '/products?category=gold' },
  { name: 'Silver', href: '/products?category=silver' },
  { name: 'Invest', href: '/investments' },
  { name: 'About', href: '/about' },
  { name: 'Legal', href: '/legal' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { url, props } = usePage<any>()
  const user = props.user

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-emerald/5 border-b border-border/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 hover:bg-emerald/10 rounded-xl transition-colors shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5 text-emerald" />
              ) : (
                <HugeiconsIcon icon={Menu01Icon} className="h-5 w-5" />
              )}
            </button>

            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              {/* Logo Mark */}
              <img
                src={logo}
                alt="Indigreen Jewellery"
                className="h-10 md:h-11 w-auto rounded-lg shrink-0 group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = url === item.href || (item.href !== '/' && url.startsWith(item.href.split('?')[0]))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-emerald bg-emerald/8'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-emerald rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-muted/60 rounded-xl transition-colors hidden sm:flex">
              <HugeiconsIcon icon={Search01Icon} className="h-[18px] w-[18px] text-muted-foreground" />
            </button>
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Link
              href={user ? '/dashboard' : '/login'}
              className="inline-flex items-center gap-2 bg-gradient-emerald text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-emerald hover:shadow-lg hover:shadow-emerald/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shrink-0"
            >
              <HugeiconsIcon icon={UserIcon} className="h-4 w-4" />
              <span className="hidden sm:inline">{user ? 'Dashboard' : 'Sign In'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 animate-fade-in-up">
          <nav className="max-w-[1920px] mx-auto px-4 py-6 flex flex-col gap-1">
            {navigation.map((item) => {
              const isActive = url === item.href || (item.href !== '/' && url.startsWith(item.href.split('?')[0]))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-base font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-emerald bg-emerald/8 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <div className="flex items-center gap-3 py-3 px-4 border-t border-border/50 mt-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
