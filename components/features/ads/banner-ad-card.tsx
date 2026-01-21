import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Download, ExternalLink } from "lucide-react";

export default function BannerAdCard({
  app,
}: {
  app: {
    id: number;
    name: string;
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
      className="border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white font-bold text-sm`}
          >
            {app.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-semibold text-white text-sm truncate">
                  {app.name}
                </h3>
                <p className="text-gray-400 text-xs truncate">
                  {app.description}
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                Ad
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-medium text-white">
                    {app.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-gray-300">{app.downloads}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {app.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-xs text-gray-400 bg-white/5 px-1.5 py-0.5 rounded"
                  >
                    {platform}
                  </span>
                ))}
                <Button
                  size="sm"
                  className="h-7 px-2 text-xs bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
