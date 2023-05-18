package app.seok.picnicmap.place.walk;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Walk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double rnum;
    private String areaGu;
    private String distance;
    private String leadTime;
    private Double voteCount;
    private String relateSubway;
    private String relateCourse;
    private String relatePark;
    @Type(type = "text")
    private String trafficInfo;
    @Type(type = "text")
    private String detailCourse;
    @Type(type = "text")
    private String content;
    private String courseName;
    private String pdfFilePath;
    private String pdfFileName;
    private String codeName;
    private String southNorthDiv;
    private String courseLevel;

    @Column(name = "create_at")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updatedAt;

    @Column(name = "delete_at")
    private LocalDateTime deletedAt;


    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void delete() {
        this.deletedAt = LocalDateTime.now();
    }

}
