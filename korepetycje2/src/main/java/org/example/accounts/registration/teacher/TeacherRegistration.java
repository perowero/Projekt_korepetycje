package org.example.accounts.registration.teacher;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.example.accounts.registration.Registration;
import org.example.student.Student;
import org.example.teacher.Teacher;

@Entity
public class TeacherRegistration extends Registration {

    @OneToOne
    @JoinColumn(name="teacher")
    @JsonBackReference("teacher-registration")
    private Teacher teacher;

    TeacherRegistration(){};

    TeacherRegistration(Teacher teacher){
        this.teacher=teacher;
        this.role="teacher";
    }
}
