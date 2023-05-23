package app.seok.picnicmap.weather;

import app.seok.picnicmap.api.openapi.MidLandFcstDTO;
import app.seok.picnicmap.api.openapi.MidLandFcstDTO.Body;
import app.seok.picnicmap.api.openapi.OpenapiApiExplorer;
import app.seok.picnicmap.api.openapi.UltraSrtNcstDTO;
import app.seok.picnicmap.api.openapi.UltraSrtNcstDTO.Body.Items;
import app.seok.picnicmap.api.openapi.VilageFcstDTO;
import app.seok.picnicmap.api.openapi.VilageFcstDTO.Body.Items.Item;
import app.seok.picnicmap.api.seoul.RealtimeCityAirDTO;
import app.seok.picnicmap.api.seoul.RealtimeCityAirDTO.RealtimeCityAirDataWrapper.RealtimeCityAirData;
import app.seok.picnicmap.api.seoul.SeoulApiExplorer;
import app.seok.picnicmap.location.LocationDTO;
import app.seok.picnicmap.util.ApiTimeCalculator;
import app.seok.picnicmap.util.DateUtils;
import app.seok.picnicmap.util.WeatherCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WeatherService {

  private final ObjectMapper objectMapper;
  private final OpenapiApiExplorer openapiApiExplorer;
  private final SeoulApiExplorer seoulApiExplorer;
  private final WeatherRepository weatherRepository;
  private final AirMeasurementRepository airRepository;
  private final WeatherCode weatherCode;
  private final DateUtils dateUtils;
  /*
   * 지역확인
   * */

  /*
   * 기상청 초단기 현황
   * */
  public UltraSrtNcstDTO getUltraSrtNcst() throws IOException {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime previous = now.minusHours(1);
    String time = previous.format(DateTimeFormatter.ofPattern("HH00"));
    String date = previous.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    String json = openapiApiExplorer.apiUltraSrtNcst(date, time, 55, 127);
    UltraSrtNcstDTO dto = objectMapper.readValue(json, UltraSrtNcstDTO.class);

    List<Items.Item> items = dto.getResponse().getBody().getItems().getItem();
    Weather weather = new Weather();
    for (Items.Item item : items) {
      weather.setFcstDate(item.getBaseDate());
      weather.setBaseDate(item.getBaseDate());
      weather.setNx(item.getNx());
      weather.setNy(item.getNy());
      weather.setDistrict("");
      String category = item.getCategory();
      String value = item.getObsrValue();
      if ("PTY".equals(category)) {
        weather.setPty(Integer.parseInt(value));
        weather.setPtyMsg(weatherCode.ptyCodeToNameFromUltra(weather.getPty()));
        weather.setSky(weather.getPty() > 0 ? 4 : 1);
        weather.setSkyMsg(weatherCode.skyCodeToName(weather.getSky()));
      }
    }
    weatherRepository.save(weather);
    return dto;
  }

  /*
   * 기상청 단기예보
   * */
  public VilageFcstDTO getVilageFcst() throws IOException {
    LocalDateTime now = LocalDateTime.now();
    String time = ApiTimeCalculator.apiVilageBaseTime();
    String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    if (Integer.parseInt(now.format(DateTimeFormatter.ofPattern("HH00"))) < Integer.parseInt(
        time)) {
      LocalDateTime previousDate = now.minusDays(1);
      date = previousDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }
    String json = openapiApiExplorer.apiVilageFcst(date, time, 55, 127);
    VilageFcstDTO dto = objectMapper.readValue(json, VilageFcstDTO.class);
    List<Item> items = dto.getResponse().getBody().getItems().getItem();
    Map<String, Weather> weatherMap = new HashMap<>();
    for (Item item : items) {
      if (!"1300".equals(item.getFcstTime())) {
        continue;
      }
      Weather weather;
      if (weatherMap.get(item.getFcstDate()) != null) {
        weather = weatherMap.get(item.getFcstDate());
      } else {
        weather = new Weather();
        weather.setFcstDate(item.getFcstDate());
        weather.setBaseDate(now.format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        weather.setNx(item.getNx());
        weather.setNy(item.getNy());
        weather.setDistrict("");
        weatherMap.put(item.getFcstDate(), weather);
      }
      String category = item.getCategory();
      String value = item.getFcstValue();
      if ("SKY".equals(category)) {
        weather.setSky(Integer.parseInt(value));
        weather.setSkyMsg(weatherCode.skyCodeToName(weather.getSky()));
      } else if ("POP".equals(category)) {
        weather.setPop(Integer.parseInt(value));
      } else if ("PTY".equals(category)) {
        weather.setPty(Integer.parseInt(value));
        weather.setPtyMsg(weatherCode.ptyCodeToNameFromVilage(weather.getPty()));
      }
    }
    for (String key : weatherMap.keySet()) {
      saveOrUpdateWeather(weatherMap.get(key));
    }
    return dto;
  }

  public void saveOrUpdateWeather(Weather weather) {
    List<Weather> existingWeatherList = weatherRepository.findByBaseDateAndFcstDate(
        weather.getBaseDate(), weather.getFcstDate());

    if (existingWeatherList.size() > 0) {
      Weather existingWeather = existingWeatherList.get(0);

      existingWeather.setSky(weather.getSky());
      existingWeather.setSkyMsg(weather.getSkyMsg());
      existingWeather.setPop(weather.getPop());
      existingWeather.setPty(weather.getPty());
      existingWeather.setPtyMsg(weather.getPtyMsg());

      weatherRepository.save(existingWeather);
    } else {
      weatherRepository.save(weather);
    }
  }

  /*
   * 기상청 중기예보
   * */
  public MidLandFcstDTO getMidLandFcst(String date) throws IOException {
    String json = openapiApiExplorer.apiMidFcst(date);
    MidLandFcstDTO dto = objectMapper.readValue(json, MidLandFcstDTO.class);
    Body.Items.Item item = dto.getResponse().getBody().getItems().getItem().get(0);
    double[] pop = {item.getRnSt3Pm(), item.getRnSt4Pm(), item.getRnSt5Pm(), item.getRnSt6Pm(),
        item.getRnSt7Pm(), item.getRnSt8(), item.getRnSt9(), item.getRnSt10()};
    String[] msg = {item.getWf3Pm(), item.getWf4Pm(), item.getWf5Pm(), item.getWf6Pm(),
        item.getWf7Pm(), item.getWf8(), item.getWf9(), item.getWf10()};
    for (int i = 0; i < pop.length; i++) {
      Weather weather = new Weather();
      weather.setBaseDate(date);
      weather.setPop((int) pop[i]);
      weather.setSkyMsg(msg[i]);
      weather.setSky(weatherCode.skyNameToCode(msg[i]));
      weather.setFcstDate(DateUtils.calculateDate(date, 3 + i));
      weatherRepository.save(weather);
    }
    return dto;
  }

  /*
   * 대기정보
   * */
  public RealtimeCityAirDTO getRealtimeCityAir() throws IOException {
    String json = seoulApiExplorer.API("RealtimeCityAir", 1, 1000);
    RealtimeCityAirDTO dto = objectMapper.readValue(json, RealtimeCityAirDTO.class);
    List<RealtimeCityAirData> items = dto.getRealtimeCityAir().getRow();
    for (RealtimeCityAirData item : items) {
      AirMeasurement airMeasurement = new AirMeasurement();
      airMeasurement.setDistrict(item.getMsrsteNm());
      airMeasurement.setAirMaxIndex((int) item.getIdexMvl());
      if ("".equals(item.getIdexNm()) || item.getIdexNm() == null) {
        item.setIdexNm("좋음");
      }
      airMeasurement.setAirGradeName(item.getIdexNm());
      airMeasurement.setAirGradeCode(weatherCode.airIndexToGrade((int) item.getIdexMvl()));
      airRepository.save(airMeasurement);
    }
    return dto;
  }

  public AirMeasurement getAir(String district) throws IOException {
    AirMeasurement airMeasurement;
//    Timestamp oneHourAgo = new Timestamp(System.currentTimeMillis() - (60 * 60 * 1000));
    LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
    if (district == null) {
      district = "종로구";
    }
    Optional<AirMeasurement> oM = airRepository.findLatestByDistrict(district, oneHourAgo);
    if (oM.isPresent()) {
      System.out.println(oM.get().getCreatedAt());
      return oM.get();
    } else {
      getRealtimeCityAir();
      return getAir(district);
    }
  }

  public List<Weather> getWeather(String date) throws IOException {
    List<Weather> weathers = weatherRepository.findByBaseDateOrderByFcstDateAscWithLatestCreateAt(
        date);
    if (weathers.size() != 0) {
      return weathers;
    } else {
      getUltraSrtNcst();
      getVilageFcst();
      getMidLandFcst(date);
      return getWeather(date);
    }
  }

  /**
   * 조회
   */
  public WeatherDTO getWeatherDTO(String date, LocationDTO location) {

    WeatherDTO weatherDTO = new WeatherDTO();
    WeatherDTO.status404All();
    try {
      AirMeasurement airMeasurement = getAir(location.getR2());
      List<Weather> weather = getWeather(date);
      weatherDTO = WeatherDTO.status200(weather, airMeasurement);
    } catch (Exception e) {
      System.out.println(e);
    } finally {
      return weatherDTO;
    }
  }
}
