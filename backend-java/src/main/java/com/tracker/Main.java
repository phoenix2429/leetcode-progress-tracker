package com.tracker;

import com.tracker.model.UserStats;
import com.tracker.service.StatsService;
import com.tracker.util.JsonUtil;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Main {

    public static void main(String[] args) throws Exception {

        System.out.println("🚀 Starting LeetCode Progress Fetch...");

        StatsService service = new StatsService();
        List<UserStats> statsList = service.fetchAllUsers();

        // Save latest snapshot
        JsonUtil.writeLatest(statsList);

        // Save historical snapshot
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));

        JsonUtil.writeHistory(statsList, timestamp);

        System.out.println("✅ Data updated successfully.");
    }
}