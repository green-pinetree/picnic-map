package app.seok.picnicmap.place.park;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Park {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pIdx;
    private String pPark;
    @Column(length = 2000)
    private String pListContent;
    private String area;
    private String openDt;
    @Column(length = 2000)
    private String mainEquip;
    @Column(length = 2000)
    private String mainPlants;
    private String guidance;
    @Column(length = 2000)
    private String visitRoad;
    @Column(length = 2000)
    private String useRefer;
    private String pImg;
    private String pZone;
    private String pAddr;
    private String pName;
    private String pAdminTel;
    private Double gLongitude;
    private Double gLatitude;
    private Double longitude;
    private Double latitude;
    private String templateUrl;

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
