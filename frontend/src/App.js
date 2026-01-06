import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import { getArticles, getProjects } from './api';

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

// Articles populaires avec images
const topPicksArticles = [
  {
    title: 'Intelligence Artificielle en Médecine',
    link: "#",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=600&fit=crop"
  },
  {
    title: "Énergies Renouvelables au Maroc",
    link: "#",
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=600&fit=crop"
  },
  {
    title: "Blockchain et Finance",
    link: "#",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop"
  },
  {
    title: "Exploration Spatiale",
    link: "#",
    src: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop"
  },
  {
    title: "Biotechnologie Médicale",
    link: "#",
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=600&fit=crop"
  },
  {
    title: "Nanotechnologie",
    link: "#",
    src: "https://images.unsplash.com/photo-1581093458791-9d42e12c2b23?w=400&h=600&fit=crop"
  },
  {
    title: "Informatique Quantique",
    link: "#",
    src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop"
  },
  {
    title: "Robotique Médicale",
    link: "#",
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=600&fit=crop"
  },
  {
    title: "Agriculture de Précision",
    link: "#",
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=600&fit=crop"
  },
  {
    title: "Cybersécurité",
    link: "#",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=600&fit=crop"
  }
];

// Données pour les reviews de films et loisirs
const blogPosts = [
  {
    date: "5 Jan, 2026",
    title: "Interstellar - Chef-d'œuvre Scientifique",
    excerpt: "Christopher Nolan nous offre une expérience cinématographique unique qui mêle science-fiction rigoureuse et émotions profondes. La représentation du trou noir Gargantua est d'une précision scientifique remarquable...",
    link: "#"
  },
  {
    date: "4 Jan, 2026",
    title: "Dune - L'Épopée Spatiale",
    excerpt: "Denis Villeneuve réussit l'adaptation tant attendue du roman culte de Frank Herbert. Une immersion totale dans l'univers d'Arrakis avec des effets visuels époustouflants et une bande sonore magistrale...",
    link: "#"
  },
  {
    date: "3 Jan, 2026",
    title: "Arrival - La Linguistique Alien",
    excerpt: "Un film de science-fiction intelligent qui explore la communication avec une civilisation extraterrestre. Une approche unique du concept de temps et de langage qui fascine...",
    link: "#"
  },
  {
    date: "2 Jan, 2026",
    title: "The Martian - Survie sur Mars",
    excerpt: "Ridley Scott nous transporte sur Mars avec une histoire de survie basée sur la science réelle. Matt Damon incarne brillamment un astronaute ingénieux face à l'adversité...",
    link: "#"
  },
  {
    date: "1 Jan, 2026",
    title: "Ex Machina - L'IA Consciente",
    excerpt: "Un thriller psychologique captivant qui explore les frontières de l'intelligence artificielle et de la conscience. Des performances d'acteurs exceptionnelles et une mise en scène minimaliste mais efficace...",
    link: "#"
  }
];

const blogCategories = [
  {
    title: "Science-Fiction",
    count: 12,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=300&fit=crop",
    link: "#"
  },
  {
    title: "Thrillers",
    count: 8,
    image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=500&h=300&fit=crop",
    link: "#"
  },
  {
    title: "Documentaires",
    count: 15,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=300&fit=crop",
    link: "#"
  },
  {
    title: "Séries",
    count: 6,
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&h=300&fit=crop",
    link: "#"
  }
];

const blogImages = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2000&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=2000&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=2000&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&h=1200&fit=crop",
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=2000&h=1200&fit=crop"
];

