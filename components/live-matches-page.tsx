"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Flame, Filter, X, Trophy } from "lucide-react"

// Sample live matches data
const liveMatches = [
  {
    id: 1,
    league: "UEFA Champions League",
    leagueId: "ucl",
    homeTeam: { name: "Barcelona", logo: "/icons/barcelona.svg", score: 2 },
    awayTeam: { name: "Bayern Munich", logo: "/icons/bayern.svg", score: 2 },
    minute: 78,
    stadium: "Camp Nou",
    viewers: "1.2M",
    stats: { possession: [48, 52], shots: [12, 15], corners: [4, 6] },
  },
  {
    id: 2,
    league: "Premier League",
    leagueId: "premier",
    homeTeam: { name: "Manchester United", logo: "/icons/manutd.svg", score: 1 },
    awayTeam: { name: "Liverpool", logo: "/icons/liverpool.svg", score: 3 },
    minute: 65,
    stadium: "Old Trafford",
    viewers: "980K",
    stats: { possession: [35, 65], shots: [8, 18], corners: [2, 7] },
  },
  {
    id: 3,
    league: "Ligue 1",
    leagueId: "ligue1",
    homeTeam: { name: "Angers", logo: "/icons/angers.svg", score: 0 },
    awayTeam: { name: "Lille", logo: "/icons/lille.svg", score: 0 },
    minute: 12,
    stadium: "Stade Raymond Kopa",
    viewers: "450K",
    stats: { possession: [50, 50], shots: [2, 1], corners: [1, 0] },
  },
  {
    id: 4,
    league: "Bundesliga",
    leagueId: "bundesliga",
    homeTeam: { name: "Wolfsburg", logo: "/icons/wolfsburg.svg", score: 2 },
    awayTeam: { name: "Union Berlin", logo: "/icons/union.svg", score: 1 },
    minute: 78,
    stadium: "Volkswagen Arena",
    viewers: "520K",
    stats: { possession: [42, 58], shots: [9, 12], corners: [4, 5] },
  },
  {
    id: 5,
    league: "Serie A",
    leagueId: "seriea",
    homeTeam: { name: "Juventus", logo: "/icons/juventus.svg", score: 1 },
    awayTeam: { name: "Napoli", logo: "/icons/napoli.svg", score: 1 },
    minute: 34,
    stadium: "Allianz Stadium",
    viewers: "820K",
    stats: { possession: [45, 55], shots: [7, 10], corners: [3, 5] },
  },
  {
    id: 6,
    league: "La Liga",
    leagueId: "laliga",
    homeTeam: { name: "Real Madrid", logo: "/icons/realmadrid.svg", score: 3 },
    awayTeam: { name: "Sevilla", logo: "/icons/sevilla.svg", score: 1 },
    minute: 82,
    stadium: "Santiago Bernabéu",
    viewers: "950K",
    stats: { possession: [60, 40], shots: [15, 6], corners: [8, 2] },
  },
  {
    id: 7,
    league: "Premier League",
    leagueId: "premier",
    homeTeam: { name: "Arsenal", logo: "/icons/arsenal.svg", score: 2 },
    awayTeam: { name: "Chelsea", logo: "/icons/chelsea.svg", score: 2 },
    minute: 55,
    stadium: "Emirates Stadium",
    viewers: "890K",
    stats: { possession: [52, 48], shots: [11, 9], corners: [5, 4] },
  },
  {
    id: 8,
    league: "Ligue 1",
    leagueId: "ligue1",
    homeTeam: { name: "PSG", logo: "/icons/psg.svg", score: 3 },
    awayTeam: { name: "Marseille", logo: "/icons/marseille.svg", score: 0 },
    minute: 70,
    stadium: "Parc des Princes",
    viewers: "780K",
    stats: { possession: [65, 35], shots: [18, 5], corners: [9, 1] },
  },
]

