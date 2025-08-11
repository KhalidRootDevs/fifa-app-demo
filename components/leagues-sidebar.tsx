"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Trophy } from "lucide-react"

const leagues = [
  { id: "top", name: "Top Leagues", icon: "/icons/trophy.svg", matches: 42 },
  { id: "ucl", name: "UEFA Champions League", icon: "/icons/ucl.svg", matches: 16 },
  { id: "uel", name: "UEFA Europa League", icon: "/icons/uel.svg", matches: 12 },
  { id: "premier", name: "Premier League", icon: "/icons/premier.svg", matches: 10 },
  { id: "nations", name: "UEFA Nations League", icon: "/icons/nations.svg", matches: 8 },
  { id: "laliga", name: "La Liga", icon: "/icons/laliga.svg", matches: 9 },
  { id: "bundesliga", name: "Bundesliga", icon: "/icons/bundesliga.svg", matches: 9 },
  { id: "ligue1", name: "Ligue 1", icon: "/icons/ligue1.svg", matches: 10 },
  { id: "seriea", name: "Serie A", icon: "/icons/seriea.svg", matches: 10 },
  { id: "pro", name: "Pro League", icon: "/icons/pro.svg", matches: 6 },
  { id: "super", name: "UEFA Super Cup", icon: "/icons/super.svg", matches: 1 },
]

export function LeaguesSidebar() {
  const [hoveredLeague, setHoveredLeague] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <div className="bg-dark-accent rounded-md border border-dark-accent p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-red-500 to-red-700 p-1.5 rounded-md">
            <Trophy size={16} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold">Leagues</h3>
        </div>
        <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={18} />
        </motion.div>
      </div>

      {expanded && (
        <motion.ul className="space-y-1" variants={container} initial="hidden" animate="show">
          {leagues.map((league) => (
            <motion.li key={league.id} variants={item}>
              <Link
                href={`/league/${league.id}`}
                className={`flex items-center justify-between p-2.5 rounded-md transition-all duration-200 ${
                  league.id === "top"
                    ? "bg-gradient-to-r from-red-500/10 to-red-700/10 border-l-2 border-red-500"
                    : "hover:bg-dark-secondary"
                }`}
                onMouseEnter={() => setHoveredLeague(league.id)}
                onMouseLeave={() => setHoveredLeague(null)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-dark-secondary transition-transform duration-200 ${
                      hoveredLeague === league.id ? "scale-110" : ""
                    }`}
                  >
                    <Image
                      src={league.icon || "/placeholder.svg"}
                      alt={league.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">{league.name}</span>
                </div>

                {league.matches > 0 && (
                  <motion.span
                    className="text-xs px-1.5 py-0.5 rounded-full bg-dark text-gray-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: hoveredLeague === league.id ? 1.1 : 1,
                      opacity: 1,
                      backgroundColor: hoveredLeague === league.id ? "rgba(239, 68, 68, 0.2)" : "rgba(17, 24, 39, 0.7)",
                      color: hoveredLeague === league.id ? "rgba(239, 68, 68, 1)" : "rgba(156, 163, 175, 1)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {league.matches}
                  </motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}
