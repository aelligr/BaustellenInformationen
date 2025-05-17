package ch.datahackdays.baustelleninfo.service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public String readGeoJsonContent(String bucketName, String key) {
        var content = new String();

        try (ResponseInputStream<GetObjectResponse> s3Object = s3Client.getObject(
                GetObjectRequest.builder()
                        .bucket(bucketName)
                        .key(key)
                        .build())) {

            // Read the content of the S3 object as a string
            content = new String(s3Object.readAllBytes(), StandardCharsets.UTF_8);

            System.out.println("S3 Object Content: \n" + content);
            return content;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return content;
    }
}
