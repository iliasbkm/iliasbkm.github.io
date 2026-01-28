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
        String dbHost = System.getenv("DB_HOST");
        String dbPort = System.getenv("DB_PORT");
        String dbName = System.getenv("DB_NAME");
        String dbUser = System.getenv("DB_USER");
        String dbPassword = System.getenv("DB_PASSWORD");

        // Try DATABASE_URL first
        if (dbUrl != null && !dbUrl.trim().isEmpty()) {
            if (dbUrl.startsWith("postgresql://")) {
                dbUrl = "jdbc:" + dbUrl;
            }
            return DataSourceBuilder.create()
                    .url(dbUrl)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }

        // Try individual env vars
        if (dbHost != null && !dbHost.trim().isEmpty()) {
            String port = (dbPort != null) ? dbPort : "5432";
            String name = (dbName != null) ? dbName : "koyebdb";
            String user = (dbUser != null) ? dbUser : "postgres";
            String password = (dbPassword != null) ? dbPassword : "";
            
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://" + dbHost + ":" + port + "/" + name)
                    .username(user)
                    .password(password)
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }

        // Fallback - Koyeb PostgreSQL
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://ep-still-dawn-agxuv65v.c-2.eu-central-1.pg.koyeb.app:5432/koyebdb")
                .username("koyeb-adm")
                .password("npg_9eGhHSV2gQFl")
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
