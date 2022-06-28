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

import javax.servlet.http.HttpServletResponse;

import engagement.backend.model.Contact;
import engagement.backend.repository.ContactRepository;

@CrossOrigin(origins = "http:localhost:3000")
@RestController
@RequestMapping("/api/Contact")
public class ContactController {
    
    @Autowired
    private ContactRepository ContactRepository;

    @GetMapping("/")
    public List<Contact> getContacts(){
        return this.ContactRepository.findAll();
    }

    @GetMapping("/{id}")
    public Contact GetContact(@PathVariable Long id, HttpServletResponse response){
        return ContactRepository.findById(id).orElse(null);

    }

    @PostMapping("/")
    public Contact PostContact(@RequestBody Contact Contact){
        return ContactRepository.save(Contact);
    }
    
    @PutMapping("/")
    public Contact PutContact(@RequestBody Contact Contact){
        Contact oldContact = ContactRepository.findById(Contact.getId()).orElse(null);
        oldContact.setPrimaryPhone(Contact.getPrimaryPhone());
        oldContact.setHomePhone(Contact.getHomePhone());
        oldContact.setCellPhone(Contact.getCellPhone());
        oldContact.setEmail(Contact.getEmail());
        oldContact.setAddress1(Contact.getAddress1());
        oldContact.setAddress2(Contact.getAddress2());
        oldContact.setCity(Contact.getCity());
        oldContact.setState(Contact.getState());
        oldContact.setZip(Contact.getZip());
        return ContactRepository.save(oldContact);
    }

    @DeleteMapping("/{id}")
    public Long DeleteContact(@PathVariable Long id){
        ContactRepository.deleteById(id);
        return id;
    }


}
