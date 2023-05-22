package app.seok.picnicmap.util;

import org.springframework.stereotype.Component;

@Component
public class WeatherCode {

  public int airIndexToGrade(int index) {
    return index > 250 ? 3 : index > 100 ? 2 : index > 50 ? 1 : 0;
  }

  public String skyCodeToName(int code) {
    //맑음(1), 구름많음(3), 흐림(4)
    String[] name = {"", "맑음", "", "구름많음", "흐림"};
    return name[code];
  }

  public int skyNameToCode(String target) {
    //맑음(1), 구름많음(3), 흐림(4)
    String[] array = {"", "맑음", "", "구름많음", "흐림"};
    int index = -1;
    for (int i = 0; i < array.length; i++) {
      if (array[i].equals(target)) {
        index = i;
        break;
      }
    }
    return index;
  }

  public String ptyCodeToNameFromUltra(int code) {
    //(초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
    String[] name = {"없음", "비", "비/눈", "눈", "빗방울", "빗방울눈날림", "눈날림"};
    return name[code];
  }

  public String ptyCodeToNameFromVilage(int code) {
    //(단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
    String[] name = {"없음", "비", "비/눈", "눈", "소나기"};
    return name[code];
  }
}
