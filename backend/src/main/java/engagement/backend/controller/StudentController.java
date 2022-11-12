package engagement.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import engagement.backend.repository.MentorRepository;
import engagement.backend.repository.StaffRepository;
import engagement.backend.repository.StudentRepository;
import engagement.backend.model.Contact;;

//@CrossOrigin(origins = "http:localhost:9898")
@RestController
@RequestMapping("/api/Student")
public class StudentController {
    
    @Autowired
    private ContactController contactController;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/")
    public List<Student> getStudents(){
        return this.studentRepository.findAll();
    }

    @GetMapping("/AllContacts/")
    public List<Student> getStudentsAllWithContacts(){
        return this.studentRepository.findAllWithContacts();
    }

    @GetMapping("/AllInfo/")
    public List<Student> getStudentsAllInfo(){
        return this.studentRepository.findAllWithAllInfo();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> GetStudent(@PathVariable Long id){
        Student student = studentRepository.findById(id).orElse(null);
        if(student != null){
            return new ResponseEntity<>(student, HttpStatus.FOUND);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<Student> PostStudent(@RequestBody Student studentRequest){
        Student student = studentRepository.save(studentRequest);
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    @PostMapping("/staff/{id}")
    public ResponseEntity<Student> PostStaffStudent(@PathVariable Long id, @RequestBody Student studentRequest){
        Student student = staffRepository.findById(id).map(staff -> {
            studentRequest.setStaff(staff);
            return studentRepository.save(studentRequest);
          }).orElseThrow(() -> new RuntimeException("Not found Staff with id = " + id));
      
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    @PostMapping("/mentors/{id}")
    public ResponseEntity<Student> PostMentorStudent(@PathVariable Long id, @RequestBody Student studentRequest){
        Student student = mentorRepository.findById(id).map(mentor -> {
            studentRequest.setMentor(mentor);
            return studentRepository.save(studentRequest);
          }).orElseThrow(() -> new RuntimeException("Not found Mentor with id = " + id));
      
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    @PostMapping("/staff/{sid}/mentors/{mid}")
    public ResponseEntity<Student> PostStaffMentorStudent(@PathVariable Long sid, @PathVariable Long mid, @RequestBody Student studentRequest){
        Student student = staffRepository.findById(sid).map(staff -> {
            studentRequest.setStaff(staff);
            return studentRequest;
          }).orElseThrow(() -> new RuntimeException("Not found Staff with id = " + sid));
          
          student = mentorRepository.findById(mid).map(mentor -> {
            studentRequest.setMentor(mentor);
            return studentRequest;
          }).orElseThrow(() -> new RuntimeException("Not found Mentor with id = " + mid));

        student = studentRepository.save(student);

        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }
    
    @PutMapping("/")
    public Student PutStudent(@RequestBody Student student){
        Student oldStudent = studentRepository.findById(student.getId()).orElse(null);
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setDOB(student.getDOB());
        oldStudent.setGrade(student.getGrade());
        
        Contact updatedContact = contactController.PutContact(student.getContact());
        oldStudent.setContact(updatedContact);

        oldStudent.setStaff(null);
        oldStudent.setMentor(null);
        return studentRepository.save(oldStudent);
    }

    @PutMapping("/staff/{id}")
    public Student PutStaffStudent(@PathVariable Long id, @RequestBody Student student){
        Student oldStudent = studentRepository.findById(student.getId()).orElse(null);
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setDOB(student.getDOB());
        oldStudent.setGrade(student.getGrade());
        
        Contact updatedContact = contactController.PutContact(student.getContact());
        oldStudent.setContact(updatedContact);
        
        oldStudent.setStaff(staffRepository.findById(id).orElse(null));
        oldStudent.setMentor(null);
        return studentRepository.save(oldStudent);
    }

    @PutMapping("/mentors/{id}")
    public Student PutMentorStudent(@PathVariable Long id, @RequestBody Student student){
        Student oldStudent = studentRepository.findById(student.getId()).orElse(null);
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setDOB(student.getDOB());
        oldStudent.setGrade(student.getGrade());
        
        Contact updatedContact = contactController.PutContact(student.getContact());
        oldStudent.setContact(updatedContact);
        
        oldStudent.setStaff(null);
        oldStudent.setMentor(mentorRepository.findById(id).orElse(null));
        return studentRepository.save(oldStudent);
    }

    @PutMapping("/staff/{sid}/mentors/{mid}")
    public Student PutStaffMentorStudent(@PathVariable Long sid, @PathVariable Long mid, @RequestBody Student student){
        Student oldStudent = studentRepository.findById(student.getId()).orElse(null);
        oldStudent.setFirstName(student.getFirstName());
        oldStudent.setLastName(student.getLastName());
        oldStudent.setDOB(student.getDOB());
        oldStudent.setGrade(student.getGrade());
        
        Contact updatedContact = contactController.PutContact(student.getContact());
        oldStudent.setContact(updatedContact);
        
        oldStudent.setStaff(staffRepository.findById(sid).orElse(null));
        oldStudent.setMentor(mentorRepository.findById(mid).orElse(null));
        return studentRepository.save(oldStudent);
    }

    @DeleteMapping("/{id}")
    public Long DeleteStudent(@PathVariable Long id){
        studentRepository.deleteById(id);
        return id;
    }


}
