package engagement.backend.model;

import java.sql.Timestamp;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.OneToOne;

import lombok.Data;

@Entity
@Data
@Table(name = "contacts")
public class Contact {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ContactID;

    // @JsonBackReference
    // @OneToOne(mappedBy = "contact")
    // private Student student;

    // @JsonBackReference
    // @OneToOne(mappedBy = "contact")
    // private Parent parent;

    // @OneToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "ContactID", referencedColumnName = "ContactID")
    // private Student student;

    @Column(name = "PrimaryPhone")
    private String primaryPhone;

    @Column(name = "HomePhone")
    private String homePhone;

    @Column(name = "CellPhone")
    private String cellPhone;

    @Column(name = "Email")
    private String email;

    @Column(name = "Address1")
    private String address1;

    @Column(name = "Address2")
    private String address2;

    @Column(name = "City")
    private String city;

    @Column(name = "State")
    private String state;   
    
    @Column(name = "Zip")
    private String zip;   

    public Contact() {

    }

    public Contact(String primaryPhone, String homePhone, String cellPhone, String email, String address1, String address2, String city, String state, String zip) {
        super();
        this.primaryPhone = primaryPhone;
        this.homePhone = homePhone;
        this.cellPhone = cellPhone;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        //this.student = stdnt;
        //this.parent = prnt;
    }


    public long getId() {
        return ContactID;
    }
    public void setId(long id) {
        this.ContactID = id;
    }
    public String getPrimaryPhone() {
        return primaryPhone;
    }
    public void setPrimaryPhone(String primaryPhone) {
        this.primaryPhone = primaryPhone;
    }
    public String getHomePhone() {
        return homePhone;
    }
    public void setHomePhone(String homePhone) {
        this.homePhone = homePhone;
    }
    public String getCellPhone() {
        return cellPhone;
    }
    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getAddress1() {
        return address1;
    }
    public void setAddress1(String address1) {
        this.address1 = address1;
    }
    public String getAddress2() {
        return address2;
    }
    public void setAddress2(String address2) {
        this.address2 = address2;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }
    public void setZip(String zip) {
        this.zip = zip;
    }

    // public Student getStudent(){
    //     return student;
    // }

    // public void setStudent(Student stdnt){
    //     this.student = stdnt;
    // }

    // public Parent getParent(){
    //     return parent;
    // }

    // public void setParent(Parent prnt){
    //     this.parent = prnt;
    // }

}
