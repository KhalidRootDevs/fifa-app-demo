"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

const teams = [
  {
    id: "T001",
    name: "Brazil",
    flag: "/flags/brazil.svg",
    group: "Group A",
    played: 3,
    won: 3,
    drawn: 0,
    lost: 0,
    goalsFor: 7,
    goalsAgainst: 2,
    points: 9,
    qualified: true,
  },
  {
    id: "T002",
    name: "Argentina",
    flag: "/flags/argentina.svg",
    group: "Group A",
    played: 3,
    won: 2,
    drawn: 0,
    lost: 1,
    goalsFor: 5,
    goalsAgainst: 3,
    points: 6,
    qualified: true,
  },
  {
    id: "T003",
    name: "France",
    flag: "/flags/france.svg",
    group: "Group B",
    played: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    goalsFor: 4,
    goalsAgainst: 1,
    points: 7,
    qualified: true,
  },
  {
    id: "T004",
    name: "England",
    flag: "/flags/england.svg",
    group: "Group B",
    played: 3,
    won: 1,
    drawn: 2,
    lost: 0,
    goalsFor: 3,
    goalsAgainst: 2,
    points: 5,
    qualified: true,
  },
  {
    id: "T005",
    name: "Germany",
    flag: "/flags/germany.svg",
    group: "Group C",
    played: 3,
    won: 1,
    drawn: 1,
    lost: 1,
    goalsFor: 4,
    goalsAgainst: 3,
    points: 4,
    qualified: false,
  },
]

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.group.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">Teams</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all World Cup teams</p>
        </div>
        <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Team
        </Button>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-black dark:text-white">All Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search teams..."
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
                  <TableHead className="text-black dark:text-white">Team</TableHead>
                  <TableHead className="text-black dark:text-white">Group</TableHead>
                  <TableHead className="text-black dark:text-white text-center">P</TableHead>
                  <TableHead className="text-black dark:text-white text-center">W</TableHead>
                  <TableHead className="text-black dark:text-white text-center">D</TableHead>
                  <TableHead className="text-black dark:text-white text-center">L</TableHead>
                  <TableHead className="text-black dark:text-white text-center">GF</TableHead>
                  <TableHead className="text-black dark:text-white text-center">GA</TableHead>
                  <TableHead className="text-black dark:text-white text-center">Pts</TableHead>
                  <TableHead className="text-black dark:text-white">Status</TableHead>
                  <TableHead className="text-black dark:text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id} className="border-t border-gray-200 dark:border-gray-800">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-6 w-8 overflow-hidden rounded">
                          <Image
                            src={team.flag || "/placeholder.svg"}
                            alt={`${team.name} flag`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-black dark:text-white">{team.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-black dark:text-white">{team.group}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{team.played}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{team.won}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{team.drawn}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{team.lost}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{team.goalsFor}</TableCell>
                    <TableCell className="text-center text-black dark:text-white">{team.goalsAgainst}</TableCell>
                    <TableCell className="text-center font-bold text-black dark:text-white">{team.points}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          team.qualified
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {team.qualified ? "Qualified" : "In Progress"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-950">
                          <DropdownMenuItem className="text-black dark:text-white cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
