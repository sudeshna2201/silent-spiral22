import React, { useState } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import api from '../api';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reflection, setReflection] = useState(null);

  const charCount = entry.length;

  const handleSubmit = async () => {
    if (!entry.trim() || entry.length < 10) return;
    
    setLoading(true);
    try {
      const response = await api.post('/journal', { text: entry });
      setSuccess(true);
      
      // Smart reflection prompt feature
      const data = response.data;
      if (data.primary_emotion === 'stress' || data.primary_emotion === 'fear' || data.primary_emotion === 'anger') {
        setReflection("You seem to be carrying some tension today. What is one small thing you can do right now to care for yourself?");
      } else if (data.primary_emotion === 'joy' || data.primary_emotion === 'surprise') {
        setReflection("Your energy seems uplifting today. What brought you this sense of lightness?");
      } else {
        setReflection("Thank you for sharing. Consistency is the key to clarity.");
      }
      
      setEntry('');
      
    } catch (error) {
      console.error("Failed to save entry:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setReflection(null);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-light tracking-tight mb-4">Daily Reflection.</h1>
        <p className="text-brand-200/70 text-lg font-light">What's occupying your mind today? Write without judgment.</p>
      </header>

      {success ? (
        <div className="glass-card p-12 text-center animate-in zoom-in-95 duration-500">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
          <h2 className="text-2xl font-light mb-4 text-brand-50">Entry Saved Successfully</h2>
          
          {reflection && (
            <div className="mt-8 p-6 bg-brand-900/40 rounded-2xl border border-brand-500/20 text-left relative overflow-hidden">
              <Sparkles className="absolute top-4 right-4 w-5 h-5 text-amber-300 opacity-50" />
              <h3 className="text-sm font-medium tracking-wide text-brand-300 mb-2 uppercase">Reflection Prompt</h3>
              <p className="text-lg font-light text-brand-100 leading-relaxed italic border-l-2 border-brand-400 pl-4 py-2">
                "{reflection}"
              </p>
            </div>
          )}
          
          <button 
            onClick={resetForm}
            className="mt-10 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-brand-50"
          >
            Write Another Entry
          </button>
        </div>
      ) : (
        <div className="glass-card p-2 md:p-8 relative overflow-hidden group transition-all duration-700 focus-within:ring-1 focus-within:ring-brand-400/50">
          
          <div className="absolute inset-0 bg-brand-400/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-2xl"></div>

          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="I'm feeling..."
            className="w-full h-80 bg-transparent border-none focus:ring-0 text-xl font-light resize-none placeholder-brand-200/30 text-brand-50 p-6 leading-relaxed bg-transparent focus:outline-none"
            spellCheck="false"
          />

          <div className="flex items-center justify-between p-4 border-t border-brand-400/10 mt-4">
            <span className="text-sm text-brand-300/40 font-mono tracking-wider">
              {charCount} / 1000
            </span>
            <button
              onClick={handleSubmit}
              disabled={loading || charCount < 10}
              className={`flex items-center px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg ${
                loading || charCount < 10 
                  ? 'bg-white/5 text-brand-300/30 cursor-not-allowed' 
                  : 'bg-brand-600/80 hover:bg-brand-500 hover:shadow-brand-500/25 text-white active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center">Saving<span className="animate-pulse ml-1">...</span></span>
              ) : (
                <span className="flex items-center">Reflect <Send className="ml-2 w-4 h-4" /></span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
