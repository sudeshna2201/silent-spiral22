import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, ArrowRight, Lightbulb } from 'lucide-react';
import api from '../api';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [trends, setTrends] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entriesRes, trendsRes, insightsRes] = await Promise.all([
          api.get('/journals?limit=3'),
          api.get('/trends'),
          api.get('/insights')
        ]);
        setEntries(entriesRes.data);
        setTrends(trendsRes.data);
        setInsights(insightsRes.data.insights || []);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="mb-10">
        <h1 className="text-4xl font-light tracking-tight mb-2">Welcome Back.</h1>
        <p className="text-brand-200/70 text-lg font-light">Take a deep breath. Here is a reflection of your recent journey.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Action & Insights */}
        <div className="space-y-8 lg:col-span-1">
          <div className="glass-card p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <PenTool className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-light mb-4">How are you feeling today?</h2>
            <p className="text-brand-200/70 mb-8 font-light leading-relaxed">Spend 5 minutes reflecting on your day to keep your mental state in sync.</p>
            <Link 
              to="/journal" 
              className="inline-flex items-center justify-center w-full py-4 text-white bg-brand-600/80 hover:bg-brand-500 rounded-xl transition-all font-medium tracking-wide shadow-lg hover:shadow-brand-500/25"
            >
              Write Entry <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Lightbulb className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-lg font-medium">Daily Insight</h3>
            </div>
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-1/2"></div>
              </div>
            ) : (
              <p className="text-brand-100 font-light leading-relaxed">
                {insights.length > 0 ? insights[0] : "Start journaling to generate insights about your emotional patterns."}
              </p>
            )}
          </div>
        </div>

        {/* Recent Entries & Chart */}
        <div className="space-y-8 lg:col-span-2">
          
          <div className="glass-card p-8">
            <h3 className="text-xl font-light mb-6 flex justify-between items-center">
              <span>Mood Pulse</span>
              <Link to="/trends" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">View full →</Link>
            </h3>
            
            <div className="h-48 w-full mt-4">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center text-brand-300/50 font-light">Loading chart data...</div>
              ) : trends.length < 2 ? (
                <div className="w-full h-full flex items-center justify-center text-brand-300/50 font-light text-center border border-dashed border-white/10 rounded-xl">
                  Not enough data.<br/>Write a few entries to see your mood pulse.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trends}>
                    <defs>
                      <linearGradient id="colorJoy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="happy" stroke="#34d399" fillOpacity={1} fill="url(#colorJoy)" />
                    {/* Simplified to just show Joy as "Mood Pulse" on dashboard */}
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-light mb-6 flex justify-between items-center">
              <span>Recent Reflections</span>
              <Link to="/journal" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">See all →</Link>
            </h3>
            
            <div className="space-y-4">
              {loading ? (
                [1,2,3].map(i => (
                  <div key={i} className="animate-pulse flex space-x-4 p-4 rounded-2xl bg-white/5">
                    <div className="h-10 w-10 bg-white/10 rounded-full"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-white/10 rounded w-3/4"></div>
                      <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    </div>
                  </div>
                ))
              ) : entries.length === 0 ? (
                <p className="text-brand-300/50 font-light py-4">No entries yet. Your journey begins today.</p>
              ) : (
                entries.map(entry => (
                  <div key={entry.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="shrink-0 pt-1">
                      <span className="text-xs tracking-wider text-brand-300/60 uppercase font-medium">
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-brand-50 font-light line-clamp-2 leading-relaxed">{entry.text}</p>
                      {entry.primary_emotion && (
                         <span className="mt-3 inline-block px-3 py-1 bg-brand-900/50 border border-brand-500/20 rounded-full text-xs text-brand-200 capitalize tracking-wide">
                            {entry.primary_emotion}
                         </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
