"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X, CreditCard, Bitcoin, Shield, Lock, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/useAuthStore"
import { useUIStore } from "@/lib/store/useUIStore"

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)

  const { user } = useAuthStore()
  const { openAuthModal } = useUIStore()

  const plans = [
    {
      id: "free",
      name: "Free",
      description: "Basic access to selected matches",
      price: 0,
      originalPrice: 0,
      icon: Star,
      features: [
        { name: "SD quality streaming", included: true },
        { name: "5 matches per month", included: true },
        { name: "Basic match statistics", included: true },
        { name: "Ad-supported experience", included: true },
        { name: "Mobile and tablet access", included: true },
        { name: "HD & 4K streaming", included: false },
        { name: "No ads", included: false },
        { name: "Multi-device streaming", included: false },
        { name: "Full match replays", included: false },
        { name: "Exclusive content", included: false },
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for casual fans",
      price: 9.99,
      originalPrice: 12.99,
      icon: Zap,
      features: [
        { name: "SD quality streaming", included: true },
        { name: "Unlimited matches", included: true },
        { name: "Basic match statistics", included: true },
        { name: "Ad-supported experience", included: true },
        { name: "Mobile and tablet access", included: true },
        { name: "HD streaming", included: true },
        { name: "No ads", included: false },
        { name: "Multi-device streaming", included: false },
        { name: "Full match replays", included: true },
        { name: "Exclusive content", included: false },
      ],
      cta: "Choose Basic",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Our most popular plan",
      price: 19.99,
      originalPrice: 24.99,
      icon: Crown,
      features: [
        { name: "SD quality streaming", included: true },
        { name: "Unlimited matches", included: true },
        { name: "Advanced match statistics", included: true },
        { name: "Ad-free experience", included: true },
        { name: "Mobile and tablet access", included: true },
        { name: "HD & 4K streaming", included: true },
        { name: "No ads", included: true },
        { name: "Multi-device streaming", included: true },
        { name: "Full match replays", included: true },
        { name: "Exclusive content", included: false },
      ],
      cta: "Choose Premium",
      popular: true,
    },
    {
      id: "ultimate",
      name: "Ultimate",
      description: "For the ultimate football fan",
      price: 29.99,
      originalPrice: 39.99,
      icon: Crown,
      features: [
        { name: "SD quality streaming", included: true },
        { name: "Unlimited matches", included: true },
        { name: "Advanced match statistics", included: true },
        { name: "Ad-free experience", included: true },
        { name: "Mobile and tablet access", included: true },
        { name: "HD & 4K streaming", included: true },
        { name: "No ads", included: true },
        { name: "Multi-device streaming", included: true },
        { name: "Full match replays", included: true },
        { name: "Exclusive content", included: true },
      ],
      cta: "Choose Ultimate",
      popular: false,
    },
  ]

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay securely with your credit or debit card",
      icon: CreditCard,
      details: "Visa, Mastercard, American Express accepted",
      processingFee: 0,
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Pay with Bitcoin, Ethereum, or other cryptocurrencies",
      icon: Bitcoin,
      details: "Bitcoin, Ethereum, USDC, and 50+ more",
      processingFee: 0,
      discount: 5, // 5% discount for crypto payments
    },
  ]

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)
  const selectedPaymentData = paymentMethods.find((method) => method.id === selectedPayment)

  const calculateFinalPrice = () => {
    if (!selectedPlanData) return 0
    let price = selectedPlanData.price

    if (selectedPaymentData?.discount) {
      price = price * (1 - selectedPaymentData.discount / 100)
    }

    if (selectedPaymentData?.processingFee) {
      price += selectedPaymentData.processingFee
    }

    return price
  }

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)

    // If it's a paid plan and user is not logged in, open auth modal
    if (plan && plan.price > 0 && !user) {
      openAuthModal("login")
      return
    }

    // Otherwise, proceed with plan selection
    setSelectedPlan(planId)
    setSelectedPayment(null) // Reset payment selection when plan changes
  }

  const handleCheckout = () => {
    // Check authentication before checkout
    if (!user) {
      openAuthModal("login")
      return
    }

    if (selectedPlan && (selectedPlan === "free" || selectedPayment)) {
      // Redirect to checkout with selected plan and payment method
      const checkoutUrl = `/checkout/${selectedPlan}${selectedPayment ? `?payment=${selectedPayment}` : ""}`
      window.location.href = checkoutUrl
    }
  }

  return (
    <div className="mb-20">
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id
                ? "border-2 border-green-500 shadow-lg shadow-green-500/20"
                : plan.popular
                  ? "border-2 border-green-400/50"
                  : "border border-white/10 hover:border-white/20"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">MOST POPULAR</div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <plan.icon className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.originalPrice > plan.price && (
                    <span className="text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                  )}
                  {plan.price > 0 && <span className="text-gray-400">/month</span>}
                </div>
                {plan.originalPrice > plan.price && (
                  <div className="text-xs text-green-400 mt-1">
                    Save ${(plan.originalPrice - plan.price).toFixed(2)} per month
                  </div>
                )}
              </div>

              <motion.button
                className={`w-full py-3 rounded-lg font-medium mb-6 transition-all ${
                  selectedPlan === plan.id
                    ? "gradient-bg text-white"
                    : plan.popular
                      ? "gradient-bg text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {selectedPlan === plan.id ? "Selected" : plan.cta}
              </motion.button>

              {/* Login Required Notice for Paid Plans */}
              {plan.price > 0 && !user && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-xs text-yellow-400 text-center">Login required to purchase this plan</p>
                </div>
              )}

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-center">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included ? "text-sm" : "text-sm text-gray-500"}>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Method Selection */}
      {selectedPlan && selectedPlan !== "free" && user && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Choose Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedPayment === method.id
                    ? "border-2 border-green-500 shadow-lg shadow-green-500/20"
                    : "border border-white/10 hover:border-white/20"
                }`}
                onClick={() => setSelectedPayment(method.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${selectedPayment === method.id ? "bg-green-500/20" : "bg-white/10"}`}
                  >
                    <method.icon
                      className={`w-6 h-6 ${selectedPayment === method.id ? "text-green-400" : "text-gray-400"}`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg font-semibold">{method.name}</h4>
                      {method.discount && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                          {method.discount}% OFF
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{method.description}</p>
                    <p className="text-gray-500 text-xs">{method.details}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === method.id ? "border-green-500 bg-green-500" : "border-gray-400"
                    }`}
                  >
                    {selectedPayment === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Modern Order Summary Section */}
      {selectedPlan && ((selectedPlan === "free" && user) || (selectedPlan !== "free" && user && selectedPayment)) && (
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-400/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-400/10 rounded-full blur-2xl"></div>

            <div className="relative glass-card rounded-2xl p-8 border border-green-500/20">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full mb-4">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Secure Checkout</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Complete Your Order</h3>
                <p className="text-gray-400">Review your selection and proceed to payment</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Plan Details */}
                <div className="space-y-6">
                  {/* Selected Plan Card */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      {selectedPlanData?.icon && (
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <selectedPlanData.icon className="w-5 h-5 text-green-400" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-bold">{selectedPlanData?.name} Plan</h4>
                        <p className="text-sm text-gray-400">{selectedPlanData?.description}</p>
                      </div>
                    </div>

                    {selectedPlanData && selectedPlanData.price > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Monthly subscription</span>
                        <div className="text-right">
                          <div className="text-xl font-bold">${selectedPlanData.price}</div>
                          {selectedPlanData.originalPrice > selectedPlanData.price && (
                            <div className="text-sm text-gray-500 line-through">${selectedPlanData.originalPrice}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Method Card */}
                  {selectedPaymentData && (
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <selectedPaymentData.icon className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{selectedPaymentData.name}</h4>
                          <p className="text-sm text-gray-400">{selectedPaymentData.details}</p>
                        </div>
                        {selectedPaymentData.discount && (
                          <div className="ml-auto bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-medium">
                            {selectedPaymentData.discount}% OFF
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Pricing Breakdown */}
                <div className="space-y-6">
                  {/* Pricing Details */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold mb-4">Pricing Details</h4>

                    <div className="space-y-3">
                      {selectedPlanData && selectedPlanData.price > 0 ? (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Base Price</span>
                            <span className="font-medium">${selectedPlanData.price.toFixed(2)}</span>
                          </div>

                          {selectedPaymentData?.discount && (
                            <div className="flex justify-between items-center text-green-400">
                              <span>Crypto Discount ({selectedPaymentData.discount}%)</span>
                              <span>
                                -${((selectedPlanData.price * selectedPaymentData.discount) / 100).toFixed(2)}
                              </span>
                            </div>
                          )}

                          {selectedPaymentData?.processingFee && selectedPaymentData.processingFee > 0 && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">Processing Fee</span>
                              <span>${selectedPaymentData.processingFee.toFixed(2)}</span>
                            </div>
                          )}

                          <div className="border-t border-white/10 pt-3 mt-4">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-bold">Total</span>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-400">
                                  ${calculateFinalPrice().toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-400">per month</div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <div className="text-2xl font-bold text-green-400 mb-2">Free Forever</div>
                          <div className="text-sm text-gray-400">No payment required</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Benefits Highlight */}
                  <div className="bg-gradient-to-r from-green-500/10 to-green-400/10 rounded-xl p-6 border border-green-500/20">
                    <h4 className="text-lg font-bold mb-3 text-green-400">What's Included</h4>
                    <div className="space-y-2">
                      {selectedPlanData?.features
                        .filter((feature) => feature.included)
                        .slice(0, 4)
                        .map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span>{feature.name}</span>
                          </div>
                        ))}
                      {selectedPlanData && selectedPlanData.features.filter((f) => f.included).length > 4 && (
                        <div className="text-sm text-gray-400 mt-2">
                          +{selectedPlanData.features.filter((f) => f.included).length - 4} more features
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Security */}
              <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Lock className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">Secure & Protected</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Your payment information is encrypted and secure. By proceeding, you agree to our{" "}
                      <Link href="/terms" className="text-green-400 hover:text-green-300 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-green-400 hover:text-green-300 underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>• 7-day free trial</span>
                      <span>• Cancel anytime</span>
                      <span>• No setup fees</span>
                      <span>• 24/7 support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-8">
                <motion.button
                  onClick={handleCheckout}
                  className="w-full relative overflow-hidden gradient-bg text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/25"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    {selectedPlanData?.price === 0
                      ? "Start Free Plan"
                      : `Complete Purchase - $${calculateFinalPrice().toFixed(2)}/month`}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </motion.button>

                <div className="mt-3 text-center text-sm text-gray-400">
                  {selectedPlanData?.price === 0
                    ? "No credit card required • Upgrade anytime"
                    : "Start your 7-day free trial today • Cancel anytime"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enterprise Plan */}
      <motion.div
        className="glass-card rounded-xl p-8 mt-12 flex flex-col md:flex-row items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
          <p className="text-gray-400 max-w-xl">
            Contact our sales team for custom pricing for businesses, sports bars, and public venues.
          </p>
        </div>
        <Link href="/contact">
          <motion.button
            className="px-8 py-3 border border-white/20 hover:border-white/40 rounded-lg font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Contact Sales
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
