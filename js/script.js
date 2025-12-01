// Binet Journal Scientifique - JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeArticleFiltering();
    initializeScrollAnimations();
    initializeVideoCards();
    initializeFormHandling();
    initializeSmoothScrolling();
    initializeLoadingAnimations();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Reset hamburger animation
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.header');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(23, 25, 64, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
        }
    });
}

// Article filtering functionality
function initializeArticleFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articleCards = document.querySelectorAll('.article-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles with smooth animation
            articleCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, 100);
                } else {
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for different elements
                if (entry.target.classList.contains('article-card')) {
                    // Stagger animation for article cards
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                if (entry.target.classList.contains('project-card')) {
                    // Stagger animation for project cards
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .article-card,
        .recent-card,
        .project-card,
        .video-card,
        .contact-item,
        .featured-article
    `);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Video card interactions
function initializeVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
            
            // Here you would typically open a video modal or redirect to YouTube
            console.log('Video card clicked - implement video playback');
        });
        
        // Hover effect for play button
        const playButton = card.querySelector('.play-button');
        if (playButton) {
            card.addEventListener('mouseenter', function() {
                playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        }
    });
}

// Form handling
function initializeFormHandling() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Simulate form submission
            button.textContent = 'Inscription...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Inscrit ✓';
                button.style.background = '#27ae60';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.querySelector('input[type="email"]').value = '';
                }, 2000);
            }, 1500);
            
            console.log('Newsletter subscription for:', email);
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading animations and entrance effects
function initializeLoadingAnimations() {
    // Add entrance animations to elements as they become visible
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const entranceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add entrance class based on element type
                if (element.classList.contains('section-header')) {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                } else if (element.classList.contains('featured-article')) {
                    element.style.animation = 'slideInRight 0.8s ease forwards';
                } else if (element.classList.contains('contact-section') || element.classList.contains('about-section')) {
                    element.style.animation = 'fadeInUp 0.6s ease forwards';
                }
                
                // Unobserve after animation
                entranceObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe section headers and major elements
    const entranceElements = document.querySelectorAll(`
        .section-header,
        .featured-article,
        .contact-section,
        .about-section
    `);

    entranceElements.forEach(element => {
        entranceObserver.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (for future implementation)
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        const debouncedSearch = debounce(function(query) {
            // Implement search functionality here
            console.log('Searching for:', query);
        }, 300);

        searchInput.addEventListener('input', function() {
            debouncedSearch(this.value);
        });
    }
}

// Back to top button functionality
function initializeBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.classList.add('back-to-top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #00638e;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initializeBackToTop);

// Dark mode toggle (for future implementation)
function initializeDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Keyboard navigation for accessibility
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initializeKeyboardNavigation);

// Performance optimization - Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
    }
    
    .back-to-top:hover {
        transform: translateY(-3px) !important;
        background: #003d6a !important;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #00638e !important;
        outline-offset: 2px !important;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: #171940;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:first-child {
            transform: rotate(45deg) translateY(8px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:last-child {
            transform: rotate(-45deg) translateY(-8px);
        }
    }
`;

document.head.appendChild(style);

// Console welcome message
console.log(`
🔬 Bienvenue sur Binet - Journal Scientifique
📊 Site développé avec passion pour la science
🚀 Version 1.0 - Décembre 2025
`);

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeArticleFiltering,
        initializeScrollAnimations,
        initializeVideoCards,
        initializeFormHandling
    };
}
