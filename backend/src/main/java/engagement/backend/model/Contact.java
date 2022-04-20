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
@Table(name = "Contacts")
public class Contact {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long contactID;

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

    public Contact(String pimaryPhone, String homePhone, String cellPhone, String email, String address1, String address2, String city, String state, String zip) {
        super();
        this.primaryPhone = pimaryPhone;
        this.homePhone = homePhone;
        this.cellPhone = cellPhone;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }


    public long getId() {
        return contactID;
    }
    public void setId(long id) {
        this.contactID = id;
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
        this.address1 = address2;
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

}
