# 📄 Template LaTeX Moderne - Binet

Ce repository contient un template LaTeX moderne et professionnel conçu spécifiquement pour créer des rapports d'entreprise élégants avec une page de garde modernisée.

## 🎨 Caractéristiques du Design

### Typography Moderne
- **Polices principales** : Lato (titre), Source Sans Pro (texte)
- **Polices de code** : Source Code Pro
- **Fallback** : Polices système pour compatibilité maximale

### Palette de Couleurs
- **emsiBlue** : `RGB(0, 70, 128)` - Couleur principale de marque
- **ramRed** : `RGB(180, 0, 0)` - Couleur d'accent
- **neutralGray** : `RGB(60, 60, 60)` - Texte principal
- **modernBlue** : `RGB(41, 128, 185)` - Éléments modernes
- **accentBlue** : `RGB(52, 152, 219)` - Accents secondaires

### Éléments Visuels Modernes
- ✨ Formes géométriques et dégradés subtils
- 🎯 Séparateurs élégants avec gradients
- 📦 Boîtes colorées avec ombres portées
- 📐 Mise en page avec grilles et alignements précis
- 🎨 Page de garde avec éléments graphiques dynamiques

## 📁 Structure des Fichiers

```
latex-template/
├── modern-report.cls          # Classe LaTeX principale
├── sample-report.tex          # Exemple d'utilisation
├── README-latex.md           # Documentation (ce fichier)
└── images/                   # Répertoire pour logos et images
```

## 🚀 Installation et Utilisation

### Prérequis

**Option 1 : XeLaTeX (Recommandé)**
```bash
# Installation sur Ubuntu/Debian
sudo apt-get install texlive-xetex texlive-fonts-extra

# Installation sur macOS (avec MacTeX)
brew install --cask mactex

# Installation sur Windows (MiKTeX ou TeX Live)
# Télécharger depuis : https://miktex.org/ ou https://www.tug.org/texlive/
```

**Option 2 : pdfLaTeX (Fallback)**
```bash
# Packages LaTeX requis
sudo apt-get install texlive-latex-extra texlive-fonts-recommended
```

### Polices Recommandées (pour XeLaTeX)

Téléchargez et installez ces polices pour un rendu optimal :

