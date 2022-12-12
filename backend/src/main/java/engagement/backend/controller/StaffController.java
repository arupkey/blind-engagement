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

import engagement.backend.model.Staff;
import engagement.backend.model.Student;
import engagement.backend.repository.StaffRepository;
import engagement.backend.repository.StudentRepository;
import engagement.backend.model.Contact;

@RestController
@RequestMapping("/api/Staff")
public class StaffController {
    
    @Autowired
    private ContactController contactController;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/")
    public List<Staff> getStaff(){
        return this.staffRepository.findAll();
    }

    // @GetMapping("/AllStudents/")
    // public List<Staff> getStaffAllWithStudents(){
    //     return this.staffRepository.findAllWithStudents();
    // }


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
        
        Contact updatedContact = staff.getContact();
        if(updatedContact.getContactID() == null){
            updatedContact = contactController.PostContact(updatedContact);
        }else{
            updatedContact = contactController.PutContact(updatedContact);
        }
        oldStaff.setContact(updatedContact);

        return staffRepository.save(oldStaff);
    }

    static Specification<Student> StaffSpecification(Long staffID) {
        return (student, cq, cb) -> cb.equal(student.get("staff").get("staffID"), staffID);
    }

    @DeleteMapping("/{id}")
    public Long DeleteStaff(@PathVariable Long id){

       List<Student> students = studentRepository.findAll(StaffSpecification(id));

        for(Student std : students){
            std.setStaff(null);
            studentRepository.save(std);
        }

        staffRepository.deleteById(id);
        return id;
    }


}
