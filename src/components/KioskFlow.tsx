import React, { useState, useMemo } from 'react';
import { VISAGES, VISAGE_SETS, Visage, VisageSet } from '../data/visagesData';
import { 
  Flame, Snowflake, Zap, Droplets, Sparkles, Swords, Crosshair, 
  ShieldCheck, HeartHandshake, Disc3, Award, ArrowLeft, ArrowRight, 
  RotateCcw, Search, Check, Skull, HelpCircle, Layers, ChevronRight, Eye
} from 'lucide-react';

const SET_ICONS: Record<string, React.ReactNode> = {
  'Ink of Flames': <Flame className="w-6 h-6 text-orange-400" />,
  'Ink of Frost': <Snowflake className="w-6 h-6 text-cyan-400" />,
  'Ink of Thunder': <Zap className="w-6 h-6 text-yellow-400" />,
  'Ink of Water': <Droplets className="w-6 h-6 text-blue-400" />,
  'Ink of Dragon': <Sparkles className="w-6 h-6 text-purple-400" />,
  'Ink of Might': <Swords className="w-6 h-6 text-emerald-400" />,
  'Ink of Combat': <Crosshair className="w-6 h-6 text-rose-400" />,
  'Ink of Guidance': <Award className="w-6 h-6 text-amber-400" />,
  'Ink of Protection': <ShieldCheck className="w-6 h-6 text-teal-400" />,
  'Ink of Grace': <HeartHandshake className="w-6 h-6 text-pink-400" />,
  'Ink of Resonance': <Disc3 className="w-6 h-6 text-indigo-400" />,
};

