package com.siddu.upiinsights.categories.service;

import com.siddu.upiinsights.categories.domain.Category;
import com.siddu.upiinsights.categories.dto.*;
import com.siddu.upiinsights.categories.repository.CategoryRepository;
import com.siddu.upiinsights.users.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> list(UUID userId) {
        return categoryRepository.findByUser_IdOrUserIsNull(userId)
                .stream()
                .map(c -> CategoryResponse.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .icon(c.getIcon())
                        .color(c.getColor())
                        .system(c.getUser() == null)
                        .build())
                .collect(Collectors.toList());
    }

    public CategoryResponse create(UUID userId, CreateCategoryRequest req) {
        // For now, "user fetch" is skipped; we’ll add auth + current user later.
        User u = new User();
        u.setId(userId);

        Category c = Category.builder()
                .id(UUID.randomUUID())
                .user(u)
                .name(req.getName().trim())
                .icon(req.getIcon())
                .color(req.getColor())
                .active(true)
                .createdAt(Instant.now())
                .build();

        c = categoryRepository.save(c);

        return CategoryResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .icon(c.getIcon())
                .color(c.getColor())
                .system(false)
                .build();
    }
}