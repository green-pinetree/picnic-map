package app.seok.picnicmap.weather;

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

@Entity
@Setter
@Getter
public class Weather {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String district;
  private int ny;
  private int nx;
  private String baseDate;
  private String fcstDate;
  private Integer sky;
  private String skyMsg;
  private Integer pty;
  private String ptyMsg;
  private Integer pop;
  private Integer airMaxIndex;
  private Integer airGrade;
  private String airGradeMsg;

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
