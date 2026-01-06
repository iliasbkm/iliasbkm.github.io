package com.binet.backend.config;

import com.binet.backend.model.Article;
import com.binet.backend.model.Project;
import com.binet.backend.repository.ArticleRepository;
import com.binet.backend.repository.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ArticleRepository articleRepository, ProjectRepository projectRepository) {
        return args -> {
            // Vérifier si des données existent déjà
            if (articleRepository.count() == 0) {
                // Initialiser les articles de démonstration
                articleRepository.save(new Article(
                    "Intelligence Artificielle et Médecine",
                    "L'intelligence artificielle révolutionne le domaine médical en permettant des diagnostics plus précis et plus rapides. Les algorithmes d'apprentissage profond analysent des millions de données médicales pour identifier des patterns invisibles à l'œil humain. Cette technologie aide les médecins à détecter précocement les maladies et à personnaliser les traitements pour chaque patient.",
                    "Dr. Ilias Benkamoun",
                    "IA & Santé"
                ));

                articleRepository.save(new Article(
                    "Énergies Renouvelables au Maroc",
                    "Le Maroc s'impose comme un leader africain dans les énergies renouvelables avec ses grands projets solaires et éoliens. L'objectif est d'atteindre 52% d'énergie verte d'ici 2030, une ambition qui transforme le paysage énergétique du pays. Les complexes solaires de Noor Ouarzazate et les parcs éoliens de Tarfaya sont des exemples emblématiques de cette transition énergétique.",
                    "Dr. Ilias Benkamoun",
                    "Environnement"
                ));

                articleRepository.save(new Article(
                    "Blockchain et Transparence",
                    "La technologie blockchain offre des solutions innovantes pour garantir la transparence et la traçabilité dans divers secteurs : finance, logistique, santé. Cette technologie décentralisée redéfinit la confiance numérique en créant des registres immuables et distribués. Les applications vont de la gestion de la chaîne d'approvisionnement à la vérification d'identité numérique.",
                    "Dr. Ilias Benkamoun",
                    "Technologie"
                ));

                articleRepository.save(new Article(
                    "Nanotechnologie et Environnement",
                    "Les nanomatériaux offrent des solutions révolutionnaires pour la dépollution de l'eau et de l'air. Ces technologies émergentes permettent de filtrer les contaminants à l'échelle moléculaire. Des nanoparticules spécialement conçues peuvent capturer les métaux lourds, décomposer les polluants organiques et purifier l'eau de manière plus efficace que les méthodes conventionnelles.",
                    "Dr. Ilias Benkamoun",
                    "Nanotechnologie"
                ));

                articleRepository.save(new Article(
                    "Informatique Quantique",
                    "Les ordinateurs quantiques promettent de résoudre des problèmes jugés impossibles pour les ordinateurs classiques. Cette révolution technologique ouvre la voie à de nouvelles découvertes scientifiques dans des domaines comme la cryptographie, la simulation moléculaire et l'intelligence artificielle. Les qubits permettent des calculs parallèles massifs dépassant les capacités des superordinateurs actuels.",
                    "Dr. Ilias Benkamoun",
                    "Informatique"
                ));

                articleRepository.save(new Article(
                    "Agriculture de Précision",
                    "L'agriculture moderne utilise des drones, capteurs IoT et intelligence artificielle pour optimiser les rendements tout en réduisant l'impact environnemental. Une révolution verte en marche qui permet aux agriculteurs de surveiller en temps réel l'état de leurs cultures, d'optimiser l'irrigation et d'appliquer les engrais de manière ciblée, réduisant ainsi le gaspillage et les coûts.",
                    "Dr. Ilias Benkamoun",
                    "Agriculture"
                ));

                articleRepository.save(new Article(
                    "Exploration Spatiale",
                    "Les missions vers Mars progressent avec de nouvelles technologies de propulsion innovantes. Les agences spatiales développent des systèmes de survie autonomes et des habitats martiens. L'exploration spatiale ne vise pas seulement Mars, mais aussi les lunes de Jupiter et Saturne, où des océans souterrains pourraient abriter la vie.",
                    "Dr. Ilias Benkamoun",
                    "Espace"
                ));

                articleRepository.save(new Article(
                    "Biotechnologie Médicale",
                    "Thérapies géniques et médecine personnalisée transforment le traitement des maladies héréditaires. CRISPR-Cas9 permet d'éditer précisément le génome humain pour corriger des mutations génétiques. Les traitements personnalisés basés sur le profil génétique de chaque patient offrent des taux de réussite bien supérieurs aux thérapies traditionnelles.",
                    "Dr. Ilias Benkamoun",
                    "Biotechnologie"
                ));

                System.out.println("✅ Articles de démonstration initialisés");
            }

            if (projectRepository.count() == 0) {
                // Initialiser les projets de démonstration
                projectRepository.save(new Project(
                    "Système de Gestion Hospitalière",
                    "Plateforme complète pour la gestion des hôpitaux incluant la gestion des patients, des rendez-vous, du personnel médical et des stocks de médicaments. Interface intuitive et sécurisée conforme aux normes RGPD. Le système offre un tableau de bord analytique pour optimiser les opérations hospitalières et améliorer la qualité des soins.",
                    "React, Spring Boot, PostgreSQL, Docker",
                    "https://github.com/iliasbkm/hospital-management"
                ));

                projectRepository.save(new Project(
                    "Application de Suivi Agricole",
                    "Solution IoT pour le monitoring en temps réel des cultures agricoles. Capteurs connectés pour surveiller l'humidité du sol, la température et optimiser l'irrigation. Dashboard analytique pour les agriculteurs avec prévisions météorologiques intégrées et recommandations d'irrigation basées sur l'IA.",
                    "Vue.js, Node.js, MongoDB, MQTT, Arduino",
                    "https://github.com/iliasbkm/agri-monitor"
                ));

                projectRepository.save(new Project(
                    "Plateforme E-Learning Interactive",
                    "Système d'apprentissage en ligne avec cours vidéo, quiz interactifs, forums de discussion et suivi personnalisé de progression. Gamification pour améliorer l'engagement des étudiants. Système de certification automatique et intégration avec les plateformes de visioconférence pour les cours en direct.",
                    "Angular, Django, Redis, WebSocket",
                    "https://github.com/iliasbkm/elearning-platform"
                ));

                projectRepository.save(new Project(
                    "Application de Smart City",
                    "Plateforme IoT pour la gestion intelligente des villes : monitoring du trafic, gestion des déchets, éclairage public intelligent et qualité de l'air. Tableau de bord en temps réel pour les municipalités avec analyses prédictives et alertes automatiques.",
                    "React, Spring Boot, InfluxDB, Kafka",
                    "https://github.com/iliasbkm/smart-city"
                ));

                projectRepository.save(new Project(
                    "Système de Télémédecine",
                    "Plateforme de consultation médicale à distance avec visioconférence sécurisée, partage de dossiers médicaux et prescription électronique. Conforme aux normes de sécurité médicale et intégration avec les systèmes hospitaliers existants.",
                    "React Native, Node.js, PostgreSQL, WebRTC",
                    "https://github.com/iliasbkm/telemedicine"
                ));

                System.out.println("✅ Projets de démonstration initialisés");
            }
        };
    }
}
