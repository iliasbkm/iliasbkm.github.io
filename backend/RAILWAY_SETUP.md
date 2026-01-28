# Configuration Railway - Backend Binet

## Configuration de Railway pour le Backend

### 1. **Variables d'environnement à configurer**

Sur Railway, dans les variables d'environnement du service, assurez-vous que:

```
PORT=8080
```

La variable `DATABASE_URL` sera automatiquement fournie par votre service PostgreSQL sur Railway.

### 2. **Connexion PostgreSQL**

- Créez un service PostgreSQL dans Railway
- Railway injectera automatiquement `DATABASE_URL` en tant que variable d'environnement
- L'application utilisera cette URL pour se connecter

### 3. **Configuration du Frontend**

Pour connecter votre frontend (GitHub Pages) au backend Railway:

**Dans `frontend/src/api.js`**, vérifiez la configuration:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
```

**Lors du déploiement sur GitHub Pages**, définissez la variable d'environnement:

```bash
REACT_APP_API_URL=https://your-railway-backend-url/api npm run build
```

### 4. **Structure du Backend**

```
backend/
├── Dockerfile              # Configuration Docker optimisée
├── railway.json            # Configuration Railway
├── .dockerignore            # Fichiers à ignorer dans le build Docker
├── .railwayignore          # Fichiers à ignorer dans Railway
├── pom.xml                 # Dépendances Maven
└── src/
    ├── main/java/          # Code source
    └── resources/
        └── application.properties  # Configuration Spring
```

### 5. **Dépannage des erreurs de build**

Si vous avez une erreur `Failed to build an image`:

1. **Vérifiez les logs** dans Railway (Deploy tab → Build logs)
2. **Assurez-vous que**:
   - Le `pom.xml` est valide
   - Les dépendances peuvent être téléchargées
   - Le code source compile sans erreurs
   - Java 17 est disponible

3. **Redéployez** après corrections

### 6. **Health Check**

L'application inclut un health check. Vous pouvez le tester:

```bash
curl http://localhost:8080/actuator/health
```

### 7. **Logs en temps réel**

Surveillez les logs sur Railway pour diagnostiquer les problèmes de déploiement.

## Commandes utiles

```bash
# Build local
docker build -t binet-backend .

# Run local
docker run -e DATABASE_URL="..." -p 8080:8080 binet-backend

# Test de l'API
curl http://localhost:8080/api/articles
```
