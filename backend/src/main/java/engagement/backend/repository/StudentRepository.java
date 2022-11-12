package engagement.backend.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Student;
import engagement.backend.model.Mentor;

@Repository 
public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {

    @Query("select s from Student s left join fetch s.mentor")
    List<Student>  findAll();

    //@Query("select s from Student s left join fetch s.contact left join fetch s.mentor left join fetch s.staff")
    @Query("select s from Student s left join fetch s.contact left join fetch s.mentor")
    List<Student>  findAllWithAllInfo();

    @Query("select s from Student s left join fetch s.contact")
    List<Student>  findAllWithContacts();

}