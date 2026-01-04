# Binet - Scientific Journal Project

## Project Overview
Binet is a modern scientific journal web application for hosting articles and projects.

## Architecture
- **Frontend**: React application (to be hosted on GitHub Pages at iliasbkm.github.io)
- **Backend**: Spring Boot REST API with H2 in-memory database

## Project Structure
```
Binet/
├── frontend/          # React application
│   ├── src/
│   │   ├── App.js    # Main component with articles/projects display
│   │   └── App.css   # Modern, responsive styling
│   └── package.json  # Configured for GitHub Pages deployment
├── backend/           # Spring Boot API
│   ├── src/main/java/com/binet/backend/
│   │   ├── BinetBackendApplication.java
│   │   ├── controller/  # REST controllers for articles & projects
│   │   ├── model/       # Article and Project entities
│   │   └── repository/  # JPA repositories
│   └── pom.xml
└── .github/workflows/ # GitHub Actions for deployment
```

## Features Implemented

### Frontend
- Modern, responsive UI with gradient header
- Tabbed navigation between Articles and Projects
- Card-based layout with hover effects
- French localization
- API integration with backend
- GitHub Pages deployment configuration

### Backend
- RESTful API for Articles and Projects
- CRUD operations for both entities
- H2 in-memory database
- CORS enabled for frontend communication
- JPA/Hibernate for data persistence

## API Endpoints

### Articles
- GET `/api/articles` - All articles
- GET `/api/articles/{id}` - Single article
- GET `/api/articles/category/{category}` - By category
- POST `/api/articles` - Create article
- PUT `/api/articles/{id}` - Update article
- DELETE `/api/articles/{id}` - Delete article

### Projects
- GET `/api/projects` - All projects
- GET `/api/projects/{id}` - Single project
- POST `/api/projects` - Create project
- PUT `/api/projects/{id}` - Update project
- DELETE `/api/projects/{id}` - Delete project

## Development

### Frontend
```bash
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```

### Backend
```bash
cd backend
mvnw spring-boot:run  # Runs on http://localhost:8080
```

## Deployment

The frontend is automatically deployed to GitHub Pages via GitHub Actions on push to main branch. Configure GitHub Pages in repository settings to use "GitHub Actions" as the source.

## Status
- [x] Project initialization
- [x] Frontend scaffolding
- [x] Backend scaffolding
- [x] Frontend customization
- [x] Backend API implementation
- [x] GitHub Pages deployment configuration
- [x] Documentation complete

