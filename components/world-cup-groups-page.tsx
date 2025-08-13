"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trophy, Flag, Users, Calendar, MapPin } from "lucide-react"

const worldCupGroups = [
  {
    id: "A",
    teams: [
      { name: "Brazil", flag: "/flags/brazil.svg", points: 9, played: 3, wins: 3, draws: 0, losses: 0, gf: 8, ga: 2 },
      { name: "Germany", flag: "/flags/germany.svg", points: 6, played: 3, wins: 2, draws: 0, losses: 1, gf: 5, ga: 3 },
      { name: "Morocco", flag: "/flags/morocco.svg", points: 3, played: 3, wins: 1, draws: 0, losses: 2, gf: 3, ga: 5 },
      {
        name: "Australia",
        flag: "/flags/australia.svg",
        points: 0,
        played: 3,
        wins: 0,
        draws: 0,
        losses: 3,
        gf: 1,
        ga: 7,
      },
    ],
  },
  {
    id: "B",
    teams: [
      {
        name: "Argentina",
        flag: "/flags/argentina.svg",
        points: 7,
        played: 3,
        wins: 2,
        draws: 1,
        losses: 0,
        gf: 6,
        ga: 2,
      },
      { name: "Spain", flag: "/flags/spain.svg", points: 4, played: 3, wins: 1, draws: 1, losses: 1, gf: 4, ga: 4 },
      { name: "Japan", flag: "/flags/japan.svg", points: 4, played: 3, wins: 1, draws: 1, losses: 1, gf: 3, ga: 4 },
      { name: "Croatia", flag: "/flags/croatia.svg", points: 1, played: 3, wins: 0, draws: 1, losses: 2, gf: 2, ga: 5 },
    ],
  },
  {
    id: "C",
    teams: [
      { name: "France", flag: "/flags/france.svg", points: 9, played: 3, wins: 3, draws: 0, losses: 0, gf: 7, ga: 1 },
      { name: "England", flag: "/flags/england.svg", points: 6, played: 3, wins: 2, draws: 0, losses: 1, gf: 6, ga: 3 },
      { name: "Mexico", flag: "/flags/mexico.svg", points: 3, played: 3, wins: 1, draws: 0, losses: 2, gf: 4, ga: 6 },
      { name: "Poland", flag: "/flags/poland.svg", points: 0, played: 3, wins: 0, draws: 0, losses: 3, gf: 2, ga: 9 },
    ],
  },
  {
    id: "D",
    teams: [
      {
        name: "Portugal",
        flag: "/flags/portugal.svg",
        points: 6,
        played: 3,
        wins: 2,
        draws: 0,
        losses: 1,
        gf: 5,
        ga: 3,
      },

      {
        name: "Portugal",
        flag: "/flags/portugal.svg",
        points: 6,
        played: 3,
        wins: 2,
        draws: 0,
        losses: 1,
        gf: 5,
        ga: 3,
      },
      {
        name: "Netherlands",
        flag: "/flags/netherlands.svg",
        points: 6,
        played: 3,
        wins: 2,
        draws: 0,
        losses: 1,
        gf: 4,
        ga: 2,
      },
      { name: "USA", flag: "/flags/usa.svg", points: 3, played: 3, wins: 1, draws: 0, losses: 2, gf: 3, ga: 5 },
      { name: "Canada", flag: "/flags/canada.svg", points: 3, played: 3, wins: 1, draws: 0, losses: 2, gf: 2, ga: 4 },
    ],
  },
  {
    id: "E",
    teams: [
      { name: "Belgium", flag: "/flags/belgium.svg", points: 7, played: 3, wins: 2, draws: 1, losses: 0, gf: 5, ga: 2 },
      { name: "Italy", flag: "/flags/italy.svg", points: 5, played: 3, wins: 1, draws: 2, losses: 0, gf: 3, ga: 2 },
      {
        name: "Colombia",
        flag: "/flags/colombia.svg",
        points: 4,
        played: 3,
        wins: 1,
        draws: 1,
        losses: 1,
        gf: 4,
        ga: 4,
      },
      { name: "Uruguay", flag: "/flags/uruguay.svg", points: 0, played: 3, wins: 0, draws: 0, losses: 3, gf: 1, ga: 5 },
    ],
  },
  {
    id: "F",
    teams: [
      { name: "Denmark", flag: "/flags/denmark.svg", points: 6, played: 3, wins: 2, draws: 0, losses: 1, gf: 4, ga: 2 },
      { name: "Serbia", flag: "/flags/serbia.svg", points: 4, played: 3, wins: 1, draws: 1, losses: 1, gf: 3, ga: 3 },
      {
        name: "Switzerland",
        flag: "/flags/switzerland.svg",
        points: 4,
        played: 3,
        wins: 1,
        draws: 1,
        losses: 1,
        gf: 2,
        ga: 2,
      },
      { name: "Ecuador", flag: "/flags/ecuador.svg", points: 2, played: 3, wins: 0, draws: 2, losses: 1, gf: 2, ga: 4 },
    ],
  },
]

