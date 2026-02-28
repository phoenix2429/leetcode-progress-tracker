package com.tracker.api;

import okhttp3.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class LeetCodeApiClient {

    private static final String URL = "https://leetcode.com/graphql";
    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public JsonNode fetchUser(String username) throws IOException {

        String query = """
        {
          matchedUser(username: "%s") {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
          }
        }
        """.formatted(username);

        String bodyJson = """
        {
          "query": "%s"
        }
        """.formatted(query.replace("\"", "\\\"").replace("\n", " "));

        Request request = new Request.Builder()
                .url(URL)
                .post(RequestBody.create(
                        bodyJson,
                        MediaType.parse("application/json")))
                .build();

        Response response = client.newCall(request).execute();

        if (!response.isSuccessful()) {
            throw new RuntimeException("API call failed: " + response.code());
        }

        return mapper.readTree(response.body().string());
    }
}