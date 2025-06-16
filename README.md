# Projet Gestion Mariages

## Instructions de lancement

### Backend
- Installer les dépendances :  
  ```bash
  npm install
Configurer les variables d’environnement dans un fichier .env à la racine du backend.

Lancer le serveur :

bash
Copier
Modifier
npm start
ou, si vous utilisez nodemon :

bash
Copier
Modifier
nodemon
Le serveur tourne par défaut sur le port indiqué dans .env (ex: 5000).

Frontend
Installer les dépendances :

bash
Copier
Modifier
npm install
Lancer l’application React :

bash
Copier
Modifier
npm start
Assurez-vous que le backend est bien lancé avant de démarrer le frontend.

Structure du projet
bash
Copier
Modifier
/backend
  /models         # Schémas Mongoose (Wedding, Task, User, etc.)
  /routes         # Routes API Express
  server.js       # Point d’entrée backend

/frontend
  /src
    /components   # Composants React réutilisables (TaskForm, Navbar, etc.)
    /pages        # Pages React (TaskList, WeddingForm, Login, etc.)
    App.jsx       # Composant principal React
Variables d’environnement requises
Variable	Description	Exemple
MONGO_URI	URL de connexion MongoDB	mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET	Clé secrète pour signer les tokens JWT	une_chaine_très_secrète
PORT	Port sur lequel tourne le backend	5000

Routes API disponibles
Route	Méthode	Description	Exemple d’appel / Payload	Protection
/api/account/register	POST	Inscription utilisateur	{ email, password }	Non
/api/account/login	POST	Connexion utilisateur	{ email, password }	Non
/api/weddings	GET	Récupérer la liste des mariages	Header : Authorization: Bearer <token>	Oui (JWT requis)
/api/weddings	POST	Créer un nouveau mariage	{ brideName, groomName, date, location }	Oui (JWT requis)
/api/tasks/:weddingId	GET	Récupérer tâches d’un mariage	Header : Authorization: Bearer <token>	Oui (JWT requis)
/api/tasks	POST	Ajouter une tâche	{ weddingId, name, done }	Oui (JWT requis)

Note : Pour les routes protégées, le token JWT doit être envoyé dans l’en-tête HTTP Authorization sous la forme :
Authorization: Bearer <votre_token>

Exemple d’ajout de tâche via l’API avec un token JWT
http
Copier
Modifier
POST http://localhost:5000/api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "weddingId": "643a1f4e9b7e0f3a3a4b2c5d",
  "name": "Décorer la salle",
  "done": false
}
Remarques
Le token JWT est généré lors de la connexion (/api/account/login).

Sans token ou avec un token invalide/expiré, les routes protégées renvoient une erreur 401.

Les IDs (weddingId, taskId) sont générés automatiquement par MongoDB.

Le frontend utilise React et récupère/affiche les données via ces API.

La gestion des erreurs est faite côté frontend pour afficher les messages à l’utilisateur.
