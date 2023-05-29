package app.seok.picnicmap.util;

import org.locationtech.proj4j.CRSFactory;
import org.locationtech.proj4j.CoordinateReferenceSystem;
import org.locationtech.proj4j.CoordinateTransform;
import org.locationtech.proj4j.CoordinateTransformFactory;
import org.locationtech.proj4j.ProjCoordinate;
import org.springframework.stereotype.Service;

@Service
public class CoordinateConversion {

  private final CRSFactory crsFactory;

  public CoordinateConversion() {
    crsFactory = new CRSFactory();
  }

  public double[] convertGRS80TMToWGS84(double tmX, double tmY) {
    // GRS80 TM 좌표계 (EPSG:5186)
    CoordinateReferenceSystem grs80TmCrs = crsFactory.createFromName("EPSG:5185");

    // WGS84 좌표계 (EPSG:4326)
    CoordinateReferenceSystem wgs84Crs = crsFactory.createFromName("EPSG:4326");

    // 좌표 변환을 위한 CoordinateTransformFactory 생성
    CoordinateTransformFactory transformFactory = new CoordinateTransformFactory();

    // GRS80 TM 좌표를 WGS84 좌표로 변환하는 CoordinateTransform 생성
    CoordinateTransform transform = transformFactory.createTransform(grs80TmCrs, wgs84Crs);

    // 좌표 변환
    ProjCoordinate grs80TmCoord = new ProjCoordinate(tmX, tmY);
    ProjCoordinate wgs84Coord = new ProjCoordinate();
    transform.transform(grs80TmCoord, wgs84Coord);

    double latitude = wgs84Coord.y; // WGS84 위도
    double longitude = wgs84Coord.x; // WGS84 경도

    return new double[]{latitude, longitude};
  }

  public double[] conversion(double x, double y) {
    // ITRF2000 좌표계 정의
//      String itrf2000 = "+proj=tmerc +lat_0=0 +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=GRS80 +units=m +no_defs";
    String itrf2000 = "proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";
    // WGS84 좌표계 정의
    String wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

    // 좌표계 변환을 위한 CoordinateReferenceSystem 생성
    CRSFactory crsFactory = new CRSFactory();
    CoordinateReferenceSystem itrfCrs = crsFactory.createFromParameters("ITRF2000", itrf2000);
    CoordinateReferenceSystem wgs84Crs = crsFactory.createFromParameters("WGS84", wgs84);

    // 좌표 변환을 위한 CoordinateTransformFactory 생성
    CoordinateTransformFactory transformFactory = new CoordinateTransformFactory();

    // GRS80 TM 좌표를 WGS84 좌표로 변환하는 CoordinateTransform 생성
    CoordinateTransform transform = transformFactory.createTransform(itrfCrs, wgs84Crs);
    // 좌표 변환을 위한 CoordinateTransform 생성

    // ITRF2000 좌표를 위경도로 변환
    ProjCoordinate itrfCoord = new ProjCoordinate(x, y);
    ProjCoordinate wgs84Coord = new ProjCoordinate();
    transform.transform(itrfCoord, wgs84Coord);

    // 변환된 위경도 출력
    double latitude = wgs84Coord.y;
    double longitude = wgs84Coord.x;
    return new double[]{latitude, longitude};

  }
}
