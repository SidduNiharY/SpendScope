package com.siddu.upiinsights.transactions.repository;

import com.siddu.upiinsights.transactions.domain.TransactionCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TransactionCategoryRepository extends JpaRepository<TransactionCategory, UUID> {
    Optional<TransactionCategory> findByTransaction_Id(UUID txnId);
}