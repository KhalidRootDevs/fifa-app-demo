"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const hotMatches = [
  {
    id: 1,
    homeTeam: { name: "INT", logo: "/icons/inter.svg" },
    awayTeam: { name: "BAY", logo: "/icons/bayern.svg" },
    score: "0 - 0",
    league: "UEFA Champions League Updated",
    isLive: true,
  },
  {
    id: 2,
    homeTeam: { name: "BOU", logo: "/icons/bournemouth.svg" },
    awayTeam: { name: "MAN", logo: "/icons/manutd.svg" },
    score: "0 - 0",
    league: "Premier League",
    isLive: true,
  },
  {
    id: 3,
    homeTeam: { name: "ANG", logo: "/icons/angers.svg" },
    awayTeam: { name: "LIL", logo: "/icons/lille.svg" },
    score: "0 - 0",
    league: "Ligue 1",
    isLive: true,
  },
  {
    id: 4,
    homeTeam: { name: "VFL", logo: "/icons/wolfsburg.svg" },
    awayTeam: { name: "UNI", logo: "/icons/union.svg" },
    score: "0 - 0",
    league: "Bundesliga",
    isLive: true,
  },
]

export function HotMatches() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = Math.ceil(hotMatches.length / 1) // Show 1 match per slide on mobile, adjust as needed

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  return (
    <div className="space-y-4">
      <div className="bg-dark-secondary rounded-md p-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-medium">
            <span className="text-red-500">🔥</span>
            Hot Match
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-1 rounded-full bg-dark-accent border border-dark-accent hover:bg-dark transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1 rounded-full bg-dark-accent border border-dark-accent hover:bg-dark transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden mt-4">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {hotMatches.map((match) => (
              <div key={match.id} className="w-full flex-shrink-0 md:w-1/2 lg:w-1/3 px-2">
                <div className="bg-dark rounded-md overflow-hidden h-full">
                  <div className="flex justify-between items-center p-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">Live</span>
                    <span className="text-white text-sm font-medium">{match.score}</span>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col items-center">
                        <Image
                          src={match.homeTeam.logo || "/placeholder.svg"}
                          alt={match.homeTeam.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                        <span className="text-white text-sm mt-1">{match.homeTeam.name}</span>
                      </div>

                      <span className="text-white text-sm">VS</span>

                      <div className="flex flex-col items-center">
                        <Image
                          src={match.awayTeam.logo || "/placeholder.svg"}
                          alt={match.awayTeam.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                        <span className="text-white text-sm mt-1">{match.awayTeam.name}</span>
                      </div>
                    </div>

                    <div className="text-center mt-3">
                      <span className="text-gray-400 text-xs">{match.league}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-red-500" : "bg-dark-accent"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
