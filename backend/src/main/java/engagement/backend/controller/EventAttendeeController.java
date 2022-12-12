package engagement.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.sql.Timestamp;
import java.sql.Time;
import java.util.Date;
import java.util.List;

import engagement.backend.model.EventAttendee;
import engagement.backend.repository.EventRepository;
import engagement.backend.repository.MentorRepository;
import engagement.backend.repository.EventAttendeeRepository;
import engagement.backend.model.Staff;
import engagement.backend.model.Mentor;
import engagement.backend.model.Student;
import engagement.backend.model.Parent;

@RestController
@RequestMapping("/api/eventattendees")
public class EventAttendeeController {
    
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private StaffController staffController;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private StudentController studentController;

    @Autowired
    private ParentController parentController;

    @Autowired
    private EventAttendeeRepository eventAttendeeRepository;

    @GetMapping("/")
    public List<EventAttendee> getEventAttendees(){
        return this.eventAttendeeRepository.findAll();
    }

    
    static Specification<EventAttendee> EqualsMentorSpecification(Long mentorID) {
        return (eventAttendee, cq, cb) -> cb.equal(eventAttendee.get("mentor").get("mentorID"), mentorID);
    }

    static Specification<EventAttendee> NotNullMentorSpecification() {
        return (eventAttendee, cq, cb) -> cb.isNotNull(eventAttendee.get("mentor"));
    }

    static Specification<EventAttendee> FromDateSpecification(Date fDate) {
        return (eventAttendee, cq, cb) -> cb.greaterThanOrEqualTo(eventAttendee.get("event").<Date>get("eventDate"), fDate);
    }

    static Specification<EventAttendee> ToDateSpecification(Date tDate) {
        return (eventAttendee, cq, cb) -> cb.lessThanOrEqualTo(eventAttendee.get("event").<Date>get("eventDate"), tDate);
    }

    @GetMapping("/timesheets")
    public List<EventAttendee> getEventAttendeesForTimesheetsWithDates(@RequestParam(required = false, name = "from") @DateTimeFormat(pattern="yyyy-MM-dd") Date fromDate, @RequestParam(required = false, name = "to") @DateTimeFormat(pattern="yyyy-MM-dd") Date toDate){
        if(fromDate!=null && toDate!=null){
            return this.eventAttendeeRepository.findAll(NotNullMentorSpecification().and(FromDateSpecification(fromDate)).and(ToDateSpecification(toDate)));
        }else{
            return this.eventAttendeeRepository.findAll(NotNullMentorSpecification());
        }        
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventAttendee> GetEventAttendee(@PathVariable Long id){
        EventAttendee eventAttendee = eventAttendeeRepository.findById(id).orElse(null);
        if(eventAttendee != null){
            return new ResponseEntity<>(eventAttendee, HttpStatus.FOUND);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//     @PostMapping("/staff/{id}")
//     public ResponseEntity<Student> PostStaffEventAttendee(@PathVariable Long id, @RequestBody EventAttendee eventAttendeetRequest){
//         EventAttendee EventAttendee = staffRepository.findById(id).map(staff -> {
//             studentRequest.setStaff(staff);
//             return studentRepository.save(studentRequest);
//           }).orElseThrow(() -> new RuntimeException("Not found Staff with id = " + id));
      
//         return new ResponseEntity<>(student, HttpStatus.CREATED);
//     }

    @PostMapping("/mentors/")
    public ResponseEntity<EventAttendee> PostMentorStudent(@RequestBody EventAttendee attendeeRequest){
        EventAttendee eventAttendee = mentorRepository.findById(attendeeRequest.getMentor().getId()).map(mentor -> {
            attendeeRequest.setMentor(mentor);
            return eventAttendeeRepository.save(attendeeRequest);
          }).orElseThrow(() -> new RuntimeException("Not found Mentor with id = " + attendeeRequest.getMentor().getId()));
      
        return new ResponseEntity<>(eventAttendee, HttpStatus.CREATED);
    }

//     @PostMapping("/staff/{id}")
//     public ResponseEntity<Student> PostStaffStudent(@PathVariable Long id, @RequestBody Student studentRequest){
//         Student student = staffRepository.findById(id).map(staff -> {
//             studentRequest.setStaff(staff);
//             return studentRepository.save(studentRequest);
//           }).orElseThrow(() -> new RuntimeException("Not found Staff with id = " + id));
      
//         return new ResponseEntity<>(student, HttpStatus.CREATED);
//     }

//     @PostMapping("/mentors/{id}")
//     public ResponseEntity<Student> PostMentorStudent(@PathVariable Long id, @RequestBody Student studentRequest){
//         Student student = mentorRepository.findById(id).map(mentor -> {
//             studentRequest.setMentor(mentor);
//             return studentRepository.save(studentRequest);
//           }).orElseThrow(() -> new RuntimeException("Not found Mentor with id = " + id));
      
//         return new ResponseEntity<>(student, HttpStatus.CREATED);
//     }

    @PutMapping("/")
    public EventAttendee PutEventAttendeesForTimesheets(@RequestBody EventAttendee eventAttendee){
        EventAttendee oldEventAttendee = eventAttendeeRepository.findById(eventAttendee.getId()).orElse(null);
        oldEventAttendee.setHours(eventAttendee.getHours());
  
        return eventAttendeeRepository.save(oldEventAttendee);
    }

    @DeleteMapping("/{id}")
    public Long DeleteEventAttendee(@PathVariable Long id){
        eventAttendeeRepository.deleteById(id);
        return id;
    }
}
