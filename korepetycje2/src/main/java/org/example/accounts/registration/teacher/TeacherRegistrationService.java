package org.example.accounts.registration.teacher;

import org.example.teacher.Teacher;
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

    public TeacherRegistration addTeacher(TeacherRegistrationDTO teacherDTO){
        TeacherRegistration teacherRegistration=new TeacherRegistration();
        Teacher teacher=teacherRepository.findById(teacherDTO.getID()).orElse(null);

        TeacherRegistration registration=new TeacherRegistration();
        registration.setEmail(teacherDTO.getEmail());
        registration.setUsername(teacherDTO.getEmail());
        registration.setHash_password(teacherDTO.getHash_password());

        return registrationRepository.save(registration);
    }

    public void deleteTeacher(long id){
        registrationRepository.deleteById(id);
    }

    public List<TeacherRegistration> getAll() {
        return registrationRepository.findAll();
    }
}
