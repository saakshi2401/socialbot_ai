import { Link } from 'react-router-dom';
import { Bot, Sparkles, MessageSquare, Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-textMain flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl w-full mx-auto">
        <div className="flex items-center space-x-2">
          <Bot className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">SocialBot AI</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-textMuted hover:text-white transition-colors">Login</Link>
          <Link to="/signup" className="bg-primary hover:bg-purple-600 text-white px-5 py-2 rounded-full font-medium transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-20">
        <div className="inline-flex items-center space-x-2 bg-surfaceLight px-4 py-2 rounded-full mb-8 border border-surface border-opacity-50">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">The #1 AI Social Media Manager</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Grow Your Social Media <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            With AI
          </span>
        </h1>
        
        <p className="text-xl text-textMuted mb-10 max-w-2xl">
          Generate viral captions, engaging replies, and trending hashtags for Instagram, LinkedIn, Twitter/X, and more in seconds.
        </p>

        <Link to="/signup" className="bg-primary hover:bg-purple-600 text-white text-lg px-8 py-4 rounded-full font-bold transition-transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-primary/20">
          <span>Start Generating for Free</span>
          <Zap className="w-5 h-5" />
        </Link>
      </main>

      {/* Features Preview */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 mt-20 mb-20">
        {[
          { title: "Cross-Platform", desc: "Optimized for IG, LinkedIn, X, Facebook & YouTube." },
          { title: "Custom Tones", desc: "Professional, Funny, Gen Z, Luxury - you name it." },
          { title: "Instant Ideas", desc: "Never run out of content with our Trending Ideas tool." }
        ].map((feature, i) => (
          <div key={i} className="bg-surface p-8 rounded-2xl border border-surfaceLight hover:border-primary transition-colors group">
            <div className="bg-surfaceLight w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-textMuted">{feature.desc}</p>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <footer className="border-t border-surface py-8 text-center text-textMuted">
        <p>&copy; 2026 SocialBot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
