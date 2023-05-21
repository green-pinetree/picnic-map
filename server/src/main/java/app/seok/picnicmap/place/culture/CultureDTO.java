package app.seok.picnicmap.place.culture;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

public interface CultureDTO {
    Long getId();
    String getAddr();
    String getAirport();
    String getBlue();
    String getBusStop();
    String getCloseDay();
    LocalDateTime getCreatedAt();
    LocalDateTime getDeletedAt();
    Double getEntrFee();
    String getEntrFree();
    String getEtcDesc();
    String getFacDesc();
    String getFacName();
    String getFax();
    String getGreen();
    String getHomepage();
    Double getLat();
    Double getLng();
    String getMainImg();
    String getNum();
    String getOpenDay();
    String getOpenHour();
    String getPhne();
    String getRed();
    Integer getSeatCnt();
    String getSubjCode();
    String getSubway();
    LocalDateTime getUpdatedAt();
    String getYellow();
    Integer getSubjNumber();
    Double getNear();
}
