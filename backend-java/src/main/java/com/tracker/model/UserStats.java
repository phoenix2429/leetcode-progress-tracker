package com.tracker.model;

public class UserStats {

    private String username;
    private int easy;
    private int medium;
    private int hard;
    private int total;
    private int ranking;

    public UserStats(String username, int easy, int medium, int hard, int ranking) {
        this.username = username;
        this.easy = easy;
        this.medium = medium;
        this.hard = hard;
        this.total = easy + medium + hard;
        this.ranking = ranking;
    }

    public String getUsername() { return username; }
    public int getEasy() { return easy; }
    public int getMedium() { return medium; }
    public int getHard() { return hard; }
    public int getTotal() { return total; }
    public int getRanking() { return ranking; }
}