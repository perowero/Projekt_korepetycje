package org.example.security;

import org.example.accounts.registration.student.StudentRegistration;
import org.example.accounts.registration.student.StudentRegistrationRepository;
import org.example.accounts.registration.teacher.TeacherRegistration;
import org.example.accounts.registration.teacher.TeacherRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StudentRegistrationRepository studentRepository;

    @Autowired
    private TeacherRegistrationRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Najpierw szukamy w tabeli studentów
        Optional<StudentRegistration> student = studentRepository.findByUsername(username);
        if (student.isPresent()) {
            StudentRegistration s = student.get();
            return User.builder()
                    .username(s.getUsername())
                    .password(s.getHash_password())
                    .roles("STUDENT") // Nadajemy rolę Spring Security
                    .build();
        }

        // 2. Jeśli nie ma studenta, szukamy w nauczycielach
        Optional<TeacherRegistration> teacher = teacherRepository.findByUsername(username);
        if (teacher.isPresent()) {
            TeacherRegistration t = teacher.get();
            return User.builder()
                    .username(t.getUsername())
                    .password(t.getHash_password())
                    .roles("TEACHER") // Nadajemy rolę Spring Security
                    .build();
        }

        // 3. Jeśli nigdzie nie ma - rzucamy wyjątek
        throw new UsernameNotFoundException("Nie znaleziono użytkownika o loginie: " + username);
    }
}