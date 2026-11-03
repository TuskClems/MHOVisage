import json

with open('data/visages.json', 'r', encoding='utf-8') as f:
    visages = json.load(f)

with open('sets_data.json', 'r', encoding='utf-8') as f:
    sets = json.load(f)

# Set metadata with theme colors, element, archetype, icon name
set_meta = {
    "Ink of Flames": {
        "slug": "ink-of-flames",
        "element": "Fire",
        "archetype": "Fire DPS",
        "color": "orange",
        "accent": "#f97316",
        "bgGradient": "from-orange-500/20 to-red-500/10",
        "border": "border-orange-500/30",
        "tagBg": "bg-orange-500/20 text-orange-400 border-orange-500/30",
        "description": "Boosts Fire damage and grants massive Fire damage boost after hitting monster weak points.",
        "two_piece": sets["Ink of Flames"]["two_piece"],
        "four_piece": sets["Ink of Flames"]["four_piece"]
    },
    "Ink of Frost": {
        "slug": "ink-of-frost",
        "element": "Ice",
        "archetype": "Ice DPS",
        "color": "cyan",
        "accent": "#06b6d4",
        "bgGradient": "from-cyan-500/20 to-blue-500/10",
        "border": "border-cyan-500/30",
        "tagBg": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        "description": "Boosts Ice damage and surges Ice damage upon landing hits on monsters.",
        "two_piece": sets["Ink of Frost"]["two_piece"],
        "four_piece": sets["Ink of Frost"]["four_piece"]
    },
    "Ink of Thunder": {
        "slug": "ink-of-thunder",
        "element": "Thunder",
        "archetype": "Thunder Stacking DPS",
        "color": "yellow",
        "accent": "#eab308",
        "bgGradient": "from-amber-500/20 to-yellow-500/10",
        "border": "border-yellow-500/30",
        "tagBg": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        "description": "Boosts Thunder damage with stacking Thunder damage buffs when dealing consecutive hits.",
        "two_piece": sets["Ink of Thunder"]["two_piece"],
        "four_piece": sets["Ink of Thunder"]["four_piece"]
    },
    "Ink of Water": {
        "slug": "ink-of-water",
        "element": "Water",
        "archetype": "Water Stacking DPS",
        "color": "blue",
        "accent": "#3b82f6",
        "bgGradient": "from-blue-500/20 to-sky-500/10",
        "border": "border-blue-500/30",
        "tagBg": "bg-blue-500/20 text-blue-400 border-blue-500/30",
        "description": "Boosts Water damage and stacks additional Water damage each time squadmates unleash ultimates.",
        "two_piece": sets["Ink of Water"]["two_piece"],
        "four_piece": sets["Ink of Water"]["four_piece"]
    },
    "Ink of Dragon": {
        "slug": "ink-of-dragon",
        "element": "Dragon",
        "archetype": "Dragon Ultimate DPS",
        "color": "purple",
        "accent": "#a855f7",
        "bgGradient": "from-purple-500/20 to-fuchsia-500/10",
        "border": "border-purple-500/30",
        "tagBg": "bg-purple-500/20 text-purple-400 border-purple-500/30",
        "description": "Boosts Dragon damage and grants a huge 24% Dragon damage spike after firing your ultimate.",
        "two_piece": sets["Ink of Dragon"]["two_piece"],
        "four_piece": sets["Ink of Dragon"]["four_piece"]
    },
    "Ink of Might": {
        "slug": "ink-of-might",
        "element": "Physical",
        "archetype": "Physical Crit DPS",
        "color": "emerald",
        "accent": "#10b981",
        "bgGradient": "from-emerald-500/20 to-teal-500/10",
        "border": "border-emerald-500/30",
        "tagBg": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        "description": "Boosts base Physical damage and grants sustained +12% Physical damage upon landing critical strikes.",
        "two_piece": sets["Ink of Might"]["two_piece"],
        "four_piece": sets["Ink of Might"]["four_piece"]
    },
    "Ink of Combat": {
        "slug": "ink-of-combat",
        "element": "Affinity",
        "archetype": "Affinity & Debuff Synergy",
        "color": "rose",
        "accent": "#f43f5e",
        "bgGradient": "from-rose-500/20 to-red-500/10",
        "border": "border-rose-500/30",
        "tagBg": "bg-rose-500/20 text-rose-400 border-rose-500/30",
        "description": "Grants flat +5% Affinity and empowers the whole squad when an ultimate inflicts debuffs.",
        "two_piece": sets["Ink of Combat"]["two_piece"],
        "four_piece": sets["Ink of Combat"]["four_piece"]
    },
    "Ink of Guidance": {
        "slug": "ink-of-guidance",
        "element": "Support/DPS",
        "archetype": "Ultimate Suppression Squad Buff",
        "color": "amber",
        "accent": "#f59e0b",
        "bgGradient": "from-amber-500/20 to-orange-500/10",
        "border": "border-amber-500/30",
        "tagBg": "bg-amber-500/20 text-amber-400 border-amber-500/30",
        "description": "Accelerates Ultimate charge rate and stacks squad-wide damage amplification during monster suppression.",
        "two_piece": sets["Ink of Guidance"]["two_piece"],
        "four_piece": sets["Ink of Guidance"]["four_piece"]
    },
    "Ink of Protection": {
        "slug": "ink-of-protection",
        "element": "Defense",
        "archetype": "Healing & Shield Enchancer",
        "color": "teal",
        "accent": "#14b8a6",
        "bgGradient": "from-teal-500/20 to-emerald-500/10",
        "border": "border-teal-500/30",
        "tagBg": "bg-teal-500/20 text-teal-400 border-teal-500/30",
        "description": "Accelerates Ultimate charge and amplifies heals/shields by +20% while bolstering squad damage.",
        "two_piece": sets["Ink of Protection"]["two_piece"],
        "four_piece": sets["Ink of Protection"]["four_piece"]
    },
    "Ink of Grace": {
        "slug": "ink-of-grace",
        "element": "Support",
        "archetype": "Buff Empowerer",
        "color": "pink",
        "accent": "#ec4899",
        "bgGradient": "from-pink-500/20 to-rose-500/10",
        "border": "border-pink-500/30",
        "tagBg": "bg-pink-500/20 text-pink-400 border-pink-500/30",
        "description": "Accelerates Ultimate charge rate and grants squad-wide +6.5% damage bonus whenever granting a buff.",
        "two_piece": sets["Ink of Grace"]["two_piece"],
        "four_piece": sets["Ink of Grace"]["four_piece"]
    },
    "Ink of Resonance": {
        "slug": "ink-of-resonance",
        "element": "Affinity/DPS",
        "archetype": "Sub-DPS / Off-Field Ultimate",
        "color": "indigo",
        "accent": "#6366f1",
        "bgGradient": "from-indigo-500/20 to-violet-500/10",
        "border": "border-indigo-500/30",
        "tagBg": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
        "description": "Grants +5% Affinity and a colossal +32% Ultimate damage when swapped off as non-Main Adventurer.",
        "two_piece": sets["Ink of Resonance"]["two_piece"],
        "four_piece": sets["Ink of Resonance"]["four_piece"]
    }
}

# Attach set counts and visages
for sname, smeta in set_meta.items():
    matching = [v['id'] for v in visages if sname in v['sets']]
    smeta['visageIds'] = matching
    smeta['count'] = len(matching)

# Clean up visages
enhanced_visages = []
for v in visages:
    is_radiant = v['name'].startswith('Radiant')
    enhanced_visages.append({
        "id": v['id'],
        "name": v['name'],
        "cost": v['cost'],
        "sets": v['sets'],
        "img": v['img'],
        "local_img": v['local_img'],
        "core_effect": v['core_effect'],
        "potential_effects": v['potential_effects'],
        "is_radiant": is_radiant,
        "primary_element": set_meta[v['sets'][0]]['element'] if v['sets'] else "None"
    })

print("Writing clean metadata...")
with open('data/sets_meta.json', 'w', encoding='utf-8') as f:
    json.dump(set_meta, f, indent=2)

with open('data/visages_clean.json', 'w', encoding='utf-8') as f:
    json.dump(enhanced_visages, f, indent=2)

print("Done! Visages count:", len(enhanced_visages), "Sets count:", len(set_meta))
