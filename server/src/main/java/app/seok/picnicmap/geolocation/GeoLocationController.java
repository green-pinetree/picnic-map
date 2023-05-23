package app.seok.picnicmap.geolocation;

import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GeoLocationController {

  private final GeoLocationService geoLocationService;

  @GetMapping("/api/geolocation")
  public GeoLocationResponseDTO getLocation(
      @RequestHeader(value = "X-Forwarded-For", required = false) String ipAddress,
      HttpServletRequest request) {
    if (ipAddress == null || ipAddress.isEmpty()) {
      ipAddress = request.getRemoteAddr();
    }
    return geoLocationService.getGeoLocation(ipAddress);
  }
}
