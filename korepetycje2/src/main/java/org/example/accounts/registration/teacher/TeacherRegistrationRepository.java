package org.example.accounts.registration.teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRegistrationRepository extends JpaRepository<TeacherRegistration,Long> {
    Optional<TeacherRegistration> findByUsername(String username);
}
