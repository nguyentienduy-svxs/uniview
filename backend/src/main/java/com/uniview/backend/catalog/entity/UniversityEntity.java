package com.uniview.backend.catalog.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "universities")
public class UniversityEntity {

    @Id
    @Column(length = 100)
    private String id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(name = "short_name", length = 50)
    private String shortName;

    @Column(length = 50)
    private String code;

    @Column(length = 50)
    private String type;

    @Column(length = 100)
    private String region;

    @Column(length = 100)
    private String city;

    @Column(name = "tuition_range", length = 100)
    private String tuitionRange;

    @Column(name = "majors_count")
    private Integer majorsCount = 0;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    public UniversityEntity() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getTuitionRange() { return tuitionRange; }
    public void setTuitionRange(String tuitionRange) { this.tuitionRange = tuitionRange; }

    public Integer getMajorsCount() { return majorsCount; }
    public void setMajorsCount(Integer majorsCount) { this.majorsCount = majorsCount; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
}
