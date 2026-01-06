package com.binet.backend.config;

import javax.sql.DataSource;

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
        String username = System.getenv("SPRING_DATASOURCE_USERNAME");
        String password = System.getenv("SPRING_DATASOURCE_PASSWORD");

        // If DATABASE_URL is set (Railway environment), use it
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Transform railway postgresql:// URL to jdbc:postgresql://
            if (databaseUrl.startsWith("postgresql://")) {
                databaseUrl = "jdbc:" + databaseUrl;
            }

            DataSourceBuilder<?> builder = DataSourceBuilder.create()
                    .url(databaseUrl)
                    .driverClassName("org.postgresql.Driver");

            if (username != null && !username.isEmpty()) {
                builder.username(username);
            }
            if (password != null && !password.isEmpty()) {
                builder.password(password);
            }

            return builder.build();
        }

        // Fallback to H2 for development
        return DataSourceBuilder.create()
                .url("jdbc:h2:mem:binetdb")
                .driverClassName("org.h2.Driver")
                .username("sa")
                .password("")
                .build();
    }
}
