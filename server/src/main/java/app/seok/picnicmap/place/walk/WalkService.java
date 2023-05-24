package app.seok.picnicmap.place.walk;

import app.seok.picnicmap.util.CoordinateConversion;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class WalkService {

  private final WalkRepository walkRepository;
  private final ObjectMapper objectMapper;
  private final CoordinateConversion coordinateConversion;


  public Walk getWalkById(long id) {
    Optional<Walk> optionalWalk = walkRepository.findById(id);
    if (optionalWalk.isPresent()) {
      Walk walk = optionalWalk.get();
      return walk;
    }
    return new Walk();
  }

  public List<Point> getWalkPathById(long id) {
    List<Map<String, Double>> pointList = walkRepository.getPathById(id);
    List<Point> path = new ArrayList<>();
    System.out.println(path);
    for (Map<String, Double> dot : pointList) {
      Point point = new Point();
      point.setLng(dot.get("lng"));
      point.setLat(dot.get("lat"));
      path.add(point);
    }
    System.out.println(path);
    return path;
  }

  public List<WalkDTO> getSearchWalk(String search, double lat, double lng, int size, int offset) {
    return walkRepository.findByQueryNearestLocation(search, lat, lng, size, offset);
  }

  public List<WalkDTO> getListWalk(double lat, double lng, int size, int offset
      , double latLT, double lngLT, double latRB, double lngRB) {
    return walkRepository.findNearestLocation(lat, lng, size, offset
        , latLT, lngLT, latRB, lngRB);
  }

  public List<WalkDTO> getListWalk(double lat, double lng, int size, int offset) {
    return walkRepository.findNearestLocation(lat, lng, size, offset);
  }

  public int saveWalkFromJson(String aipServiceName, String walkJsonString)
      throws JsonProcessingException {
    Map<String, Object> walkMap = objectMapper.readValue(walkJsonString,
        new TypeReference<Map<String, Object>>() {
        });
    Map<String, Object> walkDulaeInfo = (Map<String, Object>) walkMap.get(aipServiceName);
    List<Map<String, Object>> rowList = (List<Map<String, Object>>) walkDulaeInfo.get("row");
    int listTotalCount = (int) walkDulaeInfo.get("list_total_count");
    for (Map<String, Object> walkObject : rowList) {
      Walk walk = new Walk();
      walk.setCourseCategory(((Double) walkObject.get("COURSE_CATEGORY")).intValue());
      walk.setCourseCategoryNm((String) walkObject.get("COURSE_CATEGORY_NM"));
      walk.setSouthNorthDiv(Integer.parseInt((String) walkObject.get("SOUTH_NORTH_DIV")));
      walk.setSouthNorthDivNm((String) walkObject.get("SOUTH_NORTH_DIV_NM"));
      walk.setAreaGu((String) walkObject.get("AREA_GU"));
      walk.setDistance((String) walkObject.get("DISTANCE"));
      walk.setLeadTime((String) walkObject.get("LEAD_TIME"));
      walk.setCourseLevel((String) walkObject.get("COURSE_LEVEL"));
      walk.setVoteCnt(((Double) walkObject.get("VOTE_CNT")).intValue());
      walk.setRelateSubway((String) walkObject.get("RELATE_SUBWAY"));
      walk.setTrafficInfo((String) walkObject.get("TRAFFIC_INFO"));
      walk.setContent((String) walkObject.get("CONTENT"));
      walk.setCourseName((String) walkObject.get("COURSE_NAME"));
      walk.setDetailCourse((String) walkObject.get("DETAIL_COURSE"));
      walk.setCpiIdx(((Double) walkObject.get("CPI_IDX")).intValue());
      walk.setCpiName((String) walkObject.get("CPI_NAME"));
      walk.setCpiContent((String) walkObject.get("CPI_CONTENT"));
      walk.setX(Double.parseDouble((String) walkObject.get("X")));
      walk.setY(Double.parseDouble((String) walkObject.get("Y")));
      double[] wgs = coordinateConversion.convertGRS80TMToWGS84(walk.getX(), walk.getY());
      walk.setLat(wgs[0]);
      walk.setLng(wgs[1]);
      walkRepository.save(walk);
    }
    return listTotalCount;
  }
}
