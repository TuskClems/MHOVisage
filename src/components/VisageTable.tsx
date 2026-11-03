import React from 'react';
import { Visage, VISAGE_SETS } from '../data/visagesData';
import { Eye, Sparkles } from 'lucide-react';

interface VisageTableProps {
  visages: Visage[];
  onOpenModal: (visage: Visage) => void;
  onSelectSet?: (setName: string) => void;
}

export const VisageTable: React.FC<VisageTableProps> = ({
  visages,
  onOpenModal,
  onSelectSet,
}) => {
  return (
    <div className="bg-[#121622]/90 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Monster to Hunt</th>
              <th className="py-3 px-3 text-center">Cost</th>
              <th className="py-3 px-4">Ink Type / Set</th>
              <th className="py-3 px-4">Innate Monster Perk</th>
              <th className="py-3 px-4">Rollable Sub-Stats</th>
              <th className="py-3 px-4 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {visages.map((visage) => {
              return (
                <tr
                  key={visage.id}
                  onClick={() => onOpenModal(visage)}
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  {/* Visage Column: Icon + Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg p-0.5 bg-slate-950 border border-amber-500/50 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={visage.base64_img || visage.img}
                          alt={visage.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-100 flex items-center gap-1.5 hover:text-amber-300">
                          <span>{visage.name}</span>
                          {visage.is_radiant && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              RADIANT
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">{visage.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Cost Column */}
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md font-mono font-bold text-xs ${
                        visage.cost === 4
                          ? 'bg-amber-400 text-slate-950 border border-amber-300'
                          : visage.cost === 3
                          ? 'bg-blue-500 text-white border border-blue-400'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      Cost {visage.cost}
                    </span>
                  </td>

                  {/* Sets Column */}
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {visage.sets.map((setName) => {
                        const sData = VISAGE_SETS[setName];
                        return (
                          <button
                            key={setName}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSet) onSelectSet(setName);
                            }}
                            className={`text-[10px] font-medium px-2 py-0.5 rounded border transition-colors ${
                              sData ? sData.tagBg : 'bg-slate-800 text-slate-300 border-slate-700'
                            } hover:brightness-125`}
                          >
                            {setName}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Innate Perk Column */}
                  <td className="py-3 px-4 max-w-xs text-slate-200">
                    {visage.cost === 1 ? (
                      <span className="text-slate-400 italic">None (Cost 1 set synergy filler)</span>
                    ) : (
                      <span className="font-medium">{visage.core_effect}</span>
                    )}
                  </td>

                  {/* Potential Rolls */}
                  <td className="py-3 px-4 max-w-sm">
                    <div className="flex flex-wrap gap-1">
                      {visage.potential_effects.slice(0, 4).map((p) => (
                        <span
                          key={p}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {p}
                        </span>
                      ))}
                      {visage.potential_effects.length > 4 && (
                        <span className="text-[10px] px-1 py-0.5 rounded bg-slate-800 text-slate-400">
                          +{visage.potential_effects.length - 4}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onOpenModal(visage)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-amber-400 hover:text-slate-950 hover:bg-amber-400 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
