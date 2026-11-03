import React, { useState } from 'react';
import { VISAGES } from './data/visagesData';
import { KioskFlow } from './components/KioskFlow';
import { CostGuide } from './components/CostGuide';
import { RollFinder } from './components/RollFinder';
import { VisageModal } from './components/VisageModal';
import { Visage } from './data/visagesData';
import { Shield, BookOpen, HelpCircle, Sparkles, Navigation } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'kiosk' | 'rolls' | 'guide'>('kiosk');
  const [modalVisage, setModalVisage] = useState<Visage | null>(null);

  const rathalosImg = VISAGES.find(v => v.id === 'rathalos')?.base64_img || 'https://img.gamewith.jp/img/e649449a958552684ab6d95ef6a1f7a0.png';

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Top Kiosk Header */}
      <header className="sticky top-0 z-40 bg-[#0c0f16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setActiveTab('kiosk')}
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-500/60 bg-gradient-to-br from-amber-500/20 to-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <img 
                src={rathalosImg} 
                alt="Monster Hunter Outlanders" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[11px] tracking-widest text-amber-400 font-bold uppercase">Monster Hunter Outlanders</span>
                <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 rounded border border-amber-500/40 font-mono">STEP KIOSK</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                Visage Hunting &amp; Perk Kiosk
              </h1>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <nav className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('kiosk')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'kiosk'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Step Kiosk</span>
            </button>

            <button
              onClick={() => setActiveTab('rolls')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'rolls'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sub-Stat Rolls</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === 'guide'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Cost &amp; Perks Guide</span>
            </button>
          </nav>

        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 lg:px-8 py-6">
        
        {/* TAB 1: STEP KIOSK FLOW */}
        {activeTab === 'kiosk' && (
          <KioskFlow />
        )}

        {/* TAB 2: SUB-STAT ROLLS */}
        {activeTab === 'rolls' && (
          <RollFinder onOpenModal={(v) => setModalVisage(v)} />
        )}

        {/* TAB 3: COST & PERKS GUIDE */}
        {activeTab === 'guide' && (
          <CostGuide />
        )}

      </main>

      {/* Visage Modal if opened from RollFinder */}
      <VisageModal
        visage={modalVisage}
        onClose={() => setModalVisage(null)}
        onSelectVisage={(v) => setModalVisage(v)}
      />

      {/* Kiosk Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#0c0f16] py-5 px-4 text-xs text-slate-500 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-amber-400">Monster Hunter Outlanders</span>
            <span>• Visage Hunting Kiosk</span>
          </div>
          <div>
            Step 1: Choose Ink Type • Step 2: Choose Monster • Step 3: View Hunt Perks &amp; Cost
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
