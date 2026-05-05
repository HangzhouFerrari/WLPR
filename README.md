# WLPR v2

Editorial wallpaper PWA for Android. Dark/light theme, multilingual (EN/NL), APK live wallpapers with install guide, pulls static wallpapers from [Q-BOCC](https://github.com/HangzhouFerrari/Q-BOCC).

---

## Features

- **Light / Dark / Auto theme** — follows system by default, overridable in Settings
- **English & Dutch** — switch in Settings → Language
- **Static wallpapers** — served directly from the Q-BOCC GitHub repo
- **Live wallpapers (MP4)** — add to `wallpapers/live/`
- **APK live wallpapers** — add to `wallpapers/apk/`; each has a full install guide in-app
- **Save / favourites** — persisted to localStorage (works correctly across all pages)
- **Smooth page transitions** — fade + slide on every navigation
- **PWA** — installable on Android, offline-capable

---

## Folder Structure

```
wlpr/
├── index.html
├── browse.html
├── detail.html
├── saved.html
├── search.html
├── settings.html
├── wallpapers.json          ← edit this to add/remove wallpapers
├── manifest.json
├── service-worker.js
├── assets/
│   ├── style.css            ← all styles + light/dark CSS vars
│   ├── app.js               ← all page logic
│   ├── data.js              ← data layer, theme manager, saved logic
│   ├── i18n.js              ← EN + NL translations
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
└── wallpapers/
    ├── live/                ← .mp4 + _preview.jpg
    └── apk/                 ← .apk + _preview.jpg
```

Static wallpapers from Q-BOCC are referenced by path and fetched directly from `raw.githubusercontent.com/HangzhouFerrari/Q-BOCC/main/`. No copying needed.

---

## Quick Setup

### 1. Fork & clone

```bash
git clone https://github.com/YOUR_USERNAME/wlpr.git
cd wlpr
```

### 2. Update `assets/data.js` (only needed for your own live/APK wallpapers)

```js
const GITHUB_USER   = 'YOUR_USERNAME';
const GITHUB_REPO   = 'wlpr';
const GITHUB_BRANCH = 'main';
```

### 3. Add a static wallpaper

Add an entry to `wallpapers.json` → `"static"` array:

```json
{
  "id": "s013",
  "title": "MY WALLPAPER",
  "category": "abstract",
  "color": "#111",
  "accent": "#fff",
  "tags": ["dark", "minimal"],
  "file": "Library/static wallpapers/standard/My_wallpaper/cover.png",
  "new": true,
  "source": "qbocc"
}
```

### 4. Add an APK live wallpaper

1. Put the `.apk` and a preview image in `wallpapers/apk/`
2. Add to `wallpapers.json` → `"apk"` array:

```json
{
  "id": "a006",
  "title": "MY LIVE",
  "category": "apk",
  "color": "#0a0a0a",
  "accent": "#00ffaa",
  "tags": ["dark", "animated"],
  "preview": "wallpapers/apk/my_live_preview.jpg",
  "file": "wallpapers/apk/my_live.apk",
  "new": true,
  "size": "3.5 MB",
  "requires": "Android 8.0+"
}
```

The in-app install guide (6 steps + note) is rendered automatically for all APK-type wallpapers, in the user's chosen language.

### 5. Deploy

Enable GitHub Pages: **Settings → Pages → Deploy from branch `main` → `/ (root)`**

Auto-deploy via `.github/workflows/deploy.yml` on every push.

---

## Theming

| Setting | Behaviour |
|---------|-----------|
| Auto    | Follows `prefers-color-scheme` |
| Dark    | Forces dark always |
| Light   | Forces light always |

CSS variables are in `assets/style.css` under `:root` (dark) and `[data-theme="light"]`.

---

## Languages

| Code | Name |
|------|------|
| `en` | English (default) |
| `nl` | Nederlands |

Add more in `assets/i18n.js` by adding a new key to `TRANSLATIONS`.

---

## License

MIT
