package app.seok.picnicmap.place;

import app.seok.picnicmap.place.culture.CultureDTO;
import app.seok.picnicmap.place.park.ParkDTO;
import app.seok.picnicmap.place.walk.Point;
import app.seok.picnicmap.place.walk.WalkDTO;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 *
 */
@lombok.Data
public class PlaceSearchResponseDTO {

  private int status;
  private String message;
  private List<Data> data;

  public static PlaceSearchResponseDTO status200(List<ParkDTO> parks, List<WalkDTO> walks,
      List<CultureDTO> cultures) {
    PlaceSearchResponseDTO response = new PlaceSearchResponseDTO();
    response.setStatus(200);
    response.setMessage("Success");
    boolean isNull = true;
    List<Data> datas = new ArrayList<>();
    for (ParkDTO park : parks) {
      System.out.println(">" + park);
      datas.add(parkData(park));
      isNull = false;
    }
    System.out.println(">end parks");

    for (WalkDTO walk : walks) {
      System.out.println(">" + walk);
      datas.add(walkData(walk));
      isNull = false;
    }
    System.out.println(">end walks");

    for (CultureDTO culture : cultures) {
      System.out.println(">" + culture);
      datas.add(cultureData(culture));
      isNull = false;
    }
    System.out.println(">end Cultures");
    if (isNull) {
      response.setMessage("검색 결과가 없습니다.");
    }
    Collections.sort(datas, Comparator.comparing(Data::getNear));
    response.setData(datas);
    return response;
  }

  /**
   * 공원데이터 출력 형태 가공
   *
   * @param park 공원 정보 1곳
   * @return 응답 데이터 객체에 담을 형태
   */
  public static Data parkData(ParkDTO park) {
    Data data = new Data();

    // id 설정
    if (park.getId() != null) {
      data.setId(park.getId());
    } else {
      // id가 null인 경우에 대한 처리 로직
      // 예: data.setId(0L) 또는 다른 기본값 설정
    }

    Type type = new Type();
    type.setCode(0);
    type.setMsg("공원");
    data.setType(type);

    // name 설정
    if (park.getPPark() != null) {
      data.setName(park.getPPark());
    } else {
      // name이 null인 경우에 대한 처리 로직
    }

    // content 설정
    if (park.getPListContent() != null) {
      data.setContent(park.getPListContent());
    } else {
      // content가 null인 경우에 대한 처리 로직
    }

    // lng 설정
    if (park.getLongitude() != null) {
      data.setLng(park.getLongitude());
    } else {
      // lng가 null인 경우에 대한 처리 로직
    }

    // lat 설정
    if (park.getLatitude() != null) {
      data.setLat(park.getLatitude());
    } else {
      // lat이 null인 경우에 대한 처리 로직
    }

    List<String> image = new ArrayList<>();
    if (park.getPImg() != null) {
      Collections.addAll(image, park.getPImg().split("/?/"));
    }
    data.setImage(image);

    Detail detail = new Detail();

    // area 설정
    if (park.getArea() != null) {
      detail.setArea(park.getArea());
    } else {
      // area가 null인 경우에 대한 처리 로직
    }

    // mainEquip 설정
    if (park.getMainEquip() != null) {
      detail.setMainEquip(park.getMainEquip());
    } else {
      // mainEquip이 null인 경우에 대한 처리 로직
    }

    // mainPlants 설정
    if (park.getMainPlants() != null) {
      detail.setMainPlants(park.getMainPlants());
    } else {
      // mainPlants가 null인 경우에 대한 처리 로직
    }

    // directions 설정
    if (park.getVisitRoad() != null) {
      detail.setDirections(park.getVisitRoad());
    } else {
      // directions가 null인 경우에 대한 처리 로직
    }

    // address 설정
    if (park.getPAddr() != null) {
      detail.setAddress(park.getPAddr());
    } else {
      // address가 null인 경우에 대한 처리 로직
    }

    // tel 설정
    if (park.getPAdminTel() != null) {
      detail.setTel(park.getPAdminTel());
    } else {
      // tel이 null인 경우에 대한 처리 로직
    }

    // homepage 설정
    if (park.getTemplateUrl() != null) {
      detail.setHomepage(park.getTemplateUrl());
    } else {
      // homepage이 null인 경우에 대한 처리 로직
    }

    data.setDetail(detail);

    // near 설정
    if (park.getNear() != null) {
      data.setNear(park.getNear());
    } else {
      // near가 null인 경우에 대한 처리 로직
    }

    return data;
  }

