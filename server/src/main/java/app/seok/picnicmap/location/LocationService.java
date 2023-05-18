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
            BufferedReader reader = new BufferedReader(new InputStreamReader(jsonUrl.openStream()));
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
                Integer districtCode = (Integer) district.get("district_code");
                location.setDistrictCode(districtCode);
                String gu = (String) district.get("gu");
                location.setGu(gu);
                String dong = (String) district.get("dong");
                location.setDong(dong);
                Double lng = (Double) district.get("lng");
                location.setLng(lng);
                Double lat = (Double) district.get("lat");
                location.setLat(lat);
                locationRepository.save(location);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Location findNearestLocation(Double targetLatitude, Double targetLongitude) {
        return locationRepository.findNearestLocation(targetLatitude, targetLongitude);
    }

}
