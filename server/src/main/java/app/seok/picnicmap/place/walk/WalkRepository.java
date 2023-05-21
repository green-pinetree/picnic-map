package app.seok.picnicmap.place.walk;

import java.util.List;
import java.util.Map;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface WalkRepository extends JpaRepository<Walk, Long> {

  @Query(value =
      "SELECT w.id AS id, w.course_name AS courseName, w.content AS content, ROUND(w.lng, 5) AS lng"
          + ", ROUND(w.lat, 5) AS lat, w.distance AS distance, w.lead_time AS leadTime"
          + ", w.relate_subway AS relateSubway"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(w.lat, w.lng)), 5) AS near"
          + ", (SELECT GROUP_CONCAT(ROUND(lng, 5)) FROM Walk a "
          + "   WHERE a.course_name = w.course_name GROUP BY course_name) AS lngs"
          + ", (SELECT GROUP_CONCAT(ROUND(lat, 5)) FROM Walk a "
          + "   WHERE a.course_name = w.course_name GROUP BY course_name) AS lats "
          + "FROM Walk w "
          + "WHERE w.id IN "
          + "  (SELECT MIN(id) FROM Walk "
          + "   GROUP BY course_name "
          + "   ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng))) "
          + "ORDER BY near LIMIT :size OFFSET :offset", nativeQuery = true)
  List<WalkDTO> findNearestLocation(@Param("lat") Double lat, @Param("lng") Double lng,
      @Param("size") Integer size, @Param("offset") Integer offset);

  @Query(value =
      "SELECT w.id AS id, w.course_name AS courseName, w.content AS content, ROUND(w.lng, 5) AS lng"
          + ", ROUND(w.lat, 5) AS lat, w.distance AS distance, w.lead_time AS leadTime"
          + ", w.relate_subway AS relateSubway"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(w.lat, w.lng)), 5) AS near"
          + ", (SELECT GROUP_CONCAT(ROUND(lng, 5)) FROM Walk a "
          + "   WHERE a.course_name = w.course_name GROUP BY course_name) AS lngs"
          + ", (SELECT GROUP_CONCAT(ROUND(lat, 5)) FROM Walk a "
          + "   WHERE a.course_name = w.course_name GROUP BY course_name) AS lats "
          + "FROM Walk w WHERE w.id IN ("
          + "   SELECT MIN(id) FROM Walk "
          + "   WHERE detail_course LIKE CONCAT('%', :search, '%') "
          + "      OR course_name LIKE CONCAT('%', :search, '%') "
          + "   GROUP BY course_name "
          + "   ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng))) "
          + "ORDER BY near LIMIT :size OFFSET :offset", nativeQuery = true)
  List<WalkDTO> findByQueryNearestLocation(@Param("search") String search, @Param("lat") Double lat,
      @Param("lng") Double lng, @Param("size") int size, @Param("offset") int offset);

  @Query(value = "SELECT ROUND(w.lng, 5) AS lng, ROUND(w.lat, 5) AS lat "
      + "FROM walk w "
      + "WHERE course_name = (SELECT course_name FROM walk WHERE id = ?1)", nativeQuery = true)
  List<Map<String, Double>> getPathById(Long id);
}
