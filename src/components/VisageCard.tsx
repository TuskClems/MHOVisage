import React from 'react';
import { Visage, VISAGE_SETS } from '../data/visagesData';
import { Eye, Sparkles, Zap, ChevronRight, Skull } from 'lucide-react';

interface VisageCardProps {
  visage: Visage;
  onOpenModal: (visage: Visage) => void;
  onSelectSet?: (setName: string) => void;
}

export const VisageCard: React.FC<VisageCardProps> = ({
  visage,
  onOpenModal,
  onSelectSet,
}) => {
  // Cost badge styles
  const getCostBadge = (cost: number) => {
    switch (cost) {
      case 4:
        return {
          badge: 'bg-amber-400 text-slate-950 border-amber-300 font-black',
          tier: 'Apex / Tier 4',
          desc: 'High stat ceiling & powerful innate perk'
        };
      case 3:
        return {
          badge: 'bg-blue-500 text-white border-blue-400 font-bold',
          tier: 'Large Monster / Tier 3',
          desc: 'Primary hunt target with elemental perks'
        };
      case 1:
      default:
        return {
          badge: 'bg-slate-700 text-slate-200 border-slate-600 font-semibold',
          tier: 'Minor / Endemic / Tier 1',
          desc: 'Low cost set filler'
        };
    }
  };

  const costStyle = getCostBadge(visage.cost);

  return (
    <div 
      onClick={() => onOpenModal(visage)}
      className="group relative rounded-2xl p-4 bg-[#121622]/90 border border-slate-800 hover:border-amber-400/80 hover:bg-[#161c28] shadow-lg shadow-black/20 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Banner: Cost + Radiant Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono tracking-wider border shadow-sm ${costStyle.badge}`}>
              COST {visage.cost}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {costStyle.tier}
            </span>
          </div>

          {visage.is_radiant && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>RADIANT</span>
            </span>
          )}
        </div>

        {/* Monster Info Row: Avatar + Name + Sets */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className={`relative w-14 h-14 rounded-xl p-1 bg-gradient-to-b from-[#1e2535] to-[#0f131c] border shrink-0 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 shadow-md ${
            visage.is_radiant ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-amber-500/50'
          }`}>
            <img
              src={visage.base64_img || visage.img}
              alt={visage.name}
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors truncate">
              {visage.name}
            </h3>

            {/* Sets list */}
            <div className="flex flex-wrap gap-1 mt-1">
              {visage.sets.map((setName) => {
                const setData = VISAGE_SETS[setName];
                return (
                  <button
                    key={setName}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectSet) onSelectSet(setName);
                    }}
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border transition-colors ${
                      setData ? setData.tagBg : 'bg-slate-800 text-slate-300 border-slate-700'
                    } hover:brightness-125`}
                    title={`Filter by ${setName}`}
                  >
                    {setName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Innate Perk Section */}
        <div className="mb-3 bg-slate-950/60 rounded-xl p-3 border border-slate-800/80">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400 mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>Innate Monster Perk:</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {visage.cost === 1 ? (
              <span className="text-slate-400 italic">None (Cost 1 visages provide set synergy without taking up high cost budget)</span>
            ) : (
              visage.core_effect
            )}
          </p>
        </div>

        {/* Potential Rollable Effects */}
        <div className="pt-2 border-t border-slate-800/60">
          <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Rollable Sub-Stats:</span>
            <span className="font-mono text-[10px] text-slate-400">{visage.potential_effects.length} rolls</span>
          </div>
          <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
            {visage.potential_effects.map((pot) => (
              <span
                key={pot}
                className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium"
              >
                {pot}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer: Inspect details button */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span className="text-[11px] font-mono text-slate-400">ID: {visage.id}</span>
        <span className="text-amber-400 group-hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors">
          <span>View Full Perks</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>

    </div>
  );
};
