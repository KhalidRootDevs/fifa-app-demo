"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import { PaymentCard } from "@/components/payment-card";

interface CheckoutFormProps {
  plan: {
    name: string;
    price: number;
    billingCycle: string;
  };
}

export function CheckoutForm({ plan }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    country: "United States",
    postalCode: "",
  });

  const [formStep, setFormStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    // Format expiry date
    if (name === "cardExpiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    }

    // Format CVC
    if (name === "cardCvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const nextStep = () => {
    setFormStep(2);
  };

  const prevStep = () => {
    setFormStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  // Determine card type based on first digits
  const getCardType = (number: string) => {
    const firstDigit = number.charAt(0);
    const firstTwoDigits = number.substring(0, 2);
    const firstFourDigits = number.substring(0, 4);

    if (firstDigit === "4") return "visa";
    if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return "mastercard";
    if (firstTwoDigits === "34" || firstTwoDigits === "37") return "amex";
    if (firstFourDigits === "6011") return "discover";
    return "";
  };

  const cardType = getCardType(formData.cardNumber.replace(/\s/g, ""));

  if (isComplete) {
    return (
      <motion.div
        className="glass-card rounded-xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-gray-400 mb-6">
          Thank you for subscribing to FIFA 2026 {plan.name} plan. You now have
          access to all the features included in your subscription.
        </p>
        <div className="mb-8">
          <div className="text-sm text-gray-400 mb-1">Transaction ID</div>
          <div className="font-mono bg-white/10 px-4 py-2 rounded-md inline-block">
            HF-{Math.random().toString(36).substring(2, 10).toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/account"
            className="gradient-bg text-white py-3 px-6 rounded-lg font-medium"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Go to My Account
          </motion.a>
          <motion.a
            href="/"
            className="bg-white/10 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/20 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            Back to Home
          </motion.a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Form Steps */}
      <div className="flex border-b border-white/10">
        <div
          className={`flex-1 py-4 text-center text-sm font-medium ${
            formStep === 1 ? "text-white" : "text-gray-400"
          }`}
        >
          <span className="inline-block w-6 h-6 rounded-full mr-2 text-xs leading-6 text-center bg-white/10">
            1
          </span>
          Account Details
        </div>
        <div
          className={`flex-1 py-4 text-center text-sm font-medium ${
            formStep === 2 ? "text-white" : "text-gray-400"
          }`}
        >
          <span className="inline-block w-6 h-6 rounded-full mr-2 text-xs leading-6 text-center bg-white/10">
            2
          </span>
          Payment Details
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {formStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">Account Information</h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-2"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  required
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Japan">Japan</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium mb-2"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  placeholder="10001"
                />
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                type="button"
                onClick={nextStep}
                className="w-full gradient-bg text-white py-3 rounded-lg font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Continue to Payment
              </motion.button>
            </div>
          </motion.div>
        )}

        {formStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6">Payment Information</h3>

            <div className="mb-8">
              <PaymentCard
                cardNumber={formData.cardNumber}
                cardName={formData.cardName}
                cardExpiry={formData.cardExpiry}
                cardType={cardType}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium mb-2"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium mb-2"
                >
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 pr-10"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cardExpiry"
                    className="block text-sm font-medium mb-2"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="cardExpiry"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cardCvc"
                    className="block text-sm font-medium mb-2"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cardCvc"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center mt-6 mb-8">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-400">
                Your payment information is secure. We use encryption to protect
                your data.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Back
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 gradient-bg text-white py-3 rounded-lg font-medium relative"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="opacity-0">Complete Payment</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  <>Complete Payment</>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
