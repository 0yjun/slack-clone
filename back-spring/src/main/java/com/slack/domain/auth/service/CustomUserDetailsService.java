package com.slack.domain.auth.service;

import com.slack.domain.auth.model.CustomUserDetails;
import com.slack.domain.user.entity.User;
import com.slack.domain.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByNickname(username)
                .orElseThrow(
                        ()->new IllegalArgumentException("없는유저 유저")
                );

        return new CustomUserDetails(user);
    }
}
