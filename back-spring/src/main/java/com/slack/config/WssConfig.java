package com.slack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

public class WssConfig {

    public final stompConfig stompConfig;
    public WssConfig( WssConfig.stompConfig stompConfig1) {
        this.stompConfig = stompConfig1;
    }

    public class stompConfig implements WebSocketMessageBrokerConfigurer {
        @Override
        @Bean
        public void configureMessageBroker(MessageBrokerRegistry registry) {
            registry.enableSimpleBroker("/sub");
            registry.setApplicationDestinationPrefixes("/pub");
        }
    }
}


