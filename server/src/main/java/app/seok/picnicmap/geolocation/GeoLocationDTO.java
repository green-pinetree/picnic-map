package app.seok.picnicmap.geolocation;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GeoLocationDTO {

    private int returnCode;
    private String requestId;
    private GeoLocation geoLocation;
}
