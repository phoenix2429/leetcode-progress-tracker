package com.tracker.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tracker.model.UserStats;

import java.io.File;
import java.util.List;

public class JsonUtil {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static void writeLatest(List<UserStats> stats) throws Exception {
        File file = new File("../frontend/public/latest.json");
        file.getParentFile().mkdirs();  // ensures folder exists
        mapper.writerWithDefaultPrettyPrinter().writeValue(file, stats);
    }

    public static void writeHistory(List<UserStats> stats, String timestamp) throws Exception {

        File historyDir = new File("../frontend/public/history/");
        historyDir.mkdirs();  // creates history folder if not exists

        File file = new File(historyDir, timestamp + ".json");
        mapper.writerWithDefaultPrettyPrinter().writeValue(file, stats);
    }
}