package org.example.teacher;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import org.example.student.Student;
import org.example.teacher.Teacher;
import org.example.teacher.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    public Teacher findById(long id){
        return teacherRepository.findById(id).orElse(null);
    }

    public void deleteTeacherById(long id){
        teacherRepository.deleteById(id);
    }

    public void deleteTeacher(Teacher teacher){
        teacherRepository.delete(teacher);
    }
}