package app.seok.picnicmap.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

  public static String getMidDate() {
    LocalDateTime currentTime = LocalDateTime.now();

    // 최근 06:00 시간 구하기
    LocalDateTime recent0600 = currentTime.withHour(6).withMinute(0).withSecond(0).withNano(0);
    if (currentTime.isBefore(recent0600)) {
      recent0600 = recent0600.minusDays(1);
    }

    // 최근 18:00 시간 구하기
    LocalDateTime recent1800 = currentTime.withHour(18).withMinute(0).withSecond(0).withNano(0);
    if (currentTime.isBefore(recent1800)) {
      recent1800 = recent1800.minusDays(1);
    }

    // 문자열로 변환하기
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
    String recentTime = currentTime.isBefore(recent1800) ? recent0600.format(formatter)
        : recent1800.format(formatter);

    // 결과 출력
    return recentTime;
  }
}
