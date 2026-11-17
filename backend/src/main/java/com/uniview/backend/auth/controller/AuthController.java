package com.uniview.backend.auth.controller;

import com.uniview.backend.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            String fullName = body.get("fullName");
            String email = body.get("email");
            String password = body.get("password");

            if (fullName == null || email == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Thiếu thông tin đăng ký"));
            }
            if (password.length() < 8) {
                return ResponseEntity.badRequest().body(Map.of("message", "Mật khẩu phải ít nhất 8 ký tự"));
            }

            Map<String, Object> result = authService.register(fullName, email, password);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Lỗi server: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String identifier = body.get("identifier");
            String password = body.get("password");

            if (identifier == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Thiếu thông tin đăng nhập"));
            }

            Map<String, Object> result = authService.login(identifier, password);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", "Sai tài khoản hoặc mật khẩu"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            Map<String, Object> profile = authService.getProfile(userDetails.getUsername());
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("message", "Không tìm thấy người dùng"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
