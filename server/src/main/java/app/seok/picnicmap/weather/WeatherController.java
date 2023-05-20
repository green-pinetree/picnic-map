package app.seok.picnicmap.weather;

import app.seok.picnicmap.api.openapi.OpenapiApiExplorer;
import app.seok.picnicmap.location.LocationDTO;
import app.seok.picnicmap.location.LocationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class WeatherController {
    private final LocationService locationService;
    private final OpenapiApiExplorer openapiApiExplorer;

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
        LocationDTO location = locationService.findNearestLocation(lat, lng);
        System.out.println(location);
        return location.toString();
    }

    @GetMapping("/api/weather/dan")
    @ResponseBody
    public String vilageFcst(WeatherRequestDTO weatherRequestDTO) throws IOException {
        System.out.println(weatherRequestDTO.toString());
        Double lng = Double.parseDouble(weatherRequestDTO.getLng());
        Double lat = Double.parseDouble(weatherRequestDTO.getLat());
        return openapiApiExplorer.VilageFcstInfoAPI(lng, lat);
    }

}
