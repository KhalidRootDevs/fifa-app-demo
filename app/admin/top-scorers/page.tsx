"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Image from "next/image"

const scorers = [
  {
    id: 1,
    name: "Lionel Messi",
    team: "Argentina",
    flag: "/flags/argentina.svg",
    goals: 8,
    assists: 3,
    matches: 7,
    minutesPlayed: 630,
    status: "Active",
  },
  {
    id: 2,
    name: "Kylian Mbappé",
    team: "France",
    flag: "/flags/france.svg",
    goals: 7,
    assists: 2,
    matches: 7,
    minutesPlayed: 615,
    status: "Active",
  },
  {
    id: 3,
    name: "Harry Kane",
    team: "England",
    flag: "/flags/england.svg",
    goals: 6,
    assists: 1,
    matches: 6,
    minutesPlayed: 540,
    status: "Active",
  },
  {
    id: 4,
    name: "Neymar Jr",
    team: "Brazil",
    flag: "/flags/brazil.svg",
    goals: 5,
    assists: 4,
    matches: 5,
    minutesPlayed: 450,
    status: "Active",
  },
  {
    id: 5,
    name: "Cristiano Ronaldo",
    team: "Portugal",
    flag: "/flags/portugal.svg",
    goals: 4,
    assists: 1,
    matches: 5,
    minutesPlayed: 435,
    status: "Eliminated",
  },
  {
    id: 6,
    name: "Robert Lewandowski",
    team: "Poland",
    flag: "/flags/poland.svg",
    goals: 4,
    assists: 0,
    matches: 4,
    minutesPlayed: 360,
    status: "Eliminated",
  },
  {
    id: 7,
    name: "Lautaro Martínez",
    team: "Argentina",
    flag: "/flags/argentina.svg",
    goals: 3,
    assists: 2,
    matches: 7,
    minutesPlayed: 420,
    status: "Active",
  },
  {
    id: 8,
    name: "Memphis Depay",
    team: "Netherlands",
    flag: "/flags/netherlands.svg",
    goals: 3,
    assists: 1,
    matches: 5,
    minutesPlayed: 405,
    status: "Eliminated",
  },
]

export default function TopScorersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredScorers = scorers.filter(
    (scorer) =>
      scorer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scorer.team.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">Top Scorers</h1>
        <p className="text-gray-600 dark:text-gray-400">Track the leading goal scorers of the tournament</p>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-black dark:text-white">Goal Scorers Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search players..."
                className="pl-8 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border border-gray-200 dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900">
                  <TableHead className="w-12 text-black dark:text-white">Rank</TableHead>
                  <TableHead className="text-black dark:text-white">Player</TableHead>
                  <TableHead className="text-black dark:text-white">Team</TableHead>
                  <TableHead className="text-center text-black dark:text-white">Goals</TableHead>
                  <TableHead className="text-center text-black dark:text-white">Assists</TableHead>
                  <TableHead className="text-center text-black dark:text-white">Matches</TableHead>
                  <TableHead className="text-center text-black dark:text-white">Minutes</TableHead>
                  <TableHead className="text-black dark:text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScorers.map((scorer, index) => (
                  <TableRow key={scorer.id} className="border-t border-gray-200 dark:border-gray-800">
                    <TableCell>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-black"
                            : index === 1
                              ? "bg-gray-300 text-black"
                              : index === 2
                                ? "bg-amber-700 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-black dark:text-white">{scorer.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="relative h-5 w-7 overflow-hidden rounded">
                          <Image
                            src={scorer.flag || "/placeholder.svg"}
                            alt={`${scorer.team} flag`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-black dark:text-white">{scorer.team}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold text-black dark:text-white">{scorer.goals}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{scorer.assists}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{scorer.matches}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{scorer.minutesPlayed}</TableCell>
                    <TableCell>
                      <Badge
                        variant={scorer.status === "Active" ? "default" : "secondary"}
                        className={
                          scorer.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }
                      >
                        {scorer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
