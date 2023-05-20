package app.seok.picnicmap.weather;

import app.seok.picnicmap.api.openapi.MidLandFcstDTO;
import app.seok.picnicmap.api.openapi.UltraSrtNcstDTO;
import app.seok.picnicmap.api.openapi.VilageFcstDTO;
import app.seok.picnicmap.api.seoul.RealtimeCityAirDTO;
import app.seok.picnicmap.location.LocationDTO;
import app.seok.picnicmap.location.LocationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequiredArgsConstructor
public class WeatherController {
    private final LocationService locationService;
    private final WeatherService weatherService;

    @GetMapping("/api/weather")
    public String weather(WeatherRequestDTO weatherRequestDTO) {
        return weatherRequestDTO.toString();
    }

    @GetMapping("/api/weather/input")
    public String locationInput(WeatherRequestDTO weatherRequestDTO) throws JsonProcessingException {
        locationService.saveLocation();
        return weatherRequestDTO.toString();
    }

    @GetMapping("/api/weather/location")
    public String getLocation(WeatherRequestDTO weatherRequestDTO) throws JsonProcessingException {
        System.out.println(weatherRequestDTO.toString());
        Double lng = Double.parseDouble(weatherRequestDTO.getLng());
        Double lat = Double.parseDouble(weatherRequestDTO.getLat());
        LocationDTO location = locationService.findNearestLocation(lat, lng);
        System.out.println(location);
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
