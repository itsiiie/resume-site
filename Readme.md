# 🚀 My Portfolio

A dark minimal portfolio with neon cyan accents, animated particles, parallax effects, and a dedicated resume page.

## ✅ What's Inside

```
portfolio/
├── index.html                    → Main portfolio page
├── resume.html                   → Dedicated resume page (HTML + PDF embed)
├── assets/
│   ├── css/style.css             → All styles
│   ├── js/main.js                → Animations, particles, typed text
│   └── images/resume.pdf         → ← Add your resume PDF here
└── .github/workflows/deploy.yml  → Auto-deploy to GitHub Pages
```

## 🛠 Setup in 5 Minutes

### 1. Clone & Personalize
Find and replace these placeholders in both HTML files:
- `Your Name` → your actual name
- `YN` → your initials (nav logo)
- `yourusername` → your GitHub username
- `your@email.com` → your email
- `Your College Name` → your college
- Update projects, experience, skills to match yours

### 2. Add Your Resume PDF
Drop your resume PDF at:
```
assets/images/resume.pdf
```

### 3. Update GitHub Stats
In `index.html`, replace `yourusername` in both GitHub stats image URLs:
```html
https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&...
```

### 4. Push to GitHub
```bash
git init
git add .
git commit -m "initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

> For GitHub Pages: repo name MUST be `yourusername.github.io`

### 5. Enable GitHub Pages
- Go to repo → Settings → Pages
- Source: **GitHub Actions**
- Push to main → auto deploys ✅

---

## ➕ Adding a New Project

Copy this block in `index.html` inside `#projects-grid`:

```html
<div class="project-card reveal-up">
  <div class="project-header">
    <div class="project-icon"><i class="fas fa-YOUR-ICON"></i></div>
    <div class="project-links">
      <a href="GITHUB_LINK" target="_blank"><i class="fab fa-github"></i></a>
      <a href="LIVE_LINK" target="_blank"><i class="fas fa-external-link-alt"></i></a>
    </div>
  </div>
  <h3 class="project-title">Project Name</h3>
  <p class="project-desc">What it does and why it matters.</p>
  <div class="project-tags">
    <span>Tech1</span><span>Tech2</span>
  </div>
</div>
```

## 🌐 Custom Domain (Optional)

Buy a `.dev` or `.tech` domain (~₹800/yr on Namecheap/GoDaddy).

1. Add a `CNAME` file to root with your domain: `yourname.dev`
2. Point DNS → `yourusername.github.io`
3. Enable custom domain in GitHub Pages settings

---

## 🔧 Customization

| Thing to Change | Where |
|---|---|
| Name, bio, links | `index.html` & `resume.html` |
| Neon color | `--neon` in `:root` in `style.css` |
| Typing phrases | `phrases[]` array in `main.js` |
| Particle count | `PARTICLE_COUNT` in `main.js` |
| Skills / experience | Directly in `index.html` |

---

Built with plain HTML/CSS/JS · Deployed via GitHub Actions