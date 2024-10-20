package com.slack.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true) // 닉네임 중복 방지
    private String nickname;

    @Column(nullable = false, unique = true) // 이메일 중복 방지
    private String email;

    @Column(nullable = false)
    private boolean enabled;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserCredential userCredential;

    public void setUserCredential(UserCredential userCredential){
        this.userCredential = userCredential;
    }
}
