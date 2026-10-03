package Online.Shopping.Management.System.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByPhone(Long phone);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}