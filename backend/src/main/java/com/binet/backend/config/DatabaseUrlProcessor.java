package com.binet.backend.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.PropertiesPropertySource;

import java.util.Properties;

public class DatabaseUrlProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        String databaseUrl = environment.getProperty("DATABASE_URL");
        
        // Si DATABASE_URL commence par postgresql://, le transformer en jdbc:postgresql://
        if (databaseUrl != null && databaseUrl.startsWith("postgresql://")) {
            String jdbcUrl = "jdbc:" + databaseUrl;
            
            // Créer une nouvelle propriété avec l'URL transformée
            Properties props = new Properties();
            props.put("spring.datasource.url", jdbcUrl);
            
            MutablePropertySources sources = environment.getPropertySources();
            sources.addFirst(new PropertiesPropertySource("database-url-transformer", props));
        }
    }
}
