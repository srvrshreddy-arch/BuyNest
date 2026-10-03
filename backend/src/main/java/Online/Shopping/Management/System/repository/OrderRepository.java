package Online.Shopping.Management.System.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.Order;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    // Admin Dashboard
    long countByStatus(String status);

    // Recent Orders
    List<Order> findTop5ByOrderByIdDesc();

    // Delivery Person Dashboard
    List<Order> findByDeliveryPersonId(Long deliveryPersonId);
}