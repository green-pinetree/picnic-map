package app.seok.picnicmap.place.park;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ParkService {

  private final ParkRepository parkRepository;
  private final ObjectMapper objectMapper;

  public Park getParkById(long id) {
    Optional<Park> optionalPark = parkRepository.findById(id);
    if (optionalPark.isPresent()) {
      return optionalPark.get();
    }
    return new Park();
  }

  public List<ParkDTO> getSearchPark(String search, double lat, double lng, int size, int offset) {
    System.out.println("service >> " + search + " " + lng + " " + lat + " " + size + " " + offset);
    return parkRepository.findByQueryNearestLocation(search, lat, lng, size, offset);
  }

  public List<ParkDTO> getListPark(double lat, double lng, int size, int offset
      , double latLT, double lngLT, double latRB, double lngRB) {
    System.out.println("service >> " + " " + lng + " " + lat + " " + size + " " + offset);
    return parkRepository.findNearestLocation(lat, lng, size, offset
        , latLT, lngLT, latRB, lngRB
    );
  }

  public void saveParkFromJson(String parkJsonString) throws JsonProcessingException {
    Map<String, Object> parkMap = objectMapper.readValue(parkJsonString,
        new TypeReference<Map<String, Object>>() {
        });
    Map<String, Object> searchParkInfoService = (Map<String, Object>) parkMap.get(
        "SearchParkInfoService");
    List<Map<String, Object>> rowList = (List<Map<String, Object>>) searchParkInfoService.get(
        "row");

    for (Map<String, Object> parkObject : rowList) {
//            Map<String, Object> parkMap = objectMapper.readValue(jsonString, new TypeReference<Map<String, Object>>() {});

      Park park = new Park();
      park.setPIdx((String) parkObject.get("P_IDX"));
      park.setPPark((String) parkObject.get("P_PARK"));
      park.setPListContent((String) parkObject.get("P_LIST_CONTENT"));
      park.setArea((String) parkObject.get("AREA"));
      park.setOpenDt((String) parkObject.get("OPEN_DT"));
      park.setMainEquip((String) parkObject.get("MAIN_EQUIP"));
      park.setMainPlants((String) parkObject.get("MAIN_PLANTS"));
      park.setGuidance((String) parkObject.get("GUIDANCE"));
      park.setVisitRoad((String) parkObject.get("VISIT_ROAD"));
      park.setUseRefer((String) parkObject.get("USE_REFER"));
      park.setPImg((String) parkObject.get("P_IMG"));
      park.setPZone((String) parkObject.get("P_ZONE"));
      park.setPAddr((String) parkObject.get("P_ADDR"));
      park.setPName((String) parkObject.get("P_NAME"));
      park.setPAdminTel((String) parkObject.get("P_ADMINTEL"));
      String longitudeStr = (String) parkObject.get("LONGITUDE");
      if (!longitudeStr.isEmpty()) {
        park.setLongitude(Double.parseDouble(longitudeStr));
      }
      String latitudeStr = (String) parkObject.get("LATITUDE");
      if (!latitudeStr.isEmpty()) {
        park.setLatitude(Double.parseDouble(latitudeStr));
      }
      String gLongitudeStr = (String) parkObject.get("G_LONGITUDE");
      if (!gLongitudeStr.isEmpty()) {
        park.setGLongitude(Double.parseDouble(gLongitudeStr));
      }
      String gLatitudeStr = (String) parkObject.get("G_LATITUDE");
      if (!gLatitudeStr.isEmpty()) {
        park.setGLatitude(Double.parseDouble(gLatitudeStr));
      }
      park.setTemplateUrl((String) parkObject.get("TEMPLATE_URL"));

      parkRepository.save(park);
    }
  }
}
