import { Link } from "react-router-dom";
import { Zap, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 gradient-primary rounded-lg shadow-glow">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                InfluenceIQ
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              AI-powered influencer analysis to unlock your social media potential and grow your audience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <div className="space-y-2">
              <Link to="/analyze" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Profile Analysis
              </Link>
              <Link to="/leaderboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Leaderboard
              </Link>
              <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                API Access
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Careers
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest insights and tips for growing your influence.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="glass-card border-glass-border"
              />
              <Button size="sm" className="btn-gradient whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            © 2024 InfluenceIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};