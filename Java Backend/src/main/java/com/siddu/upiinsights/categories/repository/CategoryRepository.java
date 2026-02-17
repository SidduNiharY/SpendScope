package com.siddu.upiinsights.categories.repository;

import com.siddu.upiinsights.categories.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    List<Category> findByUser_IdOrUserIsNull(UUID userId);
}