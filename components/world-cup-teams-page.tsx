"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, X, Globe, Trophy, Users, Flag } from "lucide-react";
import { regions, worldCupTeams } from "@/lib/database/teams";

export function WorldCupTeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState("all");

  // Filter teams based on search query, region, and group
  const filteredTeams = worldCupTeams.filter((team) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      team.name.toLowerCase().includes(searchLower) ||
      team.coach.toLowerCase().includes(searchLower) ||
      team.keyPlayers.some((player) =>
        player.toLowerCase().includes(searchLower),
      );

    // Region filter
    const matchesRegion =
      selectedRegion === "all" ||
      team.region.toLowerCase().replace(/\s+/g, "-") === selectedRegion;

    // Group filter
    const matchesGroup =
      selectedGroup === "all" || team.group === selectedGroup;

    return matchesSearch && matchesRegion && matchesGroup;
  });

  const groups = ["all", "A", "B", "C", "D", "E", "F"];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search teams, coaches, players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-white/40"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Filter */}
          <div className="lg:w-48">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-white/40"
            >
              {regions.map((region) => (
                <option
                  key={region.id}
                  value={region.id}
                  className="bg-gray-800"
                >
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div className="lg:w-32">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-sm text-white focus:outline-none focus:border-white/40"
            >
              <option value="all" className="bg-gray-800">
                All Groups
              </option>
              {groups.slice(1).map((group) => (
                <option key={group} value={group} className="bg-gray-800">
                  Group {group}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeams.map((team) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <motion.div
                className="glass-card glass-card-hover rounded-xl overflow-hidden h-full"
                whileHover={{ y: -5 }}
              >
                {/* Team Header */}
                <div className="relative p-6 bg-gradient-to-br from-white/10 to-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                      <Image
                        src={team.flag || "/placeholder.svg"}
                        alt={team.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Group</div>
                      <div className="text-xl font-bold text-yellow-500">
                        {team.group}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{team.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Globe className="w-3 h-3" />
                    <span>{team.region}</span>
                  </div>
                </div>

                {/* Team Details */}
                <div className="p-6 pt-0">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">FIFA Ranking:</span>
                      <span className="font-medium">#{team.fifaRanking}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Coach:</span>
                      <span className="font-medium">{team.coach}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block mb-1">
                        Key Players:
                      </span>
                      <div className="text-xs space-y-1">
                        {team.keyPlayers.slice(0, 2).map((player, index) => (
                          <div key={index} className="text-white font-medium">
                            {player}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1 text-xs text-gray-300">
                        <Trophy className="w-3 h-3" />
                        <span>{team.worldCupHistory}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No teams found</h3>
          <p className="text-gray-400 mb-6">
            We couldn't find any teams matching your search criteria. Try
            adjusting your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("all");
              setSelectedGroup("all");
            }}
            className="gradient-bg text-white px-6 py-2 rounded-lg font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Tournament Stats */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Tournament Overview
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-1">48</div>
            <div className="text-sm text-gray-400">Total Teams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-1">6</div>
            <div className="text-sm text-gray-400">Confederations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">3</div>
            <div className="text-sm text-gray-400">Host Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-1">32</div>
            <div className="text-sm text-gray-400">Tournament Days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
