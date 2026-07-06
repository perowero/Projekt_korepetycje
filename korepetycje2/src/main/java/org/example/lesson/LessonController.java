package org.example.lesson;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.example.student.Student;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.Authentication;
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
    public Lesson getLessonById(@PathVariable long id){
        Lesson lesson=lessonService.findById(id);
        return lesson;
    }

    @PostMapping
    public Lesson addLesson(@RequestBody LessonDTO lesson){
        return lessonService.saveLesson(lesson);
    }

    @DeleteMapping("/{id}")
    public void deleteLessonById(@PathVariable long id){
        lessonService.deleteLessonById(id);
    }

    @DeleteMapping
    public void deleteLesson(@RequestBody Lesson lesson){
        lessonService.deleteLesson(lesson);
    }

    @GetMapping("/calendar")
    public List<Lesson>lessonsToCalendar(@RequestParam String dataStart, @RequestParam String dataEnd, Authentication authentication){
        LocalDate startlocal = LocalDate.parse(dataStart);
        LocalDate endlocal = LocalDate.parse(dataEnd);
        LocalDateTime start=startlocal.atStartOfDay();
        LocalDateTime end=endlocal.atTime(23,59,59);
        String username=authentication.getName();
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        if (role.equals("ROLE_ADMIN") || role.equals("ADMIN")) {
            return lessonService.allLessonsPeriod(start, end);
        }

        if (role.equals("ROLE_TEACHER") || role.equals("TEACHER")) {
            return lessonService.lessonsForTeacherPeriod(start, end, username);
        }

        return lessonService.lessonUserPeriod(start, end, username);
    }
}
