package org.example.accounts.registration.admin;

import org.example.admin.Admin;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class AdminRegistration implements CommandLineRunner {

    private final AdminRegistrationRepository registrationRepository;
    private final PasswordEncoder passwordEncoder; // Do bezpiecznego haszowania haseł

    public AdminRegistration(AdminRegistrationRepository registrationRepository, PasswordEncoder passwordEncoder) {
        this.registrationRepository = registrationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Override
    public void run(String... args) throws Exception {
        if (registrationRepository.findByUsername(adminUsername).isEmpty()) {

            Admin admin = new Admin();
            admin.setUsername(adminUsername);
            admin.setEmail(adminEmail);

            admin.setPassword(passwordEncoder.encode(adminPassword));

            admin.setRole();

            registrationRepository.save(admin);

        }
    }
}