# Configuration complète : Laravel Backend + React Frontend

## ✅ Étapes achevées

### Backend (Laravel)
- ✅ Projet Laravel créé dans `back-end/`
- ✅ Configuration MySQL dans `.env` (base de données: `gestionnaires_des_taches`)
- ✅ Model `Task` avec propriétés: `title`, `description`, `completed`, `timestamps`
- ✅ Controller API `TaskController` avec CRUD complet (index, store, show, update, destroy)
- ✅ Migration de la table `tasks` exécutée
- ✅ Factory et Seeder pour générer 12 tâches de test
- ✅ Routes API enregistrées dans `routes/api.php` avec `Route::apiResource('tasks', TaskController::class)`
- ✅ CORS configuré dans `config/cors.php` (permet tous les domaines pour `/api/*`)
- ✅ Serveur Laravel lancé sur `http://127.0.0.1:8000`

### Frontend (React)
- ✅ Dépendance `axios` ajoutée à `package.json`
- ✅ Client API créé dans `src/api/tasks.ts` avec fonctions:
  - `fetchTasks()` — récupère toutes les tâches
  - `createTask(payload)` — crée une nouvelle tâche
  - `toggleTask(id, completed)` — met à jour le statut
- ✅ `App.tsx` modifiée pour:
  - Charger les tâches au montage via `useEffect`
  - Afficher les états de chargement et erreur
  - Intégrer les appels API pour CRUD
  - Mapper les données Laravel au format interne
- ✅ Configuration `.env` créée avec `VITE_API_BASE=http://127.0.0.1:8000`
- ✅ Serveur React Vite lancé sur `http://localhost:3000`

## 🚀 Accès à l'application

### Frontend
- **URL**: [http://localhost:3000/](http://localhost:3000/)
- Les tâches s'affichent automatiquement et sont synchronisées avec la base de données Laravel

### Backend (Tests API)
- **URL de base**: `http://127.0.0.1:8000`
- **Récupérer toutes les tâches**:
  ```bash
  curl http://127.0.0.1:8000/api/tasks
  ```
- **Créer une nouvelle tâche**:
  ```bash
  curl -X POST http://127.0.0.1:8000/api/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"Ma tâche","description":"Description optionnelle"}'
  ```
- **Mettre à jour une tâche** (id=1):
  ```bash
  curl -X PATCH http://127.0.0.1:8000/api/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"completed":true}'
  ```

## 📂 Structure de fichiers clés

```
back-end/
├── .env                    # Configuration DB + APP
├── app/
│   ├── Models/Task.php     # Model avec fillable + casts
│   └── Http/Controllers/Api/TaskController.php
├── database/
│   ├── migrations/2025_11_15_000000_create_tasks_table.php
│   ├── factories/TaskFactory.php
│   └── seeders/TaskSeeder.php
├── routes/api.php          # Routes API
└── config/cors.php         # CORS configuration

front-end/
├── .env                    # VITE_API_BASE
├── src/
│   ├── App.tsx            # Composant principal avec API integration
│   └── api/tasks.ts       # Client axios pour les appels API
└── package.json           # Dépendances (axios ajouté)
```

## 🔄 Fonctionnalités intégrées

### Base de données
- 12 tâches de test pré-peuplées via seeder
- Champs: `id`, `title`, `description`, `completed`, `created_at`, `updated_at`

### Synchronisation Frontend-Backend
- Fetch automatique des tâches au chargement de la page
- Création de tâches (POST `/api/tasks`)
- Mise à jour du statut (PATCH `/api/tasks/:id`)
- Suppression de tâches (DELETE `/api/tasks/:id`)

### Gestion UI
- Écran de chargement avec spinner lors de la récupération des données
- Affichage des erreurs avec bouton "Réessayer"
- Onglets pour filtrer par statut (À faire, En cours, Terminées)
- Statistiques de tâches en temps réel

## ⚠️ Dépannage

### "Erreur lors du chargement des tâches"
- Vérifiez que le serveur Laravel fonctionne:
  ```bash
  curl http://127.0.0.1:8000/api/tasks
  ```
- Assurez-vous que la base de données `gestionnaires_des_taches` existe et est accessible.

### CORS Error
- Le fichier `config/cors.php` est déjà configuré pour autoriser `/api/*`
- Si le problème persiste, relancez le serveur Laravel

### Tâches ne s'affichent pas
- Vérifiez que le seeder a bien exécuté: `php artisan db:seed --force`
- Confirmez les données dans phpMyAdmin table `tasks`

## 🔧 Commandes utiles (PowerShell)

```powershell
# Terminal 1: Backend
cd 'C:\Users\DELL\Documents\afj\Application de gestion de tâches\back-end'
php artisan serve --host=127.0.0.1 --port=8000

# Terminal 2: Frontend
cd 'C:\Users\DELL\Documents\afj\Application de gestion de tâches\front-end'
npm run dev

# Terminal 3: Tests manuels
curl http://127.0.0.1:8000/api/tasks
```

## 📝 Prochaines étapes (optionnel)

- Ajouter authentification (Laravel Sanctum)
- Implémenter pagination des tâches
- Ajouter tri/recherche côté backend
- Ajouter tests unitaires (PHPUnit + Jest)
- Déployer sur serveur (Heroku, DigitalOcean, etc.)
