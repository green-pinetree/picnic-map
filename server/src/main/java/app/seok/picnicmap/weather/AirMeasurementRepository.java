package app.seok.picnicmap.weather;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AirMeasurementRepository extends JpaRepository<AirMeasurement, Long> {

  @Query(value = "SELECT * FROM air_measurement WHERE district = :district AND create_at>=:time ORDER BY create_at DESC LIMIT 1", nativeQuery = true)
  Optional<AirMeasurement> findLatestByDistrict(@Param("district") String district,
      @Param("time") LocalDateTime time);

}