// League data for filtering
const leagues = [
  { id: "ucl", name: "UEFA Champions League", icon: "/icons/ucl.svg" },
  { id: "premier", name: "Premier League", icon: "/icons/premier.svg" },
  { id: "laliga", name: "La Liga", icon: "/icons/laliga.svg" },
  { id: "bundesliga", name: "Bundesliga", icon: "/icons/bundesliga.svg" },
  { id: "seriea", name: "Serie A", icon: "/icons/seriea.svg" },
  { id: "ligue1", name: "Ligue 1", icon: "/icons/ligue1.svg" },
]

export function LiveMatchesPage() {
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState<"viewers" | "minute" | "league">("viewers")

  // Filter matches based on selected leagues and search query
  const filteredMatches = liveMatches.filter((match) => {
    // League filter
    const matchesLeague = selectedLeagues.length === 0 || selectedLeagues.includes(match.leagueId)

    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      match.homeTeam.name.toLowerCase().includes(searchLower) ||
      match.awayTeam.name.toLowerCase().includes(searchLower) ||
      match.league.toLowerCase().includes(searchLower)

    return matchesLeague && matchesSearch
  })

  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === "viewers") {
      return Number.parseInt(b.viewers.replace(/[^0-9]/g, "")) - Number.parseInt(a.viewers.replace(/[^0-9]/g, ""))
    } else if (sortBy === "minute") {
      return b.minute - a.minute
    } else {
      return a.league.localeCompare(b.league)
    }
  })

  // Toggle league selection
  const toggleLeague = (leagueId: string) => {
    setSelectedLeagues((prev) => (prev.includes(leagueId) ? prev.filter((id) => id !== leagueId) : [...prev, leagueId]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedLeagues([])
    setSearchQuery("")
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search teams or leagues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-white/40"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "viewers" | "minute" | "league")}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
            >
              <option value="viewers">Sort by Viewers</option>
              <option value="minute">Sort by Match Time</option>
              <option value="league">Sort by League</option>
            </select>
          </div>

          {/* Filter Button */}
          <button
            className="md:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            Leagues
            {selectedLeagues.length > 0 && (
              <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {selectedLeagues.length}
              </span>
            )}
          </button>
        </div>

        {/* League Filters */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {leagues.map((league) => (
                <button
                  key={league.id}
                  onClick={() => toggleLeague(league.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedLeagues.includes(league.id)
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20"
                  }`}
                >
                  <Image
                    src={league.icon || "/placeholder.svg"}
                    alt={league.name}
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                  <span>{league.name}</span>
                </button>
              ))}
              {selectedLeagues.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Live Matches Count */}
      <div className="flex items-center gap-2 text-lg font-medium">
        <Flame className="w-5 h-5 text-red-500" />
        <span>{sortedMatches.length} Live Matches</span>
      </div>

      {/* Live Matches Grid */}
      {sortedMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMatches.map((match) => (
            <motion.div
              key={match.id}
              className="glass-card rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {/* Match Header */}
              <div className="bg-gradient-to-r from-black/50 to-transparent p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/icons/${match.leagueId}.svg`}
                    alt={match.league}
                    width={16}
                    height={16}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-sm">{match.league}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                    LIVE
                  </div>
                  <span className="text-xs text-gray-300">{match.minute}'</span>
                </div>
              </div>

              {/* Teams and Score */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                      <Image
                        src={match.homeTeam.logo || "/placeholder.svg"}
                        alt={match.homeTeam.name}
                        width={30}
                        height={30}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div className="text-sm font-medium">{match.homeTeam.name}</div>
                  </div>

                  <div className="text-2xl font-bold score-pulse">
                    {match.homeTeam.score} - {match.awayTeam.score}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{match.awayTeam.name}</div>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                      <Image
                        src={match.awayTeam.logo || "/placeholder.svg"}
                        alt={match.awayTeam.name}
                        width={30}
                        height={30}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Stats */}
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
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

                {/* Viewers and CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>{match.viewers} watching</span>
                  </div>

                  <Link href={`/match/${match.id}`}>
                    <motion.button
                      className="gradient-bg text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 fill-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Watch Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No live matches found</h3>
          <p className="text-gray-400 mb-6">
            There are no live matches matching your search criteria. Try adjusting your filters or check back later.
          </p>
          <button onClick={clearFilters} className="gradient-bg text-white px-6 py-2 rounded-lg font-medium">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
