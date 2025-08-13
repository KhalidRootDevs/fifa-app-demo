"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus } from "lucide-react"
import Image from "next/image"

const groups = [
  {
    name: "Group A",
    teams: [
      { name: "Brazil", flag: "/flags/brazil.svg", played: 3, won: 3, drawn: 0, lost: 0, gf: 7, ga: 2, points: 9 },
      {
        name: "Argentina",
        flag: "/flags/argentina.svg",
        played: 3,
        won: 2,
        drawn: 0,
        lost: 1,
        gf: 5,
        ga: 3,
        points: 6,
      },
      { name: "Mexico", flag: "/flags/mexico.svg", played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, points: 3 },
      { name: "Canada", flag: "/flags/canada.svg", played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 6, points: 0 },
    ],
  },
  {
    name: "Group B",
    teams: [
      { name: "France", flag: "/flags/france.svg", played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 1, points: 7 },
      { name: "England", flag: "/flags/england.svg", played: 3, won: 1, drawn: 2, lost: 0, gf: 3, ga: 2, points: 5 },
      { name: "USA", flag: "/flags/usa.svg", played: 3, won: 0, drawn: 2, lost: 1, gf: 1, ga: 2, points: 2 },
      { name: "Morocco", flag: "/flags/morocco.svg", played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 4, points: 1 },
    ],
  },
  {
    name: "Group C",
    teams: [
      { name: "Spain", flag: "/flags/spain.svg", played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 1, points: 7 },
      { name: "Germany", flag: "/flags/germany.svg", played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, points: 4 },
      { name: "Japan", flag: "/flags/japan.svg", played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 3, points: 3 },
      { name: "Croatia", flag: "/flags/croatia.svg", played: 3, won: 0, drawn: 2, lost: 1, gf: 2, ga: 6, points: 2 },
    ],
  },
]

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">Groups</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage World Cup groups and standings</p>
        </div>
        <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Group
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <Card key={group.name} className="border-gray-200 dark:border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-black dark:text-white">{group.name}</CardTitle>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit {group.name}</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-900">
                    <TableHead className="w-[40%] text-black dark:text-white">Team</TableHead>
                    <TableHead className="text-center text-black dark:text-white">P</TableHead>
                    <TableHead className="text-center text-black dark:text-white">GD</TableHead>
                    <TableHead className="text-center text-black dark:text-white">Pts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.teams.map((team, index) => (
                    <TableRow
                      key={team.name}
                      className={`border-t border-gray-200 dark:border-gray-800 ${
                        index < 2 ? "bg-green-50 dark:bg-green-950/20" : ""
                      }`}
                    >
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
                      <TableCell className="text-center text-black dark:text-white">{team.played}</TableCell>
                      <TableCell className="text-center text-black dark:text-white">{team.gf - team.ga}</TableCell>
                      <TableCell className="text-center font-bold text-black dark:text-white">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
