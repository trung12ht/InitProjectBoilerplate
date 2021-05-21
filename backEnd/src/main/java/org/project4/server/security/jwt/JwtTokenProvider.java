package org.project4.server.security.jwt;

import java.util.Date;

import org.project4.server.common.JWTConstance;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenProvider {

	// Tạo ra jwt từ thông tin user
	public String generateToken(CustomUserDetails userDetails) {
		Date now = new Date();

		Date expiryDate = new Date(now.getTime() + JWTConstance.JWT_EXPIRATION);
		// Tạo chuỗi json web token từ id của user.
		return Jwts.builder()
                .setSubject(String.valueOf(userDetails.getUser().getEmail()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWTConstance.JWT_SECRET)
                .compact();
	}

	// Lấy thông tin user từ jwt
	public String getUserFromJWT(String token) {
		Claims claims = Jwts.parser().setSigningKey(JWTConstance.JWT_SECRET).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(JWTConstance.JWT_SECRET).parseClaimsJws(authToken);
			return true;
		} catch (MalformedJwtException ex) {
			log.error("Invalid JWT token");
		} catch (ExpiredJwtException ex) {
			log.error("Expired JWT token");
		} catch (UnsupportedJwtException ex) {
			log.error("Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
			log.error("JWT claims string is empty.");
		}
		return false;
	}
}