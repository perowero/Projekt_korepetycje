package org.example.lesson;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    Lesson(){}

    public Lesson(LocalDateTime data, double prize, Student student, Teacher teacher){
        this.data=data;
        this.prize=prize;
        this.student=student;
        this.teacher=teacher;
    }

    @ManyToOne
    @JoinColumn(name="student")
    @JsonBackReference("student-lessons")
    private Student student;

    @ManyToOne
    @JoinColumn(name="teacher")
    @JsonBackReference("teacher-lessons")
    private Teacher teacher;

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
}


