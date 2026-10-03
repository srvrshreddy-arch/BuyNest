package Online.Shopping.Management.System.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Get products belonging to a category
    List<Product> findByCategoryId(Long categoryId);
}