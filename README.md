# 🐉 Monster Hunter Outlanders — Visage Hunting Kiosk

An interactive, touch-friendly 3-Step Kiosk web application for **Monster Hunter Outlanders** detailing monster visages, ink types, innate perks, 2-piece and 4-piece set activations, and cost values.

---

## 🚀 Live Demo & GitHub Pages

This repository is pre-configured with automated **GitHub Actions** deployment.

### 🌐 Deploying to your own GitHub Pages:

1. **Create a new GitHub Repository**:
   - Go to [https://github.com/new](https://github.com/new).
   - Enter a name (e.g. `mho-visages`).
   - Set visibility to **Public**.
   - Click **Create repository**.

2. **Push this code to GitHub**:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your repo, go to **Settings** > **Pages**.
   - Under **Source**, select **GitHub Actions**.
   - GitHub will automatically run the build and publish your website at:
     `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 🕹️ Features

- **Step 1: Choose Ink Type / Element** (Fire, Ice, Thunder, Water, Dragon, Physical, etc.) with set perk previews.
- **Step 2: Choose Monster to Hunt** (Filtered by the chosen ink type, with Cost 4, Cost 3, and Cost 1 filters).
- **Step 3: Monster & Perk Dossier** (Cost tier breakdown, innate monster perks, 2pc & 4pc bonuses, and companion monsters).
- **Sub-Stat Roll Finder**: Select any desired roll (e.g. Affinity, Crit DMG, Ele. Crit DMG) to see which monsters drop it.
- **Cost & Perks Guide**: Explains why monsters cost 4, 3, or 1 and how set bonuses activate.
- **Zero Config Relative Paths**: Uses `base: './'` so it works on any GitHub repository URL.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build single-file production bundle
npm run build
```
