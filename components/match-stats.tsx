"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MatchStatsProps {
  stats?: {
    possession: number[]
    shots: number[]
    shotsOnTarget: number[]
    corners: number[]
    fouls: number[]
    yellowCards: number[]
    redCards: number[]
    offsides?: number[]
    saves?: number[]
  }
  homeTeam: string
  awayTeam: string
}

export function MatchStats({ stats, homeTeam, awayTeam }: MatchStatsProps) {
  // Default stats if none provided
  const defaultStats = {
    possession: [50, 50],
    shots: [0, 0],
    shotsOnTarget: [0, 0],
    corners: [0, 0],
    fouls: [0, 0],
    yellowCards: [0, 0],
    redCards: [0, 0],
    offsides: [0, 0],
    saves: [0, 0],
  }

  const matchStats = stats || defaultStats

  const StatRow = ({ label, homeValue, awayValue }: { label: string; homeValue: number; awayValue: number }) => {
    const total = homeValue + awayValue
    const homePercentage = total === 0 ? 50 : (homeValue / total) * 100
    const awayPercentage = total === 0 ? 50 : (awayValue / total) * 100

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{homeValue}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
          <span className="text-sm font-medium">{awayValue}</span>
        </div>
        <div className="flex h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="bg-red-500 transition-all duration-1000 ease-out" style={{ width: `${homePercentage}%` }} />
          <div className="bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${awayPercentage}%` }} />
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Match Statistics</CardTitle>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{homeTeam}</span>
          <span>{awayTeam}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <StatRow
          label="Ball Possession (%)"
          homeValue={matchStats.possession[0]}
          awayValue={matchStats.possession[1]}
        />
        <StatRow label="Total Shots" homeValue={matchStats.shots[0]} awayValue={matchStats.shots[1]} />
        <StatRow
          label="Shots on Target"
          homeValue={matchStats.shotsOnTarget[0]}
          awayValue={matchStats.shotsOnTarget[1]}
        />
        <StatRow label="Corner Kicks" homeValue={matchStats.corners[0]} awayValue={matchStats.corners[1]} />
        <StatRow label="Fouls" homeValue={matchStats.fouls[0]} awayValue={matchStats.fouls[1]} />
        <StatRow label="Yellow Cards" homeValue={matchStats.yellowCards[0]} awayValue={matchStats.yellowCards[1]} />
        <StatRow label="Red Cards" homeValue={matchStats.redCards[0]} awayValue={matchStats.redCards[1]} />
        {matchStats.offsides && (
          <StatRow label="Offsides" homeValue={matchStats.offsides[0]} awayValue={matchStats.offsides[1]} />
        )}
        {matchStats.saves && <StatRow label="Saves" homeValue={matchStats.saves[0]} awayValue={matchStats.saves[1]} />}
      </CardContent>
    </Card>
  )
}
