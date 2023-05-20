package app.seok.picnicmap.geolocation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface GeoLocationRepository extends JpaRepository<GeoLocation, Long> {
    Optional<GeoLocation> findByIpAddress(String ipAddress);

    @Query("SELECT g FROM GeoLocation g WHERE g.ipAddress = :ipAddress AND g.createdAt >= :startTime")
    Optional<GeoLocation> findRecentRecordByIpAddress(String ipAddress, LocalDateTime startTime);

}
