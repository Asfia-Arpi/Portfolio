# Asfia Haque Arpi — Portfolio (Evergreen theme)

React + Vite + TypeScript + Tailwind CSS. Single-page, light-mode, fully responsive.
All content lives in `src/data/` — you rarely need to touch the components.

## 1. Run it locally (VS Code)

1. Install **Node.js 20 or newer** from https://nodejs.org (check with `node -v`).
2. Open this folder in VS Code (`File → Open Folder`).
3. Open the terminal (`Ctrl + ``) and run:

```bash
npm install      # one time
npm run dev      # starts the site at http://localhost:5173
```

Other commands: `npm run build` (production build into `dist/`), `npm run preview` (test the build), `npm run typecheck`.

## 2. Folder structure

```
public/
  assets/            profile.jpg, foodpanda-dashboard.jpg, thesis-*.jpg   ← images
  files/             Asfia_Haque_Arpi_CV.pdf  (clean standalone 2-page CV)  ← Resume button
  favicon.svg
src/
  data/              ← EDIT HERE
    profile.ts         name, email, GitHub, LinkedIn, photo, CV path, about text
    skills.ts          skill groups
    projects.ts        project cards + detail pages
    research.ts        thesis content and verified results
    foodpanda.ts       dashboard KPIs, chart data, DAX measures
    education.ts  certifications.ts
  components/        one file per section (Hero, Projects, Research, ...)
  hooks/             scroll highlight + count-up animation
  index.css          Tailwind + small custom styles
tailwind.config.js   Evergreen colours (ivory, sage, mint, teal, forest)
```

## 3. How to update things

| I want to change… | Edit this |
|---|---|
| Email, GitHub, LinkedIn, about text | `src/data/profile.ts` |
| Profile photo | replace `public/assets/profile.jpg` (keep the name) |
| CV | replace `public/files/Asfia_Haque_Arpi_CV.pdf` (keep the name). Keep it CV-only: no certificates or other documents. |
| Add a GitHub repo to a project | `src/data/projects.ts` → that project's `links: { repo: "https://github.com/Asfia-Arpi/REPO" }`. The button appears automatically; it stays hidden while empty. |
| Add a live demo (e.g. published Power BI link) | same place → `links: { demo: "https://..." }` |
| Mark a project complete | change `status` to `"completed"` |
| Add a certificate | `src/data/certifications.ts` — only real IDs and links |
| Thesis dataset name/link, paper link | `src/data/research.ts` (`links`) and `projects.ts` (`dataset.source`) |
| Add coursework / achievements | `src/data/education.ts` (hidden while empty) |
| Colours | `tailwind.config.js` → `colors` |

The fact tiles in the About section (project and certification counts) are calculated from these files, so they update automatically. Only add finished projects — planned or unfinished work should not be listed.

## 4. Contact

By default the Contact section shows your email, LinkedIn, GitHub and a **"Let's connect"** email button (a normal `mailto:` link). Nothing is displayed that could look broken.

To show a working contact form (free):
1. Create a form at https://formspree.io and copy its endpoint URL.
2. Create a file named `.env` in the project root:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/yourFormId
   ```
3. Restart `npm run dev` (and add the same variable in your hosting dashboard when you deploy).

The form only appears when this variable exists, and it shows success only when the service accepts the message.

## 5. Deploy

### Vercel (easiest)
1. Push this folder to a GitHub repository.
2. Go to https://vercel.com → *Add New → Project* → import the repo.
3. Framework preset: **Vite** (detected automatically). Click **Deploy**.

### Netlify
Build command `npm run build`, publish directory `dist`.

### GitHub Pages
1. Push the repo to GitHub.
2. `npm install --save-dev gh-pages`
3. In `package.json` add under `scripts`: `"deploy": "npm run build && gh-pages -d dist"`
4. Run `npm run deploy`, then in the repo go to *Settings → Pages* and choose the `gh-pages` branch.

`vite.config.ts` already uses `base: "./"`, so it works on sub-paths.

## 6. Final testing checklist

- [ ] 375px, 768px and 1280px+: no horizontal scrolling; mobile menu opens and closes (Escape too)
- [ ] Every nav link scrolls to its section; the active link highlights ("Education" stays active over Certifications)
- [ ] **Resume** (navbar) opens the 2-page CV only — no certificates inside
- [ ] Project filters (All / Data Analytics / Business Intelligence / Machine Learning / Research / Software Engineering) and search work
- [ ] "View Details" opens the dialog; Escape / X / outside click closes it; focus returns to the button
- [ ] GitHub buttons open the real repositories; no "Live Demo" button appears until you add a `demo` URL
- [ ] The three "Verify credential" links open (check the Coursera link especially)
- [ ] "Let's connect" opens your email app
- [ ] Tab through the page: visible focus ring everywhere; "Skip to content" appears on first Tab
- [ ] Turn on *Reduce motion* in your OS: animations stop
- [ ] Lighthouse in Chrome DevTools (aim for 90+ accessibility)

## 7. Content notes

- Primary positioning is Data Analyst / BI Specialist; AI/ML and software engineering are supporting strengths.
- The Foodpanda project uses a public Kaggle dataset that is not verified, so it is labelled "Practice dataset".
- Thesis figures come from the final presentation. The 95.95% is calculated from the confusion matrix (466 / 38 / 26 / 1050) and matches the presentation's conclusion.
- The thesis is shown as research, not a clinical product.
- Education uses the CV value (CGPA 3.29). Change it in `src/data/education.ts` if it is different.
