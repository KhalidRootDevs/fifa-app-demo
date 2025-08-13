"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ChevronRight, Clock, MapPin } from "lucide-react"

// Sample data - we'll sort this by date and time
const upcomingMatches = [
  {
    id: 1,
    date: "2023-11-15",
    time: "21:00",
    league: "La Liga",
    leagueId: "laliga",
    homeTeam: { name: "Villarreal", logo: "/icons/villarreal.svg" },
    awayTeam: { name: "Espanyol", logo: "/icons/espanyol.svg" },
    stadium: "Estadio de la Cerámica",
  },
  {
    id: 2,
    date: "2023-11-15",
    time: "21:45",
    league: "Ligue 1",
    leagueId: "ligue1",
    homeTeam: { name: "Nantes", logo: "/icons/nantes.svg" },
    awayTeam: { name: "Toulouse", logo: "/icons/toulouse.svg" },
    stadium: "Stade de la Beaujoire",
  },
  {
    id: 3,
    date: "2023-11-16",
    time: "18:30",
    league: "Ligue 1",
    leagueId: "ligue1",
    homeTeam: { name: "Montpellier", logo: "/icons/montpellier.svg" },
    awayTeam: { name: "Reims", logo: "/icons/reims.svg" },
    stadium: "Stade de la Mosson",
  },
  {
    id: 4,
    date: "2023-11-16",
    time: "20:00",
    league: "Ligue 1",
    leagueId: "ligue1",
    homeTeam: { name: "Lens", logo: "/icons/lens.svg" },
    awayTeam: { name: "Auxerre", logo: "/icons/auxerre.svg" },
    stadium: "Stade Bollaert-Delelis",
  },
  {
    id: 5,
    date: "2023-11-17",
    time: "20:45",
    league: "Premier League",
    leagueId: "premier",
    homeTeam: { name: "Liverpool", logo: "/icons/liverpool.svg" },
    awayTeam: { name: "Tottenham", logo: "/icons/tottenham.svg" },
    stadium: "Anfield",
  },
  {
    id: 6,
    date: "2023-11-17",
    time: "20:30",
    league: "Bundesliga",
    leagueId: "bundesliga",
    homeTeam: { name: "Werder Bremen", logo: "/icons/bremen.svg" },
    awayTeam: { name: "FC St. Pauli", logo: "/icons/stpauli.svg" },
    stadium: "Weserstadion",
  },
]

interface UpcomingMatchesProps {
  compact?: boolean
}

export function UpcomingMatches({ compact = false }: UpcomingMatchesProps) {
  // Sort matches by date and time (earlier matches first)
  const sortedMatches = [...upcomingMatches].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`)
    const dateB = new Date(`${b.date}T${b.time}`)
    return dateA.getTime() - dateB.getTime()
  })

  // Limit the number of matches if compact view is requested
  const displayMatches = compact ? sortedMatches.slice(0, 5) : sortedMatches

  // Group matches by date for display
  const matchesByDate = displayMatches.reduce(
    (groups, match) => {
      const date = match.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(match)
      return groups
    },
    {} as Record<string, typeof upcomingMatches>,
  )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-500" />
          <span>Upcoming Matches</span>
        </h2>
        <Link
          href="/upcoming"
          className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <span>View all</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        {Object.entries(matchesByDate).map(([date, matches]) => (
          <div key={date} className="border-b border-white/10 last:border-b-0">
            <div className="bg-white/5 px-4 py-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {formatDate(date)}
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {matches.map((match) => (
                <Link key={match.id} href={`/match/${match.id}`}>
                  <motion.div className="p-4 hover:bg-white/5 transition-colors" whileHover={{ x: 5 }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={`/icons/${match.leagueId}.svg`}
                          alt={match.league}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                        <span className="text-xs text-gray-400">{match.league}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Clock className="w-3 h-3" />
                        <span>{match.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
                          <Image
                            src={match.homeTeam.logo || "/placeholder.svg"}
                            alt={match.homeTeam.name}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium">{match.homeTeam.name}</span>
                      </div>

                      <span className="text-xs font-medium text-gray-400">VS</span>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{match.awayTeam.name}</span>
                        <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
                          <Image
                            src={match.awayTeam.logo || "/placeholder.svg"}
                            alt={match.awayTeam.name}
                            width={20}
                            height={20}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{match.stadium}</span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {compact && (
        <div className="text-center mt-4">
          <Link href="/upcoming">
            <motion.button
              className="px-6 py-2 border border-white/10 hover:border-white/20 rounded-lg text-sm font-medium"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              See All Upcoming Matches
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  )
}
