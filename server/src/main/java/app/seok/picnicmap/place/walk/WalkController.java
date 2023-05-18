package app.seok.picnicmap.place.walk;

import app.seok.picnicmap.api.seoul.SeoulApiExplorer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class WalkController {
    private final SeoulApiExplorer seoulApiExplorer;
    private final WalkService walkService;

    @GetMapping("/update/walk")
    @ResponseBody
    String walk() throws IOException {
        String walkApiResult = seoulApiExplorer.API("walkDulaeInfo",1,500);
        walkService.saveWalkFromJson(walkApiResult);
        return "api walk";
    }
}
