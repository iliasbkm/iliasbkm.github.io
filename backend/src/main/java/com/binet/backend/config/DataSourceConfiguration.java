package com.binet.backend.config;

import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DataSourceConfiguration {

    @Bean
    @Primary
    public DataSource dataSource() {
        String dbUrl = System.getenv("DATABASE_URL");

        if (dbUrl != null && !dbUrl.trim().isEmpty()) {
            // Add jdbc: prefix if needed
            if (dbUrl.startsWith("postgresql://")) {
                dbUrl = "jdbc:" + dbUrl;
            }
            return DataSourceBuilder.create()
                    .url(dbUrl)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }

        // Fallback for local development
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/binet")
                .username("postgres")
                .password("postgres")
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
