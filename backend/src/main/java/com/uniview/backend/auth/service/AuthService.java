package com.uniview.backend.auth.service;

import com.uniview.backend.auth.entity.UserEntity;
import com.uniview.backend.auth.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public Map<String, Object> register(String fullName, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email đã được sử dụng");
        }

        String username = email.split("@")[0].toLowerCase();
        String baseUsername = username;
        int suffix = 1;
        while (userRepository.existsByUsername(username)) {
            username = baseUsername + suffix++;
        }

        String[] nameParts = fullName.trim().split("\\s+");
        String initials = "";
        if (nameParts.length >= 2) {
            initials = String.valueOf(nameParts[nameParts.length - 2].charAt(0)).toUpperCase()
                     + String.valueOf(nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        } else if (nameParts.length == 1) {
            initials = nameParts[0].substring(0, Math.min(2, nameParts[0].length())).toUpperCase();
        }

        String id = "student-" + Long.toString(System.currentTimeMillis(), 36) + "-" + UUID.randomUUID().toString().substring(0, 8);

        UserEntity user = UserEntity.builder()
                .id(id)
                .email(email.toLowerCase())
                .username(username)
                .passwordHash(passwordEncoder.encode(password))
                .fullName(fullName.trim())
                .initials(initials)
                .role("STUDENT")
                .targetAdmissionYear("2027")
                .activePlansJson("[\"ANNUAL\"]")
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return buildSessionResponse(user, token);
    }

    public Map<String, Object> login(String identifier, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(identifier, password));
        } catch (Exception e) {
            throw new BadCredentialsException("Sai tài khoản hoặc mật khẩu");
        }

        UserEntity user = userRepository.findByEmailOrUsername(identifier, identifier)
                .orElseThrow(() -> new BadCredentialsException("Tài khoản không tồn tại"));

        String token = jwtService.generateToken(user);
        return buildSessionResponse(user, token);
    }

    public Map<String, Object> getProfile(String username) {
        UserEntity user = userRepository.findByEmailOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        return buildUserResponse(user);
    }

    private Map<String, Object> buildSessionResponse(UserEntity user, String token) {
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", buildUserResponse(user));
        return response;
    }

    private Map<String, Object> buildUserResponse(UserEntity user) {
        Map<String, Object> u = new HashMap<>();
        u.put("id", user.getId());
        u.put("email", user.getEmail());
        u.put("username", user.getUsername());
        u.put("fullName", user.getFullName());
        u.put("initials", user.getInitials());
        u.put("role", user.getRole());
        u.put("avatarUrl", user.getAvatarUrl());
        u.put("grade", user.getGrade());
        u.put("school", user.getSchool());
        u.put("targetAdmissionYear", user.getTargetAdmissionYear());
        u.put("preferredRegion", user.getPreferredRegion());
        u.put("isDemo", user.isDemo());
        u.put("createdAt", user.getCreatedAt());

        // Academic profile
        Map<String, Object> gpa = new HashMap<>();
        gpa.put("value", user.getGpaValue() != null ? user.getGpaValue() : "");
        gpa.put("status", user.getGpaStatus());

        Map<String, Object> thpt = new HashMap<>();
        thpt.put("value", user.getThptScore() != null ? user.getThptScore() : "");
        thpt.put("status", user.getThptScoreStatus());

        Map<String, Object> dgnl = new HashMap<>();
        dgnl.put("value", user.getDgnlScore() != null ? user.getDgnlScore() : "");
        dgnl.put("status", user.getDgnlScoreStatus());

        Map<String, Object> academic = new HashMap<>();
        academic.put("gpa", gpa);
        academic.put("thptScore", thpt);
        academic.put("dgnlScore", dgnl);
        academic.put("certificates", user.getCertificatesJson() != null ? user.getCertificatesJson() : "[]");

        u.put("academicProfile", academic);
        return u;
    }
}
