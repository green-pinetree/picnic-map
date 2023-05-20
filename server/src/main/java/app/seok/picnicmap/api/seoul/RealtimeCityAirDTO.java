package app.seok.picnicmap.api.seoul;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class RealtimeCityAirDTO {
    @JsonProperty("RealtimeCityAir")
    private RealtimeCityAirDataWrapper realtimeCityAir;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RealtimeCityAirDataWrapper {
        @JsonProperty("list_total_count")
        private int listTotalCount;

        @JsonProperty("RESULT")
        private Result result;
        private List<RealtimeCityAirData> row;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Result {
            @JsonProperty("CODE")
            private String code;
            @JsonProperty("MESSAGE")

            private String message;
        }

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class RealtimeCityAirData {
            @JsonProperty("MSRDT")
            private String msrdt;

            @JsonProperty("MSRRGN_NM")
            private String msrrgnNm;

            @JsonProperty("MSRSTE_NM")
            private String msrsteNm;

            @JsonProperty("PM10")
            private double pm10;

            @JsonProperty("PM25")
            private double pm25;

            @JsonProperty("O3")
            private double o3;

            @JsonProperty("NO2")
            private double no2;

            @JsonProperty("CO")
            private double co;

            @JsonProperty("SO2")
            private double so2;

            @JsonProperty("IDEX_NM")
            private String idexNm;

            @JsonProperty("IDEX_MVL")
            private double idexMvl;

            @JsonProperty("ARPLT_MAIN")
            private String arpltMain;
        }

    }


}

