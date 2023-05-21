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

    private Integer courseCategory;
    private String courseCategoryNm;
    private Integer southNorthDiv;
    private String southNorthDivNm;
    private String areaGu;
    private String distance;
    private String leadTime;
    private String courseLevel;
    private Integer voteCnt;
    private String relateSubway;
    @Type(type = "text")
    private String trafficInfo;
    @Type(type = "text")
    private String content;
    private String courseName;
    @Type(type = "text")
    private String detailCourse;
    private Double x;
    private Double y;
    private Double lat;
    private Double lng;
    private Integer cpiIdx;
    private String cpiName;
    private Double near;

    @Type(type = "text")
    private String cpiContent;

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