export const KioskFlow: React.FC = () => {
  // Current Step: 1 = Choose Type, 2 = Choose Monster, 3 = Monster Dossier
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [selectedMonster, setSelectedMonster] = useState<Visage | null>(null);
  const [costFilter, setCostFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allSets = Object.values(VISAGE_SETS);

  // Monsters for Step 2
  const step2Monsters = useMemo(() => {
    let list = VISAGES;
    if (selectedSet && selectedSet !== 'all') {
      list = list.filter(v => v.sets.includes(selectedSet));
    }
    if (costFilter !== null) {
      list = list.filter(v => v.cost === costFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(v => 
        v.name.toLowerCase().includes(q) || 
        v.core_effect.toLowerCase().includes(q) ||
        v.potential_effects.some(p => p.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => b.cost - a.cost || a.name.localeCompare(b.name));
  }, [selectedSet, costFilter, searchQuery]);

  const activeSetData = selectedSet && selectedSet !== 'all' ? VISAGE_SETS[selectedSet] : null;

  // Actions
  const handleSelectSet = (setName: string) => {
    setSelectedSet(setName);
    setCostFilter(null);
    setSearchQuery('');
    setCurrentStep(2);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMonster = (monster: Visage) => {
    setSelectedMonster(monster);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setSelectedSet(null);
    setSelectedMonster(null);
    setCostFilter(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* KIOSK STEP PROGRESS BAR */}
      <div className="bg-[#121622]/95 backdrop-blur-md rounded-3xl border border-slate-800 p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Stepper Tabs */}
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto flex-1 max-w-2xl">
            
            {/* Step 1 Pill */}
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2.5 p-2.5 sm:px-4 rounded-2xl border transition-all text-left ${
                currentStep === 1
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                  : selectedSet
                  ? 'bg-slate-900/90 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                currentStep === 1 ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}>
                1
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">Step 1</div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  {selectedSet === 'all' ? 'All Monsters' : selectedSet || 'Choose Type'}
                </div>
              </div>
            </button>

            {/* Step 2 Pill */}
            <button
              onClick={() => {
                if (selectedSet) setCurrentStep(2);
              }}
              disabled={!selectedSet}
              className={`flex items-center gap-2.5 p-2.5 sm:px-4 rounded-2xl border transition-all text-left ${
                currentStep === 2
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                  : selectedMonster
                  ? 'bg-slate-900/90 text-amber-300 border-amber-500/40'
                  : selectedSet
                  ? 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
              }`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                currentStep === 2 ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}>
                2
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">Step 2</div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  {selectedMonster ? selectedMonster.name : 'Select Monster'}
                </div>
              </div>
            </button>

            {/* Step 3 Pill */}
            <button
              onClick={() => {
                if (selectedMonster) setCurrentStep(3);
              }}
              disabled={!selectedMonster}
              className={`flex items-center gap-2.5 p-2.5 sm:px-4 rounded-2xl border transition-all text-left ${
                currentStep === 3
                  ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                  : selectedMonster
                  ? 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 text-slate-600 border-slate-900 cursor-not-allowed'
              }`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                currentStep === 3 ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}>
                3
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">Step 3</div>
                <div className="text-xs sm:text-sm font-bold truncate">
                  Perks &amp; Cost
                </div>
              </div>
            </button>

          </div>

          {/* Start Over Button */}
          {(selectedSet || selectedMonster || currentStep > 1) && (
            <button
              onClick={handleStartOver}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 text-slate-300 hover:text-red-300 text-xs font-semibold transition-all shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Over</span>
            </button>
          )}

        </div>
      </div>

      {/* ========================================================
          STEP 1: CHOOSE INK TYPE / ELEMENT
          ======================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="bg-[#121622]/90 rounded-3xl border border-slate-800 p-6 sm:p-8 text-center space-y-2 shadow-xl">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              STEP 1 OF 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-cinzel">
              Select an Ink Type or Element
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Choose the element, damage type, or archetype you want to build. Tap any card below to see which monsters drop it.
            </p>
          </div>

          {/* Quick Option: Browse All Monsters */}
          <div className="flex justify-center">
            <button
              onClick={() => handleSelectSet('all')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-[#192235] border border-amber-500/40 hover:border-amber-400 text-slate-200 hover:text-white font-bold text-sm shadow-xl flex items-center gap-2 group transition-all"
            >
              <span>Or Browse All 39 Monsters directly</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Big Kiosk Cards for the 11 Inks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSets.map((set) => {
              const matchingCount = VISAGES.filter(v => v.sets.includes(set.name)).length;

              return (
                <div
                  key={set.slug}
                  onClick={() => handleSelectSet(set.name)}
                  className="group relative rounded-3xl p-5 bg-[#121622]/90 border border-slate-800 hover:border-amber-400/90 hover:bg-[#161c28] shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top row: Icon + Element + Monster count */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl border bg-slate-950/80 ${set.border} shadow-inner`}>
                          {SET_ICONS[set.name] || <Sparkles className="w-6 h-6 text-amber-400" />}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                            {set.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${set.tagBg}`}>
                            {set.element} • {set.archetype}
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-slate-300">
                        {matchingCount} monsters
                      </span>
                    </div>

                    {/* Perks Box */}
                    <div className="space-y-2 text-xs bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800/80">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          2-Piece Perk:
                        </span>
                        <span className="text-slate-200 leading-snug">{set.two_piece}</span>
                      </div>
                      <div className="pt-1.5 border-t border-slate-800/60">
                        <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                          4-Piece Perk:
                        </span>
                        <span className="text-amber-200 font-medium leading-snug">{set.four_piece}</span>
                      </div>
                    </div>
                  </div>

                  {/* Kiosk Tap CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                    <span>View Monsters to Hunt</span>
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================
          STEP 2: CHOOSE MONSTER TO HUNT
          ======================================================== */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Banner */}
          <div className="bg-[#121622]/90 rounded-3xl border border-slate-800 p-6 sm:p-7 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  STEP 2 OF 3
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-cinzel mt-2">
                  Choose a Monster to Hunt
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {selectedSet === 'all'
                    ? 'Showing all 39 monsters in Monster Hunter Outlanders.'
                    : `Monsters that drop ${selectedSet}. Tap a monster to see its full perks & cost details.`}
                </p>
              </div>

              <button
                onClick={() => setCurrentStep(1)}
                className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Ink Type</span>
              </button>
            </div>

            {/* Set Perks Summary Banner if specific set */}
            {activeSetData && (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                    {activeSetData.name} • 2-Piece Perk
                  </span>
                  <span className="text-slate-200">{activeSetData.two_piece}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                    {activeSetData.name} • 4-Piece Perk
                  </span>
                  <span className="text-amber-200 font-medium">{activeSetData.four_piece}</span>
                </div>
              </div>
            )}
          </div>

          {/* Cost Filter & Search Controls */}
          <div className="bg-[#121622]/90 rounded-2xl border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            
            {/* Cost Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-semibold mr-1">Cost Tier:</span>
              <button
                onClick={() => setCostFilter(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  costFilter === null
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                All Costs ({step2Monsters.length})
              </button>
              <button
                onClick={() => setCostFilter(costFilter === 4 ? null : 4)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  costFilter === 4
                    ? 'bg-amber-400 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 border border-slate-800 text-amber-400 hover:border-amber-400/40'
                }`}
              >
                Cost 4 (Apex)
              </button>
              <button
                onClick={() => setCostFilter(costFilter === 3 ? null : 3)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  costFilter === 3
                    ? 'bg-blue-500 text-white font-bold shadow'
                    : 'bg-slate-900 border border-slate-800 text-blue-400 hover:border-blue-400/40'
                }`}
              >
                Cost 3 (Large)
              </button>
              <button
                onClick={() => setCostFilter(costFilter === 1 ? null : 1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  costFilter === 1
                    ? 'bg-slate-200 text-slate-950 font-bold shadow'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Cost 1 (Minor)
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search monster..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

          </div>

          {/* Grid of Monsters */}
          {step2Monsters.length === 0 ? (
            <div className="p-12 text-center bg-[#121622]/60 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-slate-300">No Monsters Found</h3>
              <p className="text-xs text-slate-500">Try changing your cost filter or search term.</p>
              <button
                onClick={() => { setCostFilter(null); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {step2Monsters.map((monster) => {
                return (
                  <div
                    key={monster.id}
                    onClick={() => handleSelectMonster(monster)}
                    className="group relative rounded-3xl p-5 bg-[#121622]/90 border border-slate-800 hover:border-amber-400 hover:bg-[#161c28] shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Cost Badge + Radiant */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                          monster.cost === 4
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : monster.cost === 3
                            ? 'bg-blue-500 text-white border-blue-400'
                            : 'bg-slate-700 text-slate-200 border-slate-600'
                        }`}>
                          COST {monster.cost}
                        </span>

                        {monster.is_radiant && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>RADIANT</span>
                          </span>
                        )}
                      </div>

                      {/* Monster Avatar + Name */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className={`w-14 h-14 rounded-2xl p-1 bg-slate-950 border-2 shrink-0 overflow-hidden flex items-center justify-center shadow ${
                          monster.cost === 4 ? 'border-amber-400' : monster.cost === 3 ? 'border-blue-400' : 'border-slate-700'
                        }`}>
                          <img
                            src={monster.base64_img || monster.img}
                            alt={monster.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors truncate">
                            {monster.name}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {monster.sets.map((s) => {
                              const sData = VISAGE_SETS[s];
                              return (
                                <span
                                  key={s}
                                  className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border ${
                                    sData ? sData.tagBg : 'bg-slate-800 text-slate-300'
                                  }`}
                                >
                                  {s}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Innate Perk preview */}
                      <div className="bg-slate-950/60 rounded-2xl p-3 border border-slate-800/80 text-xs">
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                          Innate Perk:
                        </span>
                        <p className="text-slate-300 line-clamp-2">
                          {monster.cost === 1 
                            ? 'None (Cost 1 set synergy filler)'
                            : monster.core_effect}
                        </p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                      <span>Select This Monster</span>
                      <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="flex justify-start pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Step 1 (Ink Types)</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================
          STEP 3: MONSTER & PERK DOSSIER
          ======================================================== */}
      {currentStep === 3 && selectedMonster && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Bar */}
          <div className="bg-[#121622]/90 rounded-3xl border border-slate-800 p-6 sm:p-7 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  STEP 3 OF 3: HUNT DOSSIER
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-cinzel mt-2">
                  {selectedMonster.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Complete breakdown of cost, innate perk, set activations, and other monsters to hunt.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Choose Another Monster</span>
                </button>
                <button
                  onClick={handleStartOver}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-all shadow"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>

          {/* Dossier Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Card: Monster Hero & Cost Profile (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-[#121622] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 text-center sm:text-left">
                
                {/* Monster Avatar with Cost Tier Border */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className={`relative w-24 h-24 rounded-3xl p-2 bg-slate-950 border-4 shrink-0 overflow-hidden flex items-center justify-center shadow-2xl ${
                    selectedMonster.cost === 4 
                      ? 'border-amber-400 ring-4 ring-amber-400/20' 
                      : selectedMonster.cost === 3 
                      ? 'border-blue-400 ring-4 ring-blue-400/20' 
                      : 'border-slate-600'
                  }`}>
                    <img
                      src={selectedMonster.base64_img || selectedMonster.img}
                      alt={selectedMonster.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{selectedMonster.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-mono font-black border ${
                        selectedMonster.cost === 4
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : selectedMonster.cost === 3
                          ? 'bg-blue-500 text-white border-blue-400'
                          : 'bg-slate-700 text-slate-200 border-slate-600'
                      }`}>
                        COST {selectedMonster.cost}
                      </span>
                      {selectedMonster.is_radiant && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          ★ RADIANT MONSTER
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cost Explanation for this monster */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Cost Tier Significance:
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {selectedMonster.cost === 4 && (
                      <span><strong>Cost 4 (Apex Monster)</strong>: Takes 4 budget points, but offers top-tier stat ceilings and potent innate abilities.</span>
                    )}
                    {selectedMonster.cost === 3 && (
                      <span><strong>Cost 3 (Large Monster)</strong>: Standard primary hunt target. Grants high elemental damage bonuses and versatile combat perks.</span>
                    )}
                    {selectedMonster.cost === 1 && (
                      <span><strong>Cost 1 (Minor Monster)</strong>: Has <em>no innate perk</em>, but costs only 1 budget point. Use it to cheaply complete 2pc or 4pc set bonuses without hitting your cost ceiling!</span>
                    )}
                  </p>
                </div>

                {/* Innate Perk Section */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase font-mono tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Innate Monster Perk</span>
                  </div>
                  <p className="text-slate-100 text-sm font-semibold leading-relaxed">
                    {selectedMonster.cost === 1 
                      ? 'None (Pure set synergy filler)' 
                      : selectedMonster.core_effect}
                  </p>
                </div>

                {/* Rollable Sub-Stats */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-left">
                  <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rollable Sub-Stats ({selectedMonster.potential_effects.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMonster.potential_effects.map(p => (
                      <span key={p} className="text-xs px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Right Card: Sets, Perks & Companion Hunt Targets (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="bg-[#121622] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 font-cinzel">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Ink Sets &amp; Set Bonuses ({selectedMonster.sets.length})</span>
                </h3>

                <div className="space-y-4">
                  {selectedMonster.sets.map((setName) => {
                    const setData = VISAGE_SETS[setName];
                    if (!setData) return null;

                    // Companions sharing this set
                    const companions = VISAGES.filter(
                      v => v.sets.includes(setName) && v.id !== selectedMonster.id
                    );

                    return (
                      <div key={setName} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3.5">
                        
                        {/* Set Title */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${setData.tagBg}`}>
                              {setName}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              ({setData.element} • {setData.archetype})
                            </span>
                          </div>
                        </div>

                        {/* 2pc & 4pc perks */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              2-Piece Perk (Equip 2 monsters)
                            </span>
                            <span className="text-slate-100 text-xs font-medium leading-relaxed">
                              {setData.two_piece}
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30">
                            <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                              4-Piece Perk (Equip 4 monsters)
                            </span>
                            <span className="text-amber-200 text-xs font-semibold leading-relaxed">
                              {setData.four_piece}
                            </span>
                          </div>
                        </div>

                        {/* Other Monsters to Hunt for this set */}
                        {companions.length > 0 && (
                          <div className="pt-2 border-t border-slate-800/80">
                            <span className="text-xs font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                              <Skull className="w-3.5 h-3.5 text-amber-400" />
                              <span>Companion Monsters to Hunt for {setName} (Tap to view):</span>
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {companions.map((comp) => (
                                <button
                                  key={comp.id}
                                  onClick={() => handleSelectMonster(comp)}
                                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 transition-all flex items-center gap-2.5 text-left group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                                    <img
                                      src={comp.base64_img || comp.img}
                                      alt={comp.name}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                                      {comp.name}
                                    </div>
                                    <div className="text-[10px] font-mono text-amber-400 font-bold">
                                      Cost {comp.cost}
                                    </div>
                                  </div>
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300 font-bold text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Step 2 (Monster List)</span>
            </button>

            <button
              onClick={handleStartOver}
              className="px-5 py-2.5 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Over (Step 1)</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

