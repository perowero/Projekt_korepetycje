package org.example.teacher;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.example.lesson.Lesson;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Teacher {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String surname;
    private boolean active;

    @OneToMany(mappedBy="teacher",cascade= CascadeType.ALL)
    @JsonManagedReference("teacher-lessons")
    private List<Lesson> lessons=new ArrayList<>();

    public Teacher(){}

    public Teacher(String name, String surname){
        this.name=name;
        this.surname=surname;
        this.active=true;
    }

    public void setInactive(){
        this.active=false;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", active=" + active +
                '}';
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public boolean isActive() {
        return active;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
