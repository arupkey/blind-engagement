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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Data
@Table(name = "Parents")
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long parentID;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parentID", referencedColumnName = "parentID")
    private StudentParent studentParent;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    //@JsonManagedReference
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ContactID", referencedColumnName = "ContactID")
    private Contact contact;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "DOB")
    private Timestamp DOB;

    public Parent(){

    }

    public Parent(String firstName, String lastName, Timestamp DOB, long ContactID, StudentParent sp, Contact cntct) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        this.studentParent = sp;
        this.contact = cntct;
    }


    public long getId() {
        return parentID;
    }
    public void setId(long id) {
        this.parentID = id;
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

    public StudentParent getStudentParent(){
        return studentParent;
    }

    public void setStudentParent(StudentParent sp){
        this.studentParent = sp;
    }

    public Contact getContact(){
        return contact;
    }

    public void setContact(Contact cntct){
        this.contact = cntct;
    }

}
