package ch.datahackdays.baustelleninfo.service;

import org.springframework.stereotype.Service;

import ch.datahackdays.baustelleninfo.model.GeoJsonData;

@Service
public class GeoJsonService {

    GeoJsonData toGeoJsonData(String geoJson) {
        GeoJsonData geoJsonData = new GeoJsonData();
        geoJsonData.setGeoJsonContent(geoJson);
        return geoJsonData;
    }
}
