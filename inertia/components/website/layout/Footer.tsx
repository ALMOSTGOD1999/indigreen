import { Link } from '@inertiajs/react'
import logo from '~/assets/website/logo.png'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Facebook02Icon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  Location01Icon,
  Call02Icon,
  Mail01Icon,
} from '@hugeicons/core-free-icons'

const Footer = () => {
  return (
    <footer className="bg-slate-dark text-white">
      {/* Main Footer */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Indigreen Jewellery"
                className="h-12 w-auto rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Crafting timeless elegance since 1985. Your trusted destination for exquisite gold and
              silver jewellery that celebrates life's most precious moments.
            </p>
            <div className="flex gap-2 pt-1">
              {[Facebook02Icon, InstagramIcon, TwitterIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2.5 bg-white/5 rounded-xl hover:bg-emerald/20 border border-white/5 hover:border-emerald/20 transition-all duration-300"
                >
                  <HugeiconsIcon icon={Icon} className="h-4 w-4 text-white/60 hover:text-emerald-light transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Gold Jewellery', href: '/products?category=gold' },
                { name: 'Silver Jewellery', href: '/products?category=silver' },
                { name: 'New Arrivals', href: '/products?sort=newest' },
                { name: 'Best Sellers', href: '/products?sort=popular' },
                { name: 'Investment Plans', href: '/investments' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-emerald-light transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald/40 group-hover:bg-emerald-light transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'FAQs', href: '/faqs' },
                { name: 'Shipping & Returns', href: '/shipping' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Legal', href: '/legal' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/40 hover:text-emerald-light transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald/40 group-hover:bg-emerald-light transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-emerald/10 rounded-lg shrink-0 mt-0.5">
                  <HugeiconsIcon icon={Location01Icon} className="h-4 w-4 text-emerald" />
                </div>
                <span className="text-white/40 text-sm leading-relaxed">
                  Newtown, Kolkata<br />West Bengal 700135
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-emerald/10 rounded-lg shrink-0">
                  <HugeiconsIcon icon={Call02Icon} className="h-4 w-4 text-emerald" />
                </div>
                <span className="text-white/40 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-emerald/10 rounded-lg shrink-0">
                  <HugeiconsIcon icon={Mail01Icon} className="h-4 w-4 text-emerald" />
                </div>
                <span className="text-white/40 text-sm">info@indigreenjewellery.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-sm">
            © {new Date().getFullYear()} Indigreen Jewellery Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/20">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald/60" />
              BIS Hallmarked
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald/60" />
              100% Certified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald/60" />
              Lifetime Exchange
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
