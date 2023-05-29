package app.seok.picnicmap.place;

import app.seok.picnicmap.place.culture.Culture;
import app.seok.picnicmap.place.park.Park;
import app.seok.picnicmap.place.walk.Point;
import app.seok.picnicmap.place.walk.Walk;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.Data;

@Data
public class PlaceDetailResponseDTO {

  private int status;
  private String message;
  private Data data;

  public static PlaceDetailResponseDTO status200Park(Park park) {
    PlaceDetailResponseDTO response = new PlaceDetailResponseDTO();
    response.setStatus(200);
    response.setMessage("Success");
    Data data = new Data();
    data.setId(park.getId());
    Type type = new Type();
    type.setCode(0);
    type.setMsg("공원");
    data.setType(type);
    if (park.getPPark() != null) {
      data.setName(park.getPPark());
    }
    if (park.getPListContent() != null) {
      data.setContent(park.getPListContent());
    }
    data.setLng(park.getLongitude());
    data.setLat(park.getLatitude());
    List<String> image = new ArrayList<>();
    if (park.getPImg() != null) {
      Collections.addAll(image, park.getPImg().split("~split~"));
    }
    data.setImage(image);
    Detail detail = new Detail();
    if (park.getArea() != null) {
      detail.setArea(park.getArea());
    }
    if (park.getMainEquip() != null) {
      detail.setMainEquip(park.getMainEquip());
    }
    if (park.getMainPlants() != null) {
      detail.setMainPlants(park.getMainPlants());
    }
    if (park.getVisitRoad() != null) {
      detail.setDirections(park.getVisitRoad());
    }
    if (park.getPAddr() != null) {
      detail.setAddress(park.getPAddr());
    }
    if (park.getPAdminTel() != null) {
      detail.setTel(park.getPAdminTel());
    }
    if (park.getTemplateUrl() != null) {
      detail.setHomepage(park.getTemplateUrl());
    }
    data.setDetail(detail);
    response.setData(data);

    return response;
  }

  public static PlaceDetailResponseDTO status200Walk(Walk walk, List<Point> path) {
    PlaceDetailResponseDTO response = new PlaceDetailResponseDTO();
    response.setStatus(200);
    response.setMessage("Success");
    Data data = new Data();
    data.setId(walk.getId());
    Type type = new Type();
    type.setCode(1);
    type.setMsg("두드림길");
    data.setType(type);
    if (walk.getCourseName() != null) {
      data.setName(walk.getCourseName());
    }
    if (walk.getContent() != null) {
      data.setContent(walk.getContent());
    }
    data.setLng(walk.getLng());
    data.setLat(data.getLat());
    List<String> image = new ArrayList<>();
    if (walk.getImage() != null) {
      Collections.addAll(image, walk.getImage().split("~split~"));
    }
    data.setImage(image);
    Detail detail = new Detail();
    if (walk.getDistance() != null) {
      detail.setDistance(walk.getDistance());
    }
    if (walk.getLeadTime() != null) {
      detail.setLeadTime(walk.getLeadTime());
    }
    if (walk.getRelateSubway() != null) {
      detail.setRelateSubway(walk.getRelateSubway());
    }
    if (path.size() > 0) {
      detail.setPath(path);
    }
    data.setDetail(detail);
    response.setData(data);
    return response;
  }

  public static PlaceDetailResponseDTO status200Culture(Culture culture) {
    PlaceDetailResponseDTO response = new PlaceDetailResponseDTO();
    response.setStatus(200);
    response.setMessage("Success");
    Data data = new Data();
    data.setId(culture.getId());
    Type type = new Type();
    if (culture.getSubjNumber() != null) {
      type.setCode(culture.getSubjNumber());
    }
    if (culture.getSubjCode() != null) {
      type.setMsg(culture.getSubjCode());
    }
    data.setType(type);
    if (culture.getFacName() != null) {
      data.setName(culture.getFacName());
    }
    data.setContent("");
    if (culture.getOpenHour() != null) {
      data.setContent("관람시간: " + culture.getOpenHour());
    }
    if (culture.getCloseDay() != null) {
      data.setContent(data.getContent() + "휴관일: " + culture.getCloseDay());
    }
    data.setLng(culture.getLng());
    data.setLat(culture.getLat());
    List<String> image = new ArrayList<>();
    if (culture.getMainImg() != null) {
      Collections.addAll(image, culture.getMainImg().split("~split~"));
    }
    data.setImage(image);
    Detail detail = new Detail();
    if (culture.getAddr() != null) {
      detail.setAddress(culture.getAddr());
    }
    if (culture.getPhne() != null) {
      detail.setTel(culture.getPhne());
    }
    if (culture.getSubway() != null) {
      detail.setRelateSubway(culture.getSubway());
    }
    if (culture.getHomepage() != null) {
      detail.setHomepage(culture.getHomepage());
    }
    data.setDetail(detail);
    response.setData(data);
    return response;
  }

  public static PlaceDetailResponseDTO status404All() {
    PlaceDetailResponseDTO response = new PlaceDetailResponseDTO();
    response.setStatus(404);
    response.setMessage("결과를 찾을 수 없습니다");
    return response;
  }

  @lombok.Data
  public static class Data {

    private Long id;
    private Type type;
    private String name;
    private String content;
    private double lng;
    private double lat;
    private List<String> image;
    private Detail detail;

  }

  @lombok.Data
  public static class Type {

    private int code;
    private String msg;

  }

  @lombok.Data
  public static class Detail {

    private String area;
    private String mainEquip;
    private String mainPlants;
    private String directions;
    private String address;
    private String tel;
    private String distance;
    private String leadTime;
    private String relateSubway;
    private List<Point> path;
    private String homepage;

  }
}
