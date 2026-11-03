import React from 'react';
import { VISAGE_SETS, VisageSet, VISAGES, Visage } from '../data/visagesData';
import { Flame, Snowflake, Zap, Droplets, Sparkles, Swords, Crosshair, ShieldCheck, HeartHandshake, Disc3, Award, ChevronRight, Check, Target, Skull } from 'lucide-react';

interface SetMatrixProps {
  selectedSet: string | null;
  onSelectSet: (setName: string | null) => void;
  onOpenVisageModal?: (visage: Visage) => void;
}

const SET_ICONS: Record<string, React.ReactNode> = {
  'Ink of Flames': <Flame className="w-4 h-4 text-orange-400" />,
  'Ink of Frost': <Snowflake className="w-4 h-4 text-cyan-400" />,
  'Ink of Thunder': <Zap className="w-4 h-4 text-yellow-400" />,
  'Ink of Water': <Droplets className="w-4 h-4 text-blue-400" />,
  'Ink of Dragon': <Sparkles className="w-4 h-4 text-purple-400" />,
  'Ink of Might': <Swords className="w-4 h-4 text-emerald-400" />,
  'Ink of Combat': <Crosshair className="w-4 h-4 text-rose-400" />,
  'Ink of Guidance': <Award className="w-4 h-4 text-amber-400" />,
  'Ink of Protection': <ShieldCheck className="w-4 h-4 text-teal-400" />,
  'Ink of Grace': <HeartHandshake className="w-4 h-4 text-pink-400" />,
  'Ink of Resonance': <Disc3 className="w-4 h-4 text-indigo-400" />,
};

export const SetMatrix: React.FC<SetMatrixProps> = ({
  selectedSet,
  onSelectSet,
  onOpenVisageModal
}) => {
  const setsList = Object.values(VISAGE_SETS);
  const activeSetData = selectedSet ? VISAGE_SETS[selectedSet] : null;
  const activeMonsters = selectedSet 
    ? VISAGES.filter(v => v.sets.includes(selectedSet)) 
    : [];

  return (
    <div className="space-y-4">
      {/* Header & Explainer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            <span>Ink Types, Perks &amp; Hunting Targets</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monster Hunter Outlanders has 11 Ink types. Select any type below to see its set perks and the exact monsters to hunt.
          </p>
        </div>

        {selectedSet && (
          <button
            onClick={() => onSelectSet(null)}
            className="self-start sm:self-center text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1.5"
          >
            <span>Filtering: <strong>{selectedSet}</strong></span>
            <span className="text-slate-400 font-bold hover:text-white">✕ Show All</span>
          </button>
        )}
      </div>

      {/* Grid of 11 Sets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {setsList.map((set) => {
          const isSelected = selectedSet === set.name;
          const matchingVisages = VISAGES.filter(v => v.sets.includes(set.name));

          return (
            <div
              key={set.slug}
              onClick={() => onSelectSet(isSelected ? null : set.name)}
              className={`group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer border ${
                isSelected
                  ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                  : 'bg-[#121620]/90 border-slate-800 hover:border-slate-700 hover:bg-[#161c28]'
              }`}
            >
              {/* Top Row: Title, Icon, Badge */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-xl border bg-slate-950/80 ${set.border} flex items-center justify-center shrink-0`}>
                    {SET_ICONS[set.name] || <Sparkles className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-bold truncate transition-colors ${isSelected ? 'text-amber-300' : 'text-slate-100 group-hover:text-amber-200'}`}>
                      {set.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold border ${set.tagBg}`}>
                        {set.element}
                      </span>
                      <span>•</span>
                      <span className="truncate">{set.archetype}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-950/80 border border-slate-800 text-slate-300">
                    {matchingVisages.length} monsters
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Perks description box */}
              <div className="space-y-1.5 text-xs bg-slate-950/50 rounded-xl p-3 border border-slate-800/80 font-sans">
                {/* 2-Piece Perk */}
                <div className="flex items-start gap-2">
                  <span className="shrink-0 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono font-bold tracking-wider mt-0.5">
                    2-PIECE PERK
                  </span>
                  <span className="text-slate-200 leading-snug">
                    {set.two_piece}
                  </span>
                </div>

                {/* 4-Piece Perk */}
                <div className="flex items-start gap-2 pt-1.5 border-t border-slate-800/60">
                  <span className="shrink-0 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold tracking-wider mt-0.5">
                    4-PIECE PERK
                  </span>
                  <span className="text-amber-200/90 leading-snug font-medium">
                    {set.four_piece}
                  </span>
                </div>
              </div>

              {/* Monsters to Hunt Showcase */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center -space-x-1.5 overflow-hidden py-0.5">
                  {matchingVisages.map((v) => (
                    <div 
                      key={v.id} 
                      className={`relative w-7 h-7 rounded-full border overflow-hidden bg-slate-950 shadow-sm ${
                        v.cost === 4 ? 'border-amber-400' : v.cost === 3 ? 'border-blue-400' : 'border-slate-700'
                      }`}
                      title={`${v.name} (Cost ${v.cost})`}
                    >
                      <img 
                        src={v.base64_img || v.img} 
                        alt={v.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                <span className="text-xs text-amber-400 group-hover:text-amber-300 font-semibold flex items-center">
                  <span>{isSelected ? 'Viewing Monsters' : 'Show Monsters'}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prominent Active Set Deep Dive Banner when clicked */}
      {activeSetData && (
        <div className="rounded-3xl p-5 bg-gradient-to-r from-amber-500/10 via-slate-900 to-[#121620] border-2 border-amber-400/80 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                {SET_ICONS[activeSetData.name] || <Target className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-100">{activeSetData.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${activeSetData.tagBg}`}>
                    {activeSetData.element} • {activeSetData.archetype}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{activeSetData.description}</p>
              </div>
            </div>

            <button
              onClick={() => onSelectSet(null)}
              className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              ✕ Clear Filter
            </button>
          </div>

          {/* Perks Side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                2-Piece Set Perk (Equip any 2 matching monsters)
              </span>
              <span className="text-slate-100 font-medium text-sm">{activeSetData.two_piece}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-amber-500/30">
              <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                4-Piece Set Perk (Equip any 4 matching monsters)
              </span>
              <span className="text-amber-200 font-bold text-sm">{activeSetData.four_piece}</span>
            </div>
          </div>

          {/* Monsters to hunt for this ink */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Skull className="w-4 h-4 text-amber-400" />
                <span>Monsters to Hunt for {activeSetData.name} ({activeMonsters.length}):</span>
              </span>
              <span className="text-slate-400 text-[11px]">Click a monster to inspect full stats</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {activeMonsters.map((monster) => (
                <div
                  key={monster.id}
                  onClick={() => onOpenVisageModal && onOpenVisageModal(monster)}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-3"
                >
                  <div className={`w-11 h-11 rounded-lg p-0.5 bg-slate-900 border shrink-0 overflow-hidden flex items-center justify-center ${
                    monster.cost === 4 ? 'border-amber-400' : monster.cost === 3 ? 'border-blue-400' : 'border-slate-700'
                  }`}>
                    <img
                      src={monster.base64_img || monster.img}
                      alt={monster.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-slate-100 truncate hover:text-amber-300">
                      {monster.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] mt-0.5 font-mono">
                      <span className={`px-1.5 py-0.2 rounded font-bold ${
                        monster.cost === 4 
                          ? 'bg-amber-400 text-slate-950' 
                          : monster.cost === 3 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-slate-800 text-slate-300'
                      }`}>
                        Cost {monster.cost}
                      </span>
                      {monster.is_radiant && (
                        <span className="text-amber-400">★ Radiant</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
