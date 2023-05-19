package app.seok.picnicmap.util;

import org.locationtech.proj4j.*;
import org.springframework.stereotype.Service;

@Service
public class CoordinateConversion {
    private final CRSFactory crsFactory;

    public CoordinateConversion() {
        crsFactory = new CRSFactory();
    }

    public double[] convertGRS80TMToWGS84(double tmX, double tmY) {
        // GRS80 TM 좌표계 (EPSG:5186)
        CoordinateReferenceSystem grs80TmCrs = crsFactory.createFromName("EPSG:5186");

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
}
