package app.seok.picnicmap.weather;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherDTO {

  private int status;
  private String message;
  private List<WeatherDataDTO> data;

  public static WeatherDTO status200() {
    WeatherDTO response = new WeatherDTO();
    response.setStatus(200);
    response.setMessage("Success");
    List<WeatherDataDTO> datas = new ArrayList<>();
    response.setData(datas);
    return response;
  }

  @Getter
  @Setter
  public static class WeatherDataDTO {

    private String district;
    private Date date;
    private SkyDTO sky;
    private PtyDTO pty;
    private int airMaxIndex;
    private AirGradeDTO airGrade;

    @Getter
    @Setter
    public static class SkyDTO {

      private int code;
      private String msg;
    }

    @Getter
    @Setter
    public static class PtyDTO {

      private int code;
      private String msg;
    }

    @Getter
    @Setter
    public static class AirGradeDTO {

      private int code;
      private String msg;
    }
  }
}
