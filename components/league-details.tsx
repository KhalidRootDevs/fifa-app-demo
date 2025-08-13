"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Play,
  Bell,
  Film,
  ChevronRight,
  Info,
  Table,
  BarChart,
} from "lucide-react"

// League data
const leaguesData = [
  {
    id: "ucl",
    name: "UEFA Champions League",
    icon: "/icons/ucl.svg",
    background: "/placeholder.svg?height=300&width=1200&text=UEFA+Champions+League",
    description:
      "The UEFA Champions League is UEFA's elite club competition with top clubs across Europe playing for the title of European champions.",
    founded: "1955",
    teams: 32,
    matches: 125,
    currentChampion: "Manchester City",
    championLogo: "/icons/mancity.svg",
    website: "https://www.uefa.com/uefachampionsleague/",
  },
  {
    id: "premier",
    name: "Premier League",
    icon: "/icons/premier.svg",
    background: "/placeholder.svg?height=300&width=1200&text=Premier+League",
    description:
      "The Premier League is the top tier of England's football pyramid, featuring 20 teams competing for the title.",
    founded: "1992",
    teams: 20,
    matches: 380,
    currentChampion: "Manchester City",
    championLogo: "/icons/mancity.svg",
    website: "https://www.premierleague.com/",
  },
  {
    id: "laliga",
    name: "La Liga",
    icon: "/icons/laliga.svg",
    background: "/placeholder.svg?height=300&width=1200&text=La+Liga",
    description: "La Liga is the men's top professional football division of the Spanish football league system.",
    founded: "1929",
    teams: 20,
    matches: 380,
    currentChampion: "Barcelona",
    championLogo: "/icons/barcelona.svg",
    website: "https://www.laliga.com/",
  },
  {
    id: "bundesliga",
    name: "Bundesliga",
    icon: "/icons/bundesliga.svg",
    background: "/placeholder.svg?height=300&width=1200&text=Bundesliga",
    description:
      "The Bundesliga is a professional association football league in Germany and the football league with the highest average stadium attendance worldwide.",
    founded: "1963",
    teams: 18,
    matches: 306,
    currentChampion: "Bayern Munich",
    championLogo: "/icons/bayern.svg",
    website: "https://www.bundesliga.com/",
  },
  {
    id: "seriea",
    name: "Serie A",
    icon: "/icons/seriea.svg",
    background: "/placeholder.svg?height=300&width=1200&text=Serie+A",
    description:
      "Serie A is a professional league competition for football clubs located at the top of the Italian football league system.",
    founded: "1898",
    teams: 20,
    matches: 380,
    currentChampion: "Napoli",
    championLogo: "/icons/napoli.svg",
    website: "https://www.legaseriea.it/",
  },
  {
    id: "ligue1",
    name: "Ligue 1",
    icon: "/icons/ligue1.svg",
    background: "/placeholder.svg?height=300&width=1200&text=Ligue+1",
    description: "Ligue 1 is the French professional league for men's association football clubs.",
    founded: "1932",
    teams: 18,
    matches: 306,
    currentChampion: "PSG",
    championLogo: "/icons/psg.svg",
    website: "https://www.ligue1.com/",
  },
]

// All matches data
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

interface LeagueDetailsProps {
  leagueId: string
}

