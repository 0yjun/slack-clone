package com.slack.domain.auth.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "USER 생성")
public record SignUpRequest (
        @Schema(description = "유저 닉네임")
        @NotBlank
        @NotNull
        String nickname,
        @Schema(description = "유저 email")
        @NotBlank
        @NotNull
        @Email(message = "email 형식이 올바르지 않습니다.")
        String email,
        @Schema(description = "유저 패스워드")
        @NotBlank
        @NotNull
        String password
){}