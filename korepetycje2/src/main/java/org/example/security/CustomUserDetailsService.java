package org.example.security;

import org.example.accounts.registration.admin.AdminRegistrationRepository;
import org.example.accounts.registration.student.StudentRegistration;
import org.example.accounts.registration.student.StudentRegistrationRepository;
import org.example.accounts.registration.teacher.TeacherRegistration;
import org.example.accounts.registration.teacher.TeacherRegistrationRepository;
import org.example.admin.Admin;
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

    @Autowired
    private AdminRegistrationRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            Admin a = admin.get();
            return User.builder()
                    .username(a.getUsername())
                    .password(a.getPassword())
                    .roles("ADMIN")
                    .build();
        }

        Optional<StudentRegistration> student = studentRepository.findByUsername(username);
        if (student.isPresent()) {
            StudentRegistration s = student.get();
            return User.builder()
                    .username(s.getUsername())
                    .password(s.getHash_password())
                    .roles("STUDENT")
                    .build();
        }

        Optional<TeacherRegistration> teacher = teacherRepository.findByUsername(username);
        if (teacher.isPresent()) {
            TeacherRegistration t = teacher.get();
            return User.builder()
                    .username(t.getUsername())
                    .password(t.getHash_password())
                    .roles("TEACHER")
                    .build();
        }
        throw new UsernameNotFoundException("Nie znaleziono użytkownika o loginie: " + username);
    }
}