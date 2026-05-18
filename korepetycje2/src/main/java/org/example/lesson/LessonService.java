package org.example.lesson;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import org.example.student.Student;
import org.example.student.StudentRepository;
import org.example.teacher.Teacher;
import org.example.teacher.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {
    private final LessonRepository lessonRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    public LessonService(LessonRepository lessonRepository, TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.teacherRepository=teacherRepository;
        this.lessonRepository = lessonRepository;
        this.studentRepository=studentRepository;
    }

    public Lesson saveLesson(LessonDTO lessonDTO) {
        Student student=studentRepository.findById(lessonDTO.getStudentId()).orElse(null);
        Teacher teacher=teacherRepository.findById(lessonDTO.getTeacherId()).orElse(null);

        Lesson lesson=new Lesson();
        lesson.setData(lessonDTO.getData());
        lesson.setPrize(lessonDTO.getPrize());
        lesson.setTeacher(teacher);
        lesson.setStudent(student);

        return lessonRepository.save(lesson);
    }

    public List<Lesson> getAll() {
        return lessonRepository.findAll();
    }

    public Lesson findById(long id){
        return lessonRepository.findById(id).orElse(null);
    }

    public void deleteLessonById(long id){
        lessonRepository.deleteById(id);
    }

    public void deleteLesson(Lesson lesson){
        lessonRepository.delete(lesson);
    }
}