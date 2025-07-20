import { useState } from "react";
import { Upload, Camera, Instagram, MessageCircle, Heart, Share2, TrendingUp, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export const Analyze = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    platform: "instagram",
    profileImage: null as File | null
  });
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock analysis results
  const analysisResults = {
    overallScore: 87,
    metrics: {
      appearance: 92,
      contentQuality: 85,
      authenticity: 89,
      brandFit: 84
    },
    insights: [
      "Your engagement rate is 15% above average for your follower count",
      "Content consistency shows strong posting patterns",
      "Audience demographic aligns well with fashion/lifestyle brands"
    ],
    premiumInsights: [
      "Optimal posting times based on your audience activity",
      "Hashtag strategy recommendations for 40% higher reach",
      "Brand collaboration opportunities worth $2,500+/month",
      "Content style analysis with specific improvement tips"
    ]
  };

  const handleAnalyze = async () => {
    if (!profileData.username) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    setIsAnalyzed(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData({ ...profileData, profileImage: file });
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center shadow-glow animate-pulse">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Analyzing Your Profile...</h2>
          <p className="text-muted-foreground">Our AI is processing your social media data</p>
          <div className="w-64 mx-auto">
            <Progress value={75} className="h-2" />
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzed) {
    return (
      <div className="min-h-screen pt-16 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Profile Header */}
          <Card className="glass-card border-glass-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">@{profileData.username}</h1>
                  <p className="text-muted-foreground">Instagram Profile Analysis</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{analysisResults.overallScore}/100</div>
                  <p className="text-sm text-muted-foreground">Influencer Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(analysisResults.metrics).map(([key, value]) => (
              <Card key={key} className="glass-card border-glass-border">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${value}, 100`}
                        className="text-primary"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{value}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Free Insights */}
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Key Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResults.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Premium Insights (Locked) */}
          <Card className="glass-card border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80 backdrop-blur-sm z-10" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto gradient-primary rounded-full flex items-center justify-center shadow-glow">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Unlock Premium Insights</h3>
                <p className="text-muted-foreground max-w-md">
                  Get detailed growth strategies, optimal posting times, and personalized recommendations
                </p>
                <Link to="/pricing">
                  <Button className="btn-gradient">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </Link>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-accent" />
                <span>Premium Growth Strategy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResults.premiumInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{insight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sticky CTA */}
          <div className="fixed bottom-4 left-4 right-4 z-50 md:relative md:bottom-auto md:left-auto md:right-auto">
            <Card className="glass-card border-glass-border shadow-glass">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Want the full analysis?</h3>
                    <p className="text-sm text-muted-foreground">Unlock all insights for just $9.99/month</p>
                  </div>
                  <Link to="/pricing">
                    <Button className="btn-gradient">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold">
            Analyze Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload your profile and get instant AI-powered insights into your influencer potential
          </p>
        </div>

        <Card className="glass-card border-glass-border shadow-glass">
          <CardContent className="p-8 space-y-6">
            {/* Platform Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Platform</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Instagram', icon: Instagram, value: 'instagram' },
                  { name: 'TikTok', icon: MessageCircle, value: 'tiktok' },
                  { name: 'YouTube', icon: Camera, value: 'youtube' }
                ].map((platform) => (
                  <button
                    key={platform.value}
                    onClick={() => setProfileData({ ...profileData, platform: platform.value })}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      profileData.platform === platform.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-glass-border hover:border-primary/50'
                    }`}
                  >
                    <platform.icon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username or Profile URL</label>
              <Input
                placeholder="Enter your @username or profile URL"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                className="glass-card border-glass-border"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile Image (Optional)</label>
              <div className="border-2 border-dashed border-glass-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop your profile image
                  </p>
                </label>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={!profileData.username}
              className="w-full btn-gradient text-lg py-6"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Analyze My Profile
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Free analysis includes basic scoring and insights.</p>
              <Link to="/pricing" className="text-primary hover:underline">
                Upgrade for detailed recommendations →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analyze;