package app.seok.picnicmap.place.culture;

import app.seok.picnicmap.api.seoul.SeoulApiExplorer;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class CultureController {

  private final SeoulApiExplorer seoulApiExplorer;
  private final CultureService cultureService;

  @GetMapping("/update/culture")
  @ResponseBody
  String walk() throws IOException {
    int callCount = 0;
    int indexSize = 1000;
    int total_count = 0;
    int endIndex = 0;
    while ((callCount++) == 0 || total_count > endIndex) {
      int startIndex = indexSize * (callCount - 1) + 1;
      endIndex = indexSize * callCount;
      String cultureApiResult = seoulApiExplorer.API("culturalSpaceInfo", startIndex, endIndex);
      total_count = cultureService.saveCultureFromJson("culturalSpaceInfo", cultureApiResult);
    }
    return "api culture";
  }
}
