package com.siddu.upiinsights.transactions.controller;

import com.siddu.upiinsights.common.response.ApiResponse;
import com.siddu.upiinsights.transactions.dto.*;
import com.siddu.upiinsights.transactions.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ApiResponse<Page<TransactionResponse>> list(
            @RequestHeader("X-User-Id") UUID userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.ok("Transactions fetched", transactionService.list(userId, page, size));
    }

    @PostMapping("/{txnId}/category")
    public ApiResponse<Void> setCategory(
            @RequestHeader("X-User-Id") UUID userId,
            @PathVariable UUID txnId,
            @Valid @RequestBody SetCategoryRequest request
    ) {
        transactionService.setCategoryManually(userId, txnId, request);
        return ApiResponse.ok("Category updated", null);
    }
}