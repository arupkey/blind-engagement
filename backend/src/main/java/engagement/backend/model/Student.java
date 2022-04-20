package engagement.backend.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@Entity
@Data
@Table(name = "Students")
public class Student {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studentID;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "DOB")
    private Timestamp DOB;

    @Column(name = "Grade")
    private Integer grade;

    @Column(name = "ContactID")
    private long ContactID;

    @Column(name = "MentorID")
    private long MentorID;

    @Column(name = "StaffID")
    private long StaffID;

    public Student() {
        
    }

    public Student(String firstName, String lastName, Timestamp DOB, Integer grade, long ContactID, long MentorID, long StaffID) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.grade = grade;
        this.ContactID = ContactID;
        this.MentorID = MentorID;
        this.StaffID = StaffID;
    }

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
    public Long getContactID() {
        return ContactID;
    }
    public void setContactID(Long ContactID) {
        this.ContactID = ContactID;
    }
    public Long getMentorID() {
        return MentorID;
    }
    public void setMentorID(Long MentorID) {
        this.MentorID = MentorID;
    }
    public Long getStaffID() {
        return StaffID;
    }
    public void setStaffID(Long StaffID) {
        this.StaffID = StaffID;
    }


}

