package engagement.backend;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setExposedHeaders(List.of("Authorization"));
        
        // You can customize the following part based on your project, it's only a sample
        http.authorizeRequests().antMatchers("/**").permitAll().anyRequest()
                .authenticated().and().csrf().disable().cors().configurationSource(request -> corsConfiguration);

    }

    // @Override
    // protected void configure(HttpSecurity http) throws Exception {
        
    //     // http
	// 	// .cors(cors -> cors.disable());
    //     //above doesn't even disable cors
	//     //http.build();
    //     //this causes server to crash when hit by request

    //     //below sort of works but getting blocked by spring security password not cors
    //     http
    //         .authorizeRequests()
    //         .anyRequest().authenticated()
    //         //used to give different connection refused not a proper 401
    //         // .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
    //         .and()            
    //         .httpBasic();
    //     http.cors().and();



    //     // http.formLogin().disable();
        
    // //     super.configure(http);

    // // http.httpBasic().disable();

    // // http.cors().and().csrf().disable().authorizeRequests()
    // //   .anyRequest().authenticated()
    // //   .and().formLogin().disable() // <-- this will disable the login route
    // //   //.addFilter(JWTAuthorizationFilter(authenticationManager()))
    // //   .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    // }    

    // @Bean
    // CorsConfigurationSource corsConfigurationSource() {
    //     CorsConfiguration configuration = new CorsConfiguration();
    //     configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    //     configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD"));
    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    //     source.registerCorsConfiguration("/**", configuration);
    //     return source;
    //     // CorsConfigurationSource source = UrlBasedCorsConfigurationSource();
    //     // val config = CorsConfiguration().applyPermitDefaultValues();
    //     // config.addExposedHeader("Authorization");
    //     // source.registerCorsConfiguration("/**", config);
    //     // return source;
    // }

}
