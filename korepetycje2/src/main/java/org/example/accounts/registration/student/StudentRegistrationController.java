package org.example.accounts.registration.student;

import org.example.student.StudentDTO;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/register/student")
public class StudentRegistrationController {
    private StudentRegistrationService registrationService;

    public StudentRegistrationController(StudentRegistrationService registrationService){
        this.registrationService=registrationService;
    }

    @GetMapping
    @PreAuthorize("hasRole('TEACHER')")
    public List<StudentRegistration>getAllRegistration(){
        return registrationService.getAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public void registerStudent(@RequestBody StudentDTO student){
         registrationService.addStudent(student);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public void unregisterStudent(@PathVariable long id){
        registrationService.deleteStudent(id);
    }
}