// Données des témoignages
const testimonials = [
  {
    id: 1,
    name: "Daniel Clifford",
    designation: "Verified Graduate",
    image: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-daniel.jpg",
    title: "I received a job offer mid-course, and the subjects I learned were current, if not more so, in the company I joined. I honestly feel I got every penny's worth.",
    review: "I was an EMT for many years before I joined the bootcamp. I've been looking to make a transition and have heard some people who had an amazing experience here. I signed up for the free intro course and found it incredibly fun! I enrolled shortly thereafter. The next 12 weeks was the best - and most grueling - time of my life. Since completing the course, I've successfully switched careers, working as a Software Engineer at a VR startup.",
    bgClass: "testimonial-div1",
    textDark: false
  },
  {
    id: 2,
    name: "Jonathan Walters",
    designation: "Verified Graduate",
    image: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jonathan.jpg",
    title: "The team was very supportive and kept me motivated",
    review: "I started as a total newbie with virtually no coding skills. I now work as a mobile engineer for a big company. This was one of the best investments I've made in myself.",
    bgClass: "testimonial-div2",
    textDark: false
  },
  {
    id: 3,
    name: "Kira Whittle",
    designation: "Verified Graduate",
    image: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-kira.jpg",
    title: "Such a life-changing experience. Highly recommended!",
    review: "Before joining the bootcamp, I've never written a line of code. I needed some structure from professionals who can help me learn programming step by step. I was encouraged to enroll by a former student of theirs who can only say wonderful things about the program. The entire curriculum and staff did not disappoint. They were very hands-on and I never had to wait long for assistance. The agile team project, in particular, was outstanding. It took my learning to the next level in a way that no tutorial could ever have. In fact, I've often referred to it during interviews as an example of experience. It certainly helped me land a job as a full-stack developer. I 100% recommend!",
    bgClass: "testimonial-div3",
    textDark: true
  },
  {
    id: 4,
    name: "Jeanette Harmon",
    designation: "Verified Graduate",
    image: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-jeanette.jpg",
    title: "An overall wonderful and rewarding experience",
    review: "Thank you for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love.",
    bgClass: "testimonial-div4",
    textDark: true
  },
  {
    id: 5,
    name: "Patrick Abrams",
    designation: "Verified Graduate",
    image: "https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/image-patrick.jpg",
    title: "Awesome teaching support from TAs who did the bootcamp themselves. Getting guidance from them and learning from their experiences was easy.",
    review: "The staff seem genuinely concerned about my progress which I find really refreshing. The program gave me the confidence necessary to be able to go out in the world and present myself as a capable junior developer. The standard is above the rest. You will get the personal attention you need from an incredible community of smart and amazing people.",
    bgClass: "testimonial-div5",
    textDark: false
  }
];

