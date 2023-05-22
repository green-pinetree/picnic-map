package app.seok.picnicmap.weather;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class WeatherDTO {

  private int status;
  private String message;
  private List<WeatherDataDTO> data;

  public static WeatherDTO status200(List<Weather> weathers, AirMeasurement airMeasurement) {
    WeatherDTO response = new WeatherDTO();
    response.setStatus(200);
    response.setMessage("Success");
    List<WeatherDataDTO> datas = new ArrayList<>();
    for (Weather weather : weathers) {
      WeatherDataDTO weatherDataDTO = new WeatherDataDTO();
      if (weather.getFcstDate() != null) {
        StringBuilder formattedDate = new StringBuilder();
        formattedDate.append(weather.getFcstDate().substring(0, 4));
        formattedDate.append("/");
        formattedDate.append(weather.getFcstDate().substring(4, 6));
        formattedDate.append("/");
        formattedDate.append(weather.getFcstDate().substring(6, 8));
        weatherDataDTO.setDate(formattedDate.toString());
      } else {
        // 기본값 설정합니다.
      }
      if (weather.getPop() != null) {
        weatherDataDTO.setPop(weather.getPop());
      } else {
        // 기본값 설정합니다.
      }
      if (weather.getPty() != null) {
        weatherDataDTO.setPtyCode(weather.getPty());
      } else {
        // 기본값 설정합니다.
      }
      if (weather.getPtyMsg() != null) {
        weatherDataDTO.setPtyName(weather.getPtyMsg());
      } else {
        // 기본값 설정합니다.
      }
      if (weather.getSky() != null) {
        weatherDataDTO.setSkyCode(weather.getSky());
      } else {
        // 기본값 설정합니다.
      }
      if (weather.getSkyMsg() != null) {
        weatherDataDTO.setSkyName(weather.getSkyMsg());
      } else {
        // 기본값 설정합니다.
      }

      if (weather.getDistrict() != null) {
        weatherDataDTO.setDistrict(weather.getDistrict());
      } else {
        // 기본값 설정합니다.
      }
      datas.add(weatherDataDTO);
    }
    datas.get(0).setAirGradeCode(airMeasurement.getAirGradeCode());
    datas.get(0).setAirGradeName(airMeasurement.getAirGradeName());
    datas.get(0).setAirMaxIndex(airMeasurement.getAirMaxIndex());
    response.setData(datas);
    return response;
  }

  public static WeatherDTO status404All() {
    WeatherDTO response = new WeatherDTO();
    response.setStatus(404);
    response.setMessage("결과를 찾을 수 없습니다");
    return response;
  }

  @Getter
  @Setter
  public static class WeatherDataDTO {

    private String district;
    private String date;
    private Integer skyCode;
    private String skyName;
    private Integer ptyCode;
    private String ptyName;
    private Integer pop;
    private int airMaxIndex;
    private int airGradeCode;
    private String airGradeName;

  }
}
