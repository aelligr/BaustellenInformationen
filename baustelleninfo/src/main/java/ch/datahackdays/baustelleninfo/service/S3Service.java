package ch.datahackdays.baustelleninfo.service;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ch.datahackdays.baustelleninfo.model.GeoJsonData;
import ch.datahackdays.baustelleninfo.repository.GeoJsonDataRepository;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

@Service
public class S3Service {

    @Autowired
    private S3Client s3Client;

    @Autowired
    private GeoJsonDataRepository geoJsonDataRepository;

    public void uploadFile(String bucketName, String key, Path filePath) {
        s3Client.putObject(PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build(), filePath);
    }

    public void listFiles() {
        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket("bernhackdays")
                .build();

        ListObjectsV2Response response = s3Client.listObjectsV2(request);
        for (S3Object object : response.contents()) {
            System.out.println("File: " + object.key());

        }
    }

    public void readObjectContent(String bucketName, String key) {
        try (ResponseInputStream<GetObjectResponse> s3Object = s3Client.getObject(
                GetObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build())) {

            // Save GeoJSON data to the database
            GeoJsonData geoJsonData = new GeoJsonData();
            geoJsonData.setGeoJsonContent(geoJsonData.toString());
            geoJsonDataRepository.save(geoJsonData);

            // Print the GeoJSON data
            System.out.println("GeoJSON Data saved to the database.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
