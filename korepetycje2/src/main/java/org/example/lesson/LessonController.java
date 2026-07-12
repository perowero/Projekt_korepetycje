package org.example.lesson;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.example.student.Student;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/payments/{id_student}{id_teacher}{paid}")
    public List<Lesson> getPayments(@PathVariable long id_student, @PathVariable long id_teacher, @PathVariable boolean paid){
        List<Lesson>lessons=lessonService.getPayments(id_student,id_teacher,paid);
        return lessons;
    }

    @GetMapping("/private-payments")
    public ResponseEntity<List<Lesson>> getStudentPayments(Authentication authentication){
        String username = authentication.getName();
        List<Lesson>lessons=lessonService.getStudentPayments(username,true);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/private-unpayments")
    public ResponseEntity<List<Lesson>> getStudentUnpayments(Authentication authentication){
        String username = authentication.getName();
        List<Lesson>lessons=lessonService.getStudentPayments(username,false);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/teacher-payments-all")
    public ResponseEntity<List<Lesson>> getTeacherPayments(Authentication authentication){
        String username = authentication.getName();
        List<Lesson> lessons = lessonService.getTeacherPayments(username, true);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/teacher-unpayments-all")
    public ResponseEntity<List<Lesson>> getTeacherUnpayments(Authentication authentication){
        String username = authentication.getName();
        List<Lesson> lessons = lessonService.getTeacherPayments(username, false);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/teacher-payments-student/{studentId}")
    public ResponseEntity<List<Lesson>>getTeacherStudentPayments(Authentication authentication, @PathVariable long studentId){
        String username = authentication.getName();
        List<Lesson>lessons=lessonService.getTeacherPaymentsStudent(username,studentId,true);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/teacher-unpayments-student/{studentId}")
    public ResponseEntity<List<Lesson>>getTeacherStudentUnpayments(Authentication authentication, @PathVariable long studentId){
        String username = authentication.getName();
        List<Lesson>lessons=lessonService.getTeacherPaymentsStudent(username,studentId,false);
        return ResponseEntity.ok(lessons);
    }
}
