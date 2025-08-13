"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Flame, MapPin } from "lucide-react"

const liveMatches = [
  {
    id: 1,
    phase: "Quarter Final",
    homeTeam: {
      name: "Brazil",
      code: "BRA",
      flag: "/flags/brazil.svg",
      score: 2,
      fifaRanking: 1,
    },
    awayTeam: {
      name: "France",
      code: "FRA",
      flag: "/flags/france.svg",
      score: 1,
      fifaRanking: 3,
    },
    minute: 67,
    venue: "MetLife Stadium",
    city: "New York, USA",
    stats: { possession: [52, 48], shots: [15, 12], corners: [7, 4] },
  },
  {
    id: 2,
    phase: "Semi Final",
    homeTeam: {
      name: "Argentina",
      code: "ARG",
      flag: "/flags/argentina.svg",
      score: 1,
      fifaRanking: 2,
    },
    awayTeam: {
      name: "Germany",
      code: "GER",
      flag: "/flags/germany.svg",
      score: 0,
      fifaRanking: 4,
    },
    minute: 78,
    venue: "SoFi Stadium",
    city: "Los Angeles, USA",
    stats: { possession: [45, 55], shots: [11, 9], corners: [5, 3] },
  },
  {
    id: 3,
    phase: "Group Stage",
    homeTeam: {
      name: "Spain",
      code: "ESP",
      flag: "/flags/spain.svg",
      score: 3,
      fifaRanking: 5,
    },
    awayTeam: {
      name: "Netherlands",
      code: "NED",
      flag: "/flags/netherlands.svg",
      score: 2,
      fifaRanking: 6,
    },
    minute: 34,
    venue: "Estadio Azteca",
    city: "Mexico City, Mexico",
    stats: { possession: [58, 42], shots: [14, 10], corners: [6, 4] },
  },
  {
    id: 4,
    phase: "Group Stage",
    homeTeam: {
      name: "England",
      code: "ENG",
      flag: "/flags/england.svg",
      score: 0,
      fifaRanking: 7,
    },
    awayTeam: {
      name: "Portugal",
      code: "POR",
      flag: "/flags/portugal.svg",
      score: 1,
      fifaRanking: 8,
    },
    minute: 23,
    venue: "AT&T Stadium",
    city: "Dallas, USA",
    stats: { possession: [48, 52], shots: [8, 12], corners: [3, 7] },
  },
]

interface LiveMatchesProps {
  compact?: boolean
}

export function LiveMatches({ compact = false }: LiveMatchesProps) {
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedMatch(expandedMatch === id ? null : id)
  }

  const displayMatches = compact ? liveMatches.slice(0, 3) : liveMatches

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          <span>Live World Cup Matches</span>
        </h2>
        <Link href="/live" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
          <span>View all</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className={`grid grid-cols-1 ${compact ? "" : "md:grid-cols-2"} gap-4`}>
        {displayMatches.map((match) => (
          <motion.div
            key={match.id}
            className={`glass-card glass-card-hover rounded-xl overflow-hidden match-card cursor-pointer transition-all duration-300 ${
              expandedMatch === match.id ? "md:col-span-2" : ""
            }`}
            onClick={() => toggleExpand(match.id)}
            layoutId={`match-${match.id}`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      match.phase === "Group Stage"
                        ? "bg-green-500/20 text-green-400"
                        : match.phase === "Quarter Final"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : match.phase === "Semi Final"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {match.phase}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-medium live-dot">
                    LIVE
                  </div>
                  <div className="text-xs text-gray-400">{match.minute}'</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center team-logo">
                      <Image
                        src={match.homeTeam.flag || "/placeholder.svg"}
                        alt={match.homeTeam.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                      #{match.homeTeam.fifaRanking}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{match.homeTeam.name}</div>
                    <div className="text-xs text-gray-400">{match.homeTeam.code}</div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold score-pulse">
                    {match.homeTeam.score} - {match.awayTeam.score}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{match.awayTeam.name}</div>
                    <div className="text-xs text-gray-400">{match.awayTeam.code}</div>
                  </div>
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center team-logo">
                      <Image
                        src={match.awayTeam.flag || "/placeholder.svg"}
                        alt={match.awayTeam.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                      #{match.awayTeam.fifaRanking}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <MapPin className="w-3 h-3" />
                <span>
                  {match.venue}, {match.city}
                </span>
              </div>

              {expandedMatch === match.id && (
                <motion.div
                  className="mt-4 pt-4 border-t border-white/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1">Possession</div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
                          style={{ width: `${match.stats.possession[0]}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between w-full mt-1">
                        <span className="text-xs">{match.stats.possession[0]}%</span>
                        <span className="text-xs">{match.stats.possession[1]}%</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1">Shots</div>
                      <div className="flex justify-between w-full">
                        <span className="text-sm font-medium">{match.stats.shots[0]}</span>
                        <span className="text-sm font-medium">{match.stats.shots[1]}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-xs text-gray-400 mb-1">Corners</div>
                      <div className="flex justify-between w-full">
                        <span className="text-sm font-medium">{match.stats.corners[0]}</span>
                        <span className="text-sm font-medium">{match.stats.corners[1]}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/match/${match.id}`}>
                    <motion.button
                      className="w-full mt-4 gradient-bg text-white py-2 rounded-lg font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Watch Live - World Cup 2026
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {compact && (
        <div className="text-center">
          <Link href="/live">
            <motion.button
              className="px-6 py-2 border border-white/10 hover:border-white/20 rounded-lg text-sm font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              See All Live World Cup Matches
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  )
}
