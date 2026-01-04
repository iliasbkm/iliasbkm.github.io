import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

// Données de démonstration - Articles vedettes
const featuredArticles = [
  {
    id: 1,
    title: "Intelligence Artificielle et Médecine",
    excerpt: "L'IA révolutionne le diagnostic médical",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    category: "IA & Santé",
    icon: "fa-solid fa-brain"
  },
  {
    id: 2,
    title: "Énergies Renouvelables au Maroc",
    excerpt: "Le Maroc leader africain de l'énergie verte",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    category: "Environnement",
    icon: "fa-solid fa-sun"
  },
  {
    id: 3,
    title: "Blockchain et Finance",
    excerpt: "La révolution de la transparence numérique",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    category: "Technologie",
    icon: "fa-solid fa-link"
  },
  {
    id: 4,
    title: "Exploration Spatiale",
    excerpt: "Les nouvelles frontières de l'humanité",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    category: "Espace",
    icon: "fa-solid fa-rocket"
  },
  {
    id: 5,
    title: "Biotechnologie Médicale",
    excerpt: "Thérapies géniques et médecine personnalisée",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    category: "Biotechnologie",
    icon: "fa-solid fa-dna"
  }
];

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
  },
  {
    id: 4,
    title: "Nanotechnologie et Environnement",
    content: "Les nanomatériaux offrent des solutions révolutionnaires pour la dépollution de l'eau et de l'air. Ces technologies émergentes permettent de filtrer les contaminants à l'échelle moléculaire.",
    author: "Dr. Ilias Benkamoun",
    publishedDate: "2025-12-15T11:00:00",
    category: "Nanotechnologie"
  },
  {
    id: 5,
    title: "Informatique Quantique",
    content: "Les ordinateurs quantiques promettent de résoudre des problèmes jugés impossibles pour les ordinateurs classiques. Cette révolution technologique ouvre la voie à de nouvelles découvertes scientifiques.",
    author: "Dr. Ilias Benkamoun",
    publishedDate: "2025-12-10T16:30:00",
    category: "Informatique"
  },
  {
    id: 6,
    title: "Agriculture de Précision",
    content: "L'agriculture moderne utilise des drones, capteurs IoT et intelligence artificielle pour optimiser les rendements tout en réduisant l'impact environnemental. Une révolution verte en marche.",
    author: "Dr. Ilias Benkamoun",
    publishedDate: "2025-12-05T09:00:00",
    category: "Agriculture"
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
  const [activeTab, setActiveTab] = useState('accueil');
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Utilisation directe des données de démonstration
  const articles = demoArticles;
  const projects = demoProjects;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <button className="menu-button">
            <i className="fa-solid fa-bars"></i>
          </button>
          
          <div className="navbar-center">
            <img src={logo} alt="Binet Logo" className="navbar-logo" />
            <span className="navbar-slogan">Petit journal scientifique</span>
          </div>
          
          <div className="navbar-right">
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input type="text" placeholder="Rechercher..." />
            </div>
            <a 
              href="https://linkedin.com/in/iliasbenkamoun" 
              target="_blank" 
              rel="noopener noreferrer"
              className="author-button"
            >
              Consulter l'auteur
            </a>
          </div>
        </div>
      </nav>

      <nav className="nav">
        <div className="container nav-container">
          <button
            className={`nav-button ${activeTab === 'accueil' ? 'active' : ''}`}
            onClick={() => setActiveTab('accueil')}
          >
            Accueil
          </button>
          <button
            className={`nav-button ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            Articles
          </button>
          <button
            className={`nav-button ${activeTab === 'projets' ? 'active' : ''}`}
            onClick={() => setActiveTab('projets')}
          >
            Projets
          </button>
          <button
            className={`nav-button ${activeTab === 'recherche' ? 'active' : ''}`}
            onClick={() => setActiveTab('recherche')}
          >
            Recherche
          </button>
        </div>
      </nav>

      <main className="main">
        {activeTab === 'accueil' && (
          <>
            {/* Section Articles Vedettes */}
            <section className="featured-section">
              <div className="options">
                {featuredArticles.map((article, index) => (
                  <div 
                    key={article.id}
                    className={`option ${activeFeature === index ? 'active' : ''}`}
                    style={{ '--optionBackground': `url(${article.image})` }}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="shadow"></div>
                    <div className="label">
                      <div className="icon"><i className={article.icon}></i></div>
                      <div className="info">
                        <div className="main">{article.title}</div>
                        <div className="sub">{article.excerpt}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section News Cards */}
            <section className="news-cards-section">
              <div className="content-wrapper">
                <div className="news-card">
                  <a href="#" className="news-card__card-link"></a>
                  <img src="https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className="news-card__image" />
                  <div className="news-card__text-wrapper">
                    <h2 className="news-card__title">Intelligence Artificielle et Santé</h2>
                    <div className="news-card__post-date">Jan 29, 2026</div>
                    <div className="news-card__details-wrapper">
                      <p className="news-card__excerpt">Découvrez comment l'IA révolutionne le diagnostic médical et améliore les traitements personnalisés&hellip;</p>
                      <a href="#" className="news-card__read-more">Lire plus <i className="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>

                <div className="news-card">
                  <a href="#" className="news-card__card-link"></a>
                  <img src="https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className="news-card__image" />
                  <div className="news-card__text-wrapper">
                    <h2 className="news-card__title">Énergies Renouvelables au Maroc</h2>
                    <div className="news-card__post-date">Jan 28, 2026</div>
                    <div className="news-card__details-wrapper">
                      <p className="news-card__excerpt">Le Maroc se positionne comme leader africain dans les énergies solaires et éoliennes&hellip;</p>
                      <a href="#" className="news-card__read-more">Lire plus <i className="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>

                <div className="news-card">
                  <a href="#" className="news-card__card-link"></a>
                  <img src="https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" className="news-card__image" />
                  <div className="news-card__text-wrapper">
                    <h2 className="news-card__title">Biotechnologie Végétale</h2>
                    <div className="news-card__post-date">Jan 27, 2026</div>
                    <div className="news-card__details-wrapper">
                      <p className="news-card__excerpt">Nouvelles avancées dans la modification génétique des plantes pour l'agriculture durable&hellip;</p>
                      <a href="#" className="news-card__read-more">Lire plus <i className="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>

                <div className="news-card">
                  <a href="#" className="news-card__card-link"></a>
                  <img src="https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className="news-card__image" />
                  <div className="news-card__text-wrapper">
                    <h2 className="news-card__title">Nanotechnologie Médicale</h2>
                    <div className="news-card__post-date">Jan 26, 2026</div>
                    <div className="news-card__details-wrapper">
                      <p className="news-card__excerpt">Les nanoparticules ouvrent de nouvelles perspectives dans le traitement du cancer&hellip;</p>
                      <a href="#" className="news-card__read-more">Lire plus <i className="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>

                <div className="news-card">
                  <a href="#" className="news-card__card-link"></a>
                  <img src="https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className="news-card__image" />
                  <div className="news-card__text-wrapper">
                    <h2 className="news-card__title">Exploration Spatiale</h2>
                    <div className="news-card__post-date">Jan 25, 2026</div>
                    <div className="news-card__details-wrapper">
                      <p className="news-card__excerpt">Les missions vers Mars progressent avec de nouvelles technologies de propulsion innovantes&hellip;</p>
                      <a href="#" className="news-card__read-more">Lire plus <i className="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>

                <div className="news-card">
                  <a href="#" className="news-card__card-link"></a>
                  <img src="https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className="news-card__image" />
                  <div className="news-card__text-wrapper">
                    <h2 className="news-card__title">Informatique Quantique</h2>
                    <div className="news-card__post-date">Jan 24, 2026</div>
                    <div className="news-card__details-wrapper">
                      <p className="news-card__excerpt">Les ordinateurs quantiques atteignent des records de calcul et promettent des révolutions technologiques.</p>
                      <a href="#" className="news-card__read-more">Lire plus <i className="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Derniers Articles */}
            <section className="latest-articles">
              <div className="container">
                <h2 className="section-title">
                  <i className="fa-solid fa-newspaper title-icon"></i> Derniers Articles
                </h2>
                <div className="grid">
                  {articles.slice(0, 3).map((article) => (
                    <article key={article.id} className="card">
                      <div className="card-header">
                        <h3 className="card-title">{article.title}</h3>
                        {article.category && (
                          <span className="category">{article.category}</span>
                        )}
                      </div>
                      <div className="card-meta">
                        <span className="author"><i className="fa-solid fa-user"></i> {article.author}</span>
                        <span className="date"><i className="fa-solid fa-calendar"></i> {formatDate(article.publishedDate)}</span>
                      </div>
                      <p className="card-content">{article.content}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Section Catégories */}
            <section className="categories-section">
              <div className="container">
                <h2 className="section-title">
                  <i className="fa-solid fa-microscope title-icon"></i> Explorer par Catégorie
                </h2>
                <div className="categories-grid">
                  <div className="category-card">
                    <div className="category-icon"><i className="fa-solid fa-robot"></i></div>
                    <h3>Intelligence Artificielle</h3>
                    <p>Découvrez les avancées en IA et machine learning</p>
                  </div>
                  <div className="category-card">
                    <div className="category-icon"><i className="fa-solid fa-leaf"></i></div>
                    <h3>Environnement</h3>
                    <p>Solutions durables et énergies renouvelables</p>
                  </div>
                  <div className="category-card">
                    <div className="category-icon"><i className="fa-solid fa-dna"></i></div>
                    <h3>Biotechnologie</h3>
                    <p>Innovations en génétique et médecine</p>
                  </div>
                  <div className="category-card">
                    <div className="category-icon"><i className="fa-solid fa-rocket"></i></div>
                    <h3>Espace</h3>
                    <p>Exploration spatiale et astronomie</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'articles' && (
          <div className="container">
            <h2 className="section-title">
              <i className="fa-solid fa-book title-icon"></i> Tous les Articles
            </h2>
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
                    <span className="author"><i className="fa-solid fa-user"></i> {article.author}</span>
                    <span className="date"><i className="fa-solid fa-calendar"></i> {formatDate(article.publishedDate)}</span>
                  </div>
                  <p className="card-content">{article.content}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projets' && (
          <div className="container">
            <h2 className="section-title">
              <i className="fa-solid fa-lightbulb title-icon"></i> Nos Projets
            </h2>
            <div className="grid">
              {projects.map((project) => (
                <article key={project.id} className="card">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-meta">
                    <span className="date"><i className="fa-solid fa-calendar"></i> {formatDate(project.createdDate)}</span>
                  </div>
                  <p className="card-content">{project.description}</p>
                  {project.technologies && (
                    <div className="technologies">
                      <strong><i className="fa-solid fa-laptop-code"></i> Technologies:</strong> {project.technologies}
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

        {activeTab === 'recherche' && (
          <div className="container">
            <h2 className="section-title">
              <i className="fa-solid fa-magnifying-glass title-icon"></i> Centre de Recherche
            </h2>
            <div className="research-info">
              <div className="info-card">
                <h3><i className="fa-solid fa-bullseye"></i> Notre Mission</h3>
                <p>Promouvoir la recherche scientifique et l'innovation au Maroc et en Afrique</p>
              </div>
              <div className="info-card">
                <h3><i className="fa-solid fa-handshake"></i> Collaboration</h3>
                <p>Partenariats avec des institutions de recherche internationales</p>
              </div>
              <div className="info-card">
                <h3><i className="fa-solid fa-chart-simple"></i> Domaines</h3>
                <p>IA, Biotechnologie, Énergies Renouvelables, Nanotechnologie</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3><i className="fa-solid fa-book"></i> Binet</h3>
              <p>Journal Scientifique Moderne</p>
              <p>Exploration, Innovation & Découverte</p>
            </div>
            <div className="footer-section">
              <h4>Navigation</h4>
              <ul>
                <li>Accueil</li>
                <li>Articles</li>
                <li>Projets</li>
                <li>Recherche</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p><i className="fa-solid fa-envelope"></i> contact@binetmaroc.me</p>
              <p><i className="fa-solid fa-globe"></i> www.binetmaroc.me</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Binet - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
