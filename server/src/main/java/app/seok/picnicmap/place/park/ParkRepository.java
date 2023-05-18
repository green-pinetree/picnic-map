package app.seok.picnicmap.place.park;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  ParkRepository extends JpaRepository<Park, Long> {
}
