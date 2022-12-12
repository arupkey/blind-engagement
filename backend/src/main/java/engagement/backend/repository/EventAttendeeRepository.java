package engagement.backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import engagement.backend.model.EventAttendee;

@Repository
public interface EventAttendeeRepository extends JpaRepository<EventAttendee, Long>, JpaSpecificationExecutor<EventAttendee> {
 
    @Query("select s from EventAttendee s left join fetch s.event")
    List<EventAttendee>  findAll();
}