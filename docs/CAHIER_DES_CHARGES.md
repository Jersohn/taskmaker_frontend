# Cahier des Charges — Application de gestion de tâches

## 1. Titre du projet
Gestionnaire de Tâches — Application Web (Laravel + React)

## 2. Contexte et objectif
- Contexte : Projet pédagogique visant à développer une application web de gestion de tâches.
- Objectif : Fournir une application fonctionnelle qui permet de créer, lire, mettre à jour et supprimer des tâches, avec trois statuts (À faire, En cours, Terminé), un tableau de bord simple et une documentation complète.

## 3. Périmètre fonctionnel
- Création d’une tâche : `title`, `description`, `status`.
- Consultation : liste des tâches, filtres par statut (Toutes / À faire / En cours / Terminées).
- Mise à jour : modification rapide (titre), modal de détails (titre, description, statut).
- Suppression : suppression individuelle d’une tâche.
- Statistiques : compte par statut affiché sur le tableau de bord.

Exclusions : authentification multi-utilisateur, roles avancés, notifications push, synchronisation temps réel.

## 4. Durée et planning détaillé (estimation : 10 heures)
La réalisation s'étend sur une période de 10 heures. Calendrier estimatif :

- Jour 1 — Finalisation de la Conception (2 heures)
  - Livrable : Conception finale, architecture, navigation, maquettes, modèles de données.

- Jour 2–3 — Développement Frontend (4 heures)
  - Livrable : Pages web, composants React, styles CSS.

- Jour 4–5 — Développement Backend (4 heures)
  - Livrable : Modèles Eloquent, contrôleurs API, migrations, seeders.

- Jour 6 — Tests (2 heures)
  - Livrable : Tests unitaires/integration/système et rapport de tests.

- Jour 7 — Optimisation, Sécurité et Écoresponsabilité (2 heures)
  - Livrable : Améliorations de performance, audit sécurité et recommandations d’éco-conception.

- Jour 8 — Livraison et Présentation (2 heures)
  - Livrable : Démo, présentation et documentation finale.

> Remarque : les durées ci‑dessus sont indicatives ; si la contrainte est strictement 10 heures, regrouper ou prioriser le MVP (CRUD + filtres) et déplacer les optimisations/XP hors sprint principal.

## 5. Architecture technique
- Backend : Laravel (PHP 7.4+), apiResource pour `tasks`.
- Base de données : MySQL (BDD `gestionnaires_des_taches`), migrations et seeders.
- Frontend : React (Vite + TypeScript), Tailwind CSS, axios pour appels API.
- Endpoints principaux (JSON) :
  - GET /api/tasks
  - POST /api/tasks
  - GET /api/tasks/{id}
  - PATCH /api/tasks/{id}
  - DELETE /api/tasks/{id}
- CORS : configurer `config/cors.php` pour autoriser `http://localhost:3000` (développement).

## 6. Modèle de données (extrait)
Table `tasks` :
- `id` (bigint)
- `title` (string)
- `description` (text, nullable)
- `completed` (boolean)
- `status` (string) — valeurs : `todo`, `in-progress`, `completed`
- `created_at`, `updated_at`

## 7. Spécification d'API (contrats)
- POST /api/tasks
  - Body: `{ "title": string, "description"?: string, "completed"?: boolean, "status"?: "todo|in-progress|completed" }`
  - Réponse: 201 + resource JSON
- PATCH /api/tasks/{id}
  - Body: champs partiels à mettre à jour
  - Réponse: 200 + resource JSON
- DELETE /api/tasks/{id}
  - Réponse: 204

## 8. Livrables par étape
- Conception : maquettes, schéma DB
- Frontend : composants, pages, styles
- Backend : migrations, model, controller, routes
- Tests : suite et rapport
- Documentation : README, SETUP.md, cahier des charges
- Présentation : slides + démo

## 9. Critères d'acceptation
- CRUD complet via UI et API
- Filtrage et onglets par statut fonctionnels
- Tests unitaires critiques (backend) exécutés
- Documentation d'installation et d'exécution validée

## 10. Plan de tests (synthèse)
- Tests unitaires Laravel : modèle et contrôleur
- Tests d'intégration : scénarios CRUD via Postman / test runner
- Tests frontend : smoke tests manuels (création, édition, statut, suppression)
- Rapport des anomalies et corrections

## 11. Sécurité et optimisation énergétique
- Validation server-side stricte
- Protection contre XSS : échapper affichages si affichage HTML
- CORS restreint en dev/prod
- Recommandations éco-responsables : réduire requêtes, paginer les listes, optimiser assets (purge Tailwind), limiter polling

## 12. Gestion des risques
- Dépassement du temps → prioriser MVP
- Problèmes d'environnement → documenter versions et prérequis
- Failles de sécurité → checklist et audit avant livraison

## 13. Pré-requis techniques
- PHP 7.4+, Composer
- Node.js + npm, Vite
- MySQL
- (Optionnel) Pandoc pour conversion Markdown → PDF

## 14. Livraison et présentation
- README / SETUP avec étapes :
  - `composer install`
  - config `.env`
  - `php artisan migrate --seed`
  - `php artisan serve --host=127.0.0.1 --port=8000`
  - `cd front-end && npm install && npm run dev`
- Présentation : démo live + slides expliquant architecture et choix techniques

## 15. Annexes / Checklist de remise
- README complet
- Migrations et seeders
- Scripts d'exécution
- Rapport de tests
- Mini API spec (extraits ci‑dessus)

---

## Conversion Markdown → PDF (instructions)
1. Avec Pandoc (recommandé si installé) :

```powershell
# installer pandoc si nécessaire (chocolatey) :
# choco install pandoc
# puis convertir :
pandoc docs/CAHIER_DES_CHARGES.md -o docs/CAHIER_DES_CHARGES.pdf --from markdown --pdf-engine=wkhtmltopdf
```

2. Sans pandoc : ouvrir `docs/CAHIER_DES_CHARGES.md` dans VS Code et `File > Print` → choisir `Save as PDF`.
3. Ouvrir le Markdown dans le navigateur (par ex. extension Markdown Preview) puis `Ctrl+P` → Imprimer en PDF.

---

Si vous souhaitez, je peux :
- Générer la version PDF ici (si `pandoc` est disponible dans l'environnement) ;
- Ajouter une version anglaise ;
- Produire des slides de présentation à partir de ce document.

