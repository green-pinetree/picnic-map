package app.seok.picnicmap.api.naver;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class NcloudApiExplorer {

    @Value("${external.api.naver.accessKey}")
    private String accessKey;
    @Value("${external.api.naver.secretKey}")
    private String secretKey;

    public String getGeolocation(String ip) {
        try {
            String hostNameUrl = "https://geolocation.apigw.ntruss.com";
            String requestUrl = "/geolocation/v2/geoLocation";

            long timestamp = System.currentTimeMillis();
            String headerTimestamp = String.valueOf(timestamp);

            String baseString = requestUrl + "?ip=" + ip + "&ext=t&responseFormatType=json";
            String signature = makeSignature(baseString, headerTimestamp, accessKey, secretKey);
            String urlBuilder = hostNameUrl + baseString;

            URL url = new URL(urlBuilder);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            conn.setRequestProperty("x-ncp-apigw-timestamp", headerTimestamp);
            conn.setRequestProperty("x-ncp-iam-access-key", accessKey);
            conn.setRequestProperty("x-ncp-apigw-signature-v2", signature);
            System.out.println("Response code: " + conn.getResponseCode()); /* 연결 자체에 대한 확인이 필요하므로 추가합니다.*/
            BufferedReader rd;

            // 서비스코드가 정상이면 200~300사이의 숫자가 나옵니다.
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), StandardCharsets.UTF_8));
            }
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
            return sb.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build().toString();
        }
    }

    public String makeSignature(String url, String timestamp, String accessKey, String secretKey) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";                    // one space
        String newLine = "\n";                    // new line
        String method = "GET";                    // method
//        String url = "/photos/puppy.jpg?query1=&query2";	// url (include query string)
//        String timestamp = "{timestamp}";			// current timestamp (epoch)
//        String accessKey = "{accessKey}";			// access key id (from portal or Sub Account)
//        String secretKey = "{secretKey}";

        String message = method + space + url + newLine + timestamp + newLine + accessKey;
        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }
}
