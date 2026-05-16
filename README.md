# ClearCut AI — Background Remover

A production-ready AI Background Remover web app built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and the **remove.bg API**.

## ✨ Features

- **AI-Powered Background Removal** via remove.bg API
- **Drag & Drop Upload** with file validation
- **Before/After Slider** — interactive comparison
- **Side-by-Side View** toggle
- **HD Transparent PNG Download** — one-click
- **Dark Mode** with localStorage persistence
- **Smooth Animations** powered by Framer Motion
- **Glassmorphism + Gradient UI** — premium SaaS design
- **Toast Notifications** for all states
- **Mobile-First Responsive Design**
- **Secure Server-Side API** — API key never exposed

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
REMOVE_BG_API_KEY=your_actual_remove_bg_api_key_here
```

Get your free API key at [remove.bg/api](https://www.remove.bg/api)

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
bg-remover/
├── app/
│   ├── api/
│   │   └── remove-bg/
│   │       └── route.ts          # Secure server-side API route
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky navigation with mobile menu
│   │   ├── HeroSection.tsx       # Animated hero with CTA
│   │   ├── UploadSection.tsx     # Upload orchestration
│   │   ├── UploadBox.tsx         # Drag & drop upload box
│   │   ├── ResultPreview.tsx     # Result display + download
│   │   ├── BeforeAfterSlider.tsx # Interactive comparison slider
│   │   ├── FeatureCards.tsx      # Feature grid section
│   │   ├── Footer.tsx            # Footer with links
│   │   └── ThemeToggle.tsx       # Dark/light mode toggle
│   ├── hooks/
│   │   └── useBackgroundRemover.ts # Core processing logic
│   ├── lib/
│   │   └── utils.ts              # Utilities, validation, helpers
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── globals.css               # Global styles + fonts
│   ├── layout.tsx                # Root layout + metadata
│   └── page.tsx                  # Main page composition
├── .env.local                    # API keys (never commit!)
├── .env.example                  # Template for .env.local
├── .gitignore                    # Excludes .env.local
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind + custom design tokens
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 🔐 Security

- **API key stored server-side** in `.env.local`
- **Never exposed to the browser/client**
- Image processing happens in Next.js API route (`/api/remove-bg`)
- `.env.local` is in `.gitignore` — never committed

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repository
4. Add environment variable:
   - **Name:** `REMOVE_BG_API_KEY`
   - **Value:** your remove.bg API key
5. Click **Deploy** ✅

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework + API routes |
| TypeScript | Type safety |
| Tailwind CSS | Styling + dark mode |
| Framer Motion | Animations |
| react-dropzone | Drag & drop uploads |
| react-hot-toast | Toast notifications |
| Lucide React | Icons |
| remove.bg API | AI background removal |

---

## 🎨 Design System

- **Font:** Playfair Display (display) + DM Sans (body)
- **Colors:** Brand blue (#0e96e0) + Accent purple (#d946ef)
- **Style:** Glassmorphism, gradient backgrounds, floating blobs
- **Dark Mode:** System preference + manual toggle with localStorage

---

## 📝 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `REMOVE_BG_API_KEY` | Your remove.bg API key | ✅ Yes |

---

## 🤝 License

MIT License — free for personal and commercial use.
