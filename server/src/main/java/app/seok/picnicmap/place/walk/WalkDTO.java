package app.seok.picnicmap.place.walk;

public interface WalkDTO {
    Long getId();
    String getCourseName();
    String getContent();
    Double getLng();
    Double getLat();
    String getDistance();
    String getLeadTime();
    String getRelateSubway();
    Double getNear();
    String getLngs();
    String getLats();
}