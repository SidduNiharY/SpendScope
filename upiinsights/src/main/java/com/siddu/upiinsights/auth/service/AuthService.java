package com.siddu.upiinsights.auth.service;

import com.siddu.upiinsights.auth.dto.*;
import com.siddu.upiinsights.common.exception.NotFoundException;
import com.siddu.upiinsights.security.JwtService;
import com.siddu.upiinsights.users.domain.User;
import com.siddu.upiinsights.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail().toLowerCase().trim())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User u = User.builder()
                .id(UUID.randomUUID())
                .fullName(req.getFullName().trim())
                .email(req.getEmail().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .status("ACTIVE")
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        userRepository.save(u);

        String token = jwtService.generateToken(u.getId(), u.getEmail());
        return AuthResponse.builder()
                .userId(u.getId())
                .email(u.getEmail())
                .token(token)
                .build();
    }

    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        User u = userRepository.findByEmail(req.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new NotFoundException("User not found"));

        String token = jwtService.generateToken(u.getId(), u.getEmail());
        return AuthResponse.builder()
                .userId(u.getId())
                .email(u.getEmail())
                .token(token)
                .build();
    }
}