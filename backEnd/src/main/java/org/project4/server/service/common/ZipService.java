package org.project4.server.service.common;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.project4.server.dto.child.DocumentsDTO;
import org.project4.server.security.md5.Md5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.junrar.Junrar;
import com.github.junrar.exception.RarException;

import net.lingala.zip4j.core.ZipFile;
import net.lingala.zip4j.exception.ZipException;

@Service
public class ZipService extends CommonService {

    @Autowired
    private Md5 md5;

    private static final String ROOT_PATH = "E:/file/project/";

    /**
     * Them file vao file zip
     * 
     * @param fileName: ex pom.xml
     * @param projectId
     * @return
     */
    public boolean addToZip(String fileName, Long projectId) {
        Map<String, String> env = new HashMap<>();
        env.put("create", "true");
        Path path = Paths.get(ROOT_PATH + md5.encoder(projectId.toString())
                + "/" + dGetZipFile(projectId));
//        URI uri = URI.create("jar:" + path.toUri());

        URI uri = URI.create("jar:" + path.toUri());
        try (FileSystem fs = FileSystems.newFileSystem(uri, env)) {
            Path nf = fs.getPath(dGetZipFilePost(projectId) + "/" + fileName);

            try (Writer writer = Files.newBufferedWriter(nf,
                    StandardCharsets.UTF_8, StandardOpenOption.CREATE)) {
                String fileContent = aReadLineByLineJava8(nf);
                writer.write(fileContent);
//                fileContent.replace("<!GROUP_ID!>", "sss");
//                fileContent.replace("<!ARTIFACT_ID!>", "sss");
//                fileContent.replace("<!VERSION!>", "sss");
//                fileContent.replace("<!NAME!>", "sss");
//                fileContent.replace("<!DESCRIPTION!>", "sss");
//                fileContent.replace("<!JAVA_VERSION!>", "sss");
            }
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static String aReadLineByLineJava8(Path path) {
        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream = Files.lines(path,
                StandardCharsets.UTF_8)) {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return contentBuilder.toString();
    }

    public void unZipFile(Long projectId) {
        String OUTPUT_FOLDER = ROOT_PATH + md5.encoder(projectId.toString())
                + "/";
//      "C:/output";
        String FILE_PATH = OUTPUT_FOLDER + dGetZipFilePost(projectId);

        try {
            File s = new File(FILE_PATH);
            int index = s.toString().lastIndexOf('.');
            if (index > 0) {
                String extension = s.toString().substring(index + 1);
                if (extension.equals("rar")) {
                    unRarFile(projectId);
                    return;
                }
            }
            new ZipFile(s).extractAll(OUTPUT_FOLDER.toString());
        } catch (ZipException e) {
            e.printStackTrace();
        }
    }

    public void unRarFile(Long projectId) {
        String OUTPUT_FOLDER = ROOT_PATH + md5.encoder(projectId.toString())
                + "/";
        String FILE_PATH = OUTPUT_FOLDER + dGetZipFilePost(projectId);
        final File rar = new File(FILE_PATH);
        final File destinationFolder = new File(OUTPUT_FOLDER);
        try {
            Junrar.extract(rar, destinationFolder);
        } catch (RarException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public boolean addDocumentToZip(List<DocumentsDTO> documents,
            Long projectId) {
        Map<String, String> env = new HashMap<>();
        env.put("create", "true");
        Path path = Paths.get(ROOT_PATH + md5.encoder(projectId.toString())
                + "/" + dGetZipFilePost(projectId));
//        URI uri = URI.create("jar:" + path.toUri());
        URI uri = URI.create("jar:" + path.toUri());
        try (FileSystem fs = FileSystems.newFileSystem(uri, env)) {
            String root = dGetZipFilePost(projectId).substring(0,
                    dGetZipFilePost(projectId).length() - 4);
            Path folder = fs.getPath(root + "/document/");
            Files.createFile(folder);
            for (DocumentsDTO d : documents) {
                Path nf = fs.getPath(root + "/document/"
                        + d.getName());

                Files.createFile(nf);

                try (Writer writer = Files.newBufferedWriter(nf,
                        StandardCharsets.UTF_8, StandardOpenOption.CREATE)) {
//                    String fileContent = aReadLineByLineJava8(nf);
                    for (String line : d.getContent()) {
                        writer.write(line + "\n");
                    }
                }
                System.out.println("Directory created successfully");

            }

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

}
