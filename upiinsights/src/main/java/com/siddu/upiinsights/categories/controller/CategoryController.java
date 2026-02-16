package com.siddu.upiinsights.categories.controller;

import com.siddu.upiinsights.categories.dto.*;
import com.siddu.upiinsights.categories.service.CategoryService;
import com.siddu.upiinsights.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    // TEMP: userId as header until we add JWT
    @GetMapping
    public ApiResponse<List<CategoryResponse>> list(@RequestHeader("X-User-Id") UUID userId) {
        return ApiResponse.ok("Categories fetched", categoryService.list(userId));
    }

    @PostMapping
    public ApiResponse<CategoryResponse> create(
            @RequestHeader("X-User-Id") UUID userId,
            @Valid @RequestBody CreateCategoryRequest request
    ) {
        return ApiResponse.ok("Category created", categoryService.create(userId, request));
    }
}