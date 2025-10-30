"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Football Fan",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "FIFA 2026 has completely changed how I watch matches. The streaming quality is excellent, and I never miss a game from my favorite team anymore!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Premier League Enthusiast",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "I've tried many streaming services, but FIFA 2026 offers the best value. The multi-device feature lets me watch on my TV and check stats on my tablet.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Fantasy Football Player",
    avatar: "/placeholder.svg?height=80&width=80",
    content:
      "The advanced statistics have helped me dominate my fantasy league. Being able to watch any match and get detailed player stats is a game-changer.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <div className="my-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Fans Say</h2>
        <p className="text-gray-400">
          Join thousands of satisfied football fans who enjoy uninterrupted
          access to their favorite matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className="glass-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <div>
                <h4 className="font-medium">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-500"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-300">{testimonial.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
