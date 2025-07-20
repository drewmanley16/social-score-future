import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Users, 
  Heart, 
  Share2, 
  Crown, 
  Zap, 
  Target, 
  BarChart3,
  Calendar,
  Star,
  ArrowRight,
  Lock,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/payment/PaymentModal";

export const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PRO'>('PRO');

  // Mock user data - in real app, this would come from Firestore
  const userProfile = {
    name: user?.displayName || "User",
    email: user?.email || "",
    joinDate: "2024-01-15",
    analysisCount: 3,
    lastAnalysis: "2024-01-20"
  };

  // Mock analysis results
  const analysisResults = {
    overallScore: 78,
    metrics: {
      engagement: 82,
      consistency: 75,
      authenticity: 85,
      reach: 70
    },
    insights: [
      "Your engagement rate is 15% above average for your follower count",
      "Posting consistently 3-4 times per week shows strong commitment",
      "Your content authenticity score is excellent - keep being genuine!",
      "Consider posting during peak hours (6-9 PM) to increase reach"
    ],
    recommendations: [
      "Use more trending hashtags in your niche",
      "Engage with followers within 1 hour of posting",
      "Try posting carousel content for higher engagement",
      "Collaborate with micro-influencers in your space"
    ]
  };

  // Mock premium features
  const premiumFeatures = [
    {
      title: "Advanced Analytics",
      description: "Deep dive into audience demographics, engagement patterns, and growth trends",
      icon: BarChart3,
      included: false
    },
    {
      title: "AI Content Suggestions",
      description: "Get personalized content ideas and hashtag recommendations",
      icon: Target,
      included: false
    },
    {
      title: "Competitor Analysis",
      description: "Compare your performance with top creators in your niche",
      icon: Users,
      included: false
    },
    {
      title: "Growth Predictions",
      description: "AI-powered forecasts of your follower growth and engagement",
      icon: TrendingUp,
      included: false
    },
    {
      title: "Priority Support",
      description: "Get faster responses and dedicated account management",
      icon: Crown,
      included: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleUpgrade = (plan: 'BASIC' | 'PRO') => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  if (!user) {
    navigate("/");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userProfile.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your latest analysis and insights to help you grow your influence.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <p className="text-2xl font-bold text-primary">{analysisResults.overallScore}</p>
                  </div>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Analyses Run</p>
                    <p className="text-2xl font-bold text-primary">{userProfile.analysisCount}</p>
                  </div>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="text-2xl font-bold text-primary">15 days</p>
                  </div>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-glass-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Account Status</p>
                    <p className="text-2xl font-bold text-primary">Free</p>
                  </div>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Analysis Results */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Metrics */}
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(analysisResults.metrics).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{key}</span>
                        <span className="font-semibold">{value}%</span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Premium Upgrade Sidebar */}
            <div className="space-y-6">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Upgrade to Pro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">$19.99</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  
                  <div className="space-y-3">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <feature.icon className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{feature.title}</p>
                          <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full btn-gradient"
                    onClick={() => handleUpgrade('PRO')}
                  >
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/analyze")}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Run New Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Leaderboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Set Goals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={selectedPlan}
      />
    </>
  );
};

export default Dashboard; 