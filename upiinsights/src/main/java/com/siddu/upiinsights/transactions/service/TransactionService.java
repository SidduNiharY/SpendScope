package com.siddu.upiinsights.transactions.service;

import com.siddu.upiinsights.categories.domain.Category;
import com.siddu.upiinsights.categories.repository.CategoryRepository;
import com.siddu.upiinsights.common.exception.NotFoundException;
import com.siddu.upiinsights.transactions.domain.*;
import com.siddu.upiinsights.transactions.dto.*;
import com.siddu.upiinsights.transactions.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final TransactionCategoryRepository transactionCategoryRepository;
    private final CategoryRepository categoryRepository;

    public Page<TransactionResponse> list(UUID userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("txnTime").descending());
        return transactionRepository.findByUser_Id(userId, pageable)
                .map(txn -> {
                    var tcOpt = transactionCategoryRepository.findByTransaction_Id(txn.getId());
                    UUID catId = null; String catName = null; String source = null;
                    if (tcOpt.isPresent()) {
                        catId = tcOpt.get().getCategory().getId();
                        catName = tcOpt.get().getCategory().getName();
                        source = tcOpt.get().getSource();
                    }
                    return TransactionResponse.builder()
                            .id(txn.getId())
                            .txnTime(txn.getTxnTime())
                            .amount(txn.getAmount())
                            .direction(txn.getDirection())
                            .merchantName(txn.getMerchantName())
                            .note(txn.getTxnNote())
                            .categoryId(catId)
                            .categoryName(catName)
                            .categorySource(source)
                            .build();
                });
    }

    public void setCategoryManually(UUID userId, UUID txnId, SetCategoryRequest req) {
        Transaction txn = transactionRepository.findById(txnId)
                .orElseThrow(() -> new NotFoundException("Transaction not found"));

        if (!txn.getUser().getId().equals(userId)) {
            throw new NotFoundException("Transaction not found"); // hide ownership
        }

        Category cat = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found"));

        TransactionCategory tc = transactionCategoryRepository.findByTransaction_Id(txnId)
                .orElse(TransactionCategory.builder()
                        .id(UUID.randomUUID())
                        .transaction(txn)
                        .build());

        tc.setCategory(cat);
        tc.setSource("MANUAL");
        tc.setConfidence(null);
        tc.setCreatedAt(Instant.now());

        transactionCategoryRepository.save(tc);
    }
}