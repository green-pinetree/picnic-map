package app.seok.picnicmap.place.park;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import lombok.Data;
import org.hibernate.annotations.Type;

@Entity
@Data
public class Park {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(name = "p_idx")
  private String pIdx;
  private String pPark;
  @Type(type = "text")
  private String pListContent;
  @Type(type = "text")
  private String area;
  private String openDt;
  @Type(type = "text")
  private String mainEquip;
  @Type(type = "text")
  private String mainPlants;
  private String guidance;
  @Type(type = "text")
  private String visitRoad;
  @Type(type = "text")
  private String useRefer;
  @Type(type = "text")
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
  @Column(name = "near")
  private Double near;

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
