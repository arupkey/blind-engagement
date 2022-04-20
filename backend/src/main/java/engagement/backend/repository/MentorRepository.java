package engagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long>{

}