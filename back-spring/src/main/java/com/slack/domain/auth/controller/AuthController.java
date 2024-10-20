package com.slack.domain.auth.controller;

import com.slack.domain.auth.model.request.LoginRequest;
import com.slack.domain.auth.model.request.SignUpRequest;
import com.slack.domain.auth.model.response.LoginResponse;
import com.slack.domain.auth.model.response.SignUpResponse;
import com.slack.domain.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="user API", description = "user API")
@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @Operation(
            summary = "SIGNUP",
            description = "회원가입"
    )
    @PostMapping("/signup")
    public SignUpResponse register(
            @RequestBody SignUpRequest request
    ){
        log.error("회원가입 실행");
        return authService.register(request);
    }

    @Operation(
            summary = "LOGIN",
            description = "로그인"
    )
    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ){
        log.error("로그인 실행");
        //return authService.login(request);
        return null;
    }
}
