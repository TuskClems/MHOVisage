import glob
import re

for path in glob.glob('src/**/*.tsx', recursive=True):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # In Navbar
    content = content.replace('src="./images/rathalos.png"', 'src="https://img.gamewith.jp/img/e649449a958552684ab6d95ef6a1f7a0.png"')
    # In SetMatrix, LoadoutBuilder: v.id
    content = content.replace('src={`./images/${v.id}.png`}', 'src={v.base64_img || v.img}')
    # In VisageCard, VisageTable, VisageModal, RollFinder: visage.id
    content = content.replace('src={`./images/${visage.id}.png`}', 'src={visage.base64_img || visage.img}')
    # In VisageModal companions: comp.id
    content = content.replace('src={`./images/${comp.id}.png`}', 'src={comp.base64_img || comp.img}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated", path)