1. **Lato** : [Google Fonts Lato](https://fonts.google.com/specimen/Lato)
2. **Source Sans Pro** : [Adobe Source Sans Pro](https://fonts.adobe.com/fonts/source-sans)
3. **Source Code Pro** : [Adobe Source Code Pro](https://fonts.adobe.com/fonts/source-code-pro)

### Compilation

```bash
# Avec XeLaTeX (recommandé pour les polices modernes)
xelatex sample-report.tex
xelatex sample-report.tex  # Deuxième pass pour la table des matières

# Avec pdfLaTeX (fallback)
pdflatex sample-report.tex
pdflatex sample-report.tex
```

## 📖 Guide d'Utilisation

### 1. Créer un Nouveau Rapport

```latex
\documentclass{modern-report}

% Configuration du rapport
\reporttitle{Titre de Votre Rapport}
\reportsubtitle{Sous-titre descriptif}
\reportauthor{Votre Nom}
\reportdate{\today}
\reportversion{Version 1.0}
\reportclient{Nom du Client}
\reportorganization{Votre Organisation}

\begin{document}

% Générer la page de garde moderne
\makemoderncover

% Table des matières
\tableofcontents
\clearpage

% Contenu de votre rapport...

\end{document}
```

### 2. Commandes Personnalisées

#### Page de Garde
```latex
\makemoderncover  % Génère automatiquement une page de garde moderne
```

#### Boîtes Colorées Modernes
```latex
% Boîte d'information standard
\begin{modernbox}{Titre de la Boîte}
Contenu de votre boîte avec design moderne
\end{modernbox}

% Boîte d'avertissement
\begin{warningbox}{Attention}
Message d'avertissement important
\end{warningbox}

% Boîte d'information
\begin{infobox}{Information}
Information complémentaire
\end{infobox}
```

#### Séparateurs Élégants
```latex
\modernseparator  % Crée une ligne de séparation avec gradient
```

#### Tableaux Modernes
```latex
\begin{table}[h]
\centering
\caption{Titre du Tableau}
\begin{tabular}{@{}ll@{}}
\toprule
\moderntablehead{Colonne 1 & Colonne 2} \\
\midrule
Données & Valeurs \\
\bottomrule
\end{tabular}
\end{table}
```

### 3. Structure Recommandée

```latex
% Résumé exécutif
\chapter*{Résumé Exécutif}
\addcontentsline{toc}{chapter}{Résumé Exécutif}

% Chapitres principaux
\chapter{Introduction}
\section{Contexte}
\subsection{Objectifs}

% Conclusion
\chapter*{Conclusion}
\addcontentsline{toc}{chapter}{Conclusion}

% Annexes
\appendix
\chapter{Annexes Techniques}
```

## 🎯 Fonctionnalités Avancées

### En-têtes et Pieds de Page Modernes
- En-tête avec design géométrique et titre du rapport
- Pied de page avec numérotation stylisée
- Lignes décoratives automatiques

### Formatage des Titres
- **Chapitres** : Design avec bandes colorées et effets visuels
- **Sections** : Puces géométriques et lignes de séparation
- **Sous-sections** : Cercles colorés avec numérotation

### Listes Stylisées
- **Listes à puces** : Cercles colorés personnalisés
- **Listes numérotées** : Badges circulaires modernes

## 🔧 Personnalisation

### Modifier les Couleurs
Éditez le fichier `.cls` pour changer la palette :

```latex
\definecolor{emsiBlue}{RGB}{0,70,128}      % Couleur principale
\definecolor{ramRed}{RGB}{180,0,0}         % Couleur d'accent
\definecolor{neutralGray}{RGB}{60,60,60}    % Texte
```

### Ajouter Votre Logo
Remplacez la section logo dans `\makemoderncover` :

```latex
% Dans modern-report.cls, ligne ~XXX
\includegraphics[width=3cm]{images/votre-logo.png}
```

### Personnaliser la Page de Garde
Modifiez la commande `\makemoderncover` dans le fichier `.cls` pour adapter :
- Couleurs des formes géométriques
- Positionnement des éléments
- Taille et style des textes

## 📋 Exemples d'Utilisation

### Rapport Technique
```latex
\reporttitle{Analyse Technique}
\reportsubtitle{Évaluation des Solutions Digitales}
\reportclient{Cabinet Médical XYZ}
```

### Rapport Commercial
```latex
\reporttitle{Proposition Commerciale}
\reportsubtitle{Solutions sur Mesure}
\reportclient{Entreprise ABC}
```

### Rapport d'Audit
```latex
\reporttitle{Audit de Sécurité}
\reportsubtitle{Évaluation des Risques}
\reportclient{Organisation DEF}
```

## 🐛 Résolution de Problèmes

### Erreurs de Compilation

**Erreur : Police non trouvée**
```
Solution : Utilisez pdfLaTeX ou installez les polices manquantes
```

**Erreur : Package non trouvé**
```bash
# Ubuntu/Debian
sudo apt-get install texlive-full

# Ou installer le package spécifique
sudo tlmgr install <nom-du-package>
```

**Erreur : Formes géométriques manquantes**
```
Vérifiez que le package tikz est installé et à jour
```

### Optimisations

**Compilation lente**
- Utilisez `\input` au lieu de `\include` pour les petits fichiers
- Commentez les packages non utilisés
- Utilisez `draft` en mode développement

**Problèmes d'encodage**
- Sauvegardez vos fichiers en UTF-8
- Utilisez `\usepackage[utf8]{inputenc}`

## 📞 Support et Contributions

### Signaler un Bug
Créez une issue avec :
- Version LaTeX utilisée
- Système d'exploitation  
- Message d'erreur complet
- Fichier minimal reproduisant le problème

### Demandes d'Améliorations
Les suggestions d'amélioration sont bienvenues ! Ouvrez une issue avec :
- Description de la fonctionnalité souhaitée
- Cas d'usage concret
- Exemples visuels si possible

## 📝 Changelog

### Version 1.0 (2025-01-22)
- ✨ Création du template moderne initial
- 🎨 Implémentation de la page de garde géométrique
- 📦 Ajout des boîtes colorées personnalisées
- 🔤 Support des polices modernes (Lato, Source Sans Pro)
- 📐 Mise en page responsive et professionnelle
- 🌈 Palette de couleurs de marque intégrée

---

**Développé par Binet** - Solutions digitales innovantes pour cabinets médicaux
*Template compatible LaTeX 2e - Testé avec TeX Live 2023*