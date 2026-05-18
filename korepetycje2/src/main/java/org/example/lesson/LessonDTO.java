package org.example.lesson;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class LessonDTO {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime data;
    private double prize;
    private long studentId;
    private long teacherId;

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

    public double getPrize() { return prize; }
    public void setPrize(double prize) { this.prize = prize; }

    public long getStudentId() { return studentId; }
    public void setStudentId(int studentId) { this.studentId = studentId; }

    public long getTeacherId() { return teacherId; }
    public void setTeacherId(int teacherId) { this.teacherId = teacherId; }
}