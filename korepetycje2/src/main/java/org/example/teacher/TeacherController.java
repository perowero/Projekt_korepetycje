package org.example.teacher;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class TeacherController {
    private TeacherRepository teacherRepository;

    public TeacherController(TeacherRepository teacherRepository){
        this.teacherRepository=teacherRepository;
    }
    @GetMapping
    public List<Teacher> getAllTeachers(){
        return teacherRepository.findAll();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable int id){
        Teacher teacher=teacherRepository.findById(id).orElse(null);
        return teacher;
    }
}
