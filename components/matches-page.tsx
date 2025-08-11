"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, Calendar } from "lucide-react"
import { MatchCard } from "@/components/match-card"
import { LeagueFilter } from "@/components/league-filter"
import { DateFilter } from "@/components/date-filter"

// Sample match data
const allMatches = [
  {
    id: 1,
    status: "live",
    league: "UEFA Champions League",
    leagueId: "ucl",
    homeTeam: { name: "Barcelona", logo: "/icons/barcelona.svg", score: 2 },
    awayTeam: { name: "Bayern Munich", logo: "/icons/bayern.svg", score: 2 },
    minute: 78,
    date: "2023-11-15",
    time: "20:00",
    stadium: "Camp Nou",
    viewers: "1.2M",
  },
  {
    id: 2,
    status: "live",
    league: "Premier League",
    leagueId: "premier",
    homeTeam: { name: "Manchester United", logo: "/icons/manutd.svg", score: 1 },
    awayTeam: { name: "Liverpool", logo: "/icons/liverpool.svg", score: 3 },
    minute: 65,
    date: "2023-11-15",
    time: "17:30",
    stadium: "Old Trafford",
    viewers: "980K",
  },
  {
    id: 3,
    status: "upcoming",
    league: "La Liga",
    leagueId: "laliga",
    homeTeam: { name: "Real Madrid", logo: "/icons/realmadrid.svg", score: 0 },
    awayTeam: { name: "Atletico Madrid", logo: "/icons/atletico.svg", score: 0 },
    minute: 0,
    date: "2023-11-18",
    time: "20:45",
    stadium: "Santiago Bernabeu",
    viewers: "0",
  },
  {
    id: 4,
    status: "upcoming",
    league: "Serie A",
    leagueId: "seriea",
    homeTeam: { name: "Inter", logo: "/icons/inter.svg", score: 0 },
    awayTeam: { name: "AC Milan", logo: "/icons/milan.svg", score: 0 },
    minute: 0,
    date: "2023-11-19",
    time: "20:45",
    stadium: "San Siro",
    viewers: "0",
  },
  {
    id: 5,
    status: "completed",
    league: "Bundesliga",
    leagueId: "bundesliga",
    homeTeam: { name: "Bayern Munich", logo: "/icons/bayern.svg", score: 3 },
    awayTeam: { name: "Borussia Dortmund", logo: "/icons/dortmund.svg", score: 1 },
    minute: 90,
    date: "2023-11-14",
    time: "18:30",
    stadium: "Allianz Arena",
    viewers: "850K",
  },
  {
    id: 6,
    status: "completed",
    league: "Ligue 1",
    leagueId: "ligue1",
    homeTeam: { name: "PSG", logo: "/icons/psg.svg", score: 2 },
    awayTeam: { name: "Marseille", logo: "/icons/marseille.svg", score: 0 },
    minute: 90,
    date: "2023-11-14",
    time: "20:00",
    stadium: "Parc des Princes",
    viewers: "750K",
  },
  {
    id: 7,
    status: "upcoming",
    league: "Premier League",
    leagueId: "premier",
    homeTeam: { name: "Arsenal", logo: "/icons/arsenal.svg", score: 0 },
    awayTeam: { name: "Chelsea", logo: "/icons/chelsea.svg", score: 0 },
    minute: 0,
    date: "2023-11-20",
    time: "17:30",
    stadium: "Emirates Stadium",
    viewers: "0",
  },
  {
    id: 8,
    status: "upcoming",
    league: "La Liga",
    leagueId: "laliga",
    homeTeam: { name: "Barcelona", logo: "/icons/barcelona.svg", score: 0 },
    awayTeam: { name: "Sevilla", logo: "/icons/sevilla.svg", score: 0 },
    minute: 0,
    date: "2023-11-21",
    time: "21:00",
    stadium: "Camp Nou",
    viewers: "0",
  },
  {
    id: 9,
    status: "live",
    league: "Serie A",
    leagueId: "seriea",
    homeTeam: { name: "Juventus", logo: "/icons/juventus.svg", score: 1 },
    awayTeam: { name: "Napoli", logo: "/icons/napoli.svg", score: 1 },
    minute: 34,
    date: "2023-11-15",
    time: "20:45",
    stadium: "Allianz Stadium",
    viewers: "820K",
  },
  {
    id: 10,
    status: "completed",
    league: "Bundesliga",
    leagueId: "bundesliga",
    homeTeam: { name: "RB Leipzig", logo: "/icons/leipzig.svg", score: 2 },
    awayTeam: { name: "Bayer Leverkusen", logo: "/icons/leverkusen.svg", score: 2 },
    minute: 90,
    date: "2023-11-13",
    time: "15:30",
    stadium: "Red Bull Arena",
    viewers: "620K",
  },
  {
    id: 11,
    status: "upcoming",
    league: "UEFA Champions League",
    leagueId: "ucl",
    homeTeam: { name: "Manchester City", logo: "/icons/mancity.svg", score: 0 },
    awayTeam: { name: "PSG", logo: "/icons/psg.svg", score: 0 },
    minute: 0,
    date: "2023-11-22",
    time: "21:00",
    stadium: "Etihad Stadium",
    viewers: "0",
  },
  {
    id: 12,
    status: "completed",
    league: "Premier League",
    leagueId: "premier",
    homeTeam: { name: "Tottenham", logo: "/icons/tottenham.svg", score: 1 },
    awayTeam: { name: "Newcastle", logo: "/icons/newcastle.svg", score: 1 },
    minute: 90,
    date: "2023-11-12",
    time: "16:30",
    stadium: "Tottenham Hotspur Stadium",
    viewers: "710K",
  },
]

