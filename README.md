# 🕉️ Shiv Sutra PWA — शिव सूत्र

> **Know Yourself as Consciousness**  
> All 77 Shiva Sutras with Sanskrit, Hindi & English — installable PWA

---

## 📁 File Structure

```
shiv-sutra/
├── index.html              ← Main app (all HTML + CSS + JS)
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline support)
└── icons/
    ├── icon-192.png        ← Android home screen icon
    ├── icon-512.png        ← Splash / large icon
    └── apple-touch-icon.png← iOS home screen icon
```

---

## 🚀 Deploy on GitHub Pages (Step by Step)

### 1. Create a new GitHub repository
- Go to [github.com/new](https://github.com/new)
- Name it: `shiv-sutra` (or anything you like)
- Set to **Public**
- Click **Create repository**

### 2. Upload all files
- Click **"uploading an existing file"** or **"Add file → Upload files"**
- Upload these files maintaining the folder structure:
  - `index.html`
  - `manifest.json`
  - `sw.js`
  - `icons/icon-192.png`
  - `icons/icon-512.png`
  - `icons/apple-touch-icon.png`
- Commit with message: `Initial commit — Shiv Sutra PWA`

### 3. Enable GitHub Pages
- Go to repo **Settings → Pages**
- Under **Source**, select: `Deploy from a branch`
- Branch: `main` | Folder: `/ (root)`
- Click **Save**
- Wait 1–2 minutes

### 4. Access your PWA
Your app will be live at:
```
https://<your-username>.github.io/shiv-sutra/
```

---

## 📱 Install as PWA on Android
1. Open the URL in **Chrome**
2. Tap the **⋮ menu → "Add to Home screen"**
3. Tap **Add** — app icon appears on home screen
4. Opens in standalone mode (no browser UI)

## 🍎 Install on iPhone (iOS)
1. Open in **Safari**
2. Tap **Share → "Add to Home Screen"**
3. Tap **Add**

---

## ✨ Features
- 🌙 Dark / ☀️ Light mode (saved in localStorage)
- हिंदी / English translation toggle
- ★ Favorite sutras (saved in localStorage)
- All 3 chapters with dividers
- Scroll-triggered fade-in animation
- Fully offline after first visit

---

*ॐ नमः शिवाय*
