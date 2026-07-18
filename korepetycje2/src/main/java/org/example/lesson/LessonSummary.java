package org.example.lesson;

public class LessonSummary {
    private String topic;
    private String description;
    private boolean ishomework;
    private String homework;

    public LessonSummary(String topic, String description, boolean ishomework, String homework){
        this.topic=topic;
        this.description=description;
        this.ishomework=ishomework;
        this.homework=homework;
    }

    public LessonSummary(){}

    public String getTopic() {
        return topic;
    }

    public String getDescription() {
        return description;
    }

    public boolean isIshomework() {
        return ishomework;
    }

    public String getHomework() {
        return homework;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIshomework(boolean ishomework) {
        this.ishomework = ishomework;
    }

    public void setHomework(String homework) {
        this.homework = homework;
    }
}
