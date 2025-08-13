"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Users, Thermometer, Eye, Calendar, Trophy, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Match {
  id: string
  homeTeam: {
    name: string
    flag: string
    ranking: number
  }
  awayTeam: {
    name: string
    flag: string
    ranking: number
  }
  date: string
  time: string
  venue: string
  city: string
  country: string
  phase: string
  group?: string
  status: "live" | "upcoming" | "completed"
  score?: {
    home: number
    away: number
  }
  viewers?: number
  attendance?: number
  temperature?: number
  stats?: {
    possession: { home: number; away: number }
    shots: { home: number; away: number }
    corners: { home: number; away: number }
    fouls: { home: number; away: number }
    yellowCards: { home: number; away: number }
    redCards: { home: number; away: number }
  }
}

interface MatchCardProps {
  match: Match
}

const phaseColors = {
  group: "bg-blue-600",
  round16: "bg-green-600",
  quarter: "bg-yellow-600",
  semi: "bg-orange-600",
  final: "bg-red-600",
}

const phaseNames = {
  group: "Group Stage",
  round16: "Round of 16",
  quarter: "Quarter Final",
  semi: "Semi Final",
  final: "Final",
}

export function MatchCard({ match }: MatchCardProps) {
  const [showStats, setShowStats] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white"
      case "upcoming":
        return "bg-blue-500 text-white"
      case "completed":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getCountryFlag = (country: string) => {
    switch (country.toLowerCase()) {
      case "usa":
        return "🇺🇸"
      case "canada":
        return "🇨🇦"
      case "mexico":
        return "🇲🇽"
      default:
        return "🌍"
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card className="match-card glass-card-hover cursor-pointer">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className={`${phaseColors[match.phase as keyof typeof phaseColors]} text-white`}>
                {phaseNames[match.phase as keyof typeof phaseNames]}
              </Badge>
              {match.group && (
                <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                  Group {match.group}
                </Badge>
              )}
            </div>
            <Badge className={getStatusColor(match.status)}>
              {match.status === "live" && <div className="live-dot mr-1" />}
              {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
            </Badge>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between mb-6">
            {/* Home Team */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden team-logo flag-wave">
                  <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-800">
                    {match.homeTeam.flag}
                  </div>
                </div>
                <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs px-1 min-w-0">
                  #{match.homeTeam.ranking}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-lg">{match.homeTeam.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Star className="w-3 h-3 text-yellow-400" />
                  FIFA Ranking #{match.homeTeam.ranking}
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4 px-6">
              {match.score ? (
                <div className="text-center">
                  <div className={`text-3xl font-bold ${match.status === "live" ? "score-pulse" : ""}`}>
                    {match.score.home} - {match.score.away}
                  </div>
                  {match.status === "live" && <div className="text-xs text-red-400 font-medium">LIVE</div>}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-400">VS</div>
                  <div className="text-sm text-gray-500">{match.time}</div>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 flex-1 flex-row-reverse">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden team-logo flag-wave">
                  <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-800">
                    {match.awayTeam.flag}
                  </div>
                </div>
                <Badge className="absolute -top-1 -left-1 bg-yellow-500 text-black text-xs px-1 min-w-0">
                  #{match.awayTeam.ranking}
                </Badge>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-lg">{match.awayTeam.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-400 justify-end">
                  <Star className="w-3 h-3 text-yellow-400" />
                  FIFA Ranking #{match.awayTeam.ranking}
                </div>
              </div>
            </div>
          </div>

          {/* Match Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{match.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-lg">{getCountryFlag(match.country)}</span>
              <span>
                {match.city}, {match.country}
              </span>
            </div>
            {match.viewers && (
              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{(match.viewers / 1000000).toFixed(1)}M viewers</span>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
            {match.attendance && (
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span>{match.attendance.toLocaleString()} attendance</span>
              </div>
            )}
            {match.temperature && (
              <div className="flex items-center gap-2 text-gray-400">
                <Thermometer className="w-4 h-4" />
                <span>{match.temperature}°C</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-400">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>FIFA World Cup 2026</span>
            </div>
          </div>

          {/* Stats */}
          {match.stats && (
            <motion.div
              initial={false}
              animate={{ height: showStats ? "auto" : 0, opacity: showStats ? 1 : 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-white/10 text-sm">
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Possession</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{match.stats.possession.home}%</span>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                        style={{ width: `${match.stats.possession.home}%` }}
                      />
                    </div>
                    <span className="text-xs">{match.stats.possession.away}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Shots</div>
                  <div className="font-medium">
                    {match.stats.shots.home} - {match.stats.shots.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Corners</div>
                  <div className="font-medium">
                    {match.stats.corners.home} - {match.stats.corners.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Cards</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-yellow-400">{match.stats.yellowCards.home}</span>
                    <span className="text-red-400">{match.stats.redCards.home}</span>
                    <span className="text-gray-400">-</span>
                    <span className="text-yellow-400">{match.stats.yellowCards.away}</span>
                    <span className="text-red-400">{match.stats.redCards.away}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex gap-2">
              {match.stats && (
                <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)} className="btn-outline">
                  {showStats ? "Hide" : "Show"} Stats
                </Button>
              )}
            </div>
            <Link href={`/match/${match.id}`}>
              <Button className="btn-primary">
                {match.status === "live" ? "Watch Live" : match.status === "upcoming" ? "Preview" : "Highlights"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
