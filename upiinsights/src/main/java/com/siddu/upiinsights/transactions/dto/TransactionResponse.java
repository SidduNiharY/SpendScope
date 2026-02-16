package com.siddu.upiinsights.transactions.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
public class TransactionResponse {
    private UUID id;
    private Instant txnTime;
    private BigDecimal amount;
    private String direction;
    private String merchantName;
    private String note;

    private UUID categoryId;
    private String categoryName;
    private String categorySource; // MODEL/RULE/MANUAL
}