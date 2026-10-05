package Online.Shopping.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Online.Shopping.Management.System.entity.DeliveryPerson;
import Online.Shopping.Management.System.entity.Order;
import Online.Shopping.Management.System.exception.ResourceNotFoundException;
import Online.Shopping.Management.System.repository.DeliveryPersonRepository;
import Online.Shopping.Management.System.repository.OrderRepository;

@Service
public class DeliveryPersonService {

    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;

    @Autowired
    private OrderRepository orderRepository;


    // =====================================================
    // SAVE DELIVERY PERSON
    // =====================================================

    public DeliveryPerson saveDeliveryPerson(
            DeliveryPerson deliveryPerson) {

        return deliveryPersonRepository.save(deliveryPerson);
    }


    // =====================================================
    // GET ALL DELIVERY PERSONS
    // =====================================================

    public List<DeliveryPerson> getAllDeliveryPersons() {

        return deliveryPersonRepository.findAll();
    }


    // =====================================================
    // GET DELIVERY PERSON BY ID
    // =====================================================

    public DeliveryPerson getDeliveryPersonById(Long id) {

        return deliveryPersonRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Delivery Person not found with id: " + id
                        ));
    }


    // =====================================================
    // DELIVERY PERSON LOGIN
    // =====================================================

    public DeliveryPerson loginDeliveryPerson(
            String email,
            String password) {

        return deliveryPersonRepository
                .findByEmailAndPassword(email, password);
    }


    // =====================================================
    // GET ASSIGNED ORDERS
    // =====================================================

    public List<Order> getAssignedOrders(
            Long deliveryPersonId) {

        // Check delivery person exists
        deliveryPersonRepository.findById(deliveryPersonId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Delivery Person not found with id: "
                                        + deliveryPersonId
                        ));

        return orderRepository
                .findByDeliveryPersonId(deliveryPersonId);
    }


    // =====================================================
    // UPDATE DELIVERY PERSON STATUS
    // =====================================================

    public DeliveryPerson updateStatus(
            Long id,
            String status) {

        DeliveryPerson deliveryPerson =
                deliveryPersonRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Delivery Person not found with id: "
                                                + id
                                ));

        deliveryPerson.setStatus(status);

        return deliveryPersonRepository.save(deliveryPerson);
    }


    // =====================================================
    // MARK ORDER AS PICKED UP
    // =====================================================

    public Order markAsPickedUp(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        order.setStatus("PICKED_UP");

        return orderRepository.save(order);
    }


    // =====================================================
    // MARK ORDER AS OUT FOR DELIVERY
    // =====================================================

    public Order markOutForDelivery(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        order.setStatus("OUT_FOR_DELIVERY");

        return orderRepository.save(order);
    }


    // =====================================================
    // MARK ORDER AS DELIVERED
    // =====================================================

    public Order markAsDelivered(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id: " + orderId
                        ));

        // Mark order as DELIVERED
        order.setStatus("DELIVERED");


        // =================================================
        // MAKE DELIVERY PERSON AVAILABLE AGAIN
        // =================================================

        if (order.getDeliveryPerson() != null) {

            DeliveryPerson deliveryPerson =
                    order.getDeliveryPerson();

            deliveryPerson.setStatus("AVAILABLE");

            deliveryPersonRepository.save(deliveryPerson);
        }


        // Save updated order
        return orderRepository.save(order);
    }

}