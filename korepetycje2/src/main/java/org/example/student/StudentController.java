package org.example.student;

import java.util.List;

import org.example.lesson.Lesson;
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
    public Student addStudent(@RequestBody Student student){
       return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudentById(@PathVariable long id){
        studentService.deleteStudentById(id);
    }

    @DeleteMapping
    public void deleteStudent(@RequestBody Student student){
        studentService.deleteStudent(student);
    }
}
