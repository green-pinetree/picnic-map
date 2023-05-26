package app.seok.picnicmap.place.culture;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface CultureRepository extends JpaRepository<Culture, Long> {

  @Query(value =
      "SELECT * FROM (SELECT id AS id, addr AS addr, airport AS airport, blue AS blue, bus_stop AS busStop"
          + ", close_day AS closeDay, create_at AS createAt, delete_at AS deleteAt"
          + ", entr_fee AS entrFee, entr_free AS entrFree, etc_desc AS etcDesc"
          + ", fac_desc AS facDesc, fac_name AS facName, fax AS fax, green AS green"
          + ", homepage AS homepage, lat AS lat, lng AS lng, main_img AS mainImg, num AS num"
          + ", open_day AS openDay, open_hour AS openHour, phne AS phne, red AS red"
          + ", seat_cnt AS seatCnt, subj_code AS subjCode, subway AS subway, update_at AS updateAt"
          + ", yellow AS yellow, subj_number AS subjNumber"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)), 5) AS near "
          + "FROM culture AS a WHERE subj_number IN :type "
          + "ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)) "
          + "LIMIT :size OFFSET :offset) a"
          + " UNION " +
          "(SELECT * FROM (SELECT id AS id, addr AS addr, airport AS airport, blue AS blue, bus_stop AS busStop"
          + ", close_day AS closeDay, create_at AS createAt, delete_at AS deleteAt"
          + ", entr_fee AS entrFee, entr_free AS entrFree, etc_desc AS etcDesc"
          + ", fac_desc AS facDesc, fac_name AS facName, fax AS fax, green AS green"
          + ", homepage AS homepage, lat AS lat, lng AS lng, main_img AS mainImg, num AS num"
          + ", open_day AS openDay, open_hour AS openHour, phne AS phne, red AS red"
          + ", seat_cnt AS seatCnt, subj_code AS subjCode, subway AS subway, update_at AS updateAt"
          + ", yellow AS yellow, subj_number AS subjNumber"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)), 5) AS near "
          + "FROM culture AS a WHERE subj_number IN :type "
          + "AND lat<:latLT AND lng>:lngLT AND lat>:latRB AND lng<:lngRB "
          + "ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)) "
          + "LIMIT 33"
          + ") b) "
      , nativeQuery = true)
  List<CultureDTO> findNearestLocation(@Param("type") int[] type, @Param("lat") Double lat,
      @Param("lng") Double lng, @Param("size") Integer size, @Param("offset") Integer offset
      , @Param("latLT") Double latLT, @Param("lngLT") Double lngLT
      , @Param("latRB") Double latRB, @Param("lngRB") Double lngRB
  );

  @Query(value =
      "SELECT id AS id, addr AS addr, airport AS airport, blue AS blue, bus_stop AS busStop"
          + ", close_day AS closeDay, create_at AS createAt, delete_at AS deleteAt"
          + ", entr_fee AS entrFee, entr_free AS entrFree, etc_desc AS etcDesc"
          + ", fac_desc AS facDesc, fac_name AS facName, fax AS fax, green AS green"
          + ", homepage AS homepage, lat AS lat, lng AS lng, main_img AS mainImg, num AS num"
          + ", open_day AS openDay, open_hour AS openHour, phne AS phne, red AS red"
          + ", seat_cnt AS seatCnt, subj_code AS subjCode, subway AS subway, update_at AS updateAt"
          + ", yellow AS yellow, subj_number AS subjNumber"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)), 5) AS near "
          + "FROM culture AS a WHERE subj_number IN :type "
          + "ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)) "
          + "LIMIT :size OFFSET :offset"
      , nativeQuery = true)
  List<CultureDTO> findNearestLocation(@Param("type") int[] type, @Param("lat") Double lat,
      @Param("lng") Double lng, @Param("size") Integer size,
      @Param("offset") Integer offset);

  @Query(value =
      "SELECT id AS id, addr AS addr, airport AS airport, blue AS blue, bus_stop AS busStop"
          + ", close_day AS closeDay, create_at AS createAt, delete_at AS deleteAt"
          + ", entr_fee AS entrFee, entr_free AS entrFree, etc_desc AS etcDesc"
          + ", fac_desc AS facDesc, fac_name AS facName, fax AS fax, green AS green"
          + ", homepage AS homepage, lat AS lat, lng AS lng, main_img AS mainImg, num AS num"
          + ", open_day AS openDay, open_hour AS openHour, phne AS phne, red AS red"
          + ", seat_cnt AS seatCnt, subj_code AS subjCode, subway AS subway, update_at AS updateAt"
          + ", yellow AS yellow, subj_number AS subjNumber"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)), 5) AS near "
          + "FROM culture "
          + "WHERE addr LIKE CONCAT('%', :search, '%') OR fac_name LIKE CONCAT('%', :search, '%') "
          + "ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(lat, lng)) "
          + "LIMIT :size OFFSET :offset", nativeQuery = true)
  List<CultureDTO> findByQueryNearestLocation(@Param("search") String search,
      @Param("lat") Double lat, @Param("lng") Double lng, @Param("size") int size,
      @Param("offset") int offset);

}
