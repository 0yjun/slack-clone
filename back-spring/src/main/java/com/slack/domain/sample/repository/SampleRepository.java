package com.slack.domain.sample.repository;

import com.slack.domain.sample.repository.entry.Sample;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SampleRepository extends JpaRepository<Sample, Long> {
    Optional<Sample> findSampleByNameLike(String name);
}
