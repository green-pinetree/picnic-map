package app.seok.picnicmap.place.culture;

import app.seok.picnicmap.util.CoordinateConversion;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CultureService {
    private final CultureRepository cultureRepository;
    private final ObjectMapper objectMapper;
    private final CoordinateConversion coordinateConversion;

    public CultureService(CultureRepository cultureRepository, ObjectMapper objectMapper, CoordinateConversion coordinateConversion) {
        this.cultureRepository = cultureRepository;
        this.objectMapper = objectMapper;
        this.coordinateConversion = coordinateConversion;
    }

    public int saveCultureFromJson(String aipServiceName, String cultureJsonString) throws JsonProcessingException {
        Map<String, Object> walkMap = objectMapper.readValue(cultureJsonString, new TypeReference<Map<String, Object>>() {
        });
        Map<String, Object> walkDulaeInfo = (Map<String, Object>) walkMap.get(aipServiceName);
        List<Map<String, Object>> rowList = (List<Map<String, Object>>) walkDulaeInfo.get("row");
        int listTotalCount = (int) walkDulaeInfo.get("list_total_count");
        for (Map<String, Object> cultureObject : rowList) {
            Culture culture = new Culture();
            culture.setNum(Integer.parseInt((String) cultureObject.get("NUM")));
            String longitudeStr = (String) cultureObject.get("X_COORD");
            if (!longitudeStr.isEmpty()) {
                culture.setLng(Double.parseDouble(longitudeStr));
            }
            String latitudeStr = (String) cultureObject.get("Y_COORD");
            if (!longitudeStr.isEmpty()) {
                culture.setLat(Double.parseDouble(latitudeStr));
            }
            culture.setSubjCode((String) cultureObject.get("SUBJCODE"));
            culture.setFacName((String) cultureObject.get("FAC_NAME"));
            culture.setAddr((String) cultureObject.get("ADDR"));
            culture.setPhne((String) cultureObject.get("PHNE"));
            culture.setFax((String) cultureObject.get("FAX"));
            culture.setHomepage((String) cultureObject.get("HOMEPAGE"));
            culture.setOpenHour((String) cultureObject.get("OPENHOUR"));
            culture.setEntrFee((String) cultureObject.get("ENTR_FEE"));
            culture.setCloseDay((String) cultureObject.get("CLOSEDAY"));
            culture.setOpenDay((String) cultureObject.get("OPEN_DAY"));
            culture.setSeatCnt((String) cultureObject.get("SEAT_CNT"));
            culture.setMainImg((String) cultureObject.get("MAIN_IMG"));
            culture.setEtcDesc((String) cultureObject.get("ETC_DESC"));
            culture.setFacDesc((String) cultureObject.get("FAC_DESC"));
            culture.setEntrFree((String) cultureObject.get("ENTRFREE"));
            culture.setSubway((String) cultureObject.get("SUBWAY"));
            culture.setBusStop((String) cultureObject.get("BUSSTOP"));
            culture.setYellow((String) cultureObject.get("YELLOW"));
            culture.setGreen((String) cultureObject.get("GREEN"));
            culture.setBlue((String) cultureObject.get("BLUE"));
            culture.setRed((String) cultureObject.get("RED"));
            culture.setAirport((String) cultureObject.get("AIRPORT"));
            cultureRepository.save(culture);
        }
        return listTotalCount;
    }
}
