package engagement.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long>{

    @Query("select m from Mentor m")
    List<Mentor>  findAll();

    // @Query("select m from Mentor m left join fetch m.students")
    // List<Mentor>  findAllWithStudents();

}