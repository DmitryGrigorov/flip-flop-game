# Flip Flop 🪙

Can't decide? Flip a coin. A simple heads-or-tails decision maker — tap the coin, watch it spin, get your answer. Built with React + Vite, installable as a PWA, and packaged for Android with Capacitor.

## Features

- Realistic 3D coin-flip animation with a true 50/50 random outcome
- Customizable sides — relabel "Heads"/"Tails" to any two options (e.g. "Pizza" vs "Sushi")
- Running tally of results with a heads/tails ratio bar and recent-flip history, saved to `localStorage`
- Installable as a Progressive Web App (offline-capable, add to home screen)
- Android app shell via Capacitor, buildable to a `.apk`

## Getting started

### Prerequisites

To run the web app, install:

- [Node.js 22](https://nodejs.org/) — the required version is recorded in `.nvmrc`
- npm (included with Node.js)

Using [nvm](https://github.com/nvm-sh/nvm) is recommended:

```bash
nvm install
nvm use
npm install
```

To build or run the Android app locally, also install:

- JDK 17 or newer
- [Android Studio](https://developer.android.com/studio), including the Android SDK
- Android SDK Platform 36, Android SDK Build-Tools, and Platform-Tools (install them from Android Studio's SDK Manager)

Set `ANDROID_HOME` to your Android SDK directory, or create `android/local.properties`:

```properties
# Default Android Studio SDK location on macOS
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

If the SDK was installed using Homebrew's `android-commandlinetools`, its path is commonly:

```properties
sdk.dir=/opt/homebrew/share/android-commandlinetools
```

### Run in a browser

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

After installing the prerequisites above, select Node 22 and build:

```bash
nvm use
npm install
npm run android:build   # builds web assets, syncs Capacitor, runs the Gradle debug build
```

The APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`.

To run it on a physical Android device, enable **Developer options** and **USB debugging**, connect the device, and install the APK:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Alternatively, copy the APK to the device and open it there. Android may ask you to allow installation from that file manager or browser.

To open the project in Android Studio instead (e.g. to build a signed release APK/AAB):

```bash
npm run android:open
```

Whenever you change the web app, re-run `npm run cap:sync` before rebuilding the Android app.

## Tech stack

- React 19 + TypeScript + Vite
- `vite-plugin-pwa` for the service worker and web manifest
- Capacitor for the Android native wrapper
