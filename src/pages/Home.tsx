import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Users, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-dashboard.jpg";
import influencersImage from "@/assets/influencers-group.jpg";

export const Home = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "AI Scoring",
      description: "Get your influencer potential score with our advanced AI analysis of your social media presence."
    },
    {
      icon: Users,
      title: "Profile Makeover Tips",
      description: "Receive personalized recommendations to optimize your content and increase engagement."
    },
    {
      icon: Zap,
      title: "Growth Strategy Plan",
      description: "Access custom growth strategies tailored to your niche and audience."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      handle: "@sarahstyle",
      score: 94,
      text: "InfluenceIQ helped me grow from 10K to 100K followers in just 6 months!",
      category: "Fashion"
    },
    {
      name: "Marcus Johnson",
      handle: "@fitnessmarcus",
      score: 91,
      text: "The AI insights completely transformed my content strategy. Game changer!",
      category: "Fitness"
    },
    {
      name: "Emma Rodriguez",
      handle: "@foodieemma",
      score: 89,
      text: "Best investment for my influencer journey. The tips are incredibly actionable.",
      category: "Food"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
                  <Star className="h-4 w-4" />
                  <span>AI-Powered Analysis</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Want to Be an{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Influencer?
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl text-muted-foreground">
                  Find Out If You Have What It Takes
                </h2>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Get AI-powered insights into your social media potential. Discover your influencer score, 
                  receive personalized growth strategies, and unlock your path to success.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/analyze">
                  <Button size="lg" className="btn-gradient text-lg px-8 py-4 group">
                    Analyze My Profile Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-background" />
                    ))}
                  </div>
                  <span>10,000+ creators analyzed</span>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative glass-card rounded-2xl p-8 shadow-glass">
                <img 
                  src={heroImage} 
                  alt="AI Dashboard Preview" 
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Influencer Score</span>
                      <span className="text-2xl font-bold text-primary">94/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full w-[94%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Unlock Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Influence</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform analyzes your social media presence and provides actionable insights 
              to help you become a successful influencer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass-card border-glass-border hover:shadow-glass transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Success <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See how creators like you have transformed their social media presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-glass-border hover:shadow-glass transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent" />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{testimonial.score}</div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  </div>
                  <p className="text-sm italic">"{testimonial.text}"</p>
                  <div className="inline-flex items-center space-x-1 bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary">
                    <span>{testimonial.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-2xl p-8 lg:p-12 shadow-glass">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Ready to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Level Up?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get full access to AI-powered insights, personalized growth strategies, and advanced analytics.
              </p>
              <div className="flex items-center justify-center space-x-2 text-2xl font-bold">
                <span className="text-muted-foreground line-through">$19.99</span>
                <span className="text-primary">$9.99</span>
                <span className="text-lg text-muted-foreground">/month</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/pricing">
                  <Button size="lg" className="btn-gradient text-lg px-8 py-4 group">
                    Get Full Access
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/analyze">
                  <Button variant="outline" size="lg" className="btn-secondary text-lg px-8 py-4">
                    Try Free Analysis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;