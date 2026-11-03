import React from 'react';
import { Visage, VISAGE_SETS, VisageSet } from '../data/visagesData';
import { Layers, Plus, Trash2, Zap, ShieldCheck, AlertTriangle, Sparkles, CheckCircle2, BookmarkCheck } from 'lucide-react';

interface LoadoutBuilderProps {
  loadout: Visage[];
  onRemoveVisage: (visageId: string) => void;
  onClearLoadout: () => void;
  maxCost: number;
  setMaxCost: (val: number) => void;
  onOpenModal: (visage: Visage) => void;
  onLoadPreset: (visages: Visage[]) => void;
}

export const LoadoutBuilder: React.FC<LoadoutBuilderProps> = ({
  loadout,
  onRemoveVisage,
  onClearLoadout,
  maxCost,
  setMaxCost,
  onOpenModal,
  onLoadPreset,
}) => {
  const totalCost = loadout.reduce((sum, v) => sum + v.cost, 0);
  const isOverBudget = totalCost > maxCost;

  // Tally sets
  const setCounts: Record<string, number> = {};
  loadout.forEach((v) => {
    v.sets.forEach((setName) => {
      setCounts[setName] = (setCounts[setName] || 0) + 1;
    });
  });

  // Calculate active bonuses
  const activeSets: Array<{
    set: VisageSet;
    count: number;
    has2pc: boolean;
    has4pc: boolean;
  }> = [];

  Object.entries(setCounts).forEach(([setName, count]) => {
    const sData = VISAGE_SETS[setName];
    if (sData) {
      activeSets.push({
        set: sData,
        count,
        has2pc: count >= 2,
        has4pc: count >= 4,
      });
    }
  });

  // Sort active sets: activated first, then highest count
  activeSets.sort((a, b) => {
    if ((b.has2pc || b.has4pc) !== (a.has2pc || a.has4pc)) {
      return (b.has2pc || b.has4pc ? 1 : 0) - (a.has2pc || a.has4pc ? 1 : 0);
    }
    return b.count - a.count;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Loadout Capacity & Cost Gauge */}
      <div className="bg-[#121622]/90 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Visage Loadout &amp; Set Bonus Simulator</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Equip monster visages within your cost capacity to test 2-piece and 4-piece Ink Set activations in real time.
            </p>
          </div>

          {/* Budget Limit Controller */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
              <span className="text-slate-400">Max Budget:</span>
              <div className="flex items-center gap-1">
                {[8, 10, 12].map((costVal) => (
                  <button
                    key={costVal}
                    onClick={() => setMaxCost(costVal)}
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
                      maxCost === costVal
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {costVal}
                  </button>
                ))}
              </div>
            </div>

            {loadout.length > 0 && (
              <button
                onClick={onClearLoadout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Cost Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Equipped:</span>
              <strong className="text-slate-200">{loadout.length} Visages</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Cost:</span>
              <strong className={`text-sm ${isOverBudget ? 'text-red-400 font-black' : 'text-amber-400'}`}>
                {totalCost} / {maxCost}
              </strong>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800 flex">
            <div
              className={`h-full transition-all duration-300 ${
                isOverBudget
                  ? 'bg-gradient-to-r from-red-600 to-rose-500'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-400'
              }`}
              style={{ width: `${Math.min(100, (totalCost / maxCost) * 100)}%` }}
            />
          </div>

          {isOverBudget && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold pt-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Over Budget by {totalCost - maxCost} Cost points! Remove a visage or increase max budget to activate in-game.</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Equipped Slots & Active Set Effects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Equipped Visages Slots (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase font-mono tracking-wider">
              <span>Equipped Visages ({loadout.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Click a card to inspect</span>
          </div>

          {loadout.length === 0 ? (
            <div className="bg-[#121622]/60 rounded-2xl border-2 border-dashed border-slate-800 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-300">Your Loadout is Empty</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Browse visages from the Codex and click &ldquo;Equip&rdquo; to build your set, or try one of our popular starter presets below.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {loadout.map((v) => (
                <div
                  key={v.id}
                  onClick={() => onOpenModal(v)}
                  className="group relative bg-[#121622] rounded-xl p-3 border border-slate-800 hover:border-amber-400/60 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg p-0.5 bg-slate-950 border border-amber-500/50 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={v.base64_img || v.img}
                          alt={v.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = v.img;
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                          {v.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                          <span className="px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-bold">
                            Cost {v.cost}
                          </span>
                          {v.is_radiant && (
                            <span className="text-amber-300 text-[10px]">★ Radiant</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveVisage(v.id);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove from loadout"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Sets Tag on card */}
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex flex-wrap gap-1">
                    {v.sets.map((setName) => {
                      const sData = VISAGE_SETS[setName];
                      return (
                        <span
                          key={setName}
                          className={`text-[9px] font-medium px-1.5 py-0.2 rounded border ${
                            sData ? sData.tagBg : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {setName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Starter Presets */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Builds &amp; Templates</span>
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div 
                onClick={() => {
                  // Fire Weakpoint Build: Rathian (3), Radiant Kulu-Ya-Ku (4), Barnos (1), Kestodon (1) = 9 cost -> 4pc Ink of Flames!
                  const p = [
                    VISAGES.find(v => v.id === 'rathian')!,
                    VISAGES.find(v => v.id === 'radiant-kulu-ya-ku')!,
                    VISAGES.find(v => v.id === 'barnos')!,
                    VISAGES.find(v => v.id === 'kestodon')!,
                  ].filter(Boolean);
                  onLoadPreset(p);
                }}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/50 cursor-pointer transition-all"
              >
                <div className="font-bold text-orange-400">4-Piece Fire Weakpoint Build</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Ink of Flames (4/4 activated!) • Cost 9/10</div>
              </div>

              <div 
                onClick={() => {
                  // Thunder Stacking Build: Great Girros (4), Tobi-Kadachi (3), Radiant Great Girros (3) = 10 cost -> 4pc Ink of Thunder!
                  const p = [
                    VISAGES.find(v => v.id === 'great-girros')!,
                    VISAGES.find(v => v.id === 'tobi-kadachi')!,
                    VISAGES.find(v => v.id === 'radiant-great-girros')!,
                  ].filter(Boolean);
                  onLoadPreset(p);
                }}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-yellow-500/50 cursor-pointer transition-all"
              >
                <div className="font-bold text-yellow-400">4-Piece Thunder Stacking Burst</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Ink of Thunder (4/4 activated!) • Cost 10/10</div>
              </div>

              <div 
                onClick={() => {
                  // Dual 2-Piece Ultimate & Crit: Rathalos (3), Rathian (3), Diablos (4) = 10 cost
                  const p = [
                    VISAGES.find(v => v.id === 'rathalos')!,
                    VISAGES.find(v => v.id === 'rathian')!,
                    VISAGES.find(v => v.id === 'diablos')!,
                  ].filter(Boolean);
                  onLoadPreset(p);
                }}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all"
              >
                <div className="font-bold text-amber-400">Apex Trio Bruiser Loadout</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Diablos + Rathian + Rathalos • Cost 10/10</div>
              </div>

              <div 
                onClick={() => {
                  // Water Stacking Build: Barroth (4), Radiant Barroth (3), Jyuratodus (3) = 10 cost -> 4pc Ink of Water!
                  const p = [
                    VISAGES.find(v => v.id === 'barroth')!,
                    VISAGES.find(v => v.id === 'radiant-barroth')!,
                    VISAGES.find(v => v.id === 'jyuratodus')!,
                  ].filter(Boolean);
                  onLoadPreset(p);
                }}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all"
              >
                <div className="font-bold text-blue-400">4-Piece Water Stacking Tide</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Ink of Water (4/4 activated!) • Cost 10/10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Activated Set Bonuses Tracker (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 uppercase font-mono tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Active Set Synergies</span>
            </h3>
            <span className="text-xs text-slate-400">
              {activeSets.filter(s => s.has2pc || s.has4pc).length} Activated
            </span>
          </div>

          {activeSets.length === 0 ? (
            <div className="bg-[#121622]/60 rounded-2xl border border-slate-800 p-6 text-center text-xs text-slate-400">
              No sets equipped yet. Equip 2 or 4 visages with matching Ink sets to trigger synergy powers.
            </div>
          ) : (
            <div className="space-y-3">
              {activeSets.map(({ set, count, has2pc, has4pc }) => (
                <div
                  key={set.slug}
                  className={`rounded-2xl p-4 border transition-all ${
                    has4pc
                      ? 'bg-gradient-to-br from-amber-500/15 via-[#131722] to-slate-900 border-amber-400 shadow-lg shadow-amber-500/10'
                      : has2pc
                      ? 'bg-gradient-to-br from-emerald-500/10 via-[#131722] to-slate-900 border-emerald-500/50'
                      : 'bg-[#121622]/80 border-slate-800 opacity-75'
                  }`}
                >
                  {/* Set Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${set.tagBg}`}>
                        {set.name}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">({set.element})</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className={`font-bold ${has2pc ? 'text-amber-400' : 'text-slate-400'}`}>
                        {count} / 4 pieces
                      </span>
                      {has4pc ? (
                        <span className="px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 text-[10px] font-black">
                          4PC MAX
                        </span>
                      ) : has2pc ? (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 text-[10px] font-bold">
                          2PC ACTIVE
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[10px]">
                          1/2 NEEDED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 2-Piece bonus */}
                  <div className={`mt-2 p-2 rounded-xl text-xs flex items-start gap-2 border ${
                    has2pc
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  }`}>
                    <div className="shrink-0 mt-0.5">
                      {has2pc ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                      )}
                    </div>
                    <div>
                      <strong className="font-mono text-[10px] uppercase tracking-wider block">
                        2-Piece Effect:
                      </strong>
                      <span className="leading-snug">{set.two_piece}</span>
                    </div>
                  </div>

                  {/* 4-Piece bonus */}
                  <div className={`mt-1.5 p-2 rounded-xl text-xs flex items-start gap-2 border ${
                    has4pc
                      ? 'bg-amber-500/15 border-amber-400/40 text-amber-200 font-medium'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  }`}>
                    <div className="shrink-0 mt-0.5">
                      {has4pc ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                      )}
                    </div>
                    <div>
                      <strong className="font-mono text-[10px] uppercase tracking-wider block">
                        4-Piece Effect:
                      </strong>
                      <span className="leading-snug">{set.four_piece}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Active Innate Core Passives */}
          {loadout.some(v => v.cost > 1 && v.core_effect) && (
            <div className="bg-[#121622] rounded-2xl p-4 border border-slate-800 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Aggregated Innate Core Passives</span>
              </h4>
              <div className="space-y-1.5">
                {loadout.filter(v => v.cost > 1 && v.core_effect).map(v => (
                  <div key={v.id} className="text-xs p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                    <strong className="text-slate-200">{v.name}:</strong>{' '}
                    <span className="text-slate-300">{v.core_effect}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

