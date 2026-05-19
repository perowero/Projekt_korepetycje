package org.example.accounts.registration.student;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins ="http://localhost:5173")
public class StudentRegistrationController {
    private StudentRegistrationService registrationService;

    public StudentRegistrationController(StudentRegistrationService registrationService){
        this.registrationService=registrationService;
    }

    @GetMapping
    public List<StudentRegistration>getAllRegistration(){
        return registrationService.getAll();
    }

    @PostMapping
    public StudentRegistration registerStudent(@RequestBody StudentRegistrationDTO student){
        return registrationService.addStudent(student);
    }

    @DeleteMapping("/{id}")
    public void unregisterStudent(@PathVariable long id){
        registrationService.deleteStudent(id);
    }
}
