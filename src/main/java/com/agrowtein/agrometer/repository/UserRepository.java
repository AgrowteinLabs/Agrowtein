package com.agrowtein.agrometer.repository;

import com.agrowtein.agrometer.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
