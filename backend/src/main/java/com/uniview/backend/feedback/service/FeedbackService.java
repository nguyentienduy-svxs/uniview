package com.uniview.backend.feedback.service;

import com.uniview.backend.feedback.entity.FeedbackEntity;
import com.uniview.backend.feedback.repository.FeedbackRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FeedbackService {

    private static final Logger log = LoggerFactory.getLogger(FeedbackService.class);

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public FeedbackEntity saveFeedback(Map<String, Object> payload) {
        String id = payload.containsKey("id") && payload.get("id") != null
                ? payload.get("id").toString()
                : UUID.randomUUID().toString();

        FeedbackEntity entity = FeedbackEntity.builder()
                .id(id)
                .userId(getStr(payload, "userId"))
                .userName(getStr(payload, "userName") != null ? getStr(payload, "userName") : "Khách vãng lai")
                .email(getStr(payload, "email"))
                .rating(payload.get("rating") instanceof Number n ? n.intValue() : 5)
                .category(getStr(payload, "category") != null ? getStr(payload, "category") : "Trải nghiệm chung")
                .message(getStr(payload, "message"))
                .page(getStr(payload, "page"))
                .createdAt(parseInstant(payload, "createdAt"))
                .receivedAt(Instant.now())
                .syncStatus("STORED_IN_DATABASE")
                .build();

        FeedbackEntity saved = feedbackRepository.save(entity);
        log.info("[Feedback] Đã lưu góp ý #{} từ {}", saved.getId(), saved.getUserName());
        return saved;
    }

    public List<FeedbackEntity> getAllFeedbacks() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc();
    }

    public long countFeedbacks() {
        return feedbackRepository.count();
    }

    private String getStr(Map<String, Object> map, String key) {
        Object v = map.get(key);
        return v != null ? v.toString() : null;
    }

    private Instant parseInstant(Map<String, Object> map, String key) {
        try {
            Object v = map.get(key);
            if (v != null) return Instant.parse(v.toString());
        } catch (Exception ignored) {}
        return Instant.now();
    }
}
