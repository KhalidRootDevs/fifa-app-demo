"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, MapPin } from "lucide-react"

const stats = [
  {
    title: "Total Matches",
    value: "104",
    change: "+12%",
    icon: Calendar,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Teams",
    value: "48",
    change: "Complete",
    icon: Users,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Host Cities",
    value: "16",
    change: "3 Countries",
    icon: MapPin,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Live Matches",
    value: "3",
    change: "Now Playing",
    icon: Trophy,
    color: "text-red-600 dark:text-red-400",
  },
]

const recentMatches = [
  {
    id: 1,
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    score: "2-1",
    status: "Finished",
    time: "90+3'",
  },
  {
    id: 2,
    homeTeam: "France",
    awayTeam: "England",
    score: "1-0",
    status: "Live",
    time: "67'",
  },
  {
    id: 3,
    homeTeam: "Germany",
    awayTeam: "Spain",
    score: "vs",
    status: "Upcoming",
    time: "18:00",
  },
]

const topScorers = [
  { name: "Lionel Messi", team: "Argentina", goals: 8 },
  { name: "Kylian Mbappé", team: "France", goals: 7 },
  { name: "Harry Kane", team: "England", goals: 6 },
  { name: "Neymar Jr", team: "Brazil", goals: 5 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">FIFA World Cup 2026 Administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black dark:text-white">{stat.value}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Matches */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">Recent Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-black dark:text-white">
                      {match.homeTeam} {match.score} {match.awayTeam}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        match.status === "Live" ? "destructive" : match.status === "Finished" ? "secondary" : "outline"
                      }
                      className={
                        match.status === "Live"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : match.status === "Finished"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                            : "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
                      }
                    >
                      {match.status}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{match.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Scorers */}
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">Top Scorers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topScorers.map((scorer, index) => (
                <div
                  key={scorer.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-black dark:text-white">{scorer.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{scorer.team}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-black dark:text-white">{scorer.goals}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
