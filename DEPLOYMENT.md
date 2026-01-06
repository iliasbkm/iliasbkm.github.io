# 🚀 Guide de Déploiement Full Stack - Binet

## Architecture de Déploiement
- **Frontend React**: GitHub Pages (`https://iliasbkm.github.io`)
- **Backend Spring Boot**: Railway (`https://your-backend.up.railway.app`)

---

## 📦 1. Déploiement Backend sur Railway

### Étape 1.1 : Préparation du projet
✅ **Fichiers configurés** :
- `application.properties` : Port dynamique avec `${PORT:8080}`
- `CorsConfig.java` : CORS configuré pour GitHub Pages
- `Dockerfile` : Build multi-stage optimisé avec Java 17
- `.env.example` : Template des variables d'environnement

### Étape 1.2 : Déploiement sur Railway

1. **Créer un compte** sur [Railway.app](https://railway.app)

2. **Nouveau projet** :
   ```
   - Cliquer "New Project"
   - Sélectionner "Deploy from GitHub repo"
   - Choisir le dépôt "iliasbkm/iliasbkm.github.io"
   - Root Directory : /backend
   ```

3. **Configuration automatique** :
   - Railway détectera le `Dockerfile` automatiquement
   - Le build démarrera immédiatement

4. **Variables d'environnement** (Settings → Variables) :
   ```env
   PORT=8080
   SPRING_DATASOURCE_URL=jdbc:h2:mem:binetdb
   SPRING_DATASOURCE_USERNAME=sa
   SPRING_DATASOURCE_PASSWORD=
   SPRING_PROFILES_ACTIVE=prod
   ```

5. **Générer un domaine public** :
   - Aller dans "Settings → Networking"
   - Cliquer "Generate Domain"
   - Copier l'URL (ex: `binet-backend-production.up.railway.app`)

### Étape 1.3 : Vérification du déploiement
```bash
# Tester l'API
curl https://your-backend.up.railway.app/api/articles
```

---

## 🌐 2. Déploiement Frontend sur GitHub Pages

### Étape 2.1 : Configuration de l'API URL

1. **Éditer le fichier** `.env.production` :
   ```env
   REACT_APP_API_URL=https://binet-backend-production.up.railway.app/api
   ```
   ⚠️ **Remplacer** `your-backend.up.railway.app` par l'URL Railway réelle

2. **Modifier `App.js`** pour utiliser la variable d'environnement :
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
   
   // Exemple d'utilisation
   useEffect(() => {
     fetch(`${API_URL}/articles`)
       .then(res => res.json())
       .then(data => setArticles(data));
   }, []);
   ```

### Étape 2.2 : Déploiement

```bash
cd frontend

# Build de production (utilise .env.production automatiquement)
npm run build

# Déploiement sur GitHub Pages
npm run deploy
```

### Étape 2.3 : Configuration GitHub Pages
1. Aller sur GitHub : **Settings → Pages**
2. Source : `gh-pages` branch
3. L'URL sera : `https://iliasbkm.github.io`

---

## 🔧 3. Configuration CORS - Code Complet

### CorsConfig.java
```java
package com.binet.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "https://iliasbkm.github.io",  // Production frontend
                    "http://localhost:3000",        // Dev local
                    "http://localhost:5173"         // Vite (si utilisé)
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

**Explications** :
- `.allowedOrigins()` : Liste blanche des domaines autorisés
- `.allowedMethods()` : Verbes HTTP permis
- `.allowCredentials(true)` : Autorise les cookies/auth
- `.maxAge(3600)` : Cache la config CORS 1h

---

## 🐳 4. Dockerfile - Code Complet

```dockerfile
# Build stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built artifact from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port (Railway will override with PORT env var)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Explications** :
- **Multi-stage build** : Réduit la taille de l'image (JDK → JRE)
- **Alpine Linux** : Image ultra-légère (~150MB vs 500MB)
- **Maven wrapper** : Utilise `./mvnw` au lieu de Maven global
- **Port 8080** : Railway overridera avec sa variable `$PORT`

---

## 🗄️ 5. Base de Données (PostgreSQL sur Railway)

### Option : Migrer de H2 vers PostgreSQL

#### 5.1 Ajouter PostgreSQL sur Railway
1. Dans le projet Railway, cliquer **"New"**
2. Sélectionner **"Database → PostgreSQL"**
3. Railway créera automatiquement `DATABASE_URL`

#### 5.2 Mise à jour du code

**pom.xml** :
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

**application.properties** :
```properties
# PostgreSQL Configuration
spring.datasource.url=${DATABASE_URL}
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

---

## ✅ 6. Checklist Finale

### Backend (Railway)
- [ ] `application.properties` utilise `${PORT:8080}`
- [ ] `CorsConfig.java` autorise `https://iliasbkm.github.io`
- [ ] `Dockerfile` présent dans `/backend`
- [ ] Variables d'environnement configurées sur Railway
- [ ] Domaine public généré
- [ ] Test API : `curl https://your-backend.up.railway.app/api/articles`

### Frontend (GitHub Pages)
- [ ] `.env.production` avec l'URL Railway correcte
- [ ] `package.json` : `homepage: "https://iliasbkm.github.io"`
- [ ] `App.js` utilise `process.env.REACT_APP_API_URL`
- [ ] `npm run build` sans erreurs
- [ ] `npm run deploy` réussi
- [ ] GitHub Pages activé sur la branche `gh-pages`

---

## 🚨 Dépannage

### Erreur CORS
```
Access to fetch at 'https://backend.railway.app/api/articles' 
from origin 'https://iliasbkm.github.io' has been blocked by CORS policy
```
**Solution** : Vérifier que `CorsConfig.java` inclut bien l'URL exacte du frontend.

### Railway : Application Crashed
```bash
# Voir les logs sur Railway Dashboard
# Vérifier que PORT est bien utilisé dans application.properties
```

### Frontend : API calls vers localhost
**Solution** : Vérifier que `.env.production` est bien pris en compte lors du build.

---

## 📞 Commandes Utiles

```bash
# Build local du backend
cd backend
./mvnw clean package
java -jar target/*.jar

# Build local du frontend
cd frontend
npm run build
npx serve -s build

# Test CORS
curl -H "Origin: https://iliasbkm.github.io" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS https://your-backend.up.railway.app/api/articles
```

---

**🎉 Une fois ces étapes complétées, votre application sera live !**
- Frontend : `https://iliasbkm.github.io`
- Backend : `https://your-backend.up.railway.app`
