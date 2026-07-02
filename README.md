# ⭐ SightWord Journey

A friendly, offline-capable web app that helps young children (Std 1–4, ages ~6–10)
learn **sight words** with sound and phonics. Built with pure **HTML, CSS, and vanilla
JavaScript** — no frameworks, no build step, no dependencies.

## ✨ Features

- **164 sight words** across Std 1–4 (Dolch / Fry based), each with an example sentence.
- **Listen** to each word (Web Speech API), with a **Slow** mode for tricky words.
- **Sound It Out** — phonics mode that speaks each part in sequence and highlights it.
- **Star mastery** tracking per word, saved in the browser (`localStorage`).
- **Mix All Grades** and **Random Practice** modes.
- **Progress bar**, confetti rewards, and an encouraging finish screen.
- **Dark / light** theme (remembers your choice, respects system preference).
- Fully **responsive**, touch-friendly, keyboard accessible, and **works offline**
  after the first load (service worker).

## 🚀 Run it locally

Just open `index.html` in any modern browser.

For the offline service worker and the most reliable speech, serve it over HTTP:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## 🌐 Live site

Hosted with GitHub Pages — see the repository's **Pages** settings for the URL.

## 📁 Project structure

| File         | Purpose                                             |
|--------------|-----------------------------------------------------|
| `index.html` | App structure                                       |
| `style.css`  | Muted, child-friendly styling + light/dark themes   |
| `script.js`  | Word data, speech, phonics, navigation, progress    |
| `sw.js`      | Service worker for offline caching                  |

## 🔊 A note on voices

The app uses the browser's built-in speech voices, so the exact voice varies by device.
It prefers clearer, friendlier voices (e.g. Samantha or Google voices) when available.

---

Made with care for little readers. 💚
