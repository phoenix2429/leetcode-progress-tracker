package com.tracker.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tracker.api.LeetCodeApiClient;
import com.tracker.model.UserStats;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class StatsService {

    private final LeetCodeApiClient apiClient = new LeetCodeApiClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public List<UserStats> fetchAllUsers() throws Exception {

        File file = new File("../data/users.json");
        JsonNode usersNode = mapper.readTree(file);

        List<UserStats> statsList = new ArrayList<>();

        for (JsonNode userNode : usersNode) {
            String username = userNode.get("username").asText();
            statsList.add(fetchUserStats(username));
        }

        return statsList;
    }

    private UserStats fetchUserStats(String username) throws Exception {

        JsonNode response = apiClient.fetchUser(username);

        JsonNode user = response.get("data").get("matchedUser");
        JsonNode submissions = user.get("submitStats").get("acSubmissionNum");

        int easy = 0, medium = 0, hard = 0;

        for (Iterator<JsonNode> it = submissions.elements(); it.hasNext();) {
            JsonNode node = it.next();
            String diff = node.get("difficulty").asText();
            int count = node.get("count").asInt();

            switch (diff) {
                case "Easy" -> easy = count;
                case "Medium" -> medium = count;
                case "Hard" -> hard = count;
            }
        }

        int ranking = user.get("profile").get("ranking").asInt();

        return new UserStats(username, easy, medium, hard, ranking);
    }
}