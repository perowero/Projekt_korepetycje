package org.example.LessonFiles;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonFileService {
    private LessonFilesRepository lessonFileRepository;

    public LessonFileService(LessonFilesRepository lessonFileRepository){
        this.lessonFileRepository=lessonFileRepository;
    }

    public void add(LessonFile file){
        lessonFileRepository.save(file);
    }

    public List<LessonFile> getAll(){
        return lessonFileRepository.findAll();
    }

    public LessonFile findById(long id){
        return lessonFileRepository.findById(id).orElse(null);
    }
}
