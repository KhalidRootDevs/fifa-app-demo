"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import FeaturedMatchCard from "./featured-match-card";

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
            <FeaturedMatchCard
              key={match.id}
              match={match}
              index={index}
              currentSlide={currentSlide}
            />
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
