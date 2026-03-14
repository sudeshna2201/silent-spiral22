import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { Activity } from 'lucide-react';
import api from '../api';

export default function Trends() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await api.get('/trends');
        setTrends(response.data);
      } catch (error) {
        console.error("Failed to fetch trends:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrends();
  }, []);

  const formatDate = (tickItem) => {
    if (!tickItem) return '';
    const date = new Date(tickItem);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-950/90 border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-brand-200 text-sm mb-3 font-medium border-b border-white/10 pb-2">{formatDate(label)}</p>
          <div className="space-y-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-6 text-sm">
                <span className="flex items-center capitalize" style={{ color: entry.color }}>
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
                  {entry.name}
                </span>
                <span className="font-mono bg-white/5 px-2 py-0.5 rounded text-white font-medium">
                  {(entry.value * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12 h-content">
      <header className="mb-12 border-b border-brand-400/10 pb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="w-8 h-8 text-rose-400" />
          <h1 className="text-4xl font-light tracking-tight">Mood Trends.</h1>
        </div>
        <p className="text-brand-200/70 text-lg font-light leading-relaxed max-w-2xl">
          Watch the ebb and flow of your emotions. 
          Understanding these rhythms can help ground your perspective.
        </p>
      </header>

      <div className="glass-card p-6 md:p-8 h-[600px] flex flex-col">
        <h3 className="text-xl font-light mb-8 text-brand-100 flex items-center">
           Emotional Fluctuation Over Time
        </h3>
        
        <div className="flex-1 w-full min-h-0">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <Activity className="w-10 h-10 text-brand-400/50 mb-4 animate-bounce" />
                <span className="text-brand-300/60 font-light tracking-wide">Drawing your emotional landscape...</span>
              </div>
            </div>
          ) : trends.length < 2 ? (
            <div className="w-full h-full flex items-center justify-center text-brand-300/40 font-light border border-dashed border-white/10 rounded-2xl">
              <div className="text-center p-6">
                 We need at least two entries on different days to draw your trends curve. <br/>Keep journaling.
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate} 
                  stroke="#ffffff40" 
                  tick={{ fill: '#ffffff60', fontSize: 12, fontWeight: 300 }}
                  dy={10}
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  tick={{ fill: '#ffffff60', fontSize: 12, fontWeight: 300 }}
                  tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }} 
                  iconType="circle"
                />
                
                {/* Lines for different emotions. Colors are carefully chosen to be calm yet distinct. */}
                <Line type="monotone" dataKey="happy" stroke="#34d399" strokeWidth={3} dot={{ r: 4, fill: '#34d399', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#ffffff' }} />
                <Line type="monotone" dataKey="sad" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#ffffff' }} />
                <Line type="monotone" dataKey="anxious" stroke="#fbbf24" strokeWidth={3} dot={{ r: 4, fill: '#fbbf24', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#ffffff' }} />
                <Line type="monotone" dataKey="stressed" stroke="#f87171" strokeWidth={3} dot={{ r: 4, fill: '#f87171', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#ffffff' }} />
                <Line type="monotone" dataKey="calm" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#ffffff' }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
