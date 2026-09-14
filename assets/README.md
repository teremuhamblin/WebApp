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
