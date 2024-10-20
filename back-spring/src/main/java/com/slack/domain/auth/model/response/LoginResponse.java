package com.slack.domain.auth.model.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "로그인 요청")
public record LoginResponse(
        @Schema(description = "유저 이름")
        @NotBlank
        @NotNull
        String name,
        @Schema(description = "유저 패스워드")
        @NotBlank
        @NotNull
        String password
){}