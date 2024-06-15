package com.agrowtein.agrometer.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.agrowtein.agrometer.entity.User;
import com.agrowtein.agrometer.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  @Test
  void testCreateUser() {
    User user = new User();
    user.setName("test");
    when(userRepository.save(any(User.class))).thenReturn(user);
    User createdUser = userService.createUser(user);

    assertEquals(user.getName(), createdUser.getName());
    // Assert other properties as needed
    Mockito.verify(userRepository, Mockito.times(1)).save(user);
  }

}
