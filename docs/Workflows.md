# ⚙️ Workflows GitHub Actions — WebApp

Ce document décrit les workflows présents dans `.github/workflows/`.

## 📄 Fichiers
- **ci.yml** : vérification du projet  
- **lint.yml** : analyse HTML/CSS/JS  
- **deploy.yml** : déploiement automatique sur GitHub Pages  

## 🚀 Déploiement
Le workflow `deploy.yml` publie automatiquement le site sur GitHub Pages à chaque push sur `main`.

## 🧪 CI
Le workflow `ci.yml` vérifie la présence des fichiers essentiels et effectue un build statique.

## 🔎 Lint
Le workflow `lint.yml` analyse :
- HTML  
- CSS  
- JavaScript
