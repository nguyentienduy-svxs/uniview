package com.uniview.backend.auth.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "full_name", length = 200)
    private String fullName;

    @Column(length = 10)
    private String initials;

    @Column(length = 20)
    private String role = "STUDENT";

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(length = 10)
    private String grade;

    @Column(length = 200)
    private String school;

    @Column(name = "target_admission_year", length = 10)
    private String targetAdmissionYear = "2027";

    @Column(name = "preferred_region", length = 200)
    private String preferredRegion;

    @Column(name = "target_majors", columnDefinition = "TEXT")
    private String targetMajorsJson;

    @Column(name = "gpa_value", length = 20)
    private String gpaValue;

    @Column(name = "gpa_status", length = 20)
    private String gpaStatus = "EXPECTED";

    @Column(name = "thpt_score", length = 20)
    private String thptScore;

    @Column(name = "thpt_score_status", length = 20)
    private String thptScoreStatus = "EXPECTED";

    @Column(name = "dgnl_score", length = 20)
    private String dgnlScore;

    @Column(name = "dgnl_score_status", length = 20)
    private String dgnlScoreStatus = "EXPECTED";

    @Column(name = "certificates_json", columnDefinition = "TEXT")
    private String certificatesJson;

    @Column(name = "active_plans_json", columnDefinition = "TEXT")
    private String activePlansJson = "[]";

    @Column(name = "is_demo")
    private boolean isDemo = false;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public UserEntity() {}

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final UserEntity u = new UserEntity();

        public Builder id(String id) { u.id = id; return this; }
        public Builder email(String email) { u.email = email; return this; }
        public Builder username(String username) { u.username = username; return this; }
        public Builder passwordHash(String passwordHash) { u.passwordHash = passwordHash; return this; }
        public Builder fullName(String fullName) { u.fullName = fullName; return this; }
        public Builder initials(String initials) { u.initials = initials; return this; }
        public Builder role(String role) { u.role = role; return this; }
        public Builder avatarUrl(String avatarUrl) { u.avatarUrl = avatarUrl; return this; }
        public Builder grade(String grade) { u.grade = grade; return this; }
        public Builder school(String school) { u.school = school; return this; }
        public Builder targetAdmissionYear(String targetAdmissionYear) { u.targetAdmissionYear = targetAdmissionYear; return this; }
        public Builder preferredRegion(String preferredRegion) { u.preferredRegion = preferredRegion; return this; }
        public Builder targetMajorsJson(String targetMajorsJson) { u.targetMajorsJson = targetMajorsJson; return this; }
        public Builder gpaValue(String gpaValue) { u.gpaValue = gpaValue; return this; }
        public Builder gpaStatus(String gpaStatus) { u.gpaStatus = gpaStatus; return this; }
        public Builder thptScore(String thptScore) { u.thptScore = thptScore; return this; }
        public Builder thptScoreStatus(String thptScoreStatus) { u.thptScoreStatus = thptScoreStatus; return this; }
        public Builder dgnlScore(String dgnlScore) { u.dgnlScore = dgnlScore; return this; }
        public Builder dgnlScoreStatus(String dgnlScoreStatus) { u.dgnlScoreStatus = dgnlScoreStatus; return this; }
        public Builder certificatesJson(String certificatesJson) { u.certificatesJson = certificatesJson; return this; }
        public Builder activePlansJson(String activePlansJson) { u.activePlansJson = activePlansJson; return this; }
        public Builder isDemo(boolean isDemo) { u.isDemo = isDemo; return this; }
        public Builder createdAt(Instant createdAt) { u.createdAt = createdAt; return this; }

        public UserEntity build() {
            return u;
        }
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getInitials() { return initials; }
    public void setInitials(String initials) { this.initials = initials; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }

    public String getTargetAdmissionYear() { return targetAdmissionYear; }
    public void setTargetAdmissionYear(String targetAdmissionYear) { this.targetAdmissionYear = targetAdmissionYear; }

    public String getPreferredRegion() { return preferredRegion; }
    public void setPreferredRegion(String preferredRegion) { this.preferredRegion = preferredRegion; }

    public String getTargetMajorsJson() { return targetMajorsJson; }
    public void setTargetMajorsJson(String targetMajorsJson) { this.targetMajorsJson = targetMajorsJson; }

    public String getGpaValue() { return gpaValue; }
    public void setGpaValue(String gpaValue) { this.gpaValue = gpaValue; }

    public String getGpaStatus() { return gpaStatus; }
    public void setGpaStatus(String gpaStatus) { this.gpaStatus = gpaStatus; }

    public String getThptScore() { return thptScore; }
    public void setThptScore(String thptScore) { this.thptScore = thptScore; }

    public String getThptScoreStatus() { return thptScoreStatus; }
    public void setThptScoreStatus(String thptScoreStatus) { this.thptScoreStatus = thptScoreStatus; }

    public String getDgnlScore() { return dgnlScore; }
    public void setDgnlScore(String dgnlScore) { this.dgnlScore = dgnlScore; }

    public String getDgnlScoreStatus() { return dgnlScoreStatus; }
    public void setDgnlScoreStatus(String dgnlScoreStatus) { this.dgnlScoreStatus = dgnlScoreStatus; }

    public String getCertificatesJson() { return certificatesJson; }
    public void setCertificatesJson(String certificatesJson) { this.certificatesJson = certificatesJson; }

    public String getActivePlansJson() { return activePlansJson; }
    public void setActivePlansJson(String activePlansJson) { this.activePlansJson = activePlansJson; }

    public boolean isDemo() { return isDemo; }
    public void setDemo(boolean demo) { isDemo = demo; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public void setUsername(String username) { this.username = username; }

    // ---- UserDetails impl ----
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + (role != null ? role : "STUDENT")));
    }

    @Override public String getPassword() { return passwordHash; }
    @Override public String getUsername() { return username; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
