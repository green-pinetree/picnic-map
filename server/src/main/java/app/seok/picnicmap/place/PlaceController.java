package app.seok.picnicmap.place;

import app.seok.picnicmap.place.culture.Culture;
import app.seok.picnicmap.place.culture.CultureDTO;
import app.seok.picnicmap.place.culture.CultureService;
import app.seok.picnicmap.place.park.Park;
import app.seok.picnicmap.place.park.ParkDTO;
import app.seok.picnicmap.place.park.ParkService;
import app.seok.picnicmap.place.walk.Point;
import app.seok.picnicmap.place.walk.Walk;
import app.seok.picnicmap.place.walk.WalkDTO;
import app.seok.picnicmap.place.walk.WalkService;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PlaceController {

  private final ParkService parkService;
  private final WalkService walkService;
  private final CultureService cultureService;

  @GetMapping("/api/place/list")//?type=[]&lngLT=&latLT=&lngRB=&latRB=&size=
  public PlaceListResponseDTO getPlaceList(
      @RequestParam(name = "type", defaultValue = "0,1,2,3,4,5,6,7") int[] type,
      @RequestParam(name = "lng") double lng, @RequestParam(name = "lat") double lat,
      @RequestParam(name = "size", defaultValue = "10") int size,
      @RequestParam(name = "page", defaultValue = "1") int page) {
    PlaceListResponseDTO response = PlaceListResponseDTO.status404All();
    int offset = size * (page - 1);
    if (offset < 0) {
      offset = 0;
    }
    System.out.println("controller >> " + " " + lng + " " + lat + " " + size + " " + offset);
    try {
      boolean containsZero = false;
      boolean containsone = false;
      for (int value : type) {
        if (value == 0) {
          containsZero = true;
        }
        if (value == 1) {
          containsone = true;
        }
      }
      List<ParkDTO> parks;
      if (containsZero) {
        parks = parkService.getListPark(lat, lng, size, offset);
      } else {
        parks = new ArrayList<>();
      }
      List<WalkDTO> walks;
      if (containsone) {
        walks = walkService.getListWalk(lat, lng, size, offset);
      } else {
        walks = new ArrayList<>();
      }
      List<CultureDTO> cultures = cultureService.getListCulture(type, lat, lng, size, offset);
      System.out.println(parks.size() + " " + walks.size() + " " + cultures.size());
      response = PlaceListResponseDTO.status200(parks, walks, cultures);
    } catch (Exception e) {
      response.setMessage(e.getMessage());
      throw new RuntimeException(e);
    } finally {
      return response;
    }
  }

  @GetMapping("/api/place/search")//?q=&lng=&lat&page=&size=
  public PlaceSearchResponseDTO getPlaceSearch(@RequestParam Map<String, String> queryParams) {
    PlaceSearchResponseDTO response = PlaceSearchResponseDTO.status404All();
    String query = queryParams.get("q");
    if (query != null) {
      query = URLDecoder.decode(query, StandardCharsets.UTF_8).trim();
    }
    double lng = Double.parseDouble(queryParams.get("lng"));
    double lat = Double.parseDouble(queryParams.get("lat"));
    int size = Integer.parseInt(queryParams.get("size"));
    int offset = size * (Integer.parseInt(queryParams.get("page")) - 1);
    if (offset < 0) {
      offset = 0;
    }
    System.out.println(
        "controller >> " + query + " " + lng + " " + lat + " " + size + " " + offset);
    try {
      List<ParkDTO> parks = parkService.getSearchPark(query, lat, lng, size, offset);
      List<WalkDTO> walks = walkService.getSearchWalk(query, lat, lng, size, offset);
      List<CultureDTO> cultures = cultureService.getSearchCulture(query, lat, lng, size, offset);
      response = PlaceSearchResponseDTO.status200(parks, walks, cultures);
    } catch (Exception e) {
      response.setMessage(e.getMessage());
      throw new RuntimeException(e);
    } finally {
      return response;
    }
  }

  @GetMapping("/api/place/detail")//?type=&id=
  public PlaceDetailResponseDTO getPlaceDetail(@RequestParam("type") int type,
      @RequestParam("id") long id) {
    PlaceDetailResponseDTO response = PlaceDetailResponseDTO.status404All();
    try {
      if (type == 0) {
        Park park = parkService.getParkById(id);
        response = PlaceDetailResponseDTO.status200Park(park);
      } else if (type == 1) {
        Walk walk = walkService.getWalkById(id);
        List<Point> path = walkService.getWalkPathById(id);
        response = PlaceDetailResponseDTO.status200Walk(walk, path);
      } else {
        Culture culture = cultureService.getCultureById(id);
        response = PlaceDetailResponseDTO.status200Culture(culture);
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    } finally {
      return response;
    }
  }
}
