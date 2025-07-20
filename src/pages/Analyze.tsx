import { useState } from "react";
import { Upload, Camera, Instagram, MessageCircle, Heart, Share2, TrendingUp, Lock, Crown, Star, Zap, Clock } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen py-8">
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
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 text-sm font-medium text-primary mb-6">
            <TrendingUp className="h-4 w-4" />
            <span>AI-Powered Analysis</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Analyze Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant AI-powered insights into your influencer potential. Discover your score, 
            receive personalized growth strategies, and unlock your path to success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-glass-border shadow-glass">
              <CardContent className="p-8 space-y-8">
                {/* Platform Selection */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <label className="text-lg font-semibold">Select Your Platform</label>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'Instagram', icon: Instagram, value: 'instagram', description: 'Photo & video sharing' },
                      { name: 'TikTok', icon: MessageCircle, value: 'tiktok', description: 'Short-form videos' },
                      { name: 'YouTube', icon: Camera, value: 'youtube', description: 'Long-form content' }
                    ].map((platform) => (
                      <button
                        key={platform.value}
                        onClick={() => setProfileData({ ...profileData, platform: platform.value })}
                        className={`p-6 rounded-xl border transition-all duration-300 text-center ${
                          profileData.platform === platform.value
                            ? 'border-primary bg-primary/10 text-primary shadow-glow'
                            : 'border-glass-border hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        <platform.icon className="h-8 w-8 mx-auto mb-3" />
                        <div className="font-semibold text-base">{platform.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{platform.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Username Input */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <label className="text-lg font-semibold">Your Profile</label>
                  </div>
                  <Input
                    placeholder="Enter your @username or profile URL"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    className="glass-card border-glass-border h-14 text-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Example: @username or https://instagram.com/username
                  </p>
                </div>

                {/* Profile Image Upload */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <label className="text-lg font-semibold">Profile Image (Optional)</label>
                  </div>
                  <div className="border-2 border-dashed border-glass-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer space-y-4">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">Upload your profile image</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Click to upload or drag and drop your profile image
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!profileData.username}
                  className="w-full btn-gradient text-xl py-8 text-lg font-semibold"
                >
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Analyze My Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            {/* What You'll Get */}
            <Card className="glass-card border-glass-border shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>What You'll Get</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Influencer Score</p>
                    <p className="text-sm text-muted-foreground">0-100 rating of your potential</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Content Analysis</p>
                    <p className="text-sm text-muted-foreground">Style, quality, and engagement insights</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Growth Opportunities</p>
                    <p className="text-sm text-muted-foreground">Identify areas for improvement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Audience Insights</p>
                    <p className="text-sm text-muted-foreground">Understand your follower demographics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="glass-card border-glass-border shadow-glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-semibold">Enter Your Profile</p>
                    <p className="text-sm text-muted-foreground">Provide your username or profile URL</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-semibold">AI Analysis</p>
                    <p className="text-sm text-muted-foreground">Our AI analyzes your content and engagement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-semibold">Get Results</p>
                    <p className="text-sm text-muted-foreground">Receive your score and personalized insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade CTA */}
            <Card className="glass-card border-glass-border shadow-glass bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-6 text-center space-y-4">
                <Crown className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Unlock Premium Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed growth strategies, optimal posting times, and personalized recommendations
                </p>
                <Link to="/pricing">
                  <Button className="btn-gradient w-full">
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background" />
                ))}
              </div>
              <span>10,000+ profiles analyzed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Results in 30 seconds</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Free analysis includes basic scoring and insights. 
            <Link to="/pricing" className="text-primary hover:underline ml-1">
              Upgrade for detailed recommendations →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analyze;