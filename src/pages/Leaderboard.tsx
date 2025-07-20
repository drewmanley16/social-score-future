import { useState } from "react";
import { Trophy, TrendingUp, Filter, Search, Instagram, Youtube, Camera, Crown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

export const Leaderboard = () => {
  const [filters, setFilters] = useState({
    platform: "all",
    category: "all",
    location: "all",
    search: ""
  });

  // Mock leaderboard data
  const influencers = [
    {
      id: 1,
      name: "Sarah Chen",
      handle: "@sarahstyle",
      score: 98,
      platform: "instagram",
      category: "Fashion",
      location: "Los Angeles",
      followers: "2.4M",
      engagement: "8.2%",
      tier: "elite",
      growth: "+12%"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      handle: "@fitnessmarcus",
      score: 96,
      platform: "youtube",
      category: "Fitness",
      location: "Miami",
      followers: "890K",
      engagement: "9.1%",
      tier: "pro",
      growth: "+18%"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      handle: "@foodieemma",
      score: 94,
      platform: "instagram",
      category: "Food",
      location: "New York",
      followers: "1.2M",
      engagement: "7.8%",
      tier: "pro",
      growth: "+9%"
    },
    {
      id: 4,
      name: "Alex Kim",
      handle: "@techtalksalex",
      score: 92,
      platform: "youtube",
      category: "Technology",
      location: "San Francisco",
      followers: "567K",
      engagement: "6.9%",
      tier: "pro",
      growth: "+15%"
    },
    {
      id: 5,
      name: "Maya Patel",
      handle: "@wandermaya",
      score: 90,
      platform: "instagram",
      category: "Travel",
      location: "London",
      followers: "834K",
      engagement: "8.7%",
      tier: "basic",
      growth: "+7%"
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      case 'tiktok': return Camera;
      default: return Instagram;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'elite':
        return <div className="inline-flex items-center space-x-1 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 text-xs font-medium text-accent">
          <Crown className="h-3 w-3" />
          <span>Elite</span>
        </div>;
      case 'pro':
        return <div className="inline-flex items-center space-x-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-xs font-medium text-primary">
          <Star className="h-3 w-3" />
          <span>Pro</span>
        </div>;
      default:
        return <div className="inline-flex items-center space-x-1 bg-muted rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
          <span>Basic</span>
        </div>;
    }
  };

  const filteredInfluencers = influencers.filter(influencer => {
    return (
      (filters.platform === "all" || influencer.platform === filters.platform) &&
      (filters.category === "all" || influencer.category === filters.category) &&
      (filters.location === "all" || influencer.location === filters.location) &&
      (filters.search === "" || 
       influencer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
       influencer.handle.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm font-medium text-accent">
            <Trophy className="h-4 w-4" />
            <span>Top Performers</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">
            Influencer <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the highest-rated potential influencers across platforms and categories
          </p>
        </div>

        {/* Filters */}
        <Card className="glass-card border-glass-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search influencers..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 glass-card border-glass-border"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Select
                  value={filters.platform}
                  onValueChange={(value) => setFilters({ ...filters, platform: value })}
                >
                  <SelectTrigger className="w-40 glass-card border-glass-border">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger className="w-40 glass-card border-glass-border">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filters.location}
                  onValueChange={(value) => setFilters({ ...filters, location: value })}
                >
                  <SelectTrigger className="w-40 glass-card border-glass-border">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Miami">Miami</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="London">London</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <div className="space-y-4">
          {filteredInfluencers.map((influencer, index) => {
            const PlatformIcon = getPlatformIcon(influencer.platform);
            const isTopThree = index < 3;
            
            return (
              <Card 
                key={influencer.id} 
                className={`glass-card border-glass-border hover:shadow-glass transition-all duration-300 ${
                  isTopThree ? 'ring-2 ring-primary/20' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    {/* Rank */}
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' :
                        index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-black' :
                        index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Profile */}
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <PlatformIcon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{influencer.name}</h3>
                        <p className="text-muted-foreground">{influencer.handle}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{influencer.category}</span>
                          <span>•</span>
                          <span>{influencer.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-lg font-semibold">{influencer.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">{influencer.engagement}</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-success">{influencer.growth}</div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                      </div>
                    </div>

                    {/* Score and Tier */}
                    <div className="text-right space-y-2">
                      <div className="text-3xl font-bold text-primary">{influencer.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                      {getTierBadge(influencer.tier)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="glass-card border-glass-border mt-12">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <TrendingUp className="h-12 w-12 mx-auto text-primary" />
              <h2 className="text-2xl font-bold">Want to See Yourself Here?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Start your AI analysis today and discover your influencer potential
              </p>
              <Link to="/analyze">
                <Button className="btn-gradient">
                  Start Your AI Analysis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;