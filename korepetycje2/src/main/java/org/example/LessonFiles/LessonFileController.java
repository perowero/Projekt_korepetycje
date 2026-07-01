package org.example.LessonFiles;

import java.io.IOException;
import java.nio.file.Path;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.net.MalformedURLException;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class LessonFileController {
    @Value("${app.upload.dir}")
    private String path;
    private LessonFileService lessonFileService;

    public LessonFileController(LessonFileService lessonFileService) {
        this.lessonFileService = lessonFileService;
    }

    @GetMapping
    public List<LessonFile> getAllFiles() {
        return lessonFileService.getAll();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        Path upload = (Path) Paths.get(path);
        if (!Files.exists(upload)) {
            try {
                Files.createDirectories(upload);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = upload.resolve(uniqueFileName);
        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }

        LessonFile lessonFile = new LessonFile();
        lessonFile.setFilename(file.getOriginalFilename());
        lessonFile.setContentType(file.getContentType());
        lessonFile.setPath(filePath.toString());

        lessonFileService.add(lessonFile);

        return ResponseEntity.ok("zapisano plik");
    }

    @GetMapping("/{id}")
    public LessonFile getFileById(@PathVariable long id) {
        LessonFile file = lessonFileService.findById(id);
        return file;
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        LessonFile lessonFile = lessonFileService.findById(id);
        if (lessonFile == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path filePath = Paths.get(lessonFile.getPath());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                String attachmentHeader = "attachment; filename=\"" + lessonFile.getFilename() + "\"";

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(lessonFile.getContentType()))
                        .header(HttpHeaders.CONTENT_DISPOSITION, attachmentHeader)
                        .body(resource);
            } else {
                return ResponseEntity.internalServerError().build();
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}




