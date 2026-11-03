import React from 'react';
import { VISAGE_SETS, VISAGES } from '../data/visagesData';
import { HelpCircle, Zap, ShieldCheck, Skull, Flame, Snowflake, Award, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const CostGuide: React.FC = () => {
  const cost4Visages = VISAGES.filter(v => v.cost === 4);
  const cost3Visages = VISAGES.filter(v => v.cost === 3);
  const cost1Visages = VISAGES.filter(v => v.cost === 1);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Intro Header */}
      <div className="bg-[#121622]/90 backdrop-blur-md rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-cinzel">
              Visage Mechanics: Types, Perks &amp; Cost Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Everything you need to know about how Visages work in Monster Hunter Outlanders, how costs are balanced, and how set perks activate.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: How Visage Costs Work */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>Understanding Visage Cost Tiers (Why they cost 4, 3, or 1)</span>
        </h3>
        <p className="text-xs text-slate-400">
          In Monster Hunter Outlanders, your hunter has a total Visage Cost Budget (typically 10 points). Each visage costs either 4, 3, or 1 points to equip:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Cost 4 Card */}
          <div className="bg-[#121622] rounded-2xl p-5 border border-amber-400/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-mono font-black text-xs">
                COST 4
              </span>
              <span className="text-xs text-amber-400 font-bold">{cost4Visages.length} Monsters</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">Apex &amp; Major Monsters</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              These are the heaviest and most powerful monsters in the game (e.g. Diablos, Barroth, Radiant Great Jagras, Great Girros).
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-amber-400 block mb-0.5">Perk Profile:</strong>
              High stat potentials and substantial innate core perks that heavily boost specialized weapon builds.
            </div>
          </div>

          {/* Cost 3 Card */}
          <div className="bg-[#121622] rounded-2xl p-5 border border-blue-500/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-blue-500 text-white font-mono font-bold text-xs">
                COST 3
              </span>
              <span className="text-xs text-blue-400 font-bold">{cost3Visages.length} Monsters</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">Standard Large Monsters</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Core hunt targets across the map (e.g. Rathian, Rathalos, Anjanath, Pukei-Pukei, Tobi-Kadachi, Jyuratodus, Radiant forms).
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-blue-400 block mb-0.5">Perk Profile:</strong>
              Elemental damage bonuses (+7% fire/ice/water/etc.) and situational combat triggers.
            </div>
          </div>

          {/* Cost 1 Card */}
          <div className="bg-[#121622] rounded-2xl p-5 border border-slate-700 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 font-mono font-bold text-xs">
                COST 1
              </span>
              <span className="text-xs text-slate-400 font-bold">{cost1Visages.length} Monsters</span>
            </div>
            <h4 className="text-base font-bold text-slate-100">Minor &amp; Endemic Monsters</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Small monsters found roaming zones (e.g. Aptonoth, Kelbi, Vespoid, Hornetaur, Gajau, Barnos, Jagras, Kestodon).
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
              <strong className="text-slate-400 block mb-0.5">Perk Profile:</strong>
              <strong>No innate perk</strong>, but cost only 1 point. Their main role is acting as <em>inexpensive set fillers</em> to activate 2-pc or 4-pc bonuses without exceeding your budget!
            </div>
          </div>

        </div>
      </div>

      {/* Section 2: How 2-Piece and 4-Piece Set Perks Activate */}
      <div className="bg-[#121622]/90 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>How Ink Set Perks Activate</span>
        </h3>
        
        <p className="text-xs text-slate-300 leading-relaxed">
          Each monster visage belongs to 1 or 2 <strong>Ink Sets</strong> (such as <em>Ink of Flames</em> or <em>Ink of Thunder</em>). When you equip multiple visages from the same set:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-mono text-sm uppercase">2-Piece Set Perk</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Equipping any <strong>2 monster visages</strong> sharing the same Ink Set grants a permanent flat bonus (e.g. +5% elemental damage, +5% Affinity, or +5% Ultimate charge rate).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/30 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-mono text-sm uppercase">4-Piece Set Perk</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Equipping any <strong>4 monster visages</strong> of the same set activates a massive high-impact combat perk (e.g. +24% fire damage on weakpoints, +12% physical damage on crits, +32% off-field ultimate damage).
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Master Directory Table of All 11 Ink Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <span>The 11 Ink Types &amp; What Perks They Offer</span>
        </h3>

        <div className="bg-[#121622]/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Ink Type</th>
                  <th className="py-3 px-3">Element / Role</th>
                  <th className="py-3 px-4">2-Piece Perk</th>
                  <th className="py-3 px-4">4-Piece Perk</th>
                  <th className="py-3 px-3 text-right">Monsters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {Object.values(VISAGE_SETS).map((set) => {
                  return (
                    <tr key={set.slug} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-100">
                        {set.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${set.tagBg}`}>
                          {set.element}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-200">
                        {set.two_piece}
                      </td>
                      <td className="py-3 px-4 text-amber-200/90 font-medium">
                        {set.four_piece}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-400">
                        {set.count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

