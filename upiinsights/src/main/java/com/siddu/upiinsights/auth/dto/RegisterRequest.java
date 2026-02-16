package com.siddu.upiinsights.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Getter; import lombok.Setter;

@Getter @Setter
public class RegisterRequest {
    @NotBlank @Size(max = 120)
    private String fullName;

    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 6, max = 72)
    private String password;
}