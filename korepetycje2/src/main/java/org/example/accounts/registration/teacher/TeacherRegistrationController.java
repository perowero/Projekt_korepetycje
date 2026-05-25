package org.example.accounts.registration.teacher;

import org.example.teacher.TeacherDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/register/teacher")
public class TeacherRegistrationController {
    private TeacherRegistrationService registrationService;

    public TeacherRegistrationController(TeacherRegistrationService registrationService){
        this.registrationService=registrationService;
    }

    @GetMapping
    public List<TeacherRegistration>getAllRegistration(){
        return registrationService.getAll();
    }

    @PostMapping
    public void registerTeacher(@RequestBody TeacherDTO teacher){
        registrationService.addTeacher(teacher);
    }

    @DeleteMapping("/{id}")
    public void unregisterStudent(@PathVariable long id){
        registrationService.deleteTeacher(id);
    }
}
