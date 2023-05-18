package app.seok.picnicmap.place.walk;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class WalkService {
    private final WalkRepository walkRepository;
    private final ObjectMapper objectMapper;

    public WalkService(WalkRepository walkRepository, ObjectMapper objectMapper) {
        this.walkRepository = walkRepository;
        this.objectMapper = objectMapper;
    }

    public void saveWalkFromJson(String walkJsonString) throws JsonProcessingException {
        Map<String, Object> walkMap = objectMapper.readValue(walkJsonString, new TypeReference<Map<String, Object>>() {
        });
        Map<String, Object> walkDulaeInfo = (Map<String, Object>) walkMap.get("walkDulaeInfo");
        List<Map<String, Object>> rowList = (List<Map<String, Object>>) walkDulaeInfo.get("row");

        for (Map<String, Object> walkObject : rowList) {

            Walk walk = new Walk();
            walk.setRnum(((Double) walkObject.get("RNUM")));
            walk.setAreaGu((String) walkObject.get("AREA_GU"));
            walk.setDistance((String) walkObject.get("DISTANCE"));
            walk.setLeadTime((String) walkObject.get("LEAD_TIME"));
            walk.setVoteCount(Double.parseDouble((String) walkObject.get("VOTE_CNT")));
            walk.setRelateSubway((String) walkObject.get("RELATE_SUBWAY"));
            walk.setRelateCourse((String) walkObject.get("RELATE_COURSE"));
            walk.setRelatePark((String) walkObject.get("RELATE_PARK"));
            walk.setTrafficInfo((String) walkObject.get("TRAFFIC_INFO"));
            walk.setDetailCourse((String) walkObject.get("DETAIL_COURSE"));
            walk.setContent((String) walkObject.get("CONTENT"));
            walk.setPdfFilePath((String) walkObject.get("PDF_FILE_PATH"));
            walk.setPdfFileName((String) walkObject.get("PDF_FILE_NAME"));
            walk.setCourseName((String) walkObject.get("COURSE_NAME"));
            walk.setCodeName((String) walkObject.get("CODE_NAME"));
            walk.setSouthNorthDiv((String) walkObject.get("SOUTH_NORTH_DIV"));
            walk.setCourseLevel((String) walkObject.get("COURSE_LEVEL"));

            walkRepository.save(walk);
        }
    }
}
