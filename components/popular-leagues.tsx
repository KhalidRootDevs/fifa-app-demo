"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trophy, ChevronRight } from "lucide-react"

const leagues = [
  {
    id: "ucl",
    name: "UEFA Champions League",
    icon: "/icons/ucl.svg",
    matches: 16,
    background: "/placeholder.svg?height=120&width=300&text=UCL",
  },
  {
    id: "premier",
    name: "Premier League",
    icon: "/icons/premier.svg",
    matches: 10,
    background: "/placeholder.svg?height=120&width=300&text=Premier+League",
  },
  {
    id: "laliga",
    name: "La Liga",
    icon: "/icons/laliga.svg",
    matches: 9,
    background: "/placeholder.svg?height=120&width=300&text=La+Liga",
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    icon: "/icons/bundesliga.svg",
    matches: 9,
    background: "/placeholder.svg?height=120&width=300&text=Bundesliga",
  },
  {
    id: "seriea",
    name: "Serie A",
    icon: "/icons/seriea.svg",
    matches: 10,
    background: "/placeholder.svg?height=120&width=300&text=Serie+A",
  },
  {
    id: "ligue1",
    name: "Ligue 1",
    icon: "/icons/ligue1.svg",
    matches: 10,
    background: "/placeholder.svg?height=120&width=300&text=Ligue+1",
  },
]

export function PopularLeagues() {
  const [hoveredLeague, setHoveredLeague] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {/* Make the section title more compact */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span>Popular Leagues</span>
        </h2>
        <Link
          href="/leagues"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>View all</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {leagues.map((league) => (
          <Link key={league.id} href={`/leagues/${league.id}`}>
            <motion.div
              className="glass-card glass-card-hover rounded-xl overflow-hidden h-full"
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredLeague(league.id)}
              onHoverEnd={() => setHoveredLeague(null)}
            >
              {/* Make the league cards more compact */}
              <div className="relative h-20 overflow-hidden">
                <Image src={league.background || "/placeholder.svg"} alt={league.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={league.icon || "/placeholder.svg"}
                      alt={league.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    <span className="text-xs font-medium">{league.name}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">{league.matches} matches</span>
                <motion.div
                  animate={{
                    x: hoveredLeague === league.id ? 5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}
