package com.slack.domain.sample.service;


import com.slack.domain.sample.model.reqest.SampleRequest;
import com.slack.domain.sample.model.reqest.SampleResponse;
import com.slack.domain.sample.repository.SampleRepository;
import com.slack.domain.sample.repository.entry.Sample;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SampleService {
    private final SampleRepository sampleRepository;
    private final ModelMapper modelMapper;

    public SampleResponse findByNmae(String name){
        Sample result = sampleRepository.findByName(name).orElse(null);
        return modelMapper.map(result, SampleResponse.class);
    }
}
