package com.slack.domain.auth.model.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Schema(description = "USER 생성")
public record SignUpResponse (
        @Schema(description = "유저 토큰")
        @NotBlank
        @NotNull
        String token
){}