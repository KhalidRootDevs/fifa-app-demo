"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Thermometer,
  Eye,
  Calendar,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Match {
  id: string;
  homeTeam: {
    name: string;
    flag: string;
    ranking: number;
  };
  awayTeam: {
    name: string;
    flag: string;
    ranking: number;
  };
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  phase: string;
  group?: string;
  status: "live" | "upcoming" | "completed";
  score?: {
    home: number;
    away: number;
  };
  viewers?: number;
  attendance?: number;
  temperature?: number;
  stats?: {
    possession: { home: number; away: number };
    shots: { home: number; away: number };
    corners: { home: number; away: number };
    fouls: { home: number; away: number };
    yellowCards: { home: number; away: number };
    redCards: { home: number; away: number };
  };
}

interface MatchCardProps {
  match: Match;
}

const phaseColors = {
  group: "bg-gradient-to-r from-blue-600 to-blue-500",
  round16: "bg-gradient-to-r from-green-600 to-green-500",
  quarter: "bg-gradient-to-r from-amber-600 to-amber-500",
  semi: "bg-gradient-to-r from-orange-600 to-orange-500",
  final: "bg-gradient-to-r from-red-600 to-red-500",
};

const phaseNames = {
  group: "Group Stage",
  round16: "Round of 16",
  quarter: "Quarter Final",
  semi: "Semi Final",
  final: "Final",
};

export function MatchCard({ match }: MatchCardProps) {
  const [showStats, setShowStats] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "live":
        return {
          color: "bg-gradient-to-r from-red-500 to-red-400",
          text: "LIVE",
          dot: "animate-pulse bg-white",
        };
      case "upcoming":
        return {
          color: "bg-gradient-to-r from-blue-500 to-blue-400",
          text: "UPCOMING",
          dot: "bg-blue-200",
        };
      case "completed":
        return {
          color: "bg-gradient-to-r from-green-500 to-green-400",
          text: "FINAL",
          dot: "bg-green-200",
        };
      default:
        return {
          color: "bg-gray-500",
          text: status.toUpperCase(),
          dot: "bg-gray-200",
        };
    }
  };

  const statusConfig = getStatusConfig(match.status);

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="cursor-pointer border-gray-700 bg-gray-900/50 hover:bg-gray-900 transition-all duration-200">
        <CardContent className="p-4">
          {/* Header - Compact */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge
                className={`${phaseColors[match.phase as keyof typeof phaseColors]} text-white px-2 py-0.5 text-xs font-semibold border-0`}
              >
                {phaseNames[match.phase as keyof typeof phaseNames]}
              </Badge>
              {match.group && (
                <Badge
                  variant="outline"
                  className="border-amber-500 text-amber-400 text-xs px-2 py-0.5"
                >
                  Group {match.group}
                </Badge>
              )}
            </div>
            <Badge
              className={`${statusConfig.color} text-white px-2 py-0.5 text-xs font-bold border-0 flex items-center gap-1`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
              {statusConfig.text}
            </Badge>
          </div>

          {/* Teams & Score - Compact */}
          <div className="flex items-center justify-between mb-4">
            {/* Home Team */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-800">
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    {match.homeTeam.flag}
                  </div>
                </div>
                <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] px-1 py-0 min-w-0 h-4">
                  #{match.homeTeam.ranking}
                </Badge>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate text-white">
                  {match.homeTeam.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Star className="w-3 h-3 text-yellow-400" />#
                  {match.homeTeam.ranking}
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="px-4">
              {match.score ? (
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${match.status === "live" ? "text-red-400" : "text-white"}`}
                  >
                    {match.score.home} - {match.score.away}
                  </div>
                  {match.status === "live" && (
                    <div className="text-[10px] text-red-400 font-bold">
                      LIVE
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-md font-medium text-gray-400">VS</div>
                  <div className="text-xs text-gray-500">{match.time}</div>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 flex-1 flex-row-reverse">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-800">
                  <div className="w-full h-full flex items-center justify-center text-xl">
                    {match.awayTeam.flag}
                  </div>
                </div>
                <Badge className="absolute -top-1 -left-1 bg-yellow-500 text-black text-[10px] px-1 py-0 min-w-0 h-4">
                  #{match.awayTeam.ranking}
                </Badge>
              </div>
              <div className="min-w-0 text-right">
                <h3 className="font-semibold text-sm truncate text-white">
                  {match.awayTeam.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-400 justify-end">
                  <Star className="w-3 h-3 text-yellow-400" />#
                  {match.awayTeam.ranking}
                </div>
              </div>
            </div>
          </div>

          {/* Match Info - Compact Grid */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
            <div className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{match.venue}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-sm">📍</span>
              <span className="truncate">{match.city}</span>
            </div>
          </div>

          {/* Additional Info - Compact */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-xs">
              {match.viewers && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye className="w-3 h-3" />
                  <span>{(match.viewers / 1000000).toFixed(1)}M</span>
                </div>
              )}
              {match.attendance && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>{(match.attendance / 1000).toFixed(1)}k</span>
                </div>
              )}
              {match.temperature && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Thermometer className="w-3 h-3" />
                  <span>{match.temperature}°C</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              <Trophy className="w-3 h-3" />
              <span>WC 2026</span>
            </div>
          </div>

          {/* Stats - Compact */}
          {match.stats && (
            <motion.div
              initial={false}
              animate={{
                height: showStats ? "auto" : 0,
                opacity: showStats ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-4 gap-3 pt-3 border-t border-gray-700 text-xs">
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Possession</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs">
                      {match.stats.possession.home}%
                    </span>
                    <div className="w-12 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                        style={{ width: `${match.stats.possession.home}%` }}
                      />
                    </div>
                    <span className="text-xs">
                      {match.stats.possession.away}%
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Shots</div>
                  <div className="font-medium">
                    {match.stats.shots.home} - {match.stats.shots.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Corners</div>
                  <div className="font-medium">
                    {match.stats.corners.home} - {match.stats.corners.away}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Cards</div>
                  <div className="flex items-center justify-center gap-0.5">
                    <span className="text-yellow-400 text-xs">
                      {match.stats.yellowCards.home}
                    </span>
                    <span className="text-red-400 text-xs">
                      {match.stats.redCards.home}
                    </span>
                    <span className="text-gray-400 mx-0.5">-</span>
                    <span className="text-yellow-400 text-xs">
                      {match.stats.yellowCards.away}
                    </span>
                    <span className="text-red-400 text-xs">
                      {match.stats.redCards.away}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions - Compact */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <div className="flex gap-2">
              {match.stats && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowStats(!showStats)}
                  className="h-7 px-2 text-xs hover:bg-gray-800 text-white"
                >
                  {showStats ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Hide Stats
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />
                      Show Stats
                    </>
                  )}
                </Button>
              )}
            </div>
            <Link href={`/match/${match.id}`}>
              <Button
                size="sm"
                className={`h-7 px-3 text-xs font-semibold ${
                  match.status === "live"
                    ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                    : match.status === "upcoming"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                      : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                }`}
              >
                {match.status === "live"
                  ? "Watch Live"
                  : match.status === "upcoming"
                    ? "Preview"
                    : "Highlights"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
