"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setView(initialView)
      setEmail("")
      setPassword("")
      setName("")
      setError("")
      setShowPassword(false)
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
      onClose()
      console.log("Email login successful")
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      console.log("Email signup successful")
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
      alert("Password reset link sent to your email")
    }, 1500)
  }

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true)

    // Simulate Google OAuth flow
    setTimeout(() => {
      setIsGoogleLoading(false)
      onClose()
      console.log(`Google ${view} initiated`)
    }, 2000)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const formVariants = {
    hidden: { opacity: 0, x: view === "signup" ? 20 : view === "login" ? -20 : 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: view === "signup" ? -20 : view === "login" ? 20 : 0,
      transition: { duration: 0.2 },
    },
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-sm"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4">
                <button
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-1"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </button>

                {view === "forgot" && (
                  <button
                    className="absolute top-4 left-4 text-white/60 hover:text-white transition-colors p-1"
                    onClick={() => setView("login")}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white font-bold text-xl">⚽</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {view === "login" && "Welcome Back"}
                    {view === "signup" && "Join FIFA 2026"}
                    {view === "forgot" && "Reset Password"}
                  </h2>
                  <p className="text-white/70 text-sm">
                    {view === "login" && "Sign in to your account"}
                    {view === "signup" && "Create your account"}
                    {view === "forgot" && "We'll send you a reset link"}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-xl mb-4 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div key={view} variants={formVariants} initial="hidden" animate="visible" exit="exit">
                    {/* Google Sign In Button */}
                    {view !== "forgot" && (
                      <motion.button
                        onClick={handleGoogleAuth}
                        disabled={isGoogleLoading || isLoading}
                        className="w-full relative overflow-hidden bg-white hover:bg-gray-50 text-gray-900 font-medium py-3.5 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed group mb-4 border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Animated background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-red-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative flex items-center justify-center gap-3">
                          {isGoogleLoading ? (
                            <>
                              <div className="w-5 h-5 relative">
                                <div className="absolute inset-0 border-2 border-gray-300 rounded-full"></div>
                                <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 border-r-red-500 border-b-yellow-500 border-l-green-500 rounded-full animate-spin"></div>
                              </div>
                              <span className="text-sm font-medium">Connecting...</span>
                            </>
                          ) : (
                            <>
                              {/* Google Logo SVG */}
                              <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#4285F4"
                                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                  fill="#34A853"
                                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                  fill="#FBBC05"
                                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                  fill="#EA4335"
                                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                              </svg>
                              <span className="text-sm font-medium bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                                Continue with Google
                              </span>
                            </>
                          )}
                        </div>

                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                      </motion.button>
                    )}

                    {/* Divider */}
                    {view !== "forgot" && (
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-3 bg-white/10 text-white/60 rounded-full backdrop-blur-sm">or</span>
                        </div>
                      </div>
                    )}

                    {/* Login Form */}
                    {view === "login" && (
                      <form onSubmit={handleLogin} className="space-y-3">
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm"
                              placeholder="Email address"
                              required
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                          </div>

                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-10 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm"
                              placeholder="Password"
                              required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="text-xs text-white/60 hover:text-white transition-colors"
                            onClick={() => setView("forgot")}
                          >
                            Forgot password?
                          </button>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white py-3 rounded-2xl font-medium relative mt-4 shadow-lg hover:shadow-xl transition-all"
                          disabled={isLoading || isGoogleLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="opacity-0">Sign In</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            </>
                          ) : (
                            "Sign In"
                          )}
                        </button>

                        <div className="text-center text-sm text-white/60 mt-4">
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
                      <form onSubmit={handleSignup} className="space-y-3">
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm"
                              placeholder="Full name"
                              required
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                          </div>

                          <div className="relative">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm"
                              placeholder="Email address"
                              required
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                          </div>

                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-10 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm"
                              placeholder="Password (8+ characters)"
                              required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white py-3 rounded-2xl font-medium relative mt-4 shadow-lg hover:shadow-xl transition-all"
                          disabled={isLoading || isGoogleLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="opacity-0">Create Account</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </button>

                        <div className="text-center text-sm text-white/60 mt-4">
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
                      <form onSubmit={handleForgotPassword} className="space-y-4">
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-sm"
                            placeholder="Enter your email address"
                            required
                          />
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white py-3 rounded-2xl font-medium relative shadow-lg hover:shadow-xl transition-all"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span className="opacity-0">Send Reset Link</span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            </>
                          ) : (
                            "Send Reset Link"
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Features Preview - Only show for login/signup */}
                {view !== "forgot" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 p-3 bg-white/5 rounded-2xl border border-white/10"
                  >
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span>HD Streaming</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span>Live Stats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span>Notifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span>Exclusive Content</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Terms */}
                <div className="mt-4 text-center text-xs text-white/50">
                  By continuing, you agree to our{" "}
                  <a href="/terms" className="text-white/70 hover:text-white transition-colors">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-white/70 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
