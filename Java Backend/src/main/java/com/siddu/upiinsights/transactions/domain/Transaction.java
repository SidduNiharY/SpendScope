package com.siddu.upiinsights.transactions.domain;

import com.siddu.upiinsights.uploads.domain.Upload;
import com.siddu.upiinsights.users.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "transactions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Transaction {
    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "upload_id")
    private Upload upload;

    @Column(name = "txn_time", nullable = false)
    private Instant txnTime;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String direction; // DEBIT/CREDIT

    @Column(nullable = false)
    private String currency; // INR

    @Column(name = "merchant_name")
    private String merchantName;

    @Column(name = "txn_note")
    private String txnNote;

    @Column(name = "reference_id")
    private String referenceId;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String channel;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}