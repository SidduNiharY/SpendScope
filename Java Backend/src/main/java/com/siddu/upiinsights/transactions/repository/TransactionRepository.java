package com.siddu.upiinsights.transactions.repository;

import com.siddu.upiinsights.transactions.domain.Transaction;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    Page<Transaction> findByUser_Id(UUID userId, Pageable pageable);
}