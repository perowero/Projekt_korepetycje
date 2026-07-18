package org.example.accounts.registration.teacher;

import org.example.teacher.TeacherDTO;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')")
    public List<TeacherRegistration>getAllRegistration(){
        return registrationService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void registerTeacher(@RequestBody TeacherDTO teacher){
        registrationService.addTeacher(teacher);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void unregisterTeacher(@PathVariable long id){
        registrationService.deleteTeacher(id);
    }
}
