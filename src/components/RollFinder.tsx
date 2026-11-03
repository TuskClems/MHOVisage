import React, { useState } from 'react';
import { ALL_POTENTIAL_EFFECTS, VISAGES, Visage, VISAGE_SETS } from '../data/visagesData';
import { Sparkles, Eye, ChevronRight } from 'lucide-react';

interface RollFinderProps {
  onOpenModal: (visage: Visage) => void;
}

export const RollFinder: React.FC<RollFinderProps> = ({
  onOpenModal,
}) => {
  const [selectedEffect, setSelectedEffect] = useState<string>("Affinity");

  const matchingVisages = VISAGES.filter(v =>
    v.potential_effects.includes(selectedEffect)
  );

  // Group by cost
  const cost4 = matchingVisages.filter(v => v.cost === 4);
  const cost3 = matchingVisages.filter(v => v.cost === 3);
  const cost1 = matchingVisages.filter(v => v.cost === 1);

  return (
    <div className="space-y-6">
      
      {/* Intro & Stat Selector */}
      <div className="bg-[#121622]/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Sub-Stat Potential Roll Lookup</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Target a specific random sub-stat roll to discover which monsters drop visages with this perk.
          </p>
        </div>

        {/* Buttons for all 13 stats */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
          {ALL_POTENTIAL_EFFECTS.map((eff) => {
            const count = VISAGES.filter(v => v.potential_effects.includes(eff)).length;
            const isSelected = selectedEffect === eff;

            return (
              <button
                key={eff}
                onClick={() => setSelectedEffect(eff)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{eff}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Result Showcase */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-xs">
        <span className="text-slate-300">
          Found <strong className="text-amber-400 font-bold">{matchingVisages.length}</strong> monsters that can roll <strong className="text-amber-300 underline underline-offset-4">{selectedEffect}</strong>:
        </span>
      </div>

      {/* Section Cost 4 */}
      {cost4.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-xs font-mono font-black">
              COST 4 MONSTERS ({cost4.length})
            </span>
            <span className="text-xs text-slate-400">Apex &amp; Major Monsters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cost4.map(v => (
              <RollItemCard
                key={v.id}
                visage={v}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section Cost 3 */}
      {cost3.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-500 text-white text-xs font-mono font-bold">
              COST 3 MONSTERS ({cost3.length})
            </span>
            <span className="text-xs text-slate-400">Standard Large Monsters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cost3.map(v => (
              <RollItemCard
                key={v.id}
                visage={v}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section Cost 1 */}
      {cost1.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-slate-700 text-slate-200 text-xs font-mono font-bold">
              COST 1 MONSTERS ({cost1.length})
            </span>
            <span className="text-xs text-slate-400">Minor &amp; Endemic Monsters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cost1.map(v => (
              <RollItemCard
                key={v.id}
                visage={v}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

const RollItemCard: React.FC<{
  visage: Visage;
  onOpenModal: (v: Visage) => void;
}> = ({ visage, onOpenModal }) => {
  return (
    <div
      onClick={() => onOpenModal(visage)}
      className="group bg-[#121622] rounded-xl p-3.5 border border-slate-800 hover:border-amber-400/60 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-md"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-11 h-11 rounded-lg p-0.5 bg-slate-950 border shrink-0 overflow-hidden flex items-center justify-center ${
          visage.cost === 4 ? 'border-amber-400' : visage.cost === 3 ? 'border-blue-400' : 'border-slate-700'
        }`}>
          <img
            src={visage.base64_img || visage.img}
            alt={visage.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors truncate">
            {visage.name}
          </h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {visage.sets.map((s) => {
              const sData = VISAGE_SETS[s];
              return (
                <span
                  key={s}
                  className={`text-[9px] px-1.5 py-0.2 rounded border ${
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

      <div className="shrink-0 flex items-center gap-1.5 text-xs text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
        <span>Inspect</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
