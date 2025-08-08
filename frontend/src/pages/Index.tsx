import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Zap, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-5 h-5 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-primary"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
            </div>
            <h1 className="text-xl font-bold">Connexxion Agent</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild style={{ background: 'var(--gradient-primary)' }}>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <div className="w-10 h-10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-10 h-10 text-primary"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Create AI Chatbots in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build intelligent chatbots from your documents and websites. No coding required.
            Deploy anywhere with our embeddable widget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild style={{ background: 'var(--gradient-primary)' }}>
              <Link to="/register">
                Start Building Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to make chatbot creation simple and effective.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Lightning Fast Setup</CardTitle>
              <CardDescription>
                Create and deploy your chatbot in minutes. Upload PDFs or connect websites for instant training.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Smart Conversations</CardTitle>
              <CardDescription>
                AI-powered responses that understand context and provide helpful, accurate information to your users.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-0" style={{ boxShadow: 'var(--shadow-soft)' }}>
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with reliable uptime. Your data is protected and your chatbot is always available.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <div className="w-3 h-3 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3 text-primary"
                >
                  <path d="M12 8V4H8" />
                  <rect width="16" height="12" x="4" y="8" rx="2" />
                  <path d="M2 14h2" />
                  <path d="M20 14h2" />
                  <path d="M15 13v2" />
                  <path d="M9 13v2" />
                </svg>
              </div>
            </div>
            <span className="text-sm font-medium">Connexxion Agent</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Connexxion Agent. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
