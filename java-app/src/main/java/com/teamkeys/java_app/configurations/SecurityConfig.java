package com.teamkeys.java_app.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.teamkeys.java_app.jwt.filter.JwtFilterRequest;
import com.teamkeys.java_app.jwt.service.ApplicationUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
	
	private final ApplicationUserDetailsService detailsService;
	private final JwtFilterRequest jwtFilterRequest;
	
    public SecurityConfig(ApplicationUserDetailsService userDetailsService, JwtFilterRequest jwtFilter) {
        this.detailsService = userDetailsService;
        this.jwtFilterRequest = jwtFilter;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(detailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider());

        http.addFilterBefore(jwtFilterRequest, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

//    @Bean // old configuration with form template using a JSESSIONID cookie
//    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        http
//            .cors(Customizer.withDefaults())
//            .csrf(csrf -> csrf.disable())
//
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers("/create-user", "/csrf-token").permitAll()
//                .anyRequest().authenticated()
//            )
//
//            .authenticationProvider(authenticationProvider())
//         
//            .formLogin(form -> form
//                .usernameParameter("email")
//                .passwordParameter("password")
//            )
//
//            .httpBasic(Customizer.withDefaults());
//
//        http.addFilterBefore(jwtFilterRequest, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }    
    
//    @Bean // use this if there are no users in the system
//    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//            .cors(Customizer.withDefaults())
//            .csrf(csrf -> csrf.disable())
//            .authorizeHttpRequests(auth -> auth
//                .anyRequest().permitAll()  // ← allow everything
//            )
//            .authenticationProvider(authenticationProvider());
//
//        // Comment out the JWT filter too
//        // http.addFilterBefore(jwtFilterRequest, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
}