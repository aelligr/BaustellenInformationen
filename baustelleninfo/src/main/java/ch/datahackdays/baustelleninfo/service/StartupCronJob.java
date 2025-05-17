package ch.datahackdays.baustelleninfo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class StartupCronJob {

    @Autowired
    private S3Service s3Service;

    @PostConstruct
    public void executeOnStartup() {
        System.out.println("Executing cron job at application startup...");
        // Add your cron job logic here

        s3Service.listFiles();

        s3Service.readObjectContent("bernhackdays", "baustellen_1.geojson");
    }
}