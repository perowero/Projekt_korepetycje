package org.example.lesson;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class LessonController {
    private LessonRepository lessonRepository;

    public LessonController(LessonRepository lessonRepository){
        this.lessonRepository=lessonRepository;
    }
    @GetMapping
    public List<Lesson> getAllLessons(){
        return lessonRepository.findAll();
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable int id){
        Lesson lesson=lessonRepository.findById(id).orElse(null);
        return lesson;
    }
}
