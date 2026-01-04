# Binet - Journal Scientifique Moderne

Un journal scientifique moderne pour héberger des articles et des projets, construit avec React et Spring Boot.

## 🚀 Architecture

- **Frontend**: Application React hébergée sur GitHub Pages
- **Backend**: API REST Spring Boot avec base de données H2

## 📁 Structure du Projet

```
Binet/
├── frontend/          # Application React
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── backend/           # API Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/binet/backend/
│   │       │       ├── BinetBackendApplication.java
│   │       │       ├── controller/
│   │       │       ├── model/
│   │       │       └── repository/
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
└── README.md
```

## 🛠️ Installation et Utilisation

### Frontend

```bash
cd frontend
npm install
npm start
```

Le frontend sera accessible sur `http://localhost:3000`

### Backend

```bash
cd backend
mvnw spring-boot:run
```

Le backend sera accessible sur `http://localhost:8080`

La console H2 est disponible sur `http://localhost:8080/h2-console`

## 📡 API Endpoints

### Articles

- `GET /api/articles` - Récupérer tous les articles
- `GET /api/articles/{id}` - Récupérer un article par ID
- `GET /api/articles/category/{category}` - Récupérer les articles par catégorie
- `POST /api/articles` - Créer un nouvel article
- `PUT /api/articles/{id}` - Mettre à jour un article
- `DELETE /api/articles/{id}` - Supprimer un article

### Projets

- `GET /api/projects` - Récupérer tous les projets
- `GET /api/projects/{id}` - Récupérer un projet par ID
- `POST /api/projects` - Créer un nouveau projet
- `PUT /api/projects/{id}` - Mettre à jour un projet
- `DELETE /api/projects/{id}` - Supprimer un projet

## 🌐 Déploiement

### GitHub Pages

Le frontend est automatiquement déployé sur GitHub Pages via GitHub Actions lors d'un push sur la branche `main`.

URL de déploiement: `https://iliasbkm.github.io`

### Configuration requise

1. Activer GitHub Pages dans les paramètres du repository
2. Configurer la source sur "GitHub Actions"
3. Le workflow `.github/workflows/deploy.yml` gère le déploiement automatique

## 🔧 Technologies Utilisées

### Frontend
- React 19
- CSS3 avec design moderne et responsive
- Fetch API pour les appels HTTP

### Backend
- Spring Boot 3.2.1
- Spring Data JPA
- H2 Database (en mémoire)
- Maven

## 📝 Données Exemple

### Article
```json
{
  "title": "Titre de l'article",
  "content": "Contenu de l'article...",
  "author": "Nom de l'auteur",
  "category": "Science"
}
```

### Projet
```json
{
  "title": "Titre du projet",
  "description": "Description du projet...",
  "technologies": "React, Spring Boot",
  "githubUrl": "https://github.com/username/repo"
}
```

## 🤝 Contribution

Pour contribuer au projet:

1. Fork le repository
2. Créez une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

Ilias - [@iliasbkm](https://github.com/iliasbkm)

---

⭐ N'oubliez pas de mettre une étoile si ce projet vous a aidé!
