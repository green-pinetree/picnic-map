package app.seok.picnicmap.place.culture;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Getter
@Setter
@Entity
public class Culture {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Integer num;
  @Column(nullable = false)
  private String subjCode;
  private Integer subjNumber;
  @Column(nullable = false)
  private String facName;
  private String addr;
  private Double lng;
  private Double lat;
  private String phne;
  private String fax;
  private String homepage;
  private String openHour;
  private String entrFee;
  private String closeDay;
  private String openDay;
  private String seatCnt;
  @Type(type = "text")
  private String mainImg;
  @Type(type = "text")
  private String etcDesc;
  @Type(type = "text")
  private String facDesc;
  private String entrFree;
  @Type(type = "text")
  private String subway;
  private String busStop;
  private String yellow;
  private String green;
  private String blue;
  private String red;
  private String airport;
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
