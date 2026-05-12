package org.example.student;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.example.lesson.Lesson;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    private String name;
    private String surname;
    private String adress;
    private int schoolclass;
    private boolean online;
    private boolean active;

    @OneToMany(mappedBy="student",cascade=CascadeType.ALL)
    @JsonManagedReference
    private List<Lesson> lessons=new ArrayList<>();

    Student(){}

    public Student(String name, String surname, String address, int schoolclass, boolean online){
        this.name=name;
        this.surname=surname;
        this.adress=address;
        this.schoolclass=schoolclass;
        this.online=online;
        this.active=true;
    }

    public void addLesson(Lesson lesson){
        lessons.add(lesson);
    }

    public void setInactive(){
        this.active=false;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", adress='" + adress + '\'' +
                ", schoolclass=" + schoolclass +
                ", online=" + online +
                ", active=" + active +
                '}';
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }

    public String getAdress() {
        return adress;
    }

    public int getSchoolclass() {
        return schoolclass;
    }

    public boolean isOnline() {
        return online;
    }

    public boolean isActive() {
        return active;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }
}
