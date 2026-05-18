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
    private long id;
    private String name;
    private String surname;
    private String adress;
    private int schoolclass;
    private boolean online;
    private boolean active;

    @OneToMany(mappedBy="student",cascade=CascadeType.ALL)
    @JsonManagedReference("student-lessons")
    private List<Lesson> lessons=new ArrayList<>();

    public Student(){}

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

    public long getId() {
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

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public void setSchoolclass(int schoolclass) {
        this.schoolclass = schoolclass;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }
}
