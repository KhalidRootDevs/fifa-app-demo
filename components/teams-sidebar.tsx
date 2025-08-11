"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Star } from "lucide-react"

const teams = [
  { id: "top", name: "Top Teams", icon: "/icons/star.svg", status: "featured" },
  { id: "chelsea", name: "Chelsea", icon: "/icons/chelsea.svg", status: "playing" },
  { id: "manutd", name: "Manchester United", icon: "/icons/manutd.svg", status: "upcoming" },
  { id: "barcelona", name: "Barcelona", icon: "/icons/barcelona.svg", status: "upcoming" },
  { id: "napoli", name: "Napoli", icon: "/icons/napoli.svg", status: "idle" },
  { id: "mancity", name: "Manchester City", icon: "/icons/mancity.svg", status: "playing" },
  { id: "bayern", name: "Bayern München", icon: "/icons/bayern.svg", status: "playing" },
  { id: "leverkusen", name: "Bayer Leverkusen", icon: "/icons/leverkusen.svg", status: "idle" },
  { id: "inter", name: "Inter", icon: "/icons/inter.svg", status: "playing" },
  { id: "psg", name: "Paris Saint Germain", icon: "/icons/psg.svg", status: "upcoming" },
  { id: "marseille", name: "Marseille", icon: "/icons/marseille.svg", status: "idle" },
]

export function TeamsSidebar() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(true)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "playing":
        return "bg-green-500"
      case "upcoming":
        return "bg-yellow-500"
      case "idle":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "playing":
        return "Live"
      case "upcoming":
        return "Soon"
      case "idle":
        return "Idle"
      default:
        return ""
    }
  }

  return (
    <div className="bg-dark-accent rounded-md border border-dark-accent p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-red-500 to-red-700 p-1.5 rounded-md">
            <Star size={16} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold">Teams</h3>
        </div>
        <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={18} />
        </motion.div>
      </div>

      {expanded && (
        <motion.ul className="space-y-1" variants={container} initial="hidden" animate="show">
          {teams.map((team) => (
            <motion.li key={team.id} variants={item}>
              <Link
                href={`/team/${team.id}`}
                className={`flex items-center justify-between p-2.5 rounded-md transition-all duration-200 ${
                  team.id === "top"
                    ? "bg-gradient-to-r from-red-500/10 to-red-700/10 border-l-2 border-red-500"
                    : "hover:bg-dark-secondary"
                }`}
                onMouseEnter={() => setHoveredTeam(team.id)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-dark-secondary relative`}
                    animate={{
                      scale: hoveredTeam === team.id ? 1.1 : 1,
                      boxShadow: hoveredTeam === team.id ? "0 0 0 2px rgba(239, 68, 68, 0.3)" : "none",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={team.icon || "/placeholder.svg"}
                      alt={team.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />

                    {team.status !== "featured" && (
                      <motion.div
                        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${getStatusColor(team.status)}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </motion.div>
                  <span className="text-sm font-medium">{team.name}</span>
                </div>

                {team.status !== "featured" && team.status !== "idle" && (
                  <motion.span
                    className={`text-xs px-1.5 py-0.5 rounded-full text-white ${
                      team.status === "playing" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: hoveredTeam === team.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {getStatusText(team.status)}
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
