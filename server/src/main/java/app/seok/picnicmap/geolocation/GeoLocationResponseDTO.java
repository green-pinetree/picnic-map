package app.seok.picnicmap.geolocation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GeoLocationResponseDTO {

  private Integer status;
  private String massage;
  private Position data;
  @JsonIgnore
  private String returnMessage;

  @Setter
  @Getter
  public static class Position {

    private double lng;
    private double lat;
  }

  public static GeoLocationResponseDTO OkFromGeoLocation(GeoLocation dbResult) {
    double lng = dbResult.getLng();
    double lat = dbResult.getLat();
    GeoLocationResponseDTO geoLocationResponse = new GeoLocationResponseDTO();
    geoLocationResponse.setStatus(200);
    geoLocationResponse.setMassage("Success " + dbResult.getR2());
    Position position = new Position();
    position.setLng(lng);
    position.setLat(lat);
    geoLocationResponse.setData(position);
    return geoLocationResponse;
  }

  public static GeoLocationResponseDTO Ok() {
    GeoLocationResponseDTO geoLocationResponse = new GeoLocationResponseDTO();
    geoLocationResponse.setMassage("위치를 확인해 주세요.");
    geoLocationResponse.setStatus(200);
    Position position = new Position();
    position.setLng(126.977380);
    position.setLat(37.575843);
    geoLocationResponse.setData(position);
    return geoLocationResponse;
  }
}