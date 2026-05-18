package org.example.student;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    public Student findById(long id){
        return studentRepository.findById(id).orElse(null);
    }

    public void deleteStudentById(long id){
        studentRepository.deleteById(id);
    }

    public void deleteStudent(Student student){
        studentRepository.delete(student);
    }
}