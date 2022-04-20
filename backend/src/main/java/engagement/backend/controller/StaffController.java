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

import engagement.backend.model.Staff;
import engagement.backend.repository.StaffRepository;

@RestController
@RequestMapping("/api/Staff")
public class StaffController {
    
    @Autowired
    private StaffRepository staffRepository;

    @GetMapping("/")
    public List<Staff> getStaff(){
        return this.staffRepository.findAll();
    }

    @GetMapping("/{id}")
    public Staff GetStaff(@PathVariable Long id){
        return staffRepository.findById(id).orElse(null);

    }

    @PostMapping("/")
    public Staff PostStaff(@RequestBody Staff staff){
        return staffRepository.save(staff);
    }
    
    @PutMapping("/")
    public Staff PutStaff(@RequestBody Staff staff){
        Staff oldStaff = staffRepository.findById(staff.getId()).orElse(null);
        oldStaff.setFirstName(staff.getFirstName());
        oldStaff.setLastName(staff.getLastName());
        oldStaff.setDOB(staff.getDOB());
        oldStaff.setContactID(staff.getContactID());
        return staffRepository.save(oldStaff);
    }

    @DeleteMapping("/{id}")
    public Long DeleteStaff(@PathVariable Long id){
        staffRepository.deleteById(id);
        return id;
    }


}
