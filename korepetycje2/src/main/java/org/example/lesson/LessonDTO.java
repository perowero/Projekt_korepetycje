package org.example.lesson;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class LessonDTO {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime data;
    private double prize;
    private Long studentId;
    private Long teacherId;

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

    public double getPrize() { return prize; }
    public void setPrize(double prize) { this.prize = prize; }

    public long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public long getTeacherId() { return teacherId; }
    public void setTeacherId(Long teacherId) { this.teacherId = teacherId; }
}