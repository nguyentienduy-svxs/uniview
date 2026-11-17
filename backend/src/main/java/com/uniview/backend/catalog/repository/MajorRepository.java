package com.uniview.backend.catalog.repository;

import com.uniview.backend.catalog.entity.MajorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorRepository extends JpaRepository<MajorEntity, String> {
    List<MajorEntity> findByCategory(String category);
}
