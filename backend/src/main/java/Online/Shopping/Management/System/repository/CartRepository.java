package Online.Shopping.Management.System.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser_Id(Long userId);

}