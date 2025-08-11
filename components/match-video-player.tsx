"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Users,
} from "lucide-react";

interface MatchVideoPlayerProps {
  match: {
    title: string;
    isLive: boolean;
    homeTeam: { name: string; score: number };
    awayTeam: { name: string; score: number };
    minute: number;
    viewers: string;
    stadium: string;
  };
}

export function MatchVideoPlayer({ match }: MatchVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <Card className="glass-card border-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
          {/* Video placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium">FIFA World Cup 2026</p>
              <p className="text-gray-300 text-sm">{match.title}</p>
            </div>
          </div>

          {/* Live overlay */}
          {match.isLive && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                LIVE
              </Badge>
            </div>
          )}

          {/* Score overlay */}
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="text-white text-sm font-medium">
              {match.homeTeam.name} {match.homeTeam.score} -{" "}
              {match.awayTeam.score} {match.awayTeam.name}
            </div>
            {match.isLive && (
              <div className="text-red-400 text-xs text-center">
                {match.minute}'
              </div>
            )}
          </div>

          {/* Viewer count */}
          <div className="absolute bottom-20 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
            <div className="flex items-center gap-1 text-white text-sm">
              <Users className="w-4 h-4" />
              {match.viewers} watching
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <div className="text-white text-sm">{match.stadium}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
