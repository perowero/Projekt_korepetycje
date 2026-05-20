package org.example.accounts.registration.student;

import org.example.lesson.Lesson;
import org.example.student.Student;
import org.example.student.StudentRepository;
import org.springframework.stereotype.Service;
import org.example.accounts.registration.student.StudentRegistrationRepository;

import java.util.List;

@Service
public class StudentRegistrationService {
    private final StudentRegistrationRepository registrationRepository;
    private final StudentRepository studentRepository;

    public StudentRegistrationService(StudentRegistrationRepository registrationRepository,StudentRepository studentRepository){
        this.registrationRepository=registrationRepository;
        this.studentRepository=studentRepository;
    }

    public StudentRegistration addStudent(StudentRegistrationDTO studentDTO){
        Student student=studentRepository.findById(studentDTO.getID()).orElse(null);
        StudentRegistration registration=new StudentRegistration();
        registration.setEmail(studentDTO.getEmail());
        registration.setUsername(studentDTO.getUsername());
        registration.setHash_password(studentDTO.getHash_password());
        registration.setStudent(student);
        return registrationRepository.save(registration);
        //return registration;
    }

    public void deleteStudent(long id){
        registrationRepository.deleteById(id);
    }

    public List<StudentRegistration> getAll() {
        return registrationRepository.findAll();
    }
}
