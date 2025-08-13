"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, MapPin } from "lucide-react";

export function WorldCupCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-06-11T00:00:00Z").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Tournament info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <Badge
                variant="secondary"
                className="bg-red-100 text-red-800 text-xs"
              >
                FIFA WORLD CUP 2026
              </Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold fifa-gradient-text mb-1">
              The Greatest Show on Earth
            </h2>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              USA • Canada • Mexico
            </p>
          </div>

          {/* Center - Countdown */}
          <div className="flex gap-3">
            <div className="text-center">
              <div className="bg-white/5 rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold text-white">
                  {timeLeft.days}
                </div>
                <div className="text-xs text-gray-400">Days</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/5 rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold text-white">
                  {timeLeft.hours}
                </div>
                <div className="text-xs text-gray-400">Hours</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/5 rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold text-white">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs text-gray-400">Min</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/5 rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold text-white">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs text-gray-400">Sec</div>
              </div>
            </div>
          </div>

          {/* Right side - Quick stats */}
          <div className="flex gap-4 text-center">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">48</div>
                <div className="text-xs text-gray-400">Teams</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">104</div>
                <div className="text-xs text-gray-400">Matches</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
