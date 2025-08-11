"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, ExternalLink } from "lucide-react";

export function BannerAds() {
  const featuredApps = [
    {
      id: 1,
      name: "FIFA Stream Pro",
      description:
        "Watch FIFA World Cup 2026 matches in 4K quality with multi-camera angles",
      rating: 4.8,
      downloads: "2M+",
      platforms: ["iOS", "Android", "Web"],
      image: "/placeholder.svg?height=80&width=80&text=FIFA+Pro",
      gradient: "from-red-600 to-blue-600",
      features: ["4K Streaming", "Multi-Camera", "Live Stats"],
    },
    {
      id: 2,
      name: "World Cup Live TV",
      description:
        "Free HD streaming of all FIFA 2026 matches with expert commentary",
      rating: 4.6,
      downloads: "1.5M+",
      platforms: ["iOS", "Android", "Smart TV"],
      image: "/placeholder.svg?height=80&width=80&text=WC+Live",
      gradient: "from-green-600 to-yellow-600",
      features: ["HD Quality", "Expert Commentary", "Match Highlights"],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Featured FIFA Streaming Apps
        </h2>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Sponsored
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredApps.map((app) => (
          <Card
            key={app.id}
            className="glass-card border-0 overflow-hidden hover-lift"
          >
            <div className={`h-2 bg-gradient-to-r ${app.gradient}`}></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={app.image || "/placeholder.svg"}
                  alt={app.name}
                  className="w-16 h-16 rounded-xl border-2 border-white/10"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white">{app.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      Ad
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    {app.description}
                  </p>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-white">
                        {app.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        {app.downloads}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {app.platforms.map((platform) => (
                        <Badge
                          key={platform}
                          variant="secondary"
                          className="text-xs"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <Button size="sm" className="fifa-button">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Watch Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
