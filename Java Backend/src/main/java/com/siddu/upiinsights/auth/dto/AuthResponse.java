package com.siddu.upiinsights.auth.dto;

import lombok.*;

import java.util.UUID;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class AuthResponse {
    private UUID userId;
    private String email;
    private String token;
}