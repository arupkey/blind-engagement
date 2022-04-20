package engagement.backend.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Mentors")
public class Mentor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long mentorID;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "DOB")
    private Timestamp DOB;

    @Column(name = "ContactID")
    private long ContactID;

    public Mentor(){

    }

    public Mentor(String firstName, String lastName, Timestamp DOB, long ContactID) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.ContactID = ContactID;
    }


    public long getId() {
        return mentorID;
    }
    public void setId(long id) {
        this.mentorID = id;
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

    public Long getContactID() {
        return ContactID;
    }
    public void setContactID(Long ContactID) {
        this.ContactID = ContactID;
    }


}
