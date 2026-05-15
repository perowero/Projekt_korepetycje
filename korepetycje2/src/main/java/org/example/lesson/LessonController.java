package org.example.lesson;

import java.util.List;

import org.example.student.Student;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {
    private LessonService lessonService;

    public LessonController(LessonService lessonService){
        this.lessonService=lessonService;
    }
    @GetMapping
    public List<Lesson> getAllLessons(){
        return lessonService.getAll();
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable int id){
        Lesson lesson=lessonService.findById(id);
        return lesson;
    }

    @PostMapping
    public Lesson addLesson(@RequestBody LessonDTO lesson){
        return lessonService.saveLesson(lesson);
    }

    @DeleteMapping("/{id}")
    public void deleteLessonById(@PathVariable int id){
        lessonService.deleteLessonById(id);
    }

    @DeleteMapping
    public void deleteLesson(@RequestBody Lesson lesson){
        lessonService.deleteLesson(lesson);
    }
}
