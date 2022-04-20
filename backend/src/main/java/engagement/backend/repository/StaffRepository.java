package engagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long>{

}