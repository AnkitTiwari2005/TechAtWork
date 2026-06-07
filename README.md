<div align="center">

<img src="public/favicon.svg" width="80" height="80" alt="Tech@Work Logo" />

# Tech@Work — Android App

### AI-Driven Digital Transformation · Mobile Application

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Android](https://img.shields.io/badge/Android-APK-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://developer.android.com)

**A premium Android application for Tech@Work — built with React, Vite, and Capacitor.**  
Purpose-built for mobile. Not a web wrapper.

[🌐 Live Website](https://tech-work-mu.vercel.app) · [📦 Download APK](#-download-apk) · [🚀 Get Started](#-getting-started)

</div>

---

## 📱 What Is This?

This is the official **Tech@Work mobile app** — a B2B AI consultancy application that lets potential clients explore services, view case studies, and get in touch directly via WhatsApp or email.

The app is a full **React + Capacitor** mobile application compiled to a native Android APK. It replicates and **surpasses** the [Tech@Work website](https://tech-work-mu.vercel.app) with:

- Native haptic feedback
- Offline-capable lead history
- WhatsApp floating action button always accessible
- Swipeable carousels and spring-animated bottom sheets
- Native share sheet for case studies
- Dark status bar integration

---

## 📦 Download APK

> **Direct install on any Android device (Android 7+)**

```
TechAtWork-debug.apk  —  41.46 MB  —  Debug Build
```

1. Transfer `TechAtWork-debug.apk` to your Android device
2. Open the file → tap **Install**
3. Allow "Install from unknown sources" if prompted

---

## ✨ Features

### 6 Screens

| Screen | Description |
|---|---|
| 🌟 **Splash** | Animated logo with pink glow pulse, auto-navigates after 2.5s |
| 🏠 **Home** | Video hero, blur-text headline, animated stats, methodology stepper, swipeable case study carousel |
| ⚡ **Services** | Gears video hero, 5 accordion service cards, AI infrastructure grid |
| 💼 **Case Studies** | Filter chips, vertical cards, bottom sheet detail view, native share |
| ℹ️ **About** | Mission, animated counters, core values, expertise marquee |
| ✉️ **Contact** | Dual-submit form (WhatsApp + Email), click-to-call, haptic feedback |

### Design System

- **Color**: `#ffafd6` pink primary · `#131313` dark background · glass morphism surfaces
- **Fonts**: Space Grotesk (headlines) + Inter (body)
- **Animations**: Framer Motion — blur-text, count-up, spring accordion, bottom sheet
- **Texture**: SVG film grain overlay at 4% opacity
- **Nav**: 5-tab bottom navigation with animated active indicator

### Capacitor Plugins

| Plugin | Used For |
|---|---|
| `@capacitor/browser` | WhatsApp deep links, Gmail, tel: calls |
| `@capacitor/haptics` | Tactile feedback on CTAs and form submit |
| `@capacitor/preferences` | Lead history + form prefill persistence |
| `@capacitor/share` | Native Android share sheet on case studies |
| `@capacitor/splash-screen` | 2s branded splash screen |
| `@capacitor/status-bar` | Dark status bar matching app background |

---

## 🏗️ Tech Stack

```
Frontend    →  React 19 + TypeScript + Vite 6
Styling     →  Tailwind CSS 3 (brand design tokens)
Animation   →  Framer Motion 12
State       →  Zustand 5
HTTP        →  Axios (→ Vercel serverless API)
Mobile      →  Capacitor 7 (Android)
Build       →  Gradle 8.11 + Android SDK
```

---

## 📁 Project Structure

```
TechAtWork/
├── 📱 TechAtWork-debug.apk       ← Ready-to-install Android APK
├── android/                       ← Capacitor Android project
│   ├── app/src/main/
│   │   ├── AndroidManifest.xml
│   │   └── java/com/techatwork/app/MainActivity.java
│   └── gradlew.bat
├── public/
│   └── assets/
│       ├── hero-video.mp4         ← Robotic face animation
│       ├── gears-video.mp4        ← Interlocking gears
│       ├── houserve.png
│       ├── shuddham.png
│       └── onemint.png
└── src/
    ├── App.tsx                    ← Router + page transitions
    ├── index.css                  ← Full design system
    ├── screens/
    │   ├── SplashScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── ServicesScreen.tsx
    │   ├── CaseStudiesScreen.tsx
    │   ├── AboutScreen.tsx
    │   └── ContactScreen.tsx
    ├── components/
    │   ├── ui/                    ← GlassCard, BlurText, StatCounter...
    │   ├── features/              ← WhatsAppFAB, ServiceCard, ContactForm...
    │   └── layout/                ← BottomNav, AppShell
    ├── store/
    │   └── useAppStore.ts         ← Zustand (leads, keyboard, prefill)
    └── lib/
        ├── api.ts                 ← Axios → Vercel API
        ├── haptics.ts             ← Capacitor haptics wrapper
        └── preferences.ts        ← Capacitor preferences wrapper
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Android Studio + Android SDK (for APK builds)

### Run in Browser (Dev Mode)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — use Chrome DevTools → Device Toolbar (Ctrl+Shift+M) for mobile preview.

### Build Production Web App

```bash
npm run build
```

### Build Android APK

```bash
# Sync web build to Android
npm run build
npx cap sync android

# Build debug APK via Gradle
cd android
./gradlew assembleDebug

# APK output location:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Open in Android Studio

```bash
npx cap open android
```

---

## 🔌 API Configuration

The contact form calls the live Vercel serverless API:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/contact` | POST | Submit inquiry → sends email via Resend |
| `/api/health` | GET | Health check |

**Base URL:** `https://tech-work-mu.vercel.app`

**WhatsApp:** `+91 98117 97407`

To change these, edit:
- [`src/lib/api.ts`](src/lib/api.ts) — API base URL
- [`src/components/features/WhatsAppFAB.tsx`](src/components/features/WhatsAppFAB.tsx) — WhatsApp number

---

## 📊 Build Stats

```
✓ 539 modules transformed
✓ 247 Gradle tasks executed
✓ 6 Capacitor plugins registered
✓ 0 TypeScript errors
✓ Build time: ~11 minutes (first run, cached after)
```

---

## 🗺️ Roadmap

- [ ] Custom splash screen image + branded app icon
- [ ] Push notifications via Firebase + `@capacitor/push-notifications`
- [ ] Supabase backend for cloud lead management
- [ ] Admin dashboard to view/manage inquiries
- [ ] Play Store signed release build (AAB)
- [ ] Light mode theme toggle
- [ ] Animated onboarding carousel (3 screens, first launch)
- [ ] Blog / insights feed

---

## 📄 License

This project is proprietary software belonging to **Tech@Work**.  
All rights reserved © 2026 Tech@Work.

---

<div align="center">

Built with ❤️ using **React + Capacitor**

[🌐 tech-work-mu.vercel.app](https://tech-work-mu.vercel.app) · [💬 WhatsApp Us](https://api.whatsapp.com/send/?phone=919811797407)

</div>
