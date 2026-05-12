package org.example;

import jakarta.transaction.Transactional;
import org.example.lesson.Lesson;
import org.example.lesson.LessonRepository;
import org.example.student.Student;
import org.example.student.StudentRepository;
import org.example.teacher.Teacher;
import org.example.teacher.TeacherRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class,args);
    }

    @Bean
    @Transactional
    public CommandLineRunner testDatabase(
            StudentRepository studentRepo,
            TeacherRepository teacherRepo,
            LessonRepository lessonRepo) {

        return args -> {
            System.out.println("\n--- ETAP 1: DODAWANIE UŻYTKOWNIKÓW ---");

            // Tworzymy nauczyciela
            Teacher mathTeacher = new Teacher("Pan Tomasz", "Matematyka");
            teacherRepo.save(mathTeacher);
            System.out.println("Zapisano nauczyciela: " + mathTeacher);

            // Tworzymy studentów (użyj konstruktora, który sobie stworzyłeś!)
            Student student1 = new Student("Jan", "Kowalski","gtgg",5,true); // Dopasuj argumenty
            Student student2 = new Student("Anna", "Nowak","fhggh",6,false);   // Dopasuj argumenty
            studentRepo.save(student1);
            studentRepo.save(student2);
            System.out.println("Zapisano studentów!");

            System.out.println("\n--- ETAP 2: DODAWANIE LEKCJI (RELACJE) ---");
            // Uwaga: Zanim przypiszemy obiekty do lekcji, MUSZĄ one być już zapisane w bazie (mieć ID)!

            Lesson lesson1 = new Lesson(LocalDateTime.now().plusDays(1),50, student1,mathTeacher);
            Lesson lesson2 = new Lesson(LocalDateTime.now().plusDays(2),60, student2,mathTeacher);
            Lesson lesson3 = new Lesson(LocalDateTime.now().plusDays(3), 50,student1,mathTeacher);

            lessonRepo.save(lesson1);
            lessonRepo.save(lesson2);
            lessonRepo.save(lesson3);
            System.out.println("Zapisano 3 nowe lekcje.");

            System.out.println("\n--- ETAP 3: WYŚWIETLANIE WSZYSTKICH LEKCJI ---");
            lessonRepo.findAll().forEach(System.out::println);

            System.out.println("\n--- ETAP 4: USUWANIE (DELETE) ---");
            // Usuwamy lekcję o id = 2 (Geometria Anny)
            System.out.println("Usuwam lekcję o ID: " + lesson2.getId());
            lessonRepo.deleteById(lesson2.getId()); // Usunięcie po ID
            // Alternatywnie: lessonRepo.delete(lesson2);

            System.out.println("\n--- ETAP 5: WERYFIKACJA PO USUNIĘCIU ---");
            System.out.println("Lekcje pozostałe w systemie:");
            lessonRepo.findAll().forEach(System.out::println);

            System.out.println("\n--- KONIEC TESTU ---");
        };
    }
}
