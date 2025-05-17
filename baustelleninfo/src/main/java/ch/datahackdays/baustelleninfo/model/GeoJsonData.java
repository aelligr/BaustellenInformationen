package ch.datahackdays.baustelleninfo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class GeoJsonData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String geoJsonContent;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGeoJsonContent() {
        return geoJsonContent;
    }

    public void setGeoJsonContent(String geoJsonContent) {
        this.geoJsonContent = geoJsonContent;
    }
}