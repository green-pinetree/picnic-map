package app.seok.picnicmap.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    @Query(value = "SELECT * FROM location ORDER BY ST_DISTANCE(SPATIAL_POINT, POINT(:lng, :lat)) LIMIT 1",
           nativeQuery = true)
    Location findNearestLocation(@Param("lat") Double lat, @Param("lng") Double lng);
}
