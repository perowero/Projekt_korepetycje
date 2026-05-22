package org.example.accounts.registration.student;

import jakarta.transaction.Transactional;
import org.example.lesson.Lesson;
import org.example.student.Student;
import org.example.student.StudentDTO;
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

    @Transactional
    public void addStudent(StudentDTO studentDTO){
        StudentRegistration registration=new StudentRegistration();
        registration.setEmail(studentDTO.getEmail());
        registration.setUsername(studentDTO.getUsername());
        registration.setPassword(studentDTO.getPassword());
        registration.setRole();

        Student student=new Student();
        student.setName(studentDTO.getName());
        student.setSurname(studentDTO.getSurname());
        student.setAdress(studentDTO.getAddress());
        student.setSchoolclass(studentDTO.getSchoolclass());
        student.setOnline(false);
        StudentRegistration registrationbuf=registrationRepository.save(registration);
        student.setRegistration(registrationbuf);
        registrationbuf.setStudent(student);
        Student studentbuf=studentRepository.save(student);

    }

    public void deleteStudent(long id){
        registrationRepository.deleteById(id);
    }

    public List<StudentRegistration> getAll() {
        return registrationRepository.findAll();
    }
}
