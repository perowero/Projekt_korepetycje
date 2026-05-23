package org.example.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {

    // Generujemy bezpieczny klucz kryptograficzny dla algorytmu HS256
    private final Key jwtSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Token będzie ważny przez 24 godziny (w milisekundach)
    private final int jwtExpirationMs = 86400000;

    // 1. Tworzenie tokenu po udanym logowaniu
    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(jwtSecret)
                .compact();
    }

    // 2. Wyciąganie loginu użytkownika ze środka tokenu
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // 3. Sprawdzanie czy token jest poprawny i nie wygasł
    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("Niepoprawny token JWT: " + e.getMessage());
        }
        return false;
    }
}