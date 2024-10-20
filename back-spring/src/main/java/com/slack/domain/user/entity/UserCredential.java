package com.slack.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="user_credential")
public class UserCredential{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private int failedLoginAttempts = 0; // 비밀번호 오류 횟수

    @OneToOne
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(nullable = false)
    private boolean accountLocked = false; // 계정 잠금 여부

    public UserCredential(User user) {
        this.user = user;
    }

}