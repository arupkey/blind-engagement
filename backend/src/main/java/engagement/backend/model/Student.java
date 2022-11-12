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
@Table(name = "students")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentID;

    // @OneToOne
    // @JoinColumn(name="ContactID")
    // private Contact contact;

    // @OneToOne(mappedBy = "student")
    // private Contact contact;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ContactID", referencedColumnName = "ContactID")
    private Contact contact;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "MentorID", referencedColumnName = "mentorID")
    private Mentor mentor;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "StaffID", referencedColumnName = "staffID")
    private Staff staff;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "DOB")
    private Timestamp DOB;

    @Column(name = "Grade")
    private Integer grade;

    // @Column(insertable = false, updatable = false, name = "ContactID", nullable = false)
    // private Long ContactID;

    // @Column(name = "MentorID")
    // private Long MentorID;

    // @Column(name = "StaffID")
    // private Long StaffID;

    // public Student() {
        
    // }

    // public Student(String firstName, String lastName, Timestamp DOB, Integer grade, Long MentorID, Long StaffID) {
    //     super();
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.DOB = DOB;
    //     this.grade = grade;
    //     // this.ContactID = ContactID;
    //     this.mentor = new Mentor();
    //     this.mentor.setMentorID(MentorID);
    //     this.staff = new Staff();
    //     this.staff.setStaffID(StaffID);
    //     //this.contact = cntct;
    //     //this.mentor = mntr;
    //     //this.staff = stff;
    // }

    public long getId() {
        return studentID;
    }
    public void setId(long id) {
        this.studentID = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public Timestamp getDOB() {
        return DOB;
    }
    public void setDOB(Timestamp DOB) {
        this.DOB = DOB;
    }

    public Integer getGrade() {
        return grade;
    }
    public void setGrade(Integer grade) {
        this.grade = grade;
    }
    // public Long getContactID() {
    //     return ContactID;
    // }
    // public void setContactID(Long ContactID) {
    //     this.ContactID = ContactID;
    // }
    // public Long getMentorID() {
    //     return MentorID;
    // }
    // public void setMentorID(Long MentorID) {
    //     this.MentorID = MentorID;
    // }
    // public Long getStaffID() {
    //     return StaffID;
    // }
    // public void setStaffID(Long StaffID) {
    //     this.StaffID = StaffID;
    // }

    public Contact getContact(){
        return contact;
    }

    public void setContact(Contact cntct){
        this.contact = cntct;
    }

    public Mentor getMentor(){
        return mentor;
    }

    public void setMentor(Mentor mntr){
        this.mentor = mntr;
    }

    public Staff getStaff(){
        return staff;
    }

    public void setStaff(Staff stff){
        this.staff = stff;
    }

}

