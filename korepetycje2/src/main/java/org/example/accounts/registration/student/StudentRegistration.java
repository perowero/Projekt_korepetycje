package org.example.accounts.registration.student;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.example.accounts.registration.Registration;
import org.example.student.Student;

@Entity
public class StudentRegistration extends Registration {

    @OneToOne
    @JoinColumn(name="student")
    @JsonBackReference("student-registration")
    private Student student;

    StudentRegistration(){};

    StudentRegistration(Student student){
        this.student=student;
        this.role="student";
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setRole(){
        this.role="student";
    }
}
