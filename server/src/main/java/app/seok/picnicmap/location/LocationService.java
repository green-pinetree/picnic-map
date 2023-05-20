package app.seok.picnicmap.location;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;
    private final HttpServletRequest request;

    public void saveLocation() throws JsonProcessingException {
        try {
            String url = "http://"+request.getServerName()+":"+request.getServerPort()+"/json/district.json";
            URL jsonUrl = new URL(url);
            BufferedReader reader = new BufferedReader(new InputStreamReader(jsonUrl.openStream(), StandardCharsets.UTF_8));
            StringBuilder jsonData = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonData.append(line);
            }
            reader.close();
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> districtsMap = objectMapper.readValue(jsonData.toString(), new TypeReference<Map<String, Object>>() {
            });
            List<Map<String, Object>> districts = (List<Map<String, Object>>) districtsMap.get("district");

            for (Map<String, Object> district : districts) {
                Location location = new Location();
                Integer code = (Integer) district.get("code");
                location.setCode(code);
                String r1 = (String) district.get("r1");
                location.setR1(r1);
                String r2 = (String) district.get("r2");
                location.setR2(r2);
                String r3 = (String) district.get("r3");
                location.setR3(r3);
                Double lng = (Double) district.get("lng");
                location.setLng(lng);
                Double lat = (Double) district.get("lat");
                location.setLat(lat);
                Integer x = (Integer) district.get("x");
                location.setX(x);
                Integer y = (Integer) district.get("y");
                location.setY(y);
                locationRepository.save(location);
//                System.out.println(location);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /*
     * 지역확인
     * */
    public LocationDTO findNearestLocation(Double targetLatitude, Double targetLongitude) {
        return locationToLocationDTO(locationRepository.findNearestLocation(targetLatitude, targetLongitude));
    }

    public LocationDTO locationToLocationDTO(Location location){
        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setCode(location.getCode());
        locationDTO.setDistrict(location.getR2());
        locationDTO.setLng(location.getLng());
        locationDTO.setLat(location.getLat());
        return locationDTO;
    }
}
