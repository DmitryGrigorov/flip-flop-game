# Flip Flop 🪙

Can't decide? Flip a coin. A simple heads-or-tails decision maker — tap the coin, watch it spin, get your answer. Built with React + Vite, installable as a PWA, and packaged for Android with Capacitor.

## Features

- Realistic 3D coin-flip animation with a true 50/50 random outcome
- Customizable sides — relabel "Heads"/"Tails" to any two options (e.g. "Pizza" vs "Sushi")
- Running tally of results with a heads/tails ratio bar and recent-flip history, saved to `localStorage`
- Installable as a Progressive Web App (offline-capable, add to home screen)
- Android app shell via Capacitor, buildable to a `.apk`

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Build for the web

```bash
npm run build   # outputs to dist/, includes the PWA service worker + manifest
npm run preview # serve the production build locally
```

Deploy the `dist/` folder to any static host (GitHub Pages, Netlify, Vercel, etc.) to make the game installable as a PWA.

## Android app (.apk)

The native Android project lives in `android/` (generated with [Capacitor](https://capacitorjs.com/)) and is committed to the repo.

### Option A — Automatic build via GitHub Actions

Every push to `main` (and manual runs via the *Actions* tab → **Build Android APK** → *Run workflow*) builds a debug `.apk` and uploads it as a workflow artifact you can download and install directly — no local Android SDK required.

### Option B — Build locally

Requires [Android Studio](https://developer.android.com/studio) (or just the Android SDK + command-line tools) and a JDK.

```bash
npm run android:build   # builds web assets, syncs Capacitor, runs the Gradle debug build
```

The APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`.

To open the project in Android Studio instead (e.g. to build a signed release APK/AAB):

```bash
npm run android:open
```

Whenever you change the web app, re-run `npm run cap:sync` before rebuilding the Android app.

## Tech stack

- React 19 + TypeScript + Vite
- `vite-plugin-pwa` for the service worker and web manifest
- Capacitor for the Android native wrapper
