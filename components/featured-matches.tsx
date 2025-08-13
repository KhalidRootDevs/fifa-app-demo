"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Clock,
  MapPin,
  Users,
  Play,
} from "lucide-react";

const featuredMatches = [
  {
    id: 1,
    stage: "Group A",
    homeTeam: { name: "Brazil", flag: "/flags/brazil.svg", score: 2 },
    awayTeam: { name: "Germany", flag: "/flags/germany.svg", score: 1 },
    time: "LIVE",
    minute: 78,
    isHighlighted: true,
    stadium: "MetLife Stadium",
    city: "New York",
    viewers: "2.1M",
    background:
      "/placeholder.svg?height=500&width=1200&text=Brazil+vs+Germany+World+Cup",
  },
  {
    id: 2,
    stage: "Group B",
    homeTeam: { name: "Argentina", flag: "/flags/argentina.svg", score: 0 },
    awayTeam: { name: "Spain", flag: "/flags/spain.svg", score: 0 },
    time: "LIVE",
    minute: 23,
    isHighlighted: false,
    stadium: "SoFi Stadium",
    city: "Los Angeles",
    viewers: "1.8M",
    background:
      "/placeholder.svg?height=500&width=1200&text=Argentina+vs+Spain+World+Cup",
  },
  {
    id: 3,
    stage: "Group C",
    homeTeam: { name: "France", flag: "/flags/france.svg", score: 0 },
    awayTeam: { name: "England", flag: "/flags/england.svg", score: 0 },
    time: "UPCOMING",
    date: "Tomorrow",
    kickoff: "20:00",
    isHighlighted: false,
    stadium: "Azteca Stadium",
    city: "Mexico City",
    viewers: "0",
    background:
      "/placeholder.svg?height=500&width=1200&text=France+vs+England+World+Cup",
  },
];

export function FeaturedMatches() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = featuredMatches.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isAutoplay && !isHovering) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, currentSlide, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsAutoplay(true);
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl glass-card "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2">
        <motion.button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </motion.button>
      </div>
      <div className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2">
        <motion.button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium text-white">
            Featured World Cup Matches
          </span>
        </div>
      </div>

      {/* Slides */}
      <div className="relative h-[400px]">
        <AnimatePresence initial={false} mode="wait">
          {featuredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              className={`absolute inset-0 ${
                index === currentSlide ? "z-10" : "z-0"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={match.background || "/placeholder.svg"}
                  alt={`${match.homeTeam.name} vs ${match.awayTeam.name}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-0"></div>
              </div>

              {/* Match Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-2 py-1 bg-red-600/80 rounded text-xs font-medium">
                    FIFA WORLD CUP 2026
                  </div>
                  <span className="text-gray-300">{match.stage}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
                  {/* Home Team */}
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={match.homeTeam.flag || "/placeholder.svg"}
                        alt={match.homeTeam.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </motion.div>
                    <h3 className="text-white font-semibold text-lg">
                      {match.homeTeam.name}
                    </h3>
                  </div>

                  {/* Score/Time */}
                  <div className="flex flex-col items-center">
                    {match.time === "LIVE" ? (
                      <>
                        <div className="text-3xl font-bold text-white mb-2 score-pulse">
                          {match.homeTeam.score} - {match.awayTeam.score}
                        </div>
                        <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-500 font-medium text-sm">
                            {match.minute}'
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-white mb-2">
                          VS
                        </div>
                        <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500 font-medium text-sm">
                            {match.kickoff}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={match.awayTeam.flag || "/placeholder.svg"}
                        alt={match.awayTeam.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </motion.div>
                    <h3 className="text-white font-semibold text-lg">
                      {match.awayTeam.name}
                    </h3>
                  </div>
                </div>

                {/* Match Details */}
                <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>
                      {match.stadium}, {match.city}
                    </span>
                  </div>
                  {match.time === "LIVE" ? (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{match.viewers} watching</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{match.date}</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link href={`/match/${match.id}`}>
                  <motion.button
                    className="gradient-bg text-white py-2 px-5 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {match.time === "LIVE" ? (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        Watch Live
                      </>
                    ) : (
                      <>Set Reminder</>
                    )}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {featuredMatches.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              currentSlide === index
                ? "w-8 h-2 bg-red-500 rounded-full"
                : "w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
