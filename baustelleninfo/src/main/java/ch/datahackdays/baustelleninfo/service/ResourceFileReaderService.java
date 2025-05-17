package ch.datahackdays.baustelleninfo.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ClassPathResource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

@Service
public class ResourceFileReaderService {

    public String readFileFromResources(String fileName) {
        try {
            // Load the file from resources/data
            Path path = new ClassPathResource("data/" + fileName).getFile().toPath();

            // Read the file content as a String
            return Files.readString(path, StandardCharsets.UTF_8);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
