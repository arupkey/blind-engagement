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

import engagement.backend.model.Mentor;
import engagement.backend.repository.MentorRepository;

@RestController
@RequestMapping("/api/Mentor")
public class MentorController {
    
    @Autowired
    private MentorRepository mentorRepository;

    @GetMapping("/")
    public List<Mentor> getMentors(){
        return this.mentorRepository.findAll();
    }

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
        oldMentor.setContactID(mentor.getContactID());
        return mentorRepository.save(oldMentor);
    }

    @DeleteMapping("/{id}")
    public Long DeleteMentor(@PathVariable Long id){
        mentorRepository.deleteById(id);
        return id;
    }


}
