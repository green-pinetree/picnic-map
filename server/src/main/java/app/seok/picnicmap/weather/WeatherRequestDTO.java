package app.seok.picnicmap.weather;

import lombok.Data;

@Data
public class WeatherRequestDTO {
    private String lat;
    private String lng;
    private String district;
}
