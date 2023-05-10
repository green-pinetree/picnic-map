package app.seok.picnicmap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {
    @GetMapping("*")
    @ResponseBody
    String picnic(){
        return "picnic server";
    }
}
