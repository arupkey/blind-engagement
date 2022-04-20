package engagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{

}