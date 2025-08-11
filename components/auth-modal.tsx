"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, ArrowRight, Github, Twitter } from "lucide-react"
import Image from "next/image"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup" | "forgot">(initialView)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setView(initialView)
      setEmail("")
      setPassword("")
      setName("")
      setError("")
    }
  }, [isOpen, initialView])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, always succeed
      window.location.href = "/"
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // For demo purposes, always succeed
      window.location.href = "/"
    }, 1500)
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setView("login")
      // Show success message
      alert("Password reset link sent to your email")
    }, 1500)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="glass-card rounded-xl overflow-hidden border border-white/10">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal content */}
              <div className="p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <Image src="/logo.png" alt="Hola Football" width={150} height={50} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-6">
                  {view === "login" && "Welcome Back"}
                  {view === "signup" && "Create Account"}
                  {view === "forgot" && "Reset Password"}
                </h2>

                {/* Error message */}
                {error && <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}

                {/* Login Form */}
                {view === "login" && (
                  <form onSubmit={handleLogin}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
                            placeholder="your@email.com"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <label htmlFor="password" className="block text-sm font-medium">
                            Password
                          </label>
                          <button
                            type="button"
                            className="text-xs text-gray-400 hover:text-white transition-colors"
                            onClick={() => setView("forgot")}
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
                            placeholder="••••••••"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full gradient-bg text-white py-3 rounded-lg font-medium relative"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="opacity-0">Sign In</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-[#111827] text-gray-400">Or continue with</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Github</span>
                        </button>
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Twitter</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-400">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        className="text-white font-medium hover:underline"
                        onClick={() => setView("signup")}
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                )}

                {/* Signup Form */}
                {view === "signup" && (
                  <form onSubmit={handleSignup}>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
                            placeholder="John Doe"
                            required
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="signup-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
                            placeholder="your@email.com"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="signup-password" className="block text-sm font-medium mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            id="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
                            placeholder="••••••••"
                            required
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters long</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full gradient-bg text-white py-3 rounded-lg font-medium relative"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="opacity-0">Create Account</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-[#111827] text-gray-400">Or continue with</span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Github</span>
                        </button>
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          <span>Twitter</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-white font-medium hover:underline"
                        onClick={() => setView("login")}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                )}

                {/* Forgot Password Form */}
                {view === "forgot" && (
                  <form onSubmit={handleForgotPassword}>
                    <div className="mb-6">
                      <p className="text-gray-400 text-sm mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                      </p>

                      <div>
                        <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="reset-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
                            placeholder="your@email.com"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full gradient-bg text-white py-3 rounded-lg font-medium relative"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="opacity-0">Send Reset Link</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </button>

                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                        onClick={() => setView("login")}
                      >
                        <span className="flex items-center justify-center gap-1">
                          <ArrowRight className="w-3 h-3" />
                          Back to login
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
