"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ExternalLink, Smartphone, Monitor, Tablet } from "lucide-react";

export function SmallAds() {
  const streamingApps = [
    {
      id: 1,
      name: "FIFA Mobile Stream",
      platform: "Mobile",
      rating: 4.7,
      icon: Smartphone,
      color: "text-blue-500",
    },
    {
      id: 2,
      name: "World Cup Web TV",
      platform: "Web",
      rating: 4.5,
      icon: Monitor,
      color: "text-green-500",
    },
    {
      id: 3,
      name: "FIFA Tablet HD",
      platform: "Tablet",
      rating: 4.6,
      icon: Tablet,
      color: "text-purple-500",
    },
  ];

  return (
    <Card className="glass-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">
            FIFA Streaming Apps
          </CardTitle>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 text-xs"
          >
            Sponsored
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {streamingApps.map((app) => {
          const IconComponent = app.icon;
          return (
            <div
              key={app.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <IconComponent className={`w-5 h-5 ${app.color}`} />
                <div>
                  <div className="font-medium text-white text-sm">
                    {app.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-gray-400">{app.rating}</span>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2 bg-transparent"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          );
        })}

        <Button
          variant="outline"
          className="w-full mt-4 bg-transparent"
          size="sm"
        >
          View All FIFA Apps
        </Button>
      </CardContent>
    </Card>
  );
}
