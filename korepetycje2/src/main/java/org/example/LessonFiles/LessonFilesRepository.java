package org.example.LessonFiles;

import org.example.lesson.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonFilesRepository extends JpaRepository<LessonFile,Long> {
}
