package com.siddu.upiinsights.auth.controller;

import com.siddu.upiinsights.auth.dto.*;
import com.siddu.upiinsights.auth.service.AuthService;
import com.siddu.upiinsights.common.response.ApiResponse;
import com.siddu.upiinsights.security.AuthUser;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResponse.ok("Registered", authService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.ok("Logged in", authService.login(request));
    }

    @GetMapping("/me")
    public ApiResponse<Object> me(@AuthenticationPrincipal Object principal) {
        if (principal instanceof AuthUser au) {
            return ApiResponse.ok("Me", java.util.Map.of(
                    "userId", au.getId(),
                    "email", au.getEmail()
            ));
        }
        return ApiResponse.ok("Me", null);
    }
}