import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BannerAdCard2({
  app,
}: {
  app: {
    id: number;
    name: string;
    image?: string;
    description: string;
    rating: number;
    downloads: string;
    platforms: string[];
    gradient: string;
  };
}) {
  return (
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
              <Badge variant="outline" className="text-xs text-white">
                Ad
              </Badge>
            </div>
            <p className="text-gray-300 text-sm mb-3">{app.description}</p>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-white">
                  {app.rating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">{app.downloads}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {app.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-xs">
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
  );
}
