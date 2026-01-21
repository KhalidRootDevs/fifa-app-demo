import React from "react";
import BannerAdCard from "./banner-ad-card";

export default function BannerAds() {
  const featuredApps = [
    {
      id: 1,
      name: "FIFA Stream Pro",
      description: "4K FIFA matches with multi-camera angles",
      rating: 4.8,
      downloads: "2M+",
      platforms: ["iOS", "Android", "Web"],
      gradient: "from-red-600 to-blue-600",
    },
    {
      id: 2,
      name: "World Cup Live TV",
      description: "Free HD streaming with expert commentary",
      rating: 4.6,
      downloads: "1.5M+",
      platforms: ["iOS", "Android", "TV"],
      gradient: "from-green-600 to-yellow-600",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          FIFA Streaming Apps
        </h2>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
          Sponsored
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {featuredApps.map((app) => (
          <BannerAdCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
