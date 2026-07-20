package org.example.lesson;
import jakarta.transaction.Transactional;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import org.example.student.Student;
import org.example.student.StudentRepository;
import org.example.teacher.Teacher;
import org.example.teacher.TeacherRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Transactional
    public Lesson addLessonSummary(LessonSummary lessonSummary, long id){
        Lesson lesson=findById(id);
        LessonSummary existingSummary = lesson.getLessonSummary();

        if (existingSummary != null) {
            existingSummary.setTopic(lessonSummary.getTopic());
            existingSummary.setDescription(lessonSummary.getDescription());
            existingSummary.setIshomework(lessonSummary.isIshomework());
            existingSummary.setHomework(lessonSummary.getHomework());
        } else {
            lesson.setLessonSummary(lessonSummary);
        }
        return lesson;
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

    public List<Lesson> lessonUserPeriod(LocalDateTime startData, LocalDateTime endData, String user){
        return lessonRepository.findByStudent_Registration_UsernameAndDataBetween(user,startData,endData);
    }

    public List<Lesson> allLessonsPeriod(LocalDateTime start, LocalDateTime end) {
        return lessonRepository.findAllByDataBetween(start, end);
    }

    public List<Lesson> lessonsForTeacherPeriod(LocalDateTime start, LocalDateTime end, String username) {
        return lessonRepository.findAllByTeacherRegistrationUsernameAndDataBetween(username, start, end);
    }

    public List<Lesson>getPayments(long student_id, long teacher_id, boolean ispaid){
        return lessonRepository.findAllByStudentIdAndTeacherIdAndIspaid(student_id,teacher_id,ispaid);
    }

    public List<Lesson>getStudentPayments(String username,boolean ispaid){
        return lessonRepository.findAllByStudentRegistrationUsernameAndIspaid(username,ispaid);
    }

    public List<Lesson>getTeacherPayments(String username,boolean ispaid){
        return lessonRepository.findAllByTeacher_Registration_UsernameAndIspaid(username,ispaid);
    }

    public List<Lesson>getTeacherPaymentsStudent(String usernameTeacher, long studentId, boolean ispaid){
        return lessonRepository.findAllByStudentIdAndTeacher_Registration_UsernameAndIspaid(studentId, usernameTeacher, ispaid);
    }

    public LessonSummary getLessonSummary(long lesson_id){
        Lesson lesson=findById(lesson_id);
        LessonSummary lessonSummary=lesson.getLessonSummary();
        return lessonSummary;
    }

    public boolean checkSummary(long lesson_id){
        LessonSummary lessonSummary=getLessonSummary(lesson_id);
        if(lessonSummary==null){
            return false;
        }
        else{
            return true;
        }
    }
}