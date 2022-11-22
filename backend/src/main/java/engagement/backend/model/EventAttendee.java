package engagement.backend.model;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import engagement.backend.controller.MentorController;
import engagement.backend.controller.StaffController;

import javax.persistence.OneToOne;

import lombok.Data;

@Entity
@Data
@Table(name = "eventattendees")
public class EventAttendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long attendeeID;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "EventID", referencedColumnName = "eventID")
    private Event event;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "StaffID", referencedColumnName = "staffID")
    private Staff staff;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "MentorID", referencedColumnName = "mentorID")
    private Mentor mentor;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "StudentID", referencedColumnName = "studentID")
    private Student student;

    // @JsonIgnoreProperties({"hibernateLazyInitializer"})
    // //@JsonManagedReference
    // @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    // @JoinColumn(name = "ParentID", referencedColumnName = "parentID")
    // private Parent parent;

    @Column(name = "hours")
    private Float hours;

    public Event getEvent(){
        return event;
    }

    public void setEvent(Event e){
        this.event = e;
    }

    public long getId() {
        return attendeeID;
    }

    public void setId(long id) {
        this.attendeeID = id;
    }

    public Staff getStaff(){
        return staff;
    }

    public void setStaff(Staff stff){
        this.staff = stff;
    }

    public Mentor getMentor(){
        return mentor;
    }

    public void setMentor(Mentor mntr){
        this.mentor = mntr;
    }

    public Student getStudent(){
        return student;
    }

    public void setStudent(Student s){
        this.student = s;
    }

    // public Parent getParent(){
    //     return parent;
    // }

    // public void setParent(Parent p){
    //     this.parent = p;
    // }

    public Float getHours() {
        return hours;
    }
    public void setHours(Float hours) {
        this.hours = hours;
    }

}