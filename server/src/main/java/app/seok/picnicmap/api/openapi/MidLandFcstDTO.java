package app.seok.picnicmap.api.openapi;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class MidLandFcstDTO {
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
                @JsonProperty("regId")
                private String regId;
                @JsonProperty("rnSt3Am")
                private int rnSt3Am;
                @JsonProperty("rnSt3Pm")
                private int rnSt3Pm;
                @JsonProperty("rnSt4Am")
                private int rnSt4Am;
                @JsonProperty("rnSt4Pm")
                private int rnSt4Pm;
                @JsonProperty("rnSt5Am")
                private int rnSt5Am;
                @JsonProperty("rnSt5Pm")
                private int rnSt5Pm;
                @JsonProperty("rnSt6Am")
                private int rnSt6Am;
                @JsonProperty("rnSt6Pm")
                private int rnSt6Pm;
                @JsonProperty("rnSt7Am")
                private int rnSt7Am;
                @JsonProperty("rnSt7Pm")
                private int rnSt7Pm;
                @JsonProperty("rnSt8")
                private int rnSt8;
                @JsonProperty("rnSt9")
                private int rnSt9;
                @JsonProperty("rnSt10")
                private int rnSt10;
                @JsonProperty("wf3Am")
                private String wf3Am;
                @JsonProperty("wf3Pm")
                private String wf3Pm;
                @JsonProperty("wf4Am")
                private String wf4Am;
                @JsonProperty("wf4Pm")
                private String wf4Pm;
                @JsonProperty("wf5Am")
                private String wf5Am;
                @JsonProperty("wf5Pm")
                private String wf5Pm;
                @JsonProperty("wf6Am")
                private String wf6Am;
                @JsonProperty("wf6Pm")
                private String wf6Pm;
                @JsonProperty("wf7Am")
                private String wf7Am;
                @JsonProperty("wf7Pm")
                private String wf7Pm;
                @JsonProperty("wf8")
                private String wf8;
                @JsonProperty("wf9")
                private String wf9;
                @JsonProperty("wf10")
                private String wf10;
            }
        }
    }
}
