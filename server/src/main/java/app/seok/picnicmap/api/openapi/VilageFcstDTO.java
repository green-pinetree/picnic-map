package app.seok.picnicmap.api.openapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VilageFcstDTO {
    private Response response;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Response {
        @JsonProperty("header")
        private Header header;
        @JsonProperty("body")
        private Body body;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Header {
        @JsonProperty("resultCode")
        private String resultCode;
        @JsonProperty("resultMsg")
        private String resultMsg;
    }


    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Body {
        @JsonProperty("dataType")
        private String dataType;
        @JsonProperty("items")
        private Items items;
        @JsonProperty("pageNo")
        private int pageNo;
        @JsonProperty("numOfRows")
        private int numOfRows;
        @JsonProperty("totalCount")
        private int totalCount;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public static class Items {
            private List<Item> item;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public static class Item {
                @JsonProperty("baseDate")
                private String baseDate;
                @JsonProperty("baseTime")
                private String baseTime;
                @JsonProperty("category")
                private String category;
                @JsonProperty("fcstDate")
                private String fcstDate;
                @JsonProperty("fcstTime")
                private String fcstTime;
                @JsonProperty("fcstValue")
                private String fcstValue;
                @JsonProperty("nx")
                private int nx;
                @JsonProperty("ny")
                private int ny;
            }
        }
    }
}
