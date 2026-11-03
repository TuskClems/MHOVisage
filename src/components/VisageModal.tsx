import React, { useEffect } from 'react';
import { Visage, VISAGE_SETS, VISAGES } from '../data/visagesData';
import { X, Zap, Sparkles, ShieldCheck, ArrowRight, Skull } from 'lucide-react';

interface VisageModalProps {
  visage: Visage | null;
  onClose: () => void;
  onSelectVisage: (visage: Visage) => void;
  onSelectSet?: (setName: string) => void;
}

export const VisageModal: React.FC<VisageModalProps> = ({
  visage,
  onClose,
  onSelectVisage,
  onSelectSet,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!visage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#111520] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10">
        
        {/* Header Bar */}
        <div className="relative p-6 pb-4 border-b border-slate-800/80 flex items-start justify-between bg-gradient-to-b from-[#192132] to-[#111520]">
          
          <div className="flex items-center gap-4">
            {/* Monster Icon with Gold Frame */}
            <div className={`relative w-16 h-16 rounded-2xl p-1 bg-gradient-to-b from-[#253047] to-[#141926] border-2 shrink-0 flex items-center justify-center overflow-hidden shadow-xl ${
              visage.is_radiant ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-amber-500/70'
            }`}>
              <img
                src={visage.base64_img || visage.img}
                alt={visage.name}
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold tracking-wider ${
                  visage.cost === 4
                    ? 'bg-amber-400 text-slate-950'
                    : visage.cost === 3
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}>
                  COST {visage.cost}
                </span>

                {visage.is_radiant && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>RADIANT HUNT VARIANT</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <span>{visage.name}</span>
              </h2>
              <span className="text-xs font-mono text-slate-400">Monster ID: {visage.id}</span>
            </div>
          </div>

          {/* Close X */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          {/* Innate Perk */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4" />
              <span>Innate Monster Perk</span>
            </h3>
            <p className="text-sm text-slate-100 leading-relaxed font-sans font-medium">
              {visage.cost === 1 ? (
                <span className="text-slate-400 italic">None (Cost 1 visages provide set synergy without taking up high cost budget)</span>
              ) : (
                visage.core_effect
              )}
            </p>
          </div>

          {/* Sets & Synergy Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Ink Sets &amp; Set Perks ({visage.sets.length})</span>
            </h3>

            <div className="space-y-3">
              {visage.sets.map((setName) => {
                const setData = VISAGE_SETS[setName];
                if (!setData) return null;

                // Find companion visages that share this set
                const companions = VISAGES.filter(
                  v => v.sets.includes(setName) && v.id !== visage.id
                );

                return (
                  <div key={setName} className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${setData.tagBg}`}>
                          {setName}
                        </span>
                        <span className="text-xs text-slate-400">({setData.element} • {setData.archetype})</span>
                      </div>
                      
                      {onSelectSet && (
                        <button
                          onClick={() => {
                            onSelectSet(setName);
                            onClose();
                          }}
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-0.5"
                        >
                          <span>Filter Set</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* 2pc & 4pc bonus cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                          2-Piece Perk (Equip 2 monsters)
                        </span>
                        <span className="text-slate-200 leading-snug">{setData.two_piece}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20">
                        <span className="block text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                          4-Piece Perk (Equip 4 monsters)
                        </span>
                        <span className="text-amber-200 font-medium leading-snug">{setData.four_piece}</span>
                      </div>
                    </div>

                    {/* Companion Monsters in Set */}
                    {companions.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/60">
                        <div className="text-[11px] text-slate-400 mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1 font-semibold text-slate-300">
                            <Skull className="w-3.5 h-3.5 text-amber-400" />
                            <span>Other monsters to hunt for {setName}:</span>
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">{companions.length} monsters</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {companions.map((comp) => (
                            <button
                              key={comp.id}
                              onClick={() => onSelectVisage(comp)}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-400 hover:bg-slate-800 transition-all text-left"
                            >
                              <div className="w-5 h-5 rounded overflow-hidden bg-slate-950 shrink-0">
                                <img
                                  src={comp.base64_img || comp.img}
                                  alt={comp.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <span className="text-xs text-slate-200 font-medium truncate max-w-[130px]">
                                {comp.name}
                              </span>
                              <span className="text-[10px] font-mono font-bold text-amber-400">
                                (Cost {comp.cost})
                              </span>
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

          {/* Potential Sub-Stats Roll Pool */}
          <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Rollable Potential Sub-Stats ({visage.potential_effects.length} Available)</span>
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              When hunting and obtaining this monster visage, it can roll any of these random sub-stat perks:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {visage.potential_effects.map((pot) => (
                <div
                  key={pot}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{pot}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Monster Visage Encyclopedia
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
