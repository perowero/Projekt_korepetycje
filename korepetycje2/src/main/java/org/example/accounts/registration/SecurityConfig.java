package org.example.accounts.registration;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Wyłączamy CSRF, żeby React mógł robić POST
                .cors(cors -> cors.disable()) // Wyłączamy wbudowany CORS Spring Security (używasz przecież @CrossOrigin)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // Pozwalamy na dostęp do wszystkich endpointów bez logowania
                );

        return http.build();
    }
}