package app.seok.picnicmap.geolocation;

import app.seok.picnicmap.api.naver.NcloudApiExplorer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeoLocationService {

  private final NcloudApiExplorer ncloudApiExplorer;
  private final GeoLocationRepository geoLocationRepository;

  public GeoLocationResponseDTO getGeoLocation(String ipAddress) {
    //DB에서 조회 최근 1시간 이내 조회 했던 IP는 해당 값으로 출력
    LocalDateTime startTime = LocalDateTime.now().minusHours(1);
    Optional<GeoLocation> optionalGeoLocation = geoLocationRepository.findRecentRecordByIpAddress(
        ipAddress, startTime);

    GeoLocation geoLocation = new GeoLocation();
    try {
      if (optionalGeoLocation.isPresent()) {
        geoLocation = optionalGeoLocation.get();
      } else {
        geoLocation = callNcloudApiGeolocation(ipAddress);
        geoLocationRepository.save(geoLocation);
      }
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    } finally {
      if ("서울특별시".equals(geoLocation.getR1())) {
        return GeoLocationResponseDTO.OkFromGeoLocation(geoLocation);
      }
      return GeoLocationResponseDTO.Ok();
    }

  }

  private GeoLocation callNcloudApiGeolocation(String ipAddress) throws JsonProcessingException {
    String jsonString = String.valueOf(ncloudApiExplorer.getGeolocation(ipAddress));
    ObjectMapper objectMapper = new ObjectMapper();
    jsonString = jsonString.replace("\"long\":", "\"lng\":");
    GeoLocationDTO responseDTO = objectMapper.readValue(jsonString, GeoLocationDTO.class);
    GeoLocation geoLocation = responseDTO.getGeoLocation();
    geoLocation.setIpAddress(ipAddress);
    return geoLocation;
  }
}
