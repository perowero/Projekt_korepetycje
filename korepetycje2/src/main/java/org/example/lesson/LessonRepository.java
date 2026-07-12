package org.example.lesson;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson,Long> {
    List<Lesson> findByStudent_Registration_UsernameAndDataBetween(String username, LocalDateTime start, LocalDateTime end);
    List<Lesson> findAllByDataBetween(LocalDateTime start, LocalDateTime end);
    List<Lesson> findAllByTeacherRegistrationUsernameAndDataBetween(String username, LocalDateTime start, LocalDateTime end);
    List<Lesson> findAllByStudentIdAndTeacherIdAndIspaid(long id_student,long id_teacher, boolean paid);
    List<Lesson> findAllByStudentRegistrationUsernameAndIspaid(String username,boolean ispaid);
    List<Lesson> findAllByTeacher_Registration_UsernameAndIspaid(String username,boolean ispaid);
    List<Lesson> findAllByStudentIdAndTeacher_Registration_UsernameAndIspaid(long studentId,String teacherUsername,boolean ispaid);

}
