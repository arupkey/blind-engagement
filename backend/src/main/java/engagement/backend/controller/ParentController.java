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

import engagement.backend.model.Parent;
import engagement.backend.repository.ParentRepository;

@RestController
@RequestMapping("/api/Parent")
public class ParentController {
    
    @Autowired
    private ParentRepository parentRepository;

    @GetMapping("/")
    public List<Parent> getParents(){
        return this.parentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Parent GetParent(@PathVariable Long id){
        return parentRepository.findById(id).orElse(null);

    }

    @PostMapping("/")
    public Parent PostParent(@RequestBody Parent Parent){
        return parentRepository.save(Parent);
    }
    
    @PutMapping("/")
    public Parent PutParent(@RequestBody Parent Parent){
        Parent oldParent = parentRepository.findById(Parent.getId()).orElse(null);
        oldParent.setFirstName(Parent.getFirstName());
        oldParent.setLastName(Parent.getLastName());
        oldParent.setDOB(Parent.getDOB());
        oldParent.setContactID(Parent.getContactID());
        return parentRepository.save(oldParent);
    }

    @DeleteMapping("/{id}")
    public Long DeleteParent(@PathVariable Long id){
        parentRepository.deleteById(id);
        return id;
    }


}
