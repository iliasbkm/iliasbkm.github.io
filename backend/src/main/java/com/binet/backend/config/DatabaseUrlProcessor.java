package com.binet.backend.config;

import javax.sql.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && databaseUrl.startsWith("postgresql://")) {
            // Transformer postgresql:// en jdbc:postgresql://
            String jdbcUrl = "jdbc:" + databaseUrl;
            
            return DataSourceBuilder.create()
                    .url(jdbcUrl)
                    .driverClassName("org.postgresql.Driver")
                    .username(System.getenv("SPRING_DATASOURCE_USERNAME"))
                    .password(System.getenv("SPRING_DATASOURCE_PASSWORD"))
                    .build();
        }
        
        // Fallback à H2 pour développement
        return DataSourceBuilder.create()
                .url("jdbc:h2:mem:binetdb")
                .driverClassName("org.h2.Driver")
                .username("sa")
                .password("")
                .build();
    }
}

