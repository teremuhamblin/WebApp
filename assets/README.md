###### README.md >> markdown 
# 🎯 Dossier assets/
Ce dossier regroupe toutes les ressources visuelles et statiques du projet WebApp.

### 🧩 Objectif
Centraliser les éléments graphiques pour garantir :
- une structure claire et hiérarchisée,
- une maintenance simplifiée,
- une cohérence visuelle sur l’ensemble du projet.

---

### 🗂️ Structure tactique
```text
assets/
├── logo/          → Logos, emblèmes, variantes (SVG, PNG)
├── icons/         → Icônes tactiques et symboles d’interface
├── backgrounds/   → Fonds d’écran, textures, motifs
├── ui/            → Éléments d’interface (boutons, HUD, overlays)
└── misc/          → Ressources diverses (sons, vidéos, etc.)
```

---

### ⚙️ Bonnes pratiques
- Utiliser des noms explicites (logomain.svg, iconcheck.png)
- Conserver les versions vectorielles (SVG) en priorité
- Éviter les doublons et fichiers inutiles
- Classer selon la logique tactique ci‑dessus
- Optimiser les images avant intégration (pngquant, svgo, etc.)

---

### 🪖 Exemple d’utilisation
```html
<img src="assets/logo/logo.png" alt="Logo WebApp">
```

---

### 📘 Notes
- Les fichiers sensibles ou propriétaires doivent être placés dans assets/misc/secure/
- Les visuels de test ou temporaires vont dans assets/tmp/
- Les ressources communes à plusieurs modules peuvent être partagées via assets/shared/

---

>WebApp — Tactical Web Environment

---

### 🔮 Icônes SVG
- WebApp (Style Néon)
Ce dossier contient les icônes SVG utilisées dans l’interface de WebApp, version 12.0+, avec un style néon futuriste cohérent avec l’UI cyber.

### 📁 Fichiers
- glow.svg — icône d’effet lumineux / aura
- perf.svg — icône de performance / vitesse
- theme.svg — icône de gestion de thème
- parallax.svg — icône d’effet parallax / profondeur

### 🎨 Style
- Format : SVG optimisé
- Couleurs : héritées du CSS via currentColor
- Taille recommandée : 24×24 ou 32×32
- Compatible animations CSS (glow, pulse, rotate)
- Style néon : contours nets + possibilité d’ajouter un glow via filter: drop-shadow()

### 🔧 Utilisation
- En balise <img>
```html
<img src="assets/icons/glow.svg" alt="Glow Icon" />
```

- Inline
```html
<svg class="icon neon">
  <!-- contenu de l’icône -->
</svg>
```

### ✨ Effet Glow CSS recommandé
```css
.icon.neon {
  filter: drop-shadow(0 0 6px #00eaff) drop-shadow(0 0 12px #00eaff);
}
```

### 🛠️ Notes
- Garder viewBox="0 0 24 24"
- Utiliser stroke="currentColor" ou fill="currentColor"
- Éviter les couleurs inline pour garder la cohérence du thème.

---
