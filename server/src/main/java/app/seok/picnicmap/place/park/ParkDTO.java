package app.seok.picnicmap.place.park;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


public interface ParkDTO {
    Long getId();
    String getArea();
    LocalDateTime getCreatedAt();
    LocalDateTime getDeletedAt();
    Double getGLatitude();
    String getGuidance();
    Double getLatitude();
    Double getLongitude();
    String getMainEquip();
    String getMainPlants();
    String getOpenDt();
    String getPAddr();
    String getPAdminTel();
    String getPIdx();
    String getPImg();
    String getPListContent();
    String getPName();
    String getPPark();
    String getPZone();
    String getTemplateUrl();
    LocalDateTime getUpdatedAt();
    String getUseRefer();
    String getVisitRoad();
    Double getNear();
}
