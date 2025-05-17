package ch.datahackdays.baustelleninfo.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.datahackdays.baustelleninfo.model.Baustelle;
import ch.datahackdays.baustelleninfo.repository.BaustellenRepository;
import ch.datahackdays.baustelleninfo.repository.GeoJsonDataRepository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Service
public class StartupCronJob {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private ResourceFileReaderService resourceFileReaderService;

    @Autowired
    private GeoJsonDataRepository geoJsonDataRepository;

    @Autowired
    private BaustellenRepository baustellenRepository;

    @PostConstruct
    public void executeOnStartup() {
        System.out.println("Executing cron job at application startup...");

        var content = readFileFromFileSystem("Baustellenbis20250630.geojson");
        // var content = readFileFromS3("Baustellen2026_2027.geojson");

        parseAndPersistGeoJson(content);
    }

    private String readFileFromFileSystem(String fileName) {
        var content = resourceFileReaderService.readFileFromResources(fileName);
        return content;
    }

    private String readFileFromS3(String fileName) {
        //s3Service.listFiles();

        var content = s3Service.readGeoJsonContent("bernhackdays", fileName);

        return content;
    }

    private void parseAndPersistGeoJson(String content) {

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Parse GeoJSON into a JsonNode
            JsonNode geoJsonNode = objectMapper.readTree(content);

            // Access specific fields
            String type = geoJsonNode.get("type").asText();

            JsonNode features = geoJsonNode.get("features");
            if (features != null && features.isArray()) {
                for (JsonNode entry : features) {
                    // Process each entry in the "features" array

                    long ID = entry.get("id").asLong();
                    JsonNode properties = entry.get("properties");

                    String PROJEKTNUM = properties.get("PROJEKTNUM").asText();
                    long TERMINVON = properties.get("TERMINVON").asLong();
                    long TERMINBIS = properties.get("TERMINBIS").asLong();
                    String ACHSBEZEIC = properties.get("ACHSBEZEIC").asText();
                    String STATUS_BEZ = properties.get("STATUS_BEZ").asText();

                    var baustelle = new Baustelle();
                    baustelle.setId(ID);
                    baustelle.setProjektNummer(PROJEKTNUM);
                    // Convert timestamp to LocalDateTime
                    LocalDateTime localDateTimeTerminVon = LocalDateTime.ofInstant(Instant.ofEpochMilli(TERMINVON), ZoneId.systemDefault());
                    LocalDateTime localDateTimeTerminBis = LocalDateTime.ofInstant(Instant.ofEpochMilli(TERMINBIS), ZoneId.systemDefault());
                    baustelle.setDauerVon(localDateTimeTerminVon);
                    baustelle.setDauerBis(localDateTimeTerminBis);
                    baustelle.setAchsBezeichnung(ACHSBEZEIC);
                    baustelle.setStatus(STATUS_BEZ);
                    baustelle.setGeoJsonData(entry.toString());

                    baustellenRepository.save(baustelle);

                    System.out.println("ID: " + baustelle.getId());
                    System.out.println("ProjektNummer: " + baustelle.getProjektNummer());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}