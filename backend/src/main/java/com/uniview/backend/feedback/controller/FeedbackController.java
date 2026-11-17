package com.uniview.backend.feedback.controller;

import com.uniview.backend.feedback.entity.FeedbackEntity;
import com.uniview.backend.feedback.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    /**
     * POST /api/v1/feedback
     * Lưu góp ý vào PostgreSQL
     */
    @PostMapping
    public ResponseEntity<?> submitFeedback(@RequestBody Map<String, Object> payload) {
        try {
            FeedbackEntity saved = feedbackService.saveFeedback(payload);
            return ResponseEntity.ok(Map.of(
                "ok", true,
                "id", saved.getId(),
                "message", "Đã lưu góp ý thành công",
                "syncStatus", saved.getSyncStatus()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "ok", false,
                "message", "Lỗi lưu góp ý: " + e.getMessage()
            ));
        }
    }

    /**
     * GET /api/v1/feedback
     * Lấy tất cả góp ý (admin only — tự truy xuất)
     */
    @GetMapping
    public ResponseEntity<List<FeedbackEntity>> getAllFeedbacks() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    /**
     * GET /api/v1/feedback/count
     */
    @GetMapping("/count")
    public ResponseEntity<?> countFeedbacks() {
        return ResponseEntity.ok(Map.of("count", feedbackService.countFeedbacks()));
    }
}
