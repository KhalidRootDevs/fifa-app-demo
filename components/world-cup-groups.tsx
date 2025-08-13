"use client";

import { useState } from "react";
import { Trophy, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorldCupGroups() {
  const [selectedGroup, setSelectedGroup] = useState("A");

  const groups = {
    A: [
      {
        team: "Brazil",
        flag: "🇧🇷",
        points: 9,
        played: 3,
        won: 3,
        drawn: 0,
        lost: 0,
        gf: 8,
        ga: 2,
      },
      {
        team: "Switzerland",
        flag: "🇨🇭",
        points: 6,
        played: 3,
        won: 2,
        drawn: 0,
        lost: 1,
        gf: 4,
        ga: 3,
      },
      {
        team: "Cameroon",
        flag: "🇨🇲",
        points: 3,
        played: 3,
        won: 1,
        drawn: 0,
        lost: 2,
        gf: 3,
        ga: 5,
      },
      {
        team: "Serbia",
        flag: "🇷🇸",
        points: 0,
        played: 3,
        won: 0,
        drawn: 0,
        lost: 3,
        gf: 2,
        ga: 7,
      },
    ],
    B: [
      {
        team: "England",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        points: 7,
        played: 3,
        won: 2,
        drawn: 1,
        lost: 0,
        gf: 6,
        ga: 2,
      },
      {
        team: "USA",
        flag: "🇺🇸",
        points: 5,
        played: 3,
        won: 1,
        drawn: 2,
        lost: 0,
        gf: 4,
        ga: 3,
      },
      {
        team: "Iran",
        flag: "🇮🇷",
        points: 3,
        played: 3,
        won: 1,
        drawn: 0,
        lost: 2,
        gf: 3,
        ga: 5,
      },
      {
        team: "Wales",
        flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
        points: 1,
        played: 3,
        won: 0,
        drawn: 1,
        lost: 2,
        gf: 2,
        ga: 5,
      },
    ],
    C: [
      {
        team: "Argentina",
        flag: "🇦🇷",
        points: 6,
        played: 3,
        won: 2,
        drawn: 0,
        lost: 1,
        gf: 5,
        ga: 2,
      },
      {
        team: "Poland",
        flag: "🇵🇱",
        points: 4,
        played: 3,
        won: 1,
        drawn: 1,
        lost: 1,
        gf: 3,
        ga: 3,
      },
      {
        team: "Mexico",
        flag: "🇲🇽",
        points: 4,
        played: 3,
        won: 1,
        drawn: 1,
        lost: 1,
        gf: 2,
        ga: 3,
      },
      {
        team: "Saudi Arabia",
        flag: "🇸🇦",
        points: 3,
        played: 3,
        won: 1,
        drawn: 0,
        lost: 2,
        gf: 3,
        ga: 5,
      },
    ],
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          World Cup Groups
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users className="w-4 h-4" />
          <span>48 Teams • 16 Groups</span>
        </div>
      </div>

      {/* Group Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {Object.keys(groups).map((group) => (
          <Button
            key={group}
            variant={selectedGroup === group ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedGroup(group)}
            className={`min-w-[60px] ${
              selectedGroup === group
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Group {group}
          </Button>
        ))}
      </div>

      {/* Group Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">
                Team
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                P
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                W
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                D
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                L
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                GF
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                GA
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-gray-400">
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {groups[selectedGroup as keyof typeof groups].map((team, index) => (
              <tr
                key={team.team}
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                  index < 2
                    ? "bg-green-500/10"
                    : index === 2
                    ? "bg-yellow-500/10"
                    : ""
                }`}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{team.flag}</span>
                    <span className="text-white font-medium">{team.team}</span>
                    {index < 2 && (
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        Qualified
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-center py-3 px-2 text-gray-300">
                  {team.played}
                </td>
                <td className="text-center py-3 px-2 text-gray-300">
                  {team.won}
                </td>
                <td className="text-center py-3 px-2 text-gray-300">
                  {team.drawn}
                </td>
                <td className="text-center py-3 px-2 text-gray-300">
                  {team.lost}
                </td>
                <td className="text-center py-3 px-2 text-gray-300">
                  {team.gf}
                </td>
                <td className="text-center py-3 px-2 text-gray-300">
                  {team.ga}
                </td>
                <td className="text-center py-3 px-2 text-white font-bold">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500/20 rounded"></div>
            <span>Qualified for Round of 16</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500/20 rounded"></div>
            <span>Possible qualification</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>Updated 2 hours ago</span>
        </div>
      </div>
    </div>
  );
}
