package org.example.calendar;

import org.example.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Lesson,Long> {
    List<Lesson> findAllByDataBetween(LocalDateTime start, LocalDateTime end);
}
