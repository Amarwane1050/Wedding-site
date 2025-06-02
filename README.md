Ce projet a pour but de permettre la gestion complète d’un mariage à travers une application web. L'utilisateur peut y gérer :

Les mariages (noms des mariés, date…),

La liste des invités,

Le budget, avec le suivi des montants et des paiements,

Les prestataires (vendors).

Chaque fonctionnalité est liée à un mariage spécifique.

🧰 Technologies utilisées
Front-end : React.js

Back-end : Node.js avec Express

Base de données : MongoDB (MongoDB Atlas)

Outils de test d’API : Insomnia

Gestion des routes front : React Router

📁 Architecture
Côté Front-End (React)
App.jsx : Composant principal qui contient la navigation et permet de sélectionner un mariage.

GuestList.jsx : Affiche, ajoute, modifie et supprime les invités liés à un mariage.

BudgetManager.jsx : Permet de gérer les budgets (titre, montant, payé ou non).

VendorList.jsx, WeddingForm.jsx, etc.

Côté Back-End (Node.js / Express)
models/Wedding.js : Schéma du mariage.

models/Guest.js : Schéma d’un invité avec un champ weddingId.

models/Budget.js : Schéma pour les budgets avec title, amount, isPaid et weddingId.

routes/weddingRoutes.js, guestRoutes.js, budgetRoutes.js : Définissent les routes CRUD pour chaque ressource.


📌 Gestion des Budgets
Chaque budget est :

associé à un mariage via un ID (weddingId),

constitué d’un titre, d’un montant, et d’un statut "payé ou non" (isPaid),

affiché dynamiquement en fonction du mariage sélectionné dans App.jsx.

Exemple d’usage :
L’utilisateur choisit un mariage dans le menu déroulant.

Il peut ajouter un budget pour ce mariage (ex : "Location salle", 1500€, payé).

La liste des budgets se met à jour automatiquement.

Il peut modifier ou supprimer chaque ligne.

🔄 Fonctionnement React ↔ Express ↔ MongoDB
Le composant BudgetManager.jsx récupère le weddingId du mariage sélectionné.

Lors de l’ajout ou la modification, les données sont envoyées à l’API via Axios.

L’API Express traite les requêtes et stocke les budgets dans MongoDB via Mongoose.

Les budgets sont rechargés automatiquement après chaque action.

✅ Résultat
Ajout depuis React fonctionne parfaitement

Stockage vérifié dans MongoDB Compass

Affichage dynamique des budgets

Lien fort entre chaque budget et son mariage
