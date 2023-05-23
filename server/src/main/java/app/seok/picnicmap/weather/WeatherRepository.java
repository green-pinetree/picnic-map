package app.seok.picnicmap.weather;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherRepository extends JpaRepository<Weather, Long> {

  @Query("SELECT w FROM Weather w WHERE w.baseDate = :baseDate ORDER BY w.fcstDate ASC, w.createdAt DESC")
  List<Weather> findByBaseDateOrderByFcstDateAscWithLatestCreateAt(
      @Param("baseDate") String baseDate);

  List<Weather> findByBaseDateAndFcstDate(String baseDate, String fcstDate);
}
