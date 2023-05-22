package app.seok.picnicmap.location;

import lombok.Data;

@Data
public class LocationDTO {

  private String district;
  private Double lat;
  private Double lng;
  private Integer code;
  private String r2;
  private Integer x;
  private Integer y;
}
