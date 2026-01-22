"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Flag, Users, Calendar, MapPin } from "lucide-react";
import { groups } from "@/lib/database/groups";

// Convert groups object to array format for the component
const groupArray = Object.entries(groups).map(([id, teams]) => ({
  id,
  teams: teams.map((team) => ({
    name: team.team,
    flag: team.flag,
    points: team.points,
    played: team.played,
    wins: team.won,
    draws: team.drawn,
    losses: team.lost,
    gf: team.gf,
    ga: team.ga,
    gd: team.gd,
  })),
}));

export function WorldCupGroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState("A");

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
      case 2:
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case 3:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case 4:
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getFlagImageSrc = (flagEmoji: string, teamName: string) => {
    if (flagEmoji === "❓") return "/flags/tbd.svg";
    if (flagEmoji === "🏴󠁧󠁢󠁥󠁮󠁧󠁿") return "/flags/england.svg";
    if (flagEmoji === "🏴󠁧󠁢󠁳󠁣󠁴󠁿") return "/flags/scotland.svg";

    // Map common flag emojis to flag images
    const flagMap: Record<string, string> = {
      "🇲🇽": "/flags/mexico.svg",
      "🇿🇦": "/flags/south-africa.svg",
      "🇰🇷": "/flags/south-korea.svg",
      "🇨🇦": "/flags/canada.svg",
      "🇶🇦": "/flags/qatar.svg",
      "🇨🇭": "/flags/switzerland.svg",
      "🇧🇷": "/flags/brazil.svg",
      "🇲🇦": "/flags/morocco.svg",
      "🇭🇹": "/flags/haiti.svg",
      "🇺🇸": "/flags/usa.svg",
      "🇵🇾": "/flags/paraguay.svg",
      "🇦🇺": "/flags/australia.svg",
      "🇩🇪": "/flags/germany.svg",
      "🇨🇼": "/flags/curacao.svg",
      "🇨🇮": "/flags/ivory-coast.svg",
      "🇪🇨": "/flags/ecuador.svg",
      "🇳🇱": "/flags/netherlands.svg",
      "🇯🇵": "/flags/japan.svg",
      "🇹🇳": "/flags/tunisia.svg",
      "🇧🇪": "/flags/belgium.svg",
      "🇪🇬": "/flags/egypt.svg",
      "🇮🇷": "/flags/iran.svg",
      "🇳🇿": "/flags/new-zealand.svg",
      "🇪🇸": "/flags/spain.svg",
      "🇨🇻": "/flags/cape-verde.svg",
      "🇸🇦": "/flags/saudi-arabia.svg",
      "🇺🇾": "/flags/uruguay.svg",
      "🇫🇷": "/flags/france.svg",
      "🇸🇳": "/flags/senegal.svg",
      "🇳🇴": "/flags/norway.svg",
      "🇦🇷": "/flags/argentina.svg",
      "🇩🇿": "/flags/algeria.svg",
      "🇦🇹": "/flags/austria.svg",
      "🇯🇴": "/flags/jordan.svg",
      "🇵🇹": "/flags/portugal.svg",
      "🇺🇿": "/flags/uzbekistan.svg",
      "🇨🇴": "/flags/colombia.svg",
      "🇭🇷": "/flags/croatia.svg",
      "🇬🇭": "/flags/ghana.svg",
      "🇵🇦": "/flags/panama.svg",
    };

    return (
      flagMap[flagEmoji] ||
      `/flags/${teamName.toLowerCase().replace(/\s+/g, "-")}.svg`
    );
  };

  return (
    <div className="space-y-8">
      {/* Group Selector */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="flex flex-wrap">
          {groupArray.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`flex-1 min-w-[80px] px-3 py-3 font-medium text-sm transition-colors border-b-2 ${
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
      {groupArray
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
                  <span className="text-gray-300">
                    Qualifies to Round of 16
                  </span>
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
                  <div className="col-span-1">GD</div>
                  <div className="col-span-1">Pts</div>
                </div>

                {/* Team Rows */}
                <div className="space-y-2">
                  {group.teams.map((team, index) => {
                    const position = index + 1;
                    return (
                      <Link
                        key={team.name}
                        href={`/teams/${team.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <motion.div
                          className={`grid grid-cols-12 gap-2 items-center p-4 rounded-lg border transition-all hover:bg-white/5 ${getPositionColor(
                            position,
                          )}`}
                          whileHover={{ x: 5 }}
                        >
                          <div className="col-span-1 text-center font-bold">
                            {position}
                          </div>
                          <div className="col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                              <span className="text-xl">{team.flag}</span>
                            </div>
                            <span className="font-medium">{team.name}</span>
                          </div>
                          <div className="col-span-1 text-center">
                            {team.played}
                          </div>
                          <div className="col-span-1 text-center text-green-400">
                            {team.wins}
                          </div>
                          <div className="col-span-1 text-center text-yellow-400">
                            {team.draws}
                          </div>
                          <div className="col-span-1 text-center text-red-400">
                            {team.losses}
                          </div>
                          <div className="col-span-1 text-center">
                            {team.gf}
                          </div>
                          <div className="col-span-1 text-center">
                            {team.ga}
                          </div>
                          <div className="col-span-1 text-center">
                            {team.gd > 0 ? `+${team.gd}` : team.gd}
                          </div>
                          <div className="col-span-1 text-center font-bold text-yellow-500">
                            {team.points}
                          </div>
                        </motion.div>
                      </Link>
                    );
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
                    <span className="font-medium">
                      {group.teams.reduce((sum, team) => sum + team.gf, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Matches Played:</span>
                    <span className="font-medium">
                      {group.teams[0].played * 2}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Matches Remaining:</span>
                    <span className="font-medium">
                      {6 - group.teams[0].played * 2}
                    </span>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <h4 className="font-semibold">Group Stage Dates</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">June 11-26, 2026</div>
                  <div className="font-medium">All group matches</div>
                  <div className="text-gray-400">June 28-29, 2026</div>
                  <div className="font-medium">Round of 16 begins</div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <h4 className="font-semibold">Possible Venues</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-gray-400">Group Stage Venues:</div>
                  <div className="font-medium">MetLife Stadium</div>
                  <div className="font-medium">SoFi Stadium</div>
                  <div className="font-medium">AT&T Stadium</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

      {/* All Groups Overview */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">All Groups Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groupArray.map((group) => (
            <div
              key={group.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Flag className="w-4 h-4 text-yellow-500" />
                Group {group.id}
              </h4>
              <div className="space-y-2">
                {group.teams.map((team, index) => (
                  <div
                    key={team.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{team.flag}</span>
                      <span
                        className={
                          index === 0
                            ? "text-green-400 font-medium"
                            : index === 1
                              ? "text-green-300"
                              : index === 2
                                ? "text-yellow-400"
                                : "text-red-400"
                        }
                      >
                        {team.name}
                      </span>
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
  );
}
