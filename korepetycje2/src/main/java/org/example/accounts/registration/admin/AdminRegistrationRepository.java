package org.example.accounts.registration.admin;

import org.example.accounts.registration.teacher.TeacherRegistration;
import org.example.admin.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRegistrationRepository extends JpaRepository<Admin,Long> {
    Optional<Admin> findByUsername(String username);
}
