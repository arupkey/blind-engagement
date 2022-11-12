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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@Table(name = "Staff")
public class Staff {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long staffID;

    // @JsonBackReference
    // @OneToMany(mappedBy = "staff")
    // private List<Student> students;

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

    // @Column(name = "ContactID")
    // private Long ContactID;

    public Staff(){

    }

    public Staff(String firstName, String lastName, Timestamp DOB) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.DOB = DOB;
        //this.ContactID = ContactID;
        //this.student = stdnt;
    }


    public long getId() {
        return staffID;
    }
    public void setId(long id) {
        this.staffID = id;
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

    // public Long getContactID() {
    //     return ContactID;
    // }
    // public void setContactID(Long ContactID) {
    //     this.ContactID = ContactID;
    // }

    // public List<Student> getStudent(){
    //     return students;
    // }

    // public void setStudents(List<Student> stdnts){
    //     this.students = stdnts;
    // }

    public Contact getContact(){
        return contact;
    }

    public void setContact(Contact cntct){
        this.contact = cntct;
    }

}
