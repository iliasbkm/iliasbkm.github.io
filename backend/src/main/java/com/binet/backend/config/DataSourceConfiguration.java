package com.binet.backend.config;

import java.net.URI;
import java.net.URISyntaxException;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

/**
 * Transforms DATABASE_URL from Railway into a proper DataSource.
 * Railway provides: postgresql://user:password@host:port/database
 * This class converts it to JDBC format: jdbc:postgresql://host:port/database
 */
@Configuration
public class DataSourceConfiguration {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        // If DATABASE_URL is provided (Railway), parse and use it
        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            try {
                // Remove "postgresql://" prefix and add "jdbc:"
                if (databaseUrl.startsWith("postgresql://")) {
                    databaseUrl = "jdbc:" + databaseUrl;
                }

                URI dbUri = new URI(databaseUrl);
                String host = dbUri.getHost();
                int port = dbUri.getPort() > 0 ? dbUri.getPort() : 5432;
                String database = dbUri.getPath().substring(1);
                String username = dbUri.getUserInfo().split(":")[0];
                String password = dbUri.getUserInfo().split(":")[1];

                String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, database);

                return DataSourceBuilder.create()
                        .driverClassName("org.postgresql.Driver")
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .build();
            } catch (URISyntaxException e) {
                // If parsing fails, use default
                System.err.println("Failed to parse DATABASE_URL: " + e.getMessage());
            }
        }

        // Default fallback - local development
        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url("jdbc:postgresql://localhost:5432/binet")
                .username("postgres")
                .password("postgres")
                .build();
    }
}
