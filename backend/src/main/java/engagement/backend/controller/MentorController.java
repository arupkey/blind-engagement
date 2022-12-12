package engagement.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
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

import engagement.backend.model.Mentor;
import engagement.backend.model.Student;
import engagement.backend.repository.MentorRepository;
import engagement.backend.repository.StudentRepository;
import engagement.backend.model.Contact;

@RestController
@RequestMapping("/api/Mentors")
public class MentorController {
    
    @Autowired
    private ContactController contactController;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/")
    public List<Mentor> getMentors(){
        return this.mentorRepository.findAll();
    }

    // @GetMapping("/AllStudents/")
    // public List<Mentor> getMentorsAllWithStudents(){
    //     return this.mentorRepository.findAllWithStudents();
    // }

    @GetMapping("/{id}")
    public Mentor GetMentor(@PathVariable Long id){
        return mentorRepository.findById(id).orElse(null);

    }

    @PostMapping("/")
    public Mentor PostMentor(@RequestBody Mentor mentor){
        return mentorRepository.save(mentor);
    }
    
    @PutMapping("/")
    public Mentor PutMentor(@RequestBody Mentor mentor){
        Mentor oldMentor = mentorRepository.findById(mentor.getId()).orElse(null);
        oldMentor.setFirstName(mentor.getFirstName());
        oldMentor.setLastName(mentor.getLastName());
        oldMentor.setDOB(mentor.getDOB());
        
        Contact updatedContact = mentor.getContact();
        if(updatedContact.getContactID() == null){
            updatedContact = contactController.PostContact(updatedContact);
        }else{
            updatedContact = contactController.PutContact(updatedContact);
        }
        oldMentor.setContact(updatedContact);

        return mentorRepository.save(oldMentor);
    }

    static Specification<Student> MentorSpecification(Long mentorID) {
        return (student, cq, cb) -> cb.equal(student.get("mentor").get("mentorID"), mentorID);
    }

    @DeleteMapping("/{id}")
    public Long DeleteMentor(@PathVariable Long id){

       List<Student> students = studentRepository.findAll(MentorSpecification(id));

        for(Student std : students){
            std.setMentor(null);
            studentRepository.save(std);
        }

        mentorRepository.deleteById(id);
        return id;
    }


}
