package ch.datahackdays.baustelleninfo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Baustelle {

    @Id
    private Long id;
    private String projektNummer;
    private LocalDateTime dauerVon;
    private LocalDateTime dauerBis;
    private String objektAngaben;
    private String achsBezeichnung;
    private String status;
    private String projektbezeichnung;
    private String geoJsonData;
}