export function LeagueDetails({ leagueId }: LeagueDetailsProps) {
  const [activeTab, setActiveTab] = useState<"matches" | "info" | "table" | "stats">("matches")

  // Find the league data
  const league = leaguesData.find((l) => l.id === leagueId) || leaguesData[0]

  // Filter matches for this league
  const leagueMatches = allMatches.filter((match) => match.leagueId === leagueId)

  // Group matches by status
  const liveMatches = leagueMatches.filter((match) => match.status === "live")
  const upcomingMatches = leagueMatches.filter((match) => match.status === "upcoming")
  const completedMatches = leagueMatches.filter((match) => match.status === "completed")

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

  // Get action button config based on match status
  const getActionButton = (status: string) => {
    switch (status) {
      case "live":
        return {
          text: "Watch Now",
          icon: <Play className="w-4 h-4" />,
          class: "gradient-bg text-white",
        }
      case "upcoming":
        return {
          text: "Set Reminder",
          icon: <Bell className="w-4 h-4" />,
          class: "border border-white/20 text-white hover:bg-white/10",
        }
      case "completed":
        return {
          text: "Watch Highlights",
          icon: <Film className="w-4 h-4" />,
          class: "border border-white/20 text-white hover:bg-white/10",
        }
      default:
        return {
          text: "View Details",
          icon: null,
          class: "border border-white/20 text-white hover:bg-white/10",
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* League Header */}
      <div className="relative rounded-xl overflow-hidden h-48 md:h-64">
        <Image src={league.background || "/placeholder.svg"} alt={league.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center p-3">
              <Image
                src={league.icon || "/placeholder.svg"}
                alt={league.name}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{league.name}</h1>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>Current Champion: {league.currentChampion}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-gray-300">Founded: {league.founded}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-gray-300">Teams: {league.teams}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-gray-300">Matches: {league.matches}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "matches" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("matches")}
          >
            Matches
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "info" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "table" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("table")}
          >
            Table
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "stats" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>
        </div>

        <div className="p-6">
          {/* Matches Tab */}
          {activeTab === "matches" && (
            <div className="space-y-6">
              {/* Live Matches */}
              {liveMatches.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span>Live Matches</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {liveMatches.map((match) => (
                      <Link key={match.id} href={`/match/${match.id}`}>
                        <motion.div
                          className="glass-card rounded-xl p-4 hover:bg-white/5 transition-colors"
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex justify-between items-center mb-3">
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
                            <div className="flex items-center gap-2">
                              <div className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                LIVE
                              </div>
                              <span className="text-xs text-gray-300">{match.minute}'</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                <Image
                                  src={match.homeTeam.logo || "/placeholder.svg"}
                                  alt={match.homeTeam.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 object-contain"
                                />
                              </div>
                              <span className="text-sm font-medium">{match.homeTeam.name}</span>
                            </div>

                            <div className="text-lg font-bold score-pulse">
                              {match.homeTeam.score} - {match.awayTeam.score}
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">{match.awayTeam.name}</span>
                              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                <Image
                                  src={match.awayTeam.logo || "/placeholder.svg"}
                                  alt={match.awayTeam.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 object-contain"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Users className="w-3 h-3" />
                              <span>{match.viewers} watching</span>
                            </div>

                            <motion.button
                              className="gradient-bg text-white py-1.5 px-3 rounded-lg text-xs font-medium flex items-center gap-1"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Play className="w-3 h-3" />
                              Watch Now
                            </motion.button>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Matches */}
              {upcomingMatches.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-yellow-500" />
                    <span>Upcoming Matches</span>
                  </h2>

                  <div className="glass-card rounded-xl overflow-hidden">
                    {/* Group matches by date */}
                    {Object.entries(
                      upcomingMatches.reduce(
                        (acc, match) => {
                          const date = match.date
                          if (!acc[date]) acc[date] = []
                          acc[date].push(match)
                          return acc
                        },
                        {} as Record<string, any[]>,
                      ),
                    ).map(([date, matches]) => (
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
                </div>
              )}

              {/* Completed Matches */}
              {completedMatches.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Film className="w-5 h-5 text-gray-400" />
                    <span>Completed Matches</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedMatches.map((match) => (
                      <Link key={match.id} href={`/match/${match.id}`}>
                        <motion.div
                          className="glass-card rounded-xl p-4 hover:bg-white/5 transition-colors"
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex justify-between items-center mb-3">
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
                            <div className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full font-medium">
                              Completed
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                <Image
                                  src={match.homeTeam.logo || "/placeholder.svg"}
                                  alt={match.homeTeam.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 object-contain"
                                />
                              </div>
                              <span className="text-sm font-medium">{match.homeTeam.name}</span>
                            </div>

                            <div className="text-lg font-bold">
                              {match.homeTeam.score} - {match.awayTeam.score}
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">{match.awayTeam.name}</span>
                              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                                <Image
                                  src={match.awayTeam.logo || "/placeholder.svg"}
                                  alt={match.awayTeam.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 object-contain"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(match.date)}</span>
                            </div>

                            <motion.button
                              className="border border-white/20 text-white py-1.5 px-3 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-white/10"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Film className="w-3 h-3" />
                              Highlights
                            </motion.button>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No matches message */}
              {leagueMatches.length === 0 && (
                <div className="glass-card rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No matches found</h3>
                  <p className="text-gray-400 mb-6">
                    There are no matches scheduled for this league at the moment. Check back later for updates.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Info Tab */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span>About {league.name}</span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">{league.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3 text-gray-400">League Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Founded</span>
                        <span>{league.founded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Teams</span>
                        <span>{league.teams}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Matches per season</span>
                        <span>{league.matches}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Website</span>
                        <a
                          href={league.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:underline"
                        >
                          Visit Official Site
                        </a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3 text-gray-400">Current Champion</h3>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <Image
                          src={league.championLogo || "/placeholder.svg"}
                          alt={league.currentChampion}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{league.currentChampion}</div>
                        <div className="text-sm text-gray-400">Current Season Champion</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a href={league.website} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="gradient-bg text-white py-2 px-6 rounded-lg font-medium flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Visit Official Website</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </a>
              </div>
            </div>
          )}

          {/* Table Tab */}
          {activeTab === "table" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Table className="w-5 h-5 text-green-500" />
                  <span>{league.name} Table</span>
                </h2>
                <div className="text-sm text-gray-400">2023/24 Season</div>
              </div>

              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Table className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">League Table Coming Soon</h3>
                  <p className="text-gray-400 mb-6">
                    We're working on bringing you the latest league table data. Check back soon for updates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-purple-500" />
                  <span>{league.name} Statistics</span>
                </h2>
                <div className="text-sm text-gray-400">2023/24 Season</div>
              </div>

              <div className="glass-card rounded-xl overflow-hidden">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">League Statistics Coming Soon</h3>
                  <p className="text-gray-400 mb-6">
                    We're working on bringing you detailed statistics for this league. Check back soon for updates.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
