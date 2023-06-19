package app.seok.picnicmap.weather;

import app.seok.picnicmap.api.openapi.MidLandFcstDTO;
import app.seok.picnicmap.api.openapi.UltraSrtNcstDTO;
import app.seok.picnicmap.api.openapi.VilageFcstDTO;
import app.seok.picnicmap.api.seoul.RealtimeCityAirDTO;
import app.seok.picnicmap.location.LocationDTO;
import app.seok.picnicmap.location.LocationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WeatherController {

  private final LocationService locationService;
  private final WeatherService weatherService;

  @GetMapping("/api/weather")
  public WeatherDTO weather(@RequestParam(value = "lng", defaultValue = "126.977380") Double lng,
      @RequestParam(value = "lat", defaultValue = "37.575843") Double lat) {
    LocationDTO location = locationService.findNearestLocation(lat, lng);
    LocalDateTime now = LocalDateTime.now();
    String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    return weatherService.getWeatherDTO(date, location);
  }

  @GetMapping("/update/location")
  public String locationInput(WeatherRequestDTO weatherRequestDTO) throws JsonProcessingException {
    locationService.saveLocation();
    return weatherRequestDTO.toString();
  }

  @GetMapping("/api/weather/location")
  public String getLocation(@RequestParam(value = "lng", defaultValue = "126.977380") Double lng,
      @RequestParam(value = "lat", defaultValue = "37.575843") Double lat)
      throws JsonProcessingException {
    LocationDTO location = locationService.findNearestLocation(lat, lng);
    return location.toString();
  }

  @GetMapping("/test/weather/ultra")
  public UltraSrtNcstDTO testUltraSrtNcst() throws IOException {
    return weatherService.getUltraSrtNcst();
  }

  @GetMapping("/test/weather/vilage")
  public VilageFcstDTO testVilageFcst() throws IOException {
    return weatherService.getVilageFcst();
  }

  @GetMapping("/test/weather/mid")
  public MidLandFcstDTO testMidLandFcst() throws IOException {
    LocalDateTime now = LocalDateTime.now();
    String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    return weatherService.getMidLandFcst(date);
  }

  @GetMapping("/test/weather/air")
  public RealtimeCityAirDTO getAir() throws IOException {
    return weatherService.getRealtimeCityAir();
  }
}
