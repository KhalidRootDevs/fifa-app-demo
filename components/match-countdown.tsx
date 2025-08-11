"use client"

import { useState, useEffect } from "react"

interface MatchCountdownProps {
  date: string
  time: string
}

export function MatchCountdown({ date, time }: MatchCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Parse the date and time
    const [year, month, day] = date.split("-").map(Number)
    const [hours, minutes] = time.split(":").map(Number)

    const targetDate = new Date(year, month - 1, day, hours, minutes)

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [date, time])

  return (
    <div className="flex flex-col items-center">
      <div className="text-sm text-gray-400 mb-2">Match starts in</div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="bg-white/10 text-white px-2 py-1 rounded-md text-sm font-mono">{timeLeft.days}</div>
          <div className="text-xs text-gray-400 mt-1">days</div>
        </div>
        <div className="text-gray-500">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white/10 text-white px-2 py-1 rounded-md text-sm font-mono">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-400 mt-1">hrs</div>
        </div>
        <div className="text-gray-500">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white/10 text-white px-2 py-1 rounded-md text-sm font-mono">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-400 mt-1">min</div>
        </div>
        <div className="text-gray-500">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-white/10 text-white px-2 py-1 rounded-md text-sm font-mono">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-xs text-gray-400 mt-1">sec</div>
        </div>
      </div>
    </div>
  )
}
