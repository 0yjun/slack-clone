package com.slack;

import com.slack.domain.sample.model.reqest.SampleResponse;
import com.slack.domain.sample.repository.SampleRepository;
import com.slack.domain.sample.repository.entry.Sample;
import com.slack.domain.sample.service.SampleService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackSpringApplication {

    private final SampleRepository sampleRepository;

    public BackSpringApplication(SampleRepository sampleRepository) {
        this.sampleRepository = sampleRepository;
    }


    @PostConstruct
    public void init() {
        for (int i = 0; i < 10; i++) {
            Sample sample = Sample.builder()
                    .name("name"+i)
                    .build();
            sampleRepository.save(sample);
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(BackSpringApplication.class, args);
    }

}
