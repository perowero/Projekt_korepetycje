package org.example.student;

import java.util.List;

import org.example.lesson.Lesson;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private StudentService studentService;

    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }
    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable long id){
        Student student=studentService.findById(id);
        return student;
    }

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public Student addStudent(@RequestBody Student student){
       return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public void deleteStudentById(@PathVariable long id){
        studentService.deleteStudentById(id);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('TEACHER')")
    public void deleteStudent(@RequestBody Student student){
        studentService.deleteStudent(student);
    }
}
