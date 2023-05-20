package app.seok.picnicmap.geolocation;

import app.seok.picnicmap.api.naver.NcloudApiExplorer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class GeoLocationController {
    private final GeoLocationService geoLocationService;

    @GetMapping("/api/geolocation")
    public GeoLocationResponseDTO getLocation(@RequestHeader(value = "X-Forwarded-For", required = false) String ipAddress, HttpServletRequest request) {
        if (ipAddress == null || ipAddress.isEmpty()) {
            ipAddress = request.getRemoteAddr();
        }
        System.out.println(ipAddress);
        return geoLocationService.getGeoLocation(ipAddress);
    }
}
