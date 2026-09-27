# Gulshan Kumar — Portfolio

React + Vite se banaya gaya ek single-page portfolio. Isme aapka resume PDF
(`public/resume.pdf`) bhi already daala hua hai, taaki "Download resume"
button turant kaam kare.

## Apne details update karne ke liye

Poora content ek hi file me hai: **`src/data.js`** — yahin se naam, role,
summary, skills, experience, projects aur education edit karein. Design
touch ki zaroorat nahi, sirf text change karein.

Resume update karna ho to `public/resume.pdf` ko apni nayi file se replace
kar dein (same naam rakhein: `resume.pdf`).

## Local me chalane ke liye

```bash
npm install
npm run dev
```

Browser me `http://localhost:5173` khul jayega.

## Production build

```bash
npm run build
```

Output `dist/` folder me banega.

## Vercel par deploy karna

1. Is folder ko GitHub par ek naye repository me push karein (neeche steps).
2. [vercel.com](https://vercel.com) par jaake "Add New Project" se apna
   GitHub repo import karein.
3. Framework "Vite" auto-detect ho jayega — Build Command: `npm run build`,
   Output Directory: `dist`. Deploy dabaayein.
4. Kuch seconds me live link mil jayega, jise resume/LinkedIn me daal sakte
   hain.

## GitHub par upload karna

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Uske baad Vercel me wahi repo import kar dein — future me jab bhi `main`
branch par push karenge, site automatically redeploy ho jaayegi.
