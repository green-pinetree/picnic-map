package app.seok.picnicmap.place.park;

import app.seok.picnicmap.api.seoul.SeoulApiExplorer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class ParkController {
    private final SeoulApiExplorer seoulApiExplorer;
    private final ParkService parkService;

    @GetMapping("/update/park")
    @ResponseBody
    String park() throws IOException {
        String parkApiResult = seoulApiExplorer.API("SearchParkInfoService",1,500);
        parkService.saveParkFromJson(parkApiResult);
        return "api park";
    }
}
