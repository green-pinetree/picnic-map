package app.seok.picnicmap.weather;

import app.seok.picnicmap.api.openapi.MidLandFcstDTO;
import app.seok.picnicmap.api.openapi.OpenapiApiExplorer;
import app.seok.picnicmap.api.openapi.UltraSrtNcstDTO;
import app.seok.picnicmap.api.openapi.VilageFcstDTO;
import app.seok.picnicmap.api.seoul.RealtimeCityAirDTO;
import app.seok.picnicmap.api.seoul.SeoulApiExplorer;
import app.seok.picnicmap.util.ApiTimeCalculator;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class WeatherService {
    private final ObjectMapper objectMapper;
    private final OpenapiApiExplorer openapiApiExplorer;
    private final SeoulApiExplorer seoulApiExplorer;

    /*
     * 지역확인
     * */

    /*
     * 기상청 초단기 현황
     * */
    public UltraSrtNcstDTO getUltraSrtNcst() throws IOException {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime previous = now.minusHours(1);
        String time = previous.format(DateTimeFormatter.ofPattern("HH00"));
        String date = previous.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String json = openapiApiExplorer.apiUltraSrtNcst(date, time, 55, 127);
        UltraSrtNcstDTO dto = objectMapper.readValue(json, UltraSrtNcstDTO.class);
        return dto;
    }

    /*
     * 기상청 단기예보
     * */
    public VilageFcstDTO getVilageFcst() throws IOException {
        LocalDateTime now = LocalDateTime.now();
        String time = ApiTimeCalculator.apiVilageBaseTime();
        String date = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        if (Integer.parseInt(now.format(DateTimeFormatter.ofPattern("HH00"))) > Integer.parseInt(time)) {
            LocalDateTime previousDate = now.minusDays(1);
            date = previousDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        }
        String json = openapiApiExplorer.apiVilageFcst(date, time, 55, 127);
        VilageFcstDTO dto = objectMapper.readValue(json, VilageFcstDTO.class);
        return dto;
    }

    /*
     * 기상청 중기예보
     * */
    public MidLandFcstDTO getMidLandFcst(String date) throws IOException {
        String json = openapiApiExplorer.apiMidFcst(date);
        MidLandFcstDTO dto = objectMapper.readValue(json, MidLandFcstDTO.class);
        return dto;
    }

    /*
     * 대기정보
     * */
    public RealtimeCityAirDTO getRealtimeCityAir() throws IOException {
        String json = seoulApiExplorer.API("RealtimeCityAir", 1, 1000);
        RealtimeCityAirDTO dto = objectMapper.readValue(json, RealtimeCityAirDTO.class);
        return dto;
    }
}
