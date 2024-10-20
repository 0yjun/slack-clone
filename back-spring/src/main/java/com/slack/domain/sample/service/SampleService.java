package com.slack.domain.sample.service;


import com.slack.domain.sample.model.response.SampleResponse;
import com.slack.domain.sample.repository.SampleRepository;
import com.slack.domain.sample.repository.entry.Sample;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SampleService {
    private final SampleRepository sampleRepository;
    private final ModelMapper modelMapper;

    public SampleResponse findByName(String name){
        Optional<Sample> sample = sampleRepository.findSampleByNameLike(name);
        if(sample.isEmpty()){
            return null;
        }else{
            SampleResponse result = modelMapper.map(sample.get(), SampleResponse.class);
            log.info("result is: {}",sample.get().getName());
            log.info("result2 is: {}",result.getName());
            return result;
        }
    }
}
