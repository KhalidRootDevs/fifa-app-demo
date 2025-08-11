"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Menu, X, Bell, LogIn } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<"login" | "signup">("login")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const openLoginModal = () => {
    setAuthModalView("login")
    setIsAuthModalOpen(true)
  }

  const openSignupModal = () => {
    setAuthModalView("signup")
    setIsAuthModalOpen(true)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus()
      }, 100)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirect to search results page
      window.location.href = `/matches?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/live", label: "LIVE" },
    { href: "/matches", label: "MATCHES" },
    { href: "/groups", label: "GROUPS" },
    { href: "/teams", label: "TEAMS" },
    { href: "/schedule", label: "SCHEDULE" },
    { href: "/pricing", label: "PRICING" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname?.startsWith(path)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">⚽</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">FIFA 2026</span>
                  <span className="text-xs text-gray-300 -mt-1">World Cup</span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.nav
              className="hidden lg:flex items-center space-x-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item text-sm font-medium ${
                    isActive(item.href) ? "text-white active" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>

            {/* Right Side Actions */}
            <motion.div
              className="hidden md:flex items-center space-x-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search teams, matches..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                    />
                    <button
                      type="button"
                      onClick={toggleSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={toggleSearch}
                    className="text-gray-300 hover:text-white transition-colors p-2"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Notifications */}
              <button
                className="text-gray-300 hover:text-white transition-colors relative p-2"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Login */}
              <button
                onClick={openLoginModal}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 p-2"
                aria-label="Log in"
              >
                <LogIn size={18} />
                <span className="hidden lg:inline">Log in</span>
              </button>

              {/* Sign Up */}
              <button
                onClick={openSignupModal}
                className="gradient-bg text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sign up
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={toggleSearch}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <motion.div
              className="mt-4 md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search teams, matches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </form>
            </motion.div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 glass-effect rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-3 px-2 rounded-lg font-medium ${
                      isActive(item.href) ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-white/10 my-2 pt-2"></div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openLoginModal()
                  }}
                  className="flex items-center gap-2 py-3 px-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  <LogIn size={18} />
                  <span>Log in</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    openSignupModal()
                  }}
                  className="gradient-bg text-white py-3 px-2 rounded-lg font-medium"
                >
                  Sign up
                </button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialView={authModalView} />
    </>
  )
}
