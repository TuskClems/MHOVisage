import React from 'react';
import { Search, RotateCcw, Sparkles, ChevronDown } from 'lucide-react';
import { ALL_POTENTIAL_EFFECTS, VISAGES } from '../data/visagesData';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCost: number | null;
  setSelectedCost: (cost: number | null) => void;
  selectedSet: string | null;
  setSelectedSet: (set: string | null) => void;
  selectedPotentialEffect: string | null;
  setSelectedPotentialEffect: (effect: string | null) => void;
  radiantOnly: boolean;
  setRadiantOnly: (val: boolean) => void;
  sortBy: 'cost-desc' | 'cost-asc' | 'name-asc' | 'name-desc';
  setSortBy: (val: 'cost-desc' | 'cost-asc' | 'name-asc' | 'name-desc') => void;
  totalFiltered: number;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCost,
  setSelectedCost,
  selectedSet,
  setSelectedSet,
  selectedPotentialEffect,
  setSelectedPotentialEffect,
  radiantOnly,
  setRadiantOnly,
  sortBy,
  setSortBy,
  totalFiltered,
  onReset,
}) => {
  const isAnyFilterActive = 
    searchQuery.trim() !== '' || 
    selectedCost !== null || 
    selectedSet !== null || 
    selectedPotentialEffect !== null || 
    radiantOnly;

  // Counts for costs
  const cost4Count = VISAGES.filter(v => v.cost === 4).length;
  const cost3Count = VISAGES.filter(v => v.cost === 3).length;
  const cost1Count = VISAGES.filter(v => v.cost === 1).length;

  return (
    <div className="bg-[#121622]/90 backdrop-blur-md rounded-2xl border border-slate-800 p-4 space-y-3.5 shadow-xl shadow-black/30">
      
      {/* Top Row: Search Input + Sort + Reset */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search monster name, perk, ink set, or sub-stat..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs px-1.5 py-0.5 rounded bg-slate-800"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort & Quick Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          
          {/* Radiant variant toggle */}
          <button
            onClick={() => setRadiantOnly(!radiantOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              radiantOnly
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Radiant Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-2 pr-7 text-xs font-medium text-slate-300 hover:border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="cost-desc">Cost: High to Low</option>
              <option value="cost-asc">Cost: Low to High</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Reset Filters button */}
          {isAnyFilterActive && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all shadow-sm"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

        </div>
      </div>

      {/* Row 2: Cost Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/60 text-xs">
        <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
          <span>Filter by Cost:</span>
        </span>
        <button
          onClick={() => setSelectedCost(null)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            selectedCost === null
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
          }`}
        >
          All Monsters ({VISAGES.length})
        </button>
        <button
          onClick={() => setSelectedCost(selectedCost === 4 ? null : 4)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
            selectedCost === 4
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 border border-slate-800 text-amber-400/90 hover:border-amber-500/40'
          }`}
        >
          <span className="font-mono font-bold">Cost 4 (Apex)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 text-slate-300">
            {cost4Count}
          </span>
        </button>
        <button
          onClick={() => setSelectedCost(selectedCost === 3 ? null : 3)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
            selectedCost === 3
              ? 'bg-blue-500 text-white font-bold shadow-md'
              : 'bg-slate-900 border border-slate-800 text-blue-400 hover:border-blue-500/40'
          }`}
        >
          <span className="font-mono font-bold">Cost 3 (Large)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 text-slate-300">
            {cost3Count}
          </span>
        </button>
        <button
          onClick={() => setSelectedCost(selectedCost === 1 ? null : 1)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
            selectedCost === 1
              ? 'bg-slate-200 text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <span className="font-mono font-bold">Cost 1 (Minor)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/60 text-slate-300">
            {cost1Count}
          </span>
        </button>
      </div>

      {/* Row 3: Potential Sub-Stats Roll Filter */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-800/60 text-xs">
        <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Filter by Rollable Sub-Stat:</span>
        </span>
        <button
          onClick={() => setSelectedPotentialEffect(null)}
          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
            selectedPotentialEffect === null
              ? 'bg-slate-700 text-white font-bold'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Any Sub-Stat
        </button>
        {ALL_POTENTIAL_EFFECTS.map((effect) => {
          const isSelected = selectedPotentialEffect === effect;
          return (
            <button
              key={effect}
              onClick={() => setSelectedPotentialEffect(isSelected ? null : effect)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {effect}
            </button>
          );
        })}
      </div>

      {/* Row 4: Results Counter & Active Filter Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-amber-400 font-mono text-sm">{totalFiltered}</strong> of <span className="font-mono">{VISAGES.length}</span> monsters</span>
        </div>

        {/* Active chips */}
        {isAnyFilterActive && (
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedCost !== null && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] border border-slate-700">
                Cost {selectedCost}
                <button onClick={() => setSelectedCost(null)} className="hover:text-white">✕</button>
              </span>
            )}
            {selectedSet && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] border border-slate-700">
                {selectedSet}
                <button onClick={() => setSelectedSet(null)} className="hover:text-white">✕</button>
              </span>
            )}
            {selectedPotentialEffect && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] border border-slate-700">
                Rolls: {selectedPotentialEffect}
                <button onClick={() => setSelectedPotentialEffect(null)} className="hover:text-white">✕</button>
              </span>
            )}
            {radiantOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] border border-slate-700">
                Radiant Only
                <button onClick={() => setRadiantOnly(false)} className="hover:text-white">✕</button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 text-[10px] border border-slate-700">
                &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')} className="hover:text-white">✕</button>
              </span>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
