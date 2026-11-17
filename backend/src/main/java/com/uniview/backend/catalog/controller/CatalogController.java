package com.uniview.backend.catalog.controller;

import com.uniview.backend.catalog.entity.MajorEntity;
import com.uniview.backend.catalog.entity.UniversityEntity;
import com.uniview.backend.catalog.repository.MajorRepository;
import com.uniview.backend.catalog.repository.UniversityRepository;
import com.uniview.backend.auth.repository.UserRepository;
import com.uniview.backend.feedback.repository.FeedbackRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CatalogController {

    private final MajorRepository majorRepository;
    private final UniversityRepository universityRepository;
    private final UserRepository userRepository;
    private final FeedbackRepository feedbackRepository;

    public CatalogController(MajorRepository majorRepository,
                             UniversityRepository universityRepository,
                             UserRepository userRepository,
                             FeedbackRepository feedbackRepository) {
        this.majorRepository = majorRepository;
        this.universityRepository = universityRepository;
        this.userRepository = userRepository;
        this.feedbackRepository = feedbackRepository;
    }

    /**
     * GET /api/v1/status
     * Báo cáo trạng thái kết nối PostgreSQL & số lượng bản ghi thật
     */
    @GetMapping("/status")
    public ResponseEntity<?> getStatus() {
        return ResponseEntity.ok(Map.of(
            "status", "CONNECTED",
            "database", "PostgreSQL on Render",
            "counts", Map.of(
                "majors", majorRepository.count(),
                "universities", universityRepository.count(),
                "users", userRepository.count(),
                "feedbacks", feedbackRepository.count()
            )
        ));
    }

    /**
     * GET /api/v1/majors
     * Lấy danh sách ngành học từ PostgreSQL
     */
    @GetMapping("/majors")
    public ResponseEntity<List<MajorEntity>> getMajors() {
        return ResponseEntity.ok(majorRepository.findAll());
    }

    /**
     * GET /api/v1/universities
     * Lấy danh sách trường đại học từ PostgreSQL
     */
    @GetMapping("/universities")
    public ResponseEntity<List<UniversityEntity>> getUniversities() {
        return ResponseEntity.ok(universityRepository.findAll());
    }

    /**
     * POST /api/v1/majors/seed
     * Đổ danh sách ngành vào PostgreSQL (nếu bảng đang trống)
     */
    @PostMapping("/majors/seed")
    public ResponseEntity<?> seedMajors(@RequestBody(required = false) List<MajorEntity> majors) {
        if (majors != null && !majors.isEmpty()) {
            List<MajorEntity> saved = majorRepository.saveAll(majors);
            return ResponseEntity.ok(Map.of("ok", true, "inserted", saved.size()));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Danh sách ngành rỗng"));
    }

    /**
     * POST /api/v1/universities/seed
     */
    @PostMapping("/universities/seed")
    public ResponseEntity<?> seedUniversities(@RequestBody(required = false) List<UniversityEntity> universities) {
        if (universities != null && !universities.isEmpty()) {
            List<UniversityEntity> saved = universityRepository.saveAll(universities);
            return ResponseEntity.ok(Map.of("ok", true, "inserted", saved.size()));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Danh sách trường rỗng"));
    }
}
