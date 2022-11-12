package engagement.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long>{
    
    @Query("select s from Staff s")
    List<Staff>  findAll();

    // @Query("select s from Staff s left join fetch s.students")
    // List<Staff>  findAllWithStudents();
}