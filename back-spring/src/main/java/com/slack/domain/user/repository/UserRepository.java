package com.slack.domain.user.repository;

import com.slack.domain.user.repository.entry.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByNameLike(String name);
}
