# WLPR v2

Editorial wallpaper PWA for Android. Dark/light theme, multilingual (EN/NL), APK live wallpapers with install guide, pulls static wallpapers from [Q-BOCC](https://github.com/HangzhouFerrari/Q-BOCC).

---

## Hoe voeg ik een collectie-ID toe aan wallpapers?

Collecties werken via een `collectionId` veld op elke wallpaper in `wallpapers.json`.

### Stap 1 — Zoek het collection-ID op

Open `wallpapers.json` en kijk in het `"collections"` array. Elk item heeft een `"id"`:

```json
"collections": [
  { "id": "c001", "title": "4000 WALLPAPERS", ... },
  { "id": "c002", "title": "SILK", ... },
  ...
]
```

### Stap 2 — Voeg `collectionId` toe aan wallpapers

Ga naar het `"static"` array en voeg `"collectionId": "c002"` toe aan elke wallpaper die bij die collectie hoort:

```json
"static": [
  {
    "id": "s013",
    "title": "SILK WAVE",
    "category": "abstract",
    "color": "#f0e0d0",
    "accent": "#c0826a",
    "tags": ["silk", "soft"],
    "file": "Library/static wallpapers/collections/Silk/silk_wave.png",
    "new": false,
    "source": "qbocc",
    "collectionId": "c002"
  }
]
```

### Stap 3 — Resultaat

Als je nu op de "SILK" collectiekaart tikt, opent `collection.html?id=c002` en worden alle wallpapers met `"collectionId": "c002"` getoond.

**Zolang geen wallpapers een `collectionId` hebben**, toont de collectiepagina alle statische wallpapers als fallback zodat de pagina nooit leeg is.

---

## Bestandsstructuur

```
wlpr/
├── index.html            Home
├── browse.html           Bladeren + filteren
├── detail.html           Wallpaper detail, download, share
├── collection.html       Collectie-overzicht
├── saved.html            Opgeslagen wallpapers
├── search.html           Zoeken
├── settings.html         Instellingen (thema, taal, rastergrootte)
├── 404.html              Foutpagina
├── wallpapers.json       Alle wallpaper data ← hier bewerk je
├── manifest.json
├── service-worker.js
└── assets/
    ├── style.css
    ├── app.js
    ├── data.js
    ├── i18n.js
    └── icons/
```

---

## Wallpaper toevoegen

### Statisch (uit Q-BOCC repo)

```json
{
  "id": "s020",
  "title": "MIJN ACHTERGROND",
  "category": "abstract",
  "color": "#111",
  "accent": "#fff",
  "tags": ["dark", "minimal"],
  "file": "Library/static wallpapers/standard/Mijn_achtergrond/cover.png",
  "new": true,
  "source": "qbocc"
}
```

Het `file` pad moet overeenkomen met het exacte pad in de Q-BOCC GitHub repo.

### APK live wallpaper

```json
{
  "id": "a006",
  "title": "MIJN LIVE",
  "category": "apk",
  "color": "#0a0a0a",
  "accent": "#00ffaa",
  "tags": ["dark", "animated"],
  "preview": "wallpapers/apk/mijn_live_preview.jpg",
  "file": "wallpapers/apk/mijn_live.apk",
  "new": true,
  "size": "3.5 MB",
  "requires": "Android 8.0+"
}
```

---

## Thema

| Instelling | Gedrag |
|---|---|
| Auto | Volgt `prefers-color-scheme` van het systeem |
| Dark | Altijd donker |
| Light | Altijd licht |

---

## Talen

| Code | Naam |
|---|---|
| `en` | English |
| `nl` | Nederlands |

Extra talen toevoegen: voeg een nieuwe sleutel toe aan `TRANSLATIONS` in `assets/i18n.js`.

---

## Deployen

GitHub Pages: **Settings → Pages → Deploy from branch `main` → `/ (root)`**

Auto-deploy via `.github/workflows/deploy.yml`.

---

## License

MIT
