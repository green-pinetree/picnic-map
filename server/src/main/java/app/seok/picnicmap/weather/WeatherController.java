package app.seok.picnicmap.weather;

import app.seok.picnicmap.location.Location;
import app.seok.picnicmap.location.LocationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class WeatherController {
    private final LocationService locationService;

    @GetMapping("/api/weather")
    @ResponseBody
    public String weather(WeatherRequestDTO weatherRequestDTO) {
        return weatherRequestDTO.toString();
    }

    @GetMapping("/api/weather/input")
    @ResponseBody
    public String locationInput(WeatherRequestDTO weatherRequestDTO) throws JsonProcessingException {
        locationService.saveLocation();
        return weatherRequestDTO.toString();
    }

    @GetMapping("/api/weather/location")
    @ResponseBody
    public String location(WeatherRequestDTO weatherRequestDTO) throws JsonProcessingException {
        System.out.println(weatherRequestDTO.toString());
        Double lng = Double.parseDouble(weatherRequestDTO.getLng());
        Double lat = Double.parseDouble(weatherRequestDTO.getLat());
        Location location = locationService.findNearestLocation(lat, lng);
        System.out.println(location);
        return location.toString();
    }


}
