package com.siddu.upiinsights.categories.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter; import lombok.Setter;

@Getter @Setter
public class CreateCategoryRequest {
    @NotBlank @Size(max = 80)
    private String name;

    @Size(max = 50)
    private String icon;

    @Size(max = 20)
    private String color;
}