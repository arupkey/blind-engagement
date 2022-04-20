package engagement.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

import engagement.backend.model.Student;
import engagement.backend.repository.StudentRepository;

//@CrossOrigin(origins = "http:localhost:9898")
@RestController
@RequestMapping("/api/Student")
public class StudentController {
    
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/")
    public List<Student> getStudents(){
        return this.studentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Student GetStudent(@PathVariable Long id){
        return studentRepository.findById(id).orElse(null);

    }

    @PostMapping("/")
    public Student PostStudent(@RequestBody Student student){
        return studentRepository.save(student);
    }
    
    @PutMapping("/")
    public Student PutStudent(@RequestBody Student student){
        Student oldStudent = studentRepository.findById(student.getId()).orElse(null);
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setDOB(student.getDOB());
        oldStudent.setGrade(student.getGrade());
        oldStudent.setContactID(student.getContactID());
        oldStudent.setMentorID(student.getMentorID());
        oldStudent.setStaffID(student.getStaffID());
        return studentRepository.save(oldStudent);
    }

    @DeleteMapping("/{id}")
    public Long DeleteStudent(@PathVariable Long id){
        studentRepository.deleteById(id);
        return id;
    }


}
