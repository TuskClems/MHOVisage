import urllib.request
import concurrent.futures
import json
import re
import os

with open('visages_table.json', 'r', encoding='utf-8') as f:
    visages = json.load(f)

print(f"Total visages to scrape: {len(visages)}")

os.makedirs('data', exist_ok=True)
os.makedirs('images', exist_ok=True)

def scrape_one(v):
    url = "https://gamewith.ai" + v['slug']
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
        # 1. Core Effects
        core_m = re.search(r'<h2[^>]*>Core Effects</h2>\s*<div[^>]*><p[^>]*>(.*?)</p></div>', html, re.DOTALL)
        core_effect = core_m.group(1).strip() if core_m else ""
        if not core_effect:
            fallback = re.search(r'id="main"[^>]*>.*?<p[^>]*>(.*?)</p>', html, re.DOTALL)
            if fallback:
                core_effect = re.sub(r'<[^>]+>', '', fallback.group(1)).strip()

        # 2. Potential Effects
        pot_section = re.search(r'<h2[^>]*>Potential Effects</h2>\s*<div[^>]*>.*?<ul[^>]*>(.*?)</ul>', html, re.DOTALL)
        potential_effects = []
        if pot_section:
            items = re.findall(r'<li[^>]*>(.*?)</li>', pot_section.group(1), re.DOTALL)
            potential_effects = [re.sub(r'<[^>]+>', '', it).strip() for it in items if it.strip()]

        # 3. Image filename
        img_filename = v['slug'].split('/')[-1] + ".png"
        img_local_path = os.path.join('images', img_filename)
        if v['img'] and not os.path.exists(img_local_path):
            try:
                img_req = urllib.request.Request(v['img'], headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(img_req, timeout=10) as img_resp:
                    with open(img_local_path, 'wb') as img_f:
                        img_f.write(img_resp.read())
            except Exception as ie:
                print(f"Error downloading image for {v['name']}: {ie}")

        return {
            "id": v['slug'].split('/')[-1],
            "name": v['name'],
            "cost": v['cost'],
            "sets": v['sets'],
            "img": v['img'],
            "local_img": f"images/{img_filename}",
            "core_effect": core_effect,
            "potential_effects": potential_effects,
            "url": url
        }
    except Exception as e:
        print(f"Error scraping {v['name']}: {e}")
        return {
            "id": v['slug'].split('/')[-1],
            "name": v['name'],
            "cost": v['cost'],
            "sets": v['sets'],
            "img": v['img'],
            "local_img": "",
            "core_effect": "",
            "potential_effects": [],
            "url": url
        }

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    all_data = list(executor.map(scrape_one, visages))

with open('data/visages.json', 'w', encoding='utf-8') as out_f:
    json.dump(all_data, out_f, indent=2, ensure_ascii=False)

missing = [v['name'] for v in all_data if not v['core_effect']]
print(f"Finished. Visages with missing core effects: {len(missing)} {missing}")