// Données des meilleurs projets
const topCities = [
  {
    id: 1,
    country: "Maroc",
    city: "Casablanca",
    places: 15,
    image: "https://images.pexels.com/photos/2346881/pexels-photo-2346881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    country: "Maroc",
    city: "Fès",
    places: 12,
    image: "https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    country: "Maroc",
    city: "Marrakech",
    places: 14,
    image: "https://images.pexels.com/photos/2346881/pexels-photo-2346881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    country: "France",
    city: "Paris",
    places: 20,
    image: "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 5,
    country: "Italie",
    city: "Rome",
    places: 18,
    image: "https://images.pexels.com/photos/4046386/pexels-photo-4046386.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 6,
    country: "Espagne",
    city: "Barcelone",
    places: 16,
    image: "https://images.pexels.com/photos/3722818/pexels-photo-3722818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 7,
    country: "Émirats Arabes Unis",
    city: "Dubaï",
    places: 19,
    image: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 8,
    country: "Nouvelle-Zélande",
    city: "Auckland",
    places: 17,
    image: "https://images.pexels.com/photos/572689/pexels-photo-572689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(1);
  const [prevHeroSlide, setPrevHeroSlide] = useState(null);
  const [articles, setArticles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les articles et projets depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [articlesData, projectsData] = await Promise.all([
          getArticles(),
          getProjects()
        ]);
        setArticles(articlesData);
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données. Utilisation des données de démonstration.');
        // Fallback vers les données de démonstration
        setArticles(demoArticles);
        setProjects(demoProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Initialize Owl Carousel
  useEffect(() => {
    if (activeTab !== 'accueil') {
      return undefined;
    }

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % topCities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    document.body.classList.add('is-loaded');
    return () => {
      document.body.classList.remove('is-loaded');
    };
  }, []);

  useEffect(() => {
    if (activeTab !== 'accueil') {
      return undefined;
    }

    const ensureSwiperCss = () => {
      if (document.querySelector('link[data-swiper-css]')) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/swiper@9/swiper-bundle.min.css';
      link.setAttribute('data-swiper-css', 'true');
      document.head.appendChild(link);
    };

    const initSwiper = () => {
      if (window.Swiper) {
        // eslint-disable-next-line no-new
        new window.Swiper('.steps', {
          slidesPerView: 1,
          spaceBetween: 20,
          autoHeight: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          },
        });
      }
    };

    ensureSwiperCss();

    if (window.Swiper) {
      initSwiper();
      return undefined;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swiper@9/swiper-bundle.min.js';
    script.async = true;
    script.onload = initSwiper;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [activeTab]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const heroSlideCount = 4;

  const goToSlide = (number) => {
    const target = ((number - 1 + heroSlideCount) % heroSlideCount) + 1;
    setPrevHeroSlide(activeHeroSlide);
    setActiveHeroSlide(target);
  };

  const handleHeroNext = () => goToSlide(activeHeroSlide + 1);
  const handleHeroPrev = () => goToSlide(activeHeroSlide - 1);

  const handleHeroReEnter = () => {
    document.body.classList.remove('is-loaded');
    goToSlide(4);
    setTimeout(() => {
      goToSlide(1);
      document.body.classList.add('is-loaded');
    }, 2000);
  };

  const slideClass = (id) => {
    const classes = ['slide'];
    if (id === activeHeroSlide) classes.push('is-active');
    if (id === prevHeroSlide) classes.push('was-active');
    return classes.join(' ');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <button className="menu-button" onClick={() => setMenuOpen((prev) => !prev)}>
              <i className="fa-solid fa-bars"></i>
            </button>
            {menuOpen && (
              <div className="menu-dropdown">
                <button onClick={() => { setActiveTab('accueil'); setMenuOpen(false); }}>
                  Accueil
                </button>
                <button onClick={() => { setActiveTab('articles'); setMenuOpen(false); }}>
                  Articles
                </button>
                <button onClick={() => { setActiveTab('projets'); setMenuOpen(false); }}>
                  Projets
                </button>
                <button onClick={() => { setActiveTab('recherche'); setMenuOpen(false); }}>
                  Recherche
                </button>
              </div>
            )}

            <img src={logo} alt="Binet Logo" className="navbar-logo" />
            <div className="navbar-slogan">
              <h1 id="master">
                <div> Là où la pensée </div> 
                <div>rencontre</div>
                <div id="master-container-scroller">
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">le cinema</a>.
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">la science</a>.
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">la culture</a>.
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">la passion</a>.
                  </div>
                  <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">la tech</a>.
                  </div>
                   <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">la musique</a>.
                  </div>
                   <div className="master-container-scroller_item">
                    <a className="cta-link" href="#">le savoir</a>.
                  </div>
                </div>
              </h1>
            </div>
          </div>
          
          <div className="navbar-right">
            {!searchOpen && (
              <button className="search-button" onClick={() => setSearchOpen(true)}>
                <i className="fa-solid fa-search"></i>
              </button>
            )}
            {searchOpen && (
              <div className="search-box">
                <i className="fa-solid fa-search"></i>
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            )}
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

      <main className="main">
        {activeTab === 'accueil' && (
          <>
            {/* Section Hero Vidéo (design Nest) */}
            <section className="nest" data-active={activeHeroSlide}>
              <header className="header" data-active={activeHeroSlide}>
                <div className="header__left">
                  <div className="number">
                    <div className={slideClass(1)} data-slide="1">
                      <span>01</span>
                    </div>
                    <div className={slideClass(2)} data-slide="2">
                      <span>02</span>
                    </div>
                    <div className={slideClass(3)} data-slide="3">
                      <span>03</span>
                    </div>
                    <div className={slideClass(4)} data-slide="4">
                      <span>04</span>
                    </div>
                  </div>

                  <div className="title">
                    <div className={slideClass(1)} data-slide="1">
                      <div className="title__super">Travel to</div>
                      <div className="title__big">
                        <span>T</span>
                        <span>a</span>
                        <span>n</span>
                        <span>z</span>
                        <span>a</span>
                        <span>n</span>
                        <span>i</span>
                        <span>a</span>
                      </div>
                    </div>
                    <div className={slideClass(2)} data-slide="2">
                      <div className="title__super">Relax at</div>
                      <div className="title__big">
                        <span>L</span>
                        <span>a</span>
                        <span>k</span>
                        <span className="space">e</span>
                        <span>B</span>
                        <span>i</span>
                        <span>w</span>
                        <span>a</span>
                      </div>
                    </div>
                    <div className={slideClass(3)} data-slide="3">
                      <div className="title__super">Get Lost</div>
                      <div className="title__big">
                        <span>J</span>
                        <span>u</span>
                        <span>n</span>
                        <span>g</span>
                        <span>l</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                      </div>
                    </div>
                    <div className={slideClass(4)} data-slide="4">
                      <div className="title__super">Explore the</div>
                      <div className="title__big">
                        <span>D</span>
                        <span>e</span>
                        <span>e</span>
                        <span className="space">p</span>
                        <span>S</span>
                        <span>e</span>
                        <span>a</span>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    <div className={slideClass(1)} data-slide="1">
                      <p className="content__blurb">Low-cost flights and last minute internet deals means that cheap holidays are far easier to come by than they used to be.</p>
                      <button className="content__link" onClick={handleHeroReEnter}>
                        Find <span>Great Deals</span>
                      </button>
                    </div>
                    <div className={slideClass(2)} data-slide="2">
                      <p className="content__blurb">The term “boutique hotel” has been widely used in recent years, but what does it mean and why should you stay in one?</p>
                      <button className="content__link" onClick={handleHeroNext}>
                        Find <span>a Tour</span>
                      </button>
                    </div>
                    <div className={slideClass(3)} data-slide="3">
                      <p className="content__blurb">One of the best ways to make a great vacation quickly horrible is to choose the wrong accommodations for your trip.</p>
                      <button className="content__link" onClick={handleHeroNext}>
                        Find <span>a Route</span>
                      </button>
                    </div>
                    <div className={slideClass(4)} data-slide="4">
                      <p className="content__blurb">The term “boutique hotel” has been widely used in recent years, but what does it mean and why should you stay in one?</p>
                      <button className="content__link" onClick={handleHeroNext}>
                        Find <span>a Guide</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="header__right">
                  <div className="video">
                    <div className="video__left">
                      <div className={slideClass(1)} data-slide="1">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swim.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swim.mp4" muted loop playsInline autoPlay />
                      </div>
                      <div className={slideClass(2)} data-slide="2">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swan.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swan.mp4" muted loop playsInline autoPlay />
                      </div>
                      <div className={slideClass(3)} data-slide="3">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jungle.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jungle.mp4" muted loop playsInline autoPlay />
                      </div>
                      <div className={slideClass(4)} data-slide="4">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jelly.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jelly.mp4" muted loop playsInline autoPlay />
                      </div>
                    </div>
                    <div className="video__right">
                      <div className={slideClass(1)} data-slide="1">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swim.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swim.mp4" muted loop playsInline autoPlay />
                      </div>
                      <div className={slideClass(2)} data-slide="2">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swan.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/swan.mp4" muted loop playsInline autoPlay />
                      </div>
                      <div className={slideClass(3)} data-slide="3">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jungle.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jungle.mp4" muted loop playsInline autoPlay />
                      </div>
                      <div className={slideClass(4)} data-slide="4">
                        <video className="video__one" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jelly.mp4" muted loop playsInline autoPlay />
                        <video className="video__two" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jelly.mp4" muted loop playsInline autoPlay />
                      </div>
                    </div>
                  </div>
                  <div className="controls">
                    <button className="controls__prev" onClick={handleHeroPrev} aria-label="Précédent"></button>
                    <div className="controls__indicator">
                      <span>{activeHeroSlide}</span> / 4
                    </div>
                    <button className="controls__next" onClick={handleHeroNext} aria-label="Suivant"></button>
                  </div>
                </div>
              </header>
            </section>

            {/* Section News Cards */}
            <section className="news-cards-section">
              <h2 className="news-cards-title">
                <span className="title-text">#Derniers_Articles</span>
                <a href="#" className="see-all" onClick={(e) => { e.preventDefault(); setActiveTab('articles'); }}>
                  Voir tous les articles <i className="fas fa-arrow-right"></i>
                </a>
              </h2>
              <div className="content-wrapper">
                {loading ? (
                  <div className="loading-message">Chargement des articles...</div>
                ) : error ? (
                  <div className="error-message">{error}</div>
                ) : (
                  articles.slice(0, 6).map((article, index) => (
                    <div key={article.id} className="news-card">
                      <a href="#" className="news-card__card-link" onClick={(e) => { e.preventDefault(); setActiveTab('articles'); }}></a>
                      <img 
                        src={featuredArticles[index % featuredArticles.length]?.image || "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"} 
                        alt={article.title} 
                        className="news-card__image" 
                      />
                      <div className="news-card__text-wrapper">
                        <h2 className="news-card__title">{article.title}</h2>
                        <div className="news-card__post-date">{formatDate(article.publishedDate)}</div>
                        <div className="news-card__details-wrapper">
                          <p className="news-card__excerpt">{article.content.substring(0, 100)}&hellip;</p>
                          <a href="#" className="news-card__read-more" onClick={(e) => { e.preventDefault(); setActiveTab('articles'); }}>
                            Lire plus <i className="fas fa-long-arrow-alt-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Section Meilleurs Projets - Villes Populaires */}
            <section className="cities-section">
              <main className="owl-carousel-container">
                <div className="cities-header">
                  <span>meilleurs projets</span>
                  <h1>Nos Destinations Populaires</h1>
                  <p>Découvrez nos destinations et projets les plus populaires avec une large gamme d'options et de lieux à explorer.</p>
                </div>
                
                <div className="carousel-wrapper">
                  <div className="owl-nav">
                    <button 
                      className="owl-prev"
                      onClick={() => setCarouselIndex((prev) => (prev - 1 + topCities.length) % topCities.length)}
                    >
                      &#10094;
                    </button>
                    <button 
                      className="owl-next"
                      onClick={() => setCarouselIndex((prev) => (prev + 1) % topCities.length)}
                    >
                      &#10095;
                    </button>
                  </div>

                  <div className="owl-carousel owl-theme">
                    {topCities.map((city, index) => (
                      <div 
                        key={city.id} 
                        className={`item ${
                          index === carouselIndex ? 'active' : ''
                        }`}
                      >
                        <div className="city-card">
                          <img src={city.image} alt={city.city} />
                          <div className="city-info">
                            <h3>{city.city}</h3>
                            <p>{city.country}</p>
                            <span className="places-count">{city.places} places</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </section>

            {/* Section Articles Populaires */}
            <section className="top-picks">
              <h1 className="top-picks__title">Top 10 des Articles les Plus Populaires</h1>
              <ul className="top-picks__track">
                {topPicksArticles.map((item, index) => (
                  <li key={index} className="item top-picks__item">
                    <a href={item.link} className="item__card" target="_blank" rel="noopener noreferrer">
                      <img src={item.src} alt={item.title} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section Steps Productivité */}
            <section className="steps-section">
              <div className="wrapper">
                <section className="section">
                  <h2 className="section-title">
                    3 Simple Steps to Start Your Day Productively
                  </h2>
                  <p className="section-desc">
                    Boost your focus and energy from the moment you wake up with these
                    easy daily habits.
                  </p>
                  <div className="swiper steps">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <article className="card-wrapper">
                          <div className="card-circle">1</div>
                          <div className="card">
                            <h3 className="card-title">Plan Ahead</h3>
                            <p className="card-desc">
                              Write down 3 key tasks you want to accomplish today before
                              checking your phone.
                            </p>
                            <figure className="card-figure">
                              <img className="card-img" src="https://arman-borkhani.github.io/codepen-cpc-css-shape/assets/plan.jpg" alt="" />
                            </figure>
                          </div>
                        </article>
                      </div>
                      <div className="swiper-slide">
                        <article className="card-wrapper">
                          <div className="card-circle">2</div>
                          <div className="card">
                            <h3 className="card-title">Get Moving</h3>
                            <p className="card-desc">
                              Do a short workout, stretch, or walk to activate your energy
                              and improve your focus.
                            </p>
                            <figure className="card-figure">
                              <img className="card-img" src="https://arman-borkhani.github.io/codepen-cpc-css-shape/assets/moving.jpg" alt="" />
                            </figure>
                          </div>
                        </article>
                      </div>
                      <div className="swiper-slide">
                        <article className="card-wrapper">
                          <div className="card-circle">3</div>
                          <div className="card">
                            <h3 className="card-title">Find Calm</h3>
                            <p className="card-desc">
                              Spend a few quiet minutes meditating, journaling, or just
                              breathing mindfully before diving into work.
                            </p>
                            <figure className="card-figure">
                              <img className="card-img" src="https://arman-borkhani.github.io/codepen-cpc-css-shape/assets/calm.jpg" alt="" />
                            </figure>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div className="swiper-pagination"></div>
                  </div>
                </section>
              </div>

              <div className="no-support">
                <h2>Your browser doesn't support the `shape()` function yet.</h2>
                To see the live examples, please switch to a supporting browser.
              </div>
            </section>

            {/* Section Pick a Movie */}
            <section className="movie-picker-section">
              <header>
                <h1>Choisir un Film</h1>
              </header>
              <main className="cards-wrapper">
                <div className="cards">
                  <input type="checkbox" aria-label="film, only yesterday" />
                </div>
                <div className="cards">
                  <input type="checkbox" aria-label="film, the wind rises" />
                </div>
                <div className="cards">
                  <input type="checkbox" aria-label="film, howl's moving castle" />
                </div>
                <div className="cards">
                  <input type="checkbox" aria-label="film, ponyo" />
                </div>
                <div className="cards">
                  <input type="checkbox" aria-label="film, the cat returns" />
                </div>
              </main>
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
