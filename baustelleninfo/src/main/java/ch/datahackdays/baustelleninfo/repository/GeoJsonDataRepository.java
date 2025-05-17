package ch.datahackdays.baustelleninfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ch.datahackdays.baustelleninfo.model.GeoJsonData;

public interface GeoJsonDataRepository extends JpaRepository<GeoJsonData, Long> {
}