"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Eye, Edit, Trash2, Calendar, Users, Trophy, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for matches
const mockMatches = [
  {
    id: "M001",
    homeTeam: "Brazil",
    awayTeam: "Argentina",
    homeFlag: "/flags/brazil.svg",
    awayFlag: "/flags/argentina.svg",
    date: "2026-06-12",
    time: "18:00",
    venue: "MetLife Stadium, New York",
    group: "Group A",
    status: "Finished",
    homeScore: 2,
    awayScore: 1,
  },
  {
    id: "M002",
    homeTeam: "France",
    awayTeam: "England",
    homeFlag: "/flags/france.svg",
    awayFlag: "/flags/england.svg",
    date: "2026-06-13",
    time: "20:00",
    venue: "SoFi Stadium, Los Angeles",
    group: "Group B",
    status: "Live",
    homeScore: 1,
    awayScore: 0,
  },
  {
    id: "M003",
    homeTeam: "Spain",
    awayTeam: "Germany",
    homeFlag: "/flags/spain.svg",
    awayFlag: "/flags/germany.svg",
    date: "2026-06-14",
    time: "16:00",
    venue: "AT&T Stadium, Dallas",
    group: "Group C",
    status: "Upcoming",
    homeScore: null,
    awayScore: null,
  },
  {
    id: "M004",
    homeTeam: "Portugal",
    awayTeam: "Netherlands",
    homeFlag: "/flags/portugal.svg",
    awayFlag: "/flags/netherlands.svg",
    date: "2026-06-15",
    time: "19:00",
    venue: "Mercedes-Benz Stadium, Atlanta",
    group: "Group D",
    status: "Upcoming",
    homeScore: null,
    awayScore: null,
  },
  {
    id: "M005",
    homeTeam: "Italy",
    awayTeam: "Croatia",
    homeFlag: "/flags/italy.svg",
    awayFlag: "/flags/croatia.svg",
    date: "2026-06-16",
    time: "21:00",
    venue: "Hard Rock Stadium, Miami",
    group: "Group E",
    status: "Finished",
    homeScore: 3,
    awayScore: 2,
  },
]

const groups = ["All Groups", "Group A", "Group B", "Group C", "Group D", "Group E", "Group F", "Group G", "Group H"]
const statuses = ["All Status", "Upcoming", "Live", "Finished"]

export default function AdminMatchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("All Groups")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const filteredMatches = mockMatches.filter((match) => {
    const matchesSearch =
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGroup = selectedGroup === "All Groups" || match.group === selectedGroup
    const matchesStatus = selectedStatus === "All Status" || match.status === selectedStatus

    return matchesSearch && matchesGroup && matchesStatus
  })

  const totalMatches = mockMatches.length
  const liveMatches = mockMatches.filter((m) => m.status === "Live").length
  const upcomingMatches = mockMatches.filter((m) => m.status === "Upcoming").length
  const completedMatches = mockMatches.filter((m) => m.status === "Finished").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Live":
        return <Badge className="bg-red-500 text-white animate-pulse">Live</Badge>
      case "Finished":
        return <Badge className="bg-green-500 text-white">Finished</Badge>
      case "Upcoming":
        return <Badge className="bg-blue-500 text-white">Upcoming</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto max-w-7xl p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">Match Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage FIFA 2026 World Cup matches</p>
        </div>
        <Link href="/admin/matches/add">
          <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Match
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Matches</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black dark:text-white">{totalMatches}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">All tournament matches</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Live Matches</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{liveMatches}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Currently playing</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{upcomingMatches}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Scheduled matches</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</CardTitle>
            <Trophy className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{completedMatches}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Finished matches</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by team or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-900"
              />
            </div>
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 dark:bg-gray-900">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 dark:bg-gray-900">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Matches Table */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-black dark:text-white">Matches ({filteredMatches.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Teams</TableHead>
                  <TableHead className="min-w-[100px]">Score</TableHead>
                  <TableHead className="min-w-[120px]">Date & Time</TableHead>
                  <TableHead className="min-w-[200px]">Venue</TableHead>
                  <TableHead className="min-w-[80px]">Group</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMatches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2">
                        <Calendar className="h-8 w-8 text-gray-400" />
                        <p className="text-gray-500 dark:text-gray-400">No matches found</p>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMatches.map((match) => (
                    <TableRow key={match.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Image
                              src={match.homeFlag || "/placeholder.svg"}
                              alt={match.homeTeam}
                              width={24}
                              height={16}
                              className="rounded-sm"
                            />
                            <span className="font-medium text-black dark:text-white">{match.homeTeam}</span>
                          </div>
                          <span className="text-gray-400">vs</span>
                          <div className="flex items-center gap-2">
                            <Image
                              src={match.awayFlag || "/placeholder.svg"}
                              alt={match.awayTeam}
                              width={24}
                              height={16}
                              className="rounded-sm"
                            />
                            <span className="font-medium text-black dark:text-white">{match.awayTeam}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {match.status === "Finished" || match.status === "Live" ? (
                          <div className="font-mono text-lg font-bold text-black dark:text-white">
                            {match.homeScore} - {match.awayScore}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium text-black dark:text-white">{match.date}</div>
                          <div className="text-gray-500">{match.time}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          <span className="text-sm text-black dark:text-white truncate block" title={match.venue}>
                            {match.venue}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {match.group}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(match.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/matches/${match.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Link href={`/admin/matches/${match.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
