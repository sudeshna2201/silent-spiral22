import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, ArrowRight, Sparkles, HeartPulse, ShieldCheck } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden text-brand-50" style={{ background: 'var(--color-brand-1000)' }}>
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="z-10 text-center max-w-3xl px-6">
        <div className="flex justify-center mb-8">
          <div className="glass-card p-4 rounded-full inline-block animate-pulse-slow border border-brand-400/30">
            <BrainCircuit className="w-12 h-12 text-brand-300" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6 leading-tight">
          Understand your <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-300">emotional patterns</span> over time.
        </h1>
        
        <p className="text-xl md:text-2xl text-brand-200/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          Silent Spiral is a personal mental-state awareness companion. Not therapy, just reflection.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            to="/dashboard" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium tracking-wide text-white bg-brand-600/80 border border-brand-400/50 rounded-full overflow-hidden transition-all hover:bg-brand-500 hover:scale-105 shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            <span className="relative z-10 flex items-center">
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-6 z-10">
        <div className="glass-card p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500">
          <Sparkles className="w-8 h-8 mx-auto text-brand-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">AI-Powered Insights</h3>
          <p className="text-brand-300/70 font-light">NLP detects subtle mood shifts in your writing automatically.</p>
        </div>
        <div className="glass-card p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500">
          <HeartPulse className="w-8 h-8 mx-auto text-rose-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">Pattern Detection</h3>
          <p className="text-brand-300/70 font-light">Visualize weekly trends and identify recurring stress triggers.</p>
        </div>
        <div className="glass-card p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-500">
          <ShieldCheck className="w-8 h-8 mx-auto text-emerald-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">100% Private</h3>
          <p className="text-brand-300/70 font-light">Your data remains on your local database. No sharing, no selling.</p>
        </div>
      </div>
    </div>
  );
}
