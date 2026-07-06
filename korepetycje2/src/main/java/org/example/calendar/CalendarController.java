package org.example.calendar;

import org.example.lesson.Lesson;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

public class CalendarController {
    private CalendarRepository calendarRepository;

    public CalendarController(CalendarRepository calendarRepository){
        this.calendarRepository=calendarRepository;
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getLessons(
            @RequestParam("dataStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataStart,
            @RequestParam("dataEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dataEnd
    ){
        List<Lesson>lessons=calendarRepository.findAllByDataBetween(dataStart.atStartOfDay(), dataEnd.atTime(23,59,59));
        return ResponseEntity.ok(lessons);
    }
}
