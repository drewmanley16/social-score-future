import { Check, Crown, Zap, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PaymentModal } from "@/components/payment/PaymentModal";

export const Pricing = () => {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'BASIC' | 'PRO' | 'ELITE' | null>(null);

  const handlePlanSelect = (planName: string) => {
    if (!user) {
      // Show login prompt
      alert("Please log in to purchase a plan. You can use the login button in the navigation.");
      return;
    }
    
    // Map plan names to PaymentModal plan types
    const planMap: { [key: string]: 'BASIC' | 'PRO' | 'ELITE' } = {
      'Pro': 'PRO',
      'Elite': 'ELITE',
      'Free': 'BASIC'
    };
    
    const planType = planMap[planName];
    if (!planType) {
      alert("Invalid plan selected");
      return;
    }
    
    setSelectedPlan(planType);
    setShowPaymentModal(true);
  };

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for getting started",
      icon: Zap,
      features: [
        "Basic influencer score",
        "Platform analysis",
        "Basic insights",
        "Community access"
      ],
      limitations: [
        "Limited to 1 analysis per month",
        "No growth strategies",
        "No competitor analysis"
      ],
      cta: "Get Started",
      variant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: 9.99,
      originalPrice: 19.99,
      description: "Most popular for serious creators",
      icon: Star,
      features: [
        "Everything in Free",
        "Unlimited profile analyses",
        "Advanced AI insights",
        "Growth strategy recommendations",
        "Optimal posting times",
        "Hashtag optimization",
        "Content style analysis",
        "Monthly progress reports",
        "Priority support"
      ],
      cta: "Upgrade to Pro",
      variant: "default" as const,
      popular: true,
      stripePriceId: "price_1RmqmNI75fIf2Qr4u8mxVukD"
    },
    {
      name: "Elite",
      price: 19.99,
      originalPrice: 39.99,
      description: "For professional influencers",
      icon: Crown,
      features: [
        "Everything in Pro",
        "Competitor analysis",
        "Brand collaboration finder",
        "Revenue optimization tips",
        "Personal account manager",
        "Custom growth plan",
        "Advanced analytics dashboard",
        "API access",
        "White-label reports"
      ],
      cta: "Go Elite",
      variant: "default" as const,
      popular: false,
      stripePriceId: "price_1RmqmNI75fIf2Qr4u8mxVukD"
    }
  ];

  const faqs = [
    {
      question: "How does the AI analysis work?",
      answer: "Our AI analyzes your content quality, engagement patterns, audience demographics, and posting consistency to provide actionable insights for growth."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
    },
    {
      question: "What platforms do you support?",
      answer: "We currently support Instagram, TikTok, and YouTube, with more platforms coming soon."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day money-back guarantee if you're not satisfied with your subscription."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>50% Launch Discount</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold">
            Choose Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Plan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI analysis features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <Card 
                key={plan.name} 
                className={`glass-card border-glass-border relative overflow-hidden transition-all duration-300 hover:shadow-glass ${
                  plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center shadow-glow mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-primary">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground">/month</span>
                      )}
                    </div>
                    {plan.originalPrice && (
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        Save 50%
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-gradient' : 'btn-secondary'}`}
                    variant={plan.variant}
                    onClick={() => handlePlanSelect(plan.name)}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground">What's included:</h4>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations && (
                      <>
                        <h4 className="font-semibold text-sm text-muted-foreground mt-4">Limitations:</h4>
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                            </div>
                            <span className="text-sm text-muted-foreground/75">{limitation}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Annual Discount */}
        <Card className="glass-card border-glass-border mb-16">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Save Even More with Annual Plans</h2>
              <p className="text-muted-foreground">
                Get 2 months free when you choose annual billing
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Pro Annual</div>
                  <div className="text-muted-foreground">$99/year</div>
                  <div className="text-sm text-success">Save $20</div>
                  <Button 
                    className="mt-2 btn-gradient"
                    onClick={() => handlePlanSelect('Pro')}
                  >
                    Get Pro Annual
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">Elite Annual</div>
                  <div className="text-muted-foreground">$199/year</div>
                  <div className="text-sm text-success">Save $40</div>
                  <Button 
                    className="mt-2 btn-gradient"
                    onClick={() => handlePlanSelect('Elite')}
                  >
                    Get Elite Annual
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card border-glass-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <Card className="glass-card border-glass-border mt-16">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Ready to Boost Your Influence?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Join thousands of creators who have transformed their social media presence
              </p>
              <Button 
                size="lg" 
                className="btn-gradient text-lg px-8 py-4"
                onClick={() => handlePlanSelect('Free')}
              >
                Start Your Free Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          plan={selectedPlan}
        />
      )}
    </div>
  );
};

export default Pricing;