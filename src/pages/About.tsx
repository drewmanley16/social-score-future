import { Brain, Shield, Users, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  const values = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "We use cutting-edge machine learning algorithms to analyze engagement rates, content style, and audience alignment to provide actionable recommendations."
    },
    {
      icon: Shield,
      title: "Privacy & Ethics",
      description: "Your data privacy is our priority. We only analyze public profile information and never store personal data or access private content."
    },
    {
      icon: Users,
      title: "Creator-Focused",
      description: "Built by creators, for creators. We understand the challenges of growing an authentic audience in today's competitive social media landscape."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Our algorithms are constantly learning and improving based on real creator success stories and industry best practices."
    }
  ];

  const stats = [
    { label: "Creators Analyzed", value: "50K+" },
    { label: "Average Score Improvement", value: "23%" },
    { label: "Success Rate", value: "89%" },
    { label: "Platforms Supported", value: "3+" }
  ];

  return (
    <div className="min-h-screen pt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-3xl lg:text-5xl font-bold">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">InfluenceIQ</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to democratize influencer success by providing AI-powered insights 
            that help creators understand their potential and grow their authentic audience.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-glass-border text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <Card className="glass-card border-glass-border mb-20">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              In today's creator economy, success shouldn't be left to chance. We believe every creator 
              deserves access to the same insights and strategies that top influencers use to grow their 
              audience. Our AI-powered platform levels the playing field by providing personalized, 
              actionable recommendations that help creators build authentic communities and achieve 
              sustainable growth.
            </p>
          </CardContent>
        </Card>

        {/* How We Work */}
        <div className="space-y-12 mb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">How Our AI Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We analyze millions of data points to understand what makes content resonate with audiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card border-glass-border hover:shadow-glass transition-all duration-300 group">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-xl transition-all duration-300">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ethics & Privacy */}
        <Card className="glass-card border-glass-border mb-20">
          <CardContent className="p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Ethics & Privacy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Data Privacy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• We only analyze publicly available profile information</li>
                    <li>• No personal data is stored on our servers</li>
                    <li>• All analysis is performed anonymously</li>
                    <li>• GDPR and CCPA compliant</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">Ethical AI</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Bias-free algorithmic recommendations</li>
                    <li>• Transparent scoring methodology</li>
                    <li>• Focus on authentic growth strategies</li>
                    <li>• Regular algorithm audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="glass-card border-glass-border">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Ready to Discover Your Potential?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Join thousands of creators who trust InfluenceIQ to guide their growth journey
              </p>
              <Button size="lg" className="btn-gradient text-lg px-8 py-4 group">
                Start Your Analysis
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;