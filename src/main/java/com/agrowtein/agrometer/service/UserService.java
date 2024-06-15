package com.agrowtein.agrometer.service;

import com.agrowtein.agrometer.entity.User;
import com.agrowtein.agrometer.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User createUser(User user) {
    return userRepository.save(user);
  }
}
