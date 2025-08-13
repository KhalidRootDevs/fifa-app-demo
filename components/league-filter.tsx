"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LeagueFilterProps {
  leagues: {
    id: string
    name: string
    icon: string
  }[]
  selectedLeagues: string[]
  toggleLeague: (leagueId: string) => void
}

export function LeagueFilter({ leagues, selectedLeagues, toggleLeague }: LeagueFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-sm font-medium">Leagues</h3>
        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {leagues.map((league) => (
                <div key={league.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`league-${league.id}`}
                    className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                    checked={selectedLeagues.includes(league.id)}
                    onChange={() => toggleLeague(league.id)}
                  />
                  <label htmlFor={`league-${league.id}`} className="ml-2 flex items-center gap-2 text-sm">
                    <Image
                      src={league.icon || "/placeholder.svg"}
                      alt={league.name}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                    {league.name}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
