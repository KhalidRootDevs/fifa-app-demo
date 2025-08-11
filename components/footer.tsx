"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, Mail, Phone, MapPin, Trophy } from "lucide-react"

const hostCountries = [
  { id: "usa", flag: "/flags/usa.svg", name: "United States" },
  { id: "canada", flag: "/flags/canada.svg", name: "Canada" },
  { id: "mexico", flag: "/flags/mexico.svg", name: "Mexico" },
]

const footerLinks = [
  {
    title: "World Cup 2026",
    links: [
      { label: "Live Matches", href: "/live" },
      { label: "Groups", href: "/groups" },
      { label: "Teams", href: "/teams" },
      { label: "Schedule", href: "/schedule" },
      { label: "Knockout Stage", href: "/knockout" },
      { label: "Statistics", href: "/stats" },
    ],
  },
  {
    title: "Tournament Info",
    links: [
      { label: "Host Cities", href: "/cities" },
      { label: "Stadiums", href: "/stadiums" },
      { label: "Qualification", href: "/qualification" },
      { label: "History", href: "/history" },
      { label: "Records", href: "/records" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Help Center", href: "/help" },
    ],
  },
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
  }

  return (
    <footer className="mt-16 glass-effect pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">FIFA 2026</span>
                <span className="text-sm text-gray-300 -mt-1">World Cup</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Experience the ultimate FIFA World Cup 2026 with live streaming, comprehensive coverage, and exclusive
              content from the greatest football tournament across North America.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={16} />, href: "#" },
                { icon: <Twitter size={16} />, href: "#" },
                { icon: <Instagram size={16} />, href: "#" },
                { icon: <Youtube size={16} />, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
                  whileHover={{ y: -3 }}
                  aria-label={`Follow us on ${social.icon.type.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-red-500 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">World Cup Updates</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest World Cup 2026 news, match updates, and exclusive tournament content.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-white/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="gradient-bg rounded-r-lg px-3 flex items-center justify-center"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Host Countries */}
        <div className="flex flex-wrap justify-center gap-8 my-8">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-4">Host Countries:</p>
            <div className="flex justify-center gap-6">
              {hostCountries.map((country) => (
                <motion.div
                  key={country.id}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                    <Image
                      src={country.flag || "/placeholder.svg"}
                      alt={country.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  </div>
                  <span className="text-xs text-gray-300">{country.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-6">
          <a
            href="mailto:support@fifa2026.com"
            className="flex items-center gap-2 hover:text-red-500 transition-colors"
          >
            <Mail size={14} />
            support@fifa2026.com
          </a>
          <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-red-500 transition-colors">
            <Phone size={14} />
            +1 (234) 567-890
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={14} />
            FIFA World Cup 2026 Official
          </span>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>
          <Link href="/pricing" className="hover:text-red-500 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-red-500 transition-colors">
            Contact
          </Link>
          <Link href="/terms" className="hover:text-red-500 transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="hover:text-red-500 transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} FIFA World Cup 2026. All Rights Reserved. | USA • Canada • Mexico
        </div>
      </div>
    </footer>
  )
}
