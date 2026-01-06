// Utilities pour l'intégration API

// Configuration de l'URL de base de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Fonction utilitaire pour les requêtes fetch avec gestion d'erreurs
export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Exemples d'utilisation :

// GET tous les articles
export const getArticles = () => fetchAPI('/articles');

// GET un article par ID
export const getArticleById = (id) => fetchAPI(`/articles/${id}`);

// GET articles par catégorie
export const getArticlesByCategory = (category) => 
  fetchAPI(`/articles/category/${category}`);

// POST créer un article
export const createArticle = (articleData) => 
  fetchAPI('/articles', {
    method: 'POST',
    body: JSON.stringify(articleData),
  });

// PUT mettre à jour un article
export const updateArticle = (id, articleData) => 
  fetchAPI(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(articleData),
  });

// DELETE supprimer un article
export const deleteArticle = (id) => 
  fetchAPI(`/articles/${id}`, {
    method: 'DELETE',
  });

// GET tous les projets
export const getProjects = () => fetchAPI('/projects');

// GET un projet par ID
export const getProjectById = (id) => fetchAPI(`/projects/${id}`);

// POST créer un projet
export const createProject = (projectData) => 
  fetchAPI('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });

// PUT mettre à jour un projet
export const updateProject = (id, projectData) => 
  fetchAPI(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });

// DELETE supprimer un projet
export const deleteProject = (id) => 
  fetchAPI(`/projects/${id}`, {
    method: 'DELETE',
  });
