package app.seok.picnicmap.weather;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class AirMeasurement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String MSRDT;
    private String MSRRGN_NM;
    private String MSRSTE_NM;
    private double PM10;
    private double PM25;
    private double O3;
    private double NO2;
    private double CO;
    private double SO2;
    private String IDEX_NM;
    private double IDEX_MVL;
    private String ARPLT_MAIN;


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