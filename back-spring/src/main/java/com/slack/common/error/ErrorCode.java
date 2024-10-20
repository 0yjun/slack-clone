package com.slack.common.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    // 사용자 관련 오류
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "ACCOUNT-001", "사용자를 찾을 수 없습니다."),
    HAS_EMAIL(HttpStatus.BAD_REQUEST, "ACCOUNT-002", "이미 존재하는 이메일입니다."),
    HAS_NICKNAME(HttpStatus.BAD_REQUEST, "ACCOUNT-003", "이미 존재하는 닉네임입니다."),
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "ACCOUNT-004", "비밀번호가 일치하지 않습니다."),

    // 서버 내부 오류 (500번대)
    SIGNUP_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-005", "회원가입 중 서버 오류가 발생했습니다."),
    LOGIN_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "ACCOUNT-006", "로그인 중 서버 오류가 발생했습니다."),

    // 토큰 관련 오류 (회원가입 인증과 관련)
    TOKEN_IS_INVALID(HttpStatus.UNAUTHORIZED, "ACCOUNT-007", "회원가입 인증 토큰이 유효하지 않습니다."),
    ACCESS_TOKEN_IS_NOT_EXPIRED(HttpStatus.BAD_REQUEST, "ACCOUNT-008", "회원가입 인증 토큰이 만료되지 않았습니다."),
    ACCESS_TOKEN_IS_EXPIRED(HttpStatus.UNAUTHORIZED, "ACCOUNT-009", "회원가입 인증 토큰이 만료되었습니다."),

    // 공통 오류
    UNDEFINED_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "COMMON-001", "정의되지 않은 서버 오류가 발생했습니다."),
    PARAMETER_NOT_VALID(HttpStatus.BAD_REQUEST, "COMMON-002", "요청한 파라미터가 유효하지 않습니다.");


    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}