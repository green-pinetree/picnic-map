package app.seok.picnicmap.api.openapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class UltraSrtNcstDTO {
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
    public static class Body {
        private String dataType;
        private Items items;
        private int pageNo;
        private int numOfRows;
        private int totalCount;

        @Data
        public static class Items {
            private List<Item> item;

            @Data
            public static class Item {
                private String baseDate;
                private String baseTime;
                private String category;
                private int nx;
                private int ny;
                private String obsrValue;
            }
        }
    }
}