// League data
const leagues = [
  { id: "ucl", name: "UEFA Champions League", icon: "/icons/ucl.svg" },
  { id: "premier", name: "Premier League", icon: "/icons/premier.svg" },
  { id: "laliga", name: "La Liga", icon: "/icons/laliga.svg" },
  { id: "bundesliga", name: "Bundesliga", icon: "/icons/bundesliga.svg" },
  { id: "seriea", name: "Serie A", icon: "/icons/seriea.svg" },
  { id: "ligue1", name: "Ligue 1", icon: "/icons/ligue1.svg" },
]

export function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLeagues, setSelectedLeagues] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>(["live", "upcoming", "completed"])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("date")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  // Filter matches based on search query, selected leagues, and status
  const filteredMatches = allMatches.filter((match) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      match.homeTeam.name.toLowerCase().includes(searchLower) ||
      match.awayTeam.name.toLowerCase().includes(searchLower) ||
      match.league.toLowerCase().includes(searchLower)

    // League filter
    const matchesLeague = selectedLeagues.length === 0 || selectedLeagues.includes(match.leagueId)

    // Status filter
    const matchesStatus = selectedStatus.includes(match.status)

    // Date filter
    let matchesDate = true
    if (dateRange.start && dateRange.end) {
      const matchDate = new Date(match.date)
      const startDate = new Date(dateRange.start)
      const endDate = new Date(dateRange.end)
      matchesDate = matchDate >= startDate && matchDate <= endDate
    }

    return matchesSearch && matchesLeague && matchesStatus && matchesDate
  })

  // Sort matches
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    if (sortBy === "date") {
      // Sort by date and time
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    } else if (sortBy === "league") {
      // Sort by league name
      return a.league.localeCompare(b.league)
    } else if (sortBy === "status") {
      // Sort by status (live first, then upcoming, then completed)
      const statusOrder = { live: 0, upcoming: 1, completed: 2 }
      return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder]
    }
    return 0
  })

  // Toggle league selection
  const toggleLeague = (leagueId: string) => {
    setSelectedLeagues((prev) => (prev.includes(leagueId) ? prev.filter((id) => id !== leagueId) : [...prev, leagueId]))
  }

  // Toggle status selection
  const toggleStatus = (status: string) => {
    setSelectedStatus((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedLeagues([])
    setSelectedStatus(["live", "upcoming", "completed"])
    setDateRange({ start: "", end: "" })
  }

  // Group matches by date for display
  const matchesByDate = sortedMatches.reduce(
    (groups, match) => {
      const date = match.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(match)
      return groups
    },
    {} as Record<string, typeof allMatches>,
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters - Desktop */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="glass-card rounded-xl p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-white transition-colors">
              Clear all
            </button>
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Match Status</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status-live"
                  className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                  checked={selectedStatus.includes("live")}
                  onChange={() => toggleStatus("live")}
                />
                <label htmlFor="status-live" className="ml-2 text-sm">
                  Live Matches
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status-upcoming"
                  className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                  checked={selectedStatus.includes("upcoming")}
                  onChange={() => toggleStatus("upcoming")}
                />
                <label htmlFor="status-upcoming" className="ml-2 text-sm">
                  Upcoming Matches
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="status-completed"
                  className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                  checked={selectedStatus.includes("completed")}
                  onChange={() => toggleStatus("completed")}
                />
                <label htmlFor="status-completed" className="ml-2 text-sm">
                  Completed Matches
                </label>
              </div>
            </div>
          </div>

          {/* League Filter */}
          <LeagueFilter leagues={leagues} selectedLeagues={selectedLeagues} toggleLeague={toggleLeague} />

          {/* Date Filter */}
          <DateFilter dateRange={dateRange} setDateRange={setDateRange} />

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
            >
              <option value="date">Date & Time</option>
              <option value="league">League</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Search and Filter Bar */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search matches, teams or leagues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-white/40"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              className="lg:hidden flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-4 py-2 text-sm font-medium"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedLeagues.length > 0 ||
                !selectedStatus.includes("live") ||
                !selectedStatus.includes("upcoming") ||
                !selectedStatus.includes("completed") ||
                dateRange.start ||
                dateRange.end) && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
            </button>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pt-4 border-t border-white/10 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Status Filter */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Match Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="mobile-status-live"
                          className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                          checked={selectedStatus.includes("live")}
                          onChange={() => toggleStatus("live")}
                        />
                        <label htmlFor="mobile-status-live" className="ml-2 text-sm">
                          Live Matches
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="mobile-status-upcoming"
                          className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                          checked={selectedStatus.includes("upcoming")}
                          onChange={() => toggleStatus("upcoming")}
                        />
                        <label htmlFor="mobile-status-upcoming" className="ml-2 text-sm">
                          Upcoming Matches
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="mobile-status-completed"
                          className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                          checked={selectedStatus.includes("completed")}
                          onChange={() => toggleStatus("completed")}
                        />
                        <label htmlFor="mobile-status-completed" className="ml-2 text-sm">
                          Completed Matches
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* League Filter - Mobile */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Leagues</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {leagues.map((league) => (
                        <div key={league.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-league-${league.id}`}
                            className="w-4 h-4 bg-white/10 border-white/20 rounded text-red-500 focus:ring-red-500"
                            checked={selectedLeagues.includes(league.id)}
                            onChange={() => toggleLeague(league.id)}
                          />
                          <label htmlFor={`mobile-league-${league.id}`} className="ml-2 text-sm">
                            {league.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Filter - Mobile */}
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium mb-3">Date Range</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="mobile-start-date" className="block text-xs text-gray-400 mb-1">
                          From
                        </label>
                        <input
                          type="date"
                          id="mobile-start-date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                      <div>
                        <label htmlFor="mobile-end-date" className="block text-xs text-gray-400 mb-1">
                          To
                        </label>
                        <input
                          type="date"
                          id="mobile-end-date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sort By - Mobile */}
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium mb-3">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="date">Date & Time</option>
                      <option value="league">League</option>
                      <option value="status">Status</option>
                    </select>
                  </div>

                  {/* Action Buttons - Mobile */}
                  <div className="md:col-span-2 flex justify-between mt-2">
                    <button onClick={clearFilters} className="text-sm text-gray-400 hover:text-white transition-colors">
                      Clear all filters
                    </button>
                    <button onClick={() => setIsFilterOpen(false)} className="text-sm gradient-bg px-4 py-1 rounded-lg">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Match Results */}
        <div className="space-y-6">
          {Object.keys(matchesByDate).length > 0 ? (
            Object.entries(matchesByDate)
              .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
              .map(([date, matches]) => (
                <div key={date} className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(date)}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">No matches found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any matches matching your search criteria. Try adjusting your filters or search query.
              </p>
              <button onClick={clearFilters} className="gradient-bg text-white px-6 py-2 rounded-lg font-medium">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
