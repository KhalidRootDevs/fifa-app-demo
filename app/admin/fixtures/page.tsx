"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const groupFixtures = [
  {
    id: "G001",
    date: "2026-06-12",
    time: "18:00",
    homeTeam: "Brazil",
    homeFlag: "/flags/brazil.svg",
    awayTeam: "Argentina",
    awayFlag: "/flags/argentina.svg",
    venue: "MetLife Stadium, New York",
    group: "Group A",
    status: "Scheduled",
  },
  {
    id: "G002",
    date: "2026-06-12",
    time: "21:00",
    homeTeam: "France",
    homeFlag: "/flags/france.svg",
    awayTeam: "England",
    awayFlag: "/flags/england.svg",
    venue: "SoFi Stadium, Los Angeles",
    group: "Group B",
    status: "Scheduled",
  },
  {
    id: "G003",
    date: "2026-06-13",
    time: "18:00",
    homeTeam: "Germany",
    homeFlag: "/flags/germany.svg",
    awayTeam: "Spain",
    awayFlag: "/flags/spain.svg",
    venue: "AT&T Stadium, Dallas",
    group: "Group C",
    status: "Scheduled",
  },
]

const knockoutFixtures = [
  {
    id: "K001",
    date: "2026-07-04",
    time: "18:00",
    homeTeam: "Winner Group A",
    awayTeam: "Runner-up Group B",
    venue: "MetLife Stadium, New York",
    round: "Round of 16",
    status: "Scheduled",
  },
  {
    id: "K002",
    date: "2026-07-04",
    time: "21:00",
    homeTeam: "Winner Group C",
    awayTeam: "Runner-up Group D",
    venue: "SoFi Stadium, Los Angeles",
    round: "Round of 16",
    status: "Scheduled",
  },
  {
    id: "K003",
    date: "2026-07-08",
    time: "18:00",
    homeTeam: "Winner K001",
    awayTeam: "Winner K002",
    venue: "AT&T Stadium, Dallas",
    round: "Quarter-final",
    status: "Scheduled",
  },
]

const finalFixtures = [
  {
    id: "F001",
    date: "2026-07-15",
    time: "18:00",
    homeTeam: "TBD",
    awayTeam: "TBD",
    venue: "MetLife Stadium, New York",
    round: "Semi-final 1",
    status: "Scheduled",
  },
  {
    id: "F002",
    date: "2026-07-16",
    time: "18:00",
    homeTeam: "TBD",
    awayTeam: "TBD",
    venue: "SoFi Stadium, Los Angeles",
    round: "Semi-final 2",
    status: "Scheduled",
  },
  {
    id: "F003",
    date: "2026-07-19",
    time: "18:00",
    homeTeam: "TBD",
    awayTeam: "TBD",
    venue: "MetLife Stadium, New York",
    round: "Final",
    status: "Scheduled",
  },
]

export default function FixturesPage() {
  const [activeTab, setActiveTab] = useState("group")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black dark:text-white">Fixtures</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage World Cup match fixtures and schedules</p>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-black dark:text-white">Match Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="group" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="mb-4 bg-gray-100 dark:bg-gray-900">
              <TabsTrigger value="group" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                Group Stage
              </TabsTrigger>
              <TabsTrigger value="knockout" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                Knockout Stage
              </TabsTrigger>
              <TabsTrigger value="final" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                Semi-finals & Final
              </TabsTrigger>
            </TabsList>

            <TabsContent value="group">
              <div className="rounded-md border border-gray-200 dark:border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                      <TableHead className="text-black dark:text-white">Date & Time</TableHead>
                      <TableHead className="text-black dark:text-white">Match</TableHead>
                      <TableHead className="text-black dark:text-white">Venue</TableHead>
                      <TableHead className="text-black dark:text-white">Group</TableHead>
                      <TableHead className="text-black dark:text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupFixtures.map((fixture) => (
                      <TableRow key={fixture.id} className="border-t border-gray-200 dark:border-gray-800">
                        <TableCell>
                          <div className="font-medium text-black dark:text-white">{fixture.date}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fixture.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {fixture.homeFlag && (
                                <div className="relative h-5 w-7 overflow-hidden rounded">
                                  <Image
                                    src={fixture.homeFlag || "/placeholder.svg"}
                                    alt={`${fixture.homeTeam} flag`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <span className="font-medium text-black dark:text-white">{fixture.homeTeam}</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">vs</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-black dark:text-white">{fixture.awayTeam}</span>
                              {fixture.awayFlag && (
                                <div className="relative h-5 w-7 overflow-hidden rounded">
                                  <Image
                                    src={fixture.awayFlag || "/placeholder.svg"}
                                    alt={`${fixture.awayTeam} flag`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-black dark:text-white">{fixture.venue}</TableCell>
                        <TableCell className="text-black dark:text-white">{fixture.group}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {fixture.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="knockout">
              <div className="rounded-md border border-gray-200 dark:border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                      <TableHead className="text-black dark:text-white">Date & Time</TableHead>
                      <TableHead className="text-black dark:text-white">Match</TableHead>
                      <TableHead className="text-black dark:text-white">Venue</TableHead>
                      <TableHead className="text-black dark:text-white">Round</TableHead>
                      <TableHead className="text-black dark:text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {knockoutFixtures.map((fixture) => (
                      <TableRow key={fixture.id} className="border-t border-gray-200 dark:border-gray-800">
                        <TableCell>
                          <div className="font-medium text-black dark:text-white">{fixture.date}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fixture.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-black dark:text-white">{fixture.homeTeam}</span>
                            <span className="text-gray-500 dark:text-gray-400">vs</span>
                            <span className="font-medium text-black dark:text-white">{fixture.awayTeam}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-black dark:text-white">{fixture.venue}</TableCell>
                        <TableCell className="text-black dark:text-white">{fixture.round}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {fixture.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="final">
              <div className="rounded-md border border-gray-200 dark:border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                      <TableHead className="text-black dark:text-white">Date & Time</TableHead>
                      <TableHead className="text-black dark:text-white">Match</TableHead>
                      <TableHead className="text-black dark:text-white">Venue</TableHead>
                      <TableHead className="text-black dark:text-white">Round</TableHead>
                      <TableHead className="text-black dark:text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {finalFixtures.map((fixture) => (
                      <TableRow key={fixture.id} className="border-t border-gray-200 dark:border-gray-800">
                        <TableCell>
                          <div className="font-medium text-black dark:text-white">{fixture.date}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{fixture.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-black dark:text-white">{fixture.homeTeam}</span>
                            <span className="text-gray-500 dark:text-gray-400">vs</span>
                            <span className="font-medium text-black dark:text-white">{fixture.awayTeam}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-black dark:text-white">{fixture.venue}</TableCell>
                        <TableCell className="text-black dark:text-white">{fixture.round}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {fixture.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
