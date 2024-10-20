package com.slack.domain.auth.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Schema(description = "로그인 요청")
public record LoginRequest(
        @Schema(description = "유저 이름")
        @NotBlank
        @NotNull
        String name,
        @Schema(description = "유저 패스워드")
        @NotBlank
        @NotNull
        String password
){}