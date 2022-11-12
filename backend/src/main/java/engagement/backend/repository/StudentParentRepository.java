package engagement.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import engagement.backend.model.StudentParent;

@Repository
public interface StudentParentRepository extends JpaRepository<StudentParent, Long>{
    
    // @Query("select s from StudentParent s where s.studentId = :studentID and s.parentId = :parentID")
    // Optional<StudentParent>  findById(@Param("sID") Long studentID, @Param("pID") Long parentID);

}
