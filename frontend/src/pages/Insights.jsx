import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles, Brain } from 'lucide-react';
import api from '../api';

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get('/insights');
        setInsights(response.data.insights || []);
      } catch (error) {
        console.error("Failed to fetch insights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <header className="mb-12 border-b border-brand-400/10 pb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-8 h-8 text-amber-300" />
          <h1 className="text-4xl font-light tracking-tight">AI Insights.</h1>
        </div>
        <p className="text-brand-200/70 text-lg font-light leading-relaxed max-w-2xl">
          We gently analyze your words over time to uncover patterns you might have missed. 
          Remember, these are just reflections, not definitions.
        </p>
      </header>

      {loading ? (
        <div className="grid gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-white/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : insights.length === 0 ? (
        <div className="glass-card p-12 text-center flex flex-col items-center justify-center">
          <Brain className="w-16 h-16 text-brand-300/30 mb-6" />
          <h2 className="text-2xl font-light mb-2">Not enough data</h2>
          <p className="text-brand-300/60 font-light max-w-md mx-auto">
            Silent Spiral needs a few more journal entries to start recognizing patterns in your emotional landscape.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {insights.map((insight, idx) => (
            <div 
              key={idx} 
              className="glass-card p-8 group hover:border-brand-400/30 transition-all duration-500 relative overflow-hidden"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-400 to-indigo-600 opacity-50"></div>
              <Sparkles className="w-6 h-6 text-brand-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <p className="text-xl font-light text-brand-50 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
