package org.example.lesson;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.example.student.Student;
import org.example.teacher.Teacher;

import java.time.LocalDateTime;

@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    private LocalDateTime data;
    private double prize;
    private boolean ispaid;

    Lesson(){}

    public Lesson(LocalDateTime data, double prize, Student student, Teacher teacher){
        this.data=data;
        this.prize=prize;
        this.student=student;
        this.teacher=teacher;
        this.ispaid=false;
    }

    public Lesson(LocalDateTime data, double prize, Student student, Teacher teacher,LessonSummary lessonSummary){
        this.data=data;
        this.prize=prize;
        this.student=student;
        this.teacher=teacher;
        this.ispaid=false;
        this.lessonSummary=lessonSummary;
    }

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="student")
    @JsonIgnoreProperties({"lessons", "hibernateLazyInitializer", "handler"})
    private Student student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="teacher")
    @JsonIgnoreProperties({"lessons", "hibernateLazyInitializer", "handler"})
    private Teacher teacher;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lesson_summary_id")
    private LessonSummary lessonSummary;

    public long getId(){
        return this.id;
    }

    @Override
    public String toString() {
        return "Lesson{" +
                "id=" + id +
                ", data=" + data +
                ", prize=" + prize +
                ", student=" + student +
                ", teacher=" + teacher +
                '}';
    }

    public LocalDateTime getData() {
        return data;
    }

    public double getPrize() {
        return prize;
    }

    public Student getStudent() {
        return student;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public boolean getIspaid() {
        return ispaid;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public void setPrize(double prize) {
        this.prize = prize;
    }

    public void setPaid(boolean paid){
        this.ispaid=paid;
    }

    public boolean isIspaid() {
        return ispaid;
    }

    public void setLessonSummary(LessonSummary lessonSummary) {
        this.lessonSummary = lessonSummary;
    }

    public LessonSummary getLessonSummary() {
        return lessonSummary;
    }
}