  /**
   * 둘레길데이터 출력 형태 가공
   *
   * @param walk 둘레길 정보 1곳
   * @return 응답 데이터 객체에 담을 형태
   */
  public static Data walkData(WalkDTO walk) {
    Data data = new Data();
    data.setId(walk.getId());

    Type type = new Type();
    type.setCode(1);
    type.setMsg("둘레길");
    data.setType(type);

    // name 설정
    if (walk.getCourseName() != null) {
      data.setName(walk.getCourseName());
    } else {
      // name이 null인 경우에 대한 처리 로직
    }

    // content 설정
    if (walk.getContent() != null) {
      String[] contentLines = walk.getContent().split("\\r\\n");
      if (contentLines.length > 0) {
        data.setContent(contentLines[0]);
      } else {
        // content에 줄이 없는 경우에 대한 처리 로직
      }
    } else {
      // content가 null인 경우에 대한 처리 로직
    }

    // lng 설정
    if (walk.getLng() != null) {
      data.setLng(walk.getLng());
    } else {
      // lng가 null인 경우에 대한 처리 로직
    }

    // lat 설정
    if (walk.getLat() != null) {
      data.setLat(walk.getLat());
    } else {
      // lat이 null인 경우에 대한 처리 로직
    }

    Detail detail = new Detail();

    // distance 설정
    if (walk.getDistance() != null) {
      detail.setDistance(walk.getDistance());
    } else {
      // distance가 null인 경우에 대한 처리 로직
    }

    // leadTime 설정
    if (walk.getLeadTime() != null) {
      detail.setLeadTime(walk.getLeadTime());
    } else {
      // leadTime이 null인 경우에 대한 처리 로직
    }

    // relateSubway 설정
    if (walk.getRelateSubway() != null) {
      detail.setRelateSubway(walk.getRelateSubway());
    } else {
      // relateSubway이 null인 경우에 대한 처리 로직
    }

    List<Point> path = new ArrayList<>();
    String[] lngs = walk.getLngs().split(",");
    String[] lats = walk.getLats().split(",");
    for (int i = 0; i < lngs.length; i++) {
      Point point = new Point();

      // lng 설정
      if (lngs[i] != null) {
        point.setLng(Double.parseDouble(lngs[i]));
      } else {
        // lng가 null인 경우에 대한 처리 로직
      }

      // lat 설정
      if (lats[i] != null) {
        point.setLat(Double.parseDouble(lats[i]));
      } else {
        // lat이 null인 경우에 대한 처리 로직
      }

      path.add(point);
    }
    detail.setPath(path);

    // near 설정
    if (walk.getNear() != null) {
      data.setNear(walk.getNear());
    } else {
      // near가 null인 경우에 대한 처리 로직
    }

    data.setDetail(detail);

    return data;

  }

  public static Data cultureData(CultureDTO culture) {
    Data data = new Data();
    data.setId(culture.getId());

    Type type = new Type();
    type.setCode(culture.getSubjNumber());
    type.setMsg(culture.getSubjCode());
    data.setType(type);

    // name 설정
    if (culture.getFacName() != null) {
      data.setName(culture.getFacName());
    } else {
      // name이 null인 경우에 대한 처리 로직
    }

    // content 설정
    String content = "";
    if (!"".equals(culture.getOpenHour())) {
      content += "관람시간: " + culture.getOpenHour() + ", ";
    }
    content += "휴관일: " + culture.getCloseDay();
    data.setContent(content);

    // lng 설정
    if (culture.getLng() != null) {
      data.setLng(culture.getLng());
    } else {
      // lng가 null인 경우에 대한 처리 로직
    }

    // lat 설정
    if (culture.getLat() != null) {
      data.setLat(culture.getLat());
    } else {
      // lat이 null인 경우에 대한 처리 로직
    }

    List<String> image = new ArrayList<>();
    if (culture.getMainImg() != null) {
      Collections.addAll(image, culture.getMainImg().split("/?/"));
    }
    data.setImage(image);

    Detail detail = new Detail();

    // address 설정
    if (culture.getAddr() != null) {
      detail.setAddress(culture.getAddr());
    } else {
      // address가 null인 경우에 대한 처리 로직
    }

    // tel 설정
    if (culture.getPhne() != null) {
      detail.setTel(culture.getPhne());
    } else {
      // tel이 null인 경우에 대한 처리 로직
    }

    // relateSubway 설정
    if (culture.getSubway() != null) {
      detail.setRelateSubway(culture.getSubway());
    } else {
      // relateSubway이 null인 경우에 대한 처리 로직
    }

    // homepage 설정
    if (culture.getHomepage() != null) {
      detail.setHomepage(culture.getHomepage());
    } else {
      // homepage이 null인 경우에 대한 처리 로직
    }

    data.setDetail(detail);

    // near 설정
    if (culture.getNear() != null) {
      data.setNear(culture.getNear());
    } else {
      // near가 null인 경우에 대한 처리 로직
    }

    return data;

  }

  public static PlaceSearchResponseDTO status404All() {
    PlaceSearchResponseDTO response = new PlaceSearchResponseDTO();
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
    private double near;

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
