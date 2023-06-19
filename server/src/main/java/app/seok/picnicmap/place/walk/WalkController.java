package app.seok.picnicmap.place.walk;

import app.seok.picnicmap.api.seoul.SeoulApiExplorer;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class WalkController {

  private final SeoulApiExplorer seoulApiExplorer;
  private final WalkService walkService;

  @GetMapping("/update/walk")
  @ResponseBody
  String walk() throws IOException {
    int callCount = 0;
    int indexSize = 1000;
    int total_count = 0;
    int endIndex = 0;
    while ((callCount++) == 0 || total_count > endIndex) {
      int startIndex = indexSize * (callCount - 1) + 1;
      endIndex = indexSize * callCount;
      String walkApiResult = seoulApiExplorer.API("SeoulGilWalkCourse", startIndex, endIndex);
      total_count = walkService.saveWalkFromJson("SeoulGilWalkCourse", walkApiResult);
    }
    return "api walk";
  }
}
