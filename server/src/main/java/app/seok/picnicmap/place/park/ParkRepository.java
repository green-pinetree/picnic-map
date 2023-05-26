package app.seok.picnicmap.place.park;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface ParkRepository extends JpaRepository<Park, Long> {

  @Query(value =
      "SELECT * FROM (SELECT id AS id, AREA AS area, create_at AS createdAt, delete_at AS deletedAt"
          + ", g_latitude AS gLatitude, guidance AS guidance, latitude AS latitude"
          + ", longitude AS longitude, main_equip AS mainEquip, main_plants AS mainPlants"
          + ", open_dt AS openDt, p_addr AS pAddr, p_admin_tel AS pAdminTel, p_idx AS pIdx"
          + ", p_img AS pImg, p_list_content AS pListContent, p_name AS pName, p_park AS pPark"
          + ", p_zone AS pZone, template_url AS templateUrl, update_at AS updatedAt"
          + ", use_refer AS useRefer, visit_road AS visitRoad"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)), 5) AS near "
          + "FROM park ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)) "
          + "LIMIT :size OFFSET :offset) a"
          + " UNION " +
          "(SELECT * FROM (SELECT id AS id, AREA AS area, create_at AS createdAt, delete_at AS deletedAt"
          + ", g_latitude AS gLatitude, guidance AS guidance, latitude AS latitude"
          + ", longitude AS longitude, main_equip AS mainEquip, main_plants AS mainPlants"
          + ", open_dt AS openDt, p_addr AS pAddr, p_admin_tel AS pAdminTel, p_idx AS pIdx"
          + ", p_img AS pImg, p_list_content AS pListContent, p_name AS pName, p_park AS pPark"
          + ", p_zone AS pZone, template_url AS templateUrl, update_at AS updatedAt"
          + ", use_refer AS useRefer, visit_road AS visitRoad"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)), 5) AS near "
          + "FROM park "
          + "WHERE latitude<:latLT AND longitude>:lngLT AND latitude>:latRB AND longitude<:lngRB "
          + "ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)) "
          + "LIMIT 33"
          + ") b)"
      , nativeQuery = true)
  List<ParkDTO> findNearestLocation(@Param("lat") Double lat, @Param("lng") Double lng,
      @Param("size") Integer size, @Param("offset") Integer offset
      , @Param("latLT") Double latLT, @Param("lngLT") Double lngLT
      , @Param("latRB") Double latRB, @Param("lngRB") Double lngRB
  );

  @Query(value =
      "SELECT id AS id, AREA AS area, create_at AS createdAt, delete_at AS deletedAt"
          + ", g_latitude AS gLatitude, guidance AS guidance, latitude AS latitude"
          + ", longitude AS longitude, main_equip AS mainEquip, main_plants AS mainPlants"
          + ", open_dt AS openDt, p_addr AS pAddr, p_admin_tel AS pAdminTel, p_idx AS pIdx"
          + ", p_img AS pImg, p_list_content AS pListContent, p_name AS pName, p_park AS pPark"
          + ", p_zone AS pZone, template_url AS templateUrl, update_at AS updatedAt"
          + ", use_refer AS useRefer, visit_road AS visitRoad"
          + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)), 5) AS near "
          + "FROM park ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)) "
          + "LIMIT :size OFFSET :offset"
      , nativeQuery = true)
  List<ParkDTO> findNearestLocation(@Param("lat") Double lat, @Param("lng") Double lng,
      @Param("size") Integer size, @Param("offset") Integer offset
  );

  @Query(value = "SELECT id AS id, AREA AS area, create_at AS createdAt, delete_at AS deletedAt"
      + ", g_latitude AS gLatitude, guidance AS guidance, latitude AS latitude"
      + ", longitude AS longitude, main_equip AS mainEquip, main_plants AS mainPlants"
      + ", open_dt AS openDt, p_addr AS pAddr, p_admin_tel AS pAdminTel, p_idx AS pIdx"
      + ", p_img AS pImg, p_list_content AS pListContent, p_name AS pName, p_park AS pPark"
      + ", p_zone AS pZone, template_url AS templateUrl, update_at AS updatedAt"
      + ", use_refer AS useRefer, visit_road AS visitRoad"
      + ", ROUND(ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)), 5) AS near "
      + "FROM park "
      + "WHERE p_addr LIKE CONCAT('%', :search, '%') OR p_park LIKE CONCAT('%', :search, '%') "
      + "ORDER BY ST_DISTANCE(POINT(:lat, :lng), POINT(latitude, longitude)) "
      + "LIMIT :size OFFSET :offset", nativeQuery = true)
  List<ParkDTO> findByQueryNearestLocation(@Param("search") String search, @Param("lat") Double lat,
      @Param("lng") Double lng, @Param("size") int size, @Param("offset") int offset);
}
