package org.example.lesson;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import org.example.student.Student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public List<Lesson> getAll() {
        return lessonRepository.findAll();
    }

    public Lesson findById(int id){
        return lessonRepository.findById(id).orElse(null);
    }

    public void deleteLessonById(int id){
        lessonRepository.deleteById(id);
    }

    public void deleteLesson(Lesson lesson){
        lessonRepository.delete(lesson);
    }
}