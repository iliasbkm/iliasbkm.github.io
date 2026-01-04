import React, { useState } from 'react';
import './App.css';

// Données de démonstration
const demoArticles = [
  {
    id: 1,
    title: "Intelligence Artificielle et Médecine",
    content: "L'intelligence artificielle révolutionne le domaine médical en permettant des diagnostics plus précis et plus rapides. Les algorithmes d'apprentissage profond analysent des millions de données médicales pour identifier des patterns invisibles à l'œil humain.",
    author: "Dr. Ilias Benkamoun",
    publishedDate: "2026-01-01T10:00:00",
    category: "IA & Santé"
  },
  {
    id: 2,
    title: "Énergies Renouvelables au Maroc",
    content: "Le Maroc s'impose comme un leader africain dans les énergies renouvelables avec ses grands projets solaires et éoliens. L'objectif est d'atteindre 52% d'énergie verte d'ici 2030, une ambition qui transforme le paysage énergétique du pays.",
    author: "Dr. Ilias Benkamoun",
    publishedDate: "2025-12-28T14:30:00",
    category: "Environnement"
  },
  {
    id: 3,
    title: "Blockchain et Transparence",
    content: "La technologie blockchain offre des solutions innovantes pour garantir la transparence et la traçabilité dans divers secteurs : finance, logistique, santé. Cette technologie décentralisée redéfinit la confiance numérique.",
    author: "Dr. Ilias Benkamoun",
    publishedDate: "2025-12-20T09:15:00",
    category: "Technologie"
  }
];

const demoProjects = [
  {
    id: 1,
    title: "Système de Gestion Hospitalière",
    description: "Plateforme complète pour la gestion des hôpitaux incluant la gestion des patients, des rendez-vous, du personnel médical et des stocks de médicaments. Interface intuitive et sécurisée conforme aux normes RGPD.",
    technologies: "React, Spring Boot, PostgreSQL, Docker",
    githubUrl: "https://github.com/iliasbkm",
    createdDate: "2025-11-15T00:00:00"
  },
  {
    id: 2,
    title: "Application de Suivi Agricole",
    description: "Solution IoT pour le monitoring en temps réel des cultures agricoles. Capteurs connectés pour surveiller l'humidité du sol, la température et optimiser l'irrigation. Dashboard analytique pour les agriculteurs.",
    technologies: "Vue.js, Node.js, MongoDB, MQTT, Arduino",
    githubUrl: "https://github.com/iliasbkm",
    createdDate: "2025-10-20T00:00:00"
  },
  {
    id: 3,
    title: "Plateforme E-Learning Interactive",
    description: "Système d'apprentissage en ligne avec cours vidéo, quiz interactifs, forums de discussion et suivi personnalisé de progression. Gamification pour améliorer l'engagement des étudiants.",
    technologies: "Angular, Django, Redis, WebSocket",
    githubUrl: "https://github.com/iliasbkm",
    createdDate: "2025-09-10T00:00:00"
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('articles');
  
  // Utilisation directe des données de démonstration
  const articles = demoArticles;
  const projects = demoProjects;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="title">Binet</h1>
          <p className="subtitle">Journal Scientifique Moderne</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <button
            className={`nav-button ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            Articles
          </button>
          <button
            className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projets
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          {activeTab === 'articles' && (
            <div className="content-section">
              <h2 className="section-title">Articles</h2>
              <div className="grid">
                {articles.map((article) => (
                  <article key={article.id} className="card">
                    <div className="card-header">
                      <h3 className="card-title">{article.title}</h3>
                      {article.category && (
                        <span className="category">{article.category}</span>
                      )}
                    </div>
                    <div className="card-meta">
                      <span className="author">{article.author}</span>
                      <span className="date">{formatDate(article.publishedDate)}</span>
                    </div>
                    <p className="card-content">{article.content}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="content-section">
              <h2 className="section-title">Projets</h2>
              <div className="grid">
                {projects.map((project) => (
                  <article key={project.id} className="card">
                    <h3 className="card-title">{project.title}</h3>
                    <div className="card-meta">
                      <span className="date">{formatDate(project.createdDate)}</span>
                    </div>
                    <p className="card-content">{project.description}</p>
                    {project.technologies && (
                      <div className="technologies">
                        <strong>Technologies:</strong> {project.technologies}
                      </div>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-link"
                      >
                        Voir sur GitHub →
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Binet - Journal Scientifique Moderne</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
