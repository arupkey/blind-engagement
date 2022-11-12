package engagement.backend.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Data
@Table(name = "studentparent")
public class StudentParent {
    
    // @Embeddable
    // public class CompositePK implements Serializable{ 
    //     protected Long StudentID;
    //     protected Long ParentID;

    //     public CompositePK(){}

    //     public CompositePK(Long StudentID, Long ParentID){
    //         this.StudentID = StudentID;
    //         this.ParentID = ParentID;
    //     }

    //     public Long getStudentID() {
    //         return StudentID;
    //     }
     
    //     public Long getParentID() {
    //         return ParentID;
    //     }
     
    //     @Override
    //     public boolean equals(Object o) {
    //         if (this == o) return true;
    //         if (!(o instanceof CompositePK)) return false;
    //         CompositePK that = (CompositePK) o;
    //         return Objects.equals(getStudentID(), that.getStudentID()) &&
    //                 Objects.equals(getParentID(), that.getParentID());
    //     }
     
    //     @Override
    //     public int hashCode() {
    //         return Objects.hash(getStudentID(), getParentID());
    //     }

    // }

    // @EmbeddedId
    // private CompositePK id;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @OneToOne(mappedBy = "studentParent")
    private Parent parent;
    
    @Column(name = "StudentID")
    private Long studentID;

    @Column(name = "ParentID")
    private Long parentID;

    public StudentParent(){

    }

    public StudentParent(Long sID, Long pID) {
        super();
        this.studentID = sID;
        this.parentID = pID;
        //this.parent = p;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long ID) {
        this.id = ID;
    }

    public long getStudentId() {
        return studentID;
    }
    public void setStudentId(Long id) {
        this.studentID = id;
    }
    public Long getParentID() {
        return parentID;
    }
    public void setParentID(Long id) {
        this.parentID = id;
    }

    public Parent getParent(){
        return parent;
    }

    public void setParent(Parent p){
        this.parent = p;
    }

}