export function WorldCupGroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState("A")

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
      case 2:
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case 3:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case 4:
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-8">
      {/* Group Selector */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex flex-wrap">
          {worldCupGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`flex-1 min-w-[120px] px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                selectedGroup === group.id
                  ? "text-white border-red-500 bg-white/10"
                  : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
              }`}
            >
              Group {group.id}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Group Details */}
      {worldCupGroups
        .filter((group) => group.id === selectedGroup)
        .map((group) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Group Header */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <Flag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Group {group.id}</h2>
                  <p className="text-gray-400">FIFA World Cup 2026</p>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Qualifies to Round of 16</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Third Place (Possible)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">Eliminated</span>
                </div>
              </div>
            </div>

            {/* Group Table */}
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Group {group.id} Standings
                </h3>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 mb-4 text-xs font-medium text-gray-400 uppercase">
                  <div className="col-span-1">#</div>
                  <div className="col-span-4">Team</div>
                  <div className="col-span-1">P</div>
                  <div className="col-span-1">W</div>
                  <div className="col-span-1">D</div>
                  <div className="col-span-1">L</div>
                  <div className="col-span-1">GF</div>
                  <div className="col-span-1">GA</div>
                  <div className="col-span-1">Pts</div>
                </div>

                {/* Team Rows */}
                <div className="space-y-2">
                  {group.teams.map((team, index) => {
                    const position = index + 1
                    return (
                      <Link key={team.name} href={`/teams/${team.name.toLowerCase()}`}>
                        <motion.div
                          className={`grid grid-cols-12 gap-2 items-center p-4 rounded-lg border transition-all hover:bg-white/5 ${getPositionColor(
                            position,
                          )}`}
                          whileHover={{ x: 5 }}
                        >
                          <div className="col-span-1 text-center font-bold">{position}</div>
                          <div className="col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                              <Image
                                src={team.flag || "/placeholder.svg"}
                                alt={team.name}
                                width={24}
                                height={24}
                                className="w-6 h-6 object-cover rounded-full"
                              />
                            </div>
                            <span className="font-medium">{team.name}</span>
                          </div>
                          <div className="col-span-1 text-center">{team.played}</div>
                          <div className="col-span-1 text-center text-green-400">{team.wins}</div>
                          <div className="col-span-1 text-center text-yellow-400">{team.draws}</div>
                          <div className="col-span-1 text-center text-red-400">{team.losses}</div>
                          <div className="col-span-1 text-center">{team.gf}</div>
                          <div className="col-span-1 text-center">{team.ga}</div>
                          <div className="col-span-1 text-center font-bold text-yellow-500">{team.points}</div>
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Group Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-blue-500" />
                  <h4 className="font-semibold">Group Stats</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Goals:</span>
                    <span className="font-medium">{group.teams.reduce((sum, team) => sum + team.gf, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Matches Played:</span>
                    <span className="font-medium">{group.teams[0].played * 2}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Matches Remaining:</span>
                    <span className="font-medium">{6 - group.teams[0].played * 2}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold">Next Matches</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">June 15, 2026</div>
                  <div className="font-medium">
                    {group.teams[0].name} vs {group.teams[2].name}
                  </div>
                  <div className="font-medium">
                    {group.teams[1].name} vs {group.teams[3].name}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <h4 className="font-semibold">Host Venues</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">Primary Stadiums:</div>
                  <div className="font-medium">MetLife Stadium</div>
                  <div className="font-medium">SoFi Stadium</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

      {/* All Groups Overview */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">All Groups Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {worldCupGroups.map((group) => (
            <div key={group.id} className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Flag className="w-4 h-4 text-yellow-500" />
                Group {group.id}
              </h4>
              <div className="space-y-2">
                {group.teams.slice(0, 2).map((team, index) => (
                  <div key={team.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full overflow-hidden">
                        <Image
                          src={team.flag || "/placeholder.svg"}
                          alt={team.name}
                          width={16}
                          height={16}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={index === 0 ? "text-green-400" : "text-green-300"}>{team.name}</span>
                    </div>
                    <span className="font-medium">{team.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
