package com.uniview.backend.catalog.repository;

import com.uniview.backend.catalog.entity.UniversityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends JpaRepository<UniversityEntity, String> {
    List<UniversityEntity> findByRegion(String region);
}
