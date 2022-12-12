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

import engagement.backend.model.Event;
import engagement.backend.model.EventAttendee;
import engagement.backend.repository.EventRepository;
import engagement.backend.repository.EventAttendeeRepository;


@RestController
@RequestMapping("/api/Events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventAttendeeRepository eventAttendeeRepository;

    @GetMapping("/")
    public List<Event> getEvents(){
        return this.eventRepository.findAll();
    }

    @PostMapping("/")
    public Event PostEvent(@RequestBody Event event){
        return eventRepository.save(event);
    }

    @PutMapping("/")
    public Event PutEvent(@RequestBody Event event){
        Event oldEvent = eventRepository.findById(event.getId()).orElse(null);
        oldEvent.setEventName(event.getEventName());
        oldEvent.setEventDate(event.getEventDate());
        oldEvent.setLocation(event.getLocation());
        oldEvent.setAddress1(event.getAddress1());
        oldEvent.setAddress2(event.getAddress2());
        oldEvent.setCity(event.getCity());
        oldEvent.setState(event.getState());
        oldEvent.setZip(event.getZip());
        oldEvent.setDescription(event.getDescription());
   
        return eventRepository.save(oldEvent);
    }

    static Specification<EventAttendee> EventSpecification(Long eventID) {
        return (eventAttendee, cq, cb) -> cb.equal(eventAttendee.get("event").get("eventID"), eventID);
    }

    @DeleteMapping("/{id}")
    public Long DeleteEvent(@PathVariable Long id){

       List<EventAttendee> eventAttendees = eventAttendeeRepository.findAll(EventSpecification(id));

        for(EventAttendee ea : eventAttendees){
            ea.setEvent(null);
            eventAttendeeRepository.save(ea);
        }

        eventRepository.deleteById(id);
        return id;
    }
}
