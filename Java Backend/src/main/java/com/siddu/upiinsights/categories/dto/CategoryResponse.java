package com.siddu.upiinsights.categories.dto;

import lombok.*;

import java.util.UUID;

@Getter @Setter @Builder @AllArgsConstructor @NoArgsConstructor
public class CategoryResponse {
    private UUID id;
    private String name;
    private String icon;
    private String color;
    private boolean system;
}