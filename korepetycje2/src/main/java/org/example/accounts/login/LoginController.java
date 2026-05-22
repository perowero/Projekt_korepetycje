package org.example.accounts.login;

import org.example.accounts.registration.student.StudentRegistration;
import org.example.accounts.registration.student.StudentRegistrationRepository;
import org.example.accounts.registration.teacher.TeacherRegistration;
import org.example.accounts.registration.teacher.TeacherRegistrationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins ="http://localhost:5173")
public class LoginController {
    private final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder();
    private TeacherRegistrationRepository teacherRegistrationRepository;
    private StudentRegistrationRepository studentRegistrationRepository;

    LoginController(TeacherRegistrationRepository teacherRegistrationRepository, StudentRegistrationRepository studentRegistrationRepository){
        this.studentRegistrationRepository=studentRegistrationRepository;
        this.teacherRegistrationRepository=teacherRegistrationRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?>login(@RequestBody LoginDTO loginDTO){
        String role=loginDTO.getRole();

        if(role.equals("student")){
            StudentRegistration student=studentRegistrationRepository.findByUsername(loginDTO.getUsername()).orElse(null);

            if(student==null){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nie znaleziono użytkownika");
            }

            if(encoder.matches(loginDTO.getPassword(),student.getHash_password())){
                return ResponseEntity.ok(student);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błędne dane logowania");
            }
        }else if(role.equals("teacher")){
            TeacherRegistration teacher=teacherRegistrationRepository.findByUsername(loginDTO.getUsername()).orElse(null);

            if(teacher==null){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nie znaleziono użytkownika");
            }

            if(encoder.matches(loginDTO.getPassword(),teacher.getHash_password())){
                return ResponseEntity.ok(teacher);
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błędne dane logowania");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Błąd logowania");
    }
}
