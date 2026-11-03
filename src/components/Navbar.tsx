import React from 'react';
import { Shield, Sparkles, BookOpen, HelpCircle, LayoutGrid, List } from 'lucide-react';
import { VISAGES } from '../data/visagesData';

interface NavbarProps {
  activeTab: 'visages' | 'types' | 'rolls' | 'guide';
  setActiveTab: (tab: 'visages' | 'types' | 'rolls' | 'guide') => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
}) => {
  const rathalosImg = VISAGES.find(v => v.id === 'rathalos')?.base64_img || 'https://img.gamewith.jp/img/e649449a958552684ab6d95ef6a1f7a0.png';

  return (
    <header className="sticky top-0 z-40 bg-[#0c0f16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('visages')}>
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
                <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/15 text-amber-300 rounded border border-amber-500/30 font-mono">VISAGE GUIDE</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-1.5 tracking-tight">
                Visages, Types, Perks &amp; Monster Hunts
              </h1>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-medium w-full md:w-auto justify-center overflow-x-auto">
          <button
            onClick={() => setActiveTab('visages')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'visages'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Monsters (39)</span>
          </button>

          <button
            onClick={() => setActiveTab('types')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'types'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Ink Types &amp; Perks (11)</span>
          </button>

          <button
            onClick={() => setActiveTab('rolls')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'rolls'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sub-Stat Rolls</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Cost &amp; Hunting Guide</span>
          </button>
        </nav>

        {/* View mode toggle (Grid vs Table) when on visages tab */}
        <div className="hidden lg:flex items-center gap-2">
          {activeTab === 'visages' && (
            <div className="flex items-center bg-slate-900/90 rounded-lg border border-slate-800 p-0.5 text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md flex items-center gap-1 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-slate-800 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-[11px] font-medium pr-1">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md flex items-center gap-1 transition-all ${
                  viewMode === 'table'
                    ? 'bg-slate-800 text-amber-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Compact Table View"
              >
                <List className="w-4 h-4" />
                <span className="text-[11px] font-medium pr-1">Table</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
