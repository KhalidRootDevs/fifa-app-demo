"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Users, MapPin, Calendar, Clock, Globe } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock match data
const mockMatchData = {
  id: "M001",
  homeTeam: "Brazil",
  awayTeam: "Argentina",
  homeFlag: "/flags/brazil.svg",
  awayFlag: "/flags/argentina.svg",
  date: "2026-06-12",
  time: "18:00",
  venue: "MetLife Stadium, New York",
  group: "Group A",
  status: "Finished" as const,
  homeScore: 2,
  awayScore: 1,
  description: "Classic rivalry match between Brazil and Argentina in the FIFA World Cup 2026",
  streamSources: [
    {
      id: "1",
      name: "ESPN",
      url: "https://espn.com/stream/match1",
      quality: "FHD",
      language: "English",
    },
    {
      id: "2",
      name: "Fox Sports",
      url: "https://foxsports.com/stream/match1",
      quality: "4K",
      language: "Spanish",
    },
    {
      id: "3",
      name: "BBC Sport",
      url: "https://bbc.com/sport/stream/match1",
      quality: "HD",
      language: "English",
    },
  ],
  stats: {
    attendance: "82,500",
    referee: "Pierluigi Collina",
    weather: "Clear, 24°C",
    possession: { home: 58, away: 42 },
    shots: { home: 12, away: 8 },
    shotsOnTarget: { home: 6, away: 3 },
    corners: { home: 7, away: 4 },
    fouls: { home: 11, away: 14 },
    yellowCards: { home: 2, away: 3 },
    redCards: { home: 0, away: 1 },
  },
}

const statusColors = {
  Upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Live: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  Finished: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
}

export default function MatchDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [match, setMatch] = useState(mockMatchData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading match data
    const loadMatch = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setMatch(mockMatchData)
        setIsLoading(false)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load match details.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    loadMatch()
  }, [params.id])

  const handleDeleteMatch = async () => {
    if (confirm("Are you sure you want to delete this match? This action cannot be undone.")) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast({
          title: "Success",
          description: "Match has been deleted successfully.",
        })
        router.push("/admin/matches")
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete match. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const formatScore = (homeScore?: number, awayScore?: number, status: string) => {
    if (status === "Upcoming") {
      return "vs"
    }
    if (status === "Live" || status === "Finished") {
      return `${homeScore ?? 0} - ${awayScore ?? 0}`
    }
    return "vs"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/matches">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">Match Details</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage match information</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/matches/${match.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Match
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleDeleteMatch}
            className="text-red-600 hover:text-red-700 bg-transparent"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Match Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Match Overview */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-black dark:text-white">Match Overview</CardTitle>
                <Badge className={statusColors[match.status]}>{match.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Teams and Score */}
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <img
                    src={match.homeFlag || "/placeholder.svg"}
                    alt={match.homeTeam}
                    className="w-16 h-12 object-cover rounded mx-auto mb-2"
                  />
                  <h3 className="text-xl font-bold text-black dark:text-white">{match.homeTeam}</h3>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black dark:text-white mb-2">
                    {formatScore(match.homeScore, match.awayScore, match.status)}
                  </div>
                  {match.status === "Live" && (
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm text-red-600 dark:text-red-400">LIVE</span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <img
                    src={match.awayFlag || "/placeholder.svg"}
                    alt={match.awayTeam}
                    className="w-16 h-12 object-cover rounded mx-auto mb-2"
                  />
                  <h3 className="text-xl font-bold text-black dark:text-white">{match.awayTeam}</h3>
                </div>
              </div>

              <Separator />

              {/* Match Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium text-black dark:text-white">{match.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                    <p className="font-medium text-black dark:text-white">{match.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Venue</p>
                    <p className="font-medium text-black dark:text-white">{match.venue}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Group</p>
                    <p className="font-medium text-black dark:text-white">{match.group}</p>
                  </div>
                </div>
              </div>

              {match.description && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-black dark:text-white mb-2">Description</h4>
                    <p className="text-gray-600 dark:text-gray-400">{match.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Match Statistics */}
          {match.status === "Finished" && (
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Match Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-black dark:text-white">{match.stats.possession.home}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Possession</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Ball Possession</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${match.stats.possession.home}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-black dark:text-white">{match.stats.possession.away}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Possession</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="text-black dark:text-white">{match.stats.shots.home}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Shots</div>
                  <div className="text-black dark:text-white">{match.stats.shots.away}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="text-black dark:text-white">{match.stats.shotsOnTarget.home}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Shots on Target</div>
                  <div className="text-black dark:text-white">{match.stats.shotsOnTarget.away}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="text-black dark:text-white">{match.stats.corners.home}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Corners</div>
                  <div className="text-black dark:text-white">{match.stats.corners.away}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="text-black dark:text-white">{match.stats.fouls.home}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Fouls</div>
                  <div className="text-black dark:text-white">{match.stats.fouls.away}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-4 bg-yellow-400 rounded-sm" />
                    <span className="text-black dark:text-white">{match.stats.yellowCards.home}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Cards</div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-3 h-4 bg-yellow-400 rounded-sm" />
                    <span className="text-black dark:text-white">{match.stats.yellowCards.away}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stream Sources */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Stream Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {match.streamSources.map((source) => (
                <div key={source.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black dark:text-white">{source.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {source.quality}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Globe className="h-3 w-3" />
                    <span>{source.language}</span>
                  </div>
                  <div className="mt-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      {source.url}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Match Info */}
          <Card className="border-gray-200 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Additional Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Match ID</p>
                <p className="font-mono text-black dark:text-white">{match.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Attendance</p>
                <p className="text-black dark:text-white">{match.stats.attendance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Referee</p>
                <p className="text-black dark:text-white">{match.stats.referee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weather</p>
                <p className="text-black dark:text-white">{match.stats.weather}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
