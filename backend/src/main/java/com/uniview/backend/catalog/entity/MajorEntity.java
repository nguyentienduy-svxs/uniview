package com.uniview.backend.catalog.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "majors")
public class MajorEntity {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 50)
    private String code;

    @Column(length = 100)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "universities_count")
    private Integer universitiesCount = 0;

    @Column(name = "popular_combinations", length = 200)
    private String popularCombinations;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "tuition_range", length = 100)
    private String tuitionRange;

    public MajorEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getUniversitiesCount() { return universitiesCount; }
    public void setUniversitiesCount(Integer universitiesCount) { this.universitiesCount = universitiesCount; }

    public String getPopularCombinations() { return popularCombinations; }
    public void setPopularCombinations(String popularCombinations) { this.popularCombinations = popularCombinations; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getTuitionRange() { return tuitionRange; }
    public void setTuitionRange(String tuitionRange) { this.tuitionRange = tuitionRange; }
}
