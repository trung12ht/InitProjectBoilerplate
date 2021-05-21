package org.project4.server.config.custombean;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.project4.server.dto.LangTechDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class DirectoryFiles {

    public Set<String> listFilesUsingFilesList(String dir) throws IOException {
        try (Stream<Path> stream = Files.list(Paths.get(dir))) {
            return stream.filter(file -> !Files.isDirectory(file))
                    .map(Path::getFileName).map(Path::toString)
                    .collect(Collectors.toSet());
        }
    }

    public Set<String> listFilesUsingFileWalk(String dir, int depth)
            throws IOException {
        try (Stream<Path> stream = Files.walk(Paths.get(dir), depth)) {
            return stream.filter(file -> !Files.isDirectory(file))
                    .map(Path::getFileName).map(Path::toString)
                    .collect(Collectors.toSet());
        }
    }

    public Set<String> listFilesUsingFileWalkAndVisitor(String dir)
            throws IOException {
        Set<String> fileList = new HashSet<>();
        Files.walkFileTree(Paths.get(dir), new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult visitFile(Path file,
                    BasicFileAttributes attrs) throws IOException {
                if (!Files.isDirectory(file)) {
                    fileList.add(file.getFileName().toString());
                }
                return FileVisitResult.CONTINUE;
            }
        });
        return fileList;
    }

    public Set<String> listFilesUsingJavaIO(String dir) {
        return Stream.of(new File(dir).listFiles())
                .filter(file -> !file.isDirectory()).map(File::getName)
                .collect(Collectors.toSet());
    }

    public List<Map<String, Object>> listAllFileFolder(String dir) {
        File directoryPath = new File(dir);
        String[] contents = directoryPath.list();
        List<Map<String, Object>> arrayRs = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < contents.length; i++) {
            Map<String, Object> rs = new HashMap<String, Object>();
            rs.put("name", contents[i]);
            if (!contents[i].contains(".")) {
                try {
                    rs.put("children",
                            listAllFileFolder(dir + "/" + contents[i]));
                } catch (Exception e) {

                }
            }
            arrayRs.add(rs);
        }
        return arrayRs;
    }
    
    public List<Map<String, Object>> listAllFileWithContentFolder(String dir) {
        File directoryPath = new File(dir);
        String[] contents = directoryPath.list();
        List<Map<String, Object>> arrayRs = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < contents.length; i++) {
            Map<String, Object> rs = new HashMap<String, Object>();
            rs.put("name", contents[i]);
            rs.put("content", getDocument(dir, contents[i]));
            if (!contents[i].contains(".")) {
                try {
                    rs.put("children",
                            listAllFileFolder(dir + "/" + contents[i]));
                } catch (Exception e) {

                }
            }
            arrayRs.add(rs);
        }
        return arrayRs;
    }
    
    private List<String> getDocument(String dir, String fileName) {
        Path path = Paths.get(dir + "/" + fileName);
        try {
            List<String> read = Files.readAllLines(path);
            return read;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}