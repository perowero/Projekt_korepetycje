package org.example.teacher;

import java.util.List;

import org.example.lesson.Lesson;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    private TeacherService teacherService;

    public TeacherController(TeacherService teacherService){
        this.teacherService=teacherService;
    }
    @GetMapping
    public List<Teacher> getAllTeachers(){
        return teacherService.getAll();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable long id){
        Teacher teacher=teacherService.findById(id);
        return teacher;
    }

    @PostMapping
    public Teacher addTeacher(@RequestBody Teacher teacher){
        return teacherService.saveTeacher(teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacherById(@PathVariable long id){
        teacherService.deleteTeacherById(id);
    }

    @DeleteMapping
    public void deleteTeacher(@RequestBody Teacher teacher){
        teacherService.deleteTeacher(teacher);
    }
}
