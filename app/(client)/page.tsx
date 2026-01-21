import { WorldCupCountdown } from "@/components/world-cup-countdown";
import { FeaturedMatches } from "@/components/features/matches/featured-matches";
import { MatchList } from "@/components/features/matches/match-list";
import { WorldCupGroups } from "@/components/world-cup-groups";
import { WorldCupSidebar } from "@/components/world-cup-sidebar";
import { SmallAds } from "@/components/small-ads";
import BannerAds from "@/components/features/ads/banner-ads";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* World Cup Countdown - Compact */}
      <div className="mb-8">
        <WorldCupCountdown />
      </div>

      {/* Banner Ads */}
      <div className="space-y-8 mb-">
        <BannerAds />

        {/* Featured Matches */}
        <FeaturedMatches />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-3">
        {/* Left Content - 3 columns */}
        <div className="lg:col-span-3 ">
          {/* Match List - New Section */}
          <MatchList />

          {/* World Cup Groups */}
          <WorldCupGroups />
        </div>

        {/* Right Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Small Ads */}
          <SmallAds />

          {/* World Cup Sidebar */}
          <WorldCupSidebar />
        </div>
      </div>
    </div>
  );
}
