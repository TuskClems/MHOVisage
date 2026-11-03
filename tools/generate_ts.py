import json
import os

with open('data/visages_clean.json', 'r', encoding='utf-8') as f:
    visages = json.load(f)

with open('data/sets_meta.json', 'r', encoding='utf-8') as f:
    sets = json.load(f)

os.makedirs('src/data', exist_ok=True)

ts_content = """// Auto-generated comprehensive dataset for Monster Hunter Outlanders Visages

export interface Visage {
  id: string;
  name: string;
  cost: 1 | 3 | 4;
  sets: string[];
  img: string;
  local_img: string;
  core_effect: string;
  potential_effects: string[];
  is_radiant: boolean;
  primary_element: string;
}

export interface VisageSet {
  name: string;
  slug: string;
  element: string;
  archetype: string;
  color: string;
  accent: string;
  bgGradient: string;
  border: string;
  tagBg: string;
  description: string;
  two_piece: string;
  four_piece: string;
  count: number;
  visageIds: string[];
}

export const VISAGE_SETS: Record<string, VisageSet> = """ + json.dumps(sets, indent=2) + """;

export const VISAGES: Visage[] = """ + json.dumps(visages, indent=2) + """;

export const ALL_POTENTIAL_EFFECTS = [
  "Affinity",
  "Attack",
  "Attack Power",
  "Crit Damage",
  "Damage Reduction",
  "Defense",
  "Dragon Damage Bonus",
  "Ele. Crit DMG",
  "Fire Damage Bonus",
  "Ice Damage Bonus",
  "Physical Damage",
  "Thunder Damage Bonus",
  "Water Damage Bonus"
] as const;

export const ELEMENT_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Fire: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'rgba(249, 115, 22, 0.4)' },
  Ice: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'rgba(6, 182, 212, 0.4)' },
  Thunder: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'rgba(234, 179, 8, 0.4)' },
  Water: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'rgba(59, 130, 246, 0.4)' },
  Dragon: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'rgba(168, 85, 247, 0.4)' },
  Physical: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'rgba(16, 185, 129, 0.4)' },
  Affinity: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', glow: 'rgba(244, 63, 94, 0.4)' },
  'Affinity/DPS': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'rgba(99, 102, 241, 0.4)' },
  'Support/DPS': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'rgba(245, 158, 11, 0.4)' },
  Defense: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30', glow: 'rgba(20, 184, 166, 0.4)' },
  Support: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30', glow: 'rgba(236, 72, 153, 0.4)' }
};
"""

with open('src/data/visagesData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Generated src/data/visagesData.ts successfully.")
