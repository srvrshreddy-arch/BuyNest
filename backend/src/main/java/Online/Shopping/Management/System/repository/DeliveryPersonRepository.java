package Online.Shopping.Management.System.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import Online.Shopping.Management.System.entity.DeliveryPerson;

public interface DeliveryPersonRepository
        extends JpaRepository<DeliveryPerson, Long> {

    DeliveryPerson findByEmailAndPassword(
            String email,
            String password);
}