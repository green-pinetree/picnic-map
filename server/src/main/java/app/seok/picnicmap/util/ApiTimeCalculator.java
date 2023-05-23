package app.seok.picnicmap.util;

import java.time.LocalTime;

public class ApiTimeCalculator {

    private static final int[] BASE_TIMES = {2, 5, 8, 11, 14, 17, 20, 23};
    private static final int API_HOUR = 10;
    private static final int API_MINUTE = 10;

    public static String apiVilageBaseTime() {
        LocalTime currentTime = LocalTime.now();
        int currentHour = currentTime.getHour();
        int currentMinute = currentTime.getMinute();

        // Find the previous base time
        int previousBaseTime = -1;
        for (int i = BASE_TIMES.length - 1; i >= 0; i--) {
            int baseTime = BASE_TIMES[i];
            if (baseTime < currentHour || (baseTime == currentHour && API_HOUR <= currentMinute)) {
                previousBaseTime = baseTime;
                break;
            }
        }

        if (previousBaseTime == -1) {
            // If no previous base time found, set the previous base time to the last base time of the previous day
            previousBaseTime = BASE_TIMES[BASE_TIMES.length - 1];
        }

        // Format the previous API time as HH00
        String previousApiTime = String.format("%02d00", previousBaseTime);

        return previousApiTime;
    }

    public static void main(String[] args) {
        String nextApiTime = apiVilageBaseTime();
        System.out.println("time: " + nextApiTime);
    }
}
