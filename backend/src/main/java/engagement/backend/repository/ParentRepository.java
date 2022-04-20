package engagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import engagement.backend.model.Parent;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long>{

}
