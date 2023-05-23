package app.seok.picnicmap.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.springframework.stereotype.Component;

@Component
public class DateUtils {

  public static String calculateDate(String inputDate, int n) {
    // 입력 받은 문자열을 LocalDate로 변환
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    LocalDate date = LocalDate.parse(inputDate, formatter);

    // n일 뒤의 날짜 구하기
    LocalDate futureDate = date.plusDays(n);

    // yyyymmdd 형식으로 출력
    String formattedDate = futureDate.format(formatter);

    return formattedDate;
  }
}
