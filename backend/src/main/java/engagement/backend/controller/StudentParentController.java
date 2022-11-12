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

import engagement.backend.model.StudentParent;
import engagement.backend.repository.StudentParentRepository;

@RestController
@RequestMapping("/api/StudentParent")
public class StudentParentController {
    
    @Autowired
    private StudentParentRepository studentParentRepository;

    @GetMapping("/")
    public List<StudentParent> getStudentParents(){
        return this.studentParentRepository.findAll();
    }

    @GetMapping("/{id}")
    public StudentParent GetParent(@PathVariable Long id){
        return studentParentRepository.findById(id).orElse(null);

    }

    @PostMapping("/")
    public StudentParent PostParent(@RequestBody StudentParent StudentParent){
        return studentParentRepository.save(StudentParent);
    }
    
    @PutMapping("/")
    public StudentParent PutStudentParent(@RequestBody StudentParent StudentParent){
        StudentParent oldStudentParent = studentParentRepository.findById(StudentParent.getId()).orElse(null);
        oldStudentParent.setStudentId(StudentParent.getStudentId());
        oldStudentParent.setParentID(StudentParent.getParentID());
        return studentParentRepository.save(oldStudentParent);
    }

    @DeleteMapping("/{id}")
    public Long DeleteStudentParent(@PathVariable Long id){
        studentParentRepository.deleteById(id);
        return id;
    }

}
