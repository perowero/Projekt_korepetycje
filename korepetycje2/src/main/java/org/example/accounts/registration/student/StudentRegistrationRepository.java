package org.example.accounts.registration.student;

import org.example.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRegistrationRepository extends JpaRepository<StudentRegistration,Long> {
    Optional<StudentRegistration> findByUsername(String username);
}
