import { useState } from "react";
import { X, CreditCard, CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { stripePromise, SUBSCRIPTION_PLANS, isStripeConfigured } from "@/lib/stripe";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'BASIC' | 'PRO';
}

export const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const { toast } = useToast();
  
  const selectedPlan = SUBSCRIPTION_PLANS[plan];

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!isStripeConfigured()) {
      toast({
        title: "Configuration Error",
        description: "Stripe is not properly configured. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Create checkout session using our backend
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          userId: user.uid,
          email: user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="w-full max-w-md mx-4 glass-card border-glass-border">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2 p-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-500" />
            Upgrade to {selectedPlan.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Details */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">
              ${selectedPlan.price}
            </div>
            <div className="text-sm text-muted-foreground">
              per {selectedPlan.period}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold">What's included:</h4>
            {selectedPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full btn-gradient"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pay ${selectedPlan.price}
              </div>
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Secure payment powered by Stripe
            </p>
            <p className="text-xs text-muted-foreground">
              Cancel anytime • No setup fees
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 