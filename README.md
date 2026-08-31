# 禅 ZENJI (ゼンジ) // Cyberpunk Anime Streetwear Archive

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-pink?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

A high-end, cyberpunk/anime-inspired streetwear e-commerce web application engineered for the fictional dystopian fashion label **"ZENJI" (ゼンジ)**. Synthesizing Neo-Tokyo subcultures, ultra-heavyweight textiles (460–520 GSM), and tactical hardware ergonomics.

---

## ⚡ Tech Stack Architecture

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Boundaries)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with bespoke Cyberpunk & Brutalist Design Tokens
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with client-safe `localStorage` persistence
- **Animations & Gestures**: [Framer Motion](https://www.framer.com/motion/) (Slide-overs, Layout animations, Page transitions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) for checkout celebrations

---

## 🎨 Design System & Color Palette

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Dark Obsidian** | `#0A0A0C` | Primary deep space background |
| **Surface Charcoal** | `#141418` | Elevated card surfaces and modals |
| **Elevated Border** | `#27272A` | Structural tech borders and dividers |
| **Neon Crimson / Rose** | `#E11D48` | Primary accent, CTAs, and glowing highlights |
| **Cyber Gold** | `#F59E0B` | Fabric weights (GSM), security badges, and alerts |
| **Cyberpunk White** | `#FAFAFA` | High-contrast headers and editorial typography |

---

## 🚀 Key Features

### 1. Dystopian Landing Page (`src/app/page.tsx`)
- **Atmospheric Hero**: Subtle dark street imagery, cyber grid backdrop, kanji typography, and telemetry stats counter.
- **Spec & Quality Showcase**: 3-column feature spotlight detailing 460+ GSM French Terry, serialized limited runs, and Tokyo underground anime aesthetics.
- **Continuous Marquee**: Smooth infinite scrolling ticker with pause-on-hover functionality.

### 2. Instant Catalog & Multi-Axis Filtering (`src/app/shop/page.tsx`)
- **Real-Time Client Filtering**: Instant category switching (Hoodies, Tees, Pants, Knitwear, Accessories).
- **Silhouette Fit Selector**: Filter by Oversized, Boxy, or Tactical cuts with zero page reloads.
- **Sorting Modes**: Featured, Price Ascending/Descending, Low Stock First, and Heaviest GSM First.
- **Keyword Search & Empty State**: Live search with instant "Reset All Filters" recovery.

### 3. Dynamic Product Detail Page (`src/app/product/[id]/page.tsx`)
- **Vertical High-Res Gallery**: Multi-angle sticky thumbnail gallery with main zoom stage.
- **Stock Allocation Bar**: Real-time batch capacity meter (e.g. 78% reserved).
- **Interactive Fit & Size Guide**: Modal table showing Chest, Length, and Shoulder measurements in both inches and centimeters.
- **Technical Accordions**: Textile Matrix, Global Shipping Telemetry, and Crypto-NFC Authentication policies.
- **Complete The Fit**: Cross-sell recommendation grid.

### 4. Motion Cart Drawer & Gamified Checkout (`src/components/CartDrawer.tsx`)
- **Framer Motion Slide-Over**: Smooth right-side drawer with backdrop blur and ESC key listener.
- **Free Shipping Tier Meter**: Dynamic progress bar calculating remaining spend to unlock free express shipping over $120.
- **Promo Code Engine**: Real-time cipher validation (enter `ZENJI10` for 10% off).
- **Simulated Checkout with Confetti**: Multi-tier particle celebration and encrypted order manifest generation.

### 5. Mobile-First Ergonomics (`src/components/MobileBottomBar.tsx`)
- Sleek sticky glassmorphism bottom action bar for mobile devices (< 768px) with live bag counter badge.

---

## 📦 Getting Started Locally

### Prerequisites
- Node.js `v18.17.0` or higher
- npm `v9+` or pnpm / yarn

### Installation

1. **Clone the repository and enter the directory**:
   ```bash
   cd zenji-project
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   live URL

### Production Build & Typecheck

```bash
# Verify TypeScript strict types
npx tsc --noEmit

# Generate optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📂 Project Directory Structure

```
zenji-project/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css          # Cyberpunk utilities, custom scrollbars, scanlines
│   │   ├── layout.tsx           # SEO metadata, OpenGraph, PageTransition & CartDrawer
│   │   ├── page.tsx             # Hero, Spec Showcase, Drop 001 Featured Grid
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Dynamic PDP with Size Guide Modal & Accordions
│   │   └── shop/
│   │       └── page.tsx         # Shop Catalog with instant filter/sort matrix
│   ├── components/
│   │   ├── CartDrawer.tsx       # Framer Motion slide-over cart & free shipping meter
│   │   ├── Footer.tsx           # Dark editorial footer with newsletter micro-interaction
│   │   ├── Marquee.tsx          # Infinite scrolling release ticker
│   │   ├── MobileBottomBar.tsx  # Sticky bottom action bar for mobile
│   │   ├── Navbar.tsx           # Cyberpunk sticky blur header with kanji branding
│   │   ├── PageTransition.tsx   # Framer Motion route wrapper
│   │   ├── ProductCard.tsx      # Dual-image hover flip, GSM tags, size selector pills
│   │   └── ProductModal.tsx     # Quick-view modal with full garment specs
│   ├── data/
│   │   └── products.ts          # 6 high-detail anime streetwear items with GSM & lore
│   ├── lib/
│   │   └── utils.ts             # Tailwind class merge & currency formatting helpers
│   ├── store/
│   │   └── useCartStore.ts      # Persistent Zustand state with inventory control
│   └── types/
│       └── product.ts           # Product, Category, and Size type definitions
├── package.json
├── tailwind.config.ts           # Color tokens, keyframes, cyber grids
└── tsconfig.json
```

---

## ⛩️ License & Credits

Designed & Developed for **ZENJI APPAREL RESEARCH CORP. // 全著作権所有 // TOKYO, JP**.
