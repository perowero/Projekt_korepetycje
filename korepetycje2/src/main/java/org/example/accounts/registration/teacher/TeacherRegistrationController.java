package org.example.accounts.registration.teacher;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/register/teacher")
@CrossOrigin(origins ="http://localhost:5173")
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
    public TeacherRegistration registerTeacher(@RequestBody TeacherRegistrationDTO teacher){
        return registrationService.addTeacher(teacher);
    }

    @DeleteMapping("/{id}")
    public void unregisterStudent(@PathVariable long id){
        registrationService.deleteTeacher(id);
    }
}
