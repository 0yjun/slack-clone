package com.slack.domain.auth.service;

import com.slack.common.error.CustomException;
import com.slack.common.error.ErrorCode;
import com.slack.domain.auth.model.request.LoginRequest;
import com.slack.domain.auth.model.request.SignUpRequest;
import com.slack.domain.auth.model.response.LoginResponse;
import com.slack.domain.auth.model.response.SignUpResponse;
import com.slack.domain.user.entity.User;
import com.slack.domain.user.entity.UserCredential;
import com.slack.domain.user.repository.UserRepository;
import com.slack.security.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public SignUpResponse register(SignUpRequest request){
        User user  = User.builder()
                .nickname(request.nickname())
                .email(request.email())
                .build();
        UserCredential userCredential = UserCredential.builder()
                .user(user)
                .password(passwordEncoder.encode(request.password()))
                .build();
        user.setUserCredential(userCredential);
        try {
            userRepository.save(user);
        }catch (Exception e){
            throw new CustomException(ErrorCode.SIGNUP_ERROR);
        }

        String token = JWTUtil.createToken(request.nickname());
        return new SignUpResponse(token);
    }

}
