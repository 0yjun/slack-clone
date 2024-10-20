package com.slack.domain.auth.service;

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
        User user  = newUser(request.nickname());
        UserCredential userCredential = newUserCredential(request.password(),user);
        user.setUserCredential(userCredential);
        try {
            User newUser =  userRepository.save(user);
        }catch (Exception e){
            e.printStackTrace();
            throw new IllegalArgumentException("회원가입 실패");
        }

        String token = JWTUtil.createToken(request.nickname());
        return new SignUpResponse(token);
    }

    public User newUser(String name){
        return User.builder()
                .nickname(name)
                .build();
    }

    public UserCredential newUserCredential(String password,User user){
        return UserCredential.builder()
                .user(user)
                .password(passwordEncoder.encode(password))
                .build();
    }
}
