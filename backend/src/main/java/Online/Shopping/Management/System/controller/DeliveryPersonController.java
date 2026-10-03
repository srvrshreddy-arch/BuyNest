package Online.Shopping.Management.System.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import Online.Shopping.Management.System.entity.DeliveryPerson;
import Online.Shopping.Management.System.entity.Order;
import Online.Shopping.Management.System.service.DeliveryPersonService;

@RestController
@RequestMapping("/deliveryperson")
@CrossOrigin
public class DeliveryPersonController {

    @Autowired
    private DeliveryPersonService deliveryPersonService;


    // =====================================================
    // SAVE DELIVERY PERSON
    // =====================================================

    @PostMapping("/save")
    public DeliveryPerson saveDeliveryPerson(
            @RequestBody DeliveryPerson deliveryPerson) {

        return deliveryPersonService
                .saveDeliveryPerson(deliveryPerson);
    }


    // =====================================================
    // GET ALL DELIVERY PERSONS
    // =====================================================

    @GetMapping("/all")
    public List<DeliveryPerson> getAllDeliveryPersons() {

        return deliveryPersonService
                .getAllDeliveryPersons();
    }


    // =====================================================
    // GET DELIVERY PERSON BY ID
    // =====================================================

    @GetMapping("/{id}")
    public DeliveryPerson getDeliveryPersonById(
            @PathVariable Long id) {

        return deliveryPersonService
                .getDeliveryPersonById(id);
    }


    // =====================================================
    // DELIVERY PERSON LOGIN
    // =====================================================

    @PostMapping("/login")
    public DeliveryPerson loginDeliveryPerson(
            @RequestParam String email,
            @RequestParam String password) {

        return deliveryPersonService
                .loginDeliveryPerson(
                        email,
                        password
                );
    }


    // =====================================================
    // GET ASSIGNED ORDERS
    // =====================================================

    @GetMapping("/{id}/orders")
    public List<Order> getAssignedOrders(
            @PathVariable Long id) {

        return deliveryPersonService
                .getAssignedOrders(id);
    }


    // =====================================================
    // UPDATE DELIVERY PERSON STATUS
    // =====================================================

    @PutMapping("/{id}/status")
    public DeliveryPerson updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return deliveryPersonService
                .updateStatus(
                        id,
                        status
                );
    }


    // =====================================================
    // MARK ORDER AS PICKED UP
    // =====================================================

    @PutMapping("/orders/{orderId}/picked-up")
    public Order markAsPickedUp(
            @PathVariable Long orderId) {

        return deliveryPersonService
                .markAsPickedUp(orderId);
    }


    // =====================================================
    // MARK ORDER AS OUT FOR DELIVERY
    // =====================================================

    @PutMapping("/orders/{orderId}/out-for-delivery")
    public Order markOutForDelivery(
            @PathVariable Long orderId) {

        return deliveryPersonService
                .markOutForDelivery(orderId);
    }


    // =====================================================
    // MARK ORDER AS DELIVERED
    // =====================================================

    @PutMapping("/orders/{orderId}/delivered")
    public Order markAsDelivered(
            @PathVariable Long orderId) {

        return deliveryPersonService
                .markAsDelivered(orderId);
    }

}