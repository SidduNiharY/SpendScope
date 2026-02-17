package com.siddu.upiinsights.uploads.domain;

import com.siddu.upiinsights.users.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "uploads")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Upload {
    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "original_filename", nullable = false)
    private String originalFilename;

    @Column(name = "storage_path", nullable = false, length = 600)
    private String storagePath;

    @Column(name = "file_hash", nullable = false, length = 64)
    private String fileHash;

    @Column(nullable = false)
    private String status; // UPLOADED/PARSED/FAILED

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "uploaded_at", nullable = false)
    private Instant uploadedAt;

    @Column(name = "parsed_at")
    private Instant parsedAt;
}