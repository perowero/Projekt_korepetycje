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
                .csrf(csrf -> csrf.disable()) // Wyłączone dla Reacta
                .cors(cors -> cors.disable()) // Wyłączone dla Reacta
                .authorizeHttpRequests(auth -> auth
                        // 1. KLUCZOWA POPRAWKA: Puszczamy absolutnie każdy plik z folderu konsoli H2
                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().permitAll()
                )
                // 2. DRUGA POPRAWKA: Zezwalamy na otwieranie stron w ramkach (szczególnie dla konsoli H2)
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin())
                );

        return http.build();
    }
}