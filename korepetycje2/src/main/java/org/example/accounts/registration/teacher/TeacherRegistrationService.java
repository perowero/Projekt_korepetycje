package org.example.accounts.registration.teacher;

import jakarta.transaction.Transactional;
import org.example.accounts.registration.student.StudentRegistration;
import org.example.student.Student;
import org.example.teacher.Teacher;
import org.example.teacher.TeacherDTO;
import org.example.teacher.TeacherRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class TeacherRegistrationService {
    private final TeacherRegistrationRepository registrationRepository;
    private final TeacherRepository teacherRepository;

    public TeacherRegistrationService(TeacherRegistrationRepository registrationRepository,TeacherRepository teacherRepository){
        this.registrationRepository=registrationRepository;
        this.teacherRepository=teacherRepository;
    }

    @Transactional
    public void addTeacher(TeacherDTO teacherDTO){
        TeacherRegistration registration=new TeacherRegistration();
        registration.setEmail(teacherDTO.getEmail());
        registration.setUsername(teacherDTO.getUsername());
        registration.setPassword(teacherDTO.getPassword());
        registration.setRole();

        Teacher teacher=new Teacher();
        teacher.setName(teacherDTO.getName());
        teacher.setSurname(teacherDTO.getSurname());
        TeacherRegistration registrationbuf=registrationRepository.save(registration);
        teacher.setRegistration(registrationbuf);
        registrationbuf.setTeacher(teacher);
        Teacher teacherbuf=teacherRepository.save(teacher);
    }

    public void deleteTeacher(long id){
        registrationRepository.deleteById(id);
    }

    public List<TeacherRegistration> getAll() {
        return registrationRepository.findAll();
    }
}
