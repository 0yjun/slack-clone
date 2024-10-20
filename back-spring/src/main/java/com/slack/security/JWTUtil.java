package com.slack.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.slack.common.constants.Constants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {
    private static String secretKey;
    private static String refreshSecretKey;
    private static long tokenTimeForMinute;
    private static long refreshTokenTimeForMinute;

    @Value("${token.secret-key}")
    public void setSecretKey(String secretKey) {
        JWTUtil.secretKey = secretKey;
    }

    @Value("${token.refresh-secret-key}")
    public void setRefreshSecretKey(String refreshSecretKey) {
        JWTUtil.refreshSecretKey = refreshSecretKey;
    }

    @Value("${token.token-time}")
    public void setTokenTime(long tokenTime) {
        JWTUtil.tokenTimeForMinute = tokenTime;
    }

    @Value("${token.refresh-token-time}")
    public void setRefreshTokenTime(long refreshTokenTime) {
        JWTUtil.tokenTimeForMinute = refreshTokenTime;
    }

    public static DecodedJWT decodedJWT(String token){
        return JWT.decode(token);
    }

    public static String createToken(String name){
        return JWT.create()
                .withSubject(name)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() * tokenTimeForMinute* Constants.ON_MINUTE_TO_MILLIS))
                .sign(Algorithm.HMAC256(secretKey));
    }

    public String getUsername(String token){
        DecodedJWT jwt = decodedJWT(token);
        return jwt.getSubject();
    }

    public Boolean isExpired(String token){
        DecodedJWT jwt = decodedJWT(token);
        Date expiredAt = jwt.getExpiresAt();
        return expiredAt == null || expiredAt.before((new Date()));
    }

    public String getRole(String token) {
        DecodedJWT jwt = decodedJWT(token);
        return jwt.getClaim("roles").asString();
    }

}
