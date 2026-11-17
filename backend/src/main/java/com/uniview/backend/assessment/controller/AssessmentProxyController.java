package com.uniview.backend.assessment.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/assessments")
public class AssessmentProxyController {

    private static final Logger log = LoggerFactory.getLogger(AssessmentProxyController.class);

    @Value("${app.assessment-engine.url:http://localhost:8081/api/v1}")
    private String assessmentEngineUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/definition")
    public ResponseEntity<?> definition() {
        return proxy(HttpMethod.GET, "/assessments/definition", null);
    }

    @GetMapping("/riasec")
    public ResponseEntity<?> riasec() {
        return proxy(HttpMethod.GET, "/assessments/riasec", null);
    }

    @GetMapping("/experience-domains")
    public ResponseEntity<?> experienceDomains() {
        return proxy(HttpMethod.GET, "/assessments/experience-domains", null);
    }

    @GetMapping("/experience-domains/{domain}")
    public ResponseEntity<?> experienceDomain(@PathVariable String domain) {
        return proxy(HttpMethod.GET, "/assessments/experience-domains/" + domain, null);
    }

    @PostMapping("/experience-domains/{domain}/evaluate-base")
    public ResponseEntity<?> evaluateBase(@PathVariable String domain, @RequestBody Map<String, Object> body) {
        return proxy(HttpMethod.POST, "/assessments/experience-domains/" + domain + "/evaluate-base", body);
    }

    @PostMapping("/experience-domains/{domain}/evaluate-adaptive")
    public ResponseEntity<?> evaluateAdaptive(@PathVariable String domain, @RequestBody Map<String, Object> body) {
        return proxy(HttpMethod.POST, "/assessments/experience-domains/" + domain + "/evaluate-adaptive", body);
    }

    @PostMapping("/evaluate")
    public ResponseEntity<?> evaluate(@RequestBody Map<String, Object> body) {
        return proxy(HttpMethod.POST, "/assessments/evaluate", body);
    }

    @GetMapping("/demo-personas")
    public ResponseEntity<?> demoPersonas() {
        return proxy(HttpMethod.GET, "/assessments/demo-personas", null);
    }

    @PostMapping("/evaluate-demo/{personaId}")
    public ResponseEntity<?> evaluateDemo(@PathVariable String personaId) {
        return proxy(HttpMethod.POST, "/assessments/evaluate-demo/" + personaId, null);
    }

    private ResponseEntity<?> proxy(HttpMethod method, String path, Object body) {
        String url = assessmentEngineUrl + path;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Object> entity = new HttpEntity<>(body, headers);
            return restTemplate.exchange(url, method, entity, Object.class);
        } catch (Exception e) {
            log.error("[AssessmentProxy] Lỗi kết nối assessment engine tại {}: {}", url, e.getMessage());
            return ResponseEntity.status(503).body(Map.of(
                "code", "ASSESSMENT_ENGINE_UNAVAILABLE",
                "message", "Assessment engine không khả dụng. Đảm bảo NestJS đang chạy tại " + assessmentEngineUrl
            ));
        }
    }
}
