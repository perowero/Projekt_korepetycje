package org.example.lesson;

import java.time.LocalDateTime;

public class LessonDTO {
    private LocalDateTime data;
    private double prize;
    private int studentId;
    private int teacherId;

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

    public double getPrize() { return prize; }
    public void setPrize(double prize) { this.prize = prize; }

    public int getStudentId() { return studentId; }
    public void setStudentId(int studentId) { this.studentId = studentId; }

    public int getTeacherId() { return teacherId; }
    public void setTeacherId(int teacherId) { this.teacherId = teacherId; }
}