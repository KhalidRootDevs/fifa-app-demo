"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchVideoPlayer } from "@/components/match-video-player";
import { MatchStats } from "@/components/match-stats";
import {
  Play,
  Users,
  MapPin,
  Clock,
  Thermometer,
  User,
  Star,
  Trophy,
  Flag,
} from "lucide-react";
import { worldCupMatches } from "@/lib/database/worldCupMatches";

interface MatchDetailsProps {
  matchId: string;
}

// FIFA World Cup 2026 match data
const getWorldCupMatchById = (id: string) => {
  return worldCupMatches.find((match) => match.id === id) || worldCupMatches[0];
};

export function MatchDetails({ matchId }: MatchDetailsProps) {
  const match = getWorldCupMatchById(matchId);

  if (!match) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Match not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <Card className="glass-card border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 p-1">
          <div className="bg-gray-900 rounded-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800"
                  >
                    {match.tournament}
                  </Badge>
                  <Badge variant="outline">{match.phase}</Badge>
                  {match.group && (
                    <Badge variant="outline">{match.group}</Badge>
                  )}
                </div>
                {match.isLive && (
                  <Badge className="bg-red-500 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                    LIVE
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                {/* Home Team */}
                <div className="text-center">
                  <div className="relative mb-3">
                    <img
                      src={match.homeTeam.flag || "/placeholder.svg"}
                      alt={match.homeTeam.name}
                      className="w-16 h-16 mx-auto rounded-full border-2 border-gray-200"
                    />
                    <Badge className="absolute -top-1 -right-1 text-xs bg-blue-600">
                      #{match.homeTeam.fifaRanking}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-white">
                    {match.homeTeam.name}
                  </h3>
                  <p className="text-sm text-gray-400">{match.homeTeam.code}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <User className="w-3 h-3" />
                    <span className="text-xs text-gray-400">
                      {match.homeTeam.coach}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2 text-white score-pulse">
                    {match.homeTeam.score} - {match.awayTeam.score}
                  </div>
                  <div className="text-sm text-gray-400">
                    {match.isLive ? `${match.minute}'` : match.time}
                  </div>
                  {match.isLive && (
                    <Button size="sm" className="mt-2 fifa-button">
                      <Play className="w-4 h-4 mr-1" />
                      Watch Live
                    </Button>
                  )}
                </div>

                {/* Away Team */}
                <div className="text-center">
                  <div className="relative mb-3">
                    <img
                      src={match.awayTeam.flag || "/placeholder.svg"}
                      alt={match.awayTeam.name}
                      className="w-16 h-16 mx-auto rounded-full border-2 border-gray-200"
                    />
                    <Badge className="absolute -top-1 -right-1 text-xs bg-blue-600">
                      #{match.awayTeam.fifaRanking}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-white">
                    {match.awayTeam.name}
                  </h3>
                  <p className="text-sm text-gray-400">{match.awayTeam.code}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <User className="w-3 h-3" />
                    <span className="text-xs text-gray-400">
                      {match.awayTeam.coach}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </div>
        </div>
      </Card>

      {/* Match Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <MapPin className="w-5 h-5 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-sm text-white">{match.stadium}</p>
            <p className="text-xs text-gray-400">
              {match.city}, {match.country}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <Clock className="w-5 h-5 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-sm text-white">{match.kickoff}</p>
            <p className="text-xs text-gray-400">{match.date}</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <Users className="w-5 h-5 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-sm text-white">{match.attendance}</p>
            <p className="text-xs text-gray-400">Attendance</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardContent className="p-4 text-center">
            <Thermometer className="w-5 h-5 mx-auto mb-2 text-gray-400" />
            <p className="font-medium text-sm text-white">
              {match.temperature}
            </p>
            <p className="text-xs text-gray-400">Temperature</p>
          </CardContent>
        </Card>
      </div>

      {/* Video Player */}
      <MatchVideoPlayer match={match} />

      {/* Match Details Tabs */}
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-card border-0">
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="lineup">Lineups</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="info">Match Info</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <MatchStats
            stats={match.stats}
            homeTeam={match.homeTeam.name}
            awayTeam={match.awayTeam.name}
          />
        </TabsContent>

        <TabsContent value="lineup" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <img
                    src={match.homeTeam.flag || "/placeholder.svg"}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  {match.homeTeam.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-1 text-white">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Key Players
                  </h4>
                  {match.keyPlayers.home.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Badge variant="outline" className="w-6 h-6 p-0 text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-white">{player}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <img
                    src={match.awayTeam.flag || "/placeholder.svg"}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  {match.awayTeam.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-1 text-white">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Key Players
                  </h4>
                  {match.keyPlayers.away.map((player, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Badge variant="outline" className="w-6 h-6 p-0 text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-white">{player}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-white">Match Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {match.isLive ? (
                  <>
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg">
                      <Badge className="bg-green-500">⚽</Badge>
                      <div>
                        <p className="font-medium text-sm text-white">
                          Goal! Vinícius Jr.
                        </p>
                        <p className="text-xs text-gray-400">
                          45' - {match.homeTeam.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/20 rounded-lg">
                      <Badge className="bg-yellow-500">🟨</Badge>
                      <div>
                        <p className="font-medium text-sm text-white">
                          Yellow Card - Ángel Di María
                        </p>
                        <p className="text-xs text-gray-400">
                          38' - {match.awayTeam.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg">
                      <Badge className="bg-green-500">⚽</Badge>
                      <div>
                        <p className="font-medium text-sm text-white">
                          Goal! Lionel Messi
                        </p>
                        <p className="text-xs text-gray-400">
                          23' - {match.awayTeam.name}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    Match events will appear here when the match starts
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="w-5 h-5" />
                  Tournament Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Tournament:</span>
                  <span className="text-sm font-medium text-white">
                    {match.tournament}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Phase:</span>
                  <span className="text-sm font-medium text-white">
                    {match.phase}
                  </span>
                </div>
                {match.group && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Group:</span>
                    <span className="text-sm font-medium text-white">
                      {match.group}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Viewers:</span>
                  <span className="text-sm font-medium text-white">
                    {match.viewers}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Flag className="w-5 h-5" />
                  Match Officials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Referee:</span>
                  <span className="text-sm font-medium text-white">
                    {match.referee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Stadium:</span>
                  <span className="text-sm font-medium text-white">
                    {match.stadium}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Location:</span>
                  <span className="text-sm font-medium text-white">
                    {match.city}, {match.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Capacity:</span>
                  <span className="text-sm font-medium text-white">
                    {match.attendance}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
