package engagement.backend.model;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "ContactID", referencedColumnName = "ContactID")
    private Contact contact;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "MentorID", referencedColumnName = "mentorID")
    private Mentor mentor;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "StaffID", referencedColumnName = "staffID")
    private Staff staff;

    @JsonIgnoreProperties({"hibernateLazyInitializer"})
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinTable(name="studentparent", joinColumns=@JoinColumn(name="StudentID", referencedColumnName = "StudentID"), inverseJoinColumns=@JoinColumn(name="ParentID", referencedColumnName = "ParentID"))
    private List<Parent> parents;

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "DOB")
    private Timestamp DOB;

    @Column(name = "Grade")
    private Integer grade;

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

