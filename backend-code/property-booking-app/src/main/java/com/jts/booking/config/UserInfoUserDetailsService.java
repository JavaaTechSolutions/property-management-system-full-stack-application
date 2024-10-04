package com.jts.booking.config;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.jts.booking.entity.User;
import com.jts.booking.repo.LoginRepository;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

	@Autowired
	private LoginRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userInfo = repository.findByUsername(username);

		return userInfo.map(UserInfoUserDetails::new)
				.orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

	}
}
