import json

with open('data/visages.json', 'r', encoding='utf-8') as f:
    visages = json.load(f)

for v in visages:
    if not v['core_effect']:
        print("Missing core effect:", v['name'], v['url'])
    if not v['potential_effects']:
        print("Missing potential effects:", v['name'], v['url'])
