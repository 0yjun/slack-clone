package com.slack.common.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class CustomExceptionHandler {
    @ExceptionHandler(CustomException.class)
    protected ResponseEntity<ErrorResponseEntity> handleCustomException(CustomException e){
        log.error("Custom Exception: {} reason: {} ", e.getErrorCode(), e.getMessage());

        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
    }
}
