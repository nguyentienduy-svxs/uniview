package com.uniview.backend.feedback.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "feedbacks")
public class FeedbackEntity {

    @Id
    @Column(length = 100)
    private String id;

    @Column(name = "user_id", length = 100)
    private String userId;

    @Column(name = "user_name", length = 200)
    private String userName;

    @Column(length = 200)
    private String email;

    @Column(nullable = false)
    private Integer rating;

    @Column(length = 100)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(length = 500)
    private String page;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @Column(name = "received_at")
    private Instant receivedAt = Instant.now();

    @Column(name = "sync_status", length = 50)
    private String syncStatus = "STORED_IN_DATABASE";

    public FeedbackEntity() {}

    // Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final FeedbackEntity f = new FeedbackEntity();

        public Builder id(String id) { f.id = id; return this; }
        public Builder userId(String userId) { f.userId = userId; return this; }
        public Builder userName(String userName) { f.userName = userName; return this; }
        public Builder email(String email) { f.email = email; return this; }
        public Builder rating(Integer rating) { f.rating = rating; return this; }
        public Builder category(String category) { f.category = category; return this; }
        public Builder message(String message) { f.message = message; return this; }
        public Builder page(String page) { f.page = page; return this; }
        public Builder createdAt(Instant createdAt) { f.createdAt = createdAt; return this; }
        public Builder receivedAt(Instant receivedAt) { f.receivedAt = receivedAt; return this; }
        public Builder syncStatus(String syncStatus) { f.syncStatus = syncStatus; return this; }

        public FeedbackEntity build() {
            return f;
        }
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getReceivedAt() { return receivedAt; }
    public void setReceivedAt(Instant receivedAt) { this.receivedAt = receivedAt; }

    public String getSyncStatus() { return syncStatus; }
    public void setSyncStatus(String syncStatus) { this.syncStatus = syncStatus; }
}
