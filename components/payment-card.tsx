"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PaymentCardProps {
  cardNumber: string
  cardName: string
  cardExpiry: string
  cardType: string
}

export function PaymentCard({ cardNumber, cardName, cardExpiry, cardType }: PaymentCardProps) {
  // Format card number for display
  const formatCardNumber = (number: string) => {
    const digits = number.replace(/\s/g, "")
    if (digits.length === 0) return "•••• •••• •••• ••••"

    const formatted =
      digits
        .padEnd(16, "•")
        .match(/.{1,4}/g)
        ?.join(" ") || ""
    return formatted
  }

  // Format card name for display
  const formatCardName = (name: string) => {
    return name || "YOUR NAME"
  }

  // Format expiry date for display
  const formatExpiry = (expiry: string) => {
    return expiry || "MM/YY"
  }

  // Get card logo based on card type
  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return "/placeholder.svg?height=30&width=50&text=VISA"
      case "mastercard":
        return "/placeholder.svg?height=30&width=50&text=MASTERCARD"
      case "amex":
        return "/placeholder.svg?height=30&width=50&text=AMEX"
      case "discover":
        return "/placeholder.svg?height=30&width=50&text=DISCOVER"
      default:
        return "/placeholder.svg?height=30&width=50&text=CARD"
    }
  }

  // Get card background gradient based on card type
  const getCardBackground = () => {
    switch (cardType) {
      case "visa":
        return "bg-gradient-to-r from-blue-700 to-blue-500"
      case "mastercard":
        return "bg-gradient-to-r from-red-700 to-orange-500"
      case "amex":
        return "bg-gradient-to-r from-blue-500 to-teal-400"
      case "discover":
        return "bg-gradient-to-r from-orange-500 to-yellow-400"
      default:
        return "bg-gradient-to-r from-gray-700 to-gray-600"
    }
  }

  return (
    <motion.div
      className={`w-full h-52 rounded-xl p-6 relative overflow-hidden ${getCardBackground()}`}
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5">
          <div className="w-96 h-96 rounded-full bg-white absolute -top-20 -right-20 opacity-10"></div>
          <div className="w-96 h-96 rounded-full bg-white absolute -bottom-40 -left-20 opacity-10"></div>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm"></div>
          <Image
            src={getCardLogo() || "/placeholder.svg"}
            alt="Card Type"
            width={50}
            height={30}
            className="h-8 object-contain"
          />
        </div>

        <div className="mt-auto">
          <div className="text-white text-lg font-mono mb-4">{formatCardNumber(cardNumber)}</div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-white/70 text-xs mb-1">CARD HOLDER</div>
              <div className="text-white text-sm font-medium uppercase">{formatCardName(cardName)}</div>
            </div>
            <div>
              <div className="text-white/70 text-xs mb-1">EXPIRES</div>
              <div className="text-white text-sm font-medium">{formatExpiry(cardExpiry)}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
