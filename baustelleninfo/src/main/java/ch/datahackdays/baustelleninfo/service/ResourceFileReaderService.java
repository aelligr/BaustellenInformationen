package ch.datahackdays.baustelleninfo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import org.springframework.core.io.ClassPathResource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

@Service
public class ResourceFileReaderService {

    public String readFileFromResources(String fileName) {
        try {
            // Load the file as an InputStream
            InputStream inputStream = new ClassPathResource("data/" + fileName).getInputStream();

            // Read the InputStream content as a String
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
                return reader.lines().collect(Collectors.joining(System.lineSeparator()));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